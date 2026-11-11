# Interrupciones y fallas del servicio de recolección

*Ficha 09 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| CONFLICTO_TERRITORIAL_Y_LABORAL | SIN SOLUCIÓN | 3 | 3 | 2012–2024 ¹ | MEDIA | 3,17 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  
<sub>¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.</sub>  

## Resumen

El servicio de recolección se corta por conflictos gremiales o falla por accidentes, y la basura queda en la calle. Hay un caso en Córdoba (2015, empresa Lusa) y dos en la Ciudad de Buenos Aires (2012 y 2024). Afecta a los vecinos de las zonas sin servicio. No hay ninguna solución en el dataset.

## Qué pasa

- 06/11/2012, Ciudad de Buenos Aires: la recolección se demoró por una protesta del gremio de trabajadores de la Ceamse (267).
- 14/10/2015, zona norte de Córdoba: conflicto laboral en Lusa por falta de elementos de higiene y seguridad para los empleados, y el servicio de recolección se cortó (272). La URL dice «media Córdoba con la basura en la calle».
- 23/07/2024 (URL), Ciudad de Buenos Aires: en medio de un conflicto por la recolección, un camión de la empresa Ashira volcó residuos sobre la Avenida Belgrano (99).
- Filas dudosas, que no cuentan: 9 (20/01/2017, el intendente de Resistencia sale a limpiar calles), 23 (30/11/2018, debuta el nuevo esquema de recolección en la ciudad, según la URL) y 96 (17/07/2024, URL: en Olavarría, un jubilado filma a un recolector «haciendo un desastre»).

## Dónde y cuándo

Córdoba (272) y Ciudad de Buenos Aires (267, 99). Las noticias son de 2012, 2015 y 2024: se repite a lo largo de los años.

Noticias por año: **2012:** 1 (267) · **2015:** 1 (272) · **2024:** 1 (99)

## A quién afecta

**Directos (según las noticias)**

- Vecinos de la Ciudad de Buenos Aires (267).
- Vecinos de la zona norte de Córdoba y empleados de Lusa (272).
- Residentes de la zona de la Avenida Belgrano (99).

**Indirectos**

- (inferido) Comercios de las zonas sin servicio.
- (inferido) Trabajadores de la recolección.

## Causas

**Según las noticias**

- Protesta del gremio de trabajadores de la Ceamse (267).
- Falta de elementos de higiene y seguridad para los empleados (272).
- Conflicto por la recolección (99, según la URL).

**Inferidas (no las dice el texto)**

- Cada zona depende de un solo prestador.
- No hay un plan alternativo cuando se corta el servicio.

## Actores involucrados

**En las noticias**

- Gremio de trabajadores de la Ceamse (267).
- Lusa y sus empleados (272).
- Empresa Ashira (99).
- Vecinos (267, 272).

**Inferidos**

- Municipalidad de Córdoba y Gobierno de la Ciudad de Buenos Aires, que contratan el servicio.
- Sindicatos de recolectores.

## Qué existe hoy

Estado: **SIN SOLUCIÓN**.

- Sin solución en el dataset. Eso no es lo mismo que sin solución en el mundo.
- 407 (14/01/2025, Ecoticias): el barrio barcelonés de Lesseps destaca la recogida neumática de residuos. Está cargada como problema y no habla de cortes del servicio.

## La necesidad

> Los vecinos de Córdoba y CABA necesitan un servicio de recolección continuo y previsible porque cuando se interrumpe la basura queda en la calle (267, 272), y hoy los conflictos gremiales cortan el servicio (267, 272) y no hay una alternativa mientras dura el corte (inferido).

## ¿Se puede abordar con un sistema?

**PARCIAL.** Los avisos y la coordinación ante cortes son un problema de información. Los conflictos laborales no lo son.

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 3 | Basura en la calle (267, 272). Las noticias no hablan de daños a la salud. |
| Innovación | 20 % | 4 | Ninguna solución en el dataset. |
| Factibilidad | 20 % | 3 | Avisar y coordinar ante un corte es abordable. Resolver el conflicto laboral no. |
| Escalabilidad | 15 % | 2 | Cada municipio tiene su propio contrato y prestador (inferido). |
| Vínculo con el ecosistema | 10 % | 4 | Un caso en Córdoba (272), pero de 2015. |
| **Total ponderado** | 90 % | **3,17** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos avisar a los vecinos cuándo y dónde se corta el servicio, para que no saquen la basura?
- ¿Cómo podríamos saber qué zonas quedan sin recolección durante un corte?

## Qué falta validar

- ¿Quién presta hoy la recolección en Córdoba? ¿Cuántos cortes hubo en 2025 y 2026?
- ¿Cómo se avisa hoy a los vecinos? Preguntar al área municipal de higiene urbana, a centros vecinales y al gremio.
- La noticia cordobesa es de 2015: hay que confirmar que el problema siga.

## Límites de la evidencia

- Solidez MEDIA. Lo sostienen 3 noticias válidas de 3 medios: TN (1), Clarín (1), El Doce (1).
- Hay tres filas dudosas que no se cuentan (9, 23, 96).
- La fila 99 no tiene fecha en el CSV; la fecha sale de la URL.
- No se puede saber con qué frecuencia se corta el servicio.
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco, y «sin solución en el dataset» no quiere decir «sin solución en el mundo».

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 99 | 23/07/2024 (URL) | TN | Volcadura de residuos en Avenida Belgrano | https://tn.com.ar/sociedad/2024/07/23/en-medio-del-conflicto-por-la-recoleccion-de-basura-en-caba-un-camion-volco-residuos-sobre-una-avenida/ |
| 267 | 06/11/2012 | Clarín | Demoras en recolección de basura en la Ciudad | https://www.clarin.com/ciudades/basura-recien-manana-mejorara-situacion_0_rkGeyxCoD7l.html |
| 272 | 14/10/2015 | El Doce | Conflictos laborales en Lusa | https://eldoce.tv/sociedad/un-asco-media-cordoba-con-la-basura-en-la-calle_6996/ |

**Otras filas citadas**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 407 | 14/01/2025 | Ecoticias | [Iniciativa cargada como problema] El barrio barcelonés de Lesseps pone en valor la recogida neumática de residuos | https://www.ecoticias.com/residuos-reciclaje/lesseps-recogida-neumatica-residuos |
| 9 | 20/01/2017 | El Doce | [Dudosa, no cuenta] Intendente de Resistencia limpia calles | https://eldoce.tv/politica/jorge-capitanich-salio-limpiar-las-calles-basura-desmalezamiento-resistencia_33599/ |
| 23 | 30/11/2018 | CBA24N | [Dudosa, no cuenta] Recolección de residuos domiciliarios | https://www.cba24n.com.ar/economia/debuta-el-nuevo-esquema-de-recoleccion-de-residuos-en-la-ciudad_a5de581a2d91dda498914a35c |
| 96 | 17/07/2024 (URL) | TN | [Dudosa, no cuenta] Recolector de basura causa indignación en Olavarría | https://tn.com.ar/sociedad/2024/07/17/increible-un-jubilado-capturo-en-video-a-un-recolector-de-basura-haciendo-un-desastre-en-plena-calle/ |

---
[← Volver al índice](00-indice.md)
