---
tipo: producto
fecha: 2026-11-12
dueña: Oli
estado: borrador para refinar (reescrito tras el pivot de las 14:53)
track: movilidad (equilibrio de emisiones), cruza residuos y mantenimiento urbano
---

# Idea y épicas: un móvil para autosanar la ciudad

> Documento de producto. La **Parte A** pasa en limpio la idea; la **Parte B** la separa en épicas
> para implementar y refinar. El dominio está en [`dominio-del-problema.md`](dominio-del-problema.md).
> Nombre del producto: a definir en [`marca.md`](../../marca.md).
>
> **Reescrito el 12/11 tras el pivot de las 14:53.** La versión anterior (rutas de recolección guiadas
> por cámaras) está en el historial de git (commit `ca3472f`). Lo marcado como **supuesto** no está
> validado. Las cifras salen de [`research/`](../../../research/Contexto.md), con la fila del CSV entre paréntesis.

---

## Parte A · La idea

### La frase (borrador)

> Ayudamos a **COYS, el área municipal de control de Córdoba**, a **detectar todo lo que en la ciudad
> necesita atención** mediante **los móviles de patrullaje que ya la recorren con cámaras**, para que
> **cada kilómetro que hoy se gasta solo en seguridad también sirva para mantener la ciudad**.

### 1. Título

**Un móvil para autosanar la ciudad.** (Oli, 12/11; reemplaza "Recolectar más, recorrer menos.")

### 2. Problema

- **Un consumo con un solo uso:** los móviles de patrullaje urbano recorren la ciudad todos los días.
  Ese combustible y esas emisiones hoy rinden un solo servicio: seguridad. *(Supuesto H5.)*
- **La ciudad se entera tarde de lo que se rompe:** un microbasural, un poste caído o un contenedor
  roto se conocen por reclamo del vecino o porque un área sale a recorrer para encontrarlos. *(Supuesto.)*
- **Evidencia en Córdoba (residuos):** basura acumulada después del Carnaval en el Mercado Norte (284),
  después de fines de semana largos en Güemes (306) y reclamos en varios barrios (170), ficha
  [03](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/03-basura-acumulada-en-la-calle.md);
  basurales a cielo abierto, ficha [01](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/01-basurales-a-cielo-abierto.md).
- **Sin evidencia todavía:** postes caídos, baches y alumbrado no están en el research.
- **Lo que no es el problema:** las rutas de recolección de residuos ya existen y funcionan; no las tocamos.

### 3. A quién le pasa

- **COYS (área municipal de control):** opera los móviles; ve todo y prioriza qué se atiende primero.
- **Áreas que resuelven** (residuos, alumbrado, vía pública): reciben lo que les toca y lo atienden.
- **Afectados indirectos:** vecinos y comerciantes que conviven con el problema hasta que alguien lo ve.

### 4. Solución, paso a paso

Detalle en [`solucion-paso-a-paso.md`](solucion-paso-a-paso.md).

1. Los **móviles de COYS** siguen con su patrullaje de siempre. No cambia nada para ellos.
2. Mientras recorren, un modelo de visión **detecta lo que requiere atención**: microbasurales y
   voluminosos, problemas de vía pública (postes caídos, baches, semáforos, alumbrado) y contenedores
   llenos o rotos. Guarda solo el dato: qué, dónde, cuándo y qué tan grave. **Nunca imágenes de personas.**
3. Las detecciones se juntan en un **mapa priorizado para COYS**: una incidencia por lugar, ordenada
   por urgencia, con las zonas por donde no pasó ningún móvil marcadas como "sin dato".
4. **COYS decide qué se atiende** y lo asigna al área responsable.
5. **Cada área ve sus incidencias** y las marca como resueltas.
6. El panel muestra el impacto: **kilómetros del patrullaje reutilizados** como detección, incidencias
   detectadas y resueltas.

### 5. Qué la hace distinta

