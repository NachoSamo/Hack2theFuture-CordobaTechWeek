---
tipo: producto
fecha: 2026-11-12
dueña: Oli
estado: borrador para refinar
track: movilidad (cruza residuos)
---

# Idea y épicas: rutas de recolección guiadas por las cámaras del monitoreo urbano

> Documento de producto. La **Parte A** pasa en limpio la idea; la **Parte B** la separa en épicas
> para arrancar a implementar y refinar cada punto. Nombre del producto: a definir en
> [`marca.md`](../../marca.md).
>
> Lo marcado como **supuesto** no está validado. Las cifras y casos salen de las fichas de
> [`research/`](../../../research/Contexto.md), con la fila del CSV entre paréntesis.

---

## Parte A · La idea

### La frase (borrador)

> Ayudamos a **la Municipalidad y a la empresa recolectora de Córdoba** a **recolectar donde de
> verdad se acumula la basura** mediante **los móviles de monitoreo urbano que ya recorren la ciudad
> con cámaras**, para que **los camiones hagan menos kilómetros, salgan más llenos y ningún punto
> crítico quede sin atender**.

### 1. Título

**Recolectar más, recorrer menos.**

Bajada: las cámaras que ya patrullan la ciudad le dicen al camión de basura adónde ir.

### 2. Problema

Las rutas de recolección son fijas y no responden a la demanda real. Hay puntos que se desbordan
(después de un fin de semana largo, un feriado o un evento) mientras los camiones pasan por zonas
casi vacías. Resultado: basura en la calle, con olores y plagas, y camiones que gastan combustible
sin llenarse.

- **Casos en Córdoba:** basura acumulada después del Carnaval en el Mercado Norte (284), después de
  fines de semana largos en Güemes (306) y reclamos en varios barrios (170). Ficha
  [03](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/03-basura-acumulada-en-la-calle.md).
- **Cortes del servicio:** en 2015 un conflicto laboral cortó la recolección en zona norte (272).
  Ficha [09](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/09-cortes-del-servicio-de-recoleccion.md).
  Cuando el servicio se recupera, hoy no hay un mapa de dónde atender primero.
- **Ninguna de las dos fichas tiene solución en el dataset.**
- **Causa raíz (supuesto):** no existe un dato de demanda en tiempo real. Las rutas se planifican a
  ciegas y se corrigen por reclamo.

### 3. A quién le pasa

- **Planificación del municipio:** decide frecuencias y zonas y recibe los reclamos de los vecinos.
- **Operador de logística de la recolectora:** arma las rutas del día y administra la flota y el combustible.
- **Afectados indirectos:** vecinos y comerciantes de zonas con acumulación, y los trabajadores de la
  recolección (más carga en los puntos desbordados).

### 4. Solución, paso a paso

> Flujo del sistema etapa por etapa, con qué recurso aprovecha cada una y cómo cubre el problema:
> [`solucion-paso-a-paso.md`](solucion-paso-a-paso.md).

1. Los **móviles de monitoreo urbano** (patrulleros o vehículos con cámara) siguen con sus
   recorridos habituales. No cambia nada para ellos.
2. Mientras recorren, un modelo de visión **detecta acumulaciones de basura** en la imagen y guarda
   solo el dato: dónde, cuándo y cuánto (nivel bajo, medio o alto). **Nunca se guardan imágenes de personas.**
3. Con esos datos se arma un **mapa de calor de demanda** por zona y franja horaria, que aprende
   patrones (por ejemplo, Güemes los lunes después de un fin de semana largo).
4. El sistema **propone las rutas del día** según el mapa de calor y la capacidad de cada camión:
   primero los puntos críticos y sin pasar por zonas vacías.
5. **El municipio** ve los puntos críticos y la cobertura. **La recolectora** ve las rutas y la carga
   esperada de cada camión.
6. Al cerrar el día, el panel muestra el impacto: kilómetros ahorrados, combustible, CO₂ evitado y
   puntos atendidos a tiempo.

