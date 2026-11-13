# Arquitectura del sistema: hub de incidencias urbanas

- **Fecha:** 12/11/2026 (actualizado 22:35)
- **Estado:** diseño técnico cerrado para estructura inicial mockeada del MVP; pendiente de completar diagramas en `harness/arquitectura/` y aprobación de dueños de nodo y Samo.
- **Alcance funcional:** recibir detecciones y sus frames de evidencia vía HTTPS multipart, consolidar incidencias en un hub y ofrecer dos salidas independientes: API de consulta para el mapa/listado/detalle y derivación de tickets a un receptor simulado. El MVP se verifica sobre una **estructura inicial mockeada** (frames preparados, resultados precargados de respaldo y receptor simulado); la integración con cámaras reales, domos, MQTT y Edge en hardware queda para etapas posteriores.

---

## 1. Visión general del flujo

```text
  [ CAPTURA: FRAMES + UBICACIÓN + FECHA/HORA ]
                │
                ▼ (Simulada en el MVP; cámaras de móviles y domos a futuro)
  [ DETECCIÓN Y CLASIFICACIÓN: MODO POR DEFINIR ]
    ├── ¿Detectó anomalía válida? ── NO ──► [ SIN EVENTO DE DETECCIÓN POSITIVA ]
    └── SÍ
         ▼ (Generar evento y dibujar el recuadro de detección)
  [ EVENTO JSON + FRAME ANOTADO ] ── (Transporte por definir) ──► [ BACKEND CENTRAL / HUB ]
                                                                       │
                                              ┌────────────────────────┴───────────────────────┐
                                              ▼                                                ▼
                                    [ DEDUPLICACIÓN ESPACIAL ]                    [ PERSISTENCIA DE DATOS Y EVIDENCIA ]
                                    (Radio y ventana temporal por validar)              (Metadatos + imágenes; almacenamiento por definir)
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
                         [ MAPA + DETALLE + FRAME CON RECUADRO ]                             [ ENTIDAD RESPONSABLE ]
```

**Evidencia visual:** cada detección enviada al hub incluye el frame asociado con el recuadro de detección de YOLO para visualizarlo en el detalle de la incidencia. Se conserva el contenido de la escena y se incorpora el recuadro antes del envío; no se aplica pixelado. La imagen de referencia aportada por el participante ilustra el resultado esperado —punto en el mapa y detalle con foto—, sin fijar una implementación de frontend.

El hub vincula la evidencia con el evento y la incidencia. Los datos JSON y el archivo de imagen son partes relacionadas del envío: el objetivo de menos de 1 KB corresponde solo al JSON, no al envío completo. Incorporar imágenes exige medir su tamaño, frecuencia de envío y almacenamiento.

Las fuentes aportan información; las entidades consumidoras consultan la API y reciben los tickets derivados. Para Córdoba se contemplan Cordobeses en Alerta, Guardia Urbana y COYS, cuyo rol concreto queda por confirmar. La integración con estas fuentes no se considera implementada.

La deduplicación, la agregación y la persistencia son responsabilidades coordinadas dentro del hub; el diagrama no exige servicios independientes ni define su ejecución concurrente. La ausencia de una detección positiva no informa por sí sola la cobertura de la cámara ni demuestra que un problema desapareció.

El hub mantiene una referencia central de cada incidencia y alimenta dos salidas independientes: la API de consulta para el mapa y la derivación de tickets. El mapa consume los datos de la API; no es necesario consultarlo para generar un aviso. Un fallo en la entrega del ticket no impide consultar la incidencia.

La recepción y las actualizaciones que informe la entidad se vinculan a la incidencia central. El estado del aviso se distingue del estado del problema: recibir un ticket no significa haberlo resuelto. El canal de entrega y la forma de confirmar recepción quedan por definir.

### Catálogo de referencia y niveles de gravedad

La gravedad se asigna mediante **reglas determinísticas por `type_problem` en el hub** (sin LLM por evento). La fuente envía `severity: null`.

1. **Gestión de Residuos (`residuos`):**
   - `contenedor_vacio` → `bajo` (Normal / Sin despacho)
   - `contenedor_lleno` → `medio` (Contenedor lleno)
   - `contenedor_desbordado` → `alto` (Contenedor desbordado)
   - `basura_acumulada_piso` → `medio` (Basura acumulada en la vía pública)
   - *Escalable:* poda, escombros, bolsas clasificadas por color.
2. **Infraestructura y Vía Pública (`calzada`, `alumbrado`, `senalizacion`):**
   - `bache_calzada` → `alto` (Daño asfáltico en calzada)
   - `luminaria_apagada_rota` → `medio` (Indicio visual de problema de alumbrado; no confirma la causa)
   - `poste_caido` → `extremo` (Poste caído o inclinado con riesgo en vía pública)
   - `semaforo_danado` → `extremo` (Semáforo dañado o apagado)
3. **Escala de Severidad:**
   - `bajo` | `medio` | `alto` | `extremo`

