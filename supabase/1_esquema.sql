-- =====================================================================
-- El Cuestionario Definitivo de Avatar: ranking global
-- Vive en el MISMO proyecto de Supabase que el cuestionario de FNAF,
-- con tablas y funciones propias (prefijo avatar_). Reutiliza el filtro
-- de nicks del FNAF (tabla banned_words y función nick_is_clean).
--
-- Las cuentas (nick + PIN) son de Avatar, separadas de las del FNAF,
-- y las comparten los dos tests de Avatar: el cuestionario y, más
-- adelante, el test de elemento.
--
-- Se puede ejecutar varias veces sin borrar datos.
-- Después ejecuta 2_respuestas.sql.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------- Tablas ----------

-- Jugadores de Avatar: cada nick pertenece a quien lo registró primero.
-- El PIN se guarda cifrado con bcrypt; nunca en texto plano.
create table if not exists public.avatar_players (
  id              bigint generated always as identity primary key,
  nick            text        not null,
  nick_key        text        generated always as (lower(nick)) stored unique,
  pin_hash        text        not null,
  failed_attempts int         not null default 0,
  locked_until    timestamptz,
  created_at      timestamptz not null default now()
);

-- Clave de respuestas del cuestionario (el servidor corrige con esta tabla).
create table if not exists public.avatar_answer_key (
  qid     text     primary key,      -- ej. "atla-001"
  part    smallint not null,         -- número de parte
  correct smallint not null check (correct between 0 and 3)
);

-- Mejor resultado de cada jugador en cada parte del cuestionario.
create table if not exists public.avatar_part_scores (
  player_id  bigint      not null references public.avatar_players(id) on delete cascade,
  part       smallint    not null,
  correct    int         not null,
  answered   int         not null,
  total      int         not null,
  updated_at timestamptz not null default now(),
  primary key (player_id, part)
);

-- ---------- Seguridad ----------
-- RLS activado y SIN políticas: nadie lee ni escribe estas tablas
-- directamente. Todo pasa por las vistas y funciones de abajo.
alter table public.avatar_players     enable row level security;
alter table public.avatar_answer_key  enable row level security;
alter table public.avatar_part_scores enable row level security;

revoke all on public.avatar_players, public.avatar_answer_key, public.avatar_part_scores
  from anon, authenticated;

-- ---------- Ranking público (solo lectura) ----------
-- Expone únicamente nick y números; nunca el PIN.
create or replace view public.avatar_leaderboard as
select
  p.nick,
  sum(ps.correct)::int  as correct,
  sum(ps.answered)::int as answered,
  sum(ps.total)::int    as total,
  count(*)::int         as parts_played,
  (count(*) filter (where ps.answered >= ps.total))::int as parts_completed,
  round(100.0 * sum(ps.correct) / nullif(sum(ps.answered), 0), 1) as accuracy,
  max(ps.updated_at) as updated_at
from public.avatar_part_scores ps
join public.avatar_players p on p.id = ps.player_id
where public.nick_is_clean(p.nick)
group by p.id, p.nick;

create or replace view public.avatar_leaderboard_parts as
select p.nick, ps.part, ps.correct, ps.answered, ps.total
from public.avatar_part_scores ps
join public.avatar_players p on p.id = ps.player_id
where public.nick_is_clean(p.nick);

revoke all on public.avatar_leaderboard, public.avatar_leaderboard_parts from anon, authenticated;
grant select on public.avatar_leaderboard, public.avatar_leaderboard_parts to anon, authenticated;

