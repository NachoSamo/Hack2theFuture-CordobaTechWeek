---
tipo: producto
fecha: 2026-11-12
dueña: Oli
estado: borrador para refinar (reescrito tras el pivot de las 14:53 y las decisiones de las 15:08)
track: movilidad (equilibrio de emisiones), cruza residuos y mantenimiento urbano
---

# Idea y épicas: un móvil para autosanar la ciudad

> Documento de producto. La **Parte A** pasa en limpio la idea; la **Parte B** la separa en épicas
> para implementar y refinar. El dominio está en [`dominio-del-problema.md`](dominio-del-problema.md).
> Nombre del producto: a definir en [`marca.md`](../../marca.md).
>
> **Reescrito el 12/11 tras el pivot de las 14:53 y ajustado a las decisiones de Samo de las 15:08**
> (fuentes múltiples, aviso directo a cada área, cierre por la próxima pasada; ver [decision log](../../decision-log.md)). La versión anterior (rutas de recolección guiadas
> por cámaras) está en el historial de git (commit `ca3472f`). Lo marcado como **supuesto** no está
> validado. Las cifras salen de [`research/`](../../../research/Contexto.md), con la fila del CSV entre paréntesis.

---

## Parte A · La idea

### La frase (borrador)

> Ayudamos a **las áreas de la Municipalidad de Córdoba** a **enterarse a tiempo de todo lo que la
> ciudad necesita arreglar** mediante **los vehículos con cámara que ya la recorren (COYS, Cordobeses en
> Alerta y móviles policiales)**, para que **cada kilómetro que hoy se gasta solo en seguridad también
> sirva para mantener la ciudad**.

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

- **Áreas que resuelven** (higiene urbana, alumbrado, vía pública): reciben el aviso directo de lo que
  les toca y lo atienden. Son el usuario principal.
- **Fuentes:** COYS (área municipal de control), Cordobeses en Alerta y la Policía de Córdoba. Siguen su
  recorrido; sus cámaras aportan las imágenes.
- **COYS:** además de fuente, tiene una vista general de todas las incidencias y la cobertura. No asigna.
- **Afectados indirectos:** vecinos y comerciantes que conviven con el problema hasta que alguien lo ve.

### 4. Solución, paso a paso

Detalle en [`solucion-paso-a-paso.md`](solucion-paso-a-paso.md).

1. Los **vehículos con cámara** (COYS, Cordobeses en Alerta, móviles policiales) siguen con su recorrido
   de siempre. No cambia nada para ellos.
2. Mientras recorren, un modelo de visión **detecta lo que requiere atención**: microbasurales y
   voluminosos, problemas de vía pública (postes caídos, baches, semáforos, alumbrado) y contenedores
   llenos o rotos. Guarda solo el dato: qué, dónde, cuándo y qué tan grave. **Nunca imágenes de personas.**
3. Las detecciones de todas las fuentes y pasadas se **consolidan en un ticket por incidencia**, con
   avistamientos y primera y última vez visto.
4. El ticket se **avisa directo al área responsable** según su categoría, sin una persona en el medio.
   Cada categoría hace el recorrido completo; no hay una categoría protagonista.
5. Cuando una pasada posterior ya no ve la incidencia, queda **"posiblemente resuelta"**: así se cierra
   el ciclo y se mide el tiempo de resolución sin pedirle datos al área.
6. El panel muestra la vista general (COYS), la vista de cada área y el impacto: **kilómetros
   reutilizados** como detección, incidencias detectadas y resueltas.

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

Un barrio con problemas documentados (Güemes o Mercado Norte), con los vehículos con cámara que ya lo
recorren, durante 4 semanas: medir km reutilizados, incidencias detectadas y tiempo de resolución frente
a las que llegan por reclamo. Hace falta: acuerdo con al menos una fuente (COYS primero) para acceder al
video o al dato procesado, y con al menos un área que reciba los avisos (por ejemplo, higiene urbana).

### Riesgos y cómo los respondemos

| Riesgo | Respuesta |
|---|---|
| Privacidad: usar cámaras de seguridad para otro fin | Procesar en el vehículo o en el borde; se guarda solo "tipo X en lugar Y, gravedad Z"; personas y patentes se descartan o difuminan. Validar el marco legal (E7) |
| No conseguir acceso a las cámaras | Varias fuentes: si una no comparte, suman las otras (H7). La demo usa video simulado |
| Cobertura parcial (el patrullaje no pasa por todos lados) | El mapa marca las zonas sin dato; no reemplaza el reclamo, lo adelanta |
| Muchas categorías, poca precisión | Empezar con tres categorías; umbral de confianza y confirmación en más de una pasada |
| Aviso automático con falsos positivos | Solo se avisa lo confirmado en más de una pasada o con confianza alta; probar con el test 3+3 si el área actuaría (H8) |
| Las áreas no atienden el aviso | COYS ve el estado de cada incidencia y la próxima pasada muestra si sigue ahí |

