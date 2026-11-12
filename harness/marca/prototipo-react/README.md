# Trama Urbana · Prototipo React

Desde esta carpeta, ejecutá `npm ci` y `npm run dev`. Vite imprime la URL local. `npm run build` verifica TypeScript strict y compila la aplicación.

## Recorrido

1. Elegí una detección del feed o un marcador. El mapa enfoca el lugar.
2. Contrastá el nivel del modelo, corregilo o descartá la detección. Pasá al siguiente pendiente.
3. Activá **Simular turno** para ver eventos nuevos sin perder lo que estás editando.
4. Abrí **Rutas del día** para comparar y reproducir la ruta sugerida sobre el mapa.

`src/mock.json` contiene ciudad, centro, detecciones iniciales, eventos que llegan durante el turno y dos recorridos simulados. Coordenadas en orden longitud, latitud. `src/scenario.ts` adapta el fixture al tipo `Scenario`. Las revisiones son locales a la sesión. Los trazados son ilustrativos y sus distancias son valores de escenario. La animación revela una línea de ejemplo.

MapLibre carga la cartografía de OpenFreeMap por red. Si el estilo base no llega, la interfaz conserva el feed y muestra el estado de la cartografía. Si hay WebGL pero falta el estilo, los marcadores y rutas también pueden operar sobre el fondo de respaldo.

## Referencias

- [Reel](https://www.instagram.com/p/DYxYcy2tZeG/). La pista visual muestra dos frentes que avanzan sobre calles oscuras en distintas ciudades. Inspiró el contraste y la aparición progresiva de la ruta sugerida.
- [Catálogo de mapas de 21st](https://dev.21st.dev/community/components/s/map). Los resultados visibles incluyen mapas operativos (Interactive Map, Mapcn), mapas de ubicación y selectores (Map, Location Map, Nepal Address Picker, Nearby Walk Menu), mapas expandibles (Expand Map, Expanded Map), visualizaciones de cobertura o conectividad (World Map, Animated Map, Geo Traceroute), globos (COBE, Route Globe, Globe Flights, Country Flags Globe, 3D Globe, Wireframe Globe, Interactive Globe Explorer), patrones y componentes temáticos (Metro Map Image Gallery, FlightAirport, Departures Board, IslandPattern y otros).
- [Mapcn](https://docs.21st.dev/blog/mapcn-components). Los marcadores, etiquetas, popups, capas y controles son patrones útiles para el mapa operativo. El código pegado corresponde a **AdvancedMap**, con React Leaflet, agrupación de marcadores y popups. La interfaz toma la selección sincronizada de puntos y detalles. Usa [MapLibre](https://maplibre.org/maplibre-gl-js/docs/examples/display-buildings-in-3d/) para la cámara inclinada y los edificios.
