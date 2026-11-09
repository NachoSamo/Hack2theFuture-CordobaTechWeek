# Análisis de Croma

Fecha: 4/11/2026. Fuente: [usecroma.com/es](https://usecroma.com/es) y [su documentación](https://docs.usecroma.com/).

**Croma no reemplaza nuestro pipeline, porque no cubre registros de Argentina.** Puede servir como complemento para contrastar problemas y soluciones con otros países, y para investigar desde Claude sin programar.

## Qué revisé

- **Leído:** inicio, precios, soluciones, industrias, MCP, gobierno, términos, `llms.txt`, blog del hackathon, SECOP en el blog y guías de fuentes clave.
- **Búsqueda automática:** toda la documentación (`llms-full.txt`) por "Argentina", "residuos" y "waste".
- **No revisado:** las 640 URL del sitemap una por una, ni los términos de la API, que se aceptan al crear una clave.
- **No probado:** no creé una cuenta ni hice consultas. Los números y la calidad de los datos salen de lo que publica Croma.

## Qué es

Croma es una API que reúne registros públicos oficiales de varios países y los entrega como datos estructurados. También funciona como conector MCP, para consultarlos en lenguaje natural desde Claude, ChatGPT u otros clientes.

Publica 401 endpoints, 134 fuentes oficiales y 9 países: Bolivia, Brasil, Chile, Colombia, El Salvador, Estados Unidos, Japón, México y Perú. Su foco es legal, cumplimiento, finanzas y contratación pública, no ambiente.

## Cómo funciona

```text
Pregunta en Claude o ChatGPT ─┐
                              ├─> Croma ─> Registro oficial o copia actualizada ─> Respuesta con su fuente
Llamada POST con API key ─────┘
```

| Forma de uso | Cómo se usa | Para quién |
|---|---|---|
| Conector MCP | Se agrega `api.croma.run/mcp` en Claude, ChatGPT o Cursor, y se inicia sesión | Cualquiera del equipo, sin programar |
| API | `POST https://api.croma.run/...` con una clave | Scripts y productos |
| Herramientas web | Páginas públicas de consulta, como la búsqueda web | Pruebas rápidas |

### Tipos de consulta

| Tipo | Qué hace | Créditos |
|---|---|---|
| Consulta en vivo | Va a la fuente en ese momento; si está caída, devuelve un error | 10 |
| Dataset | Responde desde una copia completa que mantiene Croma, con la fecha `as_of` | 1 |

También ofrece consultas por lote de hasta 50 elementos y monitores.

### Precios

| Plan | Precio por mes | Créditos | Equivale a |
|---|---|---|---|
| Free | USD 0, sin tarjeta | 1.500 | 150 consultas en vivo o 1.500 a datasets |
| Hobby | USD 20 | 20.000 | 2.000 en vivo o 20.000 a datasets |
| Standard | USD 99 | 100.000 | 10.000 en vivo o 100.000 a datasets |

Hay planes más grandes y un plan gratis para entidades públicas con correo institucional, que no aplica a nosotros.

## Qué tiene relación con los tracks

| Track | Fuente | Qué ofrece | Alcance |
|---|---|---|---|
| Residuos | SECOP | Procesos y contratos públicos; su guía usa "recolección de residuos" como ejemplo. Incluye indicadores de obligaciones ambientales y posconsumo | Colombia |
| Residuos y otros | TerriData | Unos 1.750 indicadores territoriales, incluidos servicios públicos y ambiente | Colombia |
| Biodiversidad | IBAMA | Embargos ambientales desde 1987, por deforestación, quemas y otras infracciones | Brasil |
| Biodiversidad y movilidad | SIATA | Lluvia, calidad del aire y niveles de ríos | Valle de Aburrá, Colombia |
| Agro | UPRA | Precios de tierras rurales | Colombia |
| Movilidad | TransMilenio | Datos del sistema de transporte; no leí su guía | Bogotá |
| Varios | Banco Mundial | Unos 1.500 indicadores de desarrollo de América Latina y el Caribe. Falta ver si incluye residuos | Regional |

### Herramientas globales

No dependen de un país, así que también sirven para temas de Argentina:

| Herramienta | Qué hace | Límite en el plan gratis |
|---|---|---|
| Web Search | Busca en la web y devuelve enlace, autor, fecha, fragmentos y puntaje | 100 por hora |
| Research | Responde una pregunta abierta con un informe con citas | 10 por hora y 100 por día |
| Extract | Convierte una página pública en Markdown o datos estructurados | 60 por hora y 100 por día |
| Generate | Resume o clasifica una página según instrucciones | 60 por hora, compartidas con Extract, y 100 por día |

## Cómo podría ayudarnos

| Etapa del pipeline | Uso posible | Valor esperado |
|---|---|---|
| 8. Contraste con soluciones | Ver si algo parecido ya se contrata o existe en otros países, con SECOP, Web Search o Research | Alto |
| 8. Contraste con datos | Comparar con indicadores del Banco Mundial o TerriData | Medio; falta ver si hay datos de residuos |
| Validar empresas | Revisar en registros oficiales una empresa colombiana o de otro país cubierto | Medio; no sirve para empresas argentinas |
| Durante la hackathon | Consultar desde Claude sin programar, por ejemplo para comprobar una afirmación | Medio |
| 2. Scraping | Convertir páginas sueltas con Extract | Bajo; el límite es chico y no cambia los permisos de cada medio |

Un ejemplo de prueba, para adaptar:

```text
Busca en SECOP procesos de 2025 sobre recolección de residuos.
Agrúpalos por tipo de servicio y por departamento, y dime el valor total de cada grupo.
Cita la fuente y la fecha de los datos.
```

## Límites

- **Argentina:** no aparece entre los países cubiertos. La única mención en toda la documentación es una nota sobre encuestas de pobreza del Banco Mundial.
- **Residuos:** "residuos" o "waste" aparece una sola vez en la documentación, en el ejemplo de SECOP.
- **Comparación regional:** lo que funciona en Colombia o Brasil no prueba que sirva en Córdoba. Solo da una pista para investigar.
- **Datos:** los términos dicen que se entregan como los publica la fuente, sin garantía de que sean completos, exactos o actuales.
- **Datos personales:** el usuario responde por la base legal de lo que consulta. Para nuestro uso conviene buscar empresas y contratos, no personas.
- **Búsqueda web:** Research y Web Search no son registros oficiales, así que hay que abrir y revisar sus fuentes.
- **Inconsistencia del sitio:** algunas páginas hablan de 5 países y otras de 9. Los términos mencionan Colombia, Perú y México al hablar de responsabilidad.

## Qué haría

1. **Probarlo 30 minutos con el plan gratis:** conectar el MCP a Claude y correr la consulta de ejemplo. Lo tiene que hacer alguien del equipo, porque requiere crear una cuenta.
2. **Medir antes de usarlo:** ver si SECOP y el Banco Mundial dan datos útiles sobre residuos.
3. **Preguntar por Argentina:** Croma dice que suma fuentes públicas a pedido. Se le puede escribir a `hi@usecroma.com`, aunque es poco probable que llegue antes del 12/11.
4. **Dejarlo fuera del scraping:** el pipeline actual ya resuelve esa parte.

## Dudas para el equipo

- ¿Nos sirve comparar con otros países o queremos evidencia solo de Argentina?
- ¿Quién hace la prueba de 30 minutos?
- ¿Qué tendría que mostrar la prueba para usarlo en el contraste?
- ¿Conviene mencionarlo en el pitch? Los criterios de evaluación no están publicados.

## Fuentes

- [Inicio](https://usecroma.com/es)
- [Precios](https://usecroma.com/es/pricing)
- [MCP](https://usecroma.com/es/mcp)
- [Términos](https://usecroma.com/es/terms)
- [Guía de SECOP](https://docs.usecroma.com/es/guides/colombia/secop)
- [Guía de TerriData](https://docs.usecroma.com/es/guides/colombia/terridata)
- [Guía de IBAMA](https://docs.usecroma.com/es/guides/brazil/ibama)
- [Guía del Banco Mundial](https://docs.usecroma.com/es/guides/global/world-bank)
- [Guía de Research](https://docs.usecroma.com/es/guides/global/research)
- [Guía de Extract](https://docs.usecroma.com/es/guides/global/extract)
- [Taller de SECOP](https://usecroma.com/es/blog/claude-conectado-a-secop)
