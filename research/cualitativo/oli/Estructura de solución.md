---
tipo: entregable
subtipo: plantilla-idea
fecha: 2026-11-12
dueña: Olivia
estado: completada 12/11 (idea tras el pivot y la ronda de mentores de las 15:08)
tags: [hackathon, entregables, idea, pitch]
---

# Estructura de nuestra solución

> Plantilla para completar en el evento. La **Parte A** es el documento oficial: sigue la guía "¿Cómo redactar tu idea?" y tiene que entrar en **una página**. La **Parte B** es el anexo interno para el pitch y las preguntas del jurado, armado con las notas de Diego (guía y reunión del 07/11) y la entrevista con Maria## Parte A · Documento de la idea (1 página)

> Completada el 12/11 con la idea después del pivot (14:53) y de la ronda de mentores (15:08). Es la
> misma versión que se cargó en el formulario oficial "07 Ficha de solución" (mesa 24). Fuente interna:
> [`idea-y-epicas.md`](../../../harness/docs/producto/idea-y-epicas.md) y el
> [decision log](../../../harness/decision-log.md).

### La frase

> Ayudamos a **las áreas municipales que mantienen Córdoba (residuos, alumbrado, vía pública)** a
> **enterarse a tiempo de lo que hay que arreglar** mediante **las cámaras de los vehículos que ya
> circulan (móviles de COYS, Cordobeses en Alerta y policía)**, para que **cada kilómetro que hoy se
> gasta solo en seguridad también mantenga la ciudad**.

### 1. Título · 1 línea
Un móvil para autosanar la ciudad.

### 2. Problema · 3–5 líneas
Los vehículos con cámara que patrullan Córdoba gastan combustible solo para seguridad. Mientras tanto,
microbasurales, postes caídos, baches o contenedores rotos se conocen tarde: por reclamo de un vecino o
porque un área sale a buscarlos. **Causa raíz:** la ciudad no tiene un dato continuo de lo que se rompe;
se entera por reclamo.

- Dato o caso: basura acumulada en el Mercado Norte después del Carnaval (fila 284), en Güemes después
  de fines de semana largos (306) y reclamos en varios barrios (170).
- Fuente: [ficha 03](../../cuantitativo/final-pipeline-residuos/resultados/fichas/03-basura-acumulada-en-la-calle.md)
  del research de residuos. Postes caídos y baches: sin dato todavía (lo trajeron los mentores).

### 3. A quién le pasa · 2–3 líneas
A las áreas municipales que arreglan la ciudad (residuos, alumbrado, vía pública), que se enteran tarde
y salen a recorrer para encontrar problemas. A COYS, cuyos móviles con cámara hoy solo sirven a
seguridad. Y a los vecinos que conviven con el problema hasta que alguien lo ve.

### 4. Solución · 4–6 líneas
1. Los vehículos con cámara (COYS, Cordobeses en Alerta, policía) recorren como siempre.
2. La cámara detecta basura acumulada, postes caídos, baches y contenedores rotos. Guarda solo qué es
   y dónde, nunca personas.
3. Las detecciones del mismo lugar se juntan en una sola incidencia.
4. Cada incidencia llega como aviso directo al área que la resuelve.
5. Cuando una pasada posterior ya no la ve, se da por resuelta. COYS ve todo en un mapa general.

### 5. Qué la hace distinta · 2–3 líneas
No suma vehículos, sensores ni recorridos: usa los que ya circulan con cámara. Hoy los problemas
aparecen solo si un vecino reclama, si un inspector sale a buscarlos o si se instalan sensores por
contenedor. *Pendiente: relevar soluciones parecidas en Argentina y afuera.*

### 6. Impacto · 2–3 líneas
El mismo combustible rinde el doble, sin sumar emisiones, y la ciudad queda más limpia y segura porque
los problemas se atienden antes del reclamo. **Indicador principal:** kilómetros recorridos que también
detectaron problemas (con sus litros y CO₂ equivalentes). Secundarios: problemas detectados y tiempo
hasta que dejan de verse.

### 7. Primer paso · 2–3 líneas
Piloto de 4 semanas en un barrio con problemas documentados (Güemes o Mercado Norte). Necesitamos
acceso a las cámaras de los móviles de COYS y un área aliada que reciba los avisos, por ejemplo residuos.

### Checklist antes de enviar

- [x] La idea entra en una sola frase.
- [x] El problema tiene un dato o un caso concreto (residuos; falta dato de postes y baches).
- [x] Queda claro a quién le pasa.
- [ ] Alguien que no conoce el tema la leyó y la entendió.
- [x] Dijimos cómo sabríamos que funcionó.
- [x] Entra en una página.
- [x] No usamos "innovador", "disruptivo" ni "con IA" sin explicar qué hacen.

