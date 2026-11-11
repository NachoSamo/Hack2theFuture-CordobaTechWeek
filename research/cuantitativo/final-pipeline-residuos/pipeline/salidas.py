import sys, os
import pandas as pd
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
from etiquetas import GRUPOS

sys.stdout.reconfigure(encoding="utf-8")
OUT = "../resultados"; os.makedirs(OUT, exist_ok=True)
P = pd.read_pickle("P.pkl"); S = pd.read_pickle("S.pkl"); U = pd.read_pickle("U.pkl")
C = pd.read_pickle("C.pkl"); A = pd.read_pickle("A.pkl"); B = pd.read_pickle("B.pkl")

AR = {"Clarín", "Infobae", "TN", "El Doce", "CBA24N", "ECOBIZ", "Visión Sustentable"}
P["origen_fuente"] = P.fuente.map(lambda f: "Medio argentino" if f in AR else ("No determinado" if f == "Ecomundo" else "Medio internacional"))

# ---------------- Textos manuales (D y F) ----------------
TOP10 = [
 ("MERCADO", "12 noticias de 5 fuentes, todas 2024–2026: caen precios y demanda de plástico y papel reciclado (448, 375, 84), cierran plantas (185) y la industria europea habla de crisis por material virgen barato, importaciones y costos de energía (420, 442, 466). "
  "Ninguna solución lo ataca de frente: las 8 parciales (134, 357, 380, 516…) son marcas que usan contenido reciclado, lo que crea algo de demanda pero no estabiliza precios. Todas las fuentes son prensa técnica europea o de EE. UU.; Argentina aparece solo en 375 (exportación de papel)."),
 ("PLASMAR", "10 noticias de 6 fuentes, entre 2018 y 2026: plástico en fauna (44, 51, 53), costas (15, 178, 225), ríos (45) y la Amazonía (472). Es el problema más sostenido en el tiempo dentro del dataset. "
  "No hay soluciones marcadas como tales que lo ataquen; las únicas aparecen escondidas en filas mal etiquetadas como problema (robot de playas 151, máquina en río 310, convenio Coca-Cola 510), todas de limpieza al final del ciclo. 44 y 289 son la misma noticia (cobras) publicada dos veces."),
 ("MARCAS", "10 noticias de 5 fuentes (2024–2025): Coca-Cola y PepsiCo bajan o incumplen metas (100, 126, 127, 158, 444), Exxon es demandada por engaño sobre el reciclaje (114), y los programas de Amazon y Apple se cuestionan (78, 81). "
  "Las soluciones del dataset no apuntan a esto: solo hay un pasaporte digital de plásticos (131, parcial) y anuncios de metas de Danone (340), que son del mismo tipo de compromiso voluntario que el problema critica. 158 y 444 son la misma noticia."),
 ("PLASPROD", "7 noticias de 7 fuentes distintas (la mayor diversidad del dataset): la producción de plástico crece más rápido que la capacidad de reciclaje (58, 359, 533, 537). "
  "Tiene 15 soluciones parciales, pero casi todas son productos hechos con plástico reciclado (bancos 285, casa de botellas 258, morteros 544) o bioplásticos (342, 224, 428): reciclan una parte o sustituyen material, ninguna reduce la producción. Esa es la brecha."),
 ("BASURAL", "7 noticias (2016–2020 y 2 sin fecha), 5 con ubicación en Argentina: San Vicente (30), Huerta Grande a 150 m de la cisterna del pueblo (274), Tancacha (400), Luján (298), Bariloche (65). Es el problema local más repetido. "
  "No hay ninguna solución en el dataset; solo el cierre de Tancacha, que se cuenta en la misma noticia (400). Que no haya noticias después de 2020 puede ser un efecto de los medios relevados, no una mejora (ver F)."),
 ("MICRO", "7 noticias de 4 fuentes (2024–2026): microplásticos en el cuerpo humano (515), alimentos (165, 245), aire por desgaste de neumáticos (502) y océanos (198). "
  "Una sola solución directa (547, filtración en aguas residuales) y dos escondidas en filas de problema (213, 374). Ninguna toca las fuentes de emisión (neumáticos, degradación de envases)."),
 ("EXPORT", "6 noticias de 4 fuentes (2020–2026): residuos devueltos o acumulados en otros países (39, 43), el cierre de China a las importaciones (295), nuevas restricciones de Malasia (454) y una exportación ilegal de plástico contaminado (514). "
  "Solo hay soluciones parciales: plantas en Nigeria (498) e inversión en India (230), que aumentan la capacidad local sin abordar el comercio."),
 ("FUEGO", "4 noticias de 4 fuentes distintas: un depósito de plásticos quemado en Freyre, Córdoba (22); un incendio en un basural a cielo abierto que provocó un choque de seis camiones en la ruta 9 (294); quema de residuos en Sudáfrica (188); y un reciclador sancionado por un acopio con riesgo de incendio (451). "
  "Ninguna solución en el dataset. Se relaciona con BASURAL (los basurales se queman) y con el aumento de acopios (inferido)."),
 ("DESCART", "5 noticias de 3 fuentes (2024–2026): delivery (358), eventos deportivos (519), mascarillas de la pandemia (470) y un récord de desechos plásticos en California pese a la prohibición de bolsas (376). "
  "Hay 5 soluciones parciales (préstamo de objetos 327, devolución de envases 352, Cosquín Rock 74) y varias escondidas en filas de problema (167, 243, 303). Es de los problemas con más soluciones parciales, pero ninguna es para delivery."),
 ("ACUM", "6 noticias (2 fuentes), 3 en Córdoba: barrios (170), Güemes después de un fin de semana largo (306), Mercado Norte después del Carnaval (284); más Bogotá (212, 373) y Cuba (542), con ratas y enfermedades. "
  "Ninguna solución en el dataset. Varias noticias no tienen descripción ni causas (170, 212), así que la causa (picos de generación frente a la frecuencia de recolección) es inferida."),
]
SIGUIENTES = ("Les siguen tres problemas locales con 3–4 noticias y ninguna solución en el dataset: vertidos y depósitos ilegales (VERTIDO: 130, 181, 286, 503), "
  "fallas del servicio de recolección (SERVICIO: 99, 267, 272 — CEAMSE y Lusa) e inseguridad de trabajadores en basurales y recolección (TRABSEG: 107, 209, 309 — dos muertes aplastados y asaltos en Villa Siburu).")

