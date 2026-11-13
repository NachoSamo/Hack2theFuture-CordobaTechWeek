# Contratos entre nodos

> Se escriben en el checkpoint de arquitectura (12/11 ~15:30), **antes de irnos del predio**.
> Mientras esto esté vacío, nadie codea integraciones.

En NextWave funcionó así: la arquitectura era una cadena de nodos que se pasaban datos; cada uno
tomó un nodo, se definieron solo las interfaces y cada nodo se desarrolló contra un JSON de ejemplo
sin esperar al anterior.

## Stack

Se decide en el kickoff según el tipo de prototipo. Registrar en el decision log con opciones.

- **Backend:**
- **Frontend:**
- **Datos:**
- **LLM:**
- **Hardware:**
- **Deploy / cómo se muestra:**

## Nodos y dueños

| Nodo | Qué hace | Carpeta | Dueño | Entrada | Salida | Fixture |
|---|---|---|---|---|---|---|
| 01 Captura | Cuadros de COYS, Cordobeses en Alerta y móviles policiales (simulados) | | por definir | Video o imágenes georreferenciadas | Cuadro con lugar, hora y fuente | |
| 02 Detección y clasificación | Cuadro → detecciones con categoría | | por definir | Salida de 01 | Detección con categoría, lugar, hora, fuente y confianza | |
| 03 Consolidación de incidencias | Un ticket por incidencia; confirma y cierra el ciclo | | por definir | Salida de 02 | Ticket con estado, avistamientos y primera y última vez visto | |
| 04 Derivación al área | Aviso directo al área según la categoría | | por definir | Tickets de 03 + tabla categoría → área | Aviso al área | |
| 05 Panel e impacto | Vista COYS (general) y vista por área; km reutilizados | | por definir | Salidas de 03 y 04 | Pantalla | No aplica |

Nodos del borrador de [`arquitectura/solucion.html`](arquitectura/solucion.html). Carpeta, campos
JSON y fixture los define cada dueño.

## Contratos

Contratos acordados para la estructura inicial mockeada del hub (alineados con [`arquitectura/arquitectura-sistema.md`](arquitectura/arquitectura-sistema.md)):

### 1. Ingesta de evento + evidencia (`POST /api/v1/telemetry/events`)
- **Transporte:** HTTPS `multipart/form-data` con campo `event` (JSON) y `image` (JPEG anotado con recuadro de detección, sin pixelado, ≤ 1–2 MB).
- **Idempotencia:** `event_id` único; el reenvío con el mismo `event_id` retorna `200` sin duplicar observación ni adjunto.
- **Request (`event`):**
```json
{
  "event_id": "evt-demo-001",
  "device_id": "camara-demo-04",
  "timestamp": "2026-11-12T18:10:00Z",
  "location": {
    "lat": -31.4167,
    "lon": -64.1833,
    "reference": "camara",
    "accuracy_m": null
  },
  "detection": {
    "category": "residuos",
    "type_problem": "contenedor_desbordado",
    "severity": null,
    "confidence": 0.89
  }
}
```
- **Response (`201` / `200` tras guardar JSON e imagen):** `{ "status": "accepted", "event_id": "evt-demo-001", "incident_id": "inc-demo-001", "evidence_id": "evd-demo-001", "deduplicated": false }`
- **Si falla:** `{ "status": "error", "code": "...", "message": "..." }` (sin 500 no controlado).

### 2. Consultas de incidencias, mapa de calor y evidencia
- `GET /api/v1/analytics/heatmap?category=&type_problem=&severity=&status=&recipient_id=&desde=&hasta=` → GeoJSON con **1 contribución por incidencia activa** ponderada por gravedad.
- `GET /api/v1/incidents?category=&type_problem=&severity=&status=&recipient_id=&desde=&hasta=` → listado de incidencias consolidadas (`pass_count` marcado como estimado).
- `GET /api/v1/incidents/{incident_id}` → detalle de incidencia + arreglo `evidence_ids`.
- `GET /api/v1/evidence/{evidence_id}` → binario `image/jpeg` con acceso controlado.

### 3. Derivación y actualización de ticket (receptor simulado en MVP)
- **Salida hacia receptor (`POST <webhook_simulado>`):** payload de ticket (`ticket_id`, `incident_id`, `recipient_id`, `evidence_ref`, `incident`) con `ticket_id` estable en reintentos.
- **Actualización de estado (`PATCH /api/v1/tickets/{ticket_id}/status`):** `{ "status": "recibido" | "en_atencion" | "resuelto", "note": "..." }`.

El fixture correspondiente vive en `fixtures/<nodo>.json` y usa estos mismos ejemplos.

## Reglas

1. Los nombres de campos se acuerdan una vez y no se cambian: `id` o `residuo_id`, pero uno solo.
2. Ninguna respuesta tira 500 en la demo: el error va en el body y la UI lo muestra.
3. Cambiar un contrato = actualizar este archivo + su fixture + aviso en `ESTADO.md`, en el mismo commit.
4. Si un archivo es de otro dueño, se le avisa antes de tocarlo.
