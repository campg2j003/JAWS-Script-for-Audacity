12/4/2012 JAWS script for Audacity V1.2 by Gary Campbell <campg2003@gmail.com> and Dang Manh Cuong <dangmanhcuong@gmail.com>

This JAWS script package adds the following scripts for Audacity 2.0.0 and later:
SaySelectionStart 
SaySelectionEnd 
SayActiveCursor
ScriptFileName
HotkeyHelp 
WindowKeysHelp 

Features:
Keystrokes to speak selection start, selection end or length, and Audio Position from anywhere in the main window.
Keystrokes to move the focus to the selection start and selection end/length controls.
Displays JAWS and Audacity hotkey help.
Speaks main window areas: Toolbars, Track Panel, and selection Bar, as focus moves between them.
Speaks the toolbar name when focus moves from one toolbar to another.
When focus is in the toolbars pressing CTRL+TAB and Shift+CTRL+TAB move to the first control on the next toolbar or the last control on the previous toolbar.
JAWSKey+Delete speaks the current program state: stop, play, play pause, record, or record pause.
Speaks cursor position when left/right arrows are pressed and Audacity is stopped when focus is in the track panel.
Indicates when no project is open (no tracks in track panel) for many operations.
Track gain and pan controls now are passed to the application when the PC cursor is active and focus is in the main window.  Otherwise they execute their default mouse movement functions.
Keystrokes that extend or contract the selection speak the new position (or length).
In many VST plug-ins, keystrokes move focus to the Presets control and activate save/Load Presets.
In many plug-in dialogs control names and values are spoken.  

By uncommenting a couple of key assignments and a script it is possible to use the ENTER key to pause play/record.  I like this because the numpad ENTER key is easier to find than "p" if your hands are off the keyboard.  It is commented out because it disables Select/Unselect Track on Cuong's machine.  (It is supposed to send ENTER when stopped, aod it does for me.)  To activate it, remove the semicolon on the lines for ENTER and NumPadEnter in audacity.jkm and remove (or add semicolon to the start of) the lines containing /* and */ before and after script Enter in audacity.jss.  Try it out and let us know if it works for you and if you like it.

We have had problems getting the state of play, Pause, Record, and Stop on some configurations.  In function GetAudacityState there is commented out code to determine the pressed state of toolbar buttons by testing the button graphic name.  There are also CS_IMG constants for the pressed state of the Play, Pause, and Record buttons that must be uncommented as well.  If the current code doesn't work for you, this might work.  This code needs further work, so if you need this code please let us know.

The script was developed with Audacity 2.0.2 and JAWS 10.0.1178u and 13.  It should probably work with any JAWS after 5.0.exe, although the options for Audacity in Adjust JAWS Verbosity may not look very good.
There is no specific Braille support at this time.

To install: 
Place the installer in a folder on your machine.
Run it to install the files.  If you choose the full install type, you will be able to remove it via Add or Remove Programs, and it will make a folder in your program Files folder to store the uninstaller.  If you choose Just Scripts, it will not be removable from Add or Remove Programs, and it will not create a folder in your Program Files folder or any registry entries.  It also allows you to choose which JAWS versions to install into and whether to install for the current user or all users.
Currently, if you choose the Just Scripts install type, you will not get the README or What's New files.  In this case you should not choose to read the README file  from the Finish page of the installer.
The   installer will compile the script package in each JAWS version.
You can install the installer source by selecting the Custom install type and choosing the Install Installer source component.

Messages and string constants are in audacity.jsm facilitating translation.
The script version appears in JAWS hot key help.

I would be interested in feedback on the script and suggestions for improvement, but can't promise any updates.

Here is the text of the JAWS hot key help:
JAWS keystrokes for script version 1.2 9/20/12, for Audacity 2.0.0 or later:
To say the selection start position, press control+[.
To say the selection end position or length, press control+].
To move focus to these controls, press the key twice quickly.
To say the Audio Position value, press Alt+Delete.
To say the active cursor while the PC cursor is active, press Alt+Delete twice quickly.
To increase gain of focus track, press Alt+Shift+UpArrow.
To reduce gain of focus track, press Alt+Shift+DownArrow.
To adjust pan left, press Alt+Shift+LeftArrow.
To adjust pan right, press Alt+Shift+RightArrow.
The last 4 keys replace the default Jaws mouse movement scripts while focus is in the main window. If you want to activate the original functionality while
in the main window, turn on the Jaws cursor.
To toggle speech on or off, press shift+jawskey+s.
To toggle alert messages on or off, press Control+`).  This duplicates the Announce Audacity messages option in Adjust JAWS options.
See the what's new.txt for mor info.
In a toolbar to move to the next toolbar press Control+Tab
In a toolbar to move to the previous toolbar press Control+Shift+Tab
To speak the program's state (play/pause/record/stop) press JAWSKey+delete
To reset all script options to default values, press Shift+Control+`
To get help with Audacity hot keys, press JAWSKey+W.
To get the default Windows hot key help, press JAWSKey+W twice quickly.
To change settings for the Audacity script press JAWSKey+V.

In some common VST plugins, such as L1V:
To set focus to the preset option, press Alt+P.
To load an existing preset, press  Alt+L.
To save the current settings as a preset, press  Alt+S.

To change settings for the Audacity script press JAWSKey+V. 

Enjoy!
