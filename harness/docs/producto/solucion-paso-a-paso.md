---
tipo: producto
fecha: 2026-11-12
dueña: Oli
estado: borrador para refinar (reescrito tras el pivot de las 14:53)
track: movilidad (equilibrio de emisiones), cruza residuos y mantenimiento urbano
---

# Solución paso a paso: el flujo del sistema

> **Actualización 12/11 15:08 (Samo, por recomendación de varios mentores):** las fuentes son todo vehículo con cámara (móviles de COYS, Cordobeses en Alerta y móviles policiales); tras detectar, **aviso directo a cada área**, sin que COYS asigne (COYS queda con vista general); el ciclo se cierra cuando una pasada posterior ya no ve la incidencia. Donde este doc diga "COYS asigna", manda el [decision log](../../decision-log.md) del 12/11 15:08 y la [arquitectura](../../arquitectura/solucion.html). Falta reescribir esas partes (dueña: Oli).

> Vista de producto del flujo. Baja a detalle la Parte A §4 de [`idea-y-epicas.md`](idea-y-epicas.md)
> sobre el dominio de [`dominio-del-problema.md`](dominio-del-problema.md). Acá no se definen contratos
> ni tecnología: eso vive en [`contratos.md`](../../contratos.md) y en cada nodo de
> [`arquitectura/solucion.html`](../../arquitectura/solucion.html), que **todavía describe la versión
> anterior** (rutas de recolección). Lo que dice **supuesto** no está validado; lo que dice **simulado**
> es así en la demo.

## Qué entendemos por movilidad

> **Equilibrio de emisiones:** el consumo del monitoreo, que hoy solo se usa para seguridad y patrulla
> urbana, lo justificamos usándolo también para detectar todo lo que en la ciudad requiere atención.
> (Oli, 12/11 14:53; reemplaza la definición anterior centrada en optimizar rutas)

No agregamos vehículos, sensores ni recorridos: hacemos que los kilómetros que ya se recorren rindan más.

| Recurso que se aprovecha | Qué cambia | Indicador | Etapa |
|---|---|---|---|
| **Kilómetros del patrullaje de COYS** | Además de seguridad, detectan problemas de la ciudad | **Km reutilizados como detección** (cifra principal) | 1, 2 y 6 |
| **Cámaras que ya están en los móviles** | Pasan a ser sensores de la ciudad | Incidencias detectadas por km | 2 |
| **Recorridos de inspección de las áreas** | Ya no salen a buscar: reciben la incidencia | Recorridos evitados (candidato) | 4, 5 y 6 |
| **Tiempo de las áreas que resuelven** | Se enteran antes y con ubicación exacta | Tiempo desde detección hasta atención (candidato) | 5 y 6 |

La cifra del pitch: **km que ya se recorrían, ahora convertidos en detección, con sus litros y kg de CO₂ equivalentes.**

## El flujo en una línea

```text
1 Captura → 2 Detección → 3 Mapa de incidencias → 4 Priorización y asignación → 5 Panel (COYS y áreas) → 6 Impacto
```

Correspondencia con los nodos del borrador de arquitectura (a revisar con Samo): 01 Captura, 02 Detección,
03 Mapa, 04 pasa de "Optimizador e impacto" a "Priorización e impacto", 05 Panel.

---

## Etapa 1 · Captura: el móvil patrulla como siempre

- **Qué pasa:** un móvil de COYS hace su patrullaje habitual. No cambia su ruta ni su trabajo.
- **Entra:** el video del móvil, con posición GPS y hora.
- **Sale:** cuadros sueltos con lugar, hora y móvil.
- **Recurso aprovechado:** el recorrido y el combustible del patrullaje, que se gastan igual.
- **En la demo:** **simulado**, con video o imágenes georreferenciadas de un barrio de Córdoba (E1, regla 5 de código).
- **Abierto:** dónde se procesan las imágenes (móvil o servidor); afecta la respuesta de privacidad.
- **Supuesto:** H1 y H5 (los móviles existen, se puede acceder al dato y hoy solo sirven a seguridad).

## Etapa 2 · Detección: de imagen a incidencia candidata

- **Qué pasa:** un modelo de visión revisa cada cuadro buscando tres tipos de problema:
  microbasural o voluminoso, vía pública (poste caído, bache, semáforo, alumbrado) y contenedor lleno o
  roto. Si encuentra uno, registra tipo y gravedad. Todo lo demás se descarta.
- **Sale:** un evento por detección: qué, dónde, cuándo, gravedad y confianza.
  **Nunca se guardan imágenes de personas ni patentes.**