LIMITES = """**Sobre el filtrado**
- 213 de los 414 problemas (51 %) son falsos positivos. Además de los tipos ya conocidos (política, eventos, negociaciones), aparecen otros dos grupos grandes: **soluciones etiquetadas como problema** (47 filas, p. ej. 6, 24, 151, 310) y **notas de consejos o policiales** donde "basura" es contexto (17, 191, 200, 236). Hay algo más grave: la otra IA rellenó campos que el texto no tiene. La fila 14 (jubilados) quedó como RAEE, y la 7 (bolsas de supermercado) también.
- Las 68 filas DUDOSAS no entran en los conteos de la tabla C, pero sí están asignadas a un problema (columna `filas_dudosas`). Si el equipo las valida, INCIN (incineración) pasa de 1 a 5 noticias y MERCADO de 12 a 20.
- La clasificación es mía y se hizo leyendo título, descripción (cortada en 220 caracteres), causas y afectados. **No leí las notas originales.** 82 problemas no tienen descripción, y en esos casos el veredicto se apoya solo en el título.

**Sobre las categorías**
- Solo el 39 % de los problemas válidos tienen una categoría original que coincide con la que corresponde a su problema de fondo. "GESTION_DEFICIENTE_RESIDUOS_ESPECIALES_RAEE" funciona como cajón de sastre: incluye orgánicos en Cataluña (80), aerogeneradores, programas de compostaje, etc.
- Al repartir OTRO no surgió ninguna categoría nueva con 3 casos o más. Textiles (2), comercio internacional (1) y responsabilidad corporativa (1) quedaron en OTRO. Todo lo demás encajó en las 7 categorías existentes. Ojo: si se mira el dataset completo y no solo OTRO, TEXTIL, EXPORT y MARCAS sí son problemas recurrentes. Lo que les falta es una categoría propia.
- "CON" (fila 183) se unió a CONTAMINACION por el contexto (conferencia sobre plásticos). Es una inferencia.
- En 8 filas la causa es "Deficiencia/Ineficiencia en la gestión de residuos especiales (RAEE)", que solo repite el nombre de la categoría (6, 56, 187, 189, 360, 363, 393, 532). Las 8 son falsos positivos, así que no afectan las causas de los problemas válidos.

**Sobre el tiempo y la "desatención"**
- Los años miden **qué medios se relevaron**, no cuándo pasa cada problema. 2024–2026 está dominado por Residuos Profesional (81 filas) y Resource Recycling (42), prensa técnica europea y de EE. UU. Los medios cordobeses (El Doce, CBA24N) aparecen casi solo antes de 2024 o sin fecha. Por eso MERCADO y MARCAS parecen "nuevos" y BASURAL parece "viejo", y eso puede ser solo un efecto de la muestra.
- 86 problemas no tienen fecha (sobre todo Infobae, TN y CBA24N). En esos casos el rango de años de la tabla C está incompleto.
- Solo 23 de los 132 problemas válidos mencionan una ubicación en Argentina (12 en Córdoba). 67 no mencionan ninguna. Con estos datos no se puede saber cuánto de lo internacional pasa también en Córdoba.
- "Sin solución en el dataset" quiere decir que los medios relevados no publicaron una. No quiere decir que no exista. Las soluciones del dataset están sesgadas: 87 de 133 son eco-diseño y biomateriales (productos), y 34 no atacan ningún problema identificado (p. ej. 193 centro de mesa, 240 cáscaras de naranja).
- La recurrencia (noticias × fuentes) premia los temas de la prensa técnica, que publica mucho sobre un mismo tema. Sirve para ordenar, no para medir la gravedad.

**Errores de datos detectados al pasar**
- Duplicados del mismo hecho: 44 = 289 (cobras), 371 = 372 (Eureka Recycling), 158 = 444 (PepsiCo). Cuentan como noticias distintas en la tabla C. Sin los duplicados, PLASMAR, DIFICIL y MARCAS bajan 1 cada uno.
- Shein figura como "empresa chilena" en 141 y 414 (es china). La fila 485 dice "gobierno ruso" para Rumanía.
- El archivo `data/resultados/no_patrones/reporte_no_patrones.md` no está en las carpetas del equipo que revisé. No pude contrastar este análisis con el reporte de Lautaro ni con su GapScore.

**Preguntas abiertas para el equipo**
1. ¿El foco es Córdoba? Si es así, la evidencia local es poca (12 filas). Los problemas locales con más señal son BASURAL, ACUM, SERVICIO, TRABSEG y FUEGO, y ninguno tiene una solución en el dataset. ¿Hace falta relevar fuentes locales (municipio, CEAMSE/Córdoba Obras y Servicios, cooperativas de recuperadores) antes de decidir?
2. ¿Por qué casi no aparecen los recuperadores urbanos? Hay solo 1 válido (25) y 3 dudosos, cuando en Córdoba son un actor central. ¿Es una ausencia real o un sesgo de los medios?
3. ¿Validamos los 68 dudosos? Cambian el orden en MERCADO, INCIN y TEXTIL.
4. ¿Cuentan como evidencia las soluciones que aparecen escondidas en filas de problema? Cambian el contraste en PLASMAR y DESCART.
5. ¿Algún problema internacional (MERCADO, MARCAS, EXPORT) tiene un correlato local verificable? En el dataset solo aparece la caída de exportaciones de papel reciclado argentino (375)."""

