# ESTADO

> Tablero vivo. Un agente que entra al repo lee esto primero para saber **qué pasa ahora**, sin
> recorrer el decision log entero. Cada persona actualiza su fila al cerrar una sesión.

**Actualizado:** 13/11 01:01 · Juani
**Fase:** 3 · Pitch (el prototipo y la arquitectura siguen en paralelo)
**Vertical / problema:** movilidad sostenible: **Urbis**, «Mismo recorrido, más sustentabilidad»; el patrullaje urbano detecta con visión por computadora todo lo que requiere atención → [`docs/producto/dominio-del-problema.md`](docs/producto/dominio-del-problema.md)
**Próximo checkpoint:** Club del Pitch por vertical, 13/11 10:45 (ver [`evento.md`](evento.md#checkpoints))

> Fases: 0 Explorar · Bloque rojo (oficial: sin computadoras ni IA) · 1 Registrar la selección · 1b Prototipar y
> testear · 1c Diagramar · 2 Construir · 3 Pitch. Qué suele hacer falta en cada una (orientativo; los agentes trabajan en todas): [`../AGENTS.md`](../AGENTS.md).

## Quién hace qué

| Persona | En qué está | Hasta cuándo | Bloqueado por |
|---|---|---|---|
| Samo | README reescrito sobre Urbis y auditoría de inconsistencias (12/11 22:45): docs de producto, proceso.md (H9–H11, aprendimos y falta validar), AGENTS.md y los 16 lienzos del [mural](proceso/mural-mesa24.html) al día. Sigue: decidir con Diego el pixelado; `architecture/init` integrada en `codex/mapa-ux` el 13/11 | Checkpoint de la tarde | Dueños de nodo (en persona) |
| Lauti | [Guía de interfaz e identidad](../guia-interfaz-identidad.md) para iterar landing y MVP, junto con Diego; flujo y pendientes diferenciados | Revisión de landing/MVP con Juani y Samo | Criterios de gravedad, domos y contratos por alinear |
| Diego | [Guía de interfaz e identidad](../guia-interfaz-identidad.md) para iterar landing y MVP, junto con Lauti; estado del prototipo documentado | Revisión de landing/MVP con Juani y Samo | Criterios de gravedad, domos y contratos por alinear |
| Juani | Logo en landing, mapa, pestaña, documentación y deck. Landing con clips a 1,5×, mapa negro con calor, tarjetas de auditoría e Impacto. Compilación y recorrido principal verificados en Edge | Revisión de UX con el equipo | Falta comprobar visualmente la exclusión de incidencias resueltas del calor |
| Gina | | | |
| Oli | Deck v3 en formato oficial híbrido (`pitch/deck.html`) y speech (`pitch/speech.md`); sigue ensayar con el prototipo en vivo | Pitch 13/11 | Validar H1/H5/H7 (acceso a cámaras) |

## Decisiones abiertas

Se cierran en el kickoff o en el checkpoint indicado. Al cerrarlas, pasan al decision log.

- [x] Vertical y problema: movilidad sostenible, detección urbana con Urbis (decision log 14:53 y 22:01)
- [x] Cómo contamos el impacto: ambiental + económico (19:40); en el pitch, ODS y viabilidad económica, y el aprovechamiento de la flota como respuesta al jurado (23:20)
- [ ] Tipo de prototipo: software, hardware + software, o datos + visualización
- [ ] Stack y nodos de la arquitectura → [`contratos.md`](contratos.md)
- [ ] Diagramas de [`arquitectura/`](arquitectura/) aprobados por cada dueño de nodo y por Samo (sin esto no se codea)
- [ ] Reparto Gina / Oli dentro de producto → [`equipo.md`](equipo.md)
- [ ] Quién pitchea (máximo 2 personas): el speech v10 está escrito para dos voces; se decide en el ensayo
- [ ] Casa donde se construye la noche del 12/11 (y confirmar con el staff que se puede trabajar entre días)
- [x] Formato del recorrido simulado del día 1: mockup digital (lienzo 07)
- [x] Qué significa "3+3": 3 presentan en la mesa y 3 visitan otra mesa (lienzo 08); el registro va en el formulario oficial (QR)

## Avisos

- 13/11 · Juani · Logo aplicado a la pestaña y el README, además de la cabecera, la ficha de marca y el deck. Se sincronizan la guía de interfaz (Lauti y Diego), el recorrido de demo y el estado (Samo) y las referencias del pitch (Oli y Gina).

- 13/11 · Juani · Se actualiza el logo de Urbis en frontend, marca y deck con un muro, un contenedor y un auto con cámara · a Oli y Gina

- 13/11 · Juani · Se recupera el logo del edificio con cámara en frontend, marca y deck. El mapa usa base negra y calor en las zonas observadas · a Oli, Gina y Diego

- 13/11 01:01 · Juani · Avance solicitado para push: logo actualizado en frontend, marca y deck (archivo de Oli/Gina); franja superior retirada; detalle sin acciones y con auditoría simulada. Fixture local agrega `auditExamples` y contratos documenta esta extensión sin cambiar el payload del hub. Actualizados READMEs, guía compartida de Lauti/Diego, marca, demo path, recorrido, decisiones y proceso (documentos de Samo/producto). Integra también `main` hasta `050c905` (cofirma «by Hackaranda»). Compilación PASS, revisión visual y smoke pendientes · a Samo, Lauti, Diego, Oli y Gina

- 13/11 00:38 · Juani · Actualizadas todas las referencias remotas e incorporado `main` hasta `af74dd0` en `codex/mapa-ux`: apertura del speech, ajustes de eficiencia del combustible y fuentes, y «× Hackaranda» en la portada. Se conservan las entradas de ambos lados del decision log y las mejoras del mapa. Archivos integrados de otros dueños: pitch (Oli/Gina) y marca (cofirma del equipo) · a Samo, Oli y Gina

- 13/11 00:24 · Juani · Integradas `main`, `frontend/mlp-estadisticas-aviso` y `architecture/init` en `codex/mapa-ux`, conservando decisiones y avisos de todas las ramas. UX del prototipo: única vista oscura con calor e inclinación 60°, zoom al ticket/cuadrante y retiro de rutas sugeridas. Documentos compartidos actualizados: README, guía de interfaz, marca, demo path, recorrido del usuario, decision log y proceso; el contexto de iteración 1 queda señalado como histórico. No cambia ningún payload de API · a Samo (arquitectura y recorrido por revisar), Lauti y Diego (guía), Oli y Gina (demo)

- 22:45 · Samo · README reescrito al 100 % sobre Urbis (estado real: prototipo con datos simulados, sin backend ni detección; arquitectura de la rama `architecture/init`). Decision log 22:45: frames de evidencia con caras y patentes pixeladas (propuesta), Guardia Urbana como cuarta fuente y «posiblemente resuelta» sin afirmar resolución. Inconsistencias que quedan en archivos de otros dueños:
  - **Oli (speech v10, antes del pitch):** dice «1.400 llamados por árboles y postes caídos», pero según su propia fuente (Perfil, 7/8/2026) los 1.400 son todos los llamados de la tormenta y 198 fueron por postes o columnas; «procesa la imagen en el mismo móvil, sin transmitir ni grabar» choca con los frames de evidencia de la arquitectura; las notas citan «slide 10» en un deck de 9 y repiten «se sostiene solo». En `pitch.md`, la tabla de 8 bloques y la línea de «11 slides… costo marginal cero» quedaron viejas. Las horas de las filas 22:40–23:55 del decision log son posteriores a la hora real de su commit (≈22:35)
  - **Juani (frontend):** el paquete se llama `trama-urbana-prototipo` y la UI dice «Vista COYS» mientras el pitch habla de municipio; rama y cable caído siguen fuera del catálogo de la arquitectura
  - **Samo y Diego (arquitectura):** `architecture/init` sin mergear (main tiene la versión vieja de `arquitectura-sistema.md`, con edge y sin imágenes); decidir el pixelado (H11) y las 10 decisiones pendientes de la rama; `contratos.md` con el stack vacío y los nodos de las 15:08; `demo-path.md` con las tablas vacías

- 12/11 · Juani · La demo abre tarjetas sobre el mapa. Se actualizó el recorrido en `demo-path.md` · a Samo

- 12/11 · Juani · Se separan los clips de detección y el mapa interactivo en la landing; está reflejado en `demo-path.md` · a Samo

Cambios que afectan a otra persona: un contrato, un archivo ajeno, un paso de la demo.
Formato: `hora · quién · qué cambió · a quién afecta`.

- 00:01 (13/11) · Samo · Rama `frontend/mlp-estadisticas-aviso` (archivos de Juani): página `/#impacto` con contadores de CO₂ y litros con doble uso (estimados) y gráficos del mock, botón Impacto en el mapa y en la landing, aviso en vivo sobre el mapa y soporte para varias fotos por tipo (`src/assets/ticket-photos/<tipo>/`). Sin mergear · a Juani (revisar y mergear antes del video de las ~02:00) y a Oli y Gina (Impacto respalda «nos da estadísticas»; 1.329 t es la cifra del municipio, no las 14.600 t de toda la flota)
- 00:10 (13/11) · Oli · El gancho del pitch cambia: 5,6 millones de litros y ~$12.000 millones por año (estimación con 770 móviles). Los 2 millones de litros eran biocombustible de toda la flota oficial, no patrullaje. `proceso/mural-mesa24.html` todavía cita los 2 millones (registro del mural, no lo toqué) · a todo el equipo
- 23:15 · Oli · El pitch dice edge computing (procesamiento en el móvil, sin transmitir ni guardar video). En la arquitectura seguía abierto dónde se procesan las imágenes · a Samo y al dueño del nodo 02
- 22:01 · Samo · Mural sincronizado con el contexto vigente de Urbis: los lienzos oficiales reemplazan el papel (la foto queda enlazada); la empatía se divide en municipio y vecino; los agregados (PTM, Team Canvas, Mercado, Abundancia, BMC, VPC, Cronograma, Demo con la UI actual y Métricas) pasan al pivot. Decision log 22:01: PTM «Ciudades que se autosanen», mercado resegmentado, metas del piloto, costos, título «Mismo recorrido, más sustentabilidad» y **hardware: suma un módulo de cómputo chico por móvil**. Coincide con el pitch («costo marginal mínimo» y edge computing, 22:55 y 23:15). `proceso.md` con POV, 11 ideas y la prueba del test 3+3 · a Oli y Gina (pitch) y a Juani (marca y demo en los lienzos)
- 21:21 · Samo · `proceso/mural-mesa24.html` ahora tiene dos categorías: "Lienzos oficiales" (02 Actores, 03 Empatía, 04 Problema, 05 Ideas, 07 Ficha, 08 Testear; transcripción fiel del papel + propuesta del coach lean) y "Lienzos agregados" (las 9 Exo de antes, sin cambios). Fotos de los papeles en `proceso/fotos/`. Decision log 21:21: modelo de financiamiento (convenio de piloto para monitorear el PMUS, financiado por la UE con 600.000 €), el pivot también sale del test 3+3, se mantienen las fuentes, personas vecino + municipio, título vigente. Nueva conversación en `mentores.md` (Mesa 25 + experto) · a Oli y Gina (financiamiento y evidencia del test para el pitch)
- 20:30 · Samo · Nuevo `docs/producto/encaje-movilidad-urbana-ue.md`: por qué el producto es movilidad sostenible según la UE (4 de los 8 pilares del Urban Mobility Framework, con límites), apalancamiento (credibilidad, mercado en Europa, fondos, diferenciación), una frase propuesta para el speech y respuestas para el jurado. No cambia contratos ni la demo · a Oli y Gina (pitch)
- 19:40 · Oli · Speech v5 y deck: primera frase con el problema, "por qué es movilidad" (bloque 8), sustentabilidad ambiental + económica (bloque 9) y usuario municipio + vecino (slide 4). Suma unas 60 palabras: cronometrar · a Gina y a quien presente
- 17:25 · Oli · COYS → "municipio" / "monitoreo municipal" en docs de producto, `proceso.md` (H5) y, **en archivos de Samo**, `contratos.md`, `arquitectura/solucion.html` y el diagrama del README: solo cambia el nombre, no la forma de ningún contrato. Quedan las menciones históricas · a Samo
- 17:10 · Oli · Pitch: el usuario pasa a ser "los municipios" (ya no COYS) y se suma una slide con problemas de la ciudad con fuente (basura, alumbrado, postes caídos). Docs de producto actualizados a las 17:25 · a Samo, Gina y Juani (el prototipo todavía dice "vista general de COYS")
- 16:50 · Oli · Reglas oficiales del pitch en `guia-oficial.md` (3 min, prototipo obligatorio, 7 bloques, criterios del 13/11). Deck v3 con el prototipo de `frontend/` en vivo en la slide 6 · a Juani (que el panel esté listo para mostrarse) y a Gina
- 22:35 · Lauti · Cerradas decisiones de arquitectura y contratos del hub de incidencias (estructura inicial mockeada) en `arquitectura/arquitectura-sistema.md`, `contratos.md` y `decision-log.md` · a Samo y dueños de nodos técnicos
- 16:30 · Oli · Deck v2 (11 slides: costo marginal cero y ODS 11, 12, 13, 9 y 17) y speech actualizado. La demo del deck usa "quema de residuos", que no está en las categorías de E2 · a Gina (ODS y speech) y a quien tenga el nodo 02
- 12/11/2026 (sesión Diego y Lauti) · Nuevo `guia-interfaz-identidad.md`, enfocado en contenido de landing, vistas del MVP e identidad existente, según la aclaración de Diego y Lauti. Se restaura el contenido previo del README raíz, con una entrada al nuevo archivo en el mapa, por corrección de Diego y Lauti: el pedido era un documento separado. Documenta el aviso directo decidido por Samo y distingue implementación de objetivos. Domos y escala bajo/medio/alto/extremo quedan como requisitos planteados en la sesión, pendientes de alinear; no se cambian contratos ni diagramas. El prototipo sigue centrado en recolección y tiene tres niveles. Descriptor y slogan de marca requieren revisión con Juani. Archivos compartidos actualizados: mapa del README y registro de proceso · a Juani, Samo y Oli
- 16:10 · Oli · Deck rehecho estilo TED (9 slides, mínimo texto, primera con nombre, logo y equipo) y nuevo `pitch/speech.md` con el guion de 3 minutos; cierra pidiendo un piloto de un barrio por 4 semanas · a Gina (co-dueña del pitch) y Juani (marca)
- 15:55 · Oli · `idea-y-epicas.md` y `solucion-paso-a-paso.md` alineados a las decisiones de Samo (15:08): E1 con tres fuentes, E3 consolidación de incidencias, E4 derivación directa al área, E5 con vista general de COYS; épicas mapeadas 1 a 1 con los nodos 01–05. Resuelve el aviso de Samo de las 15:08 · a Samo y dueños de nodo
- 15:40 · Oli · Nuevo `pitch/deck.html` (9 slides, marca Trama Urbana, contenido del pivot + fuentes y aviso directo de Samo). No usa el slogan ni el descriptor de `marca.md`, que siguen hablando de recolección · a Juani y Gina
- 15:08 · Samo · Por recomendación de varios mentores: fuentes = COYS + Cordobeses en Alerta + móviles policiales; aviso directo a cada área (COYS solo tiene vista general); cierre del ciclo con la próxima pasada. `arquitectura/solucion.html`, `contratos.md` y el README están actualizados. En los docs de producto de Oli hay un aviso arriba, pero E4/E5 y la etapa 4 todavía dicen "COYS asigna" · a Oli (reescribir E4, E5 y la etapa 4) y a los dueños de nodo
- 15:10 · Oli · `idea-y-epicas.md` y `solucion-paso-a-paso.md` reescritos: E3 mapa de incidencias, E4 priorización y asignación (reemplaza el optimizador de rutas), E5 panel COYS + áreas, E6 km reutilizados. El nodo 04 de `arquitectura/solucion.html` y el diagrama del README siguen en la versión anterior · a Samo y dueños de nodo
- 14:53 · Oli · **Pivot de dominio**: ya no son rutas de recolección sino detección urbana amplia desde el patrullaje (`docs/producto/dominio-del-problema.md`). `idea-y-epicas.md`, `solucion-paso-a-paso.md`, `arquitectura/solucion.html` (nodos 03 y 04) y `contratos.md` quedan desactualizados · a Samo y dueños de nodo
- 14:30 · Oli · Nuevo `docs/producto/solucion-paso-a-paso.md`: flujo en 6 etapas alineado a los 5 nodos de `arquitectura/solucion.html`; deja abierto dónde se procesan las imágenes y cómo se cierra el ciclo · a Samo y dueños de nodo. Además se recuperaron con `git restore` las fichas de residuos y 2 archivos de Samo que se habían borrado solo en la copia local de Oli (14:02, sin commit)
- 14:11 · Samo · `arquitectura/solucion.html` en borrador: 5 nodos (E6 dentro del optimizador), dos métricas principales · a todos: cada dueño de nodo completa lo marcado "por definir" en su entrevista
- 14:00 · Oli · Nuevo `harness/docs/producto/idea-y-epicas.md` con la idea y las épicas E0–E7 · a todos: los nodos de `arquitectura/` y `contratos.md` salen de E1–E6

## Bloqueos

-

El prototipo de esta rama muestra avisos automáticos y una auditoría de solo lectura con gestiones simuladas.

## En proceso · Juani

**Avance subido del 13/11 en `codex/mapa-ux`:**

- [x] Logo con fachada urbana, auto con cámara y contenedor en perspectiva aplicado a frontend, documentación y deck.
- [x] Franja superior de la landing retirada.
- [x] Acciones del ticket retiradas; queda Cerrar para navegación.
- [x] «Auditoría del ticket» reemplaza el historial: actor, hora, intervención y resultado simulado.
- [x] Ejemplos locales CBA-101 (coordinación conversacional), CBA-102 (confirmación de Alumbrado) y CBA-108 (derivación a EPEC).
- [x] `npm run build`: PASS.
- [x] Verificar el logo en la cabecera de la landing y el deck.
- [x] Probar auditoría y filtro «Resolución confirmada».
- [ ] Comprobar en el mapa de calor la exclusión del caso resuelto de la demanda activa.
- [x] Probar que CBA-104 conserva el replay y el estado «Posiblemente resuelta».
- [x] Probar landing, Impacto, cierre con Escape, regreso al encuadre general y tarjeta móvil en Edge.

Estos pendientes corresponden a esta iteración; no son una validación con usuarios ni una integración real de agentes.
