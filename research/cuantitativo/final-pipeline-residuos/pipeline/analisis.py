import re, json, sys, warnings
warnings.filterwarnings("ignore")
import pandas as pd
from etiquetas import GRUPOS, CAT_GRUPO, V, D, F, SOL, SOL_EN_PROBLEMAS

sys.stdout.reconfigure(encoding="utf-8")
df = pd.read_csv("residuos_clasificado_final.csv")
df["anio"] = pd.to_numeric(df.fecha.str[:4], errors="coerce")

# ---------- 2. Normalización de categorías ----------
CANON = ["CONTAMINACION_ECOSISTEMICA_Y_PLASTICOS", "GESTION_DEFICIENTE_RESIDUOS_ESPECIALES",
         "CONFLICTO_TERRITORIAL_Y_LABORAL", "COLAPSO_Y_SATURACION_DISPOSICION_FINAL",
         "BARRERAS_DE_MERCADO_Y_ECONOMICAS", "DESPERDICIO_ALIMENTARIO_Y_ORGANICOS",
         "ESTANCAMIENTO_SEPARACION_Y_RECICLAJE", "OTRO_PROBLEMA_RESIDUOS"]

def norm_cat(x):
    if pd.isna(x): return None
    s = x.strip().upper().replace(" ", "_")
    if s.startswith("CON") and not s.startswith("CONF"):
        return "CONTAMINACION_ECOSISTEMICA_Y_PLASTICOS"      # CON, CONT, CONTAM... (CON se asume contaminación)
    if s.startswith("CONF"): return "CONFLICTO_TERRITORIAL_Y_LABORAL"
    if s.startswith("GESTION") or s.startswith("ELECTRONICOS"):
        return "GESTION_DEFICIENTE_RESIDUOS_ESPECIALES"       # incluye ..._RAEE, ..._RCD, cortadas
    if s.startswith("COLAPSO"): return "COLAPSO_Y_SATURACION_DISPOSICION_FINAL"
    if s.startswith("BARRERAS"): return "BARRERAS_DE_MERCADO_Y_ECONOMICAS"
    if s.startswith("DESP"): return "DESPERDICIO_ALIMENTARIO_Y_ORGANICOS"
    if s.startswith("ESTANC"): return "ESTANCAMIENTO_SEPARACION_Y_RECICLAJE"
    if s.startswith("OTRO"): return "OTRO_PROBLEMA_RESIDUOS"
    return "??" + s

P = df[df.es_problema].copy()
P["cat_norm"] = P.tipo_problema.map(norm_cat)
def ver(f): return "VÁLIDO" if f in V else ("DUDOSO" if f in D else "FALSO POSITIVO")
P["veredicto"] = P.fila.map(ver)
P["motivo"] = P.fila.map(lambda f: D[f][0] if f in D else F.get(f, ""))
P["grupo"] = P.fila.map(lambda f: V.get(f) or (D[f][1] if f in D else None))
P["problema_unico"] = P.grupo.map(lambda g: GRUPOS.get(g) if g else None)

# Reparto de OTRO / vacíos: a una categoría existente si el grupo encaja; a una nueva solo si suma >=3 casos.
cand = P[(P.veredicto != "FALSO POSITIVO") & (P.cat_norm.isna() | (P.cat_norm == "OTRO_PROBLEMA_RESIDUOS"))]
prop = cand.grupo.map(lambda g: CAT_GRUPO.get(g, "OTRO_PROBLEMA_RESIDUOS") if g else "OTRO_PROBLEMA_RESIDUOS")
nuevas_ok = {c for c, n in prop.value_counts().items() if c not in CANON and n >= 3}
def cat_final(r):
    if r.veredicto == "FALSO POSITIVO":
        return "SIN_CATEGORIA" if pd.isna(r.cat_norm) else r.cat_norm
    if pd.isna(r.cat_norm) or r.cat_norm == "OTRO_PROBLEMA_RESIDUOS":
        c = CAT_GRUPO.get(r.grupo, "OTRO_PROBLEMA_RESIDUOS") if r.grupo else "OTRO_PROBLEMA_RESIDUOS"
        return c if (c in CANON or c in nuevas_ok) else "OTRO_PROBLEMA_RESIDUOS"
    return r.cat_norm
