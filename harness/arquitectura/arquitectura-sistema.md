# Arquitectura del sistema: hub de incidencias urbanas

- **Fecha:** 12/11/2026
- **Estado:** diseño técnico en iteración; no acredita implementación ni aprobación de diagramas.
- **Alcance funcional:** recibir detecciones y sus frames de evidencia, consolidar incidencias en un hub y ofrecer dos salidas: consulta por API para el mapa y derivación de tickets a entidades responsables. El MVP parte de captura simulada; la integración con cámaras de móviles, domos y procesamiento Edge se plantea para después.

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

Los tipos del documento base se conservan como referencia. La selección para el MVP, las reglas de gravedad y la tabla de destinatarios siguen pendientes.

1. **Gestión de Residuos:**
   - `contenedor_vacio` (Normal / Sin despacho)
   - `contenedor_lleno` (Contenedor lleno)
   - `contenedor_desbordado` (Contenedor desbordado)
   - `basura_acumulada_piso` (Basura acumulada en la vía pública)
   - *Escalable:* Poda, escombros, bolsas clasificadas por color.
2. **Infraestructura y Vía Pública:**
   - `bache_calzada` (Daño asfáltico en calzada)
   - `luminaria_apagada_rota` (Indicio visual de problema de alumbrado; no confirma la causa)
3. **Escala de Severidad:**
   - `bajo` | `medio` | `alto` | `extremo`

---

## 2. Componentes del Sistema

### Componente 1: Captura y detección
- **Entrada inicial:** frames y metadatos de ubicación, fecha/hora y fuente simulados. La integración con cámaras de móviles, domos y GPS reales será posterior.
- **Salida:** evento de detección con la estructura definida en la sección 3.1 y su frame anotado con el recuadro de detección. La elección entre detección real y resultados precargados para el MVP sigue pendiente.
- **Responsabilidad del emisor:** producir y entregar eventos; no mantener un historial de incidencias. El emisor descarta su copia una vez recibidos los datos y la imagen por el hub. La confirmación de entrega completa, las fallas parciales y los reintentos quedan por definir.
- **Responsabilidad del hub:** centralizar las observaciones, consolidarlas en incidencias y mantener su información para consulta y derivación.
- **Modelo propuesto en la referencia:** YOLO11n y ejecución mediante ONNX Runtime / TensorRT. Pesos, hardware y optimización FP16/INT8 pendientes de evaluar.
- **Consumo de referencia:** 5–10 W, estimación del documento base sin medición del proyecto.
- **Disparo propuesto:** analizar frames y emitir eventos que cumplan el umbral de confianza. El valor `conf > 0.65` procede de la referencia y sigue pendiente de validación.
- **Transmisión:** JSON compacto más archivo de imagen asociado. El objetivo de menos de 1 KB se limita a los metadatos; formato, compresión y límites de la imagen quedan pendientes. El transporte de eventos e imágenes puede diferir, según la alternativa que se acuerde.
- **Preparación de la evidencia:** dibujar el recuadro de la detección sobre el frame y enviar esa imagen, sin pixelado. Se envían frames asociados a detecciones; no se plantea transmitir video continuo. Acceso y conservación de las imágenes quedan por definir.

### Componente 2: Ingesta y consolidación en el hub
- **Entrada:** evento de detección de la sección 3.1 y frame de evidencia asociado; requisitos de vinculación en la sección 3.5.
- **Endpoint de ingesta:** `POST /api/v1/telemetry/events`.
- **Control de reenvíos:** reconocer `event_id` ya recibidos para no registrar otra observación ni aumentar contadores por el mismo mensaje. Los reintentos de la evidencia deben mantener la vinculación con el evento y evitar adjuntos duplicados; la confirmación de imagen completa queda pendiente.
- **Consolidación:** relacionar una observación nueva con una incidencia existente mediante `detection.type_problem`, `location.lat`, `location.lon` y `timestamp`; crear una incidencia cuando corresponda a un problema nuevo.
- **Persistencia:** centralizar observaciones, incidencias y referencias a sus imágenes. PostgreSQL/PostGIS es la tecnología planteada para los datos; la solución de almacenamiento de archivos queda por definir.
- **Salida:** incidencia con la estructura de la sección 3.2.
- **Conteos:** `observation_count` cuenta observaciones diferentes de una incidencia. El número de incidencias de un tipo se obtiene agrupando incidencias consolidadas por `type_problem`; es distinto del número de frames o mensajes recibidos.
- **Pendiente:** decidir si se conservan `pass_id` y `pass_count`. Su finalidad anterior era distinguir pasadas, pero su generación y utilidad no quedaron acordadas; se mantienen provisionalmente en los ejemplos.

