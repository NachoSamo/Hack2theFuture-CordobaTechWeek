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