---

## 2. Componentes del Sistema

### Componente 1: Captura y detección
- **Entrada inicial:** frames preparados y metadatos de ubicación, fecha/hora y fuente simulados/mockeados. La integración con cámaras de móviles, domos y GPS reales será posterior.
- **Modelo y modo del MVP:** enfoque híbrido sobre frames preparados: **YOLO11n real** en categorías con pesos disponibles (residuos/contenedores y baches) + **YOLO-World (open-vocabulary)** o clasificador auxiliar para categorías nuevas (`poste_caido`, `luminaria_apagada_rota`, `semaforo_danado`), manteniendo **resultados precargados como respaldo identificado**.
- **Salida:** evento de detección con la estructura definida en la sección 3.1 y su frame JPEG anotado con el recuadro de detección.
- **Responsabilidad del emisor:** producir y entregar eventos vía HTTPS `multipart/form-data` (JSON + JPEG juntos); retener en cola local lo pendiente y reintentar conservando el mismo `event_id` hasta que el hub confirme la recepción de ambos.
- **Disparo y umbrales de referencia:** `conf > 0.65` (referencia) y consumo Edge 5–10 W (estimación de referencia para hardware real futuro).
- **Preparación de la evidencia:** JPEG con el recuadro de la detección dibujado sobre el frame, sin pixelado (límite orientativo ≤ 1–2 MB). No se transmite video continuo.

### Componente 2: Ingesta y consolidación en el hub
- **Entrada:** solicitud HTTPS `multipart/form-data` en `POST /api/v1/telemetry/events` con evento JSON (sección 3.1) y frame JPEG anotado.
- **Control de reenvíos (idempotencia):** reconocer `event_id` ya recibidos para no registrar otra observación, no duplicar adjuntos ni aumentar contadores. El hub confirma aceptación únicamente después de guardar ambos.
- **Asignación de gravedad:** reglas determinísticas por `type_problem` en el hub (sin LLM); `severity` entra como `null` desde el emisor.
- **Consolidación:** asociar por `type_problem`, proximidad (`15–20 m` iniciales) e incidencia `activa`. La ventana de `6 h` se usa para buscar observaciones recientes, sin crear automáticamente una nueva incidencia si vence el plazo mientras la incidencia siga activa.
- **Persistencia:** PostgreSQL/PostGIS para observaciones, incidencias y referencias a evidencia; carpeta persistente en el servidor para los archivos JPEG durante el MVP, detrás de una interfaz de almacenamiento desacoplada.
- **Conteos y pasadas:** `observation_count` cuenta observaciones distintas. `pass_id` no es obligatorio en el emisor; `pass_count` se calcula en el hub como **estimado** agrupando observaciones por `device_id` e intervalo temporal configurable (ej. 30 min).

### Componente 3: API de consulta y mapa de calor
- **Entrada:** incidencias consolidadas del hub.
- **Endpoints de consulta:**
  - `GET /api/v1/analytics/heatmap` → GeoJSON para mapa de calor; **1 contribución por incidencia activa** ponderada por gravedad (sin multiplicar por cantidad de frames).
  - `GET /api/v1/incidents` → listado paginado filtrable por tipo (`category`/`type_problem`), gravedad (`severity`), estado (`status`), entidad (`recipient_id`) y fecha (`desde`/`hasta`).
  - `GET /api/v1/incidents/{incident_id}` → detalle completo de la incidencia y lista de referencias (`evidence_ids`).
  - `GET /api/v1/evidence/{evidence_id}` → recuperación controlada del JPEG anotado.
- **Consumidores:** interfaz del mapa y entidades que consulten la API. La consulta y la derivación de tickets son salidas independientes del hub.

### Componente 4: Derivación de Tickets
- **Entrada:** incidencia consolidada y registrada en el hub.
- **Proceso:** resolver destinatario mediante tabla configurable `(type_problem, jurisdiccion) → recipient_id`. Para el MVP: **1 entidad destinataria por incidencia** y un **receptor HTTP simulado**.
- **Salida:** ticket con la estructura de la sección 3.3; `ticket_id` estable ante reintentos e `incident_id` vinculado. Si el receptor necesita la foto, recibe una referencia controlada (`evidence_ref`) sin adjuntar el binario.
- **Seguimiento y estados:**
  - **Estados de ticket:** `pendiente_envio | fallido | recibido | en_atencion | resuelto`.
  - **Estados de incidencia:** `activa | en_atencion | resuelta` (en fase posterior, verificación por cámaras podrá marcar `posiblemente_resuelta`).
  - La entidad informa `recibido → en_atencion → resuelto`. **Nunca se cierra una incidencia por ausencia de nuevos eventos.** Un fallo de entrega del ticket mantiene el aviso visible como pendiente/fallido sin bloquear la consulta de la incidencia.

---

## 3. Especificación de Contrato de Datos

