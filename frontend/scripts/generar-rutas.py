import json
from pathlib import Path
from urllib.request import urlopen
from concurrent.futures import ThreadPoolExecutor
import os

root = Path(__file__).resolve().parents[1] / 'src'
mock = json.loads((root/'mock.json').read_text())
fixed = mock['routes']['fixed']
events = mock['events']
base_url = os.environ.get('TRAMA_OSRM_URL', 'https://routing.openstreetmap.de/routed-car')

def request(service, points, query):
    coords = ';'.join(','.join(map(str, p)) for p in points)
    with urlopen(f'{base_url}/{service}/v1/driving/{coords}?{query}', timeout=20) as response:
        data = json.load(response)
    if data['code'] != 'Ok':
        raise RuntimeError(data)
    return data

def route(points):
    data = request('route', points, 'overview=full&geometries=geojson&continue_straight=false')
    result = data['routes'][0]
    return {'coordinates': result['geometry']['coordinates'], 'meters': result['distance']}

table = request('table', fixed + [e['position'] for e in events], 'annotations=distance')['distances']

def suggestion(item):
    j, event = item
    target = len(fixed) + j
    insertion = min(range(1, len(fixed)), key=lambda i: table[i-1][target]+table[target][i]-table[i-1][i])
    return event['id'], route(fixed[:insertion]+[event['position']]+fixed[insertion:])

with ThreadPoolExecutor(max_workers=2) as pool:
    fixed_future = pool.submit(route, fixed)
    suggestions = dict(pool.map(suggestion, enumerate(events)))
    baseline = fixed_future.result()

out = {'fixed': baseline, 'suggestions': suggestions}
(root/'street-routes.json').write_text(json.dumps(out,ensure_ascii=False,separators=(',',':'))+'\n')
print('Ruta fija:', baseline['meters'], 'm;', len(baseline['coordinates']), 'vértices')
for key,value in suggestions.items():
    print(key, value['meters'], 'm;', len(value['coordinates']), 'vértices')
