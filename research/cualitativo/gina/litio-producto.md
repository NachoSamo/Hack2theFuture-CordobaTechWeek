# Litio: caso de producto

- **Fecha de elaboración:** 2026-11-09
- **Fuentes principales:** Comisión Europea (Global Gateway, CRMA, Reglamento de Baterías), EEAS (EU-LAC Digital Accelerator), IRMA, Eramet y Rio Tinto (vía prensa), Díaz Paz y otros (*Heliyon*, 2025), estudios CONICET con Sentinel-2, Mongabay Latam.

## Resumen

**Nadie ofrece hoy un monitoreo público, independiente y por cuenca del agua de los salares: las empresas miden su propio proyecto, el Estado encarga estudios que no publica completos y las comunidades no tienen equipo técnico.** La propuesta es un observatorio abierto por cuenca. Usa imágenes Copernicus de la UE para seguir vegas y lagunas, y cruza esa evolución con el agua declarada por cada proyecto. Los usuarios son las comunidades y los organismos de control. Los que pagarían son la cooperación europea y, más adelante, los compradores europeos que deberán demostrar debida diligencia sobre el litio desde agosto de 2027.

Viene de [[litio-problema]].

## Soluciones existentes y competencia

| Solución | Qué es | Dónde | Qué ataca | Evidencia | Hueco que deja |
|---|---|---|---|---|---|
| Extracción directa de litio (DLE) | Separa el litio de la salmuera sin piletones de evaporación | Centenario (Eramet, Salta), desde jul. 2024, 24.000 t por año; Rincón (Rio Tinto, Salta) | Menos evaporación y menos superficie | Solo afirmación de la empresa: Eramet dice que recicla entre el 60 % y el 80 % del agua. No encontré mediciones independientes. | Puede usar más agua dulce por tonelada. No resuelve el impacto sumado ni la falta de datos públicos. |
| Estudios de impacto ambiental (EIA) | Informe obligatorio por proyecto (Ley 24.585) | Todos los proyectos | Impacto de un proyecto | Documento de la empresa. Según *Heliyon* 2025, tiene datos incompletos. | Uno por proyecto, nunca por cuenca. Lo hace la empresa. |
| Estudio de impacto acumulativo de Catamarca | Estudio del gobierno sobre el Hombre Muerto, hecho por una consultora privada | Hombre Muerto, 2026 | Impacto sumado | Concluye que no hay afectación (según iProfesional). No se publicó completo. | No es público ni independiente. Es una foto, no un monitoreo continuo. |
| Auditoría IRMA | Auditoría independiente de minería responsable | Fénix, primer informe en Argentina (26/02/2025) | Prácticas de una mina | Medida con auditoría. El capítulo de consentimiento previo quedó pendiente. | Es por mina, cada varios años, y la paga la empresa. |
| Investigación académica (CONICET, universidades) | Huella hídrica (*Heliyon*), inventario de humedales de la Puna, mapeo de vegas con Sentinel-2 | Olaroz, Fénix, Puna en general | Medir y desarrollar métodos | Medida con datos (publicaciones con revisión) | Son trabajos puntuales, no herramientas abiertas y actualizadas para el público. |
| Monitoreo hídrico comunitario | Comunidades que miden su agua con apoyo técnico | Argentina, Perú y Colombia (artículo académico, 2021) | Datos propios para defensa territorial | Solo encontré el resumen del artículo | No encontré una experiencia activa en un salar argentino. Falta escala y credibilidad técnica. |
| Protocolo Kachi Yupi | Protocolo de consulta escrito por 33 comunidades | Salinas Grandes y Guayatayoc, 2015 | Consulta previa | Documento comunitario. Según Global Press Journal, frenó a una exploradora. | No tiene reconocimiento oficial ni datos de agua detrás. |
| Planta UniLiB (Y-TEC y UNLP) | Fabricación de celdas y baterías; convenio para reciclar baterías LFP | La Plata | Cadena de valor y reciclaje | Proyecto en marcha; no confirmé que esté produciendo | No toca el agua en origen. |
| Croma (ver [[analisis-croma]]) | API de registros oficiales | Chile, Bolivia y otros (no Argentina) | Acceso a registros públicos | Producto en funcionamiento | No cubre Argentina ni datos ambientales. Puede servir para escalar a Chile y Bolivia. |

