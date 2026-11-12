# Investigación previa

> **Lectura obligatoria para todo agente antes de elegir el problema o la solución** (fases 0 y 1
> de [`../harness/ESTADO.md`](../harness/ESTADO.md)). Resume lo que el equipo investigó antes del
> evento, dónde está cada estudio y hasta dónde se puede confiar en él.

Foto del 12/11/2026. Todas las cifras salen de los archivos enlazados; nada de este resumen agrega datos nuevos.

## Cómo usar esto

1. **Es insumo para decidir, no prueba de que un problema importa.** Ningún integrante tiene
   experiencia directa en estas verticales. Lo que sale de acá se valida con mentores y con
   personas que viven el problema ([`../harness/mentores.md`](../harness/mentores.md)).
2. **En fase 0 no conviertas el research en una solución.** Mostrá datos, contradicciones y huecos,
   y preguntale al participante con opción múltiple qué quiere explorar (ver "Regla central" en
   [`../AGENTS.md`](../AGENTS.md)).
3. **Citá siempre la fuente:** archivo y, en residuos, el número de `fila` del CSV.
4. **Separá medido de inferido.** Los estudios ya marcan lo inferido; no lo presentes como dato.

## Qué hay

| Estudio | Vertical | Tipo | Archivo | Fecha | Confiabilidad |
|---|---|---|---|---|---|
| Problemas de residuos en noticias | Residuos | Cuantitativo, filtrado a mano | [`cuantitativo/final-pipeline-residuos/resultados/`](cuantitativo/final-pipeline-residuos/resultados/reporte_problemas_residuos.md) | 11/11 | Alta en el método; poca evidencia local |
| 15 fichas de problemas de residuos | Residuos | Fichas que se leen solas | [`fichas/00-indice.md`](cuantitativo/final-pipeline-residuos/resultados/fichas/00-indice.md) | 11/11 | Varía por ficha (ver solidez) |
| Triage de metano en residuos | Residuos | Cualitativo, agenda COP30/31 | [`cualitativo/gina/metano-residuos-triage.md`](cualitativo/gina/metano-residuos-triage.md) | 10/11 | Puntajes por juicio de Gina |
| Triage de adaptación del agro | Agro | Cualitativo, agenda COP30/31 | [`cualitativo/gina/adaptacion-agro-triage.md`](cualitativo/gina/adaptacion-agro-triage.md) | 10/11 | Puntajes por juicio de Gina |
| Triage de bosque seco | Biodiversidad | Cualitativo, agenda COP30/31 | [`cualitativo/gina/bosque-seco-triage.md`](cualitativo/gina/bosque-seco-triage.md) | 10/11 | Puntajes por juicio de Gina |
| Triage de litio | Biodiversidad (cruza agro y derechos) | Cualitativo | [`cualitativo/gina/litio-triage.md`](cualitativo/gina/litio-triage.md) | 9/11 | Puntajes por juicio de Gina |
| Triage de transporte público | Movilidad | Cualitativo, agenda COP30/31 | [`cualitativo/gina/transporte-publico-triage.md`](cualitativo/gina/transporte-publico-triage.md) | 10/11 | Puntajes por juicio de Gina |
| Fichas de problemas, compostaje e IA de Juani | Residuos y otros candidatos | Propuesta para taller | [Fichas](cualitativo/juani/mapa-de-problemas.md) · [IA y ML](cualitativo/juani/ia-y-ml-en-compostaje.md) · [PDF](cualitativo/juani/Hack2theFuture-compostaje-y-mapa-de-problemas.pdf) | 12/11 | Hipótesis pendientes de validación |
| Mentoría con Mariana (tía de Oli) | Residuos, con aportes de agro | Cualitativo, entrevista a experta | [`cualitativo/oli/mentoria-residuos.md`](cualitativo/oli/mentoria-residuos.md) | 6/11 | Una sola fuente; sin contrastar con fuentes escritas |
| Análisis de Croma | Transversal | Herramienta de datos públicos | [`cualitativo/samo/analisis-croma.md`](cualitativo/samo/analisis-croma.md) | 4/11 | No cubre Argentina |
| Publicaciones de Periodistas Ambientales | Transversal | Relevamiento de fuente | [`cualitativo/samo/publicaciones-periodistas-ambientales.md`](cualitativo/samo/publicaciones-periodistas-ambientales.md) | 4/11 | 1 de 16 publicaciones trata residuos |

Cada triage de Gina tiene un archivo hermano `*-problema.md` con el desarrollo del problema mejor puntuado.

**Fuera de este repo:** el pipeline que generó los datos vive en `pipeline-decision-data`. Su
reporte automático de no-patrones (`data/resultados/no_patrones/reporte_no_patrones.md`) mezcla
falsos positivos: por ejemplo, lista como "vacío" al robot limpiador de playas, que el análisis
manual identificó como una solución mal etiquetada (fila 151). **Preferí siempre las fichas filtradas a mano.**

**Lo que no hay:** análisis cuantitativo de agro, biodiversidad ni movilidad. Para esas verticales
solo existe el triage cualitativo.

## Panorama por vertical

### Residuos

El único eje con estudio cuantitativo. Sobre 547 noticias clasificadas por el pipeline (414 como
problema, 133 como solución), la lectura manual dejó 132 problemas válidos, 69 dudosos y 213 falsos
positivos (51 %). Los válidos forman 36 problemas únicos: 3 tienen solución directa en el dataset y
33 son huecos (19 con soluciones parciales, 14 sin ninguna). Las 15 fichas son los huecos con mayor
puntaje ponderado según los criterios del jurado.