P["cat_final"] = P.apply(cat_final, axis=1)
P["cat_sugerida_por_grupo"] = P.grupo.map(lambda g: CAT_GRUPO.get(g) if g else None)

# ---------- Ubicación (solo si aparece en el texto) ----------
LUG = {
 "Córdoba (ciudad/provincia)": r"C[oó]rdoba|Huerta Grande|Tancacha|San Vicente|G[uü]emes|Mercado Norte|Villa Siburu|Freyere|Lusa|Villa Mart[ií]nez|Malague[ñn]o",
 "Buenos Aires / CABA / AMBA": r"Buenos Aires|porte[ñn]|Palermo|Luj[aá]n|Riachuelo|Ceamse|CEAMSE|Belgrano|Vicente L[oó]pez|Olavarr[ií]a|Bah[ií]a Blanca|Berazategui",
 "Argentina (otras)": r"Argentin|pampa h[uú]meda|Tucum[aá]n|Santa Fe|Bariloche|Concordia|Entre R[ií]os|Resistencia|Misiones",
 "España": r"Espa[ñn]|Catalu|Galicia|Madrid|Barcelona|Euskadi|Vasco|Arag[oó]n|Cantabria|Canarias|Zaragoza|Guadalajara|Mataró",
 "Europa / UE": r"Europ|\bUE\b|OCDE|Balcanes|Italia|Rumania|Ruman[ií]a",
 "Reino Unido": r"Reino Unido|brit[aá]nic|Inglaterra|Leicester|Oxfordshire|Gales|Gran Breta",
 "EE.UU.": r"EE\.? ?UU|Estados Unidos|estadounidense|California|Texas|Minneapolis|Pensilvania|Pittsburgh|Colorado|Houston|Nueva York|Nueva Orleans|Connecticut|Miami",
 "Australia": r"Australia|NSW|Nueva Gales|Victoria|Shoalhaven|Sydney",
 "América Latina (otros)": r"Colombia|Bogot[aá]|M[eé]xic|CDMX|Per[uú]|Lima|Marbella|Chile|Brasil|Amazon[ií]a|Gal[aá]pagos|Cuba|Panam[aá]|Latinoam",
 "Asia / África / Medio Oriente": r"Turqu[ií]a|Sri Lanka|Gaza|Beirut|Sud[aá]frica|Malasia|Jap[oó]n|Egipto|Tailandia|India",
}
def lugares(r):
    t = " ".join(str(x) for x in [r.titulo_problema, r.descripcion_problema, r.afectados] if pd.notna(x))
    return [k for k, rx in LUG.items() if re.search(rx, t)]
P["ubicacion_texto"] = P.apply(lambda r: "; ".join(lugares(r)), axis=1)
def ambito(u):
    if "Córdoba" in u: return "Córdoba"
    if "Buenos Aires" in u or "Argentina" in u: return "Argentina (no Córdoba)"
    if u: return "Internacional"
    return "Sin ubicación en el texto"
P["ambito"] = P.ubicacion_texto.map(ambito)
# Amazon (empresa) dispara 'Amazonía' por error: corregir
P.loc[P.fila.isin([78, 119]), "ubicacion_texto"] = P.loc[P.fila.isin([78, 119]), "ubicacion_texto"].str.replace("América Latina (otros)", "").str.strip("; ")
P["ambito"] = P.ubicacion_texto.map(ambito)

# ---------- Soluciones ----------
S = df[df.es_solucion].copy()
S["tipo_solucion_norm"] = S.tipo_solucion.map(lambda x: None if pd.isna(x) else (
    "ECO_DISENO_Y_BIOMATERIALES" if x.upper().startswith("ECO_D") or x.upper() == "EC" else
    "MODELOS_CIRCULARES_Y_REUTILIZACION" if x.upper().startswith(("MODELO", "ECONOMIA CIRCULAR")) else
    "OTRA_SOLUCION_RESIDUOS" if x.upper().startswith("OTRA") else
    "UPCYCLING_Y_VALORIZACION_MATERIAL" if "VALORIZACION" in x.upper() else
    "GESTION_DEFICIENTE_RESIDUOS_ESPECIALES" if x.upper().startswith("GESTION") else x))