**El hueco:** ninguna solución junta tres cosas: (1) mirada por cuenca, (2) datos públicos y continuos, (3) participación de las comunidades. **(inferencia mía, a partir de la tabla)**

## Usuario y cliente

No son el mismo actor. Quien más necesita el dato tiene menos plata para pagarlo.

| Rol | Quién | Por qué |
|---|---|---|
| Usuario principal | Comunidades y asambleas de la cuenca | Necesitan pruebas para la consulta previa y la justicia |
| Usuario institucional | Organismos de control provinciales, jueces, defensorías | Necesitan ver el impacto sumado para decidir permisos |
| Usuario secundario | Periodistas ambientales y ONG (por ejemplo, FARN) | Necesitan datos verificables |
| Cliente (paga) en el corto plazo | Cooperación y fondos de investigación de la UE | Financian bienes públicos y la cadena de valor responsable |
| Cliente (paga) en el mediano plazo | Compradores europeos de baterías y fabricantes de autos | Deben demostrar debida diligencia sobre el litio desde el 18/08/2027 |

### Perfiles de usuario (arquetipos, no personas reales)

**1. "Rosa", referente de una comunidad atacameña del Hombre Muerto**
- Basado en: la comunidad Atacameños del Altiplano y sus presentaciones judiciales.
- Qué hace: cría animales en las vegas y representa a la comunidad en la causa judicial.
- Dolor: sabe que la vega se secó, pero cada vez que reclama le piden un estudio que no puede pagar.
- Qué necesita: un registro con fechas que muestre cómo cambiaron las vegas, que pueda llevar a una audiencia o a una consulta.
- Restricción: conectividad limitada y desconfianza hacia herramientas que vengan "de afuera".

**2. "Martín", técnico de la Dirección de Gestión Ambiental Minera de una provincia**
- Basado en: el organismo al que la Corte de Catamarca le ordenó el estudio acumulativo en 2024.
- Qué hace: revisa estudios de impacto proyecto por proyecto.
- Dolor: no tiene una herramienta para sumar el agua de todos los proyectos de una cuenca ni para ver la tendencia de las vegas.
- Qué necesita: un tablero por cuenca para respaldar o frenar permisos.
- Restricción: presión política y económica (RIGI, regalías).

**3. "Lena", analista de cadena de suministro de un fabricante europeo de baterías**
- Basado en: las obligaciones del Reglamento (UE) 2023/1542 sobre baterías.
- Qué hace: evalúa riesgos ambientales y de derechos en los proveedores de litio.
- Dolor: los reportes de las mineras no son independientes y no comparan cuencas.
- Qué necesita: un indicador de riesgo hídrico por cuenca, trazable y con fuente.
- Restricción: necesita datos defendibles ante auditores.

## Nicho

- **Por dónde empezar:** la subcuenca del río Los Patos, en el Salar del Hombre Muerto (Antofagasta de la Sierra, Catamarca). Hay un fallo, entre 7 y 8 proyectos, una vega secada y una apelación abierta. Ahí el dato tiene uso inmediato.
- **Cómo escalaría:**
  1. De una cuenca a la Puna argentina: Salinas Grandes y Guayatayoc, Olaroz-Cauchari, Fiambalá. Las imágenes satelitales cubren todo y el método se repite.
  2. De Argentina al triángulo del litio: Chile (Salar de Atacama) y Bolivia (Uyuni). Croma podría aportar registros oficiales de esos países ([[analisis-croma]]).
  3. De la Puna a la cadena europea: un indicador por cuenca que entre en la debida diligencia y en el pasaporte de baterías.

## Modelo de financiamiento

