# Arquitectura de Sistema: Detección Móvil Edge AI de Incidencias Urbanas

- **Fecha:** 12/11/2026
- **Estado:** Diseño Técnico / Planificación inicial (Sin código de producción)
- **Alcance funcional:** Visión artificial embarcada en vehículos móviles (patrullas), detección continua y filtrado en borde (YOLOv11n optimizado con bloques de atención), telemetría georreferenciada ultra-liviana sin imágenes, deduplicación espacio-temporal en backend hub central de incidencias, API analítica para mapas de calor y derivación de tickets a las entidades responsables.

---

## 1. Visión General y Definiciones Acordadas

```text
  [ CÁMARA + GPS EN PATRULLA ]
                │
                ▼ (Stream de video local continuo)
  [ INFERENCIA EDGE (YOLOv11n) ]
    ├── ¿Detectó anomalía válida? ── NO ──► [ DESCARTAR SILENCIOSAMENTE (0 Consumo red) ]
    └── SÍ
         ▼ (Disparo de evento)
  [ TELEMETRÍA ULTRA-LIVIANA (<1 KB) ] ── (4G/LTE / MQTT) ──► [ BACKEND CENTRAL (API REST) ]
                                                                       │
                                              ┌────────────────────────┴───────────────────────┐
                                              ▼                                                ▼
                                    [ DEDUPLICACIÓN ESPACIAL ]                    [ AGREGACIÓN & PERSISTENCIA ]
                                    (Radio 15-20m / Ventana temporal)              (PostgreSQL/PostGIS)
                                              │                                                │
                                              └────────────────────────┬───────────────────────┘
                                                                       ▼
                                            [ HUB: INCIDENCIAS CONSOLIDADAS Y ALMACENADAS ]
                                                                       │
                                            ┌──────────────────────────┴────────────────────────┐
                                            ▼                                                   ▼
                             [ API ANALÍTICA DE INCIDENCIAS ]                     [ DERIVACIÓN DE TICKETS ]
                                            │                                       (Tipo + jurisdicción)
                                            ▼                                                   ▼
                         [ MAPA DE CALOR INTERACTIVO ]                             [ ENTIDAD RESPONSABLE ]
```

El hub mantiene una referencia central de cada incidencia y alimenta dos salidas independientes: la API de consulta para el mapa y la derivación de tickets. El mapa consume los datos de la API; no es necesario consultarlo para generar un aviso. Un fallo en la entrega del ticket no impide consultar la incidencia.

La recepción y las actualizaciones que informe la entidad se vinculan a la incidencia central. El estado del aviso se distingue del estado del problema: recibir un ticket no significa haberlo resuelto. El canal de entrega y la forma de confirmar recepción quedan por definir.

### Taxonomía de Anomalías y Severidades

1. **Gestión de Residuos:**
   - `contenedor_vacio` (Normal / Sin despacho)
   - `contenedor_lleno` (Riesgo preventivo / Camión recolector)
   - `contenedor_desbordado` (Urgencia / Camión recolector)
   - `basura_acumulada_piso` (Vía pública / Barrenderos y cuadrilla urbana)
   - *Escalable:* Poda, escombros, bolsas clasificadas por color.
2. **Infraestructura y Vía Pública:**
   - `bache_calzada` (Daño asfáltico en calzada)
   - `luminaria_apagada_rota` (Cortes de alumbrado público)
3. **Escala de Severidad:**
   - `bajo` | `medio` | `alto` | `extremo`

---

## 2. Componentes del Sistema

### Componente 1: Módulo Edge Embarcado (Patrulla)
- **Modelo:** YOLOv11n cuantizado (FP16/INT8 mediante ONNX Runtime / TensorRT).
- **Consumo estimado:** ~5W a 10W (apto para hardware embebido vehicular / microcomputadora / SoC móvil).
- **Lógica de Trigger:** Ejecuta detección continua frame a frame. Si no hay detecciones que superen el umbral de confianza (`conf > 0.65`), el frame se desecha de inmediato de la memoria RAM.
- **Transmisión:** En caso de detección positiva, empaqueta un JSON estrictamente telegráfico (<1 KB) enviado vía MQTT/HTTPS.
- **Privacidad y Ancho de Banda:** Cero streaming de video, cero almacenamiento de caras o patentes, cero envío de imágenes crudas al servidor.

### Componente 2: Ingesta y Deduplicación en Backend
- **Endpoint de Ingesta:** `POST /api/v1/telemetry/events`
- **Algoritmo de Deduplicación:**
  - Al ingresar un evento con `(lat, lon, tipo_incidente, timestamp)`, busca en PostGIS registros idénticos en un radio de 15-20 metros y ventana de tiempo menor a 6 horas.
  - Si existe: incrementa contador de frecuencia/votos de confirmación y actualiza timestamp sin duplicar el punto en el mapa.
  - Si no existe: inserta un nuevo foco de incidencia georreferenciado.

