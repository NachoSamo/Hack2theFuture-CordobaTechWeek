# ESTADO

> Tablero vivo. Un agente que entra al repo lee esto primero para saber **qué pasa ahora**, sin
> recorrer el decision log entero. Cada persona actualiza su fila al cerrar una sesión.

**Actualizado:** 12/11 14:30 · Oli
**Fase:** 0 · Explorar
**Vertical / problema:** movilidad (cruza residuos): rutas de recolección guiadas por cámaras de monitoreo urbano → [`docs/producto/idea-y-epicas.md`](docs/producto/idea-y-epicas.md)
**Próximo checkpoint:** problema e idea congelados, 12/11 12:30 (ver [`evento.md`](evento.md#checkpoints))

> Fases: 0 Explorar · Bloque rojo (oficial: sin computadoras ni IA) · 1 Registrar la selección · 1b Prototipar y
> testear · 1c Diagramar · 2 Construir · 3 Pitch. Qué suele hacer falta en cada una (orientativo; los agentes trabajan en todas): [`../AGENTS.md`](../AGENTS.md).

## Quién hace qué

| Persona | En qué está | Hasta cuándo | Bloqueado por |
|---|---|---|---|
| Samo | Arquitectura de la solución: borrador con 5 nodos y revisión lean; sigue repartir dueños | Checkpoint de la tarde | Dueños de nodo (en persona) |
| Lauti | | | |
| Diego | | | |
| Juani | | | |
| Gina | | | |
| Oli | Solución paso a paso (flujo del sistema, definición de movilidad) en `docs/producto/solucion-paso-a-paso.md`; sigue financiamiento y guion del pitch | Pitch flash 15:30 | Validar H1 (acceso a cámaras de móviles) |

## Decisiones abiertas

Se cierran en el kickoff o en el checkpoint indicado. Al cerrarlas, pasan al decision log.

- [x] Vertical y problema: movilidad cruzando residuos (ver decision log 12/11 14:00)
- [ ] Tipo de prototipo: software, hardware + software, o datos + visualización
- [ ] Stack y nodos de la arquitectura → [`contratos.md`](contratos.md)
- [ ] Diagramas de [`arquitectura/`](arquitectura/) aprobados por cada dueño de nodo y por Samo (sin esto no se codea)
- [ ] Reparto Gina / Oli dentro de producto → [`equipo.md`](equipo.md)
- [ ] Quién pitchea (máximo 2 personas)
- [ ] Casa donde se construye la noche del 12/11 (y confirmar con el staff que se puede trabajar entre días)
- [ ] Formato del recorrido simulado del día 1
- [ ] Qué significa "3+3" en el testeo y cómo se entrega el registro del proceso (preguntar al staff)

## Avisos

Cambios que afectan a otra persona: un contrato, un archivo ajeno, un paso de la demo.
Formato: `hora · quién · qué cambió · a quién afecta`.

- 14:30 · Oli · Nuevo `docs/producto/solucion-paso-a-paso.md`: flujo en 6 etapas alineado a los 5 nodos de `arquitectura/solucion.html`; deja abierto dónde se procesan las imágenes y cómo se cierra el ciclo · a Samo y dueños de nodo. Además se recuperaron con `git restore` las fichas de residuos y 2 archivos de Samo que se habían borrado solo en la copia local de Oli (14:02, sin commit)
- 14:11 · Samo · `arquitectura/solucion.html` en borrador: 5 nodos (E6 dentro del optimizador), dos métricas principales · a todos: cada dueño de nodo completa lo marcado "por definir" en su entrevista
- 14:00 · Oli · Nuevo `harness/docs/producto/idea-y-epicas.md` con la idea y las épicas E0–E7 · a todos: los nodos de `arquitectura/` y `contratos.md` salen de E1–E6

## Bloqueos

-
