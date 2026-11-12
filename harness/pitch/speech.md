---
tipo: pitch
fecha: 2026-11-12
dueñas: Oli y Gina
estado: borrador para ensayar (v3, formato oficial híbrido)
---

# Speech: Trama Urbana (3 minutos)

> Acompaña a [`deck.html`](deck.html), una slide por bloque. Son unas 400 palabras más el prototipo en vivo.
>
> **Cómo está armado:** sigue el orden oficial del lienzo 07 (gancho, problema, a quién le pasa,
> solución y prototipo, qué la hace distinta, impacto sostenible, primer paso). Suma lo que la
> organización marca como infaltable: identidad del equipo y evidencia de qué aprendimos. Mantiene el
> contraste TED de "lo que es / lo que podría ser" (Duarte) y empieza por el problema (Sinek).
>
> **Quién presenta:** se decide en el ensayo, por desempeño con cronómetro. Una persona maneja el
> prototipo en vivo.
>
> **Marcas:** `[pausa]` = dos segundos de silencio, mirando al público. `**negrita**` = la palabra que
> se apoya con la voz.

---

### 1 · Identidad (0:00–0:08)

Somos Trama Urbana. Samo, Lauti, Diego, Juani, Gina y Oli.

### 2 · Gancho (0:08–0:25)

¿Sabían que en Córdoba se gastan **dos millones de litros** de combustible por año solo en patrullar?
`[pausa]`
Nafta y gasoil, en patrulleros que circulan todo el día.

### 3 · Problema (0:25–0:40)

Esos vehículos llevan cámaras y ven toda la ciudad, pero hoy solo informan **seguridad**.
`[pausa]`
Lo que ven podría ser mucho más.

### 4 · A quién le pasa (0:40–0:55)

Le pasa a COYS, el área de control de la Municipalidad. Tiene móviles y cámaras en toda la ciudad, y
los usa para **un solo fin**. Mientras tanto, un microbasural o un bache esperan a que un vecino reclame.

### 5 · Lo que podría ser (0:55–1:05)

¿Y si cada kilómetro que ya se recorre aportara a una ciudad más sostenible, más limpia y más eficiente?

### 6 · Solución y prototipo (1:05–1:50)

Los vehículos que hoy recorren la ciudad y gastan combustible pueden usarse para **más de un fin**.
Eso es Trama Urbana. Les mostramos cómo funciona.

*(Cambio al prototipo en vivo.)*

Este es el panel de COYS. Un móvil pasa y la cámara detecta un contenedor desbordado. Se arma un
ticket, y el aviso le llega directo a Higiene Urbana, sin que nadie lo reenvíe. Cuando el móvil vuelve a
pasar y el problema ya no está, el ticket queda como posiblemente resuelto.

*(Vuelta al deck. Si el prototipo falla, ir a la slide 12, el plan B.)*

### 7 · Qué aprendimos (1:50–2:05)

Empezamos optimizando las rutas de la basura. Los mentores nos mostraron algo más grande: no se trata
de un camión, sino de **alertar a cada área** de la ciudad.

### 8 · Qué la hace distinta (2:05–2:20)

Y lo hacemos con costo marginal **cero**: implementamos sobre una flota que ya circula, actuamos sobre
una infraestructura que ya existe y aprovechamos las cámaras que ya tiene.

### 9 · Impacto sostenible (2:20–2:40)

En el ambiente, **cero** kilómetros nuevos. En la comunidad, ninguna área sale a buscar el problema.
En las personas, la calle se arregla antes del reclamo. Cubrimos los ODS 11, 12, 13, 9 y 17.

### 10 · Primer paso (2:40–2:50)

Nuestro primer paso es una reunión con **COYS** y el municipio.

### 11 · Cierre (2:50–3:00)

Mismos kilómetros.
`[pausa]`
El doble de ciudad.
Gracias.

---

## Para los ensayos

- **Cronómetro:** el prototipo es lo que más tiempo se come. Si un ensayo pasa los 3 minutos, se
  recorta primero la slide 5 y después la frase de los ODS.
- **Voz** (Julian Treasure): bajar el ritmo en las slides 2, 5 y 11, y no llenar los silencios.
- **Prueba de la frase** (Seibel): después de un ensayo, pedirle a alguien de otro equipo que repita qué
  hace Trama Urbana. Si no puede, se reescribe la slide 6.
- **Tip oficial no cubierto:** la organización pide "una persona real, no 'la gente'". Elegimos contar a
  COYS como institución. Si aparece una persona concreta (alguien que trabaja ahí o un caso que contó un
  mentor), suma en la slide 4.
- **Si preguntan por el dato:**
  - Los 2 millones de litros son del Ministerio de Seguridad provincial (2023) y no separan el
    patrullaje de otros usos.
  - Son mezclas E17 (83 % nafta) y B20 (80 % gasoil).
  - Los tickets del prototipo son simulados.
- **Prototipo:** se levanta con `npm run dev` en `frontend/`; tenerlo abierto antes de subir. El paso a
  paso del contenedor sale de los botones de simulación del panel (ver `frontend/README.md`).
