# Trama Urbana · Prototipo React

Ejecutá `npm ci` y `npm run dev` desde esta carpeta. Para compilar, usá `npm run build`.

La vista de administrador arranca con la ruta fija y el punto de partida del vehículo. Pasá el cursor por un marcador o enfocalo con el teclado para ver el tipo. Al elegir un marcador o un evento del feed, se abre su detalle y se traza una ruta sugerida. Cerrar el detalle vuelve a mostrar la ruta fija.

El mock está en `src/mock.json`. Cada evento tiene tipo, ubicación y hora. Las coordenadas usan el orden longitud, latitud. El cálculo de ejemplo conserva la salida y el orden de las paradas y agrega el evento donde menos distancia extra requiere. Usa distancia geodésica entre puntos. La sugerencia se calcula sobre el mock y queda pendiente integrar el ruteo vial y los datos del equipo.

El mapa usa MapLibre y cartografía de OpenFreeMap. El feed sigue disponible si la cartografía falla.

[Reel de referencia](https://www.instagram.com/p/DYxYcy2tZeG/) · [Componentes de mapa de 21st](https://dev.21st.dev/community/components/s/map) · [Mapcn](https://docs.21st.dev/blog/mapcn-components)