### 5. Qué la hace distinta

- **No requiere hardware nuevo ni sensores en contenedores.** Reutiliza recorridos y cámaras que ya
  existen y ya consumen combustible. Le saca un segundo rendimiento a un gasto que se hace igual.
- Las soluciones habituales (sensores de llenado por contenedor, rutas fijas optimizadas una sola vez)
  exigen inversión en dispositivos o no responden a picos. *Pendiente: relevar qué existe en
  Argentina y afuera (E7).*
- **Cruza dos verticales:** el mismo dato sirve a residuos (qué recolectar) y a movilidad (cómo y cuánto se recorre).

### 6. Impacto y cómo lo medimos

| Indicador | Qué muestra |
|---|---|
| Km recorridos por tonelada recolectada | Eficiencia de la ruta |
| Litros de combustible por ruta (y CO₂ equivalente) | Ahorro económico y ambiental |
| % de capacidad usada por viaje | Si los camiones salen llenos |
| Puntos críticos atendidos en menos de X horas desde su detección | Servicio a los vecinos |
| Reclamos por acumulación por barrio | Efecto visible para la ciudadanía |

**Visión a largo plazo:** ahorrar combustible hoy es el primer paso para que la flota pase a
biocombustibles o eléctricos con menos kilómetros a cubrir. **Foco de hoy:** maximizar, optimizar y
hacer más eficiente lo que ya existe.

### 7. Primer paso (piloto)

Un barrio con acumulación documentada (Güemes o Mercado Norte), con los móviles que ya lo recorren y
un turno de recolección, durante 4 semanas: 2 con ruta fija para tener la línea base y 2 con ruta
sugerida. Hace falta: acuerdo con el área de monitoreo urbano para acceder al video o al dato
procesado, y con la recolectora para medir combustible y carga.

### Riesgos y cómo los respondemos

| Riesgo | Respuesta |
|---|---|
| Privacidad: usar cámaras de seguridad para otro fin | Procesar en el vehículo o en el borde; se guarda solo "basura en X, nivel Y"; personas y patentes se descartan o difuminan. Validar el marco legal (E7) |
| No conseguir acceso a las cámaras | Plan B: cámaras en los propios camiones o fotos de vecinos. La demo usa video simulado |
| Cobertura parcial (los móviles no pasan por todos lados) | El mapa marca las zonas sin dato; se combina con la ruta fija como base |
| El municipio no tiene presupuesto | No pide inversión en hardware y le ahorra combustible a la recolectora; el piloto se puede financiar con fondos UE, BID o CFI (ver [financiamiento](../../../research/cualitativo/oli/Financiamiento%20-%20UE,%20BID%20y%20CFI%20para%20Argentina.md)) |
| Errores del modelo (detecta basura donde no hay) | Umbral de confianza y confirmación por repetición: un punto pasa a crítico si se detecta en más de una pasada |

### Qué sabemos y qué suponemos

| Afirmación | ¿Dato o supuesto? | Fuente / cómo lo validamos |
|---|---|---|
| Hay acumulación recurrente de basura en zonas de Córdoba | Dato (evidencia media) | Ficha 03, filas 170, 284 y 306 |
| Los cortes del servicio dejan basura en la calle | Dato (un caso en Córdoba) | Ficha 09, fila 272 |
| Hay móviles de monitoreo urbano con cámara recorriendo la ciudad | Supuesto | Preguntar a mentores y al staff qué área los opera |
| Las rutas de recolección actuales son fijas | Supuesto | Entrevista con alguien del municipio o la recolectora |
| Un modelo de visión detecta acumulación con precisión suficiente desde un vehículo en movimiento | Supuesto | Spike de E2 con imágenes públicas |
| Optimizar rutas por demanda ahorra combustible de forma relevante | Supuesto | Simulación de E4 + E6 contra la ruta fija |

---

## Parte B · Épicas