# ---------------- Excel ----------------
HFONT = Font(name="Arial", bold=True, color="FFFFFF"); HFILL = PatternFill("solid", fgColor="2A78D6")
BODY = Font(name="Arial", size=10)
def sheet(wb, name, df, widths=None):
    ws = wb.create_sheet(name)
    ws.append(list(df.columns))
    for r in df.itertuples(index=False):
        ws.append([None if (isinstance(v, float) and pd.isna(v)) else v for v in r])
    for c in ws[1]:
        c.font = HFONT; c.fill = HFILL; c.alignment = Alignment(wrap_text=True, vertical="top")
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.font = BODY; c.alignment = Alignment(wrap_text=True, vertical="top")
    for i, col in enumerate(df.columns, 1):
        w = (widths or {}).get(col, min(60, max(10, int(df[col].astype(str).str.len().quantile(0.8)) if len(df) else 12)))
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.freeze_panes = "A2"; ws.auto_filter.ref = ws.dimensions
    return ws

wb = Workbook(); wb.remove(wb.active)
fa = P[["fila","fecha","fuente","origen_fuente","url","titulo_problema","descripcion_problema","veredicto","motivo",
        "tipo_problema","cat_norm","cat_final","grupo","problema_unico","ambito","ubicacion_texto","causas_raiz","afectados"]].rename(columns={
        "tipo_problema":"categoria_original","cat_norm":"categoria_normalizada","cat_final":"categoria_final","grupo":"codigo_problema"})
