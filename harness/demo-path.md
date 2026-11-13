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

La portada reproduce clips de detecciones simuladas en bucle a 1,5×. «Cómo funciona» baja a la explicación dentro de la página. «Ver el sistema» desplaza la misma página hasta la sección con el mapa interactivo. El mapa abre con base negra, marcadores y calor en las zonas observadas, con una inclinación de 60°. Se puede ver cada capa por separado. Cada marcador acerca el mapa y abre una tarjeta de lectura con foto, detalle y auditoría del ticket, sin acciones de aviso, barrida ni rutas sugeridas. Seleccionar un cuadrante acerca la cámara a esa zona. «Ver toda Córdoba» recupera la vista general. «Abrir mapa completo» lleva a `/#mapa`. El enlace directo `/#mapa/deteccion` abre el ticket del contenedor. En `/#mapa`, un aviso en vivo anuncia la detección (4 s), el nuevo avistamiento (12 s) y la pasada de verificación (55 s), y al hacer clic abre el ticket. El botón Impacto (en el header del mapa y en la landing) lleva a `/#impacto`, con contadores de CO₂ y litros con doble uso (estimados) y gráficos del mock. Frontend y arquitectura quedaron integrados en `main` el 13/11; el prototipo sigue usando datos simulados.

«Filtros» abre o cierra la barra completa sin borrar los filtros activos. Desde el mapa se puede abrir «Flota» para simular el recorrido de 16 móviles y observar la secuencia de CBA-104. El reloj y las cuatro velocidades quedan visibles al ocultar los filtros.

### Iteración en proceso · 13/11

La landing no tiene franja superior y usa el logo con auto, cámara y recuadro. En el mapa, revisar CBA-101 para coordinación conversacional con Higiene urbana, CBA-102 para resolución confirmada por Alumbrado en la simulación y CBA-108 para derivación del sistema a EPEC. La auditoría muestra actor, hora, intervención y resultado; todo es simulado. CBA-104 conserva la secuencia de avistamiento y posible resolución. En Edge se verificaron los tres ejemplos, el filtro de resolución confirmada y la secuencia de CBA-104.