- **No requiere hardware nuevo ni recorridos nuevos.** Le saca un segundo rendimiento a un consumo que
  se hace igual: equilibrio de emisiones.
- **Un recorrido, muchas áreas:** el mismo móvil sirve a seguridad, residuos y vía pública.
- Las alternativas habituales (sensores por contenedor, inspectores por área, apps de reclamo) exigen
  dispositivos, recorridos extra o que el vecino avise. *Pendiente relevar qué existe (E7).*

### 6. Impacto y cómo lo medimos

| Indicador | Qué muestra | Rol |
|---|---|---|
| **Km de patrullaje reutilizados como detección** (y litros y CO₂ equivalentes) | Equilibrio de emisiones: el consumo que ya existe ahora rinde más | **Cifra principal del pitch** (Oli, 12/11) |
| Incidencias detectadas por km recorrido | Cuánto "ve" cada kilómetro | Candidato |
| Tiempo desde la detección hasta la atención | Servicio a los vecinos | Candidato |
| Recorridos de inspección evitados en las áreas | Ahorro de las áreas que hoy salen a buscar | Candidato (requiere suponer cuánto recorren hoy) |

**Visión a largo plazo:** una ciudad que se diagnostica sola en cada recorrido y una flota que, con
más usos por kilómetro, justifica pasar a eléctricos. **Foco de hoy:** sacar el máximo de lo que ya existe.

### 7. Primer paso (piloto)

Un barrio con problemas documentados (Güemes o Mercado Norte), con los móviles de COYS que ya lo
patrullan, durante 4 semanas: medir km reutilizados, incidencias detectadas y tiempo de atención frente
a las que llegan por reclamo. Hace falta: acuerdo con COYS para acceder al video o al dato procesado, y
con al menos un área que resuelva (por ejemplo, residuos).

### Riesgos y cómo los respondemos

| Riesgo | Respuesta |
|---|---|
| Privacidad: usar cámaras de seguridad para otro fin | Procesar en el vehículo o en el borde; se guarda solo "tipo X en lugar Y, gravedad Z"; personas y patentes se descartan o difuminan. Validar el marco legal (E7) |
| No conseguir acceso a las cámaras de COYS | Plan B: cámaras en otros vehículos municipales. La demo usa video simulado |
| Cobertura parcial (el patrullaje no pasa por todos lados) | El mapa marca las zonas sin dato; no reemplaza el reclamo, lo adelanta |
| Muchas categorías, poca precisión | Empezar con tres categorías; umbral de confianza y confirmación en más de una pasada |
| Las áreas no atienden lo que se les asigna | COYS ve el estado de cada incidencia; el tiempo de atención queda a la vista |

### Qué sabemos y qué suponemos

| Afirmación | ¿Dato o supuesto? | Fuente / cómo lo validamos |
|---|---|---|
| Hay acumulación recurrente de basura en zonas de Córdoba | Dato (evidencia media) | Ficha 03, filas 170, 284 y 306 |
| COYS es el área municipal que opera los móviles con cámara | Dato según Oli, sin fuente escrita | Mentores y staff (H1) |
| El patrullaje hoy se usa solo para seguridad | Supuesto | Mentores y staff (H5) |
| Visión por computadora detecta las tres categorías desde un vehículo en movimiento | Supuesto | Spike de E2 (H6) |
| Las áreas hoy se enteran por reclamo o recorriendo | Supuesto | Entrevista con el municipio |
| Las rutas de recolección ya funcionan y no hace falta tocarlas | Dato según Oli, fuente sin registrar | Anotar la fuente en `mentores.md` o `proceso.md` |

---

## Parte B · Épicas

Cada épica dice qué entra en la demo del 13/11 y qué queda para después. Las preguntas son las que hay
que cerrar al refinarla (con opciones, según `AGENTS.md`). Dueños: al repartir nodos en
[`arquitectura/`](../../arquitectura/README.md).

