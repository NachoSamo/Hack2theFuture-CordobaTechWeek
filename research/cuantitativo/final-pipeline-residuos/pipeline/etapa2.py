import sys, random
import pandas as pd
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
from etiquetas import GRUPOS

sys.stdout.reconfigure(encoding="utf-8")
XL = "../resultados/analisis_problemas_residuos.xlsx"
P = pd.read_pickle("P.pkl"); S = pd.read_pickle("S.pkl"); U = pd.read_pickle("U.pkl").set_index("codigo")

DUP = {289: 44, 372: 371, 444: 158}   # fila duplicada -> fila original (mismo hecho)
VAL = P[(P.veredicto == "VÁLIDO") & ~P.fila.isin(DUP)].copy()
# Etapa 3: si la fila no trae fecha, se toma el año de la URL (/AAAA/MM/DD/)
VAL["anio"] = VAL.anio.fillna(VAL.url.str.extract(r"/(20\d\d)/\d\d/\d\d/")[0].astype(float))

# ---------------- 1. Estado de solución (releyendo el texto de cada solución) ----------------
EST = {
 "RAEE": ("CUBIERTO", "330 (contenedores para RAEE en centros comerciales) ataca de frente que los RAEE terminen en la basura doméstica (117). 95, 199, 435 y 534 reciclan plásticos de electrodomésticos (513). Quedan afuera la obsolescencia (302) y los contextos sin infraestructura (59, Gaza). Todas las soluciones son de España o EE. UU."),
 "TEXTIL": ("CUBIERTO", "141 y 414 (reciclaje químico de poliéster), 98 (consorcio de reciclaje textil) y 202 (piloto de trazabilidad y reutilización textil) atacan la falta de separación y reciclaje (145, 160). Queda afuera el volumen de la moda rápida (154, 438)."),
 "ORGAN": ("CUBIERTO", "83, 491 y 523 (plantas de tratamiento y compostaje) y 246 (fondos para compostaje) atacan la falta de infraestructura de compostaje que describe la fila 80."),
 "MERCADO": ("PARCIAL", "134, 357, 380 y 516 (marcas que usan material reciclado) y 199 y 534 (plásticos de electrodomésticos que vuelven al mercado) generan algo de demanda. Quedan afuera la estabilidad de precios y la competencia con el material virgen y las importaciones (420, 442, 448, 466)."),
 "MARCAS": ("PARCIAL", "Solo 131 (pasaporte digital de productos plásticos, todavía un demostrador) podría servir para verificar. Queda afuera el control independiente de las metas (100, 126, 127, 158) y del destino del material (78)."),
 "PLASPROD": ("PARCIAL", "Hay 15 parciales: productos con plástico reciclado (1, 27, 258, 285, 460, 544), bioplásticos (163, 224, 259, 342, 421, 428) y más capacidad de reciclaje (88, 171, 498). Queda afuera que la producción crece más rápido que la capacidad de reciclaje (359, 533, 537)."),
 "MICRO": ("PARCIAL", "547 (filtración de microplásticos en aguas residuales) ataca que atraviesen el tratamiento de aguas (121). La noticia 165 menciona una herramienta digital que identifica el origen de los microplásticos en la comida. Quedan afuera las fuentes de emisión (502, neumáticos), la exposición humana (245, 515) y los océanos (198)."),
 "EXPORT": ("PARCIAL", "498 (planta de reciclaje en Nigeria) y 230 (inversión en reciclaje en India) suman capacidad en los países receptores. Queda afuera el control y la trazabilidad de los envíos (194, 514)."),
 "DESCART": ("PARCIAL", "327 (préstamo de objetos), 352 (devolución de envases de vidrio), 322 (cápsulas de café), 317 (meta de envases) y 74 (Cosquín Rock, sin descripción). Quedan afuera el delivery (358) y los eventos deportivos masivos (519)."),
 "DIFICIL": ("PARCIAL", "169 y 356 (directrices RecyClass de diseño para el reciclaje) atacan el diseño, y 250, 347 y 499 mejoran la separación. Quedan afuera los costos de reciclar PET termoformado y flexibles (94, 184) y el PVC sin valor de recuperación (480)."),
 "TASAS": ("PARCIAL", "173 (meta de 80 % de vidrio en Galicia) y 328 (hoja de ruta del vidrio en Reino Unido) son metas para un solo material. Queda afuera cómo cerrar la brecha general (86, 146, 527, 546)."),
 "PATOG": ("PARCIAL", "335 (bioplásticos para uso médico, descripción cortada) ataca un problema vecino: el material. Quedan afuera la separación, el tratamiento y el control de la cadena (5, 292, 350)."),
 "RELLENO": ("PARCIAL", "250 (combustible derivado de residuos), 266 (biogás), 255 (planta con cero residuos a disposición final) y 524 (metanol a partir de basura) aprovechan residuos antes del relleno. Quedan afuera la saturación (3) y la disputa entre jurisdicciones (387)."),
 "SEPAR": ("PARCIAL", "92 (universidad, sin descripción), 431 y 366 (canje y descuentos por reciclables), 352, 210 y 467. Quedan afuera los cestos diferenciados en los hogares (101) y la dependencia de los recuperadores (32)."),
 "COMPOST": ("PARCIAL", "440 (metodología para evaluar la biodegradabilidad) solo mide, y 97 es otro bioplástico compostable. Quedan afuera las etiquetas e instrucciones claras (102) y los restos que quedan en el suelo (195)."),
 "AGRO": ("PARCIAL", "332 (envase reciclado de Syngenta, sin descripción) ataca un problema vecino. La fila 446, marcada como problema, describe la recuperación de plásticos agrícolas en Canadá. Queda afuera la recolección y trazabilidad de envases en Argentina (36, 49)."),
 "TURISMO": ("PARCIAL", "74 (Cosquín Rock, sin descripción). La propia fila 16 cuenta que una estrategia educativa redujo un tercio la basura en un balneario de Córdoba. Quedan afuera los eventos masivos en espacios naturales (54)."),
 "TRAZA": ("PARCIAL", "131 (pasaporte digital) y 443 (trazabilidad, título cortado). 124 (trazabilidad en la Escuela Municipal de Economía Circular de Córdoba) y 192 (lector de documentos de envases) parecen soluciones, pero están marcadas como problema. Queda afuera la gestión manual de residuos industriales en empresas (481)."),
 "IMPRECI": ("PARCIAL", "252 (reciclador que usa hidrógeno en vez de diésel) ataca el consumo de energía. Queda afuera la liberación de microplásticos al triturar (386)."),
 "PELIG": ("PARCIAL", "475 (materiales para descontaminar aguas, sin descripción) y 110 (filtro de PFAS) atacan problemas vecinos. Queda afuera el control de plantas como la del derrame de Taym (11)."),
 "METALES": ("PARCIAL", "341 (tecnologías de reciclaje de aluminio) y las parciales 226, 478 y 516. Quedan afuera los costos ambientales de toda la cadena desde la extracción (112)."),
 "DESPERD": ("PARCIAL", "541 (compostaje en el hogar) y 246 (fondos para compostaje) tratan los restos. Queda afuera evitar el desperdicio en los hogares, que generan el 50 % (256)."),
 "PLASMAR": ("SIN SOLUCIÓN", "No hay ninguna fila de solución. Solo aparecen acciones de limpieza en filas marcadas como problema (108, 151, 310, 331, 510)."),
 "BASURAL": ("SIN SOLUCIÓN", "No hay ninguna fila de solución. El cierre de Tancacha se cuenta dentro de la misma noticia del problema (400), y la fila 273 (buitres con cámaras en Lima) está marcada como problema."),
 "FUEGO": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "ACUM": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "VERTIDO": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "SERVICIO": ("SIN SOLUCIÓN", "No hay ninguna fila de solución. La recogida neumática (407) está marcada como problema."),
 "TRABSEG": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "DESASTRE": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "RECUP": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "INCIN": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "INODORO": ("SIN SOLUCIÓN", "No hay ninguna fila de solución. Hay una campaña educativa en la fila 301, que es dudosa."),
 "HIGIENE": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "GENERAC": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
 "ESPACIAL": ("SIN SOLUCIÓN", "No hay ninguna fila de solución."),
}

