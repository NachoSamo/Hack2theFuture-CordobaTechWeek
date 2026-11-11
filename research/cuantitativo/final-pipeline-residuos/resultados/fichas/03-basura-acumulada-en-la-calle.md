# Basura acumulada en la vía pública, con plagas y enfermedades

*Ficha 03 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| COLAPSO_Y_SATURACION_DISPOSICION_FINAL | SIN SOLUCIÓN | 6 | 2 | 2019–2026 (+1 sin fecha) ¹ | MEDIA | 3,67 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  
<sub>¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.</sub>  

## Resumen

En zonas con mucha actividad la basura se acumula en la calle, sobre todo después de picos como un fin de semana largo o el Carnaval. Trae olores, ratas y enfermedades. Afecta a vecinos y comerciantes. Hay 3 casos en la ciudad de Córdoba (170, 284, 306) y otros en Bogotá y Cuba. No hay ninguna solución en el dataset.

## Qué pasa

- 06/03/2019, Mercado Norte (ciudad de Córdoba): después del Carnaval se registró una gran cantidad de residuos, incluso orgánicos (284).
- Sin fecha, barrio Güemes (Córdoba): después de un fin de semana largo la basura se acumula en la zona. Los vecinos lo atribuyen a la concentración de bares y restaurantes (306).
- 21/07/2025, varios barrios de Córdoba: vecinos reclaman por la basura y la Municipalidad responde (170). Lo dicen el título y la URL; la descripción está cortada.
- 07/08/2024 (URL), Bogotá: «crisis ambiental» por puntos de acumulación de basura que causan enfermedades (373).
- 17/03/2026 (URL), Bogotá: vecinos denuncian ratas en zonas residenciales por mal manejo de las basuras (212).
- 10/10/2026 (URL), Cuba: una mujer estuvo enferma siete días y lo atribuye a la basura y las aguas albañales de su barrio (542).

## Dónde y cuándo

Ciudad de Córdoba: Mercado Norte (284), Güemes (306) y varios barrios (170). Bogotá (212, 373) y Cuba (542). Las noticias van de 2019 a 2026: el problema se repite.

Noticias por año: **2019:** 1 (284) · **2024:** 1 (373) · **2025:** 1 (170) · **2026:** 2 (212, 542) · **sin fecha:** 1 (306)

## A quién afecta

**Directos (según las noticias)**

- Comerciantes, compradores y visitantes del Mercado Norte (284).
- Vecinos de Güemes (306).
- Vecinos de barrios de Córdoba (170).
- Vecinos de Bogotá (212, 373).
- Una vecina de un barrio de Cuba (542).

**Indirectos**

- (inferido) Bares y restaurantes de Güemes.
- (inferido) Trabajadores de la recolección.
- (inferido) El sistema de salud, si aumentan las enfermedades.

## Causas

**Según las noticias**

- Concentración de bares y restaurantes, según los vecinos (306).
- «Mal manejo de basuras» (212, título).
- Picos de actividad: Carnaval (284) y fin de semana largo (306).

**Inferidas (no las dice el texto)**

- La recolección no se adapta a los picos.
- Faltan contenedores.
- No se respetan los horarios para sacar la basura (las filas dudosas 235 y 271 hablan de multas y castigos por tirar basura fuera de lugar u horario).

## Actores involucrados

**En las noticias**

- Municipalidad de Córdoba, que responde a los reclamos (170).
- Vecinos (170, 212, 306).
- Comerciantes del Mercado Norte (284).
- Bares y restaurantes de Güemes (306).

**Inferidos**

- Empresa que presta la recolección en Córdoba.
- Centros vecinales.

## Qué existe hoy

Estado: **SIN SOLUCIÓN**.

- Sin solución en el dataset. Eso no es lo mismo que sin solución en el mundo.
- Dos filas dudosas describen sanciones: 235 (San Salvador: más de 500 multas por tirar basura en sitios u horarios no permitidos) y 271 (Nuevo León: carteles con la cara de quienes tiran basura). No son soluciones verificadas y no cuentan.
- Queda afuera: anticipar los picos, coordinar recolección extra y detectar los puntos de acumulación.

## La necesidad

> Vecinos y comerciantes de zonas con mucha actividad (bares, mercados) necesitan que la basura no se acumule en la calle después de los picos, como fines de semana largos o Carnaval, porque trae olores, ratas y enfermedades (212, 284, 306, 373, 542), y hoy la recolección no se adapta a esos picos (inferido: el texto no da causas).

## ¿Se puede abordar con un sistema?

