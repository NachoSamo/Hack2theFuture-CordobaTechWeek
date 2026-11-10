# Colectivos en Córdoba: triage de problemas (transporte urbano en Córdoba)

- **Eje:** movilidad
- **Fecha de elaboración:** 2026-11-10
- **Fuentes principales:** informe del equipo "COP30 y COP31 por vertical", Cadena 3 y La Voz (conflicto FETAP, trolebuses, SiBus), TUMI (datos GTFS), Mobility Database, MobiliseYourCity (ficha Córdoba 2026), Euroclima+ y AFD (Plan de Movilidad Urbana Sostenible).

## Resumen

**El problema más fuerte es que nadie sabe en público qué barrios de Córdoba quedaron peor conectados por colectivo, y cuántas emisiones de más genera eso.** El sistema está en crisis (conflicto de subsidios con FETAP en junio de 2026, aumento de boleto en julio, quejas por frecuencias), pero no hay datos abiertos de pasajeros desde 2025, ni un feed público de horarios en tiempo real, ni un inventario de emisiones del transporte para la ciudad. La ciudad tiene un Plan de Movilidad Urbana Sostenible apoyado por la UE, así que hay un interlocutor europeo concreto.

Sigue en [[colectivos-cordoba-problema]].

## Contexto mínimo

- **Crisis del sistema:** la Federación de Empresarios del Transporte (FETAP) y la Municipalidad discutieron subsidios en junio de 2026 (Cadena 3, 18/06/2026). El boleto subió en julio de 2026. Hay quejas por baja frecuencia en barrios.
- **Datos:** no encontré cifras públicas de pasajeros de 2025-2026. En noviembre de 2023 el sistema perdía unos $861 millones por mes.
- **Horarios abiertos:** TUMI publicó un GTFS (formato estándar de horarios y recorridos) de Córdoba en febrero de 2024. En Mobility Database hay un feed "AUCORSA", que probablemente sea de Córdoba, España, no de Argentina: **hay que revisarlo antes de usarlo**. La app "Tu Bondi" muestra datos en tiempo real, pero no hay un feed público de tiempo real (GTFS-RT).
- **Flota:** unos 30 trolebuses viejos y 20 colectivos a gas (GNC). El SiBus opera los corredores 3 y 8 con unos 170 colectivos (La Voz).
- **Plan con apoyo europeo:** el Plan de Movilidad Urbana Sostenible (PMUS) de Córdoba recibió unos €600.000 de asistencia técnica de la UE vía Euroclima+, ejecutada por la AFD (2021-2024), y fue adoptado. La ficha de MobiliseYourCity de 2026 menciona una cartera de €50-100 millones para movilidad activa.
- **Agenda COP:** el transporte es cerca del 24 % del CO₂ mundial. Hay un compromiso de electrificar el 35 % de los colectivos para 2035 ("35×35"). En Rosario el transporte es el 33-36 % de las emisiones de la ciudad; para Córdoba no encontré inventario.

## Tabla de triage

Puntaje de 1 a 5. Los puntajes son mi juicio a partir de las fuentes **(inferencia mía)**.

| Problema | Impacto social | Jurado | UE | Agenda COP | Falta un dato o herramienta | Demo en pocos días | Datos públicos | **Total** |
|---|---|---|---|---|---|---|---|---|
| **Barrios mal conectados sin medir, ni en acceso ni en emisiones** | 5 | 5 | 4 | 3 | 5 | 4 | 3 | **29** |
| Falta de datos abiertos del transporte (pasajeros, tiempo real) | 3 | 4 | 3 | 2 | 5 | 3 | 1 | 21 |
| Flota vieja y electrificación lenta (trolebuses) | 3 | 4 | 4 | 5 | 3 | 2 | 2 | 23 |
| Crisis de financiamiento del sistema (FETAP y subsidios) | 4 | 5 | 1 | 1 | 2 | 1 | 2 | 16 |
| Sin inventario de emisiones del transporte de la ciudad | 2 | 3 | 4 | 5 | 4 | 3 | 2 | 23 |
| Movilidad activa (bicis y veredas) sin seguimiento del PMUS | 3 | 3 | 5 | 3 | 4 | 3 | 2 | 23 |

### Justificación

**Barrios mal conectados (29)**
1. Impacto, 5: afecta a quien más depende del colectivo para trabajar o estudiar.
2. Jurado, 5: tema cotidiano en Córdoba y de la gestión municipal.
3. UE, 4: el PMUS tuvo apoyo europeo; medir el acceso es parte de su seguimiento **(inferencia mía)**.
4. COP, 3: menos colectivo significa más auto y moto, más emisiones.
5. Falta, 5: no encontré un mapa público de acceso por barrio.
6. Demo, 4: con el GTFS de 2024 y el Censo 2022 se puede armar.
7. Datos, 3: el GTFS es de 2024 y puede estar desactualizado.

**Datos abiertos (21):** el hueco es grande, pero sin datos la demo es débil. Se suma como pedido dentro de la idea elegida.

**Flota (23) e inventario (23):** muy de agenda COP, pero dependen de datos que no son públicos.

**Crisis de financiamiento (16):** es central para la ciudad, pero se resuelve con política y presupuesto.

**Movilidad activa (23):** buena conexión con la UE, poco dato.

## Problema elegido y por qué

**Problema elegido:** nadie mide en público qué barrios de Córdoba tienen peor acceso al colectivo, ni cuánto de esa falta se traduce en viajes en auto o moto y emisiones.

- Junta el tema social (acceso) y el climático (emisiones).
- Se puede mostrar con datos disponibles y, a la vez, hacer un pedido concreto de datos abiertos.
- Tiene un interlocutor: el PMUS y MobiliseYourCity.

Mismo patrón que en [[vertedero-bariloche-triage]] y [[incendios-bosque-nativo-triage]]: un problema real que nadie mide en público.

## Límites de esta investigación

- El GTFS de TUMI es de febrero de 2024; los recorridos pueden haber cambiado.
- No encontré datos de pasajeros posteriores a 2023.
- No pude confirmar los montos del PMUS más allá de la ficha de MobiliseYourCity.

## Dudas para el equipo

- ¿Alguien sabe si la Municipalidad publica algo de "Tu Bondi" en forma abierta?
- ¿Elegimos unos pocos barrios para la demo o la ciudad entera?

## Fuentes

- [Cadena 3: conflicto entre FETAP y la Municipalidad (18/06/2026)](https://www.cadena3.com/)
- [La Voz: trolebuses y SiBus](https://www.lavoz.com.ar/)
- [TUMI: datos GTFS](https://transport-data.org/)
- [Mobility Database](https://mobilitydatabase.org/)
- [MobiliseYourCity: ficha de Córdoba 2026](https://www.mobiliseyourcity.net/)
- [Euroclima+](https://www.euroclima.org/)
- [INDEC: Censo 2022](https://censo.gob.ar/)

#movilidad #gina
