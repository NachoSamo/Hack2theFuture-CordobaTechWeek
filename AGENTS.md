# AGENTS.md — Hack to the Future 2026

Reglas para cualquier agente (Claude Code, Codex) y para cualquier persona del equipo.
**Es la única fuente de reglas del equipo:** `CLAUDE.md` importa este archivo. Si otro archivo del
harness lo contradice, gana este y se corrige el otro en el mismo commit.

**Por encima de todo están las reglas oficiales del evento** ([`harness/guia-oficial.md`](harness/guia-oficial.md)).
Si una regla oficial choca con este método, manda la oficial. Si es ambigua, se consulta al staff y la
interpretación se anota en el decision log. Ningún agente propone saltarse una regla oficial.

El repo también es una bóveda de Obsidian: abrí la carpeta raíz como vault. Los links son relativos
(`[texto](harness/archivo.md)`) para que funcionen igual en GitHub y en Obsidian.

## Qué es esto

Hackathon de innovación sostenible de la Córdoba Tech Week (Córdoba Cluster, Global Gateway UE, ITC).
- **Día 1:** jueves 12/11/2026, 9 a 16 h. Design Thinking por mesas. **De 10:05 a 12:30, bloque
  rojo sin computadoras ni IA.** De 13:15 a 15:10, prototipado y test 3+3. A las 15:30, pitch flash.
- **Noche del 12/11:** construcción de la demo en casa de alguien del equipo (método propio, a confirmar con el staff).
- **Día 2 (Demo Day):** viernes 13/11/2026, 9 a 15 h. Pitch por vertical desde las 10:45 y ronda final de 8 finalistas desde las 13:15.

Vertical y problema: **abiertos** hasta el kickoff. Estado vivo en [`harness/ESTADO.md`](harness/ESTADO.md).

## Mapa

| Archivo | Responde | Dueño |
|---|---|---|
| [`harness/guia-oficial.md`](harness/guia-oficial.md) | ¿Qué reglas puso la organización y cómo las cumplimos? | Samo |
| [`harness/ESTADO.md`](harness/ESTADO.md) | ¿En qué fase estamos, quién hace qué y qué está bloqueado? | Samo (cada uno edita su fila) |
| [`harness/equipo.md`](harness/equipo.md) | ¿Quién es dueño de qué y a quién le pregunto? | Samo |
| [`harness/evento.md`](harness/evento.md) | ¿Qué evalúa el jurado, cuál es el cronograma y qué falta preguntar? | Samo |
| [`harness/kickoff.md`](harness/kickoff.md) | ¿Cómo elegimos el problema? | Todos |
| [`harness/proceso.md`](harness/proceso.md) | ¿Qué ideas, hipótesis y pruebas hubo, y qué resultó? (exigido por la organización) | Todos |
| [`harness/decision-log.md`](harness/decision-log.md) | ¿Qué decidimos, qué otras opciones había y por qué? | Quien decide |
| [`harness/demo-path.md`](harness/demo-path.md) | ¿Qué se ve en la demo, paso a paso? | Samo + Juani |
| [`harness/arquitectura/`](harness/arquitectura/README.md) | ¿Qué construimos, cómo lo recorre el usuario y dónde aporta cada uno? (HTML) | Samo + dueños de nodo |
| [`harness/contratos.md`](harness/contratos.md) | ¿Qué entra y qué sale de cada nodo de la arquitectura? | Samo |
| [`harness/marca.md`](harness/marca.md) | ¿Cómo se ve, cómo suena y cómo se llama el producto? | Juani |
| [`harness/pitch.md`](harness/pitch.md) | ¿Qué decimos en 3 minutos y qué criterio sube cada parte? | Oli + Gina |
| [`harness/mentores.md`](harness/mentores.md) | ¿Qué nos dijeron mentores, facilitadores y jurado? | Gina |
| [`research/README.md`](research/README.md) | ¿Qué investigamos antes y hasta dónde confiar? **Leer antes de elegir problema o solución** | Quien agrega research |

## Regla central: entrevistar, no asumir

**Quien decide es el participante, nunca el agente.** El trabajo del agente es sacar la máxima
creatividad y razonamiento de la persona con la que trabaja. Vale para todas las fases y para todo
lo que no esté ya escrito en el harness: nombres, alcance, prioridades, campos de un JSON, copy,
colores, orden de pasos.

