# Vertidos y depósitos ilegales de residuos

*Ficha 14 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| CONTAMINACION_ECOSISTEMICA_Y_PLASTICOS | SIN SOLUCIÓN | 4 | 3 | 2019–2026 ¹ | MEDIA | 3,00 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  
<sub>¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.</sub>  

## Resumen

Se descargan residuos de forma ilegal en campos, playas, predios y en el mar. Contaminan el suelo y el agua, y a veces la autoridad lo niega (181). Afecta a las comunidades cercanas. Hay 4 noticias, todas de otros países, y ninguna solución en el dataset.

## Qué pasa

- 04/06/2019: la empresa de cruceros Carnival admitió que sus barcos contaminan el agua. Deberá pagar una multa de 20 millones de dólares (286).
- 19/12/2024, Leicestershire (Reino Unido): condenaron a un agricultor por esparcir en su campo compost contaminado con plásticos, metales y textiles (130). La URL dice que la condena es en suspenso.
- 13/09/2025 (URL), playa Marbella, Magdalena (Perú): vecinos denuncian la descarga de desmontes (escombros); la Municipalidad lo niega (181).
- 15/04/2026, Kidlington, Oxfordshire (Reino Unido): empieza la limpieza de 21.000 toneladas de basura ilegal, con vehículos rotos, plásticos y residuos domésticos (503). La URL habla de una limpieza de 9 millones.

## Dónde y cuándo

Reino Unido (130, 503), Perú (181) y el mar (286). Las noticias son de 2019, 2024, 2025 y 2026: se repite. No hay casos argentinos. En Argentina, algo parecido puede aparecer como «basural» (ver ficha 01; inferido).

Noticias por año: **2019:** 1 (286) · **2024:** 1 (130) · **2025:** 1 (181) · **2026:** 1 (503)

## A quién afecta

**Directos (según las noticias)**

- Residentes cercanos al campo (130).
- El mar y los ecosistemas marinos (286).
- Comunidad de Kidlington (503).
- Vecinos de Magdalena (181).

**Indirectos**

- (inferido) Quienes usan esa agua o ese suelo.

## Causas

**Según las noticias**

- Sin datos en las noticias. Ninguna fila da causas.

**Inferidas (no las dice el texto)**

- Disponer los residuos de forma legal cuesta más que tirarlos.
- Hay poco control.
- Las denuncias no se verifican (181).

## Actores involucrados

**En las noticias**

- Carnival (286).
- Un agricultor de Leicestershire y la Justicia británica (130).
- Municipalidad de Magdalena y vecinos (181).
- Ciudadanos y empresas responsables (503).

**Inferidos**

- Agencias ambientales.
- Transportistas de residuos.

## Qué existe hoy

Estado: **SIN SOLUCIÓN**.

- Sin solución en el dataset. Eso no es lo mismo que sin solución en el mundo.
- Queda afuera todo: detectar, verificar las denuncias, sancionar y limpiar.

## La necesidad

> Las comunidades cercanas a campos, playas y predios necesitan que no se descarguen residuos ilegalmente porque contaminan el suelo y el agua (130, 181; 503: 21.000 toneladas), y hoy la autoridad puede negar la denuncia (181) y hay depósitos que llegan a 21.000 toneladas antes de limpiarse (503).

## ¿Se puede abordar con un sistema?

**PARCIAL.** Detectar, registrar y dar seguimiento a las denuncias es abordable. Sancionar y limpiar no lo es.

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 3 | Contaminación de suelo y agua; 21.000 toneladas en un solo predio (503). |
| Innovación | 20 % | 4 | Ninguna solución en el dataset. |
| Factibilidad | 20 % | 3 | Detectar y seguir las denuncias es abordable. Sancionar y limpiar no. |
| Escalabilidad | 15 % | 3 | Aparece en varios países. |
| Vínculo con el ecosistema | 10 % | 1 | Ninguna fila argentina. |
| **Total ponderado** | 90 % | **3,00** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos hacer que una denuncia de vertido ilegal se pueda verificar aunque la autoridad lo niegue (181)?
- ¿Cómo podríamos detectar un depósito ilegal antes de que llegue a 21.000 toneladas (503)?

## Qué falta validar

- ¿Pasa en Córdoba y con qué nombre (basural, microbasural, vuelco)? Preguntar al área de ambiente y a vecinos.
- ¿En qué se diferencia de la ficha 01? Puede convenir juntarlas.

## Límites de la evidencia

- Solidez MEDIA. Lo sostienen 4 noticias válidas de 3 medios: Circular Online (2), Infobae (1), Clarín (1).
- Ninguna es argentina.
- La fila 181 no tiene descripción.
- Son casos muy distintos entre sí: un crucero, un agricultor, escombros en una playa y un depósito.
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco, y «sin solución en el dataset» no quiere decir «sin solución en el mundo».

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 130 | 19/12/2024 | Circular Online | Incautación por vertedero contaminado en Leicester | https://www.circularonline.co.uk/news/farmer-recieves-suspended-sentence-for-spreading-contaminated-compost/ |
| 181 | 13/09/2025 (URL) | Infobae | Vecinos denuncian descarga de desmontes en playa Marbella, pero Municipalidad de Magdalena lo niega | https://www.infobae.com/peru/2025/09/13/vecinos-denuncian-descarga-de-desmontes-en-playa-marbella-pero-municipalidad-de-magdalena-lo-niega/ |
| 286 | 04/06/2019 | Clarín | Carnival admitió contaminación marina | https://www.clarin.com/sociedad/empresa-cruceros-carnival-admitio-contamina-agua-navega_0_x5B_KngCv.html |
| 503 | 15/04/2026 | Circular Online | Desagradable depósito ilegal en Oxfordshire comienza limpieza | https://www.circularonline.co.uk/news/9-million-clean-up-of-illegal-waste-site-in-kidlington-begins/ |

---
[← Volver al índice](00-indice.md)
