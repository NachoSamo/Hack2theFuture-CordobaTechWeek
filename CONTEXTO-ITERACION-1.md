# Contexto del repositorio — Iteración 1

> Registro histórico de la primera iteración, recuperado al integrar arquitectura el 13/11/2026. Describe ese momento; el estado vigente de Urbis está en [README.md](README.md) y [harness/ESTADO.md](harness/ESTADO.md).

- **Repositorio:** `Hack2theFuture-CordobaTechWeek`
- **Evento:** Hack to the Future · Córdoba Tech Week (12 y 13/11/2026)
- **Estado general:** Fase de investigación completada parcialmente. El repositorio contiene únicamente investigación cualitativa (12 documentos) y cuantitativa (completa solo en **residuos**; *placeholders* en los otros tres ejes). No hay código de producto ni aplicación aún.

---

## 1. Estructura del repositorio

| Ruta | Contenido | Estado |
|---|---|---|
| `README.md` | Solo título del repositorio | Mínimo |
| `research/cualitativo/gina/` | 10 documentos (`*-triage.md` + `*-problema.md`) sobre 5 temas en 4 ejes, cruzando agenda COP30/COP31, UE, Argentina y Córdoba | Completo (09–10/11/2026) |
| `research/cualitativo/samo/` | 2 documentos de evaluación de fuentes externas (`analisis-croma.md`, `publicaciones-periodistas-ambientales.md`) | Completo (04/11/2026) |
| `research/cuantitativo/final-pipeline-agro.md` | Texto *placeholder* de 1 línea | Pendiente |
| `research/cuantitativo/final-pipeline-biodiversidad.md` | Texto *placeholder* de 1 línea | Pendiente |
| `research/cuantitativo/final-pipeline-movilidad.md` | Texto *placeholder* de 1 línea | Pendiente |
| `research/cuantitativo/final-pipeline-residuos.md` | Informe final del pipeline de noticias de residuos | Completo (11/11/2026) |
| `research/cuantitativo/final-pipeline-residuos/pipeline/` | 8 scripts Python + `residuos_clasificado_final.csv` (547 noticias) + `README.md` | Reproducible |
| `research/cuantitativo/final-pipeline-residuos/resultados/` | Excel (`analisis_problemas_residuos.xlsx`), `reporte_problemas_residuos.md`, 2 gráficos `.png` y `fichas/` (`00-indice.md` + 15 fichas) | Completo |

---

## 2. Estado y hallazgos por eje (track)

### A. Residuos (único eje con cualitativo + cuantitativo completos)

#### Investigación cuantitativa (`final-pipeline-residuos`)
- **Base:** `residuos_clasificado_final.csv` con 547 noticias (414 etiquetadas como problema, 133 como solución).
- **Calidad del clasificador automático:** **51 % de falsos positivos**. Tras lectura manual de las 414 filas de problema: **132 VÁLIDAS**, 69 DUDOSAS y 213 FALSOS POSITIVOS (incluidas 47 soluciones etiquetadas como problema). La categoría original coincide con el problema real en solo el 39 % de las válidas.
- **Conclusión metodológica:** No conviene automatizar la detección de huecos sobre este CSV (la regla automática produce 60 % de falsos positivos y coincide en solo 9 de 36 problemas); sí automatizar normalización, conteos, duplicados y sensibilidad.
- **Problemas y huecos:** Las 132 válidas se agrupan en **36 problemas únicos** (3 cubiertos por soluciones directas: RAEE, textiles y orgánicos/compostaje; **33 huecos**: 19 PARCIAL y 14 SIN SOLUCIÓN).
- **Sesgo del dataset:** 2024–2026 está dominado por prensa técnica de EE. UU. y Europa; solo 23 de las 132 filas válidas son de Argentina (12 de Córdoba).
- **Shortlist de 5 huecos** (ponderación del jurado sin pitch: impacto 25 %, innovación 20 %, factibilidad 20 %, escalabilidad 15 %, ecosistema 10 %):