### Qué sabemos y qué suponemos

| Afirmación | ¿Dato o supuesto? | Fuente / cómo lo validamos |
|---|---|---|
| Hay acumulación recurrente de basura en zonas de Córdoba | Dato (evidencia media) | Ficha 03, filas 170, 284 y 306 |
| COYS es el área municipal que opera los móviles con cámara | Dato según Oli, sin fuente escrita | Mentores y staff (H1) |
| Ya hay móviles municipales con cámaras | Dato | Una decena en el Parque Sarmiento ([La Voz](https://grupoclarin-la-voz-prod.cdn.arcpublishing.com/ciudadanos/cordoba-una-decena-de-moviles-municipales-con-camaras-controlaran-el-parque-sarmiento)) |
| Cordobeses en Alerta y la Policía compartirían su video o dato | Supuesto | Mentores y staff (H7) |
| Las áreas actúan sobre un aviso automático | Supuesto | Test 3+3 (H8) |
| El patrullaje hoy se usa solo para seguridad | Supuesto | Mentores y staff (H5) |
| Visión por computadora detecta las tres categorías desde un vehículo en movimiento | Supuesto | Spike de E2 (H6) |
| Las áreas hoy se enteran por reclamo o recorriendo | Supuesto | Entrevista con el municipio |
| Las rutas de recolección ya funcionan y no hace falta tocarlas | Dato según Oli, fuente sin registrar | Anotar la fuente en `mentores.md` o `proceso.md` |

---

## Parte B · Épicas

Cada épica dice qué entra en la demo del 13/11 y qué queda para después. Las preguntas son las que hay
que cerrar al refinarla (con opciones, según `AGENTS.md`). Dueños: al repartir nodos en
[`arquitectura/`](../../arquitectura/README.md).

**Flujo:** E1 captura → E2 detección y clasificación → E3 consolidación de incidencias → E4 derivación al área → E5 panel → E6 impacto.

**Nodos de la arquitectura** ([`solucion.html`](../../arquitectura/solucion.html), Samo 15:08): 01 = E1, 02 = E2, 03 = E3, 04 = E4, 05 = E5 + E6.
E0 y E7 corren en paralelo y alimentan el pitch.

> **Cambios del 12/11:** tras el pivot (14:53), E3–E6 dejan las rutas de recolección. Tras las
> decisiones de Samo (15:08), E1 suma fuentes, E3 pasa a consolidar tickets y cerrar el ciclo, E4 pasa de
> "COYS prioriza y asigna" a "aviso directo al área" y E5 deja a COYS con una vista general.

### E0 · Encuadre y validación

- **Objetivo:** confirmar que COYS, su patrullaje y el acceso a las imágenes son reales.
- **Demo:** respuestas de mentores y del test 3+3 en [`proceso.md`](../../proceso.md) y [`mentores.md`](../../mentores.md).
- **Después:** entrevistas con COYS y con las áreas que resuelven.
- **Preguntas para refinar:**
  - ¿Cómo se llama COYS completo, cuántos móviles tiene y qué recorren?
  - ¿Quién opera Cordobeses en Alerta y quién autoriza compartir su video o el de la Policía?
  - ¿Cómo se enteran hoy las áreas de un poste caído o un microbasural?
  - ¿Qué barrio usamos como caso del piloto?
- **Criterio del jurado:** impacto (25 %) y ecosistema (10 %).
- **Paso de la demo:** el planteo inicial del problema.

### E1 · Captura desde los móviles

- **Objetivo:** recibir cuadros de video con posición GPS, hora y fuente (COYS, Cordobeses en Alerta, móvil policial).
- **Demo:** modo simulado con video o imágenes georreferenciadas de un recorrido por un barrio de
  Córdoba (regla 5 de código).
- **Después:** integración con las cámaras reales; procesamiento en el vehículo o en el borde.
- **Preguntas para refinar:**
  - ¿Video grabado por nosotros, imágenes públicas o Street View?
  - ¿Cada cuántos metros o segundos tomamos un cuadro?
  - ¿Dónde se procesa: en el vehículo, en un servidor o en la nube?
- **Criterio del jurado:** factibilidad (20 %).
- **Paso de la demo:** "así patrulla hoy un móvil el barrio".

### E2 · Detección y clasificación

- **Objetivo:** convertir cada imagen en detecciones con categoría, lugar, hora, fuente y confianza, y descartar todo lo demás.
- **Categorías iniciales:** microbasural o voluminoso, bache, poste o cable caído, contenedor lleno o
  roto. Ninguna es protagonista: todas generan su ticket.
- **Demo:** modelo de visión preentrenado o LLM multimodal sobre las imágenes de E1, con salida
  determinística de respaldo (regla 4 de código).
- **Después:** modelo ajustado con imágenes de Córdoba; más categorías; difuminado de personas y patentes.
- **Preguntas para refinar:**
  - ¿Modelo de detección (tipo YOLO), LLM multimodal o un clasificador simple?
  - ¿Cómo definimos la gravedad de cada categoría?
  - ¿Desde qué confianza un evento cuenta?
- **Criterio del jurado:** innovación (20 %) y factibilidad (20 %).
- **Paso de la demo:** la imagen con el problema marcado y el evento que genera.

### E3 · Consolidación de incidencias

- **Objetivo:** juntar las detecciones de todas las fuentes y pasadas en **un ticket por incidencia**,
  confirmarlo y cerrar el ciclo cuando una pasada posterior ya no lo ve.
- **Demo:** varias pasadas simuladas sobre un barrio: un ticket nace, suma avistamientos y queda
  "posiblemente resuelto".
- **Después:** zonas sin dato; patrones por día y evento (feriados, tormentas).
- **Preguntas para refinar:**
  - ¿Cuándo dos detecciones son la misma incidencia (distancia, tiempo, categoría)?
  - ¿Cuántos avistamientos o qué confianza hacen falta para avisar?
  - ¿Cuántas pasadas sin verla hacen falta para marcarla "posiblemente resuelta"?
- **Criterio del jurado:** innovación (20 %) y factibilidad (20 %).
- **Paso de la demo:** el ticket que se arma solo con lo que ven varios vehículos.

### E4 · Derivación al área

- **Objetivo:** avisar cada ticket **directo al área responsable** según su categoría, sin persona en el
  medio. Velocidad y escala: no depende de que alguien asigne.
- **Demo:** tabla fija categoría → área (hardcodeada y anotada en el decision log) y el aviso que le llega
  al área.
- **Después:** canales de aviso (correo, sistema de reclamos del municipio, WhatsApp); prioridad por
  gravedad.
- **Preguntas para refinar:**
  - ¿Qué áreas existen y qué categoría va a cada una?
  - ¿Por qué canal le llega el aviso al área en la demo?
  - ¿Qué dato mínimo lleva el aviso (foto sin personas, ubicación, gravedad, avistamientos)?
- **Criterio del jurado:** factibilidad (20 %), escalabilidad (15 %) y ecosistema (10 %).
- **Paso de la demo:** el aviso que llega al área sin que nadie lo reenvíe.

### E5 · Panel para COYS y las áreas

- **Objetivo:** dos vistas sobre los mismos tickets.
  - **Área que resuelve:** sus tickets con ubicación, avistamientos y estado.
  - **COYS:** vista general de todas las incidencias, todas las categorías y la cobertura. No asigna.
- **Demo:** una sola pantalla con selector de vista, siguiendo [`marca.md`](../../marca.md).
- **Después:** usuarios y permisos, alertas, vista pública para vecinos.
- **Preguntas para refinar:**
  - ¿Qué vista abre la demo: un área o la general?
  - ¿Qué área mostramos como ejemplo?
  - ¿Qué tres datos se ven sin hacer clic?
- **Criterio del jurado:** ecosistema (10 %), pitch (10 %) e impacto (25 %).
- **Paso de la demo:** de la detección al ticket "posiblemente resuelto", de punta a punta.

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
- **Después:** acuerdo de piloto con las fuentes y fuentes de financiamiento
  ([UE, BID y CFI](../../../research/cualitativo/oli/Financiamiento%20-%20UE,%20BID%20y%20CFI%20para%20Argentina.md)).
- **Preguntas para refinar:**
  - ¿Quién paga: el municipio por servicio, cada área por uso o un fondo para el piloto?
  - ¿Qué gana cada fuente (COYS, Cordobeses en Alerta, Policía) por compartir su video?
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