| Fuente | Programa concreto | Fecha | Estado |
|---|---|---|---|
| Cooperación UE | Global Gateway, flagship "Cadenas de valor de litio y cobre en Chile y Argentina" (incluye un eje ESG) | Vigente; la página no da montos | Programa existe. Que financie esto es inferencia mía. |
| Aceleración UE-América Latina | EU-LAC Digital Accelerator, sexta convocatoria (alianzas entre empresas y startups, hasta €10.500 por startup) | Cierra el 30/11/2026 | Programa existe y está abierto. Verificar si el proyecto encaja. |
| Investigación UE | Horizonte Europa, convocatorias de baterías (Batt4EU) y de agua (Clúster 6) | Programa de trabajo 2026-2027 | Existen. No encontré una convocatoria específica sobre monitoreo de agua en salares. |
| Datos UE | Copernicus (Sentinel-2): datos gratuitos, no es plata | Imágenes desde 2015 | Existe. Baja el costo, no financia. |
| Compradores europeos | Debida diligencia del Reglamento de Baterías | Obligatoria desde el 18/08/2027 | La obligación existe. Que paguen por este dato es inferencia mía. |
| Mineras y auditorías IRMA | Datos para auditorías de seguimiento | La auditoría de seguimiento de Fénix debía hacerse entre 12 y 18 meses después de feb. 2025 | La auditoría existe. Que la minera pague es inferencia mía, y además genera conflicto de interés. |
| Gobiernos provinciales | Cumplimiento de órdenes judiciales de monitoreo | Fallo de Catamarca de 2026: mantener monitoreo | Inferencia mía |
| ONG y fundaciones | FARN, Fundación Humedales, Wetlands International ya trabajan el tema | Sin fecha | Inferencia mía, no encontré una convocatoria |
| Bonos verdes | Sin programa concreto encontrado | Sin fecha | Inferencia mía, débil |

**Recomendación (inferencia mía):** arrancar con fondos de cooperación e investigación de la UE, para que el producto sea un bien público y gane la confianza de las comunidades. Sumar a los compradores europeos recién cuando haya historial, y que paguen por reportes, no por "certificar" a nadie.

## Riesgos

| Riesgo | Por qué | Cómo mitigarlo (inferencia mía) |
|---|---|---|
| Desconfianza de las comunidades | Ya vivieron "consultas" usadas para dividirlas (testimonio de Clemente Flores) | Diseñar con las comunidades, que sean dueñas de sus datos de campo, con gobernanza compartida |
| Desconfianza de las empresas y del gobierno | Un dato público puede frenar inversiones RIGI | Mostrar los datos con método abierto y sin conclusiones a priori |
| El satélite no ve el agua subterránea | Las imágenes muestran vegas y lagunas, no los acuíferos | Presentarlo como señal de alerta y combinarlo con medición en campo |
| Causas mezcladas | Sequía y cambio climático también achican las vegas (UNSa, CONICET) | Comparar con vegas de control lejos de la minería |
| Captura por quien paga | Si paga la minera, el dato pierde independencia | Separar quién financia de quién gobierna los datos |
| Falta de datos declarados | Los EIA están incompletos y dispersos | Arrancar con lo que se ve desde el satélite y sumar lo declarado de a poco |

## Lean Canvas (borrador)

| Bloque | Contenido |
|---|---|
| **Problema** | 1. Cada proyecto se evalúa por separado. 2. No hay monitoreo público ni línea de base del agua por cuenca. 3. No hay una métrica común (las cifras van de 51.000 a 2.000.000 de litros por tonelada). |
| **Segmento** | Usuarios: comunidades de la Puna y organismos de control. Pioneros: comunidades y técnicos del Salar del Hombre Muerto. Clientes: cooperación de la UE y compradores europeos de baterías. |
| **Propuesta de valor** | Ver qué le pasa al agua de una cuenca entera, con datos abiertos que todos pueden revisar. |
| **Solución** | Observatorio web por cuenca: evolución de vegas y lagunas con Sentinel-2, mapa de proyectos y agua declarada, línea de tiempo de permisos y fallos, carga de registros de campo por la comunidad. |
| **Canales** | Comunidades y organizaciones aliadas (FARN, universidades del NOA, CONICET), defensorías y juzgados, periodistas ambientales, redes de compradores europeos. |
| **Ingresos o financiamiento** | Fondos UE (Global Gateway, Horizonte Europa, EU-LAC Digital Accelerator). Más adelante, reportes por cuenca para compradores europeos. |
| **Costos** | Equipo técnico (datos satelitales y web), trabajo de campo y validación con comunidades, alojamiento (bajo), mantenimiento. |
| **Métricas clave** | Cuencas cubiertas; comunidades que lo usan; veces que se cita en expedientes, consultas o notas; registros de campo cargados. |
| **Ventaja diferencial** | Independiente de las mineras, mirada por cuenca, construido con las comunidades y con datos europeos (Copernicus) que la UE reconoce. |

