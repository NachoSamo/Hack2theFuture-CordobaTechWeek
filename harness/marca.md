# Trama Urbana

**Documento de marca · Juani · Propuesta para revisión**

## Nombre

**Trama Urbana**. La trama es la red de calles que conecta los puntos detectados con las rutas de recolección. El nombre puede acompañar el producto en distintas ciudades.

**Descriptor:** Panel de demanda y rutas de recolección urbana.

## Logo

![Símbolo de Trama Urbana](marca/logo.svg)

El símbolo parte de una esquina dibujada desde la calle. Dos fachadas se abren hacia puntos de fuga laterales y los edificios del fondo pierden altura y detalle. Una ruta lima entra desde el borde, rodea la esquina y vuelve a perderse en la ciudad. Los volúmenes simplificados y los trazos cortos le dan el carácter de una caricatura urbana. El símbolo funciona como icono estático y la ruta permite explorar una animación en el futuro.

## MLP

La experiencia mínima que vale la pena mostrar permite **ver dónde se acumula basura, revisar la detección y entender qué cambia en la ruta sugerida**.

1. **Ver la demanda.** Una ciudad en perspectiva muestra puntos críticos y zonas sin dato. El feed incorpora detecciones con hora, nivel y confianza.
2. **Revisar una detección.** La persona operadora selecciona un evento y confirma, corrige o descarta la clasificación.
3. **Entender la ruta.** La vista Recolectora compara la ruta fija y la sugerida del día, con kilómetros, carga esperada e impacto estimado. La vista Municipio prioriza los puntos críticos.

El prototipo usa datos simulados y la revisión manual es una interacción a validar con el equipo. El flujo de producto parte de los móviles de monitoreo y termina en el panel de operación. [Solución paso a paso](docs/producto/solucion-paso-a-paso.md)

## Misión

Ayudar a municipios y recolectoras a atender los puntos donde se acumula basura y usar mejor los recorridos y la flota que ya tienen.

## Visión

Que distintas ciudades puedan planificar la recolección según la demanda observada, mejorar la cobertura y medir el uso de combustible por tonelada recolectada.

## Slogan

**Recolectá donde hace falta.**

## Paleta

| Color | HEX | Uso |
|---|---|---|
| Asfalto | `#11191C` | Fondo general y base del símbolo |
| Pizarra | `#19252B` | Paneles superpuestos |
| Niebla | `#EAF0F0` | Texto principal |
| Lima | `#DFF691` | Acción principal, selección y símbolo |
| Terracota | `#BD472D` | Punto crítico |
| Ámbar | `#D79939` | Demanda alta |
| Oliva | `#B2A638` | Demanda media |
| Verde | `#428571` | Demanda baja |
| Gris cartográfico | `#A5B3A9` | Zona sin dato |

El mapa acompaña el color con etiquetas y una leyenda. El feed muestra por escrito el nivel y el estado de revisión.

## Tipografía y tono

Barlow para títulos e interfaz. IBM Plex Mono para horas y datos compactos. El tono es directo y operativo. Usamos «Punto crítico», «Sin dato» y «Ruta sugerida». Las cifras de impacto muestran si son simuladas o estimadas y exponen sus supuestos.

[Referencias de diseño](marca/referencias/README.md) · [Prototipo](marca/prototipo-recoleccion-video.html)

[Prototipo React y referencias de mapa](marca/prototipo-react/README.md).
