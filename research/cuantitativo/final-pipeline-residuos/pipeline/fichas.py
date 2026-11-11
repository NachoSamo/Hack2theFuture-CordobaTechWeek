import sys, os, re, zipfile
import pandas as pd
from etiquetas import SOL, CAT_GRUPO
from fichas_contenido import F, ORDEN

sys.stdout.reconfigure(encoding="utf-8")
H = pd.read_pickle("H.pkl").set_index("codigo"); P = pd.read_pickle("P.pkl"); S = pd.read_pickle("S.pkl")
DUP = {289: 44, 372: 371, 444: 158}
OUT = "../resultados/fichas"; os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT): os.remove(os.path.join(OUT, f))

CRIT = [("Impacto social y ambiental", "25 %", "impacto"), ("Innovación", "20 %", "innovacion"),
        ("Factibilidad", "20 %", "factibilidad"), ("Escalabilidad", "15 %", "escalabilidad"),
        ("Vínculo con el ecosistema", "10 %", "ecosistema")]

def fecha(r):
    if isinstance(r.fecha, str) and re.match(r"\d{4}-\d\d-\d\d", r.fecha):
        y, m, d = r.fecha[:10].split("-"); return f"{d}/{m}/{y}", int(y), False
    m = re.search(r"/(20\d\d)/(\d\d)/(\d\d)/", str(r.url))
    if m: return f"{m.group(3)}/{m.group(2)}/{m.group(1)} (URL)", int(m.group(1)), True
    return "sin fecha", None, False

def cel(x):
    if not isinstance(x, str) or x.strip() == "" or x == "nan": return "—"
    return x.replace("|", "\\|").replace("\n", " ").strip()

def fila_tabla(r, titulo=None):
    t = titulo if titulo is not None else r.titulo_problema
    return f"| {r.fila} | {fecha(r)[0]} | {cel(r.fuente)} | {cel(t)} | {cel(r.url)} |"

def fmt(x): return f"{x:.2f}".replace(".", ",")
def lista(xs): return "\n".join(f"- {x}" for x in xs)