-- ---------- Estado de un nick: 'libre', 'ocupado' o 'no_permitido' ----------
create or replace function public.avatar_nick_status(p_nick text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when not public.nick_is_clean(p_nick) then 'no_permitido'
    when exists (select 1 from public.avatar_players where nick_key = lower(btrim(p_nick))) then 'ocupado'
    else 'libre'
  end;
$$;

-- ---------- Verificar nick + PIN (uso interno) ----------
-- Registra el nick si es nuevo; si existe, exige el PIN correcto
-- (5 fallos = bloqueo de 15 minutos). Devuelve el id del jugador o un error.
-- La usarán el cuestionario y el futuro test de elemento.
create or replace function public.avatar_auth(p_nick text, p_pin text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_player public.avatar_players%rowtype;
  v_fails  int;
begin
  p_nick := btrim(coalesce(p_nick, ''));

  if p_nick !~ '^[A-Za-z0-9_.ÁÉÍÓÚÜÑáéíóúüñ-]{3,20}$' then
    return jsonb_build_object('ok', false, 'error', 'nick_invalido');
  end if;
  if not public.nick_is_clean(p_nick) then
    return jsonb_build_object('ok', false, 'error', 'nick_no_permitido');
  end if;
  if p_pin is null or p_pin !~ '^[0-9]{6}$' then
    return jsonb_build_object('ok', false, 'error', 'pin_invalido');
  end if;

  select * into v_player from public.avatar_players where nick_key = lower(p_nick) for update;

  if not found then
    begin
      insert into public.avatar_players (nick, pin_hash)
      values (p_nick, crypt(p_pin, gen_salt('bf', 10)))
      returning * into v_player;
      return jsonb_build_object('ok', true, 'id', v_player.id, 'nuevo', true);
    exception when unique_violation then
      return jsonb_build_object('ok', false, 'error', 'reintentar');
    end;
  end if;

  if v_player.locked_until is not null and v_player.locked_until > now() then
    return jsonb_build_object('ok', false, 'error', 'bloqueado', 'hasta', v_player.locked_until);
  end if;

  if v_player.pin_hash <> crypt(p_pin, v_player.pin_hash) then
    v_fails := v_player.failed_attempts + 1;
    if v_fails >= 5 then
      update public.avatar_players
         set failed_attempts = 0, locked_until = now() + interval '15 minutes'
       where id = v_player.id;
      return jsonb_build_object('ok', false, 'error', 'bloqueado', 'hasta', now() + interval '15 minutes');
    end if;
    update public.avatar_players set failed_attempts = v_fails where id = v_player.id;
    return jsonb_build_object('ok', false, 'error', 'pin_incorrecto', 'intentos_restantes', 5 - v_fails);
  end if;

  update public.avatar_players set failed_attempts = 0, locked_until = null where id = v_player.id;
  return jsonb_build_object('ok', true, 'id', v_player.id, 'nuevo', false);
end;
$$;

-- ---------- Publicar puntaje del cuestionario ----------
-- Recibe nick, PIN (6 dígitos), partes jugadas y respuestas {"atla-001": 1, ...}.
-- Corrige en el servidor, parte por parte, y guarda solo si mejora.
create or replace function public.avatar_submit_score(
  p_nick    text,
  p_pin     text,
  p_parts   int[],
  p_answers jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_auth     jsonb;
  v_pid      bigint;
  v_old      public.avatar_part_scores%rowtype;
  v_row      record;
  v_improved smallint[] := '{}';
  v_parts    smallint[];
  v_total    int := 0;
  v_answered int := 0;
  v_correct  int := 0;
  v_sum_c    int;
  v_sum_a    int;
  v_done     int;
  v_played   int;
  v_upd      timestamptz;
  v_rank     int;
begin
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then
    return jsonb_build_object('ok', false, 'error', 'respuestas_invalidas');
  end if;

  v_parts := array(
    select distinct x::smallint from unnest(coalesce(p_parts, '{}')) as x
    where x between 1 and 99 order by 1
  );
  if not exists (select 1 from public.avatar_answer_key where part = any(v_parts)) then
    return jsonb_build_object('ok', false, 'error', 'partes_invalidas');
  end if;

  v_auth := public.avatar_auth(p_nick, p_pin);
  if not (v_auth->>'ok')::boolean then
    return v_auth;
  end if;
  v_pid := (v_auth->>'id')::bigint;

  for v_row in
    select k.part,
           count(*)::int                                                  as total,
           count(a.value)::int                                            as answered,
           (count(*) filter (where a.value::text = k.correct::text))::int as correct
      from public.avatar_answer_key k
      left join jsonb_each(p_answers) as a on a.key = k.qid
     where k.part = any(v_parts)
     group by k.part
  loop
    v_total    := v_total + v_row.total;
    v_answered := v_answered + v_row.answered;
    v_correct  := v_correct + v_row.correct;

    continue when v_row.answered = 0;

    select * into v_old from public.avatar_part_scores
     where player_id = v_pid and part = v_row.part;

    if not found
       or v_row.correct > v_old.correct
       or (v_row.correct = v_old.correct and v_row.answered < v_old.answered) then
      insert into public.avatar_part_scores (player_id, part, correct, answered, total, updated_at)
      values (v_pid, v_row.part, v_row.correct, v_row.answered, v_row.total, now())
      on conflict (player_id, part) do update
        set correct = excluded.correct,
            answered = excluded.answered,
            total = excluded.total,
            updated_at = excluded.updated_at;
      v_improved := v_improved || v_row.part;
    end if;
  end loop;

  select coalesce(sum(correct), 0)::int, coalesce(sum(answered), 0)::int,
         (count(*) filter (where answered >= total))::int, count(*)::int, max(updated_at)
    into v_sum_c, v_sum_a, v_done, v_played, v_upd
    from public.avatar_part_scores where player_id = v_pid;

  if v_played > 0 then
    select count(*) + 1 into v_rank
      from (
        select ps.player_id, sum(ps.correct) as c, sum(ps.answered) as a, max(ps.updated_at) as u
          from public.avatar_part_scores ps
          join public.avatar_players p on p.id = ps.player_id
         where public.nick_is_clean(p.nick)
         group by ps.player_id
      ) x
     where x.c > v_sum_c
        or (x.c = v_sum_c and x.a < v_sum_a)
        or (x.c = v_sum_c and x.a = v_sum_a and x.u < v_upd);
  end if;

  return jsonb_build_object(
    'ok', true,
    'nuevo', (v_auth->>'nuevo')::boolean,
    'mejoro', array_length(v_improved, 1) is not null,
    'partes_mejoradas', to_jsonb(v_improved),
    'correct', v_correct,
    'answered', v_answered,
    'total', v_total,
    'acum_correct', v_sum_c,
    'acum_answered', v_sum_a,
    'partes_completas', v_done,
    'partes_jugadas', v_played,
    'puesto', v_rank
  );
end;
$$;

-- ---------- Permisos ----------
-- avatar_auth es interna: no se puede llamar desde la web.
revoke all on function public.avatar_auth(text, text) from public, anon, authenticated;
revoke all on function public.avatar_nick_status(text) from public;
revoke all on function public.avatar_submit_score(text, text, int[], jsonb) from public;
grant execute on function public.avatar_nick_status(text) to anon, authenticated;
grant execute on function public.avatar_submit_score(text, text, int[], jsonb) to anon, authenticated;
