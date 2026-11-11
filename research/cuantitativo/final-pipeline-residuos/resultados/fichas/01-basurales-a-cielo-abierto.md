# Basurales a cielo abierto y vertederos sin control

*Ficha 01 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| COLAPSO_Y_SATURACION_DISPOSICION_FINAL | SIN SOLUCIÓN | 7 | 4 | 2016–2023 (+1 sin fecha) ¹ | ALTA | 3,72 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  
<sub>¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.</sub>  

## Resumen

En barrios y pueblos de Córdoba y de otras zonas de Argentina se forman basurales a cielo abierto sin control. Contaminan, traen plagas y en un caso están a menos de 150 metros de la cisterna de agua de un pueblo (274). Afectan sobre todo a los vecinos. Es el problema con más casos en Córdoba de esta lista y no tiene ninguna solución en el dataset.

## Qué pasa

- 09/03/2016, Huerta Grande (Córdoba): se formó un basural a cielo abierto a menos de 150 m de la cisterna de agua del pueblo. La noticia lo atribuye al incumplimiento de la ley provincial 9088 (274).
- 01/05/2016: un predio inaugurado por el municipio meses antes volvió a ser un basural (8). Lo dicen el título y la URL; la fila no trae descripción ni lugar.
- 08/08/2018: un basural «sospechoso» y una plaga de alacranes (283). La URL menciona El Talar de Mendiolaza, remediación, Justicia y Municipalidad. La fila no trae descripción.
- 11/09/2019, barrio San Vicente (ciudad de Córdoba): vecinos denuncian un basural a cielo abierto donde los desechos se acumulan sin control (30).
- 24/12/2020, Luján (Buenos Aires): el basural está saturado y causa problemas ambientales y de salud (298). La URL lo llama «el mayor basural de Buenos Aires» y dice que «nadie sabe cuándo se acabará».
- 24/07/2023 (URL), Bariloche: el vertedero figura entre los 50 lugares más contaminantes del mundo (65). Es una nota de opinión.
- Sin fecha, Tancacha (Córdoba): se cerrará definitivamente un basural a cielo abierto con una inversión de 22 millones de pesos (400).

## Dónde y cuándo

Córdoba: Huerta Grande (274), barrio San Vicente de la ciudad de Córdoba (30) y Tancacha (400). La fila 283 menciona El Talar de Mendiolaza en la URL; que esté en Córdoba es inferido. Resto de Argentina: Luján (298) y Bariloche (65). La fila 8 no dice dónde. Las noticias van de 2016 a 2023: el problema se repite a lo largo de los años, con pocas noticias por año.

Noticias por año: **2016:** 2 (8, 274) · **2018:** 1 (283) · **2019:** 1 (30) · **2020:** 1 (298) · **2023:** 1 (65) · **sin fecha:** 1 (400)

## A quién afecta

**Directos (según las noticias)**

- Vecinos del barrio San Vicente (30).
- Vecinos del barrio La Quebrada y población de Huerta Grande (274).
- Comunidad de Luján y Pablo Zárate, trabajador del basural (298).
- Turistas, residentes y ecosistemas de Bariloche (65).
- Población de Tancacha (400).

**Indirectos**

- (inferido) Quienes toman agua de la cisterna de Huerta Grande (274).
- (inferido) Personas que trabajan juntando material en basurales (ver ficha 04, filas 107 y 309).
- (inferido) Conductores en rutas cercanas cuando un basural se incendia (ver ficha 05, fila 294).

## Causas

**Según las noticias**

- Incumplimiento de la ley provincial 9088 (274).
- Ineficiencia en la gestión de residuos (298).
- Desconocimiento de la población sobre la importancia de separar residuos (298).
- «Desconexión entre la imagen turística y la realidad ambiental» (65).

**Inferidas (no las dice el texto)**

- Falta de un lugar habilitado y cercano para llevar los residuos.
- Poco control sobre predios vacíos: un predio recuperado vuelve a usarse como basural (8).
- El costo de cerrar un basural (400: 22 millones de pesos) frente al presupuesto de municipios chicos.

## Actores involucrados

**En las noticias**

- Gobierno provincial de Córdoba (400).
- El municipio que inauguró el predio (8; no se nombra).
- Vecinos que denuncian (30, 274).
- Pablo Zárate, trabajador del basural de Luján (298).

**Inferidos**

- Municipios de cada localidad.
- Organismo provincial de ambiente de Córdoba.
- La Justicia (la URL de 283 la menciona, pero no dice qué hizo).
- Recuperadores informales que trabajan en basurales.

## Qué existe hoy

Estado: **SIN SOLUCIÓN**.

- Sin solución en el dataset. Eso no es lo mismo que sin solución en el mundo: los medios relevados pueden no haberla publicado.
- El cierre del basural de Tancacha (400) aparece dentro de la misma noticia del problema. No es una fila de solución.
- La fila 273 (03/02/2016, Clarín) describe un programa del gobierno peruano y USAID con buitres equipados con cámaras GoPro para encontrar basurales en Lima. Está cargada como problema, no como solución.
- Queda afuera todo: detectar a tiempo, seguir las denuncias, cerrar y remediar.

## La necesidad

