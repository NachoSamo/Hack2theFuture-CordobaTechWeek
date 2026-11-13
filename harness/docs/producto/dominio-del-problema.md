---
tipo: producto
fecha: 2026-11-12
dueña: Oli
estado: borrador, definido por Oli 12/11 14:53
track: movilidad (equilibrio de emisiones), cruza residuos y mantenimiento urbano
---

# Dominio del problema: el móvil que autosana la ciudad

> **Vigente al 12/11 22:45 (Samo):** el producto se llama **Urbis** («Detección urbana desde el patrullaje») y el título de la solución es "Mismo recorrido, más sustentabilidad." ([decision log](../../decision-log.md) 22:01); "Un móvil para autosanar la ciudad" queda como histórico. El costo marginal es **mínimo**, no cero (22:55): a futuro suma un módulo de cómputo por móvil. Fuentes: COYS, Cordobeses en Alerta, Guardia Urbana y móviles policiales (22:45). En el MVP la captura y la detección son simuladas; la arquitectura técnica está en iteración en la rama `architecture/init`. Resumen vigente en el [README](../../../README.md).

> **Actualización 12/11 15:08 (Samo, por recomendación de varios mentores):** las fuentes son todo vehículo con cámara (móviles de monitoreo del municipio, Cordobeses en Alerta y móviles policiales); tras detectar, **aviso directo a cada área**, sin que COYS asigne (COYS queda con vista general); el ciclo se cierra cuando una pasada posterior ya no ve la incidencia. Donde este doc diga "COYS asigna", manda el [decision log](../../decision-log.md) del 12/11 15:08 y la [arquitectura](../../arquitectura/solucion.html). Falta reescribir esas partes (dueña: Oli).

> **Pivot del 12/11 14:53.** Pasamos de "rutas de recolección guiadas por cámaras" a un concepto más
> grande: no vamos solo a residuos. Los residuos ya tienen sus rutas y su recolección; no las tocamos.
> [`idea-y-epicas.md`](idea-y-epicas.md) y [`solucion-paso-a-paso.md`](solucion-paso-a-paso.md)
> ya están reescritos sobre este dominio. La arquitectura y los contratos todavía no.

## La idea en una línea

**Un móvil para autosanar la ciudad:** el patrullaje urbano que ya recorre Córdoba y ya consume
combustible solo para seguridad se aprovecha para detectar, con visión por computadora, todo lo que
en la ciudad requiere atención y avisarle al área que lo resuelve.

## El problema

- **Movilidad y emisiones:** los móviles de patrulla urbana recorren la ciudad todos los días. Ese
  consumo de combustible y esas emisiones hoy rinden un solo servicio: seguridad.
- **Ciudad sin ojos para el mantenimiento:** lo que se rompe o se acumula (un microbasural, un poste
  caído, un contenedor roto) se entera tarde, por reclamo del vecino, y otras áreas salen a recorrer
  por su cuenta para encontrarlo.
- **Equilibrio de emisiones:** justificamos el consumo que ya existe dándole más usos. Mismo km,
  más servicio a la ciudad.

## Actores

| Actor | Rol | Estado |
|---|---|---|
| **Municipios que monitorean constantemente** | Sus móviles de monitoreo circulan y gastan combustible todo el día, y esos recorridos solo se usan para seguridad | Usuario principal desde el 12/11 17:10 (antes: COYS, el área de control de Córdoba) |
| Áreas que resuelven (residuos, alumbrado, vía pública) | Reciben el aviso y atienden | Supuesto |
| Recolectora de residuos | Mantiene sus rutas; recibe solo lo que la ruta fija no cubre | Supuesto |
| Vecinos | Viven el problema; hoy son el único sensor (reclamo) | Supuesto |

## Qué detectamos (alcance)

Elegido por Oli entre las opciones ofrecidas:

1. **Microbasurales y residuos voluminosos** (escombros, ramas, colchones): lo que la ruta fija no levanta.
2. **Problemas de vía pública:** postes caídos, baches, semáforos, señales, alumbrado.
3. **Contenedores llenos o rotos.**

Quedó afuera: tránsito y estacionamiento (congestión, doble fila).
La meta es "detectar todo lo posible que requiera atención"; las tres categorías son el alcance inicial.

## Qué queda fuera del dominio

- Rediseñar las rutas de recolección de residuos (ya existen y funcionan).
- Instalar hardware o sensores nuevos: se usa el recorrido y la cámara que ya están.

## Cerrado después del pivot

- **Qué pasa tras detectar:** aviso directo al área responsable; el municipio tiene una vista general (decision log 12/11 15:08; reemplaza "mapa priorizado para COYS, que asigna").
- **Usuarios del panel:** el municipio (vista general, área de monitoreo) y las áreas que resuelven.
- **Fuentes:** móviles de monitoreo del municipio, Cordobeses en Alerta y móviles policiales (decision log 12/11 15:08).
- **Cifra principal del pitch:** km de patrullaje reutilizados como detección (con litros y CO₂ equivalentes).
- **Título:** "Un móvil para autosanar la ciudad."

## Abierto

- **Cómo contamos el doble impacto** (seguridad + mantenimiento urbano con el mismo km, ambiental +
  económico, o movilidad + residuos): queda para cerrar con el equipo.
- **Fuente de "los residuos ya tienen sus rutas":** sin registrar.

## Supuestos a validar

| Afirmación | ¿Dato o supuesto? | Cómo lo validamos |
|---|---|---|
| Los municipios tienen móviles con cámara que recorren la ciudad | Dato para Córdoba: móviles municipales con cámaras en el Parque Sarmiento (La Voz) | Mentores y staff |
| Ese recorrido hoy se usa solo para seguridad | Supuesto | Mentores y staff |
| Visión por computadora detecta las tres categorías desde un vehículo en movimiento | Supuesto | Spike de detección con imágenes públicas |
| Las áreas que resuelven hoy se enteran por reclamo o recorriendo | Supuesto | Entrevista con el municipio |