S["ataca"] = S.fila.map(lambda f: "; ".join(f"{GRUPOS[g]} ({t})" for g, t in SOL.get(f, [])) or "Ningún problema único identificado")

# ---------- 3/4. Problemas únicos ----------
CAUSA_INF = {
 "BASURAL":"Falta de infraestructura municipal de disposición; incumplimiento de normativa provincial (fila 274 lo dice); poca fiscalización",
 "RELLENO":"Crecimiento de la generación sin cambio de modelo de gestión; disputas entre jurisdicciones (fila 387)",
 "FUEGO":"Acopios sin medidas contra incendio (fila 451 lo dice); quema como forma de eliminación",
 "ACUM":"Frecuencia de recolección insuficiente frente a picos (bares, carnaval); falta de contenedores",
 "SERVICIO":"Conflictos gremiales en el servicio (filas 267, 272); dependencia de un único prestador",
 "TRABSEG":"Trabajo informal en basurales sin protección; inseguridad urbana en recorridos",
 "RECUP":"Cambios en el sistema de contenedores que afectan el acceso al material",
 "SEPAR":"Falta de cestos diferenciados (fila 101 lo dice); salida de recuperadores en pandemia (fila 32)",
 "TASAS":"Infraestructura y políticas insuficientes para alcanzar metas",
 "PLASPROD":"La producción crece más rápido que la capacidad de reciclaje (filas 359, 533 lo dicen)",
 "DESCART":"Modelos de consumo de un solo uso (delivery, eventos)",
 "PLASMAR":"Mala gestión en tierra que termina en cursos de agua; vertederos desbordados (fila 45 lo dice)",
 "MICRO":"Degradación de plásticos y desgaste de neumáticos; tratamiento de aguas que no los retiene",
 "MARCAS":"Compromisos voluntarios sin control externo; incentivos económicos para seguir con envases descartables",
 "MERCADO":"Material virgen más barato; importaciones; costos energéticos; regulaciones fragmentadas (filas 420, 442, 466 lo dicen)",
 "DIFICIL":"Diseño de envases con formatos/materiales sin valor de recuperación",
 "COMPOST":"Certificaciones que no reflejan condiciones reales de compostaje; etiquetado confuso (fila 102)",
 "EXPORT":"Costos menores de gestión en países receptores; controles débiles",
 "IMPRECI":"Tecnologías de alto consumo energético; fricción mecánica que libera partículas",
 "INCIN":"Falta de alternativas de disposición; presión por generar energía",
 "AGRO":"Implementación débil de la ley de envases fitosanitarios (fila 49 lo dice)",
 "RAEE":"Obsolescencia rápida (fila 302 lo dice); ausencia de canales de recolección diferenciada",
 "PATOG":"Picos de generación (COVID); controles insuficientes en la cadena de tratamiento",
 "PELIG":"Fallas de control en plantas de tratamiento de residuos peligrosos",
 "TEXTIL":"Moda rápida y producción masiva (filas 154, 438 lo dicen); falta de recolección separada",
 "ORGAN":"Falta de infraestructura y de políticas de compostaje (fila 80 lo dice)",
 "DESPERD":"Falta de conciencia y de infraestructura (fila 256 lo dice)",
 "VERTIDO":"Costos de disposición legal; fiscalización insuficiente",
 "TURISMO":"Falta de educación ambiental y de servicios en sitios turísticos (fila 16 lo dice)",
 "DESASTRE":"Eventos extremos que superan la capacidad de recolección",
 "TRAZA":"Gestión manual sin sistemas de seguimiento (fila 481 lo dice)",
 "INODORO":"Hábitos de descarte en el hogar",
}