Cada épica dice qué entra en la demo del 13/11 y qué queda para después. Las preguntas son las que
hay que cerrar al refinarla (con opciones, según la regla de `AGENTS.md`). Dueños: se asignan al
repartir nodos en [`arquitectura/`](../../arquitectura/README.md).

**Flujo:** E1 cámaras → E2 detección → E3 mapa de calor → E4 rutas → E5 panel → E6 impacto.
E0 y E7 corren en paralelo y alimentan el pitch.

### E0 · Encuadre y validación

- **Objetivo:** confirmar que el problema, los usuarios y el acceso a los datos son reales antes de construir de más.
- **Demo:** las respuestas de mentores y del test 3+3 anotadas en [`proceso.md`](../../proceso.md) y [`mentores.md`](../../mentores.md).
- **Después:** entrevistas con el municipio, la recolectora y el área de monitoreo urbano.
- **Preguntas para refinar:**
  - ¿Quién opera los móviles con cámara en Córdoba (municipio, provincia, privados)?
  - ¿Cómo se planifican hoy las rutas de recolección y cada cuánto se revisan?
  - ¿Qué barrio usamos como caso del piloto?
- **Criterio del jurado:** impacto (25 %) y ecosistema (10 %).
- **Paso de la demo:** el planteo inicial del problema.

### E1 · Ingesta de imágenes de los móviles

- **Objetivo:** recibir los cuadros de video con posición GPS y hora de cada móvil.
- **Demo:** modo simulado con un video o un set de imágenes georreferenciadas de un recorrido por un
  barrio de Córdoba (regla 5 de código: la demo funciona sin hardware).
- **Después:** integración con el sistema real de las cámaras; procesamiento en el vehículo o en el borde.
- **Preguntas para refinar:**
  - ¿Usamos video real grabado por nosotros, imágenes públicas o un recorrido de Street View?
  - ¿Cada cuántos metros o segundos tomamos un cuadro?
  - ¿Dónde se procesa: en el vehículo, en un servidor o en la nube?
- **Criterio del jurado:** factibilidad (20 %).
- **Paso de la demo:** "así pasa hoy un móvil por el barrio".

### E2 · Detección de acumulación de basura

- **Objetivo:** convertir cada imagen en un evento `{lugar, hora, nivel, confianza}` y descartar todo lo demás.
- **Demo:** modelo de visión preentrenado o LLM multimodal sobre las imágenes de E1, con salida
  determinística de respaldo si falla (regla 4 de código).
- **Después:** modelo ajustado con imágenes de Córdoba; difuminado de personas y patentes.
- **Preguntas para refinar:**
  - ¿Modelo de detección (tipo YOLO), LLM multimodal o un clasificador simple?
  - ¿Cómo definimos los niveles bajo, medio y alto?
  - ¿Desde qué confianza un evento cuenta?
- **Criterio del jurado:** innovación (20 %) y factibilidad (20 %).
- **Paso de la demo:** la imagen con la basura marcada y el evento que genera.

### E3 · Mapa de calor de demanda

- **Objetivo:** agregar los eventos por zona y franja horaria y marcar los puntos críticos.
- **Demo:** mapa de un barrio con datos simulados de varias semanas, con picos después de un fin de semana largo.
- **Después:** predicción de demanda por día y evento (feriados, partidos, recitales).
- **Preguntas para refinar:**
  - ¿Qué unidad espacial: cuadra, hexágono o radio de un contenedor?
  - ¿Cuándo un punto pasa a crítico (nivel, repetición, antigüedad)?
  - ¿Mostramos también las zonas sin dato?
- **Criterio del jurado:** innovación (20 %) e impacto (25 %).
- **Paso de la demo:** el mapa que se "enciende" donde está la basura.

### E4 · Optimización de rutas con capacidad

- **Objetivo:** proponer las rutas del día priorizando los puntos críticos y respetando la capacidad
  y la cantidad de camiones.
