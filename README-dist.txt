===============================================================================
  BOARD TOOLKIT  --  by Game Ever
===============================================================================

  Install and run Board builds over USB or Wi-Fi, take screenshots and video,
  push images, and read Unity logs. Nothing to install: adb ships inside.


-------------------------------------------------------------------------------
  GETTING STARTED
-------------------------------------------------------------------------------

  1. Plug the Board in over USB, with USB debugging enabled.
     The first time, accept the debugging prompt on the Board's screen.

  2. Run "Board Toolkit.exe".

  3. Click "Choose builds folder" and point it at the folder holding
     your .apk files.

  4. Pick a build from the list and hit Install.

  The language follows your system (English / Espanol / Portugues) and can be
  changed any time with the flags at the top right.


-------------------------------------------------------------------------------
  ABOUT THE WINDOWS WARNING
-------------------------------------------------------------------------------

  The .exe is not code-signed, so the first time you run it Windows may show
  "Windows protected your PC".

      Click "More info"  ->  "Run anyway".

  This is expected for an unsigned internal tool. Extract the whole folder
  before running it -- do not run it from inside the .zip.


-------------------------------------------------------------------------------
  WHAT IT DOES
-------------------------------------------------------------------------------

  BUILDS
    Install, Launch, Restart, Uninstall, clean reinstall (wipes data), and
    Reset data (wipes saves without reinstalling the whole build).
    The package name is read from the .apk itself, so it can never be
    mistyped. You are warned before installing an older version over a newer
    one, and offered to replace an app whose signature does not match.
    Builds can be deleted from the folder (they go to the Recycle Bin).
    You can also drop an .apk anywhere on the window to select it.

  MEDIA
    Screenshots and screen recording (max 3 min, no audio -- Android's limit).
    Upload images to the device, by button or drag & drop.
    Open the Board media player.

  LOGCAT
    Live logs with Unity-aware presets: Game (only the running app), Unity,
    Unity errors, Errors (everything, including native crashes), and All.
    Colour-coded by severity, with a text filter, and savable to a file.

  BUG REPORT
    One click bundles a screenshot, the full logcat, and device/build info
    into a .zip that is ready to send.

  WIRELESS
    Press the wireless button while plugged in over USB: the Board switches to
    wireless and connects, and you can unplug the cable. The PC and the Board
    must be on the same network.


-------------------------------------------------------------------------------
  WHERE YOUR FILES GO
-------------------------------------------------------------------------------

  Everything lands under one folder, shown in the MEDIA section and changeable
  with "Change". By default:

      Documents\Board Toolkit\screenshots\
      Documents\Board Toolkit\videos\
      Documents\Board Toolkit\reports\

  Settings are kept in  %APPDATA%\board-toolkit\config.json


-------------------------------------------------------------------------------
  REQUIREMENTS
-------------------------------------------------------------------------------

  Windows. That is all -- adb is bundled, nothing else to install.

===============================================================================