rows = []
for g, nombre in GRUPOS.items():
    sub = P[(P.grupo == g) & (P.veredicto == "VÁLIDO")]
    subd = P[(P.grupo == g) & (P.veredicto == "DUDOSO")]
    if len(sub) == 0 and len(subd) == 0: continue
    n = len(sub); nf = sub.fuente.nunique()
    yrs = sub.anio.dropna()
    sin_fecha = int(sub.anio.isna().sum())
    anos = (f"{int(yrs.min())}–{int(yrs.max())}" if len(yrs) else "sin fecha") + (f" (+{sin_fecha} sin fecha)" if sin_fecha and len(yrs) else "")
    anos_dist = sorted(int(a) for a in yrs.unique())
    afect = "; ".join(f"{a} [{f}]" for f, a in zip(sub.fila, sub.afectados) if pd.notna(a))
    causas_txt = "; ".join(f"{c} [{f}]" for f, c in zip(sub.fila, sub.causas_raiz)
                          if pd.notna(c) and not re.search(r"Deficiencia en la gesti[oó]n de residuos especiales|Ineficiencia en la gesti[oó]n de residuos especiales", c))
    ubic = sorted({u for x in sub.ubicacion_texto for u in x.split("; ") if u})
    sol_dir = [f for f, l in SOL.items() if (g, "directa") in l]
    sol_par = [f for f, l in SOL.items() if (g, "parcial") in l]
    sol_oc = [f for f, gg in SOL_EN_PROBLEMAS.items() if gg == g]
    rows.append(dict(
        codigo=g, problema=nombre, categoria=CAT_GRUPO[g], n_noticias=n, n_fuentes=nf,
        recurrencia=n * nf, n_dudosas=len(subd), anios=anos, n_anios_distintos=len(anos_dist),
        anios_lista=", ".join(map(str, anos_dist)),
        ubicacion=", ".join(ubic) or "No mencionada",
        afectados_texto=afect or "No informado en el texto",
        causas_texto=causas_txt or "Sin causas en el texto",
        causas_inferidas="(inferida) " + CAUSA_INF[g] if g in CAUSA_INF else "",
        sol_directas=", ".join(map(str, sorted(sol_dir))) or "—",
        sol_parciales=", ".join(map(str, sorted(sol_par))) or "—",
        n_sol_directas=len(sol_dir), n_sol_parciales=len(sol_par),
        sol_en_filas_problema=", ".join(map(str, sorted(sol_oc))) or "—",
        filas_evidencia=", ".join(map(str, sorted(sub.fila))),
        filas_dudosas=", ".join(map(str, sorted(subd.fila))) or "—",
        fuentes=", ".join(sorted(sub.fuente.unique())),
    ))
U = pd.DataFrame(rows).sort_values(["recurrencia", "n_noticias"], ascending=False).reset_index(drop=True)

