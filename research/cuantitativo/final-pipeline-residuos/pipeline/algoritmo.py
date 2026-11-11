import sys, random
import pandas as pd
from etiquetas import SOL_EN_PROBLEMAS

sys.stdout.reconfigure(encoding="utf-8")
P = pd.read_pickle("P.pkl"); S = pd.read_pickle("S.pkl"); H = pd.read_pickle("H.pkl")
DUP = {289: 44, 372: 371, 444: 158}

# --- Regla ingenua automatizable con las columnas que ya trae el CSV ---
# Una fila-problema es "hueco" si ninguna solución declara (tipo_problema_objetivo) atacar su categoría.
def obj_cat(x):
    if pd.isna(x): return None
    s = x.upper()
    if s.startswith("GESTION"): return "GESTION_DEFICIENTE_RESIDUOS_ESPECIALES"
    if "BARRERAS" in s: return "BARRERAS_DE_MERCADO_Y_ECONOMICAS"
    if "ALIMENT" in s: return "DESPERDICIO_ALIMENTARIO_Y_ORGANICOS"
    if "DISPOSICI" in s: return "COLAPSO_Y_SATURACION_DISPOSICION_FINAL"
    if "PLÁSTIC" in s or "PLASTIC" in s or "CONTAMINACI" in s: return "CONTAMINACION_ECOSISTEMICA_Y_PLASTICOS"
    return None   # p. ej. "desperdicio de textiles": no mapea a ninguna categoría de problema
S["obj_cat"] = S.tipo_problema_objetivo.map(obj_cat)
cubiertas = set(S.obj_cat.dropna())
n_obj = int(S.tipo_problema_objetivo.notna().sum())
P["hueco_ingenuo"] = ~P.cat_norm.isin(cubiertas)          # NaN o categoría sin solución declarada
fp = P[P.veredicto == "FALSO POSITIVO"]
du = P[P.veredicto == "DUDOSO"]
va = P[P.veredicto == "VÁLIDO"]
res = dict(
    soluciones_con_objetivo=n_obj, soluciones_total=len(S),
    categorias_cubiertas=sorted(cubiertas),
    fp_total=len(fp), fp_hueco=int(fp.hueco_ingenuo.sum()),
    fp_hueco_soluciones_disfrazadas=int(fp[fp.fila.isin(SOL_EN_PROBLEMAS)].hueco_ingenuo.sum()),
    fp_soluciones_disfrazadas=int(fp.fila.isin(SOL_EN_PROBLEMAS).sum()),
    du_hueco=int(du.hueco_ingenuo.sum()), du_total=len(du),
    va_hueco=int(va.hueco_ingenuo.sum()), va_total=len(va),
)
tot_hueco = int(P.hueco_ingenuo.sum())
res["huecos_ingenuos_total"] = tot_hueco
res["share_fp_en_huecos"] = round(res["fp_hueco"] / tot_hueco, 3)

# Comparación a nivel problema único: la regla ingenua (categoría mayoritaria) vs. mi lectura
va2 = va[~va.fila.isin(DUP)]
cmp = []
for g, sub in va2.groupby("grupo"):
    cat = sub.cat_norm.mode().iloc[0] if sub.cat_norm.notna().any() else None
    ingen = "CUBIERTO" if cat in cubiertas else "HUECO"
    mio = H.set_index("codigo").loc[g, "estado"]
    cmp.append(dict(codigo=g, cat_mayoritaria=cat, ingenuo=ingen, lectura=mio,
                    coincide=(ingen == "CUBIERTO") == (mio == "CUBIERTO")))
CMP = pd.DataFrame(cmp)
res["grupos"] = len(CMP); res["coinciden"] = int(CMP.coincide.sum())
res["ingenuo_cubre_pero_es_hueco"] = list(CMP[(CMP.ingenuo == "CUBIERTO") & (CMP.lectura != "CUBIERTO")].codigo)
res["ingenuo_hueco_pero_cubierto"] = list(CMP[(CMP.ingenuo == "HUECO") & (CMP.lectura == "CUBIERTO")].codigo)

# --- Sensibilidad del ranking por recurrencia con pocas noticias ---
def ranking(df):
    g = df.groupby("grupo").agg(n=("fila", "size"), f=("fuente", "nunique"))
    g["rec"] = g.n * g.f
    return g.sort_values(["rec", "n"], ascending=False)
base = ranking(va2); top_base = list(base.head(10).index)
# Dejar afuera una noticia por vez
flips = 0; flip_rows = []
for f in va2.fila:
    t = list(ranking(va2[va2.fila != f]).head(10).index)
    if set(t) != set(top_base): flips += 1; flip_rows.append(int(f))
res["loo_n"] = len(va2); res["loo_cambia_top10"] = flips; res["loo_filas"] = flip_rows
# Bootstrap: remuestrear noticias con reposición
random.seed(7); B = 2000
cnt = {}; rank_pos = {g: [] for g in base.index}
rows = va2.to_dict("records")
for _ in range(B):
    smp = pd.DataFrame([random.choice(rows) for _ in rows])
    smp["fila"] = range(len(smp))
    r = ranking(smp)
    for i, g in enumerate(r.index): rank_pos[g].append(i + 1)
    for g in r.head(10).index: cnt[g] = cnt.get(g, 0) + 1
BOOT = pd.DataFrame([dict(codigo=g, puesto_base=i + 1, recurrencia_base=int(base.loc[g, "rec"]),
                          prob_top10=round(cnt.get(g, 0) / B, 2),
                          puesto_p10=int(pd.Series(rank_pos[g] or [99]).quantile(0.1)),
                          puesto_p90=int(pd.Series(rank_pos[g] or [99]).quantile(0.9)))
                     for i, g in enumerate(base.index)]).head(16)
# ¿Cuántos problemas cambian de estado con UNA solución más o menos?
gp = H[H.estado != "CUBIERTO"]
res["sin_sol_con_0"] = int((gp.estado == "SIN SOLUCIÓN").sum())
res["parcial"] = int((gp.estado == "PARCIAL").sum())
res["con_1_o_2_noticias"] = int((H.n_noticias <= 2).sum()); res["grupos_total"] = len(H)
pd.to_pickle(dict(res=res, CMP=CMP, BOOT=BOOT), "algo.pkl")
for k, v in res.items(): print(k, ":", v)
print(CMP.to_string()); print(BOOT.to_string())