Los siguientes ejemplos describen los tres payloads JSON acordados para el flujo. Los identificadores y valores son ilustrativos. El envío del frame de evidencia se incorpora como requisito adicional en la sección 3.5; todavía no se elige su formato ni se modifican estos ejemplos.

### 3.1. Evento de detección — fuente → backend

Representa una observación enviada por la fuente junto al frame JPEG anotado vía HTTPS `multipart/form-data`. `event_id` identifica el evento y se conserva al reintentar su envío (idempotencia). `pass_id` no es obligatorio; el hub estima las pasadas.

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

### 3.2. Incidencia — hub → consumidores de la API

Representa el problema centralizado que reúne observaciones. `observation_count` cuenta observaciones distintas y `pass_count` es un **estimado** calculado en el hub por `device_id` e intervalo configurable.

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
  "last_confidence": 0.89,
  "evidence_ids": ["evd-demo-001"]
}
```

### 3.3. Ticket — hub → entidad responsable

Representa la derivación a una entidad. `ticket_id` es estable en reintentos, `incident_id` vincula la incidencia central, `recipient_id` identifica al destinatario (1 entidad por incidencia en el MVP, receptor simulado) y `evidence_ref` da acceso controlado al JPEG sin adjuntar el binario.

```json
{
  "ticket_id": "tkt-demo-001",
  "incident_id": "inc-demo-001",
  "recipient_id": "entidad-demo-higiene",
  "status": "pendiente_envio",
  "created_at": "2026-11-12T18:26:00Z",
  "evidence_ref": "/api/v1/evidence/evd-demo-001",
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

### 3.5. Evidencia visual asociada

- **Contenido:** frame JPEG con el recuadro de detección dibujado, sin pixelado (límite orientativo ≤ 1–2 MB).
- **Relación:** vinculada al `event_id` original y al `incident_id` consolidado en BD.
- **Entrega:** envío conjunto de JSON + JPEG vía HTTPS `multipart/form-data` en `POST /api/v1/telemetry/events`; confirmación conjunta tras guardar ambos.
- **Almacenamiento y consulta:** carpeta persistente del servidor en el MVP, detrás de una interfaz desacoplada y servida por `GET /api/v1/evidence/{evidence_id}`. Los tickets reciben `evidence_ref` sin adjuntar binario.

---

## 4. Plan de Acción y Próximos Pasos (Sin código hasta aprobación)

| Fase | Tarea | Dependencia |
|---|---|---|
| **Fase 1 (Cerrada)** | Decisiones de arquitectura y contratos cerradas (estructura inicial mockeada del MVP) | Actualizado en `contratos.md` y `decision-log.md` |
| **Fase 2** | Definir fixtures simulados de eventos, frames JPEG anotados y casos de prueba | Fase 1 |
| **Fase 3** | Completar y aprobar los diagramas de solución y recorrido del usuario en `harness/arquitectura/` | Fase 2; aprobación de dueños de nodo y Samo |
| **Fase 4** | Implementar estructura inicial mockeada (ingesta, consolidación, almacenamiento local, 4 endpoints de consulta y receptor simulado de tickets) | Fase 3 aprobada |
| **Fase 5** | Verificación punta a punta mockeada (flujo completo + reenvío idempotente + fallo simulado de entrega) | Fase 4 |

---

## 5. Decisiones cerradas (Iteración 2 — 12/11 22:35)

1. **Identificadores de pasada:** `pass_id` no obligatorio en el emisor; `pass_count` estimado en el hub por `device_id` e intervalo configurable.
2. **Gravedad:** reglas determinísticas por `type_problem` en el hub (sin LLM); fuente envía `severity: null`.
3. **Consolidación:** `type_problem` + radio `15–20 m` + incidencia `activa` (búsqueda 6 h, sin crear nueva incidencia al vencer).
4. **Estados y resolución:** ticket (`pendiente_envio | fallido | recibido | en_atencion | resuelto`) separado de incidencia (`activa | en_atencion | resuelta`, más `posiblemente_resuelta` a futuro). Nunca cerrar por ausencia de eventos.
5. **Comunicación:** HTTPS `multipart/form-data` (JSON + JPEG), confirmación conjunta e idempotencia por `event_id`; MQTT post-MVP.
6. **Derivación:** tabla `(type_problem, jurisdiccion) → recipient_id`, 1 entidad en MVP, receptor HTTP simulado, `ticket_id` estable y `evidence_ref` controlada.
7. **Detección del MVP:** híbrido sobre frames preparados (YOLO11n real en categorías con pesos + YOLO-World para clases nuevas) con respaldo precargado/mockeado identificado.
8. **Consultas y mapa:** `heatmap` (1 contribución por incidencia activa), listado filtrado, detalle y evidencia.
9. **Verificación del MVP:** flujo completo **mockeado** punta a punta + pruebas de reenvío sin duplicación y fallo de entrega con ticket visible.
10. **Evidencia visual:** JPEG anotado ≤ 1–2 MB en carpeta persistente detrás de `GET /api/v1/evidence/{evidence_id}`.