sheet(wb, "A_Filtrado", fa, {"url":30,"titulo_problema":45,"descripcion_problema":50,"motivo":45})

# B con fórmulas sobre A_Filtrado (columna L = categoria_final, H = veredicto, K = categoria_normalizada)
wsB = wb.create_sheet("B_Categorias")
hdr = ["categoria_final","variantes_unidas","n_total","n_validos","n_dudosos","n_falsos_positivos","recibidas_de_OTRO_o_vacio"]
wsB.append(hdr)
for i, r in enumerate(B.itertuples(index=False), start=2):
    wsB.append([r.categoria_final, r.variantes_unidas,
                f'=COUNTIFS(A_Filtrado!$L:$L,A{i})',
                f'=COUNTIFS(A_Filtrado!$L:$L,A{i},A_Filtrado!$H:$H,"VÁLIDO")',
                f'=COUNTIFS(A_Filtrado!$L:$L,A{i},A_Filtrado!$H:$H,"DUDOSO")',
                f'=COUNTIFS(A_Filtrado!$L:$L,A{i},A_Filtrado!$H:$H,"FALSO POSITIVO")',
                r.recibidas_de_OTRO_o_vacio])
n = len(B) + 1
wsB.append(["TOTAL", "", f"=SUM(C2:C{n})", f"=SUM(D2:D{n})", f"=SUM(E2:E{n})", f"=SUM(F2:F{n})", f"=SUM(G2:G{n})"])
wsB.append([]); wsB.append(["Nota: 'recibidas_de_OTRO_o_vacio' es un valor calculado en Python (filas cuya categoría original era OTRO o vacía y se reasignaron). SIN_CATEGORIA = falsos positivos sin categoría original."])
for c in wsB[1]: c.font = HFONT; c.fill = HFILL
for row in wsB.iter_rows(min_row=2):
    for c in row: c.font = BODY; c.alignment = Alignment(wrap_text=True, vertical="top")
for col, w in zip("ABCDEFG", [42, 80, 10, 10, 10, 12, 14]): wsB.column_dimensions[col].width = w
wsB.freeze_panes = "A2"

# C con recurrencia como fórmula
cols = ["codigo","problema","categoria","n_noticias","n_fuentes","recurrencia","n_dudosas","anios","anios_lista","ubicacion",
        "afectados_texto","causas_texto","causas_inferidas","sol_directas","sol_parciales","sol_en_filas_problema","filas_evidencia","filas_dudosas","fuentes"]
wsC = sheet(wb, "C_Problemas_unicos", U[cols], {"problema":45,"afectados_texto":60,"causas_texto":60,"causas_inferidas":50})
for i in range(2, len(U) + 2): wsC[f"F{i}"] = f"=D{i}*E{i}"
wsC.cell(row=len(U) + 3, column=1, value="recurrencia = n_noticias × n_fuentes (solo VÁLIDOS). sol_en_filas_problema = filas etiquetadas como problema que en realidad describen una solución (evidencia secundaria).")

t10 = pd.DataFrame([dict(puesto=i+1, codigo=g, problema=GRUPOS[g], por_que=txt,
                         n_noticias=int(U.set_index("codigo").loc[g, "n_noticias"]), n_fuentes=int(U.set_index("codigo").loc[g, "n_fuentes"]),
                         sol_directas=U.set_index("codigo").loc[g, "sol_directas"], sol_parciales=U.set_index("codigo").loc[g, "sol_parciales"])
                    for i, (g, txt) in enumerate(TOP10)])
