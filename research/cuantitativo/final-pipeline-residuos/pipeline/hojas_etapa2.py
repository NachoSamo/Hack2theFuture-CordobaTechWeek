import sys
import pandas as pd
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

sys.stdout.reconfigure(encoding="utf-8")
XL = "../resultados/analisis_problemas_residuos.xlsx"
H = pd.read_pickle("H.pkl"); SL = pd.read_pickle("SL.pkl"); A = pd.read_pickle("algo.pkl")
res, CMP, BOOT = A["res"], A["CMP"], A["BOOT"]

HF = Font(name="Arial", bold=True, color="FFFFFF"); HFILL = PatternFill("solid", fgColor="2A78D6")
BODY = Font(name="Arial", size=10); BOLD = Font(name="Arial", size=10, bold=True)
NOTE = Font(name="Arial", size=9, italic=True, color="52514E"); GREY = PatternFill("solid", fgColor="F0EFEC")
INPUT = Font(name="Arial", size=10, color="0000FF")

def hdr(ws, row, cols):
    for j, c in enumerate(cols, 1):
        cell = ws.cell(row=row, column=j, value=c); cell.font = HF; cell.fill = HFILL
        cell.alignment = Alignment(wrap_text=True, vertical="top")
def body(ws, r0, r1, c1):
    for row in ws.iter_rows(min_row=r0, max_row=r1, max_col=c1):
        for c in row:
            if c.font != BOLD: c.font = BODY
            c.alignment = Alignment(wrap_text=True, vertical="top")
def widths(ws, ws_w):
    for i, w in enumerate(ws_w, 1): ws.column_dimensions[get_column_letter(i)].width = w

wb = load_workbook(XL)
for name in ["Huecos", "Puntuación", "Shortlist", "Algoritmo", "Cambios"]:
    if name in wb.sheetnames: del wb[name]

# ---------------- Huecos ----------------
ws = wb.create_sheet("Huecos")
cols = ["problema", "filas", "n.º de noticias", "n.º de fuentes", "años", "estado", "necesidad",
        "¿abordable con un sistema?", "solidez de la evidencia", "detalle del estado (soluciones citadas y qué queda afuera)", "motivo (abordable)", "código"]
hdr(ws, 1, cols)
orden = {"SIN SOLUCIÓN": 0, "PARCIAL": 1, "CUBIERTO": 2}
Hs = H.assign(o=H.estado.map(orden)).sort_values(["o", "n_noticias", "n_fuentes"], ascending=[True, False, False])
r = 2
for x in Hs.itertuples():
    ws.append([x.problema, x.filas, x.n_noticias, x.n_fuentes, x.anios, x.estado,
               x.necesidad if isinstance(x.necesidad, str) else "— (cubierto: no sigue)",
               x.abordable if isinstance(x.abordable, str) else "—", x.solidez, x.detalle_estado,
               x.motivo_abordable if isinstance(x.motivo_abordable, str) else "—", x.codigo])
    if x.estado == "CUBIERTO":
        for c in ws[ws.max_row]: c.fill = GREY
body(ws, 2, ws.max_row, len(cols))
n = ws.max_row
notas = [
 "«Sin solución» significa sin solución en el dataset. Que los medios relevados no la publiquen no quiere decir que no exista en el mundo.",
 "Solo se cuentan noticias VÁLIDAS. Los duplicados del mismo hecho (289 = 44, 372 = 371, 444 = 158) se cuentan una vez, así que PLASMAR, MARCAS y DIFICIL tienen 1 noticia menos que en la hoja C.",
 "Solidez: ALTA = 5 noticias o más y 4 fuentes o más; BAJA = 1 o 2 noticias; MEDIA = el resto.",
 "Años: si la fila no trae fecha en el CSV, se usa el año de su URL (cambio 9 de la hoja Cambios).",
 "En la columna necesidad, «(inferido)» marca lo que el texto no dice. Las filas en gris (CUBIERTO) quedan solo como registro del paso 1.",
]
for i, t in enumerate(notas): ws.cell(row=n + 2 + i, column=1, value=t).font = NOTE
widths(ws, [38, 22, 10, 10, 18, 14, 80, 14, 12, 70, 55, 10])
ws.freeze_panes = "B2"; ws.auto_filter.ref = f"A1:{get_column_letter(len(cols))}{n}"

