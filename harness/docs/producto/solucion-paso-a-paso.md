---
tipo: producto
fecha: 2026-11-12
dueña: Oli
estado: borrador para refinar (reescrito tras el pivot de las 14:53 y las decisiones de las 15:08)
track: movilidad (equilibrio de emisiones), cruza residuos y mantenimiento urbano
---

# Solución paso a paso: el flujo del sistema

> Vista de producto del flujo. Baja a detalle la Parte A §4 de [`idea-y-epicas.md`](idea-y-epicas.md)
> sobre el dominio de [`dominio-del-problema.md`](dominio-del-problema.md). Acá no se definen contratos
> ni tecnología: eso vive en [`contratos.md`](../../contratos.md) y en cada nodo de
> [`arquitectura/solucion.html`](../../arquitectura/solucion.html) (Samo, 15:08). Lo que dice
> **supuesto** no está validado; lo que dice **simulado** es así en la demo.

## Qué entendemos por movilidad

> **Equilibrio de emisiones:** el consumo del monitoreo, que hoy solo se usa para seguridad y patrulla
> urbana, lo justificamos usándolo también para detectar todo lo que en la ciudad requiere atención.
> (Oli, 12/11 14:53; reemplaza la definición anterior centrada en optimizar rutas)

No agregamos vehículos, sensores ni recorridos: hacemos que los kilómetros que ya se recorren rindan más.

| Recurso que se aprovecha | Qué cambia | Indicador | Etapa |
|---|---|---|---|
| **Kilómetros de los vehículos con cámara** (monitoreo municipal, Cordobeses en Alerta, Policía) | Además de seguridad, detectan problemas de la ciudad | **Km reutilizados como detección** (cifra principal) | 1, 2 y 6 |
| **Cámaras que ya están en los móviles** | Pasan a ser sensores de la ciudad | Incidencias detectadas por km | 2 |
| **Recorridos de inspección de las áreas** | Ya no salen a buscar: reciben el aviso | Recorridos evitados (candidato) | 4, 5 y 6 |
| **Tiempo de las áreas que resuelven** | Se enteran antes y con ubicación exacta | Tiempo de resolución, medido por la próxima pasada (candidato) | 3 y 6 |

La cifra del pitch: **km que ya se recorrían, ahora convertidos en detección, con sus litros y kg de CO₂ equivalentes.**

## El flujo en una línea

```text
1 Captura → 2 Detección y clasificación → 3 Consolidación de incidencias → 4 Aviso directo al área → 5 Panel → 6 Impacto
```

Cada etapa sigue un nodo de la arquitectura de Samo (15:08): 01 Captura, 02 Detección y clasificación,
03 Consolidación de incidencias, 04 Derivación al área y 05 Panel e impacto (etapas 5 y 6).

---

## Etapa 1 · Captura: los vehículos recorren como siempre

- **Qué pasa:** los vehículos con cámara (móviles de monitoreo del municipio, Cordobeses en Alerta y móviles policiales)
  hacen su recorrido habitual. No cambia su ruta ni su trabajo.
- **Entra:** el video de cada vehículo, con posición GPS y hora.
- **Sale:** cuadros sueltos con lugar, hora y fuente.
- **Recurso aprovechado:** el recorrido y el combustible del patrullaje, que se gastan igual.
- **En la demo:** **simulado**, con video o imágenes georreferenciadas de un barrio de Córdoba (E1, regla 5 de código).
- **Abierto:** dónde se procesan las imágenes (móvil o servidor); afecta la respuesta de privacidad.
- **Supuesto:** H1, H5 y H7 (los vehículos existen, hoy solo sirven a seguridad y sus dueños compartirían el dato).

## Etapa 2 · Detección y clasificación: de imagen a dato

- **Qué pasa:** un modelo de visión revisa cada cuadro y clasifica lo que encuentra: microbasural o
  voluminoso, bache, poste o cable caído, contenedor lleno o roto. Todo lo demás se descarta. Ninguna
  categoría es protagonista: todas siguen el flujo completo.
- **Sale:** una detección con categoría, lugar, hora, fuente y confianza.
  **Nunca se guardan imágenes de personas ni patentes.**
- **En la demo:** imágenes reales o públicas con un modelo o LLM multimodal, con respaldo determinístico (E2, regla 4).
- **Abierto:** técnica de detección, escala de gravedad y umbral de confianza (dueño del nodo 2).
- **Supuesto:** H6, que se detecta con precisión suficiente desde un vehículo en movimiento.

## Etapa 3 · Consolidación: un ticket por incidencia

