---
tipo: producto
subtipo: encaje con el track y apalancamiento
fecha: 2026-11-12
dueño: Samo
estado: borrador para validar con Oli y Gina (pitch) y con mentores
track: movilidad sostenible
fuentes: Comisión Europea, Sustainable Urban Mobility; New EU Urban Mobility Framework, COM(2021) 811; Reglamento TEN-T (UE) 2024/1679
---

# Por qué "Un móvil para autosanar la ciudad" es movilidad sostenible según la UE

> **Para qué sirve este documento.** Tiene tres lectores:
>
> 1. **El jurado de la vertical**, en las preguntas: respuesta a "¿por qué esto es movilidad y no residuos?".
> 2. **El equipo**: qué pilares de la política europea atacamos, cuáles no y con qué evidencia, para que las épicas y la demo no prometan de más.
> 3. **Escala y financiamiento**: por qué canal europeo podría seguir el proyecto después del hackathon.
>
> Distingue lo que el producto **hace hoy en la demo** de lo que **apunta a hacer**. Lo marcado como
> **supuesto** no está validado. La idea está en [`idea-y-epicas.md`](idea-y-epicas.md) y el dominio en
> [`dominio-del-problema.md`](dominio-del-problema.md).

---

## 1. Qué dice la Comisión Europea