# ---------------- 2/3. Necesidad y abordabilidad ----------------
NEC = {
 "MERCADO": ("Las empresas recicladoras de plástico y papel necesitan compradores estables y precios previsibles para el material recuperado porque su operación depende de venderlo por encima de lo que cuesta procesarlo, y hoy la demanda cae, el material virgen es más barato y cierran plantas (185, 420, 442, 448, 466).",
  "PARCIAL", "Conectar oferta y demanda y dar transparencia de precios es un problema de información. El precio del material virgen, la energía y la regulación no lo son (420, 466)."),
 "PLASMAR": ("Las comunidades costeras, los pescadores y la fauna de ríos y mares necesitan que el plástico no llegue al agua porque los animales lo ingieren y degrada las costas (15, 44, 51, 225), y hoy los residuos mal gestionados en tierra y los vertederos desbordados terminan en los ríos (45) sin que se sepa bien de dónde salen (inferido).",
  "PARCIAL", "Medir dónde se acumula y de dónde viene es abordable con datos (la fila dudosa 484 pide un sistema de monitoreo). Contener y retirar el plástico requiere infraestructura física."),
 "MARCAS": ("Consumidores, inversores y reguladores necesitan verificar si las grandes marcas cumplen sus compromisos de reciclaje y reutilización porque las metas se anuncian y después se bajan o se incumplen (100, 126, 127, 158) y hay denuncias de engaño y manipulación de datos (91, 114), y hoy no hay control independiente sobre qué pasa con el material (78).",
  "SÍ", "Es un problema de trazabilidad, medición y transparencia. Hacer cumplir las metas (sancionar) requiere leyes, eso no se resuelve con un sistema."),
 "PLASPROD": ("Gobiernos y sociedad necesitan que la cantidad de plástico que se produce no supere lo que se puede recolectar y reciclar porque el excedente termina en los ecosistemas (359, 533, 537), y hoy la producción crece más rápido que la capacidad de reciclaje y solo se recicla una fracción (58: menos del 10 %; 344: 17 %).",
  "PARCIAL", "Un sistema solo puede medir la brecha. Reducir la producción depende de regulación y del modelo económico."),
 "BASURAL": ("Los vecinos de barrios y localidades de Córdoba y Argentina necesitan que no se formen ni crezcan basurales a cielo abierto cerca de sus casas y de sus fuentes de agua porque contaminan, atraen plagas y ponen en riesgo el agua (274: a 150 m de la cisterna; 283: alacranes; 298), y hoy aparecen sin control, se incumple la ley provincial 9088 (274) y se denuncian cuando ya existen (30).",
  "PARCIAL", "Detectarlos, registrarlos y seguir las denuncias es un problema de información y coordinación. Cerrarlos y ofrecer dónde disponer los residuos requiere infraestructura y presupuesto (400: 22 millones de pesos para un cierre)."),
 "MICRO": ("La población necesita saber cuántos microplásticos ingiere y de qué fuentes vienen porque se encontraron en sangre, órganos y alimentos (165, 245, 515), y hoy los patógenos adheridos a ellos sobreviven al tratamiento de aguas residuales (121) y las fuentes se conocen poco (502: neumáticos).",
  "PARCIAL", "Dar información sobre exposición y origen es abordable (165 ya menciona una herramienta). Medirlos requiere laboratorio, y reducirlos en el origen no es un problema de software (inferido)."),
 "EXPORT": ("Los países que reciben residuos y sus reguladores necesitan saber qué les llega y en qué estado porque reciben plástico contaminado o no autorizado (39, 514) que se acumula (43), y hoy exportar permite evitar la responsabilidad de gestionarlo (194) y los controles son débiles (514).",
  "PARCIAL", "La trazabilidad de los envíos es un problema de información. Permitir o prohibir importaciones es una decisión política (295, 454)."),
 "FUEGO": ("Vecinos, bomberos y operadores de acopios necesitan prevenir incendios en basurales y depósitos de reciclables porque destruyen instalaciones, contaminan y causan accidentes (22; 188; 294: choque de seis camiones), y hoy hay acopios que no cumplen los requisitos contra incendio (451) y se quema basura para eliminarla (188).",
  "PARCIAL", "Monitorear el riesgo y dar aviso a tiempo es un problema de información. La prevención física y el control de los acopios requieren infraestructura y fiscalización."),
 "DESCART": ("Organizadores de eventos, comercios de comida para llevar y consumidores necesitan dejar de generar envases descartables porque el delivery y los eventos masivos multiplican el plástico de un solo uso (358, 519), y hoy las prohibiciones no alcanzan (376: récord de desechos plásticos en California pese a la prohibición de bolsas).",
  "PARCIAL", "La coordinación de la devolución y la reutilización tiene una parte de información y logística. Los envases físicos y los hábitos no se resuelven con un sistema."),
 "DIFICIL": ("Las plantas de clasificación y los recicladores necesitan recibir envases que puedan separar y vender porque los plásticos pequeños, flexibles, de PVC y mixtos bajan la calidad del material y no tienen valor de recuperación (94, 184, 371, 480, 483), y hoy esos formatos crecen sin que cambie el diseño.",
  "PARCIAL", "La información de reciclabilidad para quienes diseñan envases ya existe en parte (169, 356). El límite está en el material y en su costo."),
 "ACUM": ("Vecinos y comerciantes de zonas con mucha actividad (bares, mercados) necesitan que la basura no se acumule en la calle después de los picos, como fines de semana largos o Carnaval, porque trae olores, ratas y enfermedades (212, 284, 306, 373, 542), y hoy la recolección no se adapta a esos picos (inferido: el texto no da causas).",
  "SÍ", "Anticipar los picos y coordinar a vecinos, comercios y recolección es un problema de información y coordinación. Si faltan camiones o presupuesto, eso no se resuelve con un sistema. Hay que validar la causa."),
 "VERTIDO": ("Las comunidades cercanas a campos, playas y predios necesitan que no se descarguen residuos ilegalmente porque contaminan el suelo y el agua (130, 181; 503: 21.000 toneladas), y hoy la autoridad puede negar la denuncia (181) y hay depósitos que llegan a 21.000 toneladas antes de limpiarse (503).",
  "PARCIAL", "Detectar, registrar y dar seguimiento a las denuncias es abordable. Sancionar y limpiar no lo es."),
 "SERVICIO": ("Los vecinos de Córdoba y CABA necesitan un servicio de recolección continuo y previsible porque cuando se interrumpe la basura queda en la calle (267, 272), y hoy los conflictos gremiales cortan el servicio (267, 272) y no hay una alternativa mientras dura el corte (inferido).",
  "PARCIAL", "Los avisos y la coordinación ante cortes son un problema de información. Los conflictos laborales no lo son."),
 "TRABSEG": ("Recolectores y trabajadores de basurales necesitan trabajar sin riesgo de morir aplastados o de ser asaltados porque ya hubo muertes (107, 309) y asaltos en Villa Siburu (209), y hoy hay fallas de seguridad y de uso del equipo de protección (107) e inseguridad en los barrios donde recolectan (209).",
  "PARCIAL", "Registrar incidentes y zonas de riesgo es abordable. El equipamiento, la seguridad física y la formalización no se resuelven con un sistema."),
 "TASAS": ("Los gobiernos locales necesitan entender por qué no alcanzan sus metas de reciclaje porque las incumplen (146, 527) y reciclan poco (86: 20 % en Colombia; 546: baja circularidad en España), y hoy faltan infraestructura y políticas (inferido).",
  "PARCIAL", "Medir es abordable. La infraestructura no."),
 "PATOG": ("Pacientes, trabajadores de la salud y vecinos necesitan que los residuos hospitalarios se separen y traten aparte porque pueden contagiar (292), y hoy se mezclan con basura común (5) o se revenden ilegalmente para fabricar plástico (350).",
  "SÍ", "Es un problema de trazabilidad y control de la cadena. El tratamiento físico ya existe aparte (inferido)."),
 "RELLENO": ("Municipios y vecinos necesitan dónde disponer los residuos sin saturar los rellenos ni pelearse entre jurisdicciones porque los rellenos se saturan (3) y hay disputas por la disposición final (387), y hoy la generación crece sin un cambio de modelo (3).",
  "NO", "Depende de infraestructura y de acuerdos políticos."),
 "SEPAR": ("Los hogares de la Ciudad de Buenos Aires necesitan poder separar sus residuos sin esfuerzo porque, si no, lo reciclable se mezcla con lo orgánico (32), y hoy faltan cestos diferenciados (101) y la separación se cae cuando los recuperadores dejan de trabajar (32).",
  "PARCIAL", "La información y los recordatorios son abordables. Los cestos y la recolección diferenciada son infraestructura."),
 "COMPOST": ("Consumidores, compostadores y agricultores necesitan saber si un envase compostable se degrada en sus condiciones reales porque los biodegradables dejan restos en el compost y el suelo (195), y hoy las etiquetas son inconsistentes y faltan instrucciones claras (102).",
  "SÍ", "Es un problema de información y de acceso a ella."),
 "AGRO": ("Las comunidades rurales necesitan que los envases vacíos de agroquímicos se recolecten en vez de descartarse porque se tiran ilegalmente por millones (49) con restos tóxicos (inferido), y hoy solo se recicla el 8 % (49) y el sistema de trazabilidad está en desarrollo (36).",
  "SÍ", "Es un problema de trazabilidad y coordinación. Los centros de acopio ya existen (36 menciona nueve)."),
 "TURISMO": ("Los responsables de balnearios y espacios naturales necesitan que turistas y asistentes a eventos no dejen basura porque contamina lagos y balnearios (16, 54), y hoy falta educación ambiental (16, donde una estrategia educativa redujo un tercio la basura).",
  "PARCIAL", "La información y la educación son abordables. Los servicios en el lugar son físicos."),
 "TRAZA": ("Las empresas generadoras y envasadoras necesitan registrar y reportar sus residuos sin trabajo manual porque deben cumplir obligaciones ambientales (205: declaración anual de envases; 481), y hoy la gestión es manual y sin trazabilidad (481).",
  "SÍ", "Es un problema de información y trazabilidad."),
 "IMPRECI": ("Las comunidades cercanas a plantas de reciclaje necesitan que el reciclaje no genere su propia contaminación porque algunas tecnologías consumen mucha energía (379) y la trituración libera microplásticos (386), y hoy ese impacto no se mide (inferido).",
  "PARCIAL", "Medir es abordable. Cambiar la tecnología no."),
 "PELIG": ("La población cercana a plantas de residuos peligrosos necesita saber a tiempo si su agua está contaminada porque un derrame en la planta de Taym contaminó el canal Los Molinos en Córdoba (11), y hoy (2017) la contaminación se detectó después del derrame.",
  "PARCIAL", "El monitoreo y la alerta son abordables. El control de la planta es regulatorio."),
 "METALES": ("La cadena del aluminio y el acero necesita conocer y reducir sus costos ambientales porque reciclar arrastra impactos desde la extracción (112), y hoy los problemas de la cadena de suministro no se resuelven.",
  "PARCIAL", "Medir la huella es abordable. Los procesos industriales no."),
 "DESPERD": ("Hogares y empresas necesitan desperdiciar menos alimentos porque la UE genera 58 millones de toneladas por año, la mitad en hogares (256), y hoy falta conciencia e infraestructura (256).",
  "PARCIAL", "La información y la conexión entre excedentes y demanda son abordables (inferido). Los hábitos y la infraestructura, solo en parte."),
 "DESASTRE": ("Los residentes de zonas afectadas por desastres y conflictos necesitan que se retiren rápido los escombros y los residuos tóxicos porque se acumulan en las calles (52) y contaminan (37), y hoy la capacidad de recolección se ve superada (inferido).",
  "PARCIAL", "Coordinar la respuesta es abordable. Retirar los residuos es físico."),
 "RECUP": ("Los cartoneros necesitan que los cambios en la recolección los tengan en cuenta porque protestaron contra la instalación de contenedores inteligentes (25), y hoy no se sabe por qué protestaron ni si esos cambios les quitan acceso al material (inferido: la noticia no da el motivo).",
  "PARCIAL", "La coordinación entre recuperadores y el sistema formal tiene una parte de información. El acceso al material es una decisión de política."),
 "INCIN": ("Las poblaciones urbanas necesitan conocer los efectos de quemar residuos para hacer combustible porque eso genera preocupación ambiental y de salud (196), y hoy el texto no dice qué falta.",
  "PARCIAL", "La información sobre emisiones es abordable. La decisión de incinerar es política."),
 "INODORO": ("Los operadores de plantas depuradoras necesitan que no lleguen residuos sólidos por las cloacas porque colapsan las plantas (270), y hoy se tiran al inodoro residuos que deberían ir al cesto (270).",
  "PARCIAL", "La información es abordable. El hábito, solo en parte."),
 "HIGIENE": ("Las usuarias y el ambiente necesitan alternativas a los productos de higiene femenina no reciclables porque se descartan unos 100 billones por año con contenido plástico (18), y hoy no se reciclan.",
  "NO", "Es un problema de diseño del producto."),
 "GENERAC": ("La Ciudad de Buenos Aires necesita reducir la basura que genera cada habitante porque supera 1,35 kg por día (281), y hoy faltan conocimiento y separación, que además tiene costos (281).",
  "PARCIAL", "La información es abordable. El consumo, no."),
 "ESPACIAL": ("Las comunidades costeras del Golfo de México necesitan que no les caigan fragmentos de cohetes porque amenazan la biodiversidad y la salud (530), y hoy no hay control (inferido).",
  "NO", "Depende de regulación de la actividad espacial."),
}

