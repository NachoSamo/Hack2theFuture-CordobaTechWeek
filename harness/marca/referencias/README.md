# Referencias de UX, UI y marca

## Producto y demo

El producto cruza movilidad y residuos en Córdoba. Los móviles de monitoreo aportan detecciones de acumulación. Los eventos se agregan en un mapa de demanda y se usan para sugerir rutas según criticidad y capacidad de los camiones. El municipio mira puntos críticos y cobertura. La recolectora mira rutas y carga esperada. [Idea y épicas](../../docs/producto/idea-y-epicas.md)

Las épicas describen la secuencia **recorrido simulado → detección → mapa de demanda → comparación de ruta fija y sugerida → impacto simulado**. E5 plantea una pantalla con selector Municipio / Recolectora. Quedan por definir la vista inicial, el dispositivo principal y los tres datos que se ven sin hacer clic. El [demo path](../../demo-path.md) todavía tiene las tablas de pantallas sin completar. [Diagramas](../../arquitectura/README.md)

## Material guardado

| Referencia | Aporte posible |
|---|---|
| [Artifact de Claude](https://claude.ai/artifact/2pQxKeKVM48nLWzycLPUEu) | Contexto adicional de problema y solución. Pendiente de abrir. |
| [Publicación de Instagram](https://www.instagram.com/p/DYxYcy2tZeG/) | Referencia visual compartida por Juani. Pendiente de abrir. |
| [Mapas en 21st.dev](https://21st.dev/?q=map) | Catálogo para explorar mapas, marcadores y rutas. |
| [Video de WhatsApp](video-whatsapp.mp4) | Material compartido para revisar junto con los bocetos. |
| [Infografía de recolección de Bogotá](recoleccion-bogota.png) | Referencia para contar la cadena de recolección y mostrar zonas con una leyenda. Sus cifras corresponden a Bogotá. |
| [Globo con rutas](globo-rutas.png) | Referencia para marcadores, arcos y jerarquía de etiquetas. |
| [Snippet de React y COBE](componente-cobe-referencia.txt) | Referencia técnica del globo. Guardada para evaluar durante el prototipado. |

## Aplicación al prototipo

- [Solución paso a paso](../../docs/producto/solucion-paso-a-paso.md). El feed simula clasificaciones que llegan durante el turno. El comparador conserva las dos rutas del día. La decisión de recalcular en tiempo real queda fuera del alcance de la demo.
- [Mapcn en 21st](https://docs.21st.dev/blog/mapcn-components). Su separación de mapa, capas, marcadores, etiquetas y controles sirve para diseñar la vista operativa. El prototipo replica esa separación visual y acompaña el mapa con una lista navegable.
- [COBE](https://cobe.vercel.app/) · [captura adicional](globo-rutas-detalle.png) · [variante del snippet](componente-cobe-variante.txt). Los arcos y las etiquetas compactas sirven como referencia de jerarquía y para una posible apertura de la demo. Los tres adjuntos de código corresponden a COBE y dos son idénticos entre sí.
- [Prototipo navegable](../prototipo-recoleccion.html). Abrir el HTML en un navegador. Municipio muestra demanda y cobertura. Recolectora abre la comparación de rutas. Córdoba y Rosario son escenarios simulados para probar el cambio de contexto. La cartografía es esquemática. El símbolo en movimiento explora líneas de calle y un punto de fuga como dirección provisional de marca.
- Al recibir el contrato, contrastar los campos de detección (ubicación, hora, nivel, confianza y repetición), cobertura, ruta, capacidad y métricas antes de conectar el prototipo a datos reales.
- [Video de WhatsApp](video-whatsapp.mp4), revisión visual de cuatro fotogramas. La ciudad ocupa casi todo el encuadre, con manzanas coloreadas y paneles de estado superpuestos. Para el prototipo tomamos el protagonismo del mapa y la relación entre color y estado. El comparador conserva dos mapas con el mismo encuadre para que sea fácil seguir qué cambia entre rutas.

- [Iteración inspirada en el video](../prototipo-recoleccion-video.html). Ciudad esquemática en perspectiva, feed superpuesto y clasificación por evento. La corrección del operador queda en memoria durante la sesión de prueba.