1. **No asumas nada.** Si falta un dato o hay más de un camino, preguntá antes de escribir.
2. **Preguntá con opción múltiple para marcar.**
   - Claude Code: herramienta `AskUserQuestion`.
   - Codex u otro agente sin herramienta de preguntas: opciones numeradas (`1)`, `2)`, `3)`, más
     "otra: …"), una pregunta por línea, y esperá la respuesta antes de seguir.
3. **Cada opción dice qué implica**, no solo cómo se llama. Que la persona elija sabiendo el costo.
4. **No empujes una opción.** Podés señalar riesgos o huecos de evidencia, pero no ordenes las
   opciones para inducir una respuesta ni decidas "por defecto".
5. **Repreguntá el porqué** cuando una respuesta abre algo nuevo: el razonamiento de la persona vale
   tanto como su elección y suele ser material para el pitch.
6. **Lo que se decide, se escribe:** decisiones en el decision log, con las opciones que se ofrecieron.

## Protocolo de sesión (todo agente, siempre)

**Al arrancar:**
1. `git pull`.
2. Preguntá con quién trabajás si no lo sabés ("¿quién sos?") y leé su tarjeta en [`harness/equipo.md`](harness/equipo.md).
3. Leé [`harness/ESTADO.md`](harness/ESTADO.md): la fase define cómo te comportás (tabla de abajo).
4. Si la fase es 0 o 1, leé [`research/README.md`](research/README.md) antes de hablar de problemas o soluciones.
5. Si vas a tocar código, leé [`harness/contratos.md`](harness/contratos.md) y los diagramas de
   [`harness/arquitectura/`](harness/arquitectura/README.md). Si vas a tocar UI, leé [`harness/marca.md`](harness/marca.md).

**Al cerrar:**
1. Actualizá **toda** la documentación afectada por lo que cambiaste (ver "Documentación: actualizarla siempre").
2. Si se tomó una decisión → fila en [`harness/decision-log.md`](harness/decision-log.md). Ideas, hipótesis o pruebas → [`harness/proceso.md`](harness/proceso.md).
3. Actualizá tu fila de [`harness/ESTADO.md`](harness/ESTADO.md).
4. Commit chico y push. Si tocaste un archivo de otro dueño, decilo en el commit y en `ESTADO.md › Avisos`.

## Cómo se comporta el agente según la fase

| Fase (en `ESTADO.md`) | Qué hace | Qué no hace |
|---|---|---|
| **0 · Explorar** (antes del evento) | Trae datos con fuente, resume `research/`, hace preguntas que abren el problema | Proponer soluciones o encuadres propios: sesgan al equipo |
| **Bloque rojo** (12/11, 10:05–12:30) | **Nada: no se usan computadoras ni IA.** Regla oficial | Cualquier intervención |
| **1 · Registrar la selección** (desde 12:30) | Pasa a `proceso.md` lo que salió en papel: problemas, POV, ideas y la elegida | Reinterpretar o mejorar lo que el equipo eligió |
| **1b · Prototipar y testear** (13:35–15:10) | Ayuda a armar el recorrido simulado y a registrar el test 3+3 | Construir la demo real antes de los diagramas |
| **1c · Diagramar** | Entrevista a cada dueño de nodo y completa los diagramas de [`arquitectura/`](harness/arquitectura/README.md) | Escribir código del producto antes de la aprobación |
| **2 · Construir** (noche del 12/11) | Trabaja en el área de su persona, contra contratos y demo path | Features que no estén en el demo path |
| **3 · Pitch** (13/11) | Ensaya, recorta, prepara respuestas al jurado | Código nuevo, salvo arreglar algo que rompe la demo |

## Reglas para escribir código

0. **Nadie codea la demo antes de que los diagramas estén aprobados.** La arquitectura de la solución
   y el recorrido del usuario en [`harness/arquitectura/`](harness/arquitectura/README.md) los aprueba
   el dueño de cada nodo y Samo. Sin esa aprobación, un agente no escribe código del producto. El
   recorrido simulado del día 1 queda exento: es un prototipo de testeo y se tira.