| Ficha | Problema | Estado | Solidez | Total | Foco territorial / nota |
|---|---|---|---|---|---|
| 01 | Basurales a cielo abierto y vertederos sin control | SIN SOLUCIÓN | ALTA | 3,72 | 7 noticias (3 en Córdoba: Huerta Grande, B.° San Vicente, Tancacha) |
| 03 | Basura acumulada en la vía pública, plagas y enfermedades | SIN SOLUCIÓN | MEDIA | 3,67 | 6 noticias (3 en Córdoba: Mercado Norte, Güemes, varios barrios) |
| 04 | Inseguridad y muertes de trabajadores en basurales y recolección | SIN SOLUCIÓN | MEDIA | 3,67 | 3 noticias (2 en Córdoba: muerte en basural y asaltos en Villa Siburu) |
| 05 | Incendios y quema de residuos en basurales, depósitos y acopios | SIN SOLUCIÓN | MEDIA | 3,61 | 4 noticias (1 en Freyre, Córdoba; choque en ruta 9) |
| 02 | Envases vacíos de agroquímicos descartados sin control | PARCIAL | BAJA | 3,72 | 2 noticias (2020–2021, Bs. As./pampa húmeda; sin casos en Córdoba; requiere validación) |

> Los primeros 4 huecos comparten actores y territorio en la **cadena municipal de residuos de Córdoba**.

#### Investigación cualitativa (`metano-residuos-triage.md` / `metano-residuos-problema.md`)
- **Puntaje triage:** 30/35.
- **Problema elegido:** El metano de residuos es la prioridad n.º 1 de la COP31, pero las iniciativas (NOW!, Día de Residuo Cero) apuntan a rellenos sanitarios y orgánicos, dejando afuera basurales a cielo abierto y quema.
- **Datos locales:** Casi el 90 % de municipios argentinos dispone en basurales a cielo abierto o semicontrolados (OIT); >5.000 basurales (censo 2017 sin actualizar). En Córdoba: Piedra Blanca (~1.900 t/día, fosas viejas sin captura) y 109 basurales identificados (2020–2023).
- **Conexión directa:** Refuerza la ficha 01 y la ficha 05 del pipeline cuantitativo; plantea validar quema en basurales con satélites (NASA FIRMS, Carbon Mapper, MARS).

---

### B. Biodiversidad (dos líneas cualitativas; cuantitativo pendiente)

1. **Bosque seco** (`bosque-seco-triage.md` / `bosque-seco-problema.md` — Triage: 30/35)
   - **Problema elegido:** El fondo TFFF y la hoja de ruta voluntaria de deforestación (COP30) se diseñaron para selva húmeda; dejan afuera al bosque seco (Gran Chaco, Cerrado) y omiten los incendios.
   - **Datos locales:** El norte argentino perdió 210.702 ha en 2025 (+40 % vs. 2024: 116.498 ha por fuego y 94.204 ha por desmonte; Greenpeace). Córdoba quemó 103.327 ha en 2024 (~5.000 ha de bosque nativo).
   - **Vínculo UE:** Países miembros aportan al TFFF; la EUDR rige desde el 30/12/2026 con riesgo estándar uniforme para todo el país.

2. **Litio — agua por cuenca** (`litio-triage.md` / `litio-problema.md` — Triage: 26/30; cruza biodiversidad, agro y movilidad)
   - **Problema elegido:** En una misma cuenca de la Puna operan múltiples proyectos evaluados por separado, sin monitoreo público e independiente del agua total extraída.
   - **Caso concreto:** Salar del Hombre Muerto (Catamarca, 7–8 proyectos; fallo judicial de 03/2024 acreditó secado de una vega; cautelar levantada el 31/03/2026 con 2 votos en contra por falta de monitoreo integral). Estimaciones de consumo de agua por tonelada de litio divergen hasta 40× (51.000 a 2.000.000 L/t).
   - **Vínculo UE y datos:** Reglamento de Baterías (pasaporte desde 18/02/2027; debida diligencia desde 18/08/2027) y datos satelitales abiertos de la UE (Copernicus / Sentinel-2 desde 2015).

