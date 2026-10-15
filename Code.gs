/**
 * Printer Purge Mailer
 * Envía cada semana por correo una hoja de purga (CMYK) para que la impresora
 * la imprima y no se tapen los inyectores/boquillas.
 *
 * Configuración (Propiedades del script, NO en el código):
 *   DESTINATARIO -> correo al que se envía (p. ej. el correo de tu impresora)
 *   FILE_ID      -> ID del archivo de imagen en Google Drive
 */

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  const destinatario = props.getProperty('DESTINATARIO');
  const fileId = props.getProperty('FILE_ID');

  if (!destinatario || !fileId) {
    throw new Error(
      'Faltan propiedades del script. Ve a Configuración del proyecto > ' +
      'Propiedades de la secuencia de comandos y añade DESTINATARIO y FILE_ID.'
    );
  }
  return { destinatario, fileId };
}

/** Envía la hoja de purga como adjunto. */
function enviarHojaDePurga() {
  const { destinatario, fileId } = getConfig_();
  const archivo = DriveApp.getFileById(fileId);

  GmailApp.sendEmail(
    destinatario,
    'Hoja de purga',
    'Hoja de purga semanal.',
    {
      attachments: [archivo.getBlob()],
      name: 'Purga semanal'
    }
  );

  console.log('Hoja de purga enviada a ' + destinatario);
}

/**
 * Crea el activador semanal (lunes entre las 9:00 y las 10:00).
 * Ejecútala UNA sola vez. Borra activadores previos para evitar duplicados.
 */
function crearTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    ScriptApp.deleteTrigger(t);
  });

  ScriptApp.newTrigger('enviarHojaDePurga')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();

  console.log('Activador semanal creado.');
}

/** Elimina todos los activadores del proyecto (para pausar los envíos). */
function eliminarTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    ScriptApp.deleteTrigger(t);
  });
  console.log('Activadores eliminados.');
}