idx_rows = []
for n, g in enumerate(ORDEN, 1):
    c = F[g]; h = H.loc[g]
    nn = f"{n:02d}"; fname = f"{nn}-{c['slug']}.md"
    val = P[(P.grupo == g) & (P.veredicto == "VÁLIDO")].copy()
    val["_f"] = val.apply(fecha, axis=1)
    vd = val[~val.fila.isin(DUP)]
    yrs = sorted(y for _, y, _ in vd._f if y); sf = sum(1 for _, y, _ in vd._f if not y)
    url_used = any(u for _, _, u in vd._f)
    periodo = (f"{yrs[0]}–{yrs[-1]}" if yrs and yrs[0] != yrs[-1] else (str(yrs[0]) if yrs else "sin fecha"))
    if sf and yrs: periodo += f" (+{sf} sin fecha)"
    if url_used: periodo += " ¹"
    dud = P[(P.grupo == g) & (P.veredicto == "DUDOSO")]
    medios = vd.fuente.value_counts()
    L = []
    L.append(f"# {c['nombre']}\n")
    L.append(f"*Ficha {nn} de 15 · Investigación de problemas de residuos · Hack to the Future, Córdoba Tech Week (12 y 13/11/2026) · Base: CSV de 547 noticias, filas citadas entre paréntesis.*\n")
    L.append("## Ficha rápida\n")
    L.append("| Categoría | Estado | N.º de noticias | N.º de fuentes | Período | Solidez de la evidencia | Total ponderado |")
    L.append("|---|---|---|---|---|---|---|")
    L.append(f"| {CAT_GRUPO[g]} | {h.estado} | {h.n_noticias} | {h.n_fuentes} | {periodo} | {h.solidez} | {fmt(h.total)} de 5 |\n")
    notas = ["Solo se cuentan noticias válidas y sin duplicados."]
    if url_used: notas.append("¹ Algunas filas no traen fecha en el CSV; en esos casos se usa la fecha que aparece en la URL de la noticia.")
    L.append("\n".join(f"<sub>{x}</sub>  " for x in notas) + "\n")
    L.append("## Resumen\n"); L.append(c["resumen"] + "\n")
    L.append("## Qué pasa\n"); L.append(lista(c["que_pasa"]) + "\n")
    por_anio = {}
    for _, r in vd.sort_values("fila").iterrows():
        y = r._f[1]; por_anio.setdefault(y if y else "sin fecha", []).append(str(r.fila))
    claves = sorted([k for k in por_anio if k != "sin fecha"]) + (["sin fecha"] if "sin fecha" in por_anio else [])
    dist = " · ".join(f"**{k}:** {len(por_anio[k])} ({', '.join(por_anio[k])})" for k in claves)
    L.append("## Dónde y cuándo\n"); L.append(c["donde"] + "\n"); L.append(f"Noticias por año: {dist}\n")
    L.append("## A quién afecta\n"); L.append("**Directos (según las noticias)**\n"); L.append(lista(c["afecta_dir"]) + "\n")
    L.append("**Indirectos**\n"); L.append(lista(c["afecta_ind"]) + "\n")
    L.append("## Causas\n"); L.append("**Según las noticias**\n"); L.append(lista(c["causas_txt"]) + "\n")
    L.append("**Inferidas (no las dice el texto)**\n"); L.append(lista(c["causas_inf"]) + "\n")
    L.append("## Actores involucrados\n"); L.append("**En las noticias**\n"); L.append(lista(c["actores_txt"]) + "\n")
    L.append("**Inferidos**\n"); L.append(lista(c["actores_inf"]) + "\n")
    L.append("## Qué existe hoy\n"); L.append(f"Estado: **{h.estado}**.\n"); L.append(lista(c["existe"]) + "\n")
    L.append("## La necesidad\n"); L.append(f"> {h.necesidad}\n")
    L.append("## ¿Se puede abordar con un sistema?\n"); L.append(f"**{h.abordable}.** {h.motivo_abordable}\n")
    L.append("## Evaluación según los criterios del jurado\n")
    L.append("| Criterio | Peso | Puntaje (1 a 5) | Justificación |"); L.append("|---|---|---|---|")
    for (nom, peso, k), j in zip(CRIT, c["just"]):
        L.append(f"| {nom} | {peso} | {int(h[k])} | {j} |")
    L.append(f"| **Total ponderado** | 90 % | **{fmt(h.total)}** | Promedio ponderado sobre el 90 %: el pitch (10 %) depende de la presentación, no del problema. |\n")
    L.append("<sub>Los puntajes son criterio del analista y se apoyan en las filas citadas, no en una medición. Innovación significa qué tan poco cubierto está el problema en el dataset.</sub>\n")
    L.append("## Preguntas para abrir el problema\n"); L.append(lista(c["hmw"]) + "\n")
    L.append("## Qué falta validar\n"); L.append(lista(c["validar"]) + "\n")
    lim0 = (f"Solidez {h.solidez}. Lo sostienen {h.n_noticias} noticia{'s' if h.n_noticias != 1 else ''} válida{'s' if h.n_noticias != 1 else ''} de {h.n_fuentes} medio{'s' if h.n_fuentes != 1 else ''}: "
            + ", ".join(f"{m} ({k})" for m, k in medios.items()) + ".")
    if val.fila.isin(DUP).any(): lim0 += " Además hay " + ", ".join(f"{d} (duplicado de {DUP[d]})" for d in val.fila if d in DUP) + ", que no se cuenta."
    lims = [lim0] + [x for x in c["limites"] if not x.startswith("Solidez")]
    lims.append("Falsos positivos: cada fila se leyó y se dejó como VÁLIDA solo si describe un perjuicio concreto. En todo el CSV, la mitad de las filas marcadas como problema (213 de 414) no lo eran, así que la clasificación original de este tema tampoco es confiable por sí sola.")
    lims.append("El dataset refleja lo que publican los medios relevados. Que algo aparezca poco no prueba que pase poco"
                + (", y «sin solución en el dataset» no quiere decir «sin solución en el mundo»." if h.estado == "SIN SOLUCIÓN" else "."))
    L.append("## Límites de la evidencia\n"); L.append(lista(lims) + "\n")
    L.append("## Fuentes\n"); L.append("**Noticias del problema**\n")
    L.append("| Fila | Fecha | Medio | Título | URL |"); L.append("|---|---|---|---|---|")
    for _, r in val.sort_values("fila").iterrows():
        t = r.titulo_problema + (f" (duplicado de la fila {DUP[r.fila]}, no se cuenta)" if r.fila in DUP else "")
        L.append(fila_tabla(r, t))
    L.append("")
    sols = [(f, t) for f, lst in SOL.items() for gg, t in lst if gg == g]
    if sols:
        L.append("**Soluciones del dataset relacionadas**\n")
        L.append("| Fila | Fecha | Medio | Título | URL |"); L.append("|---|---|---|---|---|")
        for f, t in sorted(sols):
            r = S[S.fila == f].iloc[0]; L.append(fila_tabla(r, f"[{t}] {r.nombre_solucion}"))
        L.append("")
    otras = []
    for f, rol in c["extra"]:
        src = P if (P.fila == f).any() else S
        r = src[src.fila == f].iloc[0]
        tit = r.titulo_problema if src is P else r.nombre_solucion
        otras.append(fila_tabla(r, f"[{rol}] {tit}"))
    for _, r in dud.sort_values("fila").iterrows():
        otras.append(fila_tabla(r, f"[Dudosa, no cuenta] {r.titulo_problema}"))
    if otras:
        L.append("**Otras filas citadas**\n")
        L.append("| Fila | Fecha | Medio | Título | URL |"); L.append("|---|---|---|---|---|")
        L += otras; L.append("")
    L.append("---\n[← Volver al índice](00-indice.md)\n")
    open(os.path.join(OUT, fname), "w", encoding="utf-8").write("\n".join(L))
    idx_rows.append((nn, c["nombre"], h.estado, h.solidez, h.total, fname, g))