# ---------------- 4. Puntuación (criterio propio, justificado) ----------------
# impacto, innovación, factibilidad, escalabilidad, ecosistema, justificación
PTS = {
 "MERCADO": (3, 3, 3, 4, 2, "Impacto económico y de empleo (185). Las 8 parciales solo crean demanda. Hay datos de precios (448). Aparece en EE. UU., Europa y Australia. En Argentina solo 375 y nada de Córdoba."),
 "PLASMAR": (4, 3, 2, 4, 2, "Daño a fauna y costas. No hay soluciones en el dataset, pero sí limpiezas en filas ocultas. La parte física limita la factibilidad. Es global. En Argentina solo la costa (15)."),
 "MARCAS": (3, 4, 3, 4, 1, "Engaño a consumidores. Solo hay un demostrador (131). Los datos dependen de las empresas. Son multinacionales, pero no hay ningún actor local en el texto."),
 "PLASPROD": (4, 2, 1, 4, 1, "Impacto global alto. Es un tema muy tratado. Depende de regulación y producción. Ninguna fila local."),
 "BASURAL": (4, 4, 3, 3, 5, "Agua potable (274), plagas (283) y salud (298). Ninguna solución. Detectarlos y registrarlos es abordable; cerrarlos no. Hay casos en varias localidades. 3 casos en Córdoba (30, 274, 400) y la provincia como actor (400)."),
 "MICRO": (4, 3, 2, 4, 1, "Salud humana. Hay una sola solución directa más la herramienta de 165. Medir requiere laboratorio (inferido). Es global. No hay filas argentinas."),
 "EXPORT": (3, 3, 2, 3, 1, "Afecta a los países receptores. Hay soluciones parciales de capacidad. La decisión es política. Es un flujo entre países. Sin vínculo local."),
 "FUEGO": (4, 4, 3, 3, 4, "Accidentes viales (294) y salud (188). Ninguna solución. El monitoreo es abordable; el control, no. Aparece en Córdoba, Australia y Sudáfrica. Un caso en Freyre, Córdoba (22)."),
 "DESCART": (3, 2, 3, 4, 2, "Volumen alto, pero el daño se describe poco. Hay varias soluciones parciales. Coordinar la reutilización es posible. Es masivo. Las filas son internacionales; solo 74 (Cosquín Rock) es local, y es una solución."),
 "DIFICIL": (2, 2, 3, 3, 1, "Afecta sobre todo a operadores. Ya hay guías de diseño (169, 356). El límite es el material. EE. UU. y Europa. Sin vínculo local."),
 "ACUM": (3, 4, 4, 3, 5, "Ratas y enfermedades (212, 373, 542). Ninguna solución. La coordinación es abordable si la causa se confirma. Aparece en ciudades de varios países. 3 casos en Córdoba (170, 284, 306)."),
 "VERTIDO": (3, 4, 3, 3, 1, "Contaminación de suelo y agua. Ninguna solución. Detectar y denunciar es abordable. Aparece en varios países. Sin filas argentinas."),
 "SERVICIO": (3, 4, 3, 2, 4, "Basura en la calle. Ninguna solución. Los avisos son abordables, los conflictos no. Depende de cada municipio. Lusa en Córdoba (272) y CEAMSE (267), pero son noticias de 2012–2015."),
 "TRABSEG": (5, 4, 2, 3, 4, "Muertes (107, 309). Ninguna solución. Lo central (seguridad física, equipo) no es de software. Pasa en basurales de todo el país (inferido). Córdoba (107, 209)."),
 "TASAS": (2, 3, 3, 3, 1, "Es un indicador, no un daño directo. Solo hay metas parciales. Medir es posible. Aplica a cualquier ciudad. España y Colombia."),
 "PATOG": (4, 3, 3, 3, 3, "Riesgo de contagio (292). Solo una solución vecina. La trazabilidad es abordable. Aplica a cualquier sistema de salud. Palermo, CABA (5)."),
 "RELLENO": (3, 2, 1, 3, 3, "Saturación. Hay aprovechamiento energético parcial. Depende de infraestructura. Pasa en muchas ciudades. Argentina (3)."),
 "SEPAR": (2, 2, 3, 3, 3, "Efecto indirecto. Hay varias parciales. Una parte es abordable. Aplica a cualquier hogar. CABA (101)."),
 "COMPOST": (2, 3, 4, 3, 1, "Daño acotado (suelo, 195). Solo hay una metodología parcial. Es un problema de información. Aplica en varios países. Sin vínculo local."),
 "AGRO": (4, 4, 4, 3, 3, "Millones de envases con restos tóxicos (49; los tóxicos son inferidos). Solo una solución vecina. Ya hay centros de acopio y falta trazabilidad (36). Aplica a otras zonas agrícolas (inferido). Pampa húmeda y Buenos Aires; Córdoba no aparece en el texto."),
 "TURISMO": (2, 3, 3, 3, 5, "Daño local. Solo una parcial sin descripción. La educación es abordable. Aplica a cualquier destino turístico. Balneario de Córdoba (16) y Cosquín Rock (74)."),
 "TRAZA": (2, 2, 5, 4, 3, "Impacto indirecto (cumplimiento). Ya hay soluciones parciales y ocultas, una de ellas en Córdoba (124). Es puramente de información. Aplica a cualquier empresa. Fuente argentina (481, ECOBIZ)."),
 "IMPRECI": (2, 3, 2, 2, 1, "Impacto acotado. Solo una parcial. Medir es posible; cambiar la tecnología, no. Nicho. Sin vínculo local."),
 "DESASTRE": (3, 3, 2, 2, 1, "Grave pero esporádico. Ninguna solución. Lo central es físico. Episódico. Sin vínculo local."),
 "RECUP": (4, 4, 3, 3, 2, "Sustento de los recuperadores (inferido). Ninguna solución. La coordinación es posible. Aplica a muchas ciudades. Sin ubicación en el texto (25)."),
 "INCIN": (2, 3, 2, 2, 1, "Preocupación sin daño descrito. Ninguna solución. La decisión es política. Nicho. Sin vínculo local."),
 "PELIG": (4, 3, 2, 2, 4, "Agua contaminada (11). Solo soluciones vecinas. El control es regulatorio. Caso puntual. Córdoba, aunque de 2017."),
 "INODORO": (2, 3, 3, 2, 1, "Daño a la infraestructura. Ninguna solución. La información es posible. Nicho. Sin vínculo local."),
 "HIGIENE": (2, 3, 1, 3, 1, "Volumen alto. Ninguna solución. Es diseño de producto. Global. Sin vínculo local."),
 "METALES": (2, 2, 2, 2, 1, "Impacto difuso. Hay soluciones de reciclaje. Es industrial. Nicho. Sin vínculo local."),
 "GENERAC": (2, 2, 2, 3, 3, "Es un indicador. Hay soluciones de separación. Depende del consumo. Aplica a cualquier ciudad. CABA (281)."),
 "ESPACIAL": (2, 3, 1, 1, 1, "Daño puntual. Ninguna solución. Es regulatorio. Caso único. Sin vínculo local."),
 "DESPERD": (3, 3, 3, 4, 1, "Volumen alto (58 Mt). Solo compostaje parcial. La información es posible (inferido). Es global. Solo UE."),
}
W = dict(impacto=0.25, innovacion=0.20, factibilidad=0.20, escalabilidad=0.15, ecosistema=0.10)

