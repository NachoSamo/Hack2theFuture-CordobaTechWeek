# Urbis · Prototipo React

Ejecutá `npm ci` y `npm run dev` desde esta carpeta. Para compilar, usá `npm run build`.

La vista general de COYS muestra tickets de mantenimiento urbano. La barra superior filtra los marcadores por tipo, estado y área. Pasá el cursor o enfocá un marcador para ver el tipo, la ubicación y el estado. Seleccioná un marcador para acercar automáticamente el mapa y abrir su tarjeta, con foto ilustrativa, detalle y auditoría del ticket. Cerrala con Escape o con el botón Cerrar.

La raíz muestra la landing de Urbis sin la franja superior, con los clips de detección en bucle a 1,5× y un control para pausarlos. «Cómo funciona» desplaza la página hasta la explicación. La sección «El sistema de Urbis» incluye el mapa interactivo y un acceso al mapa completo. Abrí `/#mapa` para entrar directo al mapa 3D con inclinación de 60°. Hay un único modo de visualización: cartografía oscura, marcadores y zonas de calor juntos. Seleccioná un cuadrante para acercarte a su zona; «Ver toda Córdoba» recupera el encuadre general. Zonas de calor combina la atención y la cobertura del mock. El calor colorea únicamente las zonas observadas. Verde indica que no hay tickets activos y los tonos ámbar y rojo indican mayor concentración. Las zonas sin observación muestran la cartografía negra.

Los tickets activos de contenedor rebalsado se derivan a la empresa recolectora simulada. El mapa y el detalle ya no ofrecen rutas sugeridas. La altura y las entrecalles salen del mock. Si falta esa referencia, se muestra el cruce disponible o las coordenadas.

Al abrir la página, el mock publica automáticamente un ticket, agrega un avistamiento, simula el aviso y luego registra una pasada de verificación. Recargar la página reinicia la secuencia. Si falla OpenFreeMap, los marcadores siguen disponibles sobre un fondo negro siempre que el navegador soporte WebGL.

Los archivos `src/mock.json`, `src/street-routes.json`, `src/scenario.ts` y `scripts/generar-rutas.py` conservan el prototipo anterior de recolección; la interfaz actual no los importa. Los tickets y la cobertura actuales están en `src/tickets-mock.json`.

[Reel de referencia](https://www.instagram.com/p/DYxYcy2tZeG/) · [Componentes de mapa de 21st](https://dev.21st.dev/community/components/s/map) · [Mapcn](https://docs.21st.dev/blog/mapcn-components)

La landing reproduce un clip ilustrativo de detección simulada. El acceso directo `/#mapa/deteccion` abre el ticket CBA-104 del contenedor mostrado en el video.

Cada detección genera un aviso automático simulado al responsable. El detalle es de lectura y reemplaza el historial por «Auditoría del ticket»: hora, actor, intervención y resultado. No hay acciones manuales de aviso ni barrida. Los ejemplos locales están en `auditExamples` del fixture: CBA-101 (agente conversacional coordina con Higiene urbana), CBA-102 (agente registra confirmación de Alumbrado y queda resuelta en la simulación) y CBA-108 (sistema deriva a EPEC, atención pendiente). El filtro «Resolución confirmada» permite ubicar CBA-102; esa incidencia no suma demanda activa en el calor. La ausencia de detección de CBA-104 sigue siendo «Posiblemente resuelta». No se contacta ningún servicio real.

**Aviso en vivo:** cuando la simulación publica el ticket, suma un avistamiento o registra la pasada de verificación, aparece un aviso arriba a la derecha del mapa. Al hacer clic, abre el ticket. Si el ticket ya está abierto, no se muestra.

**Impacto (`/#impacto`):** se entra con el botón Impacto del header del mapa o de la landing. Muestra contadores animados de CO₂ y litros con doble uso, el antes y después de la flota (1 → 2 usos), incidencias por tipo y por área, gravedad y fuentes de detección. Los conteos salen del mock. El CO₂ es una **estimación** con los supuestos del speech: 70 móviles de la Guardia Urbana × 20 L por día × 365 × 2,6 kg de CO₂ por litro = 1.329 t por año. Respeta `prefers-reduced-motion`.

**Fotos por tipo:** las imágenes que se suman a `src/assets/ticket-photos/<tipo>/` (`bache`, `cable-caido`, `contenedor-rebalsado`, `luminaria-apagada`, `rama-caida`, `residuos-acumulados`) se reparten de forma fija entre los tickets de ese tipo, según el número del id. CBA-104 conserva la foto del video. Hoy hay fotos extra para contenedor rebalsado (4), residuos acumulados (2) y rama caída (2).

El fixture incluye el payload de ticket de la [arquitectura](../harness/arquitectura/arquitectura-sistema.md) y datos locales para el detalle. Las zonas usan avistamientos por gravedad como ponderación. El mapa incluye 194 tickets simulados. La cobertura y las coordenadas agregadas son sintéticas. Las fotos son ilustrativas y se reutilizan por tipo de incidencia. Rama y cable caído se conservan como extensiones locales de la taxonomía inicial.

**Avance del 13/11:** logo con fachada urbana, auto con cámara y contenedor en perspectiva aplicado a cabecera, pestaña, documentación de marca y deck; franja superior retirada; detalle de lectura con auditoría. `npm run build`: PASS. Verificado en Edge: logo en la landing y el deck, auditoría de los tres ejemplos, filtro de resolución, replay, encuadre general y tarjeta móvil. Véase [ESTADO](../harness/ESTADO.md#en-proceso--juani).
