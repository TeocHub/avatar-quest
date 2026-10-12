// Configuración compartida por todos los tests de Avatar.
// Usa el mismo proyecto de Supabase que el cuestionario de FNAF.
// La clave pública está pensada para ir en el navegador: la seguridad
// la ponen las reglas de la base de datos, no el secreto de esta clave.
// Si dejas ambos valores vacíos, los tests funcionan sin ranking.
window.AVATAR_CONFIG = {
  SUPABASE_URL: "https://jhszvjhagrbizmzwsbsk.supabase.co",
  SUPABASE_KEY: "sb_publishable_i3LPuSa0pPAGEC_yaG8pDg_JOeaN9_Y"
};