sheet(wb, "D_Top10_sin_solucion", t10, {"por_que":90,"problema":40})
sheet(wb, "E_Causas_compartidas", C, {"problemas_texto":80,"problemas_inferidos":50,"causa":40})
sheet(wb, "Actores", A, {"filas_problemas_validos":40,"filas_soluciones":30})
sol = S[["fila","fecha","fuente","nombre_solucion","quien_impulsa","descripcion_solucion","tipo_solucion","tipo_solucion_norm","tipo_problema_objetivo","ataca"]]
sheet(wb, "Soluciones", sol, {"descripcion_solucion":60,"ataca":60,"nombre_solucion":40})
lim = pd.DataFrame({"Límites y preguntas abiertas": [l for l in LIMITES.split("\n") if l.strip()]})
sheet(wb, "F_Limites", lim, {"Límites y preguntas abiertas": 140})
wb.save(f"{OUT}/analisis_problemas_residuos.xlsx")

# ---------------- Gráficos ----------------
BLUE, ORANGE, GRAY, INK, INK2 = "#2a78d6", "#eb6834", "#b8b6ad", "#0b0b0b", "#52514e"
plt.rcParams.update({"font.family": "Arial", "font.size": 10, "axes.edgecolor": "#d6d5ce", "axes.labelcolor": INK2,
                     "xtick.color": INK2, "ytick.color": INK, "figure.facecolor": "#fcfcfb", "axes.facecolor": "#fcfcfb"})

top = U.head(15).iloc[::-1]
fig, ax = plt.subplots(figsize=(12, 7))
colors = [BLUE if d > 0 else ORANGE for d in top.n_sol_directas]
ax.barh(top.problema, top.n_noticias, color=colors, height=0.6)
for y, (n, f, d) in enumerate(zip(top.n_noticias, top.n_fuentes, top.n_sol_directas)):
    ax.text(n + 0.15, y, f"{n} noticias · {f} fuentes · {d} sol. directa" + ("s" if d != 1 else ""), va="center", color=INK2, fontsize=9)
ax.set_xlim(0, top.n_noticias.max() + 7); ax.set_xlabel("Noticias válidas")
ax.spines[["top", "right"]].set_visible(False); ax.grid(axis="x", color="#ecebe6"); ax.set_axisbelow(True)
from matplotlib.patches import Patch
ax.legend(handles=[Patch(color=ORANGE, label="Sin solución directa en el dataset"), Patch(color=BLUE, label="Con al menos una solución directa")],
          loc="upper center", bbox_to_anchor=(0.35, -0.09), ncol=2, frameon=False)
fig.suptitle("Los 15 problemas más recurrentes y si el dataset tiene soluciones directas", x=0.01, ha="left", color=INK, fontsize=12, fontweight="bold")
ax.set_title("Ordenados por recurrencia (noticias × fuentes distintas); el largo de la barra = noticias válidas", loc="left", color=INK2, fontsize=9)
plt.tight_layout(); plt.savefig(f"{OUT}/grafico_problemas_vs_soluciones.png", dpi=160); plt.close()

yy = P.dropna(subset=["anio"]).copy(); yy["anio"] = yy.anio.astype(int)
ct = pd.crosstab(yy.anio, yy.origen_fuente).reindex(columns=["Medio argentino", "Medio internacional", "No determinado"], fill_value=0)
fig, ax = plt.subplots(figsize=(10, 4.8))
bottom = None
for col, colr in zip(ct.columns, [BLUE, ORANGE, GRAY]):
    ax.bar(ct.index.astype(str), ct[col], bottom=bottom, color=colr, label=col, width=0.65, edgecolor="#fcfcfb", linewidth=1.5)
    bottom = ct[col] if bottom is None else bottom + ct[col]
ax.spines[["top", "right"]].set_visible(False); ax.grid(axis="y", color="#ecebe6"); ax.set_axisbelow(True)
ax.set_ylim(0, ct.sum(axis=1).max() * 1.08); ax.set_ylabel("Filas marcadas como problema"); ax.legend(frameon=False, loc="upper left")
ax.set_title(f"Cuántos problemas hay por año depende de qué medios se relevaron ({int(P.anio.isna().sum())} filas sin fecha no se muestran)", loc="left", color=INK, fontsize=11, fontweight="bold")
plt.tight_layout(); plt.savefig(f"{OUT}/grafico_fuentes_por_anio.png", dpi=160); plt.close()