**Flujo:** E1 captura → E2 detección → E3 mapa de incidencias → E4 priorización y asignación → E5 panel → E6 impacto.
E0 y E7 corren en paralelo y alimentan el pitch.

> **Cambio respecto de la versión anterior:** E3 pasa de "mapa de demanda de basura" a "mapa de
> incidencias"; E4 pasa de "optimización de rutas de camiones" a "priorización y asignación"; E5 pasa de
> municipio + recolectora a COYS + áreas; E6 mide km reutilizados en vez de km ahorrados por ruta.

### E0 · Encuadre y validación

- **Objetivo:** confirmar que COYS, su patrullaje y el acceso a las imágenes son reales.
- **Demo:** respuestas de mentores y del test 3+3 en [`proceso.md`](../../proceso.md) y [`mentores.md`](../../mentores.md).
- **Después:** entrevistas con COYS y con las áreas que resuelven.
- **Preguntas para refinar:**
  - ¿Cómo se llama COYS completo, cuántos móviles tiene y qué recorren?
  - ¿Cómo se enteran hoy las áreas de un poste caído o un microbasural?
  - ¿Qué barrio usamos como caso del piloto?
- **Criterio del jurado:** impacto (25 %) y ecosistema (10 %).
- **Paso de la demo:** el planteo inicial del problema.

### E1 · Captura desde los móviles

- **Objetivo:** recibir cuadros de video con posición GPS y hora de cada móvil.
- **Demo:** modo simulado con video o imágenes georreferenciadas de un recorrido por un barrio de
  Córdoba (regla 5 de código).
- **Después:** integración con las cámaras reales; procesamiento en el vehículo o en el borde.
- **Preguntas para refinar:**
  - ¿Video grabado por nosotros, imágenes públicas o Street View?
  - ¿Cada cuántos metros o segundos tomamos un cuadro?
  - ¿Dónde se procesa: en el vehículo, en un servidor o en la nube?
- **Criterio del jurado:** factibilidad (20 %).
- **Paso de la demo:** "así patrulla hoy un móvil el barrio".

### E2 · Detección multicategoría

- **Objetivo:** convertir cada imagen en eventos `{tipo, lugar, hora, gravedad, confianza}` y descartar todo lo demás.
- **Categorías iniciales:** microbasural o voluminoso, problema de vía pública (poste caído, bache,
  semáforo, alumbrado), contenedor lleno o roto.
- **Demo:** modelo de visión preentrenado o LLM multimodal sobre las imágenes de E1, con salida
  determinística de respaldo (regla 4 de código).
- **Después:** modelo ajustado con imágenes de Córdoba; más categorías; difuminado de personas y patentes.
- **Preguntas para refinar:**
  - ¿Modelo de detección (tipo YOLO), LLM multimodal o un clasificador simple?
  - ¿Cómo definimos la gravedad de cada categoría?
  - ¿Desde qué confianza un evento cuenta?
- **Criterio del jurado:** innovación (20 %) y factibilidad (20 %).
- **Paso de la demo:** la imagen con el problema marcado y el evento que genera.

### E3 · Mapa de incidencias

- **Objetivo:** juntar los eventos de varias pasadas en una incidencia por lugar y marcar las zonas sin dato.
- **Demo:** mapa de un barrio con incidencias simuladas de varias categorías.
- **Después:** patrones por día y evento (feriados, tormentas que tiran postes).
- **Preguntas para refinar:**
  - ¿Cuándo dos detecciones son la misma incidencia (distancia, tiempo)?
  - ¿Qué unidad espacial: punto, cuadra o hexágono?
  - ¿Mostramos las zonas sin dato?
- **Criterio del jurado:** innovación (20 %) e impacto (25 %).
- **Paso de la demo:** el mapa que se "enciende" donde la ciudad necesita atención.

### E4 · Priorización y asignación

- **Objetivo:** ordenar las incidencias por urgencia y sugerir el área responsable; COYS confirma y asigna.
- **Demo:** lista priorizada con reglas simples (categoría, gravedad, antigüedad, repeticiones) y un
  botón de asignar a un área. Las reglas se hardcodean y se anotan en el decision log.
