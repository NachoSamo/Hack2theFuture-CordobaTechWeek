# Trama Urbana · Prototipo React

Ejecutá `npm ci` y `npm run dev` desde esta carpeta. Para compilar, usá `npm run build`.

La vista general de COYS muestra tickets de mantenimiento urbano. El listado y los marcadores comparten filtros de tipo, estado y área. Pasá el cursor o enfocá un marcador para ver el resumen. Seleccioná el marcador o la fila para abrir el detalle, con avistamientos, gravedad, área responsable, historial y próximo paso.

Alterná entre Atención, que tiñe cada zona observada según la cantidad de tickets activos, y Cobertura, que muestra una grilla de observaciones simuladas del 12/11/2026. El gris identifica celdas sin observación registrada. La cobertura se mantiene independiente de los filtros de tickets.

Para probar el flujo, usá los botones de simulación del panel. Un avistamiento se suma al ticket del contenedor, después se simula el aviso al área y una pasada posterior lo marca como posiblemente resuelto. Reiniciar vuelve al primer avistamiento. Los datos están en `src/tickets-mock.json` y son propios del prototipo. La cartografía usa MapLibre y OpenFreeMap. El listado sigue disponible si falla el mapa.

El mapa abre en perspectiva 3D. La capa Rutas muestra el recorrido fijo de recolección y el desvío estimado al seleccionar un ticket activo de Higiene urbana con ruta disponible. Las referencias de altura y entrecalles salen del mock. Si falta la referencia, se muestra el cruce disponible o las coordenadas.

Los datos de recolección están en `src/mock.json` y `src/street-routes.json`. Su script `scripts/generar-rutas.py` genera geometrías con OSRM.

[Reel de referencia](https://www.instagram.com/p/DYxYcy2tZeG/) · [Componentes de mapa de 21st](https://dev.21st.dev/community/components/s/map) · [Mapcn](https://docs.21st.dev/blog/mapcn-components)