# ---------------- Reporte markdown ----------------
def md(df):
    cols = list(df.columns)
    out = ["| " + " | ".join(cols) + " |", "|" + "---|" * len(cols)]
    for r in df.itertuples(index=False):
        out.append("| " + " | ".join(str(v).replace("|", "/").replace("\n", " ") for v in r) + " |")
    return "\n".join(out)
def cut(s, n): s = str(s); return s if len(s) <= n else s[:n].rsplit(" ", 1)[0] + "…"

vc = P.veredicto.value_counts()
L = []
L.append("# Problemas de gestión de residuos: análisis del dataset de noticias\n")
L.append("Hack to the Future · Córdoba Tech Week · 12 y 13/11/2026 · Track: gestión sostenible de residuos\n")
L.append("> **Actualizado en la etapa 2:** la fila 539 pasó a DUDOSO, el desperdicio alimentario (256) se separó de orgánicos y cuatro soluciones cambiaron de directa a parcial o a ninguna. El detalle está en la hoja *Cambios* del Excel.\n")
L.append(f"**Resumen.** De las 414 filas marcadas como problema, **{vc['VÁLIDO']} son válidas**, {vc['DUDOSO']} son dudosas y {vc['FALSO POSITIVO']} son falsos positivos (51 %). "
         f"Las válidas se agrupan en **{(U.n_noticias>0).sum()} problemas únicos**. Los más recurrentes son la crisis de mercado del reciclaje, la basura plástica en ecosistemas y el incumplimiento de metas de las grandes marcas. "
         f"Ninguno de los tres tiene una solución directa en el dataset. Solo 23 problemas válidos están ubicados en Argentina (12 en Córdoba). Las tablas completas están en `analisis_problemas_residuos.xlsx`.\n")
L.append("Convenciones: los números entre paréntesis o en las columnas de filas son el campo `fila` del CSV. **(inferida)** marca lo que deduje yo y el texto no dice. Los conteos de la tabla C usan solo filas VÁLIDAS.\n")

L.append("## A. Tabla de filtrado (solo falsos positivos y dudosos)\n")
L.append(f"Criterio de válido: describe una situación concreta que perjudica a personas, ecosistemas u organizaciones. Totales: VÁLIDO {vc['VÁLIDO']} · DUDOSO {vc['DUDOSO']} · FALSO POSITIVO {vc['FALSO POSITIVO']}.\n")
a = P[P.veredicto != "VÁLIDO"].sort_values(["veredicto", "fila"])[["fila", "veredicto", "motivo"]]
L.append(md(a) + "\n")

L.append("## B. Categorías normalizadas\n")
L.append("Las variantes cortadas o mal escritas se unieron a su forma completa. RAEE y RCD quedan dentro de GESTION_DEFICIENTE_RESIDUOS_ESPECIALES. OTRO y las filas sin categoría se repartieron entre las categorías existentes según su problema de fondo, y no surgió ninguna categoría nueva con 3 casos o más. "
         "Atención: solo el 39 % de los válidos tiene una categoría original que coincide con su problema de fondo (ver F).\n")
L.append(md(B) + "\n")

L.append("## C. Problemas únicos, ordenados por recurrencia (noticias × fuentes distintas)\n")
L.append("Los textos de afectados y causas están recortados. Las versiones completas, con la fila de cada uno, están en la hoja C del Excel. *Sol. directas / parciales* = filas de `es_solucion`. *Ocultas* = filas marcadas como problema que en realidad describen una solución.\n")
c = U[U.n_noticias > 0].copy()
c["afectados"] = c.afectados_texto.map(lambda s: cut(s, 140))
c["causas"] = (c.causas_texto.map(lambda s: cut(s, 140)) + " · " + c.causas_inferidas.map(lambda s: cut(s, 140))).str.strip(" ·")
c["soluciones existentes (filas)"] = "Directas: " + c.sol_directas + " · Parciales: " + c.sol_parciales + " · Ocultas: " + c.sol_en_filas_problema
c = c.rename(columns={"problema": "nombre", "categoria": "categoría", "n_noticias": "n.º noticias", "n_fuentes": "n.º fuentes",
                      "anios": "años", "filas_evidencia": "filas de evidencia", "ubicacion": "ubicación (texto)"})