- **Qué pasa:** las detecciones de todas las fuentes y pasadas sobre el mismo lugar y categoría se juntan
  en **un ticket**. Cada nuevo avistamiento suma confianza. Cuando una pasada posterior ya no la ve, el
  ticket queda **"posiblemente resuelto"**: así se cierra el ciclo y se mide el tiempo de resolución sin
  pedirle datos al área.
- **Sale:** tickets con categoría, lugar, estado, avistamientos y primera y última vez visto.
- **En la demo:** **simulado**, con varias pasadas sobre un barrio (por ejemplo, la acumulación de
  Güemes o Mercado Norte, ficha 03).
- **Abierto:** cuándo dos detecciones son la misma incidencia; cuántos avistamientos hacen falta para
  avisar; cuántas pasadas sin verla para darla por resuelta.

## Etapa 4 · Aviso directo al área: sin nadie en el medio

- **Qué pasa:** según la categoría, el ticket le llega **directo al área responsable** (higiene urbana,
  alumbrado, vía pública). Nadie asigna ni reenvía: velocidad y escala. (Decisión de Samo 15:08, por
  recomendación de varios mentores; reemplaza "COYS confirma y asigna".)
- **Entra:** tickets de la etapa 3 y una tabla categoría → área.
- **Sale:** un aviso al área con ubicación, categoría, avistamientos y estado.
- **En la demo:** tabla categoría → área hardcodeada y anotada en el decision log.
- **Abierto:** por qué canal llega el aviso y qué umbral evita avisar falsos positivos.
- **Supuesto:** H8, que las áreas actúan sobre un aviso automático.

## Etapa 5 · Panel: cada usuario ve lo suyo

Dos vistas sobre los mismos tickets (E5):

- **Área que resuelve:** sus tickets con ubicación, avistamientos y estado.
- **Municipio (área de monitoreo):** vista general de todas las incidencias, todas las categorías y la cobertura. No asigna.

Fuera de la demo: vista pública para vecinos.

## Etapa 6 · Impacto: el número que cierra

- **Qué pasa:** se suman los km de patrullaje que generaron detecciones y se traducen a litros y CO₂
  equivalentes, junto con las incidencias detectadas y resueltas.
- **Sale:** km reutilizados, litros y kg de CO₂ equivalentes, incidencias por km y, si alcanza,
  tiempo de resolución (de la primera detección a "posiblemente resuelto").
- **En la demo:** tarjetas con la fórmula y los supuestos visibles. **La cifra sale de la simulación:
  muestra el mecanismo; el piloto de 4 semanas mide la real.**
- **Abierto (E6):** consumo por km del móvil y factor de CO₂, con fuente; cómo contamos el doble impacto.

---

## Cómo cubre el problema

| Lo que pasa hoy (problema) | Etapa que lo resuelve | Cómo |
|---|---|---|
| El patrullaje consume combustible para un solo servicio (supuesto H5) | 1, 2 y 6 | El mismo km también detecta, y se mide |
| Basura acumulada después de feriados y fines de semana largos (ficha 03: filas 170, 284, 306) | 2, 3 y 4 | Se detecta en la pasada y el aviso le llega a higiene urbana |
| Baches, cables caídos o contenedores rotos se conocen por reclamo (supuesto) | 2, 3 y 4 | El área recibe el aviso antes del reclamo, con ubicación |
| Nadie sabe si un problema se resolvió ni cuánto tardó | 3 y 6 | La próxima pasada lo confirma y mide el tiempo |
| Las áreas salen a recorrer para encontrar problemas (supuesto) | 4 y 5 | Reciben el aviso sin recorrer |

## Qué queda abierto

| Pregunta | Dónde se decide |
|---|---|
| ¿Dónde se procesan las imágenes (móvil o servidor)? | Arquitectura, equipo técnico |
| Umbral para avisar y para dar por resuelta una incidencia | E3 |
| Lista de áreas, tabla categoría → área y canal del aviso | E4 |
| Consumo por km del móvil y factor de CO₂, con fuente | E6 |
| Cómo contamos el doble impacto | E6 y `pitch.md` |

## Relacionado

- [`dominio-del-problema.md`](dominio-del-problema.md) · [`idea-y-epicas.md`](idea-y-epicas.md) ·
  [`arquitectura/solucion.html`](../../arquitectura/solucion.html) · [`demo-path.md`](../../demo-path.md) ·
  [`pitch.md`](../../pitch.md) · [`proceso.md`](../../proceso.md)
- [Ficha 03](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/03-basura-acumulada-en-la-calle.md)
