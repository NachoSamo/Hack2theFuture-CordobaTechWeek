"""Genera src/fleet-routes.json: 16 recorridos por calles reales (OSRM) que pasan por las 194 incidencias.

Uso: python scripts/generar-flota.py  (TRAMA_OSRM_URL para otro servidor OSRM)
"""
import json
import math
import os
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen

root = Path(__file__).resolve().parents[1] / 'src'
fixture = json.loads((root/'tickets-mock.json').read_text(encoding='utf-8'))
base_url = os.environ.get('TRAMA_OSRM_URL', 'https://routing.openstreetmap.de/routed-car')
RANGE_METERS = 50  # rango de cámara: mismo valor que dibuja el halo en el mapa
FLEETS = ['COYS'] * 5 + ['Policía'] * 5 + ['Guardia Urbana'] * 6
cx, cy = fixture['center']
KX, KY = 111320 * math.cos(math.radians(cy)), 110540  # metros por grado (equirectangular, igual que fleet.ts)


def meters(a, b):
    return math.hypot((b[0]-a[0])*KX, (b[1]-a[1])*KY)


def route(points):
    coords = ';'.join(f'{x},{y}' for x, y in points)
    with urlopen(f'{base_url}/route/v1/driving/{coords}?overview=full&geometries=geojson&continue_straight=false', timeout=30) as response:
        data = json.load(response)
    if data['code'] != 'Ok':
        raise RuntimeError(data)
    return data['routes'][0]['geometry']['coordinates']


def closest(line, point):
    """(distancia al recorrido, metros recorridos hasta el punto más cercano)."""
    best, walked = (math.inf, 0.0), 0.0
    for a, b in zip(line, line[1:]):
        dx, dy = (b[0]-a[0])*KX, (b[1]-a[1])*KY
        px, py = (point[0]-a[0])*KX, (point[1]-a[1])*KY
        length2 = dx*dx + dy*dy
        t = max(0.0, min(1.0, (px*dx + py*dy) / length2)) if length2 else 0.0
        distance = math.hypot(px - t*dx, py - t*dy)
        if distance < best[0]:
            best = (distance, walked + t*math.sqrt(length2))
        walked += math.sqrt(length2)
    return best


tickets = [(t['id'], [t['payload']['incident']['location']['lon'], t['payload']['incident']['location']['lat']]) for t in fixture['tickets']]
# Zonas: k-means sobre las incidencias, así cada vehículo patrulla su barrio como opera hoy la flota.
tickets.sort(key=lambda item: math.atan2((item[1][1]-cy)*KY, (item[1][0]-cx)*KX))
centroids = [tickets[round(i*len(tickets)/len(FLEETS))][1] for i in range(len(FLEETS))]  # semilla determinística
for _ in range(50):
    sectors = [[] for _ in FLEETS]
    for item in tickets:
        sectors[min(range(len(centroids)), key=lambda k: meters(item[1], centroids[k]))].append(item)
    centroids = [[sum(p[0] for _, p in s)/len(s), sum(p[1] for _, p in s)/len(s)] if s else c for s, c in zip(sectors, centroids)]
assert all(sectors), 'zona vacía: cambiar la semilla'


def ordered(sector):
    """Vecino más cercano desde el ticket más próximo al centro de su zona, cerrando el loop."""
    mid = [sum(p[0] for _, p in sector)/len(sector), sum(p[1] for _, p in sector)/len(sector)]
    pending = sorted(sector, key=lambda item: meters(item[1], mid))
    path = [pending.pop(0)]
    while pending:
        path.append(pending.pop(min(range(len(pending)), key=lambda i: meters(path[-1][1], pending[i][1]))))
    return [p for _, p in path] + [path[0][1]]


with ThreadPoolExecutor(max_workers=2) as pool:
    lines = list(pool.map(lambda s: route(ordered(s)), sectors))

# Un ticket lejos de calles ruteables (p. ej. Los Boulevares) se detecta igual en el punto más cercano del recorrido.
counters, vehicles, detections, worst, outside = {}, [], {}, 0.0, 0
for index, (fleet, line, sector) in enumerate(zip(FLEETS, lines, sectors)):
    counters[fleet] = counters.get(fleet, 0) + 1
    vid = f'v{index+1:02d}'
    vehicles.append({'id': vid, 'fleet': fleet, 'label': f'{fleet.split()[0]} {counters[fleet]:02d}', 'coordinates': line})
    for ticket_id, point in sector:
        distance, at = closest(line, point)
        worst = max(worst, distance)
        outside += distance > RANGE_METERS
        detections[ticket_id] = {'vehicle': vid, 'at_m': round(at, 1)}
    print(vid, fleet, round(sum(meters(a, b) for a, b in zip(line, line[1:]))), 'm;', len(line), 'vértices;', len(sector), 'tickets')

assert len(detections) == len(fixture['tickets']), 'falta asignar tickets'
print('Distancia máxima ticket-recorrido:', round(worst, 1), 'm;', outside, 'tickets fuera del rango de', RANGE_METERS, 'm')
out = {'rangeMeters': RANGE_METERS, 'vehicles': vehicles, 'detections': detections}
(root/'fleet-routes.json').write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':'))+'\n', encoding='utf-8')
