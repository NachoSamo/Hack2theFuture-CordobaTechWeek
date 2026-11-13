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

## Demostración de entrada de Urbis

La portada reproduce clips de detecciones simuladas en bucle. «Ver el sistema» desplaza la misma página hasta la sección con el mapa interactivo. Cada marcador abre una tarjeta sobre el mapa con foto, detalle, historial y acciones. En un contenedor rebalsado se puede sugerir una ruta y abrirla en el mapa desde la tarjeta. «Abrir mapa completo» lleva a `/#mapa`. El enlace directo `/#mapa/deteccion` abre el ticket del contenedor. En `/#mapa`, un aviso en vivo anuncia la detección (4 s), el nuevo avistamiento (12 s) y la pasada de verificación (55 s), y al hacer clic abre el ticket. El botón Impacto (en el header del mapa y en la landing) lleva a `/#impacto`, con contadores de CO₂ y litros con doble uso (estimados) y gráficos del mock. *(Rama `frontend/mlp-estadisticas-aviso`, pendiente de revisión de Juani.)*

En `/#mapa`, el botón **Flota** abre la apertura del problema: 16 vehículos simulados (COYS, Policía y Guardia Urbana), dibujados como autitos orientados según la calle, patrullan cada uno su zona de Córdoba por calles reales. El mapa arranca sin incidencias y con «Iniciar recorrido»; cada incidencia aparece cuando un vehículo pasa con su cámara a 50 m o menos. La velocidad va de ×1 a ×120 y la simulación se pausa sola en 194/194. Un clic en una incidencia abre la tarjeta de siempre. «Reiniciar» o cambiar de modo vuelve al estado inicial.
