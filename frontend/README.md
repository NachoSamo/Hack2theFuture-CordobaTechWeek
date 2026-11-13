# Urbis · Prototipo React

Ejecutá `npm ci` y `npm run dev` desde esta carpeta. Para compilar, usá `npm run build`.

La vista general de COYS muestra tickets de mantenimiento urbano. La barra superior filtra los marcadores por tipo, estado y área. Pasá el cursor o enfocá un marcador para ver el tipo, la ubicación y el estado. Seleccioná un marcador para abrir su tarjeta sobre el mapa, con foto ilustrativa, detalle, historial y acciones. Cerrala con Escape o con el botón Cerrar.

La raíz muestra la landing de Urbis con el clips de detección en bucle y un control para pausarlos. La sección «El sistema de Urbis» incluye el mapa interactivo y un acceso al mapa completo. Abrí `/#mapa` para entrar directo al mapa 3D en Incidencias. Zonas de calor combina la atención y la cobertura del mock. Rojo indica tickets activos, verde indica una zona observada sin tickets activos y gris indica que no hay observación registrada, incluso fuera de la grilla.

Los tickets activos de contenedor rebalsado se derivan a la empresa recolectora simulada. Su detalle permite ver el recorrido fijo y el desvío estimado cuando hay una ruta disponible. La altura y las entrecalles salen del mock. Si falta esa referencia, se muestra el cruce disponible o las coordenadas.

Al abrir la página, el mock publica automáticamente un ticket, agrega un avistamiento, simula el aviso y luego registra una pasada de verificación. Recargar la página reinicia la secuencia. Si falla OpenFreeMap, los marcadores siguen disponibles sobre un fondo neutro siempre que el navegador soporte WebGL.

Los datos de recolección están en `src/mock.json` y `src/street-routes.json`. Su script `scripts/generar-rutas.py` genera geometrías con OSRM.

[Reel de referencia](https://www.instagram.com/p/DYxYcy2tZeG/) · [Componentes de mapa de 21st](https://dev.21st.dev/community/components/s/map) · [Mapcn](https://docs.21st.dev/blog/mapcn-components)

La landing reproduce un clip ilustrativo de detección simulada. El acceso directo `/#mapa/deteccion` abre el ticket CBA-104 del contenedor mostrado en el video.

Cada detección genera un aviso automático simulado al responsable. El detalle permite registrar avisos manuales, sugerir rutas para contenedores rebalsados y diagramar una barrida para residuos acumulados o ramas caídas. El historial distingue acciones automáticas y manuales. Las acciones se guardan en memoria durante la sesión.

**Aviso en vivo:** cuando la simulación publica el ticket, suma un avistamiento o registra la pasada de verificación, aparece un aviso arriba a la derecha del mapa. Al hacer clic, abre el ticket. Si el ticket ya está abierto, no se muestra.

**Impacto (`/#impacto`):** se entra con el botón Impacto del header del mapa o de la landing. Muestra contadores animados de CO₂ y litros con doble uso, el antes y después de la flota (1 → 2 usos), incidencias por tipo y por área, gravedad y fuentes de detección. Los conteos salen del mock. El CO₂ es una **estimación** con los supuestos del speech: 70 móviles de la Guardia Urbana × 20 L por día × 365 × 2,6 kg de CO₂ por litro = 1.329 t por año. Respeta `prefers-reduced-motion`.

**Fotos por tipo:** las imágenes que se suman a `src/assets/ticket-photos/<tipo>/` (`bache`, `cable-caido`, `contenedor-rebalsado`, `luminaria-apagada`, `rama-caida`, `residuos-acumulados`) se reparten de forma fija entre los tickets de ese tipo, según el número del id. CBA-104 conserva la foto del video. Hoy hay fotos extra para contenedor rebalsado (4), residuos acumulados (2) y rama caída (2).

El fixture incluye el payload de ticket de la [arquitectura](../harness/arquitectura/arquitectura-sistema.md) y datos locales para el detalle. Las zonas usan avistamientos por gravedad como ponderación. El mapa incluye 194 tickets simulados. La cobertura y las coordenadas agregadas son sintéticas. Las fotos son ilustrativas y se reutilizan por tipo de incidencia. Rama y cable caído se conservan como extensiones locales de la taxonomía inicial.
