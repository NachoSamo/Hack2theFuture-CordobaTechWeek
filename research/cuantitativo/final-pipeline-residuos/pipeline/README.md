# Pipeline de residuos: cómo volver a correrlo

Scripts en Python 3 que toman el CSV de noticias y generan todo lo que está en `../resultados/`. Necesitan `pandas`, `openpyxl` y `matplotlib`. Para recalcular las fórmulas del Excel hace falta LibreOffice.

## Orden

Correr desde esta carpeta (`pipeline/`):

| Paso | Script | Qué hace | Genera |
|---|---|---|---|
| 1 | `analisis.py` | Normaliza categorías, aplica el filtrado (VÁLIDO / DUDOSO / FALSO POSITIVO) y agrupa en problemas únicos | archivos `.pkl` intermedios |
| 2 | `salidas.py` | Arma las hojas base del Excel, los gráficos y el reporte de la etapa 1 | `analisis_problemas_residuos.xlsx`, `reporte_problemas_residuos.md`, `grafico_*.png` |
| 3 | `etapa2.py` | Estado de cada problema, necesidad, abordabilidad, puntajes y shortlist | `H.pkl`, `SL.pkl` |
| 4 | `algoritmo.py` | Regla automática vs. lectura y sensibilidad del ranking (bootstrap, semilla 7) | `algo.pkl` |
| 5 | `hojas_etapa2.py` | Agrega las hojas Huecos, Puntuación, Shortlist, Algoritmo y Cambios | el mismo Excel |
| 6 | LibreOffice | Recalcula las fórmulas del Excel (ver abajo) | el mismo Excel |
| 7 | `fichas.py` | Escribe las 15 fichas y el índice | `fichas/*.md` y un `.zip` |

Paso 6 en Windows (Git Bash):

```bash
"/c/Program Files/LibreOffice/program/soffice.exe" --headless --calc --convert-to xlsx --outdir recalc ../resultados/analisis_problemas_residuos.xlsx && cp recalc/analisis_problemas_residuos.xlsx ../resultados/ && rm -r recalc
```

## Dónde está el criterio

- `etiquetas.py`: el veredicto y el grupo de **cada fila**, leídos a mano, con su motivo. Si alguien no está de acuerdo con una clasificación, se cambia acá.
- `etapa2.py`: estados, necesidades y puntajes de cada problema.
- `fichas_contenido.py`: el texto redactado de las 15 fichas.

Los `.pkl`, los `.txt` y el `.zip` no se suben al repo: se generan de nuevo al correr los scripts.
