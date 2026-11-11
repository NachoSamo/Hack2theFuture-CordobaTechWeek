# Inseguridad y muertes de trabajadores en basurales y recolección

*Ficha 04 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| CONFLICTO_TERRITORIAL_Y_LABORAL | SIN SOLUCIÓN | 3 | 3 | 2022–2026 ¹ | MEDIA | 3,67 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  
<sub>¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.</sub>  

## Resumen

Quienes trabajan con la basura corren riesgo de morir o de ser asaltados. Hay dos muertes por aplastamiento en basurales, una de ellas en Córdoba (107, 309), y asaltos a recolectores en Villa Siburu, Córdoba (209). Es el problema con mayor impacto humano de la lista. No hay ninguna solución en el dataset.

## Qué pasa

- 10/02/2022 (URL): un hombre murió aplastado por un camión mientras trabajaba en un basural a cielo abierto (309). Según la URL, estaba juntando material reciclable. La fila no dice dónde.
- 04/09/2024 (URL), Córdoba: Sergio López, recolector, murió aplastado mientras trabajaba en un basural. La noticia lo atribuye a falta de seguridad y a un uso incorrecto del equipo de protección (107). La URL dice que quedó entre un camión y una pala mecánica.
- 12/03/2026 (URL), barrio Villa Siburu (Córdoba): vecinos denuncian que delincuentes asaltan a los recolectores de basura (209). La URL dice que «le roban hasta al cura del barrio».

## Dónde y cuándo

Córdoba (107, 209). La fila 309 no dice dónde. Las noticias son de 2022, 2024 y 2026: el problema se repite. En el CSV las tres filas no tienen fecha; las fechas salen de la URL.

Noticias por año: **2022:** 1 (309) · **2024:** 1 (107) · **2026:** 1 (209)

## A quién afecta

**Directos (según las noticias)**

- Sergio López, recolector (107).
- El trabajador que murió en la fila 309.
- Los recolectores que trabajan en Villa Siburu (209).

**Indirectos**

- (inferido) Las familias de los trabajadores.
- (inferido) Recuperadores informales que trabajan en basurales.
- (inferido) Vecinos de Villa Siburu, si el servicio se corta por la inseguridad.

## Causas

**Según las noticias**

- Falta de seguridad y uso incorrecto del equipo de protección (107).
- Delincuencia en el barrio (209).

**Inferidas (no las dice el texto)**

- Máquinas y personas trabajan en el mismo lugar sin separación.
- Trabajo informal sin protección (309: juntaba material reciclable, según la URL).

## Actores involucrados

**En las noticias**

- Sergio López (107).
- Vecinos de Villa Siburu (209).

**Inferidos**

- Empresa de recolección y Municipalidad de Córdoba.
- Operador del basural.
- Cooperativas de recuperadores, aseguradoras de riesgos del trabajo y gremio.
- Policía.

## Qué existe hoy

Estado: **SIN SOLUCIÓN**.

- Sin solución en el dataset. Eso no es lo mismo que sin solución en el mundo.
- Ninguna fila del dataset trata la seguridad de los trabajadores.

## La necesidad

> Recolectores y trabajadores de basurales necesitan trabajar sin riesgo de morir aplastados o de ser asaltados porque ya hubo muertes (107, 309) y asaltos en Villa Siburu (209), y hoy hay fallas de seguridad y de uso del equipo de protección (107) e inseguridad en los barrios donde recolectan (209).

## ¿Se puede abordar con un sistema?

**PARCIAL.** Registrar incidentes y zonas de riesgo es abordable. El equipamiento, la seguridad física y la formalización no se resuelven con un sistema.

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 5 | Muertes (107, 309). |
| Innovación | 20 % | 4 | Ninguna solución en el dataset. |
| Factibilidad | 20 % | 2 | Lo central (equipo, seguridad física, formalización) no se resuelve con un sistema. |
| Escalabilidad | 15 % | 3 | Pasa en basurales de todo el país (inferido). |
| Vínculo con el ecosistema | 10 % | 4 | Dos casos en Córdoba (107, 209). |
| **Total ponderado** | 90 % | **3,67** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos saber dónde y cuándo corren más riesgo los trabajadores de residuos?
- ¿Cómo podríamos hacer que un incidente (un asalto, un accidente) quede registrado y llegue a quien puede prevenir el siguiente?

## Qué falta validar

- ¿Qué riesgos priorizan los propios trabajadores? Preguntar a recolectores formales, recuperadores de basurales, gremio y cooperativas.
- ¿Hay registros de incidentes? Preguntar a la empresa de recolección y al área municipal.
- ¿Falta sobre todo equipamiento y formalización, que un sistema no resuelve, o falta información?

## Límites de la evidencia

- Solidez MEDIA. Lo sostienen 3 noticias válidas de 3 medios: Infobae (1), El Doce (1), TN (1).
- Son casos individuales. No se puede saber con qué frecuencia pasa.
- La descripción de 209 está cortada y 309 no dice el lugar.
- Ninguna fila tiene fecha en el CSV; todas las fechas salen de la URL.
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco, y «sin solución en el dataset» no quiere decir «sin solución en el mundo».

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 107 | 04/09/2024 (URL) | Infobae | Trágico accidente en basural Cordobés | https://www.infobae.com/sociedad/2024/09/04/un-recolector-murio-aplastado-entre-un-camion-y-una-pala-mecanica-mientras-trabajaba-en-un-basural-en-cordoba/ |
| 209 | 12/03/2026 (URL) | El Doce | Delincuentes asaltan a recolectores de basura en Córdoba | https://eldoce.tv/el-doce-y-vos/2026/03/12/asaltaron-a-recolectores-de-basura-en-cordoba-y-aseguran-que-le-roban-hasta-al-cura-del-barrio-el-video/ |
| 309 | 10/02/2022 (URL) | TN | Trágico Accidente en Basural | https://tn.com.ar/sociedad/2022/02/10/un-hombre-murio-aplastado-por-un-camion-cuando-estaba-juntando-material-reciclable-en-un-basural/ |

---
[← Volver al índice](00-indice.md)
