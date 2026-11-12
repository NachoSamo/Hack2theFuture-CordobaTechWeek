---
tipo: producto
fecha: 2026-11-12
dueña: Oli
estado: borrador para refinar
track: movilidad (cruza residuos)
---

# Solución paso a paso: el flujo del sistema

> Vista de producto del flujo. Baja a detalle la Parte A §4 de
> [`idea-y-epicas.md`](idea-y-epicas.md) y sigue los cinco nodos del borrador de
> [`arquitectura/solucion.html`](../../arquitectura/solucion.html) (Samo, 14:11).
> Acá no se definen contratos ni tecnología: eso vive en [`contratos.md`](../../contratos.md) y en
> cada nodo. Lo que dice **supuesto** no está validado; lo que dice **simulado** es así en la demo.

## Qué entendemos por movilidad

> **Reducir el consumo de combustible haciendo más óptimas las rutas y aprovechando al máximo los
> recursos que ya existen.** (Oli, 12/11)

No agregamos vehículos ni sensores: hacemos que los que ya circulan rindan más. Cuatro recursos:

| Recurso que se aprovecha | Qué cambia | Indicador | Etapa donde se ve |
|---|---|---|---|
| **Móviles de monitoreo que ya circulan** | Sus kilómetros y su combustible, que se gastan igual, además detectan basura | Km de recorrido de monitoreo reutilizados como dato (supuesto H1) | 1 y 2 |
| **Camiones que salen llenos** | La ruta va a donde hay basura, no a zonas vacías | % de capacidad usada por viaje | 4 y 6 |
| **Menos camiones por día** | Misma cobertura con menos vehículos en la calle | Camiones y km por tonelada recolectada | 4 y 6 |
| **Horas de los recolectores** | Menos tiempo en recorridos vacíos, más en puntos críticos | Horas por tonelada; puntos críticos atendidos a tiempo | 4, 5 y 6 |

Los cuatro terminan en el mismo número: **litros de combustible y kg de CO₂ por tonelada
recolectada.** Es la cifra de movilidad del pitch.

## El flujo en una línea

```text
1 Captura → 2 Detección → 3 Mapa de demanda → 4 Rutas + impacto → 5 Panel (recolectora y municipio)
```

Cada etapa = un nodo de la arquitectura. La etapa 6 (impacto) vive dentro del nodo 4.

---

## Etapa 1 · Captura: el móvil hace su recorrido de siempre

- **Qué pasa:** un móvil de monitoreo urbano recorre el barrio como todos los días. No cambia su
  ruta ni su trabajo. Sus cámaras ya están grabando.
- **Entra:** el video del móvil, con posición GPS y hora.
- **Sale:** cuadros sueltos, cada uno con lugar, hora y qué móvil lo tomó.
- **Recurso aprovechado:** el recorrido y el combustible del móvil, que se gastan igual.
- **En la demo:** **simulado**, con un video o un set de imágenes georreferenciadas de un barrio de
  Córdoba (épica E1, regla 5 de código).
- **Abierto:** dónde se procesan las imágenes (en el móvil o en el servidor del municipio). Lo decide
  el equipo técnico en la arquitectura; afecta la respuesta de privacidad.
- **Supuesto:** H1, que esos móviles existen y se puede acceder a su video o a un dato procesado.

## Etapa 2 · Detección: de imagen a dato

- **Qué pasa:** un modelo de visión mira cada cuadro y responde una sola pregunta: ¿hay basura
  acumulada acá? Si la hay, registra cuánta (bajo, medio, alto). Todo lo demás se descarta.
- **Entra:** los cuadros de la etapa 1.
- **Sale:** un evento por acumulación detectada: dónde, cuándo, cuánto y con qué confianza.
  **Nunca se guardan imágenes de personas ni patentes.**
- **Recurso aprovechado:** las cámaras que ya existen pasan a ser sensores de basura.
- **En la demo:** imágenes reales o públicas con detección de un modelo o un LLM multimodal, con
  salida determinística de respaldo (épica E2, regla 4 de código).
- **Abierto:** técnica de detección y umbral de confianza (los decide el dueño del nodo 2).
- **Supuesto:** H3, que se detecta con precisión suficiente desde un vehículo en movimiento.

## Etapa 3 · Mapa de demanda: dónde está la basura de verdad

- **Qué pasa:** los eventos se suman por zona y franja horaria. Un punto pasa a **crítico** si se
  detecta en más de una pasada. Las zonas por donde no pasó ningún móvil se marcan **sin dato**,
  para no confundir "no vimos" con "no hay".
- **Entra:** los eventos de la etapa 2 (en la demo, varias semanas simuladas).
- **Sale:** demanda por zona, puntos críticos y zonas sin dato.
- **Recurso aprovechado:** reemplaza la planificación a ciegas por un dato de demanda que hoy no
  existe (causa raíz supuesta en `idea-y-epicas.md`).