# ---------------- Puntuación (total con fórmula sobre pesos editables) ----------------
wp = wb.create_sheet("Puntuación")
cols = ["problema", "impacto", "innovación", "factibilidad", "escalabilidad", "ecosistema", "total ponderado",
        "justificación (una línea)", "solidez de la evidencia", "¿abordable con un sistema?", "código"]
hdr(wp, 1, cols)
G = H[H.estado != "CUBIERTO"].sort_values("total", ascending=False)
for i, x in enumerate(G.itertuples(), start=2):
    wp.append([x.problema, x.impacto, x.innovacion, x.factibilidad, x.escalabilidad, x.ecosistema,
               f"=ROUND((B{i}*$O$2+C{i}*$O$3+D{i}*$O$4+E{i}*$O$5+F{i}*$O$6)/SUM($O$2:$O$6),2)",
               x.justificacion, x.solidez, x.abordable, x.codigo])
last = wp.max_row
body(wp, 2, last, len(cols))
wp["N1"] = "Criterio del jurado"; wp["O1"] = "Peso"
for c in (wp["N1"], wp["O1"]): c.font = HF; c.fill = HFILL
for j, (k, v) in enumerate([("impacto social y ambiental", 0.25), ("innovación", 0.20), ("factibilidad", 0.20),
                            ("escalabilidad", 0.15), ("vínculo con el ecosistema", 0.10)], start=2):
    wp[f"N{j}"] = k; wp[f"O{j}"] = v; wp[f"N{j}"].font = BODY; wp[f"O{j}"].font = INPUT; wp[f"O{j}"].number_format = "0%"
wp["N7"] = "suma de pesos"; wp["O7"] = "=SUM(O2:O6)"; wp["O7"].number_format = "0%"
nt = ["Escala de 1 a 5. Las puntuaciones son criterio del analista y se basan en lo que dicen las filas citadas, no en una medición.",
      "El pitch (10 %) no se puntúa: es de la presentación, no del problema. El total se normaliza sobre el 90 % restante.",
      "Los pesos (en azul) se pueden editar y el total se recalcula solo.",
      "Innovación = qué tan poco cubierto está el problema en el dataset, no la novedad de una solución.",
      "Ecosistema = evidencia en Córdoba o Argentina en las filas y actores locales que se mencionan."]
for i, t in enumerate(nt): wp.cell(row=9 + i, column=14, value=t).font = NOTE
widths(wp, [42, 9, 10, 11, 12, 11, 11, 80, 11, 12, 10, 2, 2, 30, 8])
wp.freeze_panes = "B2"; wp.auto_filter.ref = f"A1:K{last}"

