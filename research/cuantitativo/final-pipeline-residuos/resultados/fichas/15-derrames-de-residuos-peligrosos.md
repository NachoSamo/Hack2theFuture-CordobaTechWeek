# Derrames y contaminación por residuos industriales peligrosos

*Ficha 15 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| GESTION_DEFICIENTE_RESIDUOS_ESPECIALES | PARCIAL | 1 | 1 | 2017 | BAJA | 3,00 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  

## Resumen

El 04/04/2017 se encontraron contaminantes en el agua después de un derrame de residuos peligrosos en la planta de Taym, en Córdoba (11). Afecta a la población de la zona y al agua del canal Los Molinos. Es un solo caso, de hace nueve años, pero ocurrió en Córdoba y afecta el agua.

## Qué pasa

- 04/04/2017 (Clarín), Córdoba: se encontraron contaminantes en el agua después de un derrame de residuos peligrosos en la planta de Taym (11). Afectados: la población de la zona y el agua del canal Los Molinos.
- Filas dudosas, que no cuentan: 320 (26/09/2023, URL): apartan a un juez en una causa por la contaminación del Riachuelo por dos frigoríficos. 381 (27/09/2024): polémica por la valorización de escorias en el País Vasco.

## Dónde y cuándo

Córdoba (11). Hay una sola noticia, de 2017. No se repite en el dataset.

Noticias por año: **2017:** 1 (11)

## A quién afecta

**Directos (según las noticias)**

- Población de la zona (11).
- Agua del canal Los Molinos (11).

**Indirectos**

- (inferido) Quienes reciben agua de ese canal.

## Causas

**Según las noticias**

- Sin datos en las noticias. La fila no dice por qué hubo un derrame.

**Inferidas (no las dice el texto)**

- Fallas de control en la planta.
- Residuos peligrosos tratados cerca de cursos de agua.

## Actores involucrados

**En las noticias**

- Planta de Taym (11).

**Inferidos**

- Organismo de ambiente de Córdoba.
- Prestador de agua.
- Justicia.

## Qué existe hoy

Estado: **PARCIAL**.

- Hay cuatro soluciones parciales que atacan problemas vecinos:
- 110 (09/09/2024: sistema con filtro de carbón para atrapar y destruir PFAS) y 475 (30/09/2025: Eurecat convierte residuos forestales en materiales para descontaminar aguas y regenerar suelos).
- 215 (25/03/2026: la industria británica de la pintura recoge y recicla restos de pintura) y 468 (10/09/2025: reporte de sostenibilidad de Saint Gobain Argentina sobre residuos especiales).
- Ninguna trata el control de las plantas ni el aviso a la población.

## La necesidad

> La población cercana a plantas de residuos peligrosos necesita saber a tiempo si su agua está contaminada porque un derrame en la planta de Taym contaminó el canal Los Molinos en Córdoba (11), y hoy (2017) la contaminación se detectó después del derrame.

## ¿Se puede abordar con un sistema?

**PARCIAL.** El monitoreo y la alerta son abordables. El control de la planta es regulatorio.

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 4 | Agua contaminada (11). |
| Innovación | 20 % | 3 | Solo hay soluciones vecinas. |
| Factibilidad | 20 % | 2 | El control de la planta es regulatorio. |
| Escalabilidad | 15 % | 2 | Es un caso puntual. |
| Vínculo con el ecosistema | 10 % | 4 | Pasó en Córdoba, aunque en 2017. |
| **Total ponderado** | 90 % | **3,00** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos avisar a tiempo a la población cuando un derrame puede llegar a su agua?
- ¿Cómo podríamos saber qué plantas de residuos peligrosos están cerca de cursos de agua?

## Qué falta validar

- ¿Hubo otros derrames desde 2017? ¿Qué pasó con la planta de Taym?
- Preguntar al organismo de ambiente, al prestador de agua, a vecinos de la zona, a ONG ambientales y a periodistas locales.

## Límites de la evidencia

- Solidez BAJA. Lo sostienen 1 noticia válida de 1 medio: Clarín (1).
- No se puede hablar de un patrón con un solo caso.
- Las dos filas relacionadas son dudosas (320, 381).
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco.

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 11 | 04/04/2017 | Clarín | Contaminación en agua tras derrame de residuos peligrosos | https://www.clarin.com/sociedad/cordoba-hallan-contaminantes-agua-derrame-residuos-peligrosos_0_HyDYYsb6g.html |

**Soluciones del dataset relacionadas**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 110 | 09/09/2024 | Residuos Profesional | [parcial] Solución para PFAS | https://www.residuosprofesional.com/solucion-integral-atrapar-destruir-pfas/ |
| 215 | 25/03/2026 | Residuos Profesional | [parcial] La industria británica de la pintura lanza un proyecto piloto para recoger y reciclar restos de pintura | https://www.residuosprofesional.com/industria-britanica-pintura-reciclaje/ |
| 468 | 10/09/2025 | ECOBIZ | [parcial] Saint Gobain: Gestión de Residuos Especiales | https://ecobiz.com.ar/nota/1079-Saint-Gobain-La-sostenibilidad-debe-ser-inclusiva-concreta-y-transformadora |
| 475 | 30/09/2025 | Residuos Profesional | [parcial] Eurecat convierte residuos forestales en materiales para descontaminar aguas y regenerar suelos | https://www.residuosprofesional.com/residuos-forestales-descontaminar-aguas-regenerar-suelos/ |

**Otras filas citadas**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 320 | 26/09/2023 (URL) | Infobae | [Dudosa, no cuenta] Juez apartado en causa por contaminación del Riachuelo | https://www.infobae.com/judiciales/2023/09/26/apartaron-al-juez-de-moron-en-una-causa-que-investiga-a-dos-frigorificos-por-contaminacion-del-riachuelo/ |
| 381 | 27/09/2024 | Ecoticias | [Dudosa, no cuenta] Polémica sobre valorización de escorias en País Vasco | https://www.ecoticias.com/residuos-reciclaje/valorizacion-escorias |

---
[← Volver al índice](00-indice.md)