Lo que el estudio destaca:
- **Los huecos mejor puntuados están en Córdoba y tratan la cadena municipal de residuos:**
  basurales a cielo abierto (ficha 01), basura acumulada en la calle (03), seguridad de trabajadores
  (04), incendios y quema (05) y cortes del servicio de recolección (09). Ninguno tiene solución en el dataset.
- **Los más recurrentes en la prensa** son la crisis del mercado de reciclados, el plástico en ríos
  y mares, y las metas incumplidas de grandes marcas, pero vienen sobre todo de prensa técnica europea y de EE. UU.
- **Las grandes marcas aparecen como causantes y nunca como impulsoras de soluciones. Las cooperativas no aparecen ni una vez.**
- **Fichas con total alto y solidez baja** (02 envases de agroquímicos, 06 recuperadores urbanos,
  11 trazabilidad, 15 derrames peligrosos): son pistas, las primeras a validar con personas reales.

El triage cualitativo de metano llega por otro camino a un tema vecino: puntúa primero (30) a los
basurales y la quema abierta sin decisión en la agenda COP, con el último censo oficial de basurales de 2017.

La mentoría con Mariana pone el foco en otro punto de la cadena: **el usuario es el cuello de
botella**, porque casi nadie separa en su casa y los hogares no tienen incentivos (las empresas sí).
Recomienda enfocar en residuos sólidos urbanos y cubrir los tres ejes de la sostenibilidad. El
pipeline lista la baja separación en origen entre los huecos que quedaron afuera de las fichas (2,50).

Juani propone explorar dónde se traba la separación y entrega de orgánicos de comercios y comedores de Bariloche. El caso de Belém aporta un antecedente de compostaje cooperativo. La revisión de impropios con IA es una hipótesis de prototipo pendiente de validar con los recuperadores. [Investigación](cualitativo/juani/compostaje-cooperativo-belem-bariloche.md)

### Agro

Solo triage cualitativo. Mejor puntuados: brecha de financiamiento para la adaptación del agro (30),
EUDR sobre soja y carne (26) y suelos degradados (24). El agro concentra el 54 % de las necesidades de
adaptación evaluadas y recibe el 20 % del financiamiento, según las fuentes del triage.

Desde la mentoría (relato oral de Oli): para la UE pesan la huella hídrica y la huella de carbono de
las granjas, y la idea de una granja de emisión cero que compensa con sus cultivos.

### Biodiversidad

Dos triages. **Bosque seco:** el bosque seco queda afuera de los fondos y de la hoja de ruta de
deforestación (30), el fuego como forma de perder bosque (29) y una sola clasificación de riesgo EUDR
para todo el país (26). **Litio:** el agua en los salares mirada por cuenca y no por proyecto (26).

### Movilidad

Solo triage cualitativo. Mejor puntuado: el transporte público sin financiamiento ni presupuesto en
la agenda climática (27). No hay inventario de emisiones del transporte en Córdoba.

### Temas que cruzan verticales

- **EUDR** aparece en agro y en biodiversidad, y conecta con el foco del ITC (ver [`../harness/evento.md`](../harness/evento.md)).
- **Fuego:** en bosque seco (pérdida de bosque) y en residuos (quema de basurales).
- **Falta de datos actualizados:** basurales (censo de 2017), transporte (sin inventario local), litio (sin medición por cuenca).

## Límites que un agente tiene que repetir cuando cite esto

- **"Sin solución en el dataset" no es "sin solución en el mundo":** el dataset solo refleja lo que publicaron los medios relevados.
- **Poca evidencia local:** solo 23 de los 132 problemas válidos de residuos mencionan Argentina, y 12 Córdoba.
- **Los años miden qué medios se relevaron, no cuándo pasa el problema:** 2024–2026 está dominado por prensa técnica internacional.
- **La recurrencia ordena, no mide gravedad:** premia temas sobre los que la prensa técnica publica mucho.
- **Los puntajes de los triages son juicio de Gina** con criterios propios, que no son los pesos del jurado.
- **Hay que verificar con fuente oficial** toda cifra o norma (por ejemplo, fechas de la EUDR) antes de usarla en el pitch.

## Cómo agregar research

Cualquiera puede sumar research, también durante el evento. Por regla de [`../AGENTS.md`](../AGENTS.md),
en el mismo commit:

1. El informe va en `cualitativo/<persona>/` o `cuantitativo/`, con el patrón de los de Gina: eje,
   fecha, fuentes, resumen con la idea principal en negrita, frase del problema, quién lo sufre, por
   qué pasa, el dato que falta, hipótesis, límites, dudas para el equipo y fuentes.
2. Se suma una fila a la tabla "Qué hay" de este archivo y se actualiza el panorama de su vertical.
3. Si contradice o confirma otro estudio, se dice en los dos.
4. Si lo cuenta una persona (mentoría, entrevista), se marca como relato y se separa de lo verificado.

## Preguntas abiertas que dejó el research

Sirven para las entrevistas con mentores. Salen de la sección F del [reporte de residuos](cuantitativo/final-pipeline-residuos/resultados/reporte_problemas_residuos.md).

1. Si el foco es Córdoba, la evidencia local es poca. ¿Hace falta relevar fuentes locales (municipio, Córdoba Obras y Servicios, cooperativas de recuperadores) antes de decidir?
2. ¿Por qué casi no aparecen los recuperadores urbanos, si en Córdoba son un actor central? ¿Ausencia real o sesgo de los medios?
3. ¿Algún problema internacional (mercado de reciclados, marcas, exportación de plástico) tiene un correlato local verificable?