# ---------------- Shortlist ----------------
SLT = {
 "BASURAL": dict(
  nec="Los vecinos de barrios y localidades necesitan que no se formen basurales a cielo abierto cerca de sus casas y de su agua, y hoy aparecen sin control y se denuncian cuando ya existen (30, 274).",
  hueco="SIN SOLUCIÓN en el dataset. 7 noticias de 4 fuentes (8, 30, 65, 274, 283, 298, 400), 3 en Córdoba (30, 274, 400). La única referencia a un cierre está dentro de la misma noticia (400, 22 millones de pesos). Se relaciona con FUEGO (294: incendio en un basural). Queda en el top 10 por recurrencia en el 84 % de los remuestreos.",
  act_txt="Vecinos de San Vicente (30) y de La Quebrada, Huerta Grande (274); un trabajador del basural de Luján (298); la población de Tancacha y el Gobierno provincial de Córdoba (400); turistas y residentes de Bariloche (65).",
  act_inf="(inferido) Los municipios responsables de la disposición y los recuperadores informales que trabajan en los basurales.",
  hmw1="¿Cómo podríamos detectar un basural cuando empieza a formarse, y no cuando ya está a 150 m de la cisterna del pueblo (274)?",
  hmw2="¿Cómo podríamos hacer que la denuncia de un vecino (30) llegue a quien puede actuar y que se sepa qué pasó con ella?",
  val="¿Cuántos basurales hay hoy en Córdoba y quién los registra? ¿Qué pasa hoy con una denuncia vecinal? ¿El cuello de botella es saber dónde están (información) o tener dónde llevar la basura (infraestructura, que un sistema no resuelve)? Hablar con vecinos afectados, el área ambiental municipal y el organismo provincial (inferido). Las noticias locales son de 2016–2020: hay que verificar que el problema siga vigente."),
 "ACUM": dict(
  nec="Los vecinos y comerciantes de zonas con mucha actividad necesitan que la basura no se acumule en la calle después de los picos (fines de semana largos, Carnaval), y hoy queda con ratas y olores (284, 306, 373).",
  hueco="SIN SOLUCIÓN en el dataset. 6 noticias de 2 fuentes (170, 212, 284, 306, 373, 542), 3 en Córdoba (170, 284, 306). Ninguna noticia da causas: que la recolección no se adapte a los picos es inferido. Queda en el top 10 por recurrencia en el 59 % de los remuestreos.",
  act_txt="Vecinos de Güemes (306); comerciantes, compradores y visitantes del Mercado Norte (284). La fila 306 menciona la concentración de bares y restaurantes.",
  act_inf="(inferido) La Municipalidad de Córdoba o la empresa de recolección y los comercios gastronómicos.",
  hmw1="¿Cómo podríamos anticipar los picos de basura (fines de semana largos, Carnaval) para que la calle no quede llena al día siguiente?",
  hmw2="¿Cómo podríamos saber dónde se acumula la basura antes de que aparezcan ratas y enfermedades (212, 373)?",
  val="¿La causa es la frecuencia de recolección, la falta de contenedores o el comportamiento de quienes generan la basura? (el texto no lo dice). ¿Cuánto dura la acumulación? ¿Qué datos tiene hoy el prestador sobre los picos? Hablar con vecinos de Güemes, puesteros del Mercado Norte y el área de recolección."),
 "TRABSEG": dict(
  nec="Los recolectores y trabajadores de basurales necesitan trabajar sin riesgo de morir o de ser asaltados, y hoy hay fallas de seguridad y de uso del equipo de protección (107) e inseguridad en los barrios (209).",
  hueco="SIN SOLUCIÓN en el dataset. 3 noticias de 3 fuentes (107, 209, 309): dos muertes por aplastamiento (107 en un basural cordobés, 309) y asaltos en Villa Siburu, Córdoba (209). Es el problema con mayor impacto humano, pero tiene evidencia MEDIA y está en el borde del ranking (17 % de probabilidad de top 10). Un sistema solo lo aborda en parte.",
  act_txt="Sergio López, recolector (107); vecinos de Villa Siburu (209).",
  act_inf="(inferido) Las empresas de recolección, el municipio, las cooperativas y los trabajadores informales de los basurales.",
  hmw1="¿Cómo podríamos saber dónde y cuándo corren más riesgo los trabajadores de residuos?",
  hmw2="¿Cómo podríamos hacer que un incidente (asalto, accidente) quede registrado y llegue a quien puede prevenir el siguiente?",
  val="¿Qué riesgos priorizan los propios trabajadores? ¿Hay registros de incidentes? ¿El problema es sobre todo de equipamiento y formalización (que un sistema no resuelve) o falta información? Hablar con recolectores formales, recuperadores de basurales y gremios o cooperativas."),
 "FUEGO": dict(
  nec="Vecinos, bomberos y operadores necesitan prevenir los incendios en basurales y acopios de reciclables, y hoy hay acopios sin medidas contra incendio y basurales que se queman (22, 294, 451).",
  hueco="SIN SOLUCIÓN en el dataset. 4 noticias de 4 fuentes distintas (22, 188, 294, 451): un depósito de plásticos en Freyre, Córdoba (22); un choque de seis camiones por el incendio de un basural en la ruta 9 (294); quema de residuos en Sudáfrica (188); un acopio sancionado por riesgo de incendio en Australia (451). Queda en el top 10 en el 44 % de los remuestreos.",
  act_txt="Bomberos voluntarios y profesionales y la comunidad de Freyre (22); Kangaroo Plastics Technology y la EPA de Victoria (451); comunidades sudafricanas (188).",
  act_inf="(inferido) Los operadores de acopios y basurales, los municipios y Vialidad (por la ruta 9, fila 294).",
  hmw1="¿Cómo podríamos saber qué acopios o basurales tienen más riesgo de incendio antes de que se prendan fuego?",
  hmw2="¿Cómo podríamos avisar a tiempo a quienes circulan cerca de un basural en llamas (294)?",
  val="¿Con qué frecuencia se queman los basurales en Córdoba? (el dataset tiene un solo caso local). ¿Quién controla los acopios de reciclables? ¿Hay datos de focos de incendio? Hablar con bomberos voluntarios, operadores de acopios y el área de ambiente."),
 "AGRO": dict(
  nec="Las comunidades rurales necesitan que los envases vacíos de agroquímicos se recolecten, y hoy solo se recicla el 8 % y la trazabilidad está en desarrollo (36, 49).",
  hueco="PARCIAL: la única solución, 332 (envase reciclado), ataca un problema vecino, y 446 (Canadá) está marcada como problema. 2 noticias de 2 fuentes (36, 49). Evidencia BAJA y vieja (2020–2021): entra a la shortlist como excepción porque es abordable con un sistema y tiene la puntuación más alta, pero es la primera que hay que validar.",
  act_txt="Comunidad rural y empresas de fitosanitarios (36); comunidad agrícola y 'actitudes ilegales de las empresas' (49); nueve centros de almacenamiento transitorio (36).",
  act_inf="(inferido) Productores, aplicadores, distribuidores y el organismo de control provincial. Córdoba es una provincia agrícola, pero el texto habla de Buenos Aires y la pampa húmeda.",
  hmw1="¿Cómo podríamos saber dónde termina cada envase vacío desde que se vende hasta que se recicla?",
  hmw2="¿Cómo podríamos hacer que devolver un envase le resulte al productor más fácil que tirarlo?",
  val="¿Cómo funciona hoy en Córdoba el sistema de gestión de envases fitosanitarios? ¿La trazabilidad ya está resuelta desde 2021? ¿Por qué se descartan ilegalmente? Hablar con productores, centros de acopio y la autoridad de aplicación."),
}
wsl = wb.create_sheet("Shortlist")
cols = ["puesto", "problema", "necesidad (una frase)", "por qué es un hueco (filas)", "actores en las noticias (texto)", "actores (inferidos)",
        "¿Cómo podríamos…? 1", "¿Cómo podríamos…? 2", "qué validar con personas reales", "solidez", "total ponderado", "código"]