- **En la demo:** imágenes reales o públicas con un modelo o LLM multimodal, con respaldo determinístico (E2, regla 4).
- **Abierto:** técnica de detección, escala de gravedad y umbral de confianza (dueño del nodo 2).
- **Supuesto:** H6, que se detecta con precisión suficiente desde un vehículo en movimiento.

## Etapa 3 · Mapa de incidencias: una por lugar

- **Qué pasa:** las detecciones de varias pasadas sobre el mismo lugar se juntan en **una incidencia**.
  Repetirse en más de una pasada sube la confianza. Las zonas por donde no pasó ningún móvil se marcan
  **sin dato**, para no confundir "no vimos" con "no hay".
- **Sale:** incidencias con tipo, lugar, gravedad, primera y última vez vista; zonas sin dato.
- **En la demo:** **simulado**, con varias categorías en un barrio (por ejemplo, la acumulación de
  Güemes o Mercado Norte, ficha 03, y un poste caído inventado y anotado).
- **Abierto:** cuándo dos detecciones son la misma incidencia; unidad espacial.

## Etapa 4 · Priorización y asignación: COYS decide

- **Qué pasa:** el sistema ordena las incidencias por urgencia (categoría, gravedad, antigüedad,
  repeticiones) y sugiere el área responsable. **COYS confirma y asigna.**
- **Sale:** incidencias priorizadas, cada una con su área y estado (nueva, asignada, resuelta).
- **En la demo:** reglas de prioridad hardcodeadas y anotadas en el decision log (E4).
- **Abierto:** el orden de urgencia entre categorías y la lista de áreas.

## Etapa 5 · Panel: cada usuario ve lo suyo

Dos vistas sobre los mismos datos (E5):

- **COYS:** el mapa priorizado con todas las categorías, zonas sin dato y estado de cada incidencia.
- **Área que resuelve:** solo sus incidencias asignadas, con ubicación y un botón de "resuelta".

Fuera de la demo: vista pública para vecinos.

## Etapa 6 · Impacto: el número que cierra

- **Qué pasa:** se suman los km de patrullaje que generaron detecciones y se traducen a litros y CO₂
  equivalentes, junto con las incidencias detectadas y resueltas.
- **Sale:** km reutilizados, litros y kg de CO₂ equivalentes, incidencias por km y, si alcanza,
  tiempo desde detección hasta atención.
- **En la demo:** tarjetas con la fórmula y los supuestos visibles. **La cifra sale de la simulación:
  muestra el mecanismo; el piloto de 4 semanas mide la real.**
- **Abierto (E6):** consumo por km del móvil y factor de CO₂, con fuente; cómo contamos el doble impacto.

---

## Cómo cubre el problema

| Lo que pasa hoy (problema) | Etapa que lo resuelve | Cómo |
|---|---|---|
| El patrullaje consume combustible para un solo servicio (supuesto H5) | 1, 2 y 6 | El mismo km también detecta, y se mide |
| Basura acumulada después de feriados y fines de semana largos (ficha 03: filas 170, 284, 306) | 2, 3 y 4 | Se detecta en la pasada del móvil y se asigna a residuos |
| Postes caídos, baches o contenedores rotos se conocen por reclamo (supuesto) | 2, 4 y 5 | El área recibe la incidencia antes del reclamo, con ubicación |
| Las áreas salen a recorrer para encontrar problemas (supuesto) | 4 y 5 | Reciben la incidencia sin recorrer |

## Qué queda abierto

| Pregunta | Dónde se decide |
|---|---|
| ¿Dónde se procesan las imágenes (móvil o servidor)? | Arquitectura, equipo técnico |
| ¿Cómo se confirma que una incidencia se resolvió? (botón del área o próxima pasada del móvil) | Abierto para el equipo |
| Orden de urgencia entre categorías y lista de áreas | E4 |
| Consumo por km del móvil y factor de CO₂, con fuente | E6 |
| Cómo contamos el doble impacto | E6 y `pitch.md` |

## Relacionado

- [`dominio-del-problema.md`](dominio-del-problema.md) · [`idea-y-epicas.md`](idea-y-epicas.md) ·
  [`arquitectura/solucion.html`](../../arquitectura/solucion.html) · [`demo-path.md`](../../demo-path.md) ·
  [`pitch.md`](../../pitch.md) · [`proceso.md`](../../proceso.md)
- [Ficha 03](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/03-basura-acumulada-en-la-calle.md)