## Límites de esta investigación

- No encontré datos independientes del consumo de agua de la extracción directa.
- No verifiqué si el proyecto argentino de la lista de proyectos estratégicos de la UE (junio de 2025) está en una cuenca con conflicto. No pude ver el nombre.
- No encontré si hubo una auditoría de seguimiento de IRMA en Fénix.
- Los programas de financiamiento están identificados, pero no verifiqué los requisitos de elegibilidad para un equipo de hackathon.
- No hablé con usuarios. Los perfiles son arquetipos.

## Dudas para el equipo

- ¿Nos presentamos como bien público (ONG, universidad) o como startup? Cambia a quién le pedimos plata.
- ¿Llegamos a la convocatoria EU-LAC Digital Accelerator antes del 30/11/2026?
- ¿Tenemos algún contacto con comunidades o con FARN para validar?

## Fuentes

- [Comisión Europea: Global Gateway, litio y cobre en Chile y Argentina](https://international-partnerships.ec.europa.eu/policies/global-gateway/development-critical-raw-materials-value-chains-lithium-and-copper-chile-and-argentina_en)
- [EEAS: sexta convocatoria del EU-LAC Digital Accelerator](https://www.eeas.europa.eu/delegations/chile/sexta-convocatoria-del-eu-lac-digital-accelerator_es)
- [EEAS: Horizonte Europa, programa de trabajo 2026-2027](https://eeas.europa.eu/delegations/chile/horizon-europe-%E2%80%93-work-programme-2026-2027_en)
- [Grantbite: Horizonte Europa, baterías (Batt4EU)](https://www.grantbite.com/es/funding/horizon-europa-baterias-sostenibles-batt4eu)
- [CMS: Reglamento de Baterías de la UE](https://cms.law/en/esp/legal-updates/eu-sustainable-batteries-regulation-where-are-we-now)
- [IRMA: FAQ de la auditoría de Fénix (2025)](https://responsiblemining.net/wp-content/uploads/2025/02/FAQ-Fenix-Mine_FINAL_ES.pdf)
- [Mining.com: el sector del litio mira la extracción directa en Argentina](https://www.mining.com/web/global-lithium-sector-eyes-argentinas-salt-flats-on-tech-test-run/)
- [Benchmark: momento clave para la extracción directa en Argentina](https://source.benchmarkminerals.com/article/view-from-the-ground-in-argentina-a-defining-moment-for-dle)
- [Díaz Paz y otros, *Heliyon* (2025)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11869023/)
- Inventario y monitoreo de humedales de la Puna, y mapeo de vegas con Sentinel-2 y Google Earth Engine: los encontré en una búsqueda, pero no verifiqué autores ni enlaces. Hay que buscarlos en el repositorio del CONICET antes de citarlos.
- [Dialnet: posible artículo sobre monitoreos hídricos comunitarios (2021); verificar que el enlace sea ese artículo](https://dialnet.unirioja.es/descarga/articulo/8723235.pdf)
- [iProfesional: conflicto por el agua en Catamarca (2026)](https://www.iprofesional.com/legales/456237-litio-catamarca-puso-alerta-comunidades-impacto-agua)
- [Mongabay: columna de Clemente Flores (2026)](https://es.mongabay.com/2026/01/mineria-litio-amenaza-agua-argentina-opinion/)
- [Global Press Journal: protocolo Kachi Yupi](https://globalpressjournal.com/americas/argentina/mining-firms-seek-argentinas-white-gold-local-approval-proves-elusive/)
- [Economía Sustentable: reciclaje de baterías UNLP](https://economiasustentable.com/noticias/litio-impulsan-proyecto-clave-para-reciclar-baterias-en-argentina)

#litio #gina #biodiversidad #agro #movilidad