hdr(wsl, 1, cols)
for i, x in enumerate(SL.itertuples(), 1):
    d = SLT[x.codigo]
    wsl.append([i, x.problema, d["nec"], d["hueco"], d["act_txt"], d["act_inf"], d["hmw1"], d["hmw2"], d["val"], x.solidez, x.total, x.codigo])
body(wsl, 2, wsl.max_row, len(cols))
k = wsl.max_row + 2
for t in ["Regla de selección: los 4 huecos con mayor total ponderado que son abordables (SÍ o PARCIAL) y tienen evidencia ALTA o MEDIA, más 1 de evidencia BAJA si es abordable SÍ (AGRO).",
          "BASURAL, ACUM, FUEGO y TRABSEG comparten actores y territorio: los cuatro tratan de la cadena municipal de residuos en Córdoba (recolección, basurales, trabajadores). Puede convenir verlos como un mismo frente.",
          "Quedan afuera, aunque tienen evidencia ALTA y son abordables: MARCAS (total 3,17), PLASMAR (3,11) y MERCADO (3,06). Ninguno tiene casos en Córdoba en el dataset.",
          "Esta hoja termina en la necesidad. Las preguntas «¿Cómo podríamos…?» no son soluciones."]:
    wsl.cell(row=k, column=2, value=t).font = NOTE; k += 1
