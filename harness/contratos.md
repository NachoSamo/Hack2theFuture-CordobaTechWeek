# Contratos entre nodos

> Se escriben en el checkpoint de arquitectura (12/11 ~15:30), **antes de irnos del predio**.
> Mientras esto esté vacío, nadie codea integraciones.

En NextWave funcionó así: la arquitectura era una cadena de nodos que se pasaban datos; cada uno
tomó un nodo, se definieron solo las interfaces y cada nodo se desarrolló contra un JSON de ejemplo
sin esperar al anterior.

## Stack

Se decide en el kickoff según el tipo de prototipo. Registrar en el decision log con opciones.

- **Backend:**
- **Frontend:**
- **Datos:**
- **LLM:**
- **Hardware:**
- **Deploy / cómo se muestra:**

## Nodos y dueños

| Nodo | Qué hace | Carpeta | Dueño | Entrada | Salida | Fixture |
|---|---|---|---|---|---|---|
| 01 Captura | Cuadros del recorrido de un móvil (simulado) | | por definir | Video o imágenes georreferenciadas | Cuadro con lugar, hora y móvil | |
| 02 Detección | Cuadro → evento de basura acumulada | | por definir | Salida de 01 | Evento con lugar, hora, nivel y confianza | |
| 03 Mapa de demanda | Agrega eventos por zona y franja | | por definir | Salida de 02 | Demanda por zona, puntos críticos y zonas sin dato | |
| 04 Optimizador e impacto | Ruta sugerida vs. ruta fija | | por definir | Salida de 03 + flota + ruta fija | Rutas con km, carga y puntos atendidos a tiempo | |
| 05 Panel | Vista municipio y vista recolectora | | por definir | Salidas de 03 y 04 | Pantalla | No aplica |

Nodos del borrador de [`arquitectura/solucion.html`](arquitectura/solucion.html). Carpeta, campos
JSON y fixture los define cada dueño.

## Contratos

Uno por interfaz: forma del JSON con un ejemplo real, no una descripción. El fixture correspondiente
vive en `fixtures/<nodo>.json` y es el mismo ejemplo.

```text
<MÉTODO> /api/...
  request:
  response:
  si falla:
```

## Reglas

1. Los nombres de campos se acuerdan una vez y no se cambian: `id` o `residuo_id`, pero uno solo.
2. Ninguna respuesta tira 500 en la demo: el error va en el body y la UI lo muestra.
3. Cambiar un contrato = actualizar este archivo + su fixture + aviso en `ESTADO.md`, en el mismo commit.
4. Si un archivo es de otro dueño, se le avisa antes de tocarlo.
