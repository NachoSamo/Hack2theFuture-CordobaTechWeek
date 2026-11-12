---
tipo: pitch
fecha: 2026-11-12
dueñas: Oli y Gina
estado: borrador para ensayar (v4, municipios como usuario y problemas de la ciudad)
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

### 3 · Problemas de la ciudad (0:25–0:45)

Mientras tanto, en la ciudad, la basura se acumula: en el Mercado Norte después del Carnaval, en
Güemes después de cada fin de semana largo. En dos años hubo **66.000 reclamos** de alumbrado. Y en
una sola tormenta, Defensa Civil recibió **198 llamados** por postes caídos o a punto de caer, con cables colgando
y riesgo eléctrico.

### 4 · A quién le pasa (0:45–1:00)

Los municipios monitorean constantemente. Circulan y gastan combustible todo el día. Pero esos
recorridos se usan para **un solo fin**: seguridad.

### 5 · La pregunta (1:00–1:10)

Entonces nos preguntamos: ¿cómo sacamos el máximo beneficio de esos recorridos para hacer una ciudad
más sostenible, conectada y eficiente?

### 6 · Solución y prototipo (1:10–1:55)

Por eso presentamos **Trama Urbana**, una solución que funciona sobre los servicios que el municipio ya
tiene. Con machine learning sobre esas cámaras, detecta puntos de residuos para los camiones de
residuos, postes de luz caídos y riesgo de electrocución, y lo informa **en tiempo real**.

*(Cambio al prototipo en vivo.)*

Un móvil pasa y la cámara detecta un contenedor rebalsado: se arma un ticket. Otra pasada lo vuelve a
ver. El aviso llega directo al área, sin que nadie lo reenvíe. Cuando el móvil vuelve a pasar y el
problema ya no está, queda verificado.

*(Vuelta al deck. Si el prototipo falla, ir a la slide 12, el plan B.)*

### 7 · Qué aprendimos (1:50–2:05)

Empezamos optimizando las rutas de la basura. Los mentores nos mostraron algo más grande: no se trata
de un camión, sino de **alertar a cada área** de la ciudad.

### 8 · Qué la hace distinta (2:05–2:20)

Y lo hacemos con costo marginal **cero**: implementamos sobre una flota que ya circula, actuamos sobre
una infraestructura que ya existe y aprovechamos las cámaras que ya tiene.

### 9 · Impacto sostenible (2:20–2:40)

Así maximizamos la eficiencia del monitoreo y del recorrido, y el balance de emisiones de carbono se
compensa. En el ambiente, **cero** kilómetros nuevos. En la comunidad, ninguna área sale a buscar el problema.
En las personas, la calle se arregla antes del reclamo. Cubrimos los ODS 11, 12, 13, 9 y 17.

### 10 · Primer paso (2:40–2:50)

Nuestro primer paso es una reunión con el **municipio**.

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
- **Tip oficial no cubierto:** la organización pide "una persona real, no 'la gente'". La slide 4
  habla de "los municipios". Si aparece una persona concreta (alguien que trabaja en monitoreo o un caso
  que contó un mentor), suma ahí.
- **Fuentes de la slide 3:**
  - Basura: ficha 03 del research, noticias 284 (Mercado Norte) y 306 (Güemes).
  - Alumbrado: La Voz, unos 66.000 reclamos sobre unas 130.000 luminarias en dos años.
  - Postes: Perfil, 7/8/2026. Defensa Civil recibió 1.400 llamados por una tormenta de viento: 198 por
    columnas o postes caídos o en riesgo, y 23 por cables colgando. Verificado leyendo la nota. La nota
    no habla de electrocución: "riesgo eléctrico" es inferencia nuestra (EPEC pide no tocar cables caídos).
- **Si preguntan por el dato:**
  - Los 2 millones de litros son del Ministerio de Seguridad provincial (2023) y no separan el
    patrullaje de otros usos.
  - Son mezclas E17 (83 % nafta) y B20 (80 % gasoil).
  - Los tickets del prototipo son simulados.
- **Prototipo:** se levanta con `npm run dev` en `frontend/`. Al abrir la página, la secuencia corre
  sola (ticket, avistamiento, aviso y pasada de verificación), y recargar la reinicia. Por eso conviene
  **recargar justo al cambiar al prototipo**, para que el jurado la vea desde el principio (ver
  `frontend/README.md`, que Juani cambió a las 16:50).
