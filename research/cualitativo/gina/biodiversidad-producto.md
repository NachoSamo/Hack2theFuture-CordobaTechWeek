# Biodiversidad: ideas de producto

- **Fecha de elaboración:** 2026-11-10
- **Viene de:** [[biodiversidad-problema]]

## Resumen

**La idea más fuerte es "Después del Fuego": un mapa que cruza cada área quemada con la zonificación del bosque y muestra qué pasó con esa tierra en los años siguientes.** Usa solo datos públicos y gratuitos (NASA FIRMS, MODIS, MapBiomas, ordenamientos provinciales). Se puede mostrar con un caso del Chaco y uno de Córdoba en pocos días.

## Ideas

| # | Idea | Para quién | Datos | Demo en pocos días |
|---|---|---|---|---|
| 1 | **Después del Fuego:** semáforo por área quemada (se recupera / sin cambio / se convirtió en campo), según la zona del ordenamiento | fiscales, ONG, periodistas | FIRMS, MODIS área quemada, MapBiomas, mapas del ordenamiento | Sí |
| 2 | Alerta de quema en zona protegida: aviso por correo o Telegram cuando hay foco de calor en zona roja o amarilla | brigadas, comunidades, guardaparques | FIRMS (casi en tiempo real) y ordenamiento | Sí |
| 3 | Ficha de lote para la EUDR: dado un polígono, informa fuego y cambio de uso desde 2020 | productores chicos, cooperativas | MapBiomas, FIRMS | Sí (se cruza con [[agro-producto]]) |
| 4 | Tablero de la Ley de Bosques: presupuesto asignado frente a ejecutado, por provincia y año | periodistas, legisladores | presupuesto abierto, informes de FARN | Parcial |
| 5 | Mapa de recuperación del bosque serrano en Córdoba (2020 y 2024) | Idecor, municipios, brigadistas | MODIS, Sentinel-2 (índice de vegetación) | Parcial |

## Idea elegida: Después del Fuego

**Qué hace**
1. Toma las áreas quemadas de MODIS (o los focos de FIRMS agrupados) desde 2020.
2. Las cruza con el ordenamiento de cada provincia (roja, amarilla, verde).
3. Mira el uso del suelo de MapBiomas en los años siguientes.
4. Pinta cada área: verde si vuelve a ser bosque, amarillo si sigue sin cambio, rojo si pasó a cultivo o pastura en zona protegida.
5. Genera una ficha descargable por área, con fechas y coordenadas, para que la use un fiscal o un periodista.

**Por qué gana**
- Cubre un hueco que no encontré resuelto en ninguna herramienta pública (ver [[biodiversidad-triage]]).
- Sirve a la vez para biodiversidad y para la EUDR.
- Mismo patrón que la idea elegida en [[residuos-producto]]: satélite + regla + semáforo público.

**Demo mínima para el 12/11**
- Un recorte del Chaco (por ejemplo, un departamento con fallo judicial reciente) y uno de Córdoba (incendios de 2024).
- Mapa web con capas y una ficha de ejemplo.
- Aclarar en la demo que el dato de MapBiomas llega hasta 2024, así que los incendios de 2024 todavía no tienen "después" **(límite)**.

**Riesgos**
- MapBiomas es anual y tiene error. Hay que mostrar el semáforo como "señal para revisar", no como prueba.
- Los ordenamientos provinciales están en formatos distintos y algunos no son fáciles de bajar.
- Acusar sin pruebas a un productor puede traer problemas: la ficha muestra datos, no culpables.

## Oportunidades para el hackathon

- **Agenda COP:** Belém dejó afuera el bosque seco y los incendios. La herramienta pone ese tema en la mesa con datos.
- **UE:** la EUDR se aplica desde el 30/12/2026 a grandes operadores y desde el 30/06/2027 a micro y pequeños. Argentina quedó en "riesgo estándar", lo que exige más prueba que "riesgo bajo".
- **Financiamiento posible (inferencia mía, sin confirmar):** Euroclima+ y AL-INVEST Verde trabajan con la UE en Argentina; el TFFF no aplica al bosque seco.
- **Aliados posibles:** MapBiomas Argentina, FARN, Greenpeace, Idecor, brigadistas de las sierras.

## Límites de esta investigación

- No probé todavía la calidad del cruce de datos. La idea depende de que los mapas de ordenamiento se puedan descargar.
- No validé la idea con ningún usuario.

## Dudas para el equipo

- ¿Alguien del equipo maneja Google Earth Engine? Haría la demo mucho más rápida.
- ¿Elegimos el Chaco o Santiago del Estero para el recorte del norte?

## Fuentes

- [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/)
- [MapBiomas Argentina](https://argentina.mapbiomas.org/)
- [Sistema de Alerta Temprana de Deforestación](https://www.argentina.gob.ar/ambiente/bosques/sistema-de-alerta-temprana-de-deforestacion)
- [Comisión Europea: aplicación de la EUDR](https://trade.ec.europa.eu/access-to-markets/en/news/delay-until-december-2026-and-other-developments-implementation-eudr-regulation)
- [Climate Home: hoja de ruta de deforestación](https://climatechangenews.com/2026/11/03/faster-action-existing-tools-halt-forest-loss-by-2030-cop30-roadmap)
- [Eco-Business: el TFFF cumple un año](https://www.eco-business.com/news/the-tropical-forest-forever-facility-turns-one-and-is-billions-short/)

#biodiversidad #gina #producto
