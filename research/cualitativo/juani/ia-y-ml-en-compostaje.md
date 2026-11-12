# IA y aprendizaje automático en el circuito de compostaje

## Visión por computadora en la recepción

**Hipótesis a validar con la cooperativa.** Los lotes mal separados llegan con suficiente frecuencia como para que una revisión asistida facilite la recepción y la devolución al generador.

1. El recuperador fotografía el lote al recibirlo.
2. Un modelo multimodal preentrenado señala impropios visibles, como bolsas, envases o cubiertos, y marca los casos dudosos para revisión.
3. El recuperador confirma o corrige la sugerencia y decide si acepta el lote.
4. El comercio recibe una devolución concreta. Ejemplo: «Se observó una bolsa plástica. En el próximo retiro, entregá los restos sin bolsa».

**Prueba de demo.** Usar fotos con etiquetas humanas de un lote limpio, uno con plástico visible y uno ambiguo. Registrar impropios detectados, falsas alertas y tiempo de revisión. Es una prueba del flujo. Para medir desempeño haría falta una muestra representativa. La foto cubre lo que queda a la vista y el recuperador decide sobre la aceptación.

## Otros puntos de aplicación

| Si se valida este problema | Aplicación | Datos necesarios |
|---|---|---|
| Los retiros son imprevisibles | Predecir kilos por comercio y ajustar la frecuencia de retiro. | Pesajes por comercio y día durante varias semanas. |
| El proceso de compostaje pierde estabilidad | Detectar desviaciones y alertar al operador. | Series de temperatura y humedad por lote, con registros de intervenciones. |

[Problema y mapa de actores](mapa-de-problemas.md) · [Investigación Belém–Bariloche](compostaje-cooperativo-belem-bariloche.md)