---

## Parte B · Anexo para el pitch y el jurado

> Lo marcado **propuesta** es un borrador del agente para discutir: no está decidido.

### B1. Qué criterio del jurado cubre cada parte

| Criterio (peso) | Dónde lo respondemos | Qué tiene que quedar claro |
|---|---|---|
| Impacto social y ambiental (25%) | Puntos 2, 3, 6 + B4 y B5 | Mismo combustible, más servicio; calles atendidas antes del reclamo |
| Innovación y originalidad (20%) | Puntos 4 y 5 | Las cámaras que ya circulan pasan a ser sensores de la ciudad |
| Factibilidad técnica y económica (20%) | Punto 7 + B3 | Sin hardware nuevo; prototipo que muestra detección → aviso → cierre |
| Escalabilidad y sostenibilidad (15%) | B3 + B6 | Más fuentes, más categorías, otras ciudades con flotas con cámara |
| Vínculo con el ecosistema (10%) | B2 | COYS, Cordobeses en Alerta, policía y áreas municipales en un mismo flujo |
| Pitch y equipo (10%) | Relato + B7 | Problema → evidencia → solución → prueba → impacto → viabilidad |

### B2. Vertical y ecosistema

- Vertical: **Movilidad** (equilibrio de emisiones), cruza residuos y mantenimiento urbano.
- Actores que participan: COYS (área municipal de control), Cordobeses en Alerta, Policía de Córdoba
  (provincial), áreas municipales que resuelven (residuos, alumbrado, vía pública), vecinos.
- Qué gana cada actor:
  - **COYS y policía:** su recorrido justifica más su consumo y suma valor sin cambiar su trabajo.
  - **Áreas municipales:** se enteran antes, con ubicación exacta, sin salir a buscar.
  - **Vecinos:** problemas resueltos antes de tener que reclamar.
- Aliado territorial para el piloto: COYS + el área de residuos en Güemes o Mercado Norte (a confirmar).

### B3. Cómo lo financiamos
_Detalle de fuentes en [[Financiamiento - UE, BID y CFI para Argentina]]._

- Quién paga el piloto: **propuesta:** el municipio con un fondo de innovación o un programa que ya
  financia residuos municipales (GIRSU, BID). A decidir.
- Quién paga cuando escala: **propuesta:** el municipio como servicio, justificado por el ahorro en
  inspecciones; fondos BID, BEI, EUROCLIMA o CFI vía municipio. No prometer financiamiento UE directo.
- Modelo de sostenibilidad: le **ahorra** al municipio (no le pide inversión en hardware), así que no
  depende solo de subsidios.
- Costos estimados del piloto: _sin calcular._

> Mariana: la sostenibilidad tiene **tres ejes** (social, económico y ambiental). Si falta uno, no es sostenibilidad.
> Acá: ambiental (km reutilizados, sin emisiones nuevas), económico (inspecciones evitadas), social (calles atendidas antes).

### B4. Impacto ambiental
- Qué se reduce o evita: recorridos de inspección extra; tiempo que la basura o un microbasural pasa en
  la calle (olores, plagas, lixiviados).
- **Huella de carbono:** la solución no suma vehículos; su huella es el procesamiento de imágenes.
  Estimarla queda como próximo paso.
- Indicador: km de patrullaje reutilizados como detección, con litros y kg de CO₂ equivalentes.

### B5. Impacto en las personas
- Quién mejora y cómo: vecinos (calles más limpias y seguras, menos reclamos), cuadrillas municipales
  (van directo a donde hay que trabajar).
- Inclusión: _por definir._
- **ODS (propuesta, a revisar):**

| ODS | Por qué aplica |
|---|---|
| 11 · Ciudades sostenibles | Mantenimiento urbano más rápido con lo que ya existe |
| 13 · Acción por el clima | Más servicio por el mismo combustible, sin emisiones nuevas |
| 12 · Producción y consumo responsables | Detección temprana de microbasurales y residuos voluminosos |
| 9 · Industria, innovación e infraestructura | Cámaras existentes convertidas en sensores de infraestructura |
| 17 · Alianzas | Municipio, provincia y vecinos (Cordobeses en Alerta) en un mismo flujo |

 17 según el enfoque.

| ODS | Por qué aplica |
|---|---|
| | |

### B6. En qué forzar la idea (aprendizajes de la reunión del 07/11)

