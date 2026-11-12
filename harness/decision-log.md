# Decision log

> Toda decisión con fecha, hora, opciones y motivo. Cuando a las 23:00 alguien pregunte
> "¿por qué no hicimos X?", está escrito acá. El repo es la fuente de verdad, no el chat.

## Cómo se escribe

- **Nivel `core`:** problema, alcance, arquitectura, stack, marca, modelo de financiamiento. Va al
  pitch o a un entregable. **Las opciones consideradas son obligatorias.**
- **Nivel `producto`:** cómo se comporta algo para el usuario. Opciones si las hubo.
- **Nivel `detalle`:** ajustes menores. Una línea alcanza.
- Los cambios de código no van acá: van en el mensaje del commit.
- No se borra una entrada. Si una decisión se revierte, se agrega otra que la reemplaza y la cita.

Si al final piden un decision log para el jurado, sale filtrando las filas `core`, sin reconstruir nada.

## Decisiones

| Fecha y hora | Nivel | Decisión | Opciones consideradas | Por qué | Quién |
|---|---|---|---|---|---|
| 7/11 | core | Fase 0 sin roles; después, dos frentes (técnica y producto, marca y pitch) con Samo como nexo | Roles fijos desde el inicio · Todos hacen todo | Explorar juntos evita sesgar el problema; separarse después evita el cambio de contexto entre programar y pensar el pitch | Equipo |
| 7/11 | core | Un monorepo que también es vault de Obsidian, como única fuente de verdad técnica y creativa | Obsidian aparte del repo · Figma + docs sueltos | Un solo lugar para que personas y agentes tengan todo el contexto; en NextWave la marca quedó freestyle por no tener fuente | Equipo |
| 12/11 | core | Harness: `AGENTS.md` canónico (`CLAUDE.md` lo importa), `ESTADO.md` como tablero vivo y decision log con opciones y nivel | Copiar el harness de NextWave tal cual | En NextWave `CLAUDE.md` y `AGENTS.md` se duplicaron y se contradijeron (Tailwind y axios contra CSS y fetch); el log llegó a 89 entradas sin opciones y hubo que reconstruirlas para el formulario | Samo |
| 12/11 | core | Vertical y problema abiertos hasta el kickoff | Llegar con residuos elegido | El objetivo es descubrir un problema que no conocemos; elegir antes sesga | Equipo |
| 12/11 | detalle | El Oso no se suma: el equipo queda en 6 (Samo, Lauti, Diego, Juani, Gina, Oli) | — | Confirmado por Samo | Samo |
| 12/11 | core | Los agentes entrevistan a los participantes con opción múltiple y nunca deciden por ellos | El agente propone y la persona aprueba · El agente decide los detalles solo | Sacar la máxima creatividad y razonamiento de cada uno; quien decide es el participante | Samo |
| 12/11 | core | Antes de codear, dos diagramas HTML en `harness/arquitectura/`: arquitectura de la solución y recorrido del usuario, aprobados por cada dueño de nodo y por Samo | Aprobación de todo el equipo · Solo Samo · Diagramas de flujo del equipo y de contratos | Que cada uno entienda qué se construye y dónde aporta al flujo, sin bloquear a todo el equipo en cada aprobación | Samo |
| 12/11 | core | La guía oficial se integra como `guia-oficial.md`: resumen fiel más una tabla de cómo la cumple el método; `evento.md` toma la agenda oficial | Fundirla en `evento.md` · Resumen + PDF original en el repo | Separar lo oficial de lo nuestro deja ver cada choque y cómo se resolvió | Samo |
| 12/11 | core | Las reglas oficiales mandan sobre el método; si una es ambigua, se consulta al staff y se anota acá | Mandan siempre, sin excepción · Caso por caso | El método nos hizo ganar NextWave, pero acá el jurado evalúa también el proceso que pide la organización | Samo |
| 12/11 | core | En el bloque azul del día 1 se arma un recorrido simulado para el test 3+3 y el pitch flash; los diagramas se aprueban antes de la noche y la demo real se construye a la noche | Diagramas primero y demo real desde el bloque azul · Prototipo en papel y código solo a la noche | Cumple la agenda oficial (prototipar y testear el día 1) sin saltear la aprobación de diagramas antes de codear | Samo |
| 12/11 | core | Ideas, hipótesis, pruebas y resultados van en `proceso.md`; el decision log sigue solo con decisiones | Ampliar el decision log con tipos de fila · Un archivo por cosa | La guía exige registrar todo, incluidas las ideas descartadas, sin mezclarlo con las decisiones | Samo |
| 12/11 | core | Regla en `AGENTS.md`: todo cambio en el repo actualiza, en el mismo commit, toda la documentación afectada, incluido `research/README.md` | Dejarlo a criterio de cada uno | Mañana varias personas suman research y código en paralelo; sin la regla, el harness queda viejo en horas | Samo |
| 12/11 | detalle | README como esqueleto con la estructura de NextWave, sin firma de equipo hasta el kickoff | README de harness con huecos · README del método | Todavía no hay producto ni nombre | Samo |
| 12/11 10:48 | core | Los agentes son una herramienta continua: no se apagan por bloques horarios. En el bloque rojo oficial el agente lo menciona en una línea y sigue. Es una excepción a la fila "las reglas oficiales mandan" | Agentes siempre, sin aviso · Excepción anotada sin aviso · Mantener los agentes apagados en el bloque rojo | "No importan los bloques, los agentes son una herramienta continua" | Samo |
| 12/11 10:48 | core | Los agentes pueden traer ideas y soluciones propias en cualquier fase, siempre como opciones para marcar, con su costo; decide la persona. Reemplaza el "no proponer soluciones en fase 0" | Proponen libremente · Solo si se las piden | Menos restricción para los agentes sin perder la regla de que decide el participante | Samo |
| 12/11 10:48 | detalle | La tabla de fases de `AGENTS.md` pasa a ser orientativa ("qué suele hacer falta"), sin columna de prohibiciones | Modos de trabajo sin horario · Borrar la tabla | Sigue sirviendo para anticipar qué necesita el equipo en cada momento | Samo |
| 12/11 10:48 | core | Regla 0 de código: prototipos y spikes en cualquier momento, aparte; el código de la demo espera los diagramas aprobados. Modifica la fila de los diagramas antes de codear | Mantener la regla como estaba · Eliminarla | Flexibilizar sin perder la aprobación de diagramas antes de integrar la demo | Samo |
| 12/11 14:00 | core | Track movilidad, cruzando residuos: rutas de recolección guiadas por las cámaras de los móviles de monitoreo urbano. Documento: [`docs/producto/idea-y-epicas.md`](docs/producto/idea-y-epicas.md) | A completar por el equipo (problemas e ideas descartadas del kickoff, en `proceso.md`) | Aprovecha recorridos y cámaras que ya consumen combustible, sin hardware nuevo; ataca acumulación de basura documentada en Córdoba (fichas 03 y 09) | Equipo (registra Oli) |
| 12/11 14:00 | producto | Las cámaras de partida son las de móviles o patrulleros de monitoreo urbano | Móviles · Cámaras fijas (CCTV) · Las dos · Dejarlo abierto | Sostiene el argumento de reutilizar un recurso que ya gasta combustible | Oli |
| 12/11 14:00 | producto | Usuarios: municipio (planifica, ve puntos críticos) y recolectora (ejecuta rutas y carga), con dos vistas del panel | Solo la recolectora · Solo el municipio · Los dos · Dejarlo abierto | El municipio planifica y la recolectora ejecuta | Oli |
| 12/11 14:00 | detalle | El documento de producto va en `harness/docs/producto/` y se arma por épicas, sin historias; las historias salen al refinar cada épica | `docs/producto/` en la raíz · `harness/docs/` directo · Épicas con historias | Elección de Oli | Oli |
| 12/11 14:11 | core | Arquitectura en 5 nodos: 01 Captura (E1), 02 Detección (E2), 03 Mapa de demanda (E3), 04 Optimizador e impacto (E4 + E6), 05 Panel (E5). E0 y E7 corren en paralelo, sin nodo. Borrador en [`arquitectura/solucion.html`](arquitectura/solucion.html) | Un nodo por épica E1–E6 · 5 nodos con E6 dentro de E4 | El optimizador ya calcula km y carga de las dos rutas; un contrato menos para esta noche | Samo |
| 12/11 14:11 | producto | Se mantienen las dos vistas (municipio y recolectora) después de la revisión lean, que advirtió que duplica E5 y no elige early adopter. Ratifica la fila de las 14:00 | Recolectora primero · Municipio primero · Las dos | El municipio planifica y la recolectora ejecuta (fila de las 14:00) | Samo |
| 12/11 14:11 | core | Dos métricas principales, una por usuario: km por tonelada (recolectora) y puntos críticos atendidos a tiempo (municipio). Definen el éxito del piloto de 4 semanas; el umbral queda abierto | Km por tonelada · Puntos críticos a tiempo · % de capacidad usada · CO₂ evitado | Cada vista del panel tiene su métrica; el CO₂ y los litros se derivan de los km | Samo |
| 12/11 14:11 | detalle | Los dueños de los nodos se cierran en persona con el equipo | Reparto por fortalezas propuesto por el agente · Variante con Samo en E4 · Hablarlo con el equipo | Elección de Samo | Samo |