def solidez(n, f):
    if n >= 5 and f >= 4: return "ALTA"
    if n <= 2: return "BAJA"
    return "MEDIA"

rows = []
for g, (estado, det) in EST.items():
    sub = VAL[VAL.grupo == g]
    n, f = len(sub), sub.fuente.nunique()
    yrs = sorted(int(a) for a in sub.anio.dropna().unique()); sf = int(sub.anio.isna().sum())
    anos = (f"{yrs[0]}–{yrs[-1]}" if yrs else "sin fecha") + (f" (+{sf} sin fecha)" if sf and yrs else "")
    r = dict(codigo=g, problema=GRUPOS[g], filas=", ".join(map(str, sorted(sub.fila))), n_noticias=n, n_fuentes=f, anios=anos,
             estado=estado, detalle_estado=det)
    if g in NEC:
        r.update(necesidad=NEC[g][0], abordable=NEC[g][1], motivo_abordable=NEC[g][2])
    r["solidez"] = solidez(n, f)
    if g in PTS:
        i, nv, fa, es, ec, j = PTS[g]
        r.update(impacto=i, innovacion=nv, factibilidad=fa, escalabilidad=es, ecosistema=ec, justificacion=j,
                 total=round(sum(v * W[k] for k, v in zip(W, (i, nv, fa, es, ec))) / sum(W.values()), 2))
    rows.append(r)
