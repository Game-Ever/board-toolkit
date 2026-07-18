# Board Toolkit

Herramientas de escritorio para la **Board**: instalar y correr builds de cualquier juego por USB, sacar capturas, subir imágenes y ver logs — sin tocar `adb` a mano.

Trae `adb` empaquetado adentro: los compañeros **no necesitan instalar nada**. Descomprimen, doble clic y funciona.

## Uso

1. Conectar la board por USB (con depuración USB activada).
2. Abrir `Board Toolkit.exe`.
3. La primera vez te pide elegir la **carpeta de builds** (donde están los `.apk`).
4. Elegir un build de la lista → **Instalar** (o Instalar + Lanzar).

### Funciones

**Builds**: instalar, lanzar, reiniciar app, desinstalar, reinstalación limpia (borra datos), y borrar builds de la carpeta (van a la Papelera).
El package name se lee automáticamente del `.apk`, así que nunca falla por un typo.

**Capturas e imágenes**: screenshot del device (carpeta configurable), subir imágenes al device (botón o arrastrando, carpeta destino configurable), y abrir el Media Player (`co.harrishill.mediaplayer` por defecto, cambiable desde ⚙).

**Logcat** en vivo con presets: Juego (por PID), Unity (tag `Unity`), Unity errores, Errores (todos, incluye crashes nativos) y Todo. Coloreado por nivel + filtro de texto.

**Idiomas**: español / inglés (banderitas arriba). Por defecto sigue el idioma del sistema (inglés salvo que la PC esté en español).

## Desarrollo (solo en la máquina de build)

Requiere Node.js instalado.

```
npm install       # instalar dependencias
npm start         # correr en modo desarrollo
npm run dist      # empaquetar a dist/win-unpacked/
npm run zip       # comprimir a dist/BoardToolkit-v<version>.zip
npm run release   # dist + zip, todo junto
```

Para repartir: `npm run release` y mandás el `.zip` de `dist/`.

Si cambia el logo, reemplazá `resources/board_logo.jpg` — el ícono se regenera solo en cada build.

## Estructura

- `main.js` — proceso principal (wrapper de adb, IPC, logcat, screenshots, push).
- `preload.js` — puente seguro renderer ↔ main.
- `renderer/` — interfaz (HTML/CSS/JS, i18n).
- `resources/platform-tools/` — `adb.exe` empaquetado (se copia al build).
- `scripts/` — generación del ícono, aplicación al exe, y armado del zip.

## Notas

- `adb` se resuelve desde la copia empaquetada; si no está, cae al `adb` del PATH.
- Los screenshots se guardan en `Imágenes/BoardToolkit/` por defecto.
- El `.exe` **no está firmado**: la primera vez Windows SmartScreen puede avisar → *Más información → Ejecutar de todas formas*. Se evita firmar a propósito (requiere certificado y rompe el build por los symlinks de winCodeSign).
- La config de cada usuario vive en `%APPDATA%/board-toolkit/config.json`.