widths(wsl, [7, 34, 50, 60, 45, 40, 40, 40, 60, 9, 9, 9])
wsl.freeze_panes = "C2"

# ---------------- Algoritmo ----------------
wa = wb.create_sheet("Algoritmo")
hdr(wa, 1, ["sección", "contenido"])
fp_pct = round(100 * res["share_fp_en_huecos"])
TXT = [
 ("1. Regla usada para decidir que algo es un hueco",
  "a) La fila describe un problema concreto que perjudica a alguien (VÁLIDO). "
  "b) Se agrupa con otras filas que hablan del mismo problema de fondo (problema único). "
  "c) Se buscan filas de solución (es_solucion) que ataquen ese mismo problema, leyendo su texto. "
  "d) Si una lo ataca de frente, el problema queda CUBIERTO; si ataca solo una parte o un problema vecino, PARCIAL; si no hay nada, SIN SOLUCIÓN. Hueco = PARCIAL o SIN SOLUCIÓN. "
  "e) Se ordena por recurrencia (noticias × fuentes, sin duplicados) y se marca la solidez de la evidencia."),
 ("2a. Pasos automatizables de forma confiable",
  "Normalizar categorías (reglas de prefijo: las 27 variantes escritas se reducen a 8 categorías sin error). Contar noticias, fuentes y años. Calcular recurrencia, solidez y sensibilidad. "
  "Hay dos pasos que se pueden automatizar pero necesitan revisión. Los duplicados: solo uno de los tres tenía el título idéntico (158 = 444); los otros (44 = 289, 371 = 372) requieren comparación aproximada. "
  "La ubicación por palabras clave: dio falsos aciertos, como «Amazon» leído como Amazonía o «Mercado Norte» leído como causa de mercado."),
 ("2b. Pasos que necesitaron lectura y criterio",
  "Filtrar falsos positivos: el clasificador automático anterior ya había dejado un 51 % de falsos positivos (213 de 414). "
  "Agrupar en problemas únicos: la categoría original coincide con el problema de fondo solo en el 39 % de los válidos. "
  f"Vincular soluciones con problemas: tipo_problema_objetivo está vacío en {res['soluciones_total'] - res['soluciones_con_objetivo']} de {res['soluciones_total']} soluciones, y en 14 de las 29 restantes dice «RAEE». "
  "Decidir entre directa y parcial: al releer en esta etapa corregí 4 soluciones (hoja Cambios). Redactar la necesidad y puntuar. "
  "Un modelo de lenguaje podría proponer veredictos y grupos, pero sin revisión humana repetiría el problema de origen."),
 ("3. Efecto de los falsos positivos",
  f"Regla automática posible con las columnas del CSV: una fila-problema es hueco si ninguna solución declara (en tipo_problema_objetivo) atacar su categoría. "
  f"Sin filtrar, esa regla marca {res['huecos_ingenuos_total']} filas como hueco, y {res['fp_hueco']} de ellas ({fp_pct} %) son falsos positivos de la tabla de filtrado. "
  f"Entre esos falsos huecos hay {res['fp_hueco_soluciones_disfrazadas']} filas que en realidad describen soluciones. A eso se suman {res['du_hueco']} dudosos. "
  f"Además, la regla coincide con mi lectura en solo {res['coinciden']} de {res['grupos']} problemas únicos. Marca como cubiertos {len(res['ingenuo_cubre_pero_es_hueco'])} problemas que son huecos, entre ellos BASURAL, ACUM y FUEGO de la shortlist, porque una sola solución (255) declara atacar la «disposición final». "
  f"Y marca como huecos {', '.join(res['ingenuo_hueco_pero_cubierto'])}, que están cubiertos, porque sus filas tienen categorías equivocadas. "
  "Si además se sumaran los dudosos a los conteos, MERCADO pasaría de 12 a 20 noticias e INCIN de 1 a 5 (hoja C)."),
 ("4. ¿Alcanzan las noticias?",
  f"Hay {res['loo_n']} noticias válidas sin duplicados, y {res['con_1_o_2_noticias']} de los {res['grupos_total']} problemas únicos tienen 1 o 2 noticias. "
  f"Si se saca una sola noticia, el top 10 por recurrencia cambia en {res['loo_cambia_top10']} de {res['loo_n']} casos (filas {', '.join(map(str, res['loo_filas']))}; todas de FUEGO o DESCART, que están en el borde). "
  "Con 2000 remuestreos, los cuatro primeros (MERCADO, PLASMAR, MARCAS, PLASPROD) quedan en el top 10 en el 88 % de los casos o más, BASURAL en el 84 % y MICRO en el 81 %. "
  "Del puesto 7 para abajo, la probabilidad cae al 17–71 % (ver tabla). ACUM 59 %, FUEGO 44 %, TRABSEG 17 %. "
  f"El estado es todavía más frágil: los {res['sin_sol_con_0']} problemas SIN SOLUCIÓN cambiarían con una sola solución publicada, y lo que se publica depende de qué medios se relevan. "
  "La cabeza del ranking es confiable; el resto y el estado de solución no lo son."),
 ("5. Conclusión",
  f"Conviene una mezcla. Vale la pena automatizar lo mecánico (normalización, conteos, duplicados aproximados, recurrencia, sensibilidad y ubicación con revisión), porque es confiable y ahorra trabajo si el dataset se actualiza. "
  f"No vale la pena automatizar la detección completa de huecos con estos datos: la regla disponible acierta en {res['coinciden']} de {res['grupos']} problemas y 6 de cada 10 «huecos» que encuentra son falsos positivos. "
  "Filtrar, agrupar y vincular soluciones necesitó lectura. Para la hackathon alcanza con este análisis. "
  "Si el equipo quiere seguir, lo que más rendiría es un clasificador «problema / solución / no relevante» revisado a mano sobre una muestra. "
  "El límite principal no es el método sino la cobertura: hay poca evidencia local (12 filas de Córdoba)."),
]
for s, c in TXT:
    wa.append([s, c]); wa.cell(row=wa.max_row, column=1).font = BOLD
