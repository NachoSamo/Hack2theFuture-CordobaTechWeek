# Incendios y quema de residuos en basurales, depósitos y acopios

*Ficha 05 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| CONTAMINACION_ECOSISTEMICA_Y_PLASTICOS | SIN SOLUCIÓN | 4 | 4 | 2018–2025 ¹ | MEDIA | 3,61 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  
<sub>¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.</sub>  

## Resumen

Basurales y depósitos de reciclables se incendian: a veces por accidente y a veces porque se quema la basura para eliminarla. Los incendios destruyen instalaciones, dañan la salud y causan accidentes: seis camiones chocaron en la ruta 9 por el incendio de un basural (294). Afecta a vecinos, bomberos y conductores. No hay ninguna solución en el dataset.

## Qué pasa

- 19/09/2018, Freyre (Córdoba, al norte de San Francisco; el texto dice «Freyere»): un incendio destruyó un depósito de plásticos. Hubo pérdidas materiales totales y no hubo víctimas. Causas según la noticia: un corte de luz y una ignición accidental (22).
- 26/11/2020 (URL): seis camiones chocaron en la ruta 9 por un incendio en un basural a cielo abierto (294). La fila no trae descripción ni provincia.
- 26/06/2025, Victoria (Australia): la EPA prohibió a Kangaroo Plastics Technology recibir residuos industriales hasta que arregle su depósito de Northbourne Rd, que no cumplía los requisitos de seguridad contra incendio (451).
- 03/11/2025, Sudáfrica: la quema de residuos a cielo abierto causa daños ambientales y a la salud de las comunidades (188).

## Dónde y cuándo

Freyre, Córdoba (22). Ruta 9 (294; la fila no dice la provincia). Victoria, Australia (451). Sudáfrica (188). Las noticias son de 2018, 2020 y 2025: se repite, aunque con un solo caso cordobés.

Noticias por año: **2018:** 1 (22) · **2020:** 1 (294) · **2025:** 2 (188, 451)

## A quién afecta

**Directos (según las noticias)**

- Bomberos voluntarios y profesionales y la comunidad de Freyre (22).
- Conductores de la ruta 9 (294).
- Comunidades sudafricanas (188).
- Kangaroo Plastics Technology (451).

**Indirectos**

- (inferido) Vecinos que respiran el humo.
- (inferido) Operadores de acopios y recuperadores que trabajan en basurales.

## Causas

**Según las noticias**

- Corte del suministro eléctrico e ignición accidental (22).
- Depósito que no cumple los requisitos de seguridad contra incendio (451).
- Quema de residuos como práctica (188).

**Inferidas (no las dice el texto)**

- Se acumula plástico en los acopios cuando cae su precio (ver ficha 12).
- Se quema la basura en los basurales para reducir el volumen.
- Poco control sobre los acopios.

## Actores involucrados

**En las noticias**

- Bomberos voluntarios y profesionales (22).
- EPA Victoria y Kangaroo Plastics Technology (451).
- Comunidades sudafricanas (188).

**Inferidos**

- Municipios y operadores de acopios y basurales.
- Vialidad, por la ruta 9 (294).
- Defensa Civil.

## Qué existe hoy

Estado: **SIN SOLUCIÓN**.

- Sin solución en el dataset. Eso no es lo mismo que sin solución en el mundo.
- Queda afuera todo: saber qué lugares tienen más riesgo, prevenir y avisar a tiempo.

## La necesidad

> Vecinos, bomberos y operadores de acopios necesitan prevenir incendios en basurales y depósitos de reciclables porque destruyen instalaciones, contaminan y causan accidentes (22; 188; 294: choque de seis camiones), y hoy hay acopios que no cumplen los requisitos contra incendio (451) y se quema basura para eliminarla (188).

## ¿Se puede abordar con un sistema?

**PARCIAL.** Monitorear el riesgo y dar aviso a tiempo es un problema de información. La prevención física y el control de los acopios requieren infraestructura y fiscalización.

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 4 | Accidentes viales (294) y salud (188). En Freyre no hubo víctimas (22). |
| Innovación | 20 % | 4 | Ninguna solución en el dataset. |
| Factibilidad | 20 % | 3 | Medir el riesgo y avisar es información. Prevenir y controlar los acopios requiere obra y fiscalización. |
| Escalabilidad | 15 % | 3 | Aparece en Córdoba, Australia y Sudáfrica. |
| Vínculo con el ecosistema | 10 % | 4 | Un caso en Freyre, Córdoba (22), de 2018. |
| **Total ponderado** | 90 % | **3,61** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos saber qué acopios o basurales tienen más riesgo de incendio antes de que se prendan fuego?
- ¿Cómo podríamos avisar a tiempo a quienes circulan cerca de un basural en llamas (294)?
- ¿Cómo podríamos hacer que un acopio sepa si cumple los requisitos contra incendio (451)?

## Qué falta validar

- ¿Con qué frecuencia se queman los basurales en Córdoba? El dataset tiene un solo caso local.
- ¿Quién controla los acopios de reciclables? ¿Hay datos de focos de incendio?
- Preguntar a bomberos voluntarios, Defensa Civil, operadores de acopios y el área de ambiente.
- ¿El choque de la ruta 9 (294) fue en Córdoba? La fila no lo dice.

## Límites de la evidencia

- Solidez MEDIA. Lo sostienen 4 noticias válidas de 4 medios: El Doce (1), Infrastructure News (1), TN (1), Inside Waste (1).
- Dos de las cuatro son de otros países (188, 451).
- Hay un solo caso cordobés, de 2018 (22).
- La fila 294 no tiene descripción.
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco, y «sin solución en el dataset» no quiere decir «sin solución en el mundo».

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 22 | 19/09/2018 | El Doce | Incendio destruye depósito de plásticos en Freyere | https://eldoce.tv/sociedad/un-incendio-destruyo-un-deposito-de-plasticos-en-freyre_72802/ |
| 188 | 03/11/2025 | Infrastructure News | Burning de Residuos en Sudáfrica | https://infrastructurenews.co.za/2025/11/03/health-and-environmental-hazards-from-open-waste-burning/ |
| 294 | 26/11/2020 (URL) | TN | Choque en la ruta 9: seis camiones se accidentaron por un incendio en un basural a cielo abierto | https://tn.com.ar/sociedad/2020/11/26/choque-en-la-ruta-9-seis-camiones-se-accidentaron-por-un-incendio-en-un-basural-a-cielo-abierto/ |
| 451 | 26/06/2025 | Inside Waste | EPA Prohibe Reciclador Plásticos por Problema de Stockpile | https://www.insidewaste.com.au/vic-epa-puts-ban-on-plastics-recycler-until-stockpile-issue-fixed/ |

---
[← Volver al índice](00-indice.md)