El radio de 15–20 metros y la ventana de seis horas son valores de referencia, no reglas validadas. La duración de una incidencia y las condiciones para asociar nuevas observaciones siguen pendientes de definición.

### Componente 3: API de consulta y mapa de calor
- **Entrada:** incidencias consolidadas del hub.
- **Consulta de incidencias:** listado y detalle mediante la estructura de la sección 3.2. El detalle debe permitir recuperar los frames vinculados a la incidencia, con el recuadro de detección visible y sin pixelado. Rutas, permisos y referencias de acceso a la imagen quedan pendientes.
- **Endpoint Analítico:** `GET /api/v1/analytics/heatmap` (parámetros: `categoria`, `severidad`, `desde`, `hasta`).
- **Respuesta geográfica:** GeoJSON para representar el mapa de calor. La ponderación frecuencia × gravedad procede de la referencia y queda por validar.
- **Evidencia visual:** al consultar un punto del mapa, la aplicación obtiene el detalle y su imagen mediante el mecanismo autorizado que se acuerde. La base de datos conserva la relación evento–imagen–incidencia; el diseño no obliga a incluir el archivo dentro de cada respuesta JSON.
- **Consumidores:** interfaz del mapa y entidades que consulten la API. La consulta y la derivación de tickets son salidas independientes del hub.

### Componente 4: Derivación de Tickets
- **Entrada:** incidencia consolidada y registrada en el hub.
- **Proceso:** determinar la entidad responsable según el tipo de problema y su jurisdicción; generar o actualizar el ticket vinculado a esa incidencia.
- **Salida:** ticket con la estructura acordada en la sección 3.3; `ticket_id` identifica la derivación e `incident_id` la vincula al problema central.
- **Seguimiento:** registrar el resultado del envío y la confirmación de recepción cuando el canal la permita. Conservar el aviso pendiente o fallido si la entrega no se completa.
- **Independencia:** la derivación y la consulta del mapa trabajan sobre las mismas incidencias; ninguna necesita esperar a que la otra sea utilizada.
- **Pendiente:** tabla de destinatarios y jurisdicciones, canal de entrega, respuestas de recepción y reglas de reintento y actualización. La estructura base del ticket está definida; su implementación real o simulada en el MVP debe acordarse. También queda por decidir si la entidad destinataria tendrá acceso a la imagen y por qué mecanismo; no se agrega todavía un adjunto al contrato 3.3.
- **Verificación en evaluación:** actualización por la entidad responsable y observaciones posteriores de cámaras. Las condiciones para pasar a resuelta o posiblemente resuelta, y la información necesaria para verificar cobertura, siguen abiertas. No se considera una falta de nuevos eventos como confirmación de resolución.

---

## 3. Especificación de Contrato de Datos

Los siguientes ejemplos describen los tres payloads JSON acordados para el flujo. Los identificadores y valores son ilustrativos. El envío del frame de evidencia se incorpora como requisito adicional en la sección 3.5; todavía no se elige su formato ni se modifican estos ejemplos.

### 3.1. Evento de detección — fuente → backend

Representa una observación enviada por la fuente. `event_id` identifica el evento y se conserva al reintentar su envío. La permanencia y el significado operativo de `pass_id` siguen pendientes; no se lo usa como sustituto de `event_id`.

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

Representa el problema centralizado que reúne observaciones. `observation_count` cuenta observaciones distintas y `last_confidence` corresponde a la última detección. `pass_count` permanece provisional hasta decidir el uso de pasadas.

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

Representa la derivación a una entidad. `ticket_id` identifica el ticket, `incident_id` lo vincula con la incidencia central y `recipient_id` identifica al destinatario. El bloque `incident` incluye los datos necesarios para entender el aviso. Este payload describe la salida; las respuestas de recepción y actualización todavía no están definidas.

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

