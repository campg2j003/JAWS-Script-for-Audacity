(This file last updated 8/25/2012)
8/10/2012 JAWS script for Audacity V1.1 by Gary Campbell <campg2003@gmail.com>
Modified
By Dang Manh Cuong: Friday, August 10, 2012 (using Jaws 13.0)

This script adds the following scripts for Audacity 2.0.0:
SaySelectionStart 
SaySelectionEnd 
SayActiveCursor
ScriptFileName
HotkeyHelp 
WindowKeysHelp 
Increase gain of focus track
Reduce gain of focus track
Adjust pan left
adjust pan right
MuteSynthesizer
AnnounceOn off
This script provides the following:
Keystrokes to speak selection start, selection end or length, and Audio Position from anywhere in the main window.
Keystrokes to move the focus to selection start and selection end/length.
Displays JAWS and Audacity hotkey help.
Speaks alert messages for some Audacity hotkeys. Read the what's new.txt for mor more information.
The script was developed with Audacity 2.0.0 and JAWS 10.0.1178u.  It should probably work with any JAWS after 5.0, but if you aren't using JAWS 10.0.1178u you should recompile the scripts with the script manager, or run "<JAWSProgDir\scompile.exe audacity.jss".
There is no specific Braille support at this time.

To install: 
Place the installer executable in a folder of your choice.
Run it to install the files.
The installer should compile the scripts.  If you you need to cmmpile it "manually", select audacity.jss in Windows Explorer and press ENTER to open it in Script Manager.  Then press CTRL+s to compile it and ALT+F4 to close Script Manager.

Many (but not all) messages and string constants are in audacity.jsm facilitating translation to other languages.
The script version appears in JAWS hot key help.

I would be interested in feedback on the script and suggestions for improvement, but can't promise any updates.

Here is the text of the JAWS hot key help:
JAWS keystrokes for script version 1.1 8/10/12, for Audacity 2.0.0 or later:
To say the selection start position, press control+[.
To say the selection end position or length, press control+].
To move focus to these controls, press the key twice quickly.
To say the Audio Position value, press Alt+Delete.
To say the active cursor while the PC cursor is active, press Alt+Delete twice quickly.
To increase gain of focus track, press Alt+Shift+UpArrow.
To reduce gain of focus track, press Alt+Shift+DownArrow.
To adjust pan left, press Alt+Shift+LeftArrow.
To adjust pan right, press Alt+Shift+RightArrow.
The last 4 keys replace the default Jaws mouse movement scripts while focus is in the main window. If you want to activate the original functionality while in the main window, turn on the Jaws cursor.
To toggle speech on or off, press shift+jawskey+s.
To toggle alert message on or off, press Control+`). See the what's new.txt for mor info.
To get help with Audacity hot keys, press Insert+W.
To get the default Windows hot key help, press Insert+W twice quickly.

To close this message, press Escape