body(wa, 2, wa.max_row, 2)
for rr in range(2, wa.max_row + 1): wa.cell(row=rr, column=1).font = BOLD
r0 = wa.max_row + 2
wa.cell(row=r0, column=1, value="Tabla 3 · Regla automática vs. lectura, por problema único").font = BOLD
hdr(wa, r0 + 1, ["código", "categoría mayoritaria (original)", "regla automática", "lectura", "coincide"])
for i, x in enumerate(CMP.itertuples(), start=r0 + 2):
    for j, v in enumerate([x.codigo, x.cat_mayoritaria, x.ingenuo, x.lectura, "sí" if x.coincide else "no"], 1):
        wa.cell(row=i, column=j, value=v).font = BODY
r1 = r0 + 2 + len(CMP) + 1
wa.cell(row=r1, column=1, value="Tabla 4 · Estabilidad del ranking por recurrencia (2000 remuestreos de noticias)").font = BOLD
hdr(wa, r1 + 1, ["código", "puesto base", "recurrencia base", "prob. de quedar en el top 10", "puesto p10", "puesto p90"])
for i, x in enumerate(BOOT.itertuples(), start=r1 + 2):
    for j, v in enumerate([x.codigo, x.puesto_base, x.recurrencia_base, x.prob_top10, x.puesto_p10, x.puesto_p90], 1):
        c = wa.cell(row=i, column=j, value=v); c.font = BODY
        if j == 4: c.number_format = "0%"
wa.cell(row=r1 + 2 + len(BOOT) + 1, column=1, value="p10/p90: entre qué puestos queda el problema en el 80 % central de los remuestreos. Valores calculados en Python (algoritmo.py), semilla 7.").font = NOTE
widths(wa, [34, 150, 18, 18, 12, 12])

