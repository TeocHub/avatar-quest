-- =====================================================================
-- Test "¿Qué elemento controlarías?": resultados y estadísticas.
-- Usa las mismas cuentas de Avatar (avatar_players) y la función
-- interna avatar_auth del archivo 1_esquema.sql.
-- Se puede ejecutar varias veces sin borrar datos.
-- =====================================================================

-- Último resultado de cada jugador (rehacer el test lo reemplaza).
create table if not exists public.avatar_element_results (
  player_id    bigint      primary key references public.avatar_players(id) on delete cascade,
  element      text        not null check (element   in ('air','water','earth','fire')),
  secondary    text        not null check (secondary in ('air','water','earth','fire')),
  bender       boolean     not null,
  specialty    text        not null check (specialty    ~ '^[a-z_]{2,40}$'),
  nation_aang  text        not null check (nation_aang  ~ '^[a-z_]{2,40}$'),
  nation_korra text        not null check (nation_korra ~ '^[a-z_]{2,40}$'),
  scores       jsonb       not null,
  updated_at   timestamptz not null default now()
);

alter table public.avatar_element_results enable row level security;
revoke all on public.avatar_element_results from anon, authenticated;

-- Estadísticas públicas: cuántos jugadores hay por elemento y por tipo.
-- No expone nicks ni puntajes individuales.
create or replace view public.avatar_element_stats as
select r.element, r.bender, count(*)::int as players
from public.avatar_element_results r
join public.avatar_players p on p.id = r.player_id
where public.nick_is_clean(p.nick)
group by r.element, r.bender;

revoke all on public.avatar_element_stats from anon, authenticated;
grant select on public.avatar_element_stats to anon, authenticated;

-- Guardar el resultado del test con nick + PIN.
create or replace function public.avatar_save_element(
  p_nick         text,
  p_pin          text,
  p_element      text,
  p_secondary    text,
  p_bender       boolean,
  p_specialty    text,
  p_nation_aang  text,
  p_nation_korra text,
  p_scores       jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_auth jsonb;
  v_pid  bigint;
begin
  if p_element not in ('air','water','earth','fire')
     or p_secondary not in ('air','water','earth','fire')
     or p_element = p_secondary
     or p_bender is null
     or coalesce(p_specialty, '')    !~ '^[a-z_]{2,40}$'
     or coalesce(p_nation_aang, '')  !~ '^[a-z_]{2,40}$'
     or coalesce(p_nation_korra, '') !~ '^[a-z_]{2,40}$'
     or p_scores is null or jsonb_typeof(p_scores) <> 'object'
     or length(p_scores::text) > 2000 then
    return jsonb_build_object('ok', false, 'error', 'resultado_invalido');
  end if;

  v_auth := public.avatar_auth(p_nick, p_pin);
  if not (v_auth->>'ok')::boolean then
    return v_auth;
  end if;
  v_pid := (v_auth->>'id')::bigint;

  insert into public.avatar_element_results
    (player_id, element, secondary, bender, specialty, nation_aang, nation_korra, scores, updated_at)
  values
    (v_pid, p_element, p_secondary, p_bender, p_specialty, p_nation_aang, p_nation_korra, p_scores, now())
  on conflict (player_id) do update
    set element = excluded.element,
        secondary = excluded.secondary,
        bender = excluded.bender,
        specialty = excluded.specialty,
        nation_aang = excluded.nation_aang,
        nation_korra = excluded.nation_korra,
        scores = excluded.scores,
        updated_at = excluded.updated_at;

  return jsonb_build_object('ok', true, 'nuevo', (v_auth->>'nuevo')::boolean);
end;
$$;

revoke all on function public.avatar_save_element(text, text, text, text, boolean, text, text, text, jsonb) from public;
grant execute on function public.avatar_save_element(text, text, text, text, boolean, text, text, text, jsonb) to anon, authenticated;