- **Problema antes que solución.** Traer problemas específicos, no herramientas. Evitar empezar por "una app".
- **Local con proyección global.** El jurado y los financiadores son europeos: pensar cómo lo de Córdoba conecta con prioridades UE (EUDR, economía circular, huella hídrica, Mercosur-UE), sin clonar modelos de afuera.
- **No depender del municipio quebrado.** Objeción de Gina: Córdoba no tiene recursos para incentivos fiscales. La solución tiene que funcionar aunque el municipio no ponga plata, o mostrar que le **ahorra** costos.
- **El usuario es el cuello de botella** (Mariana): los incentivos "green" existen para empresas, casi no para hogares.
- **Evitar la frustración de la acción individual** (Ignacio y Gina): mejor apuntar a donde está el volumen (empresas, municipios, cadenas).
- **Diferenciarse con algo tangible.** No se descarta hardware (ESP32, impresora 3D) ni datos (pipeline de noticias, satelitales).
- **Agro:** la certificación (papeleo) ya está resuelta; el hueco posible está en huella hídrica y balance de carbono.
- **Registrar todo:** ideas descartadas, decisiones### B7. Preguntas clave y punto débil

| Pregunta probable | Nuestra respuesta |
|---|---|
| ¿Por qué esto no existe ya? / ¿Qué pasa con lo que ya existe? | Lo habitual depende del reclamo, de inspectores o de sensores por contenedor. Nadie usa las cámaras que ya circulan para mantenimiento. *Falta relevar casos de afuera.* |
| ¿Quién paga? ¿Y cuando se termina el subsidio? | El municipio, porque le ahorra inspecciones y no le pide hardware (propuesta, ver B3) |
| ¿Por qué lo usaría la persona? ¿Qué incentivo tiene? | El área recibe el problema con ubicación sin salir a buscarlo; el móvil no cambia su trabajo |
| ¿Cómo saben que el problema es real? ¿Qué evidencia tienen? | Ficha 03 (Mercado Norte, Güemes, reclamos barriales) y la ronda de mentores del 12/11 |
| ¿Qué validaron en el evento? | Varios mentores recomendaron ampliar a todo vehículo con cámara y aviso directo a cada área (decision log 12/11 15:08). Test 3+3: _por completar_ |
| ¿Qué necesita del municipio? ¿Y si no colabora? | Acceso a las cámaras de COYS y un área que reciba avisos. Plan B: otros vehículos con cámara (Cordobeses en Alerta) |
| ¿Cómo escala a otra ciudad o a Europa? | Toda ciudad con flotas con cámara puede sumarse; se agregan fuentes y categorías sin cambiar el flujo |
| ¿Cuál es la huella de carbono de la solución? | No suma vehículos; la huella es el procesamiento. Estimación: próximo paso |

- **Nuestro punto débil:** privacidad y acceso: usar cámaras de seguridad para otro fin, y depender de
  que COYS y la policía compartan el video.
- **Cómo lo respondemos:** se procesa en el vehículo o en el borde y se guarda solo "qué y dónde"; personas
  y patentes se descartan. La demo funciona con video simulado y el piloto arranca con una sola fuente.

### B8. Qué sabemos y qué suponemos

| Afirmación | ¿Dato o supuesto? | Fuente / cómo lo validamos |
|---|---|---|
| Hay acumulación recurrente de basura en zonas de Córdoba | Dato (evidencia media) | Ficha 03, filas 170, 284 y 306 |
| COYS opera móviles con cámara | Dato según Oli, sin fuente escrita | Mentores y staff |
| El patrullaje hoy se usa solo para seguridad | Supuesto | Mentores y staff |
| Mentores recomiendan todo vehículo con cámara y aviso directo | Dato (ronda del 12/11) | [`mentores.md`](../../../harness/mentores.md) |
| Visión por computadora detecta estas categorías desde un vehículo en movimiento | Supuesto | Spike de detección |
| Las áreas hoy se enteran por reclamo o recorriendo | Supuesto | Entrevista con el municipio |

---

esto? | Fuente / cómo lo validamos |
|---|---|---|
| | | |

---

## Relacionado

- [[01 - Reglas del hackathon]]
- [[Financiamiento - UE, BID y CFI para Argentina]]
- [[2026-11-07 - Reunión de equipo]]
- [[2026-11-07 - Guía del hackathon (formato, cronograma, jurado)]]
- [[Entrevista - Mariana (Residuos y sustentabilidad)]]
- [[Entrevista - Mauricio Vermeulen (Agro sustentable)]]
