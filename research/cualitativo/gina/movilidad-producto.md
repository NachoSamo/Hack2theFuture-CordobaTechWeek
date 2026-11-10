# Movilidad: ideas de producto

- **Fecha de elaboración:** 2026-11-10
- **Viene de:** [[movilidad-problema]]

## Resumen

**La idea más fuerte es "Barrio Conectado": un mapa de Córdoba que muestra, barrio por barrio, cuánto tarda la gente en llegar al centro, al hospital o a la universidad en colectivo, cruzado con el Censo 2022 y con una estimación de emisiones.** Incluye un pedido explícito de datos abiertos: lo que hoy no se puede medir aparece marcado como "falta dato".

## Ideas

| # | Idea | Para quién | Datos | Demo en pocos días |
|---|---|---|---|---|
| 1 | **Barrio Conectado:** mapa de acceso por barrio, con población, hogares sin auto y emisiones estimadas | concejales, PMUS, vecinos, periodistas | GTFS 2024, Censo 2022, OpenStreetMap | Sí |
| 2 | Simulador de recortes: qué pasa con el acceso si se saca una línea o se baja la frecuencia | Municipalidad, PMUS | GTFS 2024 | Sí |
| 3 | Reporte ciudadano de esperas: los vecinos cargan cuánto esperaron | vecinos | datos propios | Sí, pero necesita usuarios |
| 4 | Calculadora de emisiones de la flota y de la electrificación de trolebuses | Municipalidad, prensa | flota (La Voz), factores del IPCC | Parcial |
| 5 | Tablero de seguimiento del PMUS | equipo del PMUS, UE | documentos del plan | Parcial |

## Idea elegida: Barrio Conectado

**Qué hace**
1. Usa el GTFS de 2024 para calcular, desde cada radio censal, el tiempo de viaje en colectivo a destinos clave (centro, hospitales, universidades).
2. Cruza ese tiempo con población y hogares sin auto del Censo 2022.
3. Marca en rojo los barrios con mucha gente y mal acceso.
4. Estima cuántos viajes podrían pasar a auto o moto si baja la frecuencia, y las emisiones que eso sumaría (con factores generales y aclarando el supuesto).
5. Muestra un recuadro "datos que faltan" (pasajeros, tiempo real) como pedido a la Municipalidad.

**Por qué gana**
- Une acceso social y clima en un mismo mapa.
- Se puede hacer con datos que ya existen.
- Le sirve al PMUS, que tiene apoyo europeo.

**Demo mínima para el 12/11**
- Mapa de la ciudad con el semáforo de acceso.
- Dos o tres barrios destacados con ficha.
- Un ejemplo con el simulador: "si se saca esta línea, X personas tardan Y minutos más".

**Riesgos**
- El GTFS de 2024 puede estar viejo: decirlo en la demo.
- Las emisiones son una estimación gruesa.
- No usar el feed "AUCORSA" sin confirmar que es de Córdoba, Argentina (probablemente es de España).

## Oportunidades para el hackathon

- **UE:** el PMUS de Córdoba tuvo asistencia técnica europea (Euroclima+ y AFD), y la ciudad es socia de MobiliseYourCity. La ficha de 2026 menciona €50-100 millones para movilidad activa.
- **Agenda COP:** el compromiso de electrificar el 35 % de los colectivos para 2035 y el peso del transporte en las emisiones urbanas.
- **Jurado:** el tema es cotidiano en Córdoba y está en la agenda de 2026 por el conflicto de subsidios.
- **Financiamiento posible (inferencia mía, sin confirmar):** AFD, Euroclima+ y MobiliseYourCity.

## Límites de esta investigación

- No probé el cálculo de tiempos con el GTFS.
- No validé con vecinos ni con el equipo del PMUS.

## Dudas para el equipo

- ¿Usamos una herramienta ya hecha (por ejemplo, r5py u OpenTripPlanner) para calcular tiempos?
- ¿Qué destinos elegimos como "clave"?

## Fuentes

- [TUMI: datos GTFS](https://transport-data.org/)
- [MobiliseYourCity](https://www.mobiliseyourcity.net/)
- [Euroclima+](https://www.euroclima.org/)
- [INDEC: Censo 2022](https://censo.gob.ar/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [La Voz](https://www.lavoz.com.ar/)

#movilidad #gina #producto
