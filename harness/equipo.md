# Equipo

Salió de la reunión del 7/11/2026. Las áreas son un **punto de partida, no cárceles**: cada uno se
mete en todo, pero cada área tiene **una persona responsable** a quien se le pregunta y que sabe
todo sobre esa parte.

## Cómo trabajamos

1. **Fase 0 juntos, sin roles.** Explorar, definir el problema e idear se hace entre todos. Todas
   las problemáticas y todas las ideas valen.
2. **Elegido el problema, nos separamos por fortalezas.** Núcleos separados, interfaces muy juntas.
   Cada uno hace lo que más le sirve al equipo, no lo que quiere aprender: el aprendizaje viene solo.
3. **Dos frentes:** técnica (que la demo funcione y sorprenda) y producto, marca y pitch (que el
   problema, el impacto y el relato sean impecables). Ninguno solo alcanza para ganar.
4. **Samo es el nexo:** baja lo que sale de producto y mentores a lenguaje técnico, y sube al revés
   lo que la técnica habilita ("acá un modelo cambia la idea"). El feedback entre frentes es constante.
5. **Confiar en el otro.** Si alguien dice "esta tarea es mía", es suya. No se controla, se integra.
6. **Si alguien no está cómodo con su área, se habla y se reubica.**

## Áreas y responsables

| Persona | Área base | Responsable de (a quién se pregunta) | Archivos que mantiene |
|---|---|---|---|
| **Samo** | Nexo producto ↔ técnica, arquitectura, harness | Arquitectura, contratos, integración, tiempos | `ESTADO.md`, `contratos.md`, `evento.md` |
| **Lauti** | Técnica: datos, LLM y flujos agénticos | Un nodo de la arquitectura (se asigna en el kickoff) | Su carpeta de código |
| **Diego** | Técnica + pensamiento sistémico; hardware e impresión 3D | Un nodo de la arquitectura (se asigna en el kickoff) | Su carpeta de código |
| **Juani** | Creativo digital: marca, frontend, el "wow" visual | Identidad, frontend, conceptualizar abstracciones | `marca.md`, frontend |
| **Gina** | Producto y estrategia; cara visible con mentores y jurado | Encuadre estratégico (facilitadores, ITC, UE), feedback | `mentores.md` |
| **Oli** | Producto y negocio: mercado, financiamiento, pitch | Mercado, modelo de financiamiento, estructura del pitch | `pitch.md` |

> El reparto entre Gina y Oli es una **propuesta**: "se dividen como quieran". Se confirma en el
> kickoff y se registra en el decision log.

**Dirección del pitch:** la piensa el frente de producto, como un director de cine piensa 3 minutos.
Quién sube al escenario se decide por desempeño en un ensayo, no por deseo. Máximo 2 personas.

**Mentores y jurado:** no somos un equipo aislado. Gina y Oli encabezan, Juani acompaña para
traducir lo conceptual, y cualquiera habla cuando la mesa lo pide. Si no nos conocen, no nos votan.

## Tarjetas para agentes

Cada agente trabaja con una persona y actúa según su área. Si la persona no se presentó, preguntale.

### Agente de técnica (Lauti, Diego)
- **Hace:** código de su nodo contra el contrato y el fixture; el smoke check del demo path.
- **Lee antes:** `contratos.md`, `demo-path.md`, los diagramas de [`arquitectura/`](arquitectura/).
- **No hace:** tocar el nodo de otro, cambiar un contrato sin aviso, escribir copy de pitch o marca.

### Agente de nexo (Samo)
- **Hace:** mantener el harness coherente, traducir decisiones de producto a contratos, integrar
  nodos, y llevar los diagramas de [`arquitectura/`](arquitectura/) entrevistando a cada dueño de nodo.
- **Lee antes:** `ESTADO.md`, `decision-log.md`, `mentores.md`.
- **No hace:** decidir por el equipo; borrar entradas del decision log.

### Agente creativo (Juani)
- **Hace:** frontend y piezas visuales siguiendo `marca.md`; propone cambios de marca ahí, no en el código.
- **Lee antes:** `marca.md`, `demo-path.md`, `contratos.md` (lo que consume la UI).
- **No hace:** inventar colores, tipografías o tono fuera de `marca.md`; tocar backend.

### Agente de producto (Gina, Oli)
- **Hace:** investigar mercado, financiamiento y actores con fuentes; sintetizar notas de mentores;
  redactar y recortar el pitch contra los criterios del jurado.
- **Lee antes:** `evento.md`, `mentores.md`, `pitch.md`, `research/`.
- **No hace:** tocar código; presentar como hecho algo que no se midió.

## Recursos del equipo

- **Hardware:** ESP32 (Samo) e impresora 3D (Diego).
- **Identidad visual previa:** documento de identidad y mascota del seminario de Diego y Lauti, reutilizable como plantilla.
- **Investigación previa:** pipeline de noticias por vertical y triage cualitativo en [`../research/`](../research/).
- **Experiencia:** Samo y Juani ganaron NextWave 2026 con este mismo esquema de harness. Es la primera hackathon de Lauti y Gina.