### Componente 3: API Analítica y Mapa de Calor
- **Endpoint Analítico:** `GET /api/v1/analytics/heatmap` (parámetros: `categoria`, `severidad`, `desde`, `hasta`).
- **Respuesta:** GeoJSON con ponderación de densidad (frecuencia × severidad) para renderizar mapas de calor (Leaflet / Mapbox / Deck.gl).

### Componente 4: Derivación de Tickets
- **Entrada:** incidencia consolidada y registrada en el hub.
- **Proceso:** determinar la entidad responsable según el tipo de problema y su jurisdicción; generar o actualizar el ticket vinculado a esa incidencia.
- **Salida:** ticket para la entidad con la referencia de incidencia, ubicación, categoría, gravedad y fecha/hora disponibles.
- **Seguimiento:** registrar el resultado del envío y la confirmación de recepción cuando el canal la permita. Conservar el aviso pendiente o fallido si la entrega no se completa.
- **Independencia:** la derivación y la consulta del mapa trabajan sobre las mismas incidencias; ninguna necesita esperar a que la otra sea utilizada.
- **Pendiente:** tabla de destinatarios, canal de entrega, contrato del ticket y reglas de reintento y actualización. Su implementación real o simulada en el MVP debe acordarse.

---

## 3. Especificación de Contrato de Datos

Los siguientes ejemplos describen los tres payloads acordados para el flujo. Los identificadores y valores son ilustrativos.

### 3.1. Evento de detección — fuente → backend

Representa una observación enviada por la fuente. `event_id` identifica el evento y se conserva al reintentar su envío; `pass_id` identifica la pasada en la que se obtuvo.

```json
{
  "event_id": "evt-demo-001",
  "device_id": "camara-demo-04",
  "timestamp": "2026-11-12T18:10:00Z",
  "pass_id": "pasada-demo-01",
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

### 3.2. Incidencia — hub → consumidores de la API

Representa el problema centralizado que reúne observaciones. `observation_count` cuenta observaciones y `pass_count` cuenta pasadas; `last_confidence` corresponde a la última detección.

```json
{
  "incident_id": "inc-demo-001",
  "category": "residuos",
  "type_problem": "contenedor_desbordado",
  "severity": "alto",
  "status": "activa",
  "location": {
    "lat": -31.4167,
    "lon": -64.1833,
    "reference": "camara",
    "accuracy_m": null
  },
  "first_seen_at": "2026-11-12T18:10:00Z",
  "last_seen_at": "2026-11-12T18:25:00Z",
  "observation_count": 3,
  "pass_count": 2,
  "last_confidence": 0.89
}
```

### 3.3. Ticket — hub → entidad responsable

Representa la derivación a una entidad. `ticket_id` identifica el ticket, `incident_id` lo vincula con la incidencia central y `recipient_id` identifica al destinatario. El bloque `incident` incluye los datos necesarios para entender el aviso.

```json
{
  "ticket_id": "tkt-demo-001",
  "incident_id": "inc-demo-001",
  "recipient_id": "entidad-demo-higiene",
  "created_at": "2026-11-12T18:26:00Z",
  "incident": {
    "category": "residuos",
    "type_problem": "contenedor_desbordado",
    "severity": "alto",
    "location": {
      "lat": -31.4167,
      "lon": -64.1833,
      "reference": "camara",
      "accuracy_m": null
    },
    "last_seen_at": "2026-11-12T18:25:00Z"
  }
}
```

### 3.4. Criterios comunes

- **`category`:** grupo del problema, por ejemplo, `residuos`.
- **`type_problem`:** tipo concreto de problema, por ejemplo, `contenedor_desbordado`. Reemplaza a `subcategory` en los tres payloads.
- **`severity`:** nivel de gravedad; puede ser `bajo`, `medio`, `alto` o `extremo`. `null` indica que todavía no se asignó una gravedad.
- **`confidence` / `last_confidence`:** confianza de la detección, expresada entre 0 y 1; es independiente de la gravedad.
- **`location.reference`:** indica si la ubicación corresponde a la cámara (`camara`) o al problema (`incidencia`).
- **`location.accuracy_m`:** precisión estimada de la ubicación en metros. Por ejemplo, `5` expresa un margen estimado de 5 metros; `null` indica que se desconoce.
- **Fechas y horas:** incluyen zona horaria explícita; los ejemplos usan UTC (`Z`).

---

## 4. Plan de Acción y Próximos Pasos (Sin código hasta aprobación)

| Fase | Tarea | Dependencia |
|---|---|---|
| **Fase 1 (Actual)** | Validar y congelar arquitectura conceptual y contrato de telemetría | Aprobación del usuario |
| **Fase 2** | Definir fixtures sintéticos de prueba (rutas de patrulla en Córdoba con coordenadas reales) | Fase 1 |
| **Fase 3** | Diseñar diagramas de arquitectura en `harness/arquitectura/` | Fase 2 |
| **Fase 4** | Implementar API de ingesta + deduplicación espacial + endpoint de mapa de calor + derivación de tickets según el modo acordado para el MVP | Fase 3 aprobada por Samo |
| **Fase 5** | Interfaz visual interactiva del mapa de calor | Fase 4 |

---
