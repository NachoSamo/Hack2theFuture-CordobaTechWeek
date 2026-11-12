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
| | | | | | | `fixtures/` |

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
