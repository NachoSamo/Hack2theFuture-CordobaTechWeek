# ESTADO

> Tablero vivo. Un agente que entra al repo lee esto primero para saber **qué pasa ahora**, sin
> recorrer el decision log entero. Cada persona actualiza su fila al cerrar una sesión.

**Actualizado:** 12/11 16:30 · Oli
**Fase:** 0 · Explorar
**Vertical / problema:** movilidad (equilibrio de emisiones): un móvil para autosanar la ciudad, el patrullaje urbano detecta con visión por computadora todo lo que requiere atención → [`docs/producto/dominio-del-problema.md`](docs/producto/dominio-del-problema.md)
**Próximo checkpoint:** problema e idea congelados, 12/11 12:30 (ver [`evento.md`](evento.md#checkpoints))

> Fases: 0 Explorar · Bloque rojo (oficial: sin computadoras ni IA) · 1 Registrar la selección · 1b Prototipar y
> testear · 1c Diagramar · 2 Construir · 3 Pitch. Qué suele hacer falta en cada una (orientativo; los agentes trabajan en todas): [`../AGENTS.md`](../AGENTS.md).

## Quién hace qué

| Persona | En qué está | Hasta cuándo | Bloqueado por |
|---|---|---|---|
| Samo | Arquitectura rehecha sobre el pivot (todas las fuentes, aviso directo, consolidación de incidencias); sigue repartir dueños | Checkpoint de la tarde | Dueños de nodo (en persona) |
| Lauti | [Guía de interfaz e identidad](../guia-interfaz-identidad.md) para iterar landing y MVP, junto con Diego; flujo y pendientes diferenciados | Revisión de landing/MVP con Juani y Samo | Criterios de gravedad, domos y contratos por alinear |
| Diego | [Guía de interfaz e identidad](../guia-interfaz-identidad.md) para iterar landing y MVP, junto con Lauti; estado del prototipo documentado | Revisión de landing/MVP con Juani y Samo | Criterios de gravedad, domos y contratos por alinear |
| Juani | Prototipo COYS con tickets, atención, cobertura y seguimiento simulados | Revisión de UX con el equipo | Contratos de tickets, avisos y cobertura por acordar |
| Gina | | | |
| Oli | Ficha oficial 07 cargada en el formulario (sin enviar: faltan foto del lienzo y minuta de Granola); `Estructura de solución.md` completa (Parte A + anexo B) | Pitch flash 15:30 | Link de Drive de la foto del lienzo |

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
