# Avatar Quest

Tests para fans de Avatar. Todo corre gratis en **GitHub Pages** (la página) y **Supabase** (el ranking), en el mismo proyecto de Supabase que el cuestionario de FNAF.

| Test | Estado | Carpeta |
| --- | --- | --- |
| El Cuestionario Definitivo de Avatar | Disponible: ATLA (60) y Korra (48) | `quiz/` |
| ¿Qué elemento controlarías? (y si serías maestro o no) | Próximamente | `elemento/` (por crear) |

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

### Partes planeadas

| Parte | Contenido | Nota |
| --- | --- | --- |
| 1 | Avatar: La Leyenda de Aang | Lista |
| 2 | La Leyenda de Korra | Lista |
| 3 | Avatar: Seven Havens | Se suma por bloques de episodios (salen los viernes); sus preguntas deben indicar el episodio en `sub` |
| 4 | Cómics | |
| 5 | Novelas | |
| 6 | Serie de Netflix | |
| 7 | Película animada de Aang (2026) | |

Las preguntas de Seven Havens, la película y la serie de Netflix deben armarse desde fuentes verificadas o desde lo visto en pantalla.

## Ranking

- Cada nick suma su mejor resultado en cada parte; repetir una parte no suma dos veces.
- Orden: más correctas primero; en empate, quien respondió menos preguntas; luego quien llegó primero.
- Supabase marca avisos de "security definer" en las vistas y funciones públicas: es intencional, igual que en FNAF. Las vistas solo exponen nick y números, nunca el PIN.

## Plan gratuito

Un proyecto gratuito de Supabase **se pausa tras una semana sin actividad**. Como FNAF y Avatar comparten proyecto, cualquiera de los dos lo mantiene activo. Si se pausa, se reactiva desde el panel con un clic.