- **En la demo:** **simulado**, con picos después de un fin de semana largo, como en los casos de
  Güemes y Mercado Norte (ficha 03).
- **Abierto:** unidad espacial (cuadra, hexágono o radio de contenedor).

## Etapa 4 · Rutas: el camión va a donde hace falta

- **Qué pasa:** con el mapa de demanda y la flota disponible (cuántos camiones, de qué capacidad,
  desde qué base), el sistema propone las rutas: primero los puntos críticos, sin pasar por zonas
  vacías, llenando cada camión lo más posible. Las zonas sin dato mantienen la ruta fija como base.
- **Entra:** la salida de la etapa 3, la flota y la ruta fija de referencia.
- **Sale:** la ruta fija y la ruta sugerida, cada una con km, carga por camión y puntos críticos
  atendidos.
- **Recursos aprovechados:** camiones llenos, menos camiones por día y horas de los recolectores.
- **En la demo:** las dos rutas lado a lado sobre el mismo barrio (épica E4). Flota y ruta fija
  **simuladas** y anotadas en el decision log.
- **Fuera del scope actual:** cada cuánto se recalculan las rutas (antes del turno, con alertas o en
  tiempo real). La demo muestra una ruta del día. (Oli, 12/11)
- **Supuesto:** H2 (las rutas actuales son fijas) y H4 (rutear por demanda ahorra km y combustible).

## Etapa 5 · Panel: cada usuario ve lo suyo

Dos vistas sobre los mismos datos (épica E5):

- **Recolectora (ejecuta):** rutas del día, carga esperada por camión, km, litros y CO₂.
  Métrica principal: **km por tonelada**.
- **Municipio (planifica):** puntos críticos, cobertura por barrio, zonas sin dato y tendencia de
  reclamos. Métrica principal: **puntos críticos atendidos a tiempo**.

Fuera de este flujo: vista para vecinos o app para el chofer (Oli eligió "operación + municipio", 12/11).

## Etapa 6 · Impacto: el número que cierra

- **Qué pasa:** se compara la ruta fija con la sugerida y se traduce a ahorro.
- **Sale:** km ahorrados, litros de combustible, kg de CO₂ evitados, % de capacidad usada y puntos
  críticos atendidos a tiempo.
- **En la demo:** tarjetas con la fórmula y los supuestos visibles. **El ahorro sale de la
  simulación: muestra el mecanismo; el piloto de 4 semanas mide el ahorro real.**
- **Abierto (E6):** consumo por km del camión y factor de emisión de CO₂ por litro, con fuente.

---

## Cómo cubre el problema

| Lo que pasa hoy (problema) | Qué etapa lo resuelve | Cómo |
|---|---|---|
| Las rutas son fijas y no responden a picos (supuesto H2) | 3 y 4 | El mapa ve el pico y la ruta va primero ahí |
| Basura acumulada después de feriados y fines de semana largos (ficha 03: filas 170, 284, 306) | 2, 3 y 4 | Se detecta en la pasada del móvil y el punto pasa a crítico |
| Camiones que gastan combustible en zonas casi vacías | 4 y 6 | La ruta saltea zonas vacías y llena cada camión |
| Después de un corte del servicio no hay un mapa de dónde atender primero (ficha 09: fila 272) | 3 y 5 | El municipio ve los puntos críticos ordenados |
| No existe un dato de demanda en tiempo real (causa raíz supuesta) | 1 y 2 | Los móviles que ya circulan generan ese dato sin hardware nuevo |

## Qué queda abierto

| Pregunta | Dónde se decide |
|---|---|
| ¿Dónde se procesan las imágenes (móvil o servidor)? | Arquitectura, equipo técnico |
| ¿Cómo sabe el sistema que un punto ya se recolectó? (próxima pasada del móvil, botón del chofer o GPS del camión) | Sin preferencia de Oli; abierto para el equipo |
| ¿Cada cuánto se recalculan las rutas? | Fuera del scope actual |
| Consumo por km y factor de CO₂, con fuente | E6 |
| Unidad espacial del mapa y umbral de punto crítico | Nodo 3 |

## Relacionado

- [`idea-y-epicas.md`](idea-y-epicas.md) · [`arquitectura/solucion.html`](../../arquitectura/solucion.html) ·
  [`demo-path.md`](../../demo-path.md) · [`pitch.md`](../../pitch.md) · [`proceso.md`](../../proceso.md)
- [Ficha 03](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/03-basura-acumulada-en-la-calle.md) ·
  [Ficha 09](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/09-cortes-del-servicio-de-recoleccion.md)
