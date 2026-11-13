# Urbis · Prototipo React

Ejecutá `npm ci` y `npm run dev` desde esta carpeta. Para compilar, usá `npm run build`.

La vista general de COYS muestra tickets de mantenimiento urbano. La barra superior filtra los marcadores por tipo, estado y área. Pasá el cursor o enfocá un marcador para ver la foto, la dirección y el estado. Seleccioná un marcador para abrir el panel con una foto ilustrativa generada con IA y el detalle, con avistamientos, gravedad, área responsable, historial y próximo paso.

La raíz muestra la landing de Urbis con el video de fondo en bucle, control para pausarlo y accesos al mapa y al ticket de la demo. Abrí `/#mapa` para entrar directo al mapa 3D en Incidencias. Zonas de calor combina la atención y la cobertura del mock. Rojo indica tickets activos, verde indica una zona observada sin tickets activos y gris indica que no hay observación registrada, incluso fuera de la grilla.

Los tickets activos de contenedor rebalsado se derivan a la empresa recolectora simulada. Su detalle permite ver el recorrido fijo y el desvío estimado cuando hay una ruta disponible. La altura y las entrecalles salen del mock. Si falta esa referencia, se muestra el cruce disponible o las coordenadas.

Al abrir la página, el mock publica automáticamente un ticket, agrega un avistamiento, simula el aviso y luego registra una pasada de verificación. Recargar la página reinicia la secuencia. Si falla OpenFreeMap, los marcadores siguen disponibles sobre un fondo neutro siempre que el navegador soporte WebGL.

Los datos de recolección están en `src/mock.json` y `src/street-routes.json`. Su script `scripts/generar-rutas.py` genera geometrías con OSRM.

[Reel de referencia](https://www.instagram.com/p/DYxYcy2tZeG/) · [Componentes de mapa de 21st](https://dev.21st.dev/community/components/s/map) · [Mapcn](https://docs.21st.dev/blog/mapcn-components)

La landing reproduce un clip ilustrativo de detección simulada. El acceso directo `/#mapa/deteccion` abre el ticket CBA-104 del contenedor mostrado en el video.

Cada detección genera un aviso automático simulado al responsable. El detalle permite registrar avisos manuales, sugerir rutas para contenedores rebalsados y diagramar una barrida para residuos acumulados o ramas caídas. El historial distingue acciones automáticas y manuales. Las acciones se guardan en memoria durante la sesión.

El video de la landing intercala fragmentos de detección con grabaciones del mapa, del ticket correspondiente y de una acción simulada por caso.

El fixture incluye el payload de ticket de la [arquitectura](../harness/arquitectura/arquitectura-sistema.md) y datos locales para el detalle. Las zonas usan avistamientos por gravedad como ponderación. La cobertura y las coordenadas agregadas son sintéticas. Rama y cable caído se conservan como extensiones locales de la taxonomía inicial.