> Los vecinos de barrios y localidades de Córdoba y Argentina necesitan que no se formen ni crezcan basurales a cielo abierto cerca de sus casas y de sus fuentes de agua porque contaminan, atraen plagas y ponen en riesgo el agua (274: a 150 m de la cisterna; 283: alacranes; 298), y hoy aparecen sin control, se incumple la ley provincial 9088 (274) y se denuncian cuando ya existen (30).

## ¿Se puede abordar con un sistema?

**PARCIAL.** Detectarlos, registrarlos y seguir las denuncias es un problema de información y coordinación. Cerrarlos y ofrecer dónde disponer los residuos requiere infraestructura y presupuesto (400: 22 millones de pesos para un cierre).

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 4 | Contaminación del agua (274), plagas (283) y salud (298). No hay víctimas en las noticias. |
| Innovación | 20 % | 4 | Ninguna solución en el dataset. Solo un caso aislado en Lima (273), cargado como problema. |
| Factibilidad | 20 % | 3 | Detectar y registrar es abordable. Cerrar y remediar requiere obra y presupuesto (400). |
| Escalabilidad | 15 % | 3 | Se repite en varias localidades, pero cada municipio gestiona lo suyo (inferido). |
| Vínculo con el ecosistema | 10 % | 5 | 3 casos en Córdoba (30, 274, 400) y el Gobierno provincial como actor (400). |
| **Total ponderado** | 90 % | **3,72** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos detectar un basural cuando empieza a formarse, y no cuando ya está a 150 m de la cisterna del pueblo (274)?
- ¿Cómo podríamos hacer que la denuncia de un vecino (30) llegue a quien puede actuar y que se sepa qué pasó con ella?
- ¿Cómo podríamos evitar que un predio ya limpiado vuelva a ser un basural (8)?

## Qué falta validar

- ¿Cuántos basurales hay hoy en Córdoba y quién los registra? Preguntar al área de ambiente de la provincia y de municipios chicos.
- ¿Qué pasa hoy con una denuncia vecinal? Preguntar a vecinos de barrios como San Vicente y al municipio.
- ¿El cuello de botella es saber dónde están o tener dónde llevar la basura? Si es lo segundo, un sistema no lo resuelve.
- ¿Sigue vigente? Las noticias de Córdoba son de 2016 a 2019 y la de Tancacha no tiene fecha.
- Buscar fuentes que no sean periodísticas: registros oficiales de basurales o informes provinciales.

## Límites de la evidencia

- Solidez ALTA. Lo sostienen 7 noticias válidas de 4 medios: El Doce (3), CBA24N (2), Infobae (1), TN (1).
- Dos filas no tienen descripción (8, 283). Solo se sabe lo que dicen el título y la URL.
- La fila 400 describe un cierre, que es una respuesta. Se cuenta como problema porque confirma que el basural existía.
- La fila 65 es una nota de opinión.
- El texto tiene errores de extracción: «basurario» (274), «basuraleza» (400).
- No se puede concluir cuántos basurales hay ni si aumentaron: los medios publican casos, no relevamientos.
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco, y «sin solución en el dataset» no quiere decir «sin solución en el mundo».

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 8 | 01/05/2016 | El Doce | Basural abandonado tras inauguración municipal | https://eldoce.tv/el-doce-y-vos/el-potrero-inaugurado-hace-meses-que-volvio-ser-un-basural_17919/ |
| 30 | 11/09/2019 | CBA24N | Denuncia basural a cielo abierto en barrio San Vicente | https://www.cba24n.com.ar/denuncian-basural-a-cielo-abierto-en-barrio-san-vicente_a5de57b01d91dda498913ec53 |
| 65 | 24/07/2023 (URL) | Infobae | Basural contaminante en Bariloche | https://www.infobae.com/opinion/2023/07/24/bariloche-hogar-de-uno-de-los-lugares-mas-contaminantes-del-mundo/ |
| 274 | 09/03/2016 | El Doce | Basurario a cielo abierto en Huerta Grande | https://eldoce.tv/el-doce-y-vos/denuncian-basural-cielo-abierto-en-huerta-grande_14885/ |
| 283 | 08/08/2018 | El Doce | Basurero sospechoso y plaga de alacranes | https://eldoce.tv/sociedad/territorio-alacran-combate-en-suspenso-en-el-talar-de-mendiolaza-basural-remediacion-justicia-contaminacion-municipalidad-mirada-telenoche_70447/ |
| 298 | 24/12/2020 | TN | Basural de Luján, Argentina: colapso y contaminación | https://tn.com.ar/agencias/efe/2020/12/24/nadie-sabe-cuando-se-acabara-con-el-mayor-basural-de-buenos-aires/ |
| 400 | sin fecha | CBA24N | Cierre de basuraleza a cielo abierto en Tancacha | https://www.cba24n.com.ar/cordoba/cerraran-de-manera-definitiva-un-basural-a-cielo-abierto-en-tancacha_a6750c37c37613c549a5b7cff |

**Otras filas citadas**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 273 | 03/02/2016 | Clarín | [Iniciativa cargada como problema] Programa de buitres busca basurales en Lima | https://www.clarin.com/urbano/lima-buitres-gopro-encontrar-basurales_0_HkOlZ3TdPXl.html |

---
[← Volver al índice](00-indice.md)