# ---------------- Cambios ----------------
wc = wb.create_sheet("Cambios")
cols = ["n.º", "qué cambió", "filas", "antes", "después", "motivo", "efecto"]
hdr(wc, 1, cols)
CH = [
 (1, "Veredicto", "539", "VÁLIDO (DIFICIL)", "DUDOSO", "El perjuicio es proyectado («podría contaminar»), no observado. Mismo criterio que la fila 208, que ya era DUDOSA.", "Válidos: 133 → 132. DIFICIL: 7 → 6 noticias."),
 (2, "Agrupamiento", "256", "ORGAN (orgánicos y desperdicio juntos)", "DESPERD (nuevo: desperdicio de alimentos)", "Evitar el desperdicio es distinto de tratar los restos: las soluciones de compostaje tratan, no previenen. Juntarlos ocultaba un hueco.", "Problemas únicos: 35 → 36. ORGAN (80) queda CUBIERTO; DESPERD queda PARCIAL."),
 (3, "Solución directa → parcial", "92 (SEPAR)", "directa", "parcial", "No tiene descripción y es un programa universitario, no de hogares.", "SEPAR deja de tener solución directa."),
 (4, "Solución directa → parcial", "74 (TURISMO)", "directa", "parcial", "No tiene descripción («La sustentabilidad se impuso en el Cosquín Rock»).", "TURISMO deja de tener solución directa."),
 (5, "Solución directa → parcial", "440 (COMPOST)", "directa", "parcial", "Es una metodología para medir la biodegradabilidad; no resuelve el etiquetado ni el destino del envase.", "COMPOST deja de tener solución directa."),
 (6, "Solución parcial → no ataca", "340 (MARCAS)", "parcial", "ninguno", "Es un anuncio de metas voluntarias de Danone, del mismo tipo que el problema critica.", "MARCAS queda solo con 131."),
 (7, "Conteo", "289, 372, 444", "contadas como noticias aparte", "contadas una vez en esta etapa", "Son el mismo hecho que 44, 371 y 158.", "En Huecos, Puntuación y Algoritmo: PLASMAR 10 → 9, MARCAS 10 → 9, DIFICIL 6 → 5. La hoja C conserva los conteos con duplicados."),
 (8, "Regeneración", "—", "—", "—", "Las hojas A, B, C, D, E, Actores, Soluciones y el reporte .md se regeneraron con los cambios 1 a 6.", "Los textos del Top 10 (hoja D) no cambian."),
 (9, "Años (etapa 3)", "107, 209, 309, 99, 65, 212, 373, 542, 294 y otras", "«sin fecha» cuando la columna fecha del CSV estaba vacía", "año tomado de la URL de la noticia (/AAAA/MM/DD/)", "La URL trae la fecha de publicación. Al redactar las fichas se vio que varios problemas figuraban sin fecha aunque la fecha estaba disponible.", "Cambia solo la columna años de Huecos (por ejemplo, TRABSEG: sin fecha → 2022–2026; SERVICIO: 2012–2015 → 2012–2024). Conteos, solidez y puntajes no cambian."),
 (10, "Redacción de necesidades (etapa 3)", "RECUP (25), TRABSEG (107), SERVICIO (99), MICRO (121), VERTIDO (181, 503)", "frases que decían más que la fila", "frases ajustadas a lo que dice el texto", "RECUP: la fila 25 no dice el motivo de la protesta. TRABSEG: la fila 107 habla de «uso incorrecto» del equipo, no de falta. SERVICIO: el vuelco de un camión (99) no cortó el servicio. MICRO: la fila 121 habla de patógenos adheridos a microplásticos. VERTIDO: «se detectan tarde» no estaba en ninguna fila.", "Cambia la columna necesidad de Huecos y la de Shortlist (TRABSEG). Puntajes y estados no cambian."),
]
for row in CH: wc.append(list(row))
body(wc, 2, wc.max_row, len(cols))
widths(wc, [5, 24, 16, 26, 26, 60, 50])
wb.save(XL)
print("ok", wb.sheetnames)