- **Demo:** ruta fija frente a ruta sugerida sobre el mismo barrio, con km y carga de cada una
  (por ejemplo, con un problema de ruteo de vehículos con capacidad en OR-Tools sobre OpenStreetMap).
- **Después:** reruteo durante el día cuando aparece un punto crítico nuevo.
- **Preguntas para refinar:**
  - ¿Cuántos camiones, de qué capacidad y desde qué base salen?
  - ¿Cuál es la ruta fija de referencia (real o inventada y anotada en el decision log)?
  - ¿Qué priorizamos si no alcanza la capacidad: puntos críticos o cobertura?
- **Criterio del jurado:** factibilidad (20 %) y escalabilidad (15 %).
- **Paso de la demo:** las dos rutas lado a lado.

### E5 · Panel para el municipio y la recolectora

- **Objetivo:** dos vistas sobre los mismos datos.
  - **Municipio:** puntos críticos, cobertura por barrio y tendencia de reclamos.
  - **Recolectora:** rutas del día, carga esperada por camión y combustible estimado.
- **Demo:** una sola pantalla con un selector de vista, siguiendo [`marca.md`](../../marca.md).
- **Después:** usuarios y permisos, alertas y exportación de reportes.
- **Preguntas para refinar:**
  - ¿Cuál de las dos vistas abre la demo?
  - ¿Web de escritorio o también celular para el chofer?
  - ¿Qué tres datos tienen que verse sin hacer clic?
- **Criterio del jurado:** pitch (10 %) e impacto (25 %).
- **Paso de la demo:** el recorrido del usuario de punta a punta.

### E6 · Impacto medible

- **Objetivo:** calcular los indicadores de la Parte A (km por tonelada, litros, CO₂, % de
  capacidad, tiempo de atención) comparando la ruta fija con la sugerida.
- **Demo:** tarjetas con el ahorro del escenario simulado, con la fórmula y los supuestos visibles.
- **Después:** medición real en el piloto y proyección a toda la ciudad.
- **Preguntas para refinar:**
  - ¿Qué consumo por km de camión usamos y de qué fuente?
  - ¿Qué factor de emisión de CO₂ por litro?
  - ¿Proyectamos el ahorro a toda la ciudad en el pitch o solo al barrio?
- **Criterio del jurado:** impacto (25 %).
- **Paso de la demo:** el cierre con "esto ahorra X litros y Y kg de CO₂ por semana".

### E7 · Negocio, ecosistema, privacidad y escalabilidad

- **Objetivo:** tener respuesta a quién paga, quién participa, cómo se protegen los datos y cómo escala.
- **Demo:** slides y respuestas preparadas en [`pitch.md`](../../pitch.md) (tabla B7 de la
  [estructura de solución](../../../research/cualitativo/oli/Estructura%20de%20soluci%C3%B3n.md)).
- **Después:** acuerdo de piloto y fuentes de financiamiento.
- **Preguntas para refinar:**
  - ¿Quién paga: el municipio por servicio, la recolectora por ahorro o un fondo para el piloto?
  - ¿Qué dice la normativa de datos personales sobre reutilizar cámaras de seguridad?
  - ¿Qué soluciones parecidas existen (sensores en contenedores, rutas dinámicas) y por qué no alcanzan?
  - ¿Cómo se lleva a otra ciudad o a Europa?
- **Criterio del jurado:** factibilidad (20 %), escalabilidad (15 %) y ecosistema (10 %).
- **Paso de la demo:** el cierre del pitch y las preguntas del jurado.

---

## Relacionado

- [`proceso.md`](../../proceso.md) · [`decision-log.md`](../../decision-log.md) · [`ESTADO.md`](../../ESTADO.md)
- [Estructura de solución (plantilla oficial)](../../../research/cualitativo/oli/Estructura%20de%20soluci%C3%B3n.md)
- [Fichas de residuos](../../../research/cuantitativo/final-pipeline-residuos/resultados/fichas/00-indice.md)
- [Triage de transporte público](../../../research/cualitativo/gina/transporte-publico-triage.md)
