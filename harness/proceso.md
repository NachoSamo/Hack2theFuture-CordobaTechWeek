# Proceso registrado

> La guía oficial lo exige: **"lo que no se registra, no cuenta"**, y todas las ideas de la mesa
> llegan a la UE y al ITC aunque solo una pase de ronda. Acá van las ideas (elegidas y descartadas),
> las hipótesis y las pruebas con su resultado. Las **decisiones** van en el [decision log](decision-log.md).

Lo que se trabaje en papel (por ejemplo, en el bloque rojo del 12/11, 10:05–12:30) lo pasa acá quien
tenga la letra más clara apenas termina, con una foto de los papeles en [`proceso/`](proceso/).

## Problemas considerados

Todos los que se expusieron en el kickoff, elegidos o no. Formato de [`kickoff.md`](kickoff.md).

| # | Problema | A quién le pasa | Evidencia | Quién lo trajo | Resultado |
|---|---|---|---|---|---|
| | | | | | Elegido / descartado: motivo |

## POV y pregunta

- **Punto de vista (vigente, 12/11 22:01):** el municipio que monitorea la ciudad necesita enterarse antes que el vecino de lo que se rompe o se acumula, porque sus móviles ya recorren toda la ciudad pero solo miran seguridad.
- **¿Cómo podríamos…?** ¿Cómo podríamos lograr que cada km que la flota ya recorre también detecte lo que la ciudad necesita arreglar?
- **En el papel del bloque rojo (12/11):** "Empresas privadas necesita optimizar rutas y maximizar carga porque prefiere reducir costos y tiempos de operación muertos". La pregunta elegida fue "¿Cómo podríamos reducir la brecha entre el aprovechamiento del combustible y la maximización de la capacidad del mismo vehículo contra el circuito de recolección prevalente?". Las otras dos preguntas eran sobre la capacidad de los camiones en tránsito y los puntos óptimos de recolección. La votación no quedó registrada. Foto: [`proceso/fotos/04-definir-el-problema.jpg`](proceso/fotos/04-definir-el-problema.jpg); versión vigente en el [mural](proceso/mural-mesa24.html#o4).

## Ideas

Todas las de la lluvia de ideas, incluidas las "locas". Una línea cada una.

| # | Idea | Quién | Resultado |
|---|---|---|---|
| 1 | Usar las cámaras de los móviles de monitoreo urbano para detectar basura acumulada, armar mapas de calor de demanda y optimizar las rutas y la carga de los camiones recolectores (track movilidad, cruza residuos). Detalle: [`docs/producto/idea-y-epicas.md`](docs/producto/idea-y-epicas.md) | Equipo (pasada en limpio por Oli) | Reemplazada por la idea 2 (pivot 12/11 14:53): los residuos ya tienen rutas |
| 2 | Un móvil para autosanar la ciudad: el patrullaje urbano de COYS detecta con visión por computadora todo lo que requiere atención (microbasurales, voluminosos, postes caídos, vía pública, contenedores) y le da más usos a un consumo que hoy solo sirve a seguridad. Detalle: [`docs/producto/dominio-del-problema.md`](docs/producto/dominio-del-problema.md) | Oli | Elegida |
| 3 | Ampliar las fuentes a domos, clasificar problemas municipales con escala bajo/medio/alto/extremo y ofrecer tickets por entidad y mapa de demanda que pueda alimentar su planificación. Síntesis para interfaz y propuesta de MVP en el [guía de interfaz e identidad](../guia-interfaz-identidad.md) | Diego y Lauti, sesión 12/11/2026 | Propuesta para alinear con Samo y Juani; reglas de gravedad, domos y uso posterior para rutas pendientes. No reemplaza decisiones registradas ni aprueba arquitectura |
| 4 | Rediseño de rutas de recolección “on-demand” (lluvia de ideas del bloque rojo, [foto](proceso/fotos/05-lluvia-de-ideas.jpg)) | Mesa, bloque rojo | Descartada por el pivot (14:53): los residuos ya tienen sus rutas |
| 5 | Medición (peso) de volumen de basura por puntos de recolección | Mesa, bloque rojo | Descartada: suma sensores |
| 6 | Reducción de tiempos muertos en la logística | Mesa, bloque rojo | Descartada por el pivot |
| 7 | Usuarios conectados con la mejor ruta de recolección | Mesa, bloque rojo | Descartada por el pivot |
| 8 | Usuarios con grandes volúmenes de residuos conectados con rutas óptimas | Mesa, bloque rojo | Descartada por el pivot |
| 9 | Aprovechar vehículos recurrentes para detectar puntos o picos de congestión u ocio | Mesa, bloque rojo | Semilla de Urbis: la flota como sensor (19:40) |
| 10 | Aprovechar ruta mediante IA frente a picos de tráfico y cortes | Mesa, bloque rojo | Descartada: tránsito quedó fuera del alcance (14:53) |
| 11 | Algoritmo en tiempo real con visión computacional que trackea focos de residuos fuera del contenedor, instalado en los autos de alerta ciudadana | Mesa, bloque rojo | Semilla de Urbis: detección con cámaras de vehículos; Cordobeses en Alerta es fuente (15:08) |
| 12 | Disminuir brechas de conexión entre las diferentes partes | Mesa, bloque rojo | Semilla de Urbis: aviso directo a cada área (15:08) |
| 13 | Sensores dentro de los contenedores que trackeen su capacidad actual | Mesa, bloque rojo | Descartada: un sensor por contenedor; Urbis usa la cámara del móvil |
| 14 | Data y machine learning para entrenar modelos que aprenden del contexto de la ciudad, con sensores y cámaras | Mesa, bloque rojo | Para el futuro: aprender del historial de incidencias |

## Hipótesis

Lo que creemos y todavía no sabemos. Cada una se convierte en una prueba o queda como "falta validar" en el pitch.

| # | Hipótesis | Cómo la probamos | Estado |
|---|---|---|---|
| H1 | Hay móviles de monitoreo urbano con cámara que recorren Córdoba y se podría acceder a su video o a un dato procesado | Preguntar a mentores y al staff qué área los opera | Sin probar |
| H2 | Las rutas de recolección actuales son fijas y no responden a picos de demanda | Entrevista con el municipio o la recolectora | Sin probar |
| H3 | Un modelo de visión detecta acumulación de basura desde un vehículo en movimiento con precisión suficiente | Spike de la épica E2 con imágenes públicas | Sin probar |
| H4 | Rutear por demanda ahorra km y combustible frente a la ruta fija | Simulación de las épicas E4 y E6 | Descartada por el pivot del 12/11 14:53 (no se tocan las rutas) |
| H5 | El recorrido de los móviles de monitoreo del municipio hoy se usa solo para seguridad | Mentores y staff | Sin probar |
| H6 | Visión por computadora detecta microbasurales, postes caídos y contenedores rotos desde un vehículo en movimiento | Spike con imágenes públicas | Sin probar |
| H7 | Cordobeses en Alerta y la Policía de Córdoba (provincial) compartirían su video o un dato procesado con el municipio | Mentores y staff: quién opera cada fuente y quién lo autoriza | Sin probar |
| H8 | Las áreas actúan sobre un aviso automático, sin validación humana, aunque haya falsos positivos | Test 3+3: mostrar el aviso a quien haría de área y preguntar qué haría | Sin probar |
| H9 | Reutilizar cámaras y recorridos permite agregar detección urbana con costo marginal mínimo (flota, infraestructura y cámaras existentes; a futuro, un módulo de cómputo por móvil) | Medir procesamiento, transmisión, integración y revisión adicionales frente al servicio existente | Sin probar; la guía de interfaz e identidad lo presenta como hipótesis, no como ahorro demostrado |
| H10 | Es posible asignar cuatro niveles de gravedad de forma útil a las distintas categorías usando la evidencia disponible | Acordar criterios por categoría con el área responsable y contrastar clasificaciones sobre imágenes y contexto horario | Sin probar; el prototipo ya usa los cuatro niveles (bajo, medio, alto y extremo) con datos simulados |
| H11 | Se pueden pixelar caras y patentes en el frame de evidencia sin que deje de servirle al área para actuar | Pixelar frames de prueba de cada categoría y preguntarle a quien haría de área si alcanza para decidir | Sin probar; propuesta del 12/11 22:45, la arquitectura en revisión hoy no pixela |

## Pruebas

Incluye el test 3+3 del día 1 (14:35–15:10) y cualquier prueba con usuarios, mentores o datos.

| Fecha y hora | Hipótesis | Qué hicimos | Con quién | Resultado | Qué cambió |
|---|---|---|---|---|---|
| 12/11 14:35–15:10 | Que la propuesta se entiende y resuelve un problema real | Test 3+3: presentamos la solución en la mesa y recibimos visitas ([lienzo 08](proceso/mural-mesa24.html#o8), [foto](proceso/fotos/08-testear-e-iterar.jpg)) | Mesa 25 y un experto/a | Les gustó la visión por computadora y entendieron todo. Preguntaron cómo se financia y cuáles son los primeros pasos; pidieron abarcar todas las problemáticas, no solo residuos; la factibilidad depende del Ministerio de Seguridad | El pivot a detección urbana amplia con aviso directo (decision log 14:53, 15:08 y 21:21); financiamiento con el PMUS (21:21) |

### 13/11 00:26 · Revisión del mapa con Juani

Pedido: una única vista oscura con zonas de calor, retirar rutas sugeridas y acercar al seleccionar tickets o cuadrantes. Para el encuadre inicial se ofreció alejar, inclinar o ambas; Juani eligió mayor inclinación. Se conserva el zoom general y se fija una inclinación de 60°. El control «Ver toda Córdoba» permite recuperar ese encuadre.

**Smoke check del prototipo: PASS.** Compilación con `npm run build`; revisión en navegador a 1440×900 y 390×844. Se comprobó apertura y acercamiento a un ticket, movimiento de cámara al seleccionar un cuadrante, regreso a la vista general, ausencia de selector de capas y acciones de rutas, filtro sin resultados y recuperación de 194 marcadores, acceso directo a CBA-104 y cierre con Escape. También se revisaron la página Impacto y el mapa de la landing. Sin errores de consola durante la revisión. Se corrigió la propagación del clic del marcador al cuadrante para evitar que una selección dispare dos enfoques.

Las tres ramas remotas (`main`, `frontend/mlp-estadisticas-aviso`, `architecture/init`) quedaron integradas en `codex/mapa-ux`. La prueba usa fixtures y avisos simulados; no valida detección real, backend ni hipótesis de impacto. La aprobación completa de los diagramas sigue pendiente.

## Qué aprendimos y qué falta validar

Lo que va al pitch, en dos listas cortas.

- **Aprendimos:** el problema no era la ruta de la basura: los mentores y el test 3+3 nos llevaron a detectar todo lo que la ciudad necesita arreglar y avisar a cada área (pivot 14:53 y 15:08). En el test entendieron la propuesta y les gustó la visión por computadora; las dudas fueron el financiamiento, los primeros pasos y la dependencia del Ministerio de Seguridad. Para implementar hay un canal que ya existe: la UE apoyó con 600.000 € el Plan de Movilidad Urbana Sostenible de Córdoba, que prevé un Observatorio de Movilidad.
- **Falta validar:** el acceso al video de cada fuente (H1, H5 y H7), la precisión de la detección desde un vehículo en movimiento (H3 y H6), que las áreas actúen sobre un aviso automático (H8), el pixelado de la evidencia (H11) y el ahorro del municipio y el aprovechamiento de la flota, que mide el piloto.

## 13/11 01:01 · Avance en logo, landing y auditoría

Juani eligió conservar el estilo de la esquina y agregar auto con cámara y recuadro; para auditoría eligió ambos ejemplos simulados (derivación por sistema y gestión conversacional con confirmación del área). Se implementaron las tres copias del logo (frontend, marca y deck), retiro de franja superior, retiro de acciones y auditoría de lectura. Ejemplos locales: CBA-101 coordinación con Higiene urbana, CBA-102 confirmación de Alumbrado y CBA-108 derivación a EPEC. No hay agentes ni contactos reales. **Compilación PASS; revisión visual y smoke aún pendientes.** Juani pidió subir el avance y dejar el trabajo en proceso registrado en ESTADO.md.