---

### C. Agro (solo cualitativo; cuantitativo pendiente)

- **Documento:** `adaptacion-agro-triage.md` / `adaptacion-agro-problema.md` (Triage: 30/35).
- **Problema elegido:** Los sistemas agroalimentarios representan el 54 % de las necesidades de adaptación climática evaluadas pero reciben solo el 20 % del financiamiento, y el único canal de agricultura de la ONU (Trabajo Conjunto de Sharm el-Sheikh) vence en la COP31 sin acuerdo sobre quién paga.
- **Datos locales:** Sequía 2022/23 costó ~USD 19.000 M en Argentina (~3 puntos del PBI) y ~USD 7.700 M en Córdoba (con otras estimaciones de USD 7.000 M y USD 4.700 M); 3,3 M ha con erosión eólica en Córdoba.
- **Vínculo UE:** Conflictivo en la negociación COP (UE opuesta a obligación de financiar); el BEI evalúa préstamo *Córdoba Global Gateway Water Resilience* (proyecto 20250706).

---

### D. Movilidad (solo cualitativo; cuantitativo pendiente)

- **Documento:** `transporte-publico-triage.md` / `transporte-publico-problema.md` (Triage: 27/35).
- **Problema elegido:** El transporte genera ~24 % del CO₂ global, pero tren y transporte público reciben solo 23 % del financiamiento climático del sector y casi dos tercios de las NDC no le asignan presupuesto. En la COP31 queda absorbido por la agenda de electrificación ("35×35").
- **Datos locales:** Es la vertical con menos datos locales. En Córdoba: conflicto de subsidios FETAP–Municipalidad (06/2026) y aumento de boleto (07/2026), pero sin datos públicos de pasajeros 2025–2026 ni inventario de emisiones de la ciudad.

---

## 3. Fuentes externas evaluadas (`research/cualitativo/samo/`)

- **Croma (`analisis-croma.md`):** API/MCP con 401 endpoints y 134 fuentes oficiales de 9 países. **No cubre Argentina**, por lo que no reemplaza el pipeline propio; sirve solo como contraste regional (SECOP Colombia, IBAMA Brasil, Banco Mundial) o búsqueda web genérica.
- **Periodistas Ambientales (`publicaciones-periodistas-ambientales.md`):** Se leyeron las 16 publicaciones del listado (`periodistasambientales.org`). Distribución: Biodiversidad 6, Residuos 1 (Solita, Caquetá; sin medición de resultados), Agro 0, Movilidad 0, Otra 9.

---

## 4. Huecos y decisiones abiertas para la siguiente iteración

1. **Elección de vertical / problema a construir:**
   - **Residuos (cadena municipal en Córdoba: basurales, acumulación en calle, seguridad, incendios + metano/quemas)** es el eje más maduro: combina pipeline cuantitativo validado, shortlist puntuada y datos cualitativos locales.
   - **Litio (monitoreo hídrico por cuenca)** y **Bosque seco** tienen fuerte encaje con datos satelitales abiertos de la UE (Copernicus) y normativa europea vigente/próxima (Reglamento de Baterías, EUDR), pero carecen de análisis cuantitativo en el repo.
2. **Pipelines cuantitativos faltantes:** `final-pipeline-agro.md`, `final-pipeline-biodiversidad.md` y `final-pipeline-movilidad.md` siguen vacíos (1 línea cada uno).
3. **Validación en campo / datos locales pendientes:**
   - Residuos: datos actuales (2026) de basurales en Córdoba/CORMECOR y validación de envases de agroquímicos (ficha 02, evidencia baja 2020–2021).
   - Agro: financiamiento de adaptación que llega efectivamente a Córdoba y pérdidas 2024–2026.
   - Movilidad: inventario local de emisiones y datos de pasajeros en Córdoba; definir si el foco es urbano o de cargas.
   - Bosque seco: calcular hectáreas/monto de bosque seco excluido del TFFF.
   - Litio: definir si el caso piloto es Salar del Hombre Muerto o Salinas Grandes.
