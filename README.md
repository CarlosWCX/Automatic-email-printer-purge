## Automatic email printer purge

Script de Google Apps Script que envía **cada semana** por correo una hoja de purga
(cian, magenta, amarillo y negro) a tu impresora para que la imprima sola y así
evitar que se obstruyan las boquillas por falta de uso.

## Cómo funciona

1. Un activador semanal ejecuta `enviarHojaDePurga()`.
2. El script toma la imagen de la hoja de purga desde Google Drive.
3. La envía como adjunto al correo configurado (normalmente la dirección de
   impresión por correo de la impresora: HP ePrint, Epson Connect, etc.).

## Requisitos

- Una cuenta de Google.
- Una impresora que imprima los adjuntos que recibe por correo.
- La imagen de la hoja de purga (`assets/purge-sheet.jpg`) subida a tu Google Drive.

## Instalación (manual)

1. Sube `assets/purge-sheet.jpg` a Google Drive y copia el ID del archivo
   (la parte del enlace entre `/d/` y `/view`).
2. Crea un proyecto en [script.google.com](https://script.google.com) y pega el
   contenido de `src/Code.gs`.
3. En **Configuración del proyecto > Propiedades de la secuencia de comandos**
   añade:

   | Propiedad      | Valor                                              |
   | -------------- | -------------------------------------------------- |
   | `DESTINATARIO` | Correo al que se envía la hoja (el de tu impresora) |
   | `FILE_ID`      | ID del archivo de Drive                            |

4. Ejecuta `enviarHojaDePurga` una vez para probar y aceptar los permisos.
5. Ejecuta `crearTrigger` **una sola vez** para activar el envío semanal.
6. Comprueba en **Activadores** (icono del reloj) que aparece el activador.

## Instalación con clasp (opcional)

```bash
npm install -g @google/clasp
clasp login
cp .clasp.json.example .clasp.json   # edita scriptId
clasp push
```

Después configura las propiedades del script (paso 3) y ejecuta los pasos 4 y 5.

## Personalización

- **Día y hora:** edita `onWeekDay(...)` y `atHour(...)` en `crearTrigger()` y
  vuelve a ejecutarla. Apps Script lanza el activador en una ventana de ±1 hora.
- **Zona horaria:** se define en `src/appsscript.json` (`Europe/Madrid` por defecto).
- **Pausar envíos:** ejecuta `eliminarTriggers()`.

## Privacidad

El correo de destino y el ID del archivo se guardan en las propiedades del script,
no en el código, para que puedas publicar el repositorio sin exponerlos.

## Licencia

MIT