# ---------- 5. Causas compartidas ----------
CAUSAS = [
 ("Producción creciente o excesiva de plástico",
  r"producci[oó]n excesiva|incremento en la producci|producci[oó]n de pl|Producci[oó]n y desechos|crece cada a[ñn]o|producci[oó]n.*crece",
  ["PLASPROD","PLASMAR","MICRO","DESCART","DIFICIL","EXPORT"], [342,224,428,421,163,259,327,352,322]),
 ("Sistemas de reciclaje y gestión ineficientes o sin infraestructura",
  r"ineficiencia en (el|la) (sistema|gesti|proceso|implementaci)|falta de infraestructura|infraestructura|desbordamiento de vertederos",
  ["TASAS","ORGAN","BASURAL","SEPAR","PLASPROD","PLASMAR","RAEE"], [83,246,491,523,88,171,1,498,92]),
 ("Desconocimiento o falta de conciencia de la población",
  r"desconocimiento (de|del|y)|conciencia|educaci[oó]n|actitud|ignorancia|h[aá]bito",
  ["TURISMO","AGRO","BASURAL","PLASPROD","PLASMAR","ORGAN","GENERAC","SEPAR"], [541,248,92,431,366]),
 ("Mercados débiles: baja demanda y precios de reciclados frente al material virgen",
  r"falta de demanda|demanda baja|baja demanda|precios|mercados|competencia desleal|presiones econ[oó]micas|costos elevados|barreras t[eé]cnicas y econ|importaciones|materiales v[ií]rgenes|condiciones econ[oó]micas",
  ["MERCADO","DIFICIL","EXPORT","TEXTIL"], [134,357,380,516,199,534,337]),
 ("Regulación débil, fragmentada o sin fiscalización",
  r"implementaci[oó]n de la ley|cumplimiento de la ley|regulat|regulaciones fragmentadas|fiscalizaci|implementaci[oó]n de pol[ií]ticas|leyes y est[aá]ndares|implementaci[oó]n inadecuada",
  ["AGRO","BASURAL","MERCADO","EXPORT","ORGAN","RAEE","DIFICIL","MARCAS","VERTIDO"], [197,506,343,443,253]),
 ("Diseño de productos difíciles de reciclar u obsolescencia",
  r"no reciclab|obsolescencia|contenido pl[aá]stico|descomposici[oó]n incompleta|PVC|peque[ñn]os pl[aá]sticos|sin valor de recuperaci",
  ["DIFICIL","COMPOST","RAEE","HIGIENE","PLASPROD"], [356,169,166,440,131]),
 ("Consumo rápido y descartable (moda rápida, delivery, eventos, un solo uso)",
  r"consumo r[aá]pido|consumo desmesurado|producci[oó]n masiva|moda|un solo uso|delivery|take away|eventos deportivos|desechable",
  ["TEXTIL","DESCART","RAEE","TURISMO"], [327,352,74,141,414,182,377]),
 ("Falta de control y trazabilidad sobre el destino del material",
  r"falta de control|trazabilidad|seguimiento|manipul|falta de fiscalizaci",
  ["MARCAS","TRAZA","EXPORT","VERTIDO","PATOG"], [131,443,202,499]),
 ("Condiciones de trabajo inseguras e informales",
  r"falta de seguridad|higiene y seguridad|seguridad contra incendio|equipo de protecci",
  ["TRABSEG","SERVICIO","FUEGO","RECUP"], []),
]
VAL = P[P.veredicto == "VÁLIDO"]
crow = []
for nombre, rx, ginf, sols in CAUSAS:
    t = VAL.causas_raiz.fillna("") + " | " + VAL.descripcion_problema.fillna("")
    hit = VAL[t.str.contains(rx, case=False, regex=True)]
    gtxt = sorted(set(hit.grupo))
    ginf_only = [x for x in ginf if x not in gtxt]
    crow.append(dict(
        causa=nombre,
        problemas_texto="; ".join(f"{GRUPOS[x]} [filas {', '.join(map(str, sorted(hit[hit.grupo==x].fila)))}]" for x in gtxt) or "—",
        n_problemas_texto=len(gtxt),
        problemas_inferidos="; ".join(GRUPOS[x] for x in ginf_only) or "—",
        soluciones_que_la_atacan=", ".join(map(str, sols)) or "Ninguna en el dataset",
    ))
C = pd.DataFrame(crow).sort_values("n_problemas_texto", ascending=False)

# ---------- 5b. Actores ----------
ACT = {
 "Coca-Cola": r"Coca[- ]?Cola", "PepsiCo": r"Peps", "Exxon Mobil": r"Exxon", "Amazon (empresa)": r"Amazon\b",
 "Apple": r"Apple", "WM (Waste Management)": r"\bWM\b", "Shein": r"Shein",
 "CEAMSE": r"Ceamse|CEAMSE", "Lusa (recolección Córdoba)": r"\bLusa\b",
 "Municipios / intendentes": r"municip|intendente|ayuntamiento|alcald",
 "Gobiernos nacionales/provinciales": r"gobierno|Xunta|Generalitat|Legislatura|ministr",
 "Unión Europea (Comisión/Parlamento)": r"Comisi[oó]n Europea|Parlamento Europeo|\bUE\b|Uni[oó]n Europea",
 "Cartoneros / recuperadores / recicladores informales": r"cartoner|recuperador|recolectores informales|trabajadores informales|waste pickers|reciclaje inclusivo",
 "Cooperativas": r"cooperativ",
 "Vecinos": r"vecin",
 "Asociaciones del sector reciclaje (EuRIC, FEAD, Recycling Europe, RECOUP…)": r"EuRIC|FEAD|Recycling Europe|RECOUP|Asegre|Biffa|EPA",
 "ONG / organizaciones ambientales": r"organizaciones ambientales|ecologista|GAIA|Greenpeace|ONG",
}
def txtp(r): return " ".join(str(x) for x in [r.titulo_problema, r.descripcion_problema, r.afectados, r.causas_raiz] if pd.notna(x))
def txts(r): return " ".join(str(x) for x in [r.nombre_solucion, r.descripcion_solucion, r.quien_impulsa] if pd.notna(x))
arow = []
for a, rx in ACT.items():
    pv = [f for f, r in zip(VAL.fila, VAL.itertuples()) if re.search(rx, txtp(r))]
    pall = [f for f, r in zip(P.fila, P.itertuples()) if re.search(rx, txtp(r))]
    sv = [f for f, r in zip(S.fila, S.itertuples()) if re.search(rx, txts(r))]
    arow.append(dict(actor=a, en_problemas_validos=len(pv), filas_problemas_validos=", ".join(map(str, pv)) or "—",
                     en_todas_las_filas_problema=len(pall), en_soluciones=len(sv),
                     filas_soluciones=", ".join(map(str, sv)) or "—"))
