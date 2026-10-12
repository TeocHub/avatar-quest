# Avatar Quest

Tests para fans de Avatar. Todo corre gratis en **GitHub Pages** (la página) y **Supabase** (el ranking), en el mismo proyecto de Supabase que el cuestionario de FNAF.

| Test | Estado | Carpeta |
| --- | --- | --- |
| El Cuestionario Definitivo de Avatar | Disponible: 349 preguntas en 5 partes | `quiz/` |
| ¿Qué elemento controlarías? | Disponible: 54 afirmaciones | `elemento/` |

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Portada con los tests |
| `comun.css`, `comun.js` | Estilos, símbolos de los elementos, idioma y nick compartidos por todos los tests |
| `config.js` | Datos de conexión a Supabase (compartidos) |
| `quiz/index.html` | El cuestionario |
| `quiz/preguntas.json` | Banco de preguntas en español (aquí agregas o corriges) |
| `quiz/preguntas.en.json` | La traducción al inglés |
| `supabase/1_esquema.sql` | Tablas, reglas de seguridad y funciones del ranking (prefijo `avatar_`) |
| `supabase/2_respuestas.sql` | La clave de respuestas que usa el servidor para corregir |
| `supabase/3_elemento.sql` | Resultados y estadísticas del test de elemento |
| `elemento/index.html` | El test de elemento |
| `elemento/datos.js` | Preguntas, rasgos, especialidades y naciones del test (aquí se edita) |
| `generar_respuestas.py` | Regenera `2_respuestas.sql` y revisa que las traducciones coincidan |

## Publicar (GitHub Pages)

En el repositorio: **Settings → Pages**, publicar desde la rama `main`, carpeta `/ (root)`. Queda en `https://teochub.github.io/avatar-quest/`.

El backend ya está creado en Supabase. Si alguna vez hay que recrearlo, ejecuta en el SQL Editor `supabase/1_esquema.sql` y después `supabase/2_respuestas.sql`.

## Cuentas: nick + PIN de 6 dígitos

- Las cuentas de Avatar son **independientes de las de FNAF** (tabla `avatar_players`). El filtro de nicks ofensivos sí es el mismo (`banned_words`).
- El primer jugador que publica con un nick lo registra con su PIN, guardado cifrado con bcrypt. Tras 5 PIN incorrectos, el nick se bloquea 15 minutos.
- Ese mismo nick y PIN servirán para todos los tests de Avatar: la función interna `avatar_auth` hace la verificación y la usará también el test de elemento.
- El servidor corrige las respuestas con su propia clave; nadie puede inventar un puntaje.

## Agregar o corregir preguntas

1. Edita `quiz/preguntas.json` y `quiz/preguntas.en.json` (mismos `id`, misma letra `correcta`):

```json
{
  "id": "atla-061",
  "nivel": "I",
  "sub": "Libro 3: Fuego",
  "pregunta": "¿Pregunta?",
  "opciones": ["a", "b", "c", "d"],
  "correcta": "b"
}
```

   - `id` único y que nunca cambie (el ranking lo usa).
   - `nivel`: `B` (básico), `I` (intermedio), `A` (avanzado) o `E` (experto).
   - Para una **parte nueva**, agrega un bloque con `parte`, `corto`, `titulo`, `preguntas` y opcionalmente `elemento` (`air`, `water`, `earth` o `fire`, para el color y el símbolo).

2. Ejecuta `python generar_respuestas.py`.
3. Ejecuta el nuevo `supabase/2_respuestas.sql` en el SQL Editor de Supabase.
4. Sube los cambios a GitHub.

### Partes

| Parte | Contenido | Preguntas |
| --- | --- | --- |
| 1 | Avatar: La Leyenda de Aang | 113 |
| 2 | La Leyenda de Korra | 87 |
| 3 | Cómics (La Promesa, La Búsqueda, La Grieta, Humo y Sombra, Norte y Sur, Desequilibrio, Guerras Territoriales, Ruinas del Imperio) | 70 |
| 4 | Novelas (Kyoshi, Yangchen, Roku) | 43 |
| 5 | Película Avatar Aang (2026) | 36 |
| 6 | Avatar: Seven Havens | Pendiente, cuando la serie avance |

- La serie de Netflix quedó fuera a propósito: cuenta la misma historia que la animada.
- Las preguntas de cómics, novelas y película se armaron contrastando con resúmenes publicados. Algunos nombres en español (por ejemplo, "los Negados" para *the Denied*) pueden diferir del doblaje oficial: corrígelos si conoces el término exacto.
- **Si agregas preguntas a una parte que ya se jugó:** los puntajes guardados no se pierden. Cada resultado guarda el total que tenía la parte cuando se jugó, así que quien la completó sigue contando como "completa". Para sumar las preguntas nuevas, el jugador vuelve a jugar esa parte y se guarda su mejor resultado.

## Ranking

- Cada nick suma su mejor resultado en cada parte; repetir una parte no suma dos veces.
- Orden: más correctas primero; en empate, quien respondió menos preguntas; luego quien llegó primero.
- Supabase marca avisos de "security definer" en las vistas y funciones públicas: es intencional, igual que en FNAF. Las vistas solo exponen nick y números, nunca el PIN.

## Plan gratuito

Un proyecto gratuito de Supabase **se pausa tras una semana sin actividad**. Como FNAF y Avatar comparten proyecto, cualquiera de los dos lo mantiene activo. Si se pausa, se reactiva desde el panel con un clic.

## Test de elemento

**Modelo.** Cada elemento se mide con dos rasgos inspirados en los Cinco Grandes y en la teoría de valores de Schwartz:

| Elemento | Rasgos |
| --- | --- |
| Agua | Adaptabilidad · Vínculo |
| Tierra | Constancia · Arraigo |
| Fuego | Impulso · Intensidad |
| Aire | Apertura · Libertad |

- **Preguntas:** 40 afirmaciones sobre conducta real (5 por rasgo, algunas invertidas para evitar responder siempre "sí"), 8 pares de afirmaciones igual de deseables (cada rasgo aparece 2 veces) y 6 afirmaciones que deciden si eres maestro: intuición y cuerpo frente a método y herramientas.
- **Resultado:** elemento principal y secundario. Si eres maestro, la especialidad depende de esa combinación (por ejemplo, tierra + aire = metal control); si no lo eres, se asigna un rol según tu elemento principal. También muestra la nación en la era de Aang y en la de Korra, y el elemento a cultivar (tu puntaje más bajo), con una práctica concreta.
- **Naciones:** dentro de tu elemento, el lugar se decide por un rasgo de *otro* elemento. Así, dos personas agua pueden encajar en lugares distintos según su matiz. La era de Pavi (Siete Refugios) aparece bloqueada hasta que se conozca mejor la serie.
- **Equilibrio:** en una simulación con 20.000 respuestas al azar, cada elemento sale cerca del 25 %, cada especialidad cerca del 4-5 % y cada nación cerca del 8 %. Si cambias las reglas, conviene volver a revisarlo.
- **Guardado:** usa las mismas cuentas de Avatar (nick + PIN). Se guarda el último resultado de cada jugador, y las estadísticas públicas solo muestran totales por elemento.

Es un juego de autoconocimiento, no una evaluación psicológica. La página lo dice al final del resultado.
