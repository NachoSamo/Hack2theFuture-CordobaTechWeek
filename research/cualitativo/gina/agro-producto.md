# Agro: ideas de producto

- **Fecha de elaboración:** 2026-11-10
- **Viene de:** [[agro-problema]]

## Resumen

**La idea más fuerte es "Lote Listo": el productor dibuja o sube su lote y recibe gratis un informe previo de riesgo EUDR (bosque, fuego y zonificación desde 2020), antes de entrar a VISEC.** No reemplaza a VISEC ni certifica nada: avisa qué lotes están limpios y cuáles hay que revisar. Comparte el motor de datos con [[biodiversidad-producto]].

## Ideas

| # | Idea | Para quién | Datos | Demo en pocos días |
|---|---|---|---|---|
| 1 | **Lote Listo:** informe previo de riesgo EUDR por lote | productores chicos, cooperativas, agrónomos | MapBiomas, FIRMS, ordenamiento de bosques, catastro de Idecor | Sí |
| 2 | Revisión masiva para cooperativas: sube un archivo con todos los lotes y devuelve un tablero | cooperativas, acopiadores | los mismos | Sí |
| 3 | Mapa de erosión y prácticas: dónde hay suelo degradado y dónde hay productores BPA | Ministerio de Bioagroindustria, INTA | mapas de suelo, BPA (si se consiguen) | Parcial |
| 4 | Alerta de sequía por zona, usando datos del Servicio Meteorológico y satélite | productores, municipios | SMN, índices de vegetación | Parcial |
| 5 | Calculadora de emisiones de un campo ganadero | productores, compradores | factores del IPCC | Sí, pero con poco dato local |

## Idea elegida: Lote Listo

**Qué hace**
1. El productor dibuja el lote en un mapa o carga un archivo (KML o el que use su agrónomo).
2. El sistema revisa si hubo pérdida de bosque o fuego dentro del lote desde el 31/12/2020, y en qué zona del ordenamiento cae.
3. Devuelve un semáforo: verde (sin señales), amarillo (revisar), rojo (señal fuerte de cambio de uso).
4. Genera un PDF simple para mostrar al acopiador o cargar como respaldo.

**Por qué gana**
- Tiene fecha urgente: 30/12/2026.
- La mayoría de los lotes probablemente salga verde, y eso ya le da valor al productor **(inferencia mía)**.
- Usa el mismo cruce de datos que Después del Fuego, así que el equipo construye un motor para dos verticales.

**Demo mínima para el 12/11**
- Tres lotes de ejemplo en Córdoba: uno en zona agrícola consolidada (verde), uno cerca de bosque serrano (amarillo) y uno con cambio de uso visible (rojo).
- Informe en pantalla y PDF.

**Riesgos**
- No es una certificación oficial: hay que decirlo en la interfaz.
- MapBiomas puede marcar falsos positivos (por ejemplo, pastizales que confunde con bosque).
- Los datos de lotes son sensibles: no guardar polígonos sin permiso.

## Oportunidades para el hackathon

- **UE:** la EUDR es europea, y Córdoba quiere seguir vendiendo a Europa. Encaja con la línea de la UE de "cadenas libres de deforestación".
- **Financiamiento posible (inferencia mía, sin confirmar):** AL-INVEST Verde (termina el 31/12/2026), Euroclima+, y el préstamo del BEI para agua en Córdoba como señal de interés europeo en la provincia.
- **Canal de llegada:** el programa BPA de Córdoba (más de 3.000 productores).
- **COP31:** la discusión de agricultura cierra en noviembre de 2026. La herramienta muestra trabajo concreto en la intersección entre agricultura y bosques.

## Límites de esta investigación

- No hablé con productores ni cooperativas.
- No sé si VISEC ya tiene una función de revisión previa que no esté documentada en público.

## Dudas para el equipo

- ¿Hacemos un solo producto para biodiversidad y agro, con dos vistas (fiscal y productor)?
- ¿Alguien puede averiguar con VISEC si existe una API o algo parecido?

## Fuentes

- [Comisión Europea: aplicación de la EUDR](https://trade.ec.europa.eu/access-to-markets/en/news/delay-until-december-2026-and-other-developments-implementation-eudr-regulation)
- [BEI: Córdoba Global Gateway Water Resilience](https://www.eib.org/en/projects/all/20250706)
- [MapBiomas Argentina](https://argentina.mapbiomas.org/)
- [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/)
- [Idecor](https://www.mapascordoba.gob.ar/)
- [AL-INVEST Verde](https://capacity4dev.europa.eu/projects/al-invest-verde)

#agro #gina #producto
