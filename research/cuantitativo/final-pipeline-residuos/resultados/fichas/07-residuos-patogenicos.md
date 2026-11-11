# Residuos hospitalarios y patogénicos mal gestionados

*Ficha 07 de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*

## Ficha rápida

| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |
|---|---|---|---|---|---|---|
| GESTION_DEFICIENTE_RESIDUOS_ESPECIALES | PARCIAL | 3 | 2 | 2014–2024 ¹ | MEDIA | 3,28 de 5 |

<sub>Solo se cuentan noticias válidas y sin duplicados.</sub>  
<sub>¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.</sub>  

## Resumen

Los residuos hospitalarios a veces se mezclan con la basura común o se revenden. En Perú se encontraron residuos hospitalarios reciclados para fabricar productos de plástico (350). Afecta a pacientes, trabajadores de la salud y vecinos por el riesgo de contagio. Hay una sola solución vecina en el dataset.

## Qué pasa

- 22/10/2014, Palermo (Ciudad de Buenos Aires): multaron a una clínica por mezclar residuos hospitalarios con basura común y sacar la basura fuera de horario (5).
- 28/04/2020, Italia: los hospitales acumulan grandes cantidades de residuos médicos potencialmente contaminados por la expansión del COVID-19 (292).
- 26/04/2024 (URL), Perú: la policía encontró en un almacén residuos hospitalarios reciclados y vendidos para fabricar productos de plástico (350). La URL dice que tenían restos de sangre y heces, que estaban en Puente Piedra y que se fabricaban tápers.
- Fila dudosa, que no cuenta: 237 (14/07/2026, CicloVivo) explica cómo descartar las lapiceras inyectables para adelgazar.

## Dónde y cuándo

Ciudad de Buenos Aires (5), Italia (292) y Perú (350). Las noticias son de 2014, 2020 y 2024: se repite cada pocos años, en lugares distintos.

Noticias por año: **2014:** 1 (5) · **2020:** 1 (292) · **2024:** 1 (350)

## A quién afecta

**Directos (según las noticias)**

- Comunidad sanitaria y vecinos de Palermo (5).
- Hospitales, pacientes y trabajadores italianos (292).

**Indirectos**

- (inferido) Quienes compran productos hechos con ese plástico (350).
- (inferido) Recolectores de basura común que manipulan residuos mezclados (5).

## Causas

**Según las noticias**

- La rápida expansión del COVID-19 (292).

**Inferidas (no las dice el texto)**

- Poco control de la cadena entre quien genera el residuo y quien lo trata.
- Incentivo económico para revender el material (350).
- Picos de generación en emergencias sanitarias (292).

## Actores involucrados

**En las noticias**

- Una clínica de Palermo (5; no se nombra).
- Hospitales italianos (292).
- Policía Nacional del Perú (350).

**Inferidos**

- Autoridades de control sanitario y ambiental.
- Empresas de transporte y tratamiento de residuos patogénicos.
- Recicladores informales.

## Qué existe hoy

Estado: **PARCIAL**.

- 335 (28/02/2024, Residuos Profesional): desarrollo de bioplásticos biodegradables para usos médicos. La descripción está cortada. Ataca el material, no la gestión del residuo.
- Queda afuera: separar en origen, transportar, tratar y controlar la cadena (5, 292, 350).
- No hay solución directa en el dataset, lo que no es lo mismo que no haberla en el mundo.

## La necesidad

> Pacientes, trabajadores de la salud y vecinos necesitan que los residuos hospitalarios se separen y traten aparte porque pueden contagiar (292), y hoy se mezclan con basura común (5) o se revenden ilegalmente para fabricar plástico (350).

## ¿Se puede abordar con un sistema?

**SÍ.** Es un problema de trazabilidad y control de la cadena. El tratamiento físico ya existe aparte (inferido).

## Evaluación según los criterios del jurado

| Criterio | Peso | Puntaje (1 a 5) | Justificación |
|---|---|---|---|
| Impacto social y ambiental | 25 % | 4 | Riesgo de contagio (292) y productos fabricados con material contaminado (350). |
| Innovación | 20 % | 3 | Solo una solución vecina (335). El tratamiento de patogénicos ya existe como servicio (inferido). |
| Factibilidad | 20 % | 3 | Seguir la cadena es abordable. El tratamiento físico es otra cosa. |
| Escalabilidad | 15 % | 3 | Aplica a cualquier sistema de salud. |
| Vínculo con el ecosistema | 10 % | 3 | Un caso en la Ciudad de Buenos Aires (5), de 2014. Nada de Córdoba. |
| **Total ponderado** | 90 % | **3,28** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |

<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>

## Preguntas para abrir el problema

- ¿Cómo podríamos saber dónde está cada bolsa de residuos patogénicos entre el hospital y el tratamiento?
- ¿Cómo podríamos detectar cuándo los residuos hospitalarios se mezclan con la basura común (5)?
- ¿Cómo podríamos responder a un pico de residuos médicos como el de 2020 (292)?

## Qué falta validar

- ¿Cómo funciona hoy la cadena en Córdoba? Preguntar al Ministerio de Salud, al área de ambiente, a operadores habilitados y a hospitales.
- ¿Ya existen registros de transporte y quién los controla?
- ¿Hay casos recientes en Argentina? El único del dataset es de 2014.

## Límites de la evidencia

- Solidez MEDIA. Lo sostienen 3 noticias válidas de 2 medios: Infobae (2), Clarín (1).
- El caso argentino es de 2014.
- La descripción de 350 está cortada; el detalle sale de la URL.
- No se puede saber con qué frecuencia pasa.
- Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.
- El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco.

## Fuentes

**Noticias del problema**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 5 | 22/10/2014 | Clarín | Clínica de Palermo multada por mal manejo de residuos | https://www.clarin.com/ciudades/multas-clinica-residuos_0_SkP-iu_cP7e.html |
| 292 | 28/04/2020 | Infobae | Hospitales italianos acumulan residuos infectados | https://www.infobae.com/america/agencias/2020/04/28/hospitales-italianos-acumulan-montanas-de-residuos-potencialmente-infectados/ |
| 350 | 26/04/2024 (URL) | Infobae | Hallan residuos hospitalarios reciclados en almacén peruanos | https://www.infobae.com/peru/2024/04/26/residuos-hospitalarios-con-restos-de-sangre-y-heces-se-reciclaban-en-puente-piedra-para-fabricar-tapers-y-otros-productos/ |

**Soluciones del dataset relacionadas**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 335 | 28/02/2024 | Residuos Profesional | [parcial] Alternativas Biodegradables para Plásticos Médicos | https://www.residuosprofesional.com/bioplasticos-residuos-aplicaciones-medicas/ |

**Otras filas citadas**

| Fila | Fecha | Medio | Título | URL |
|---|---|---|---|---|
| 237 | 14/07/2026 | CicloVivo | [Dudosa, no cuenta] Como descartar corretamente as “canetas emagrecedoras”? | https://ciclovivo.com.br/mao-na-massa/faca-voce-mesmo/como-descartar-corretamente-as-canetas-emagrecedoras/ |

---
[← Volver al índice](00-indice.md)