**SÍ.** Anticipar los picos y coordinar a vecinos, comercios y recolección es un problema de información y coordinación. Si faltan camiones o presupuesto, eso no se resuelve con un sistema. Hay que validar la causa.

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 3 | Ratas y enfermedades (212, 373, 542), pero sin cifras de afectados. |
| Innovación | 20 % | 4 | Ninguna solución en el dataset. |
| Factibilidad | 20 % | 4 | Anticipar picos y coordinar es un problema de información, si se confirma la causa. |
| Escalabilidad | 15 % | 3 | Aparece en ciudades de varios países. |
| Vínculo con el ecosistema | 10 % | 5 | 3 casos en la ciudad de Córdoba (170, 284, 306) y la Municipalidad como actor (170). |
| **Total ponderado** | 90 % | **3,67** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos anticipar los picos de basura (fines de semana largos, Carnaval) para que la calle no quede llena al día siguiente?
- ¿Cómo podríamos saber dónde se acumula la basura antes de que aparezcan ratas y enfermedades (212, 373)?
- ¿Cómo podríamos hacer que vecinos y comercios sepan cuándo conviene sacar la basura en los días de pico?

## Qué falta validar

- ¿Cuál es la causa: la frecuencia de recolección, la falta de contenedores o el comportamiento de quienes generan la basura? El texto no lo dice.
- Preguntar a vecinos de Güemes, puesteros del Mercado Norte, el área municipal de higiene urbana y la empresa de recolección.
- ¿Cuánto dura la acumulación? ¿Qué datos tiene hoy el prestador sobre los picos?
- ¿Sigue pasando? La noticia cordobesa más reciente es del 21/07/2025 (170).

## Límites de la evidencia

- Solidez MEDIA. Lo sostienen 6 noticias válidas de 2 medios: CBA24N (3), Infobae (3).
- Cuatro filas no tienen descripción útil (170, 212, 373, 542). Se sabe lo que dicen el título y la URL.
- Ninguna noticia explica la causa.
- Hay tres filas dudosas (235, 268, 271) que no se cuentan.
- No se puede concluir con qué frecuencia pasa.
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco, y «sin solución en el dataset» no quiere decir «sin solución en el mundo».

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 170 | 21/07/2025 | CBA24N | Basura en barrios de Córdoba | https://www.cba24n.com.ar/cordoba/reclamos-por-basura-en-distintos-barrios-de-cordoba--la-respuesta-de-la-municipalidad_a687e59061701dee8cf83ef53 |
| 212 | 17/03/2026 (URL) | Infobae | Vecinos denuncian proliferación de ratas en Bogotá | https://www.infobae.com/colombia/2026/03/17/vecinos-denuncian-proliferacion-de-ratas-en-sectores-residenciales-de-bogota-por-mal-manejo-de-basuras/ |
| 284 | 06/03/2019 | CBA24N | Acumulación de residuos en Mercado Norte | https://www.cba24n.com.ar/sociedad/denuncian-acumulacion-de-residuos-en-el-mercado-norte_a5de57ffed91dda4989147d35 |
| 306 | sin fecha | CBA24N | Basura en Güemes tras fin de semana largo | https://www.cba24n.com.ar/sociedad/guemes-amanecio-rodeado-de-basura-tras-un-fin-de-semana-largo_a611bbb67b208954283b06900 |
| 373 | 07/08/2024 (URL) | Infobae | Bogotá está en crisis ambiental por puntos de acumulación de basura que ocasionan enfermedades | https://www.infobae.com/colombia/2024/08/07/bogota-esta-en-crisis-ambiental-por-puntos-de-acumulacion-de-basura-que-ocasionan-enfermedades/ |
| 542 | 10/10/2026 (URL) | Infobae | La cubana que enfermó siete días y culpa a las calles de su barrio: basura, aguas albañales y una ciudad que "está muriendo" | https://www.infobae.com/cuba/2026/10/10/la-cubana-que-enfermo-siete-dias-y-culpa-a-las-calles-de-su-barrio-basura-aguas-albanales-y-una-ciudad-que-esta-muriendo/ |

**Otras filas citadas**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 235 | 18/06/2026 (URL) | Infobae | [Dudosa, no cuenta] La alcaldía de San Salvador Centro supera las 500 multas por arrojar basura en sitios u horarios no permitidos | https://www.infobae.com/el-salvador/2026/06/18/la-alcaldia-de-san-salvador-centro-supera-las-500-multas-por-arrojar-basura-en-sitios-u-horarios-no-permitidos/ |
| 268 | 09/11/2014 | Clarín | [Dudosa, no cuenta] Vecinos denuncian problemas en la ciudad | https://www.clarin.com/ciudades/reclamos-basura-veredas_0_r1CWymO5Pml.html |
| 271 | 30/07/2015 | Clarín | [Dudosa, no cuenta] Problema de basura en la calle en Nuevo León | https://www.clarin.com/mundo/mexico-nuevo-leon-rostros-carteles-via-publica-tirar-basura-calle_0_ByU7HSFwQx.html |

---
[← Volver al índice](00-indice.md)