L.append(md(c[["nombre", "categoría", "n.º noticias", "n.º fuentes", "recurrencia", "años", "ubicación (texto)", "afectados", "causas", "soluciones existentes (filas)", "filas de evidencia"]]) + "\n")
L.append("Problemas con evidencia solo dudosa (0 válidas): RCD, residuos de construcción (10, 394; con solución directa en 506), y NEUMAT, neumáticos fuera de uso (12, 155).\n")

L.append("## D. Top 10 de problemas recurrentes con pocas o ninguna solución\n")
L.append("Criterio: los de mayor recurrencia que tienen como máximo 1 solución directa. Quedan afuera RAEE (7 directas), TEXTIL (7), ORGAN (9) y DIFICIL (2): son los temas donde el dataset concentra soluciones.\n")
for i, (g, txt) in enumerate(TOP10, 1):
    r = U.set_index("codigo").loc[g]
    L.append(f"**{i}. {GRUPOS[g]}** ({r.n_noticias} noticias, {r.n_fuentes} fuentes, recurrencia {r.recurrencia}). {txt}\n")
L.append(SIGUIENTES + "\n")

L.append("## E. Causas compartidas\n")
L.append("*Problemas (texto)* = el problema tiene al menos una fila válida cuya causa o descripción menciona esa causa (búsqueda por palabras clave, revisada a mano). *Problemas (inferidos)* = yo los asocio, pero el texto no lo dice.\n")
e = C.rename(columns={"causa": "causa", "problemas_texto": "problemas que la comparten (texto, con filas)", "problemas_inferidos": "problemas (inferidos)", "soluciones_que_la_atacan": "soluciones que la atacan (filas)"})
L.append(md(e[["causa", "problemas que la comparten (texto, con filas)", "problemas (inferidos)", "soluciones que la atacan (filas)"]]) + "\n")

L.append("### Actores que aparecen seguido\n")
L.append("Menciones por búsqueda de nombres en título, descripción, afectados y causas (problemas) o en nombre, descripción y quién impulsa (soluciones).\n")
L.append(md(A[["actor", "en_problemas_validos", "filas_problemas_validos", "en_todas_las_filas_problema", "en_soluciones", "filas_soluciones"]]) + "\n")
L.append("Lectura: las grandes marcas (PepsiCo, Coca-Cola, Exxon, Amazon, Apple) aparecen como **causantes** en los problemas y nunca como impulsoras de las soluciones del dataset. Las cooperativas no aparecen ni una vez. Los recuperadores urbanos aparecen en 7 filas, pero solo una es un problema válido (25, protesta contra los contenedores inteligentes). Gobiernos y municipios aparecen sobre todo en noticias de anuncios y políticas, que terminaron como falsos positivos: los gobiernos tienen 22 menciones en total y solo 4 en válidos; los municipios, 12 y 3.\n")

L.append("### Problemas que reaparecen a lo largo de los años\n")
rec = U[U.n_anios_distintos >= 3].sort_values("n_anios_distintos", ascending=False)
L.append(md(rec[["problema", "anios_lista", "n_anios_distintos", "n_noticias"]].rename(columns={"anios_lista": "años con noticias", "n_anios_distintos": "años distintos"})) + "\n")
L.append("Los que se mantienen en el tiempo, abarcando medios viejos y nuevos, son la basura plástica en ecosistemas (2018–2026), los basurales (2016–2020, más 2 sin fecha), los residuos electrónicos (2021–2026) y los incendios en sitios de residuos (2018–2025). Mercado y marcas solo aparecen en 2024–2026, y es justo cuando entra al dataset la prensa técnica internacional (ver F).\n")
L.append("![Problemas vs soluciones](grafico_problemas_vs_soluciones.png)\n")
L.append("![Fuentes por año](grafico_fuentes_por_anio.png)\n")

L.append("## F. Límites del análisis y preguntas abiertas\n")
L.append(LIMITES + "\n")
open(f"{OUT}/reporte_problemas_residuos.md", "w", encoding="utf-8").write("\n".join(L))
print("ok", len(a), len(c))
