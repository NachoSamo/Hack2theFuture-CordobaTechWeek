# ESTADO

> Tablero vivo. Un agente que entra al repo lee esto primero para saber **qué pasa ahora**, sin
> recorrer el decision log entero. Cada persona actualiza su fila al cerrar una sesión.

**Actualizado:** 12/11 15:55 · Oli
**Fase:** 0 · Explorar
**Vertical / problema:** movilidad (equilibrio de emisiones): un móvil para autosanar la ciudad, el patrullaje urbano detecta con visión por computadora todo lo que requiere atención → [`docs/producto/dominio-del-problema.md`](docs/producto/dominio-del-problema.md)
**Próximo checkpoint:** problema e idea congelados, 12/11 12:30 (ver [`evento.md`](evento.md#checkpoints))

> Fases: 0 Explorar · Bloque rojo (oficial: sin computadoras ni IA) · 1 Registrar la selección · 1b Prototipar y
> testear · 1c Diagramar · 2 Construir · 3 Pitch. Qué suele hacer falta en cada una (orientativo; los agentes trabajan en todas): [`../AGENTS.md`](../AGENTS.md).

## Quién hace qué

| Persona | En qué está | Hasta cuándo | Bloqueado por |
|---|---|---|---|
| Samo | Arquitectura rehecha sobre el pivot (todas las fuentes, aviso directo, consolidación de incidencias); sigue repartir dueños | Checkpoint de la tarde | Dueños de nodo (en persona) |
| Lauti | | | |
| Diego | | | |
| Juani | | | |
| Gina | | | |
| Oli | Docs de producto alineados a las decisiones de las 15:08 (fuentes, aviso directo, cierre por pasada); deck del pitch en `pitch/deck.html` | Pitch flash 15:30 | Validar H1/H5/H7 (acceso a cámaras) |

## Decisiones abiertas

Se cierran en el kickoff o en el checkpoint indicado. Al cerrarlas, pasan al decision log.

- [x] Vertical y problema: movilidad cruzando residuos (ver decision log 12/11 14:00)
- [ ] Cómo contamos el doble impacto (la cifra principal quedó en km reutilizados, decision log 15:10)
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
