5/16/2012 JAWS script for Audacity V1.0 by Gary Campbell <campg2003@gmail.com>

This script adds the following scripts for Audacity 2.0.0:
SaySelectionStart 
SaySelectionEnd 
SayActiveCursor
ScriptFileName
HotkeyHelp 
WindowKeysHelp 

This package provides the following:
Keystrokes to speak selection start, selection end or length, and Audio Position from anywhere in the main window.
Keystrokes to move the focus to selection start and selection end/length.
Displays JAWS and Audacity hotkey help.

The script was developed with Audacity 2.0.0 and JAWS 10.0.1178u.  It should probably work with any JAWS 5.0 or later, but if you aren't using JAWS 10.0.1178u you should recompile the scripts with the script manager, or run "<JAWSProgDir\scompile.exe audacity.jss".
There is no specific Braille support at this time.

To install: 
Place the archive in your user-specific JAWS settings folder (such as %appdata%\Freedom Scientific\JAWS\10.0\Settings\enu).
Run it to unpack the files.
If you are not using JAWS 10.0.1178u, select audacity.jss in Windows Explorer and press ENTER to open it in Script Manager.  Then press CTRL+s to compile it and ALT+F4 to close Script Manager.

Messages and string constants are in audacity.jsm facilitating translation.
The script version appears in JAWS hot key help.

I would be interested in feedback on the script and suggestions for improvement, but can't promise any updates.

Here is the text of the JAWS hot key help:
JAWS keystrokes for script version 1.0 5/16/12, for Audacity 2.0.0:

To say the selection start position, press Control+[.
To say the selection end position or length, press Control+].
To move focus to these controls, press the key twice quickly.
To say the Audio Position value, press Alt+Delete.
To say the active cursor while the PC cursor is active, press Alt+Delete twice quickly.
To get help with Audacity hot keys, press JAWSKey+W.
To get the default Windows hot key help, press JAWSKey+W twice quickly.

Enjoy.