A = pd.DataFrame(arow).sort_values("en_problemas_validos", ascending=False)

# ---------- Tabla B ----------
var = P.groupby("cat_norm", dropna=False).tipo_problema.apply(lambda s: sorted(set(s.dropna())))
B = []
for c in sorted(set(P.cat_final)):
    vs = sorted(set(P[P.cat_final == c].tipo_problema.dropna()))
    origen_otro = P[(P.cat_final == c) & (P.cat_norm.isna() | (P.cat_norm == "OTRO_PROBLEMA_RESIDUOS")) & (c != "OTRO_PROBLEMA_RESIDUOS")]
    B.append(dict(categoria_final=c, variantes_unidas=" | ".join(vs) or "—",
                  n_total=int((P.cat_final == c).sum()),
                  n_validos=int(((P.cat_final == c) & (P.veredicto == "VÁLIDO")).sum()),
                  n_dudosos=int(((P.cat_final == c) & (P.veredicto == "DUDOSO")).sum()),
                  n_falsos_positivos=int(((P.cat_final == c) & (P.veredicto == "FALSO POSITIVO")).sum()),
                  recibidas_de_OTRO_o_vacio=len(origen_otro)))
B = pd.DataFrame(B).sort_values("n_total", ascending=False)

# Coincidencia entre categoría original y la que corresponde al problema único (solo válidos)
vv = P[P.veredicto == "VÁLIDO"]
coinc = (vv.cat_norm == vv.cat_sugerida_por_grupo).mean()

P.to_pickle("P.pkl"); S.to_pickle("S.pkl"); U.to_pickle("U.pkl"); C.to_pickle("C.pkl"); A.to_pickle("A.pkl"); B.to_pickle("B.pkl")

print(P.veredicto.value_counts().to_string())
print("nuevas categorias aceptadas", nuevas_ok)
print(prop.value_counts().to_string())
print("coincidencia cat original vs grupo (validos):", round(coinc, 3))
print(B.to_string())
print(U[["codigo","n_noticias","n_fuentes","recurrencia","n_dudosas","anios","n_anios_distintos","n_sol_directas","n_sol_parciales","ubicacion"]].to_string())
print(C[["causa","n_problemas_texto","problemas_texto"]].to_string())
print(A[["actor","en_problemas_validos","en_todas_las_filas_problema","en_soluciones"]].to_string())
print(P[P.veredicto=="VÁLIDO"].ambito.value_counts().to_string())
print(P.groupby("veredicto").anio.apply(lambda s: (s>=2024).sum()))
print("problemas por fuente (FP rate)"); print(P.groupby("fuente").veredicto.apply(lambda s: f"{(s=='FALSO POSITIVO').mean():.0%} de {len(s)}").to_string())
print("soluciones sin problema:", (S.ataca=="Ningún problema único identificado").sum())
print(S.tipo_solucion_norm.value_counts(dropna=False).to_string())
