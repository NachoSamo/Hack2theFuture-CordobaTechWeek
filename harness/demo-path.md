# Demo path

> No es una lista de features: es la secuencia exacta de pantallas y acciones que se muestran.
> **Lo que no aparece acá es opcional.** La guía oficial no exige un MVP completo: cada paso tiene
> que **probar un supuesto**. Un paso que no prueba nada se recorta.

Hay dos piezas distintas:

1. **Recorrido simulado (día 1):** prototipo liviano para el test 3+3 (14:35–15:10) y el pitch flash
   (15:30). Se arma en el bloque azul y no necesita diagramas aprobados: se tira.
2. **Demo (noche del 12/11):** lo que se muestra el día 2. Su código entra después de aprobar los
   diagramas de [`arquitectura/`](arquitectura/README.md); antes se pueden hacer prototipos y spikes aparte.

## Cómo se usa

- Alguien propone una feature → "¿en qué paso se ve, qué supuesto prueba y qué criterio sube?" → si no hay respuesta, no se hace.
- En el recorte del 13/11 ~00:30 se eliminan, simplifican o hardcodean **pasos**, no features sueltas.
- El "wow" tiene que estar en un paso concreto. Si no se puede señalar cuál, todavía no hay wow.

## 1 · Recorrido simulado (día 1)

**Hipótesis que testea** (de [`proceso.md`](proceso.md)):

| # | Qué ve la persona que testea | Qué le preguntamos | Hipótesis |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

Formato posible según la guía: un esquema, una simulación o un recorrido interactivo. Se decide con el equipo.

## 2 · Demo (día 2)

**Se congela antes de escribir código**, junto con los diagramas. Es el contrato del equipo.

| # | Qué se ve | Acción de quien presenta | Supuesto que prueba | Criterio que sube | Estado | Dueño |
|---|---|---|---|---|---|---|
| 0 | | | | | ⬜ | |
| 1 | | | | | ⬜ | |
| 2 | | | | | ⬜ | |
| 3 | | | | | ⬜ | |

Estados: ⬜ pendiente · 🟡 en curso · ✅ listo · 🔧 hardcodeado · ❌ recortado

## Fallbacks obligatorios

- [ ] El demo path corre sin hardware: cada paso con sensor o cámara tiene un modo simulado
- [ ] Si falla el LLM, una respuesta determinística muestra los mismos datos
- [ ] Un botón o comando vuelve todo a un estado conocido
- [ ] Datos simulados marcados como tales en pantalla; nunca se presentan como reales
- [ ] Toda cifra de impacto que se muestra tiene su fuente a mano para las preguntas
- [ ] **Video de respaldo grabado el 13/11 ~02:00**

## Orden de recorte

Se completa al congelar la demo: qué pasos no se tocan nunca y cuál se corta primero.

## Video de entrada de Vestigio

El clip de 12 segundos monta imágenes urbanas ilustrativas con movimiento de cámara, recuadros de detección, confianza, gravedad, hora, coordenadas y área responsable. Muestra un bache, una rama caída y un contenedor rebalsado. El clip se reproduce en bucle y sin audio. **Ver el ticket detectado** abre CBA-104 en `/#mapa/deteccion`, con la misma imagen y la empresa recolectora en el detalle. La simulación sigue agregando un avistamiento y el aviso.
