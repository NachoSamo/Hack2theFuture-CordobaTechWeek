# Diagramas de arquitectura

> **Paso obligatorio antes de codear la demo.** Que todo el equipo entienda qué se construye, cómo lo
> recorre el usuario y en qué parte del flujo aporta cada uno.

Obsidian no muestra HTML: abrí los archivos en el navegador (doble clic). No usan fuentes ni scripts
externos, así que funcionan sin wifi.

| Diagrama | Responde | Archivo |
|---|---|---|
| Arquitectura de la solución | ¿Qué capas y nodos hay, quién es dueño de cada uno, qué entra y qué sale? | [`solucion.html`](solucion.html) |
| Recorrido del usuario | ¿Qué hace, ve y siente la persona del POV en cada paso, y qué nodo responde? | [`recorrido-usuario.html`](recorrido-usuario.html) |

Cada HTML lleva su CSS adentro, así funciona solo: por mail, en una vista previa o exportado a PDF.
Cuando [`../marca.md`](../marca.md) tenga paleta y tipografía, se cambian los tokens de `:root` en los dos archivos.

## Cómo se completan

Después de elegir el problema y antes de la noche del 12/11 (ver [`../evento.md`](../evento.md#checkpoints)):

1. **El agente de Samo entrevista a cada dueño de nodo** con preguntas de opción múltiple: qué hace
   su nodo, qué recibe, qué entrega, cómo se verifica y qué pasa si falla. No completa nada que la
   persona no haya elegido (regla central de [`../../AGENTS.md`](../../AGENTS.md)).
2. El recorrido sale del POV y de los resultados del test 3+3 en [`../proceso.md`](../proceso.md).
3. Cada nodo del diagrama tiene su contrato y su fixture en [`../contratos.md`](../contratos.md).
4. Se reemplazan los textos "por definir" y se agregan o quitan capas y pasos según lo que decida el equipo.

## Aprobación

- **Aprueban:** el dueño de cada nodo y Samo. Se marca en la tabla del final de cada HTML, con fecha y hora.
- Al aprobarse los dos, el estado del encabezado pasa a "Aprobado" (`class="estado ok"`) y se anota en el decision log.
- **Sin aprobación no entra código a la demo.** Prototipos, spikes y el recorrido simulado del día 1 se
  pueden codear antes, separados de la demo.
- Si después cambia un nodo o un paso, se actualiza el diagrama y su dueño vuelve a aprobar.