- **Después:** prioridad que aprende de lo que COYS asigna primero; asignación automática.
- **Preguntas para refinar:**
  - ¿Qué es más urgente: un poste caído, un microbasural grande o un contenedor roto?
  - ¿Qué áreas existen y qué categoría va a cada una?
  - ¿COYS asigna a mano o el sistema sugiere y COYS confirma?
- **Criterio del jurado:** factibilidad (20 %) y escalabilidad (15 %).
- **Paso de la demo:** COYS asigna la incidencia más urgente.

### E5 · Panel para COYS y las áreas

- **Objetivo:** dos vistas sobre los mismos datos.
  - **COYS:** mapa priorizado, todas las categorías, zonas sin dato y estado de cada incidencia.
  - **Área que resuelve:** solo sus incidencias asignadas, con un botón de "resuelta".
- **Demo:** una sola pantalla con selector de vista, siguiendo [`marca.md`](../../marca.md).
- **Después:** usuarios y permisos, alertas, vista pública para vecinos.
- **Preguntas para refinar:**
  - ¿Qué vista abre la demo?
  - ¿Qué área mostramos como ejemplo (residuos, alumbrado)?
  - ¿Qué tres datos se ven sin hacer clic?
- **Criterio del jurado:** ecosistema (10 %), pitch (10 %) e impacto (25 %).
- **Paso de la demo:** de la detección a la incidencia resuelta, de punta a punta.

### E6 · Impacto medible

- **Objetivo:** calcular los km de patrullaje reutilizados como detección y sus litros y CO₂
  equivalentes, más los indicadores candidatos de la Parte A §6.
- **Demo:** tarjetas con la cifra del escenario simulado, con la fórmula y los supuestos visibles.
- **Después:** medición real en el piloto y proyección a toda la ciudad.
- **Preguntas para refinar:**
  - ¿Qué consumo por km del móvil usamos y de qué fuente?
  - ¿Qué factor de emisión de CO₂ por litro?
  - ¿Cómo contamos el doble impacto (seguridad + mantenimiento con el mismo km, ambiental + económico)?
- **Criterio del jurado:** impacto (25 %).
- **Paso de la demo:** el cierre con "estos X km ya se recorrían; ahora además encontraron Y problemas".

### E7 · Negocio, ecosistema, privacidad y escalabilidad

- **Objetivo:** responder quién paga, quién participa, cómo se protegen los datos y cómo escala.
- **Demo:** slides y respuestas en [`pitch.md`](../../pitch.md) (tabla B7 de la
  [estructura de solución](../../../research/cualitativo/oli/Estructura%20de%20soluci%C3%B3n.md)).
- **Después:** acuerdo de piloto con COYS y fuentes de financiamiento
  ([UE, BID y CFI](../../../research/cualitativo/oli/Financiamiento%20-%20UE,%20BID%20y%20CFI%20para%20Argentina.md)).
- **Preguntas para refinar:**
  - ¿Quién paga: el municipio por servicio, cada área por uso o un fondo para el piloto?
  - ¿Qué dice la normativa de datos personales sobre reutilizar cámaras de seguridad?
  - ¿Qué soluciones parecidas existen y por qué no alcanzan?
  - ¿Cómo se lleva a otra ciudad o a Europa?
- **Criterio del jurado:** factibilidad (20 %), escalabilidad (15 %) y ecosistema (10 %).
- **Paso de la demo:** el cierre del pitch y las preguntas del jurado.

---

## Relacionado

- [`dominio-del-problema.md`](dominio-del-problema.md) · [`solucion-paso-a-paso.md`](solucion-paso-a-paso.md)
- [`proceso.md`](../../proceso.md) · [`decision-log.md`](../../decision-log.md) · [`ESTADO.md`](../../ESTADO.md)
- [Fichas de residuos](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/00-indice.md)