La página [Sustainable urban mobility](https://transport.ec.europa.eu/transport-themes/urban-transport/sustainable-urban-mobility_en)
de la DG MOVE resume la política urbana de transporte de la UE. Su base es el
[**New EU Urban Mobility Framework**](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021DC0811)
(COM(2021) 811, 14/12/2021).

**Las cifras de partida (según la página de la CE):**

- Más del **70 %** de la población de la UE vive en ciudades.
- Las ciudades generan el **23 %** de las emisiones de gases de efecto invernadero del transporte.
- La meta es reducir las emisiones del transporte al menos un **55 % para 2030** y un **90 % para 2050**.

**Los problemas que nombra:** contaminación del aire, congestión, accesibilidad, **seguridad vial
urbana** y crecimiento del comercio electrónico.

**Lo que pide el marco** (lectura del COM(2021) 811):

| Herramienta | Qué es | Por qué nos importa |
|---|---|---|
| **SUMP** (plan de movilidad urbana sostenible) | El plan de movilidad de cada ciudad. Desde el Reglamento TEN-T de 2024 es **obligatorio para los 431 nodos urbanos** de la red, con fecha límite el **31/12/2027** | Cada ciudad necesita datos para armarlo y monitorearlo |
| **SUMI / Urban Mobility Indicators** | Un set de indicadores (el marco habla de 19): emisiones de GEI y contaminantes, congestión, reparto modal, **muertos y heridos en el tránsito**, accesibilidad | Las ciudades tienen que medir y reportar; nuestro producto genera datos de ese tipo |
| **Recolección de datos urbanos** | El Reglamento TEN-T exige a los nodos urbanos recolectar datos de movilidad (acto de ejecución con hitos en 2025 y 2027) | Demanda de herramientas que produzcan datos sin infraestructura nueva |
| **Soluciones digitales** | Caja de herramientas de la UE para **gemelos digitales locales**, espacio europeo de datos de movilidad, revisión de la Directiva de ITS | Encaje directo con "la ciudad que se diagnostica sola" |
| **Flotas públicas limpias** | Logística urbana de cero emisiones para 2030 y "ecologizar" las flotas públicas y compartidas, también por compras públicas | Los móviles municipales son flota pública urbana |
| **Visión cero** | Los usuarios vulnerables (peatones, ciclistas, motos) son el **70 % de las muertes viales urbanas** en la UE | Baches, semáforos rotos y alumbrado caído son riesgo vial |

**Los 8 pilares de la imagen** (acciones para los nodos urbanos): red de transporte público más fuerte;
movilidad activa (caminar y bicicleta); logística urbana de cero emisiones y última milla;
**mejor gestión de los flujos de movilidad con centros multimodales y soluciones digitales**;
estaciones modernas que conectan tren y transporte público; estacionamientos disuasorios con carga
para vehículos eléctricos; terminales multimodales y centros de consolidación de carga; transporte
a demanda (taxis y VTC).

---

## 2. Dónde encajamos en los 8 pilares

La mayoría de los pilares son **infraestructura de transporte** que no tocamos. Es mejor decirlo nosotros
antes de que lo diga el jurado. Encajamos en cuatro, con distinta fuerza:

| Pilar (imagen) | Encaje | Qué parte del producto | Fuerza |
|---|---|---|---|
| Gestión de flujos de movilidad con **soluciones digitales** | **Directo** | Los vehículos que ya circulan funcionan como sensores; E2 a E5 convierten recorridos en datos urbanos en tiempo casi real | Fuerte |
| Logística urbana de cero emisiones / **flotas urbanas** | **Indirecto** | Equilibrio de emisiones: cada km de la flota pública rinde más servicios (E6) y las áreas no salen a buscar problemas | Media: no electrificamos nada hoy |
| **Movilidad activa** (caminar, bicicleta) | **Indirecto** | Detectar baches, semáforos, señales, alumbrado y postes caídos protege a peatones y ciclistas | Media: sin evidencia propia en Córdoba todavía |
| Transporte público, estaciones, estacionamientos disuasorios, terminales, transporte a demanda | **No** | — | Fuera de alcance |

Además, aunque no figura en la imagen, encajamos con los **indicadores SUMI**, que son el corazón del
monitoreo del marco.

---

## 3. Los cuatro argumentos que defendemos

### 3.1 La flota como sensor: soluciones digitales para la ciudad · encaje directo

- **Argumento:** la UE pide a las ciudades que **recolecten datos** y usen **soluciones digitales** y
  **gemelos digitales locales** para gestionar la movilidad. Nosotros convertimos cada recorrido de
  patrullaje en un relevamiento del estado de la calle, sin sensores nuevos.
- **Qué hay hoy:** el prototipo de [`frontend/`](../../../frontend/) muestra tickets simulados sobre un mapa de Córdoba.
- **Qué falta:** detección real (E2) y acceso a las cámaras (H1, H7).
- **Límite honesto:** no gestionamos flujos de tránsito (congestión, semáforos inteligentes). Gestionamos
  el **estado de la vía pública** por la que esos flujos circulan.

### 3.2 Más servicio por km de la flota pública · encaje indirecto

- **Argumento:** la flota de monitoreo ya circula y ya emite. Si cada km también sirve para mantener
  la ciudad, la flota rinde más con las mismas emisiones, y las áreas que hoy recorren para encontrar
  problemas pueden dejar de hacerlo: **menos vehículos en la calle** (decision log, 12/11 19:40).
- **Cifra del pitch:** km de patrullaje reutilizados como detección, con litros y CO₂ equivalentes (E6).
- **Puente con la UE:** el marco apunta a flotas públicas de cero emisiones. Una flota con más usos por
  km justifica mejor la inversión en eléctricos. Es **visión a largo plazo**, no lo que hace la demo.
- **Supuestos:** que las áreas hoy recorren para encontrar problemas y que el patrullaje se usa solo
  para seguridad (H5).

### 3.3 Calles seguras para quien camina y pedalea · encaje indirecto

- **Argumento:** la visión cero de la UE pone el foco en peatones y ciclistas, que son el 70 % de las
  muertes viales urbanas en la UE. Un bache, un semáforo apagado, un poste caído o una cuadra sin luz
  son riesgos para ellos. Detectarlos antes del reclamo acorta el tiempo de exposición al riesgo.
- **Evidencia local que ya usa el pitch** (decision log, 12/11 17:10): fallas de alumbrado (66.000
  reclamos en dos años, La Voz) y postes caídos con riesgo eléctrico (198 llamados a Defensa Civil en
  una tormenta, Perfil, 7/8/2026).
- **Límite honesto:** no hay dato de baches ni de siniestralidad vial en Córdoba que conecte estas
  fallas con accidentes de peatones o ciclistas. El 70 % es una cifra de la UE, no de Córdoba.

### 3.4 Datos para los indicadores de movilidad · encaje indirecto

- **Argumento:** las ciudades europeas tienen que reportar indicadores de movilidad urbana para sus
  SUMP. Producimos datos que alimentan algunos: emisiones por km de flota pública, riesgos viales
  detectados y tiempo de resolución.
- **Límite honesto:** no medimos reparto modal, congestión ni accesibilidad, que son buena parte de
  los indicadores.

---

## 4. Apalancamiento: por qué conviene hablar el idioma de la UE

### 4.1 Credibilidad ante el jurado

- El hackathon se hace con el Córdoba Cluster, **Global Gateway de la UE** e ITC (ver
  [`AGENTS.md`](../../../AGENTS.md) y el
  [financiamiento](../../../research/cualitativo/oli/Financiamiento%20-%20UE,%20BID%20y%20CFI%20para%20Argentina.md)).
  Encuadrar el producto en una política vigente (Urban Mobility Framework, SUMP, visión cero, ODS 11)
  muestra que no inventamos una necesidad.
- El marco cita explícitamente el **ODS 11** (ciudades sostenibles), que ya está en el deck.
- **Riesgo:** sobreactuar el encaje. La respuesta es la tabla del punto 2: decimos dónde **no** encajamos.

### 4.2 Mercado en Europa

- **431 nodos urbanos** de la red TEN-T deben tener su SUMP para el **31/12/2027** y empezar a
  reportar indicadores. Necesitan datos baratos y continuos.
- Muchas ciudades europeas ya tienen flotas municipales que recorren todo el territorio (limpieza,
  inspección, policía local): el modelo "flota como sensor" se traslada sin hardware nuevo.
- **Supuesto:** que una ciudad europea pagaría por esto. Hay competidores que montan cámaras o
  teléfonos en vehículos municipales para relevar el estado de las calles (por ejemplo,
  **vialytics** en Alemania, *a verificar en E7*). Nuestro diferencial tiene que ser otro (ver 4.4).

### 4.3 Fondos para el piloto y la escala

Ninguno de estos canales financia a una startup argentina en forma directa. Son **caminos**, no promesas:

| Canal | Cómo llegaríamos | Fuente |
|---|---|---|
| **EUROCLIMA** | Junto con un municipio, como proyecto de gobierno local | [Financiamiento](../../../research/cualitativo/oli/Financiamiento%20-%20UE,%20BID%20y%20CFI%20para%20Argentina.md) |
| **Horizon Europe** (incluida la misión de **100 ciudades climáticamente neutras e inteligentes para 2030**) | En consorcio con una universidad (UTN, UNC) y un socio europeo | COM(2021) 811 |
| **BID / BID Lab** | Piloto de innovación urbana con el municipio | [Financiamiento](../../../research/cualitativo/oli/Financiamiento%20-%20UE,%20BID%20y%20CFI%20para%20Argentina.md) |
| **Global Gateway** | Narrativa de cooperación UE–América Latina | [Financiamiento](../../../research/cualitativo/oli/Financiamiento%20-%20UE,%20BID%20y%20CFI%20para%20Argentina.md) |

**Pendiente:** confirmar convocatorias abiertas antes de nombrar montos o fechas en el pitch.

### 4.4 Diferenciación frente a otros equipos de movilidad

- Las propuestas habituales de movilidad suman algo: apps, bicicletas, sensores, vehículos.
  **Nosotros no sumamos vehículos ni hardware**: le sacamos más servicio a lo que ya circula.
- Frente a soluciones de relevamiento vial existentes, el diferencial a validar es la combinación:
  **varias fuentes** (monitoreo municipal, Cordobeses en Alerta, móviles policiales), **varias
  categorías** (residuos, vía pública, contenedores), **un ticket por incidencia** y **aviso directo**
  al área que resuelve.
- **No decir "somos los únicos"** hasta relevar lo que existe (E7).

---

## 5. Para el pitch y las preguntas

**Una frase para el speech** (propuesta para Oli y Gina):

> "La Unión Europea le pide a cada ciudad medir su movilidad y usar soluciones digitales para
> gestionarla. Nosotros lo hacemos sin poner un solo sensor nuevo: cada kilómetro que la flota ya
> recorre ahora también cuida la calle."

**Respuestas para el jurado:**

| Pregunta probable | Respuesta corta |
|---|---|
| ¿Por qué esto es movilidad y no residuos? | Porque el recurso que optimizamos es la flota: cada km sirve a más de un fin y hay menos vehículos saliendo a buscar problemas. Encaja en el pilar de soluciones digitales del Urban Mobility Framework |
| ¿Reduce emisiones de verdad? | Hoy no reduce km: les da más usos. La reducción viene de los recorridos de inspección que las áreas dejan de hacer (supuesto a medir en el piloto) |
| ¿Qué tiene que ver con la seguridad vial? | Baches, semáforos y alumbrado son riesgo para peatones y ciclistas, el foco de la visión cero europea. Los detectamos antes del reclamo |
| ¿Funcionaría en Europa? | La UE exige planes de movilidad a 431 ciudades para 2027, con indicadores y datos. Sus flotas municipales ya recorren la ciudad |
| ¿Quién lo financia? | El piloto, el municipio. Para escalar, canales como EUROCLIMA, BID o Horizon Europe junto con un municipio o una universidad, no fondos directos |

---

## 6. Hipótesis que este documento necesita validar

| Hipótesis | Si es falsa… | Cómo validarla |
|---|---|---|
| El jurado de movilidad valora el encaje con la política europea | El doc sirve solo para escala y financiamiento | Preguntar a un mentor de la vertical antes del pitch |
| Las áreas del municipio hoy salen a recorrer para encontrar problemas | Se cae "menos vehículos en la calle"; queda solo "más servicio por km" | Entrevista con el municipio (E0) |
| Baches, semáforos y alumbrado generan riesgo vial medible en Córdoba | El argumento 3.3 se apoya solo en la cifra europea y en los reclamos | Datos de siniestralidad vial de Córdoba |
| Hay espacio frente a soluciones existentes de relevamiento vial | La diferenciación se reduce al multi-fuente y al aviso directo | Relevamiento de competidores (E7) |

---

## Fuentes

- Comisión Europea, DG MOVE. [Sustainable urban mobility](https://transport.ec.europa.eu/transport-themes/urban-transport/sustainable-urban-mobility_en). Consultada el 12/11/2026.
- Comisión Europea. [The New EU Urban Mobility Framework, COM(2021) 811](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021DC0811), 14/12/2021. La imagen de los 8 pilares sale de este marco.
- Comisión Europea. [Sustainable urban mobility planning and monitoring](https://transport.ec.europa.eu/transport-themes/urban-transport/sustainable-urban-mobility-planning-and-monitoring_en): 431 nodos urbanos.
- Parlamento Europeo, Observatorio Legislativo. [Resumen del Reglamento TEN-T](https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1785876): SUMP por nodo urbano hasta el 31/12/2027.
- EU Urban Mobility Observatory. [Revised TEN-T Regulation adopted](https://urban-mobility-observatory.transport.ec.europa.eu/news-events/news/revised-ten-t-regulation-adopted-sustainable-and-resilient-transport-network-bringing-europe-closer-2024-06-25_en), 25/06/2024.

## Relacionado

- [`idea-y-epicas.md`](idea-y-epicas.md) · [`dominio-del-problema.md`](dominio-del-problema.md) · [`solucion-paso-a-paso.md`](solucion-paso-a-paso.md)
- [`decision-log.md`](../../decision-log.md) (12/11 19:40: por qué es movilidad) · [`pitch.md`](../../pitch.md)