1. **Lo único que importa es que el demo path corra en vivo.** Ver [`harness/demo-path.md`](harness/demo-path.md).
2. **Sin tests unitarios ni CI.** Sí un smoke check que recorra el demo path de punta a punta y diga PASS o FAIL.
3. **Si se puede hardcodear y se ve igual en la demo, se hardcodea**, y se anota en el decision log.
4. **Nunca una pantalla en blanco:** try/except amplio con fallback visible. Si falla el LLM, una respuesta determinística con los mismos datos.
5. **Hardware sí, pero la demo funciona sin él:** todo paso con sensor, cámara o placa tiene un modo simulado o un archivo de entrada equivalente.
6. **Cada nodo se desarrolla contra su fixture** de `fixtures/` y no espera al nodo anterior.
7. **Un contrato no cambia sin avisar** en `ESTADO.md › Avisos`. La mayoría de los bugs de integración son forma de JSON, no lógica.
8. **Secretos solo en `.env`**, que está en `.gitignore`. Nunca en el código, en un zip ni en el chat.

## Documentación: actualizarla siempre

**Regla para toda persona y todo agente: un cambio en el repo incluye, en el mismo commit, la
actualización de toda la documentación del harness afectada por ese cambio.** No hace falta que nadie
lo pida y no se deja "para después". Un commit que cambia algo y deja un doc desactualizado está
incompleto. Vale igual para código, datos, research, marca, pitch o decisiones.

| Si cambia… | Actualizar |
|---|---|
| Se agrega, mueve o corrige research | [`research/README.md`](research/README.md): tabla "Qué hay", el panorama de su vertical y los límites. Si cambia lo que se sabe de un problema, también `kickoff.md` |
| Un informe de research nuevo | Seguir el patrón de los de `research/cualitativo/gina/`: eje, fecha, fuentes, resumen, frase del problema, límites, dudas y fuentes |
| Una decisión de problema, alcance, arquitectura o stack | `decision-log.md` (nivel `core`, con opciones) |
| Una idea, hipótesis, prueba o resultado | `proceso.md` |
| La fase, una tarea o un bloqueo | Tu fila de `ESTADO.md` |
| La forma de lo que entra o sale de un nodo | `contratos.md` + su fixture, y aviso en `ESTADO.md` |
| Un nodo, una capa o un paso del usuario | El diagrama en `arquitectura/`, y vuelve a pedir aprobación del dueño afectado |
| Un paso de la demo | `demo-path.md` y, si cambia el relato, `pitch.md` |
| Nombre, color, tipografía, tono o logo | `marca.md` |
| Lo que dijo un mentor o jurado | `mentores.md`, y si cambió una decisión, enlazarla |
| Una regla o un horario oficial | `guia-oficial.md` y `evento.md` |
| Un integrante, un rol o un dueño | `equipo.md` y la tabla "Equipo" del README |
| Un comando, un requisito o una ruta de API | "Ejecutar localmente" y "API disponible hoy" del README |
| Un archivo o carpeta nueva, movida o borrada | "Mapa del repositorio" del README y, si tiene dueño, `contratos.md` |
| El estado de una parte del producto | "Estado del repositorio" del README |

Cómo hacerlo:

- **Buscar referencias viejas:** `grep` del nombre, la ruta, la cifra o el campo que cambió, y corregirlas todas, no solo la primera.
- **Medir, no estimar:** las cifras salen de los archivos. Si algo no se midió, se dice.
- **Fechas y horas absolutas** (12/11 14:30), nunca "hoy" o "ayer".
- **Separar lo implementado de lo planeado.** No presentar como hecho algo que no lo está.
- **Al terminar, decir qué documentos se actualizaron** y, si alguno quedó pendiente, por qué.
- El decision log registra **decisiones**, no cambios de código: el qué cambió va en el mensaje del commit.

## Idioma

Todo en español: docs, producto y pitch. Si la organización pide otro idioma, se anota en el
decision log y se cambia.

## Norte

El jurado puntúa impacto social y ambiental (25 %), innovación (20 %), factibilidad (20 %),
escalabilidad (15 %), ecosistema (10 %) y pitch y equipo (10 %). Detalle en [`harness/evento.md`](harness/evento.md).

Ante cualquier feature nueva, dos preguntas: **¿qué criterio sube?** y **¿en qué paso de la demo se ve?**
Si no hay respuesta para las dos, no se hace.