# ---------- Índice ----------
G = H[H.estado != "CUBIERTO"].sort_values("total", ascending=False)
fuera = G[~G.index.isin(ORDEN)]
I = ["# Fichas de investigación: problemas de residuos\n",
     "*Hack to the Future · Córdoba Tech Week · 12 y 13/11/2026 · Track: gestión sostenible de residuos · Generado el 11/11/2026.*\n",
     "Estas fichas describen **problemas, no soluciones**. Cada una se lee sola. Todo lo que afirman sale de filas del CSV de 547 noticias (citadas entre paréntesis). Lo que no dice el texto está marcado como *inferido*.\n",
     "## Los 15 problemas\n",
     "| N.º | Problema | Estado | Solidez de la evidencia | Total ponderado | Archivo |", "|---|---|---|---|---|---|"]
for nn, nom, est, sol, tot, fn, g in idx_rows:
    I.append(f"| {nn} | {nom} | {est} | {sol} | {fmt(tot)} | [{fn}]({fn}) |")
I.append("")
I.append("## Cómo se eligieron\n")
I += [f"- El análisis encontró **36 problemas únicos** con noticias válidas. 3 están cubiertos por soluciones del dataset (RAEE, textiles y compostaje de orgánicos). Quedan **{len(G)} huecos**: {int((G.estado=='PARCIAL').sum())} PARCIAL y {int((G.estado=='SIN SOLUCIÓN').sum())} SIN SOLUCIÓN.",
      "- No son exactamente 15. Se tomaron los **15 con mayor total ponderado**. El corte es limpio: el 15.º tiene 3,00 y el 16.º, 2,94.",
      "- Cuando dos problemas empatan en el total, va primero el que tiene más evidencia (noticias × medios). Por eso Basurales (7 noticias) va antes que Envases de agroquímicos (2).",
      "- Total ponderado: promedio de cinco criterios del jurado, de 1 a 5: impacto social y ambiental 25 %, innovación 20 %, factibilidad 20 %, escalabilidad 15 % y vínculo con el ecosistema 10 %. El pitch (10 %) no se puntúa.",
      "- Solidez: ALTA = 5 noticias o más de 4 medios o más; BAJA = 1 o 2 noticias; MEDIA = el resto.\n"]
I.append("## Cómo leerlas\n")
I += ["- **PARCIAL**: hay soluciones en el dataset que atacan solo una parte del problema o un problema vecino.",
      "- **SIN SOLUCIÓN**: no hay ninguna fila de solución que lo ataque. Es *sin solución en el dataset*, no *sin solución en el mundo*: el dataset solo refleja lo que publicaron los medios relevados.",
      "- Un total alto con solidez BAJA (fichas 02, 06, 11 y 15) es una pista, no una conclusión. Esas fichas son las primeras que hay que validar con personas reales.",
      "- Varias fichas comparten territorio y actores. Las 01, 03, 04, 05 y 09 tratan la cadena municipal de residuos en Córdoba. La 14 se parece a la 01, y la 06 se relaciona con la 12.",
      "- Cuando una fila no trae fecha en el CSV, se usa la fecha de su URL y se marca «(URL)».\n"]
I.append("## Problemas que quedaron afuera\n")
I.append(f"Los otros {len(fuera)} huecos, con su total ponderado: " + "; ".join(f"{r.problema} ({fmt(r.total)})" for _, r in fuera.iterrows()) + ".\n")
I.append("El detalle de todos está en el Excel del análisis (hojas Huecos y Puntuación).\n")
open(os.path.join(OUT, "00-indice.md"), "w", encoding="utf-8").write("\n".join(I))

zp = "../resultados/fichas_problemas_residuos.zip"
with zipfile.ZipFile(zp, "w", zipfile.ZIP_DEFLATED) as z:
    for fn in sorted(os.listdir(OUT)): z.write(os.path.join(OUT, fn), f"fichas/{fn}")
print("ok", len(os.listdir(OUT)), "archivos")
