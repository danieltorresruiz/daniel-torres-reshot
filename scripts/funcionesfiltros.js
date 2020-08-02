export function obtenerDiaEspanol(prefijo, fecha) {
    const DAYS = {
                   "days": [
                     "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
                   ]
                 }
    const DIAS_SEMANA = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    const dayWeek = fecha.toString().substring(0,3);
    const index = DAYS.days.indexOf(dayWeek);
    return prefijo + DIAS_SEMANA[index] + ",";
}

export function obtenerFechaZonaHoraria(fechaInput) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const timeZone = getTimeZone(now);
  const fechaHora = new Date(utc + 3600000 * timeZone);
  const anio = fechaInput.substring(0,4);
  const mes = parseInt(fechaInput.substring(5,7)) - 1;
  const dia = fechaInput.substring(8,10);
  return new Date(anio, mes, dia, fechaHora.getHours(), fechaHora.getMinutes(), fechaHora.getSeconds());
}

function getTimeZone(now) {
  const offset = now.getTimezoneOffset(), o = Math.abs(offset);
  return (offset < 0 ? "+" : "-") + ("" + Math.floor(o / 60)).slice(-2);
}