### 3.5. Evidencia visual asociada

- **Contenido:** frame con el recuadro de detección de YOLO, para visualizarlo en el detalle de la incidencia. La escena se conserva sin pixelado.
- **Relación:** la imagen debe vincularse al `event_id` que la originó y, tras la consolidación, al `incident_id` correspondiente. Una incidencia puede reunir evidencia de varias observaciones.
- **Anotación:** el recuadro forma parte de la imagen enviada. No se exige que el frontend lo reconstruya ni se agregan todavía coordenadas de la caja a los payloads JSON.
- **Entrega:** el contrato debe permitir saber cuándo están recibidos tanto los metadatos como el archivo; la confirmación conjunta y el tratamiento de fallas parciales quedan pendientes.
- **Consulta:** el detalle de la incidencia debe proporcionar acceso autorizado a su evidencia; el mapa de calor no necesita transportar las imágenes de todos los puntos.
- **Opciones por definir:** envío conjunto de JSON y archivo, o carga del archivo separada y posterior asociación mediante una referencia. No se introduce todavía una propiedad de imagen en los JSON ni un endpoint adicional.
- **Almacenamiento y retención:** definir dónde se guarda el archivo, quién puede consultarlo, cuánto se conserva y si se mantienen todos los frames o una selección representativa.


---

## 4. Plan de Acción y Próximos Pasos (Sin código hasta aprobación)

| Fase | Tarea | Dependencia |
|---|---|---|
| **Fase 1 (Actual)** | Resolver las decisiones pendientes y validar arquitectura y contratos de evento, evidencia visual, incidencia y ticket | Revisión con participantes y dueños de nodo |
| **Fase 2** | Definir fixtures de eventos, frames de evidencia y metadatos de ubicación y tiempo, identificados como simulados | Fase 1 |
| **Fase 3** | Completar y aprobar los diagramas de solución y recorrido del usuario en `harness/arquitectura/` | Fase 2; aprobación de dueños de nodo y Samo |
| **Fase 4** | Implementar ingesta, consolidación, almacenamiento y consulta de evidencia, consultas de incidencias, datos para el mapa y derivación de tickets según el modo acordado para el MVP | Fase 3 aprobada |
| **Fase 5** | Integrar mapa y detalle con el frame y su recuadro de detección; verificar consulta y derivación, incluyendo fallas de carga de imagen | Fase 4 y criterios de aceptación acordados |

---

## 5. Decisiones pendientes para la próxima iteración

Estas cuestiones permanecen abiertas. Las recomendaciones discutidas no se consideran decisiones tomadas.

1. **Identificadores de pasada:** conservar o quitar `pass_id` y `pass_count`; definir su significado si se conservan.
2. **Gravedad:** reglas del hub, IA o combinación; responsable de asignarla y criterios para los cuatro niveles.
3. **Consolidación:** condiciones para unir observaciones, distinguir problemas cercanos y tratar incidencias activas; radio y ventana temporal.
4. **Estados y resolución:** estados permitidos, actualizaciones de la entidad y evidencia para indicar «posiblemente resuelta»; necesidad y formato de información de cobertura.
5. **Comunicación:** HTTPS o MQTT, confirmación de recepción, reintentos y conservación temporal de eventos pendientes.
6. **Derivación:** destinatarios y jurisdicciones, canal de entrega, respuestas de recepción y actualización, y posibilidad de varios destinatarios por incidencia.
7. **Detección del MVP:** modelo real o resultados precargados; categorías, pesos, hardware, umbrales y presupuesto de recursos. Las tecnologías del documento base son propuestas por evaluar.
8. **Consultas y mapa:** rutas de listado y detalle, filtros y ponderación del mapa de calor.
9. **Verificación del MVP:** recorrido y resultados necesarios para considerarlo funcionando; pasos reales y simulados identificados.
10. **Evidencia visual:** transporte de JSON e imagen anotada, confirmación de entrega completa, formato/tamaño/compresión, almacenamiento, permisos, retención, selección de frames y acceso desde tickets.
