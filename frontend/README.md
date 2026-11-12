# Trama Urbana · Prototipo React

Ejecutá `npm ci` y `npm run dev` desde esta carpeta. Para compilar, usá `npm run build`.

La vista general de COYS muestra tickets de mantenimiento urbano. El listado y los marcadores comparten filtros de tipo, estado y área. Pasá el cursor o enfocá un marcador para ver el resumen. Seleccioná el marcador o la fila para abrir el detalle, con avistamientos, gravedad, área responsable, historial y próximo paso.

El inicio abre el mapa 3D en Incidencias. Zonas de calor combina la atención y la cobertura del mock. Rojo indica tickets activos, verde indica una zona observada sin tickets activos y gris indica que no hay observación registrada.

Los tickets activos de contenedor rebalsado se derivan a la empresa recolectora simulada. Su detalle permite ver el recorrido fijo y el desvío estimado cuando hay una ruta disponible. La altura y las entrecalles salen del mock. Si falta esa referencia, se muestra el cruce disponible o las coordenadas.

Al abrir la página, el mock publica automáticamente un ticket, agrega un avistamiento, simula el aviso y luego registra una pasada de verificación. Recargar la página reinicia la secuencia. El listado sigue disponible si falla la cartografía de OpenFreeMap.

Los datos de recolección están en `src/mock.json` y `src/street-routes.json`. Su script `scripts/generar-rutas.py` genera geometrías con OSRM.

[Reel de referencia](https://www.instagram.com/p/DYxYcy2tZeG/) · [Componentes de mapa de 21st](https://dev.21st.dev/community/components/s/map) · [Mapcn](https://docs.21st.dev/blog/mapcn-components)