H = pd.DataFrame(rows)
missing = set(H.codigo) - set(EST); assert not missing
assert set(H[H.estado != "CUBIERTO"].codigo) == set(NEC) == set(PTS), (set(H[H.estado != "CUBIERTO"].codigo) ^ set(NEC))
assert set(H.codigo) == set(U[U.n_noticias > 0].index), set(H.codigo) ^ set(U[U.n_noticias > 0].index)
GAP = H[H.estado != "CUBIERTO"].copy()
orden_est = {"SIN SOLUCIÓN": 0, "PARCIAL": 1}
GAP = GAP.sort_values("total", ascending=False)

# Shortlist: total alto, abordable SÍ/PARCIAL y evidencia ALTA o MEDIA; se admite 1 de evidencia BAJA si es abordable SÍ.
cand = GAP[GAP.abordable.isin(["SÍ", "PARCIAL"])]
sl = cand[cand.solidez.isin(["ALTA", "MEDIA"])].head(4)
baja = cand[(cand.solidez == "BAJA") & (cand.abordable == "SÍ")].head(1)
SL = pd.concat([sl, baja])
print(GAP[["codigo", "estado", "abordable", "solidez", "n_noticias", "n_fuentes", "total"]].to_string())
print("SHORTLIST", list(SL.codigo))
H.to_pickle("H.pkl"); SL.to_pickle("SL.pkl")
