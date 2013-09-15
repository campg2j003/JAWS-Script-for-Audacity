9/15/2013 JAWS script for Audacity V2.0 (for script version 2.0 9/14/13 19:56UTC) by Gary Campbell <campg2003@gmail.com> and Dang Manh Cuong <dangmanhcuong@gmail.com>

This JAWS script package provides support for Audacity 2.0.0 and later.

Features:
Keystrokes to speak selection start, selection end or length, and Audio Position from anywhere in the main window.
Keystrokes to move the focus to the selection start and selection end/length controls.
Displays JAWS and Audacity hotkey help.
The Audacity 2.0.3 Guide for JAWS users, by David Bailes, is accessible from the Audacity keys help (JAWSKey+w).
Speaks main window areas: Toolbars, Track Panel, and selection Bar, as focus moves between them.
Speaks the toolbar name when focus moves from one toolbar to another.
When focus is in the toolbars pressing CTRL+TAB and Shift+CTRL+TAB move to the first control on the next toolbar and the last control on the previous toolbar, respectively.
JAWSKey+Delete speaks the current program state: stop, play, play pause, record, or record pause.
Speaks cursor position when left/right arrows are pressed and Audacity is stopped when focus is in the track panel.
Indicates when no project is open (no tracks in track panel) for many operations.
Track gain and pan controls now are passed to the application when the PC cursor is active and focus is in the main window.  Otherwise they execute their default mouse movement functions.
Keystrokes that extend or contract the selection speak the new position (or length).
In many VST plug-ins, keystrokes move focus to the Presets control and activate save/Load Presets.
In many plug-in dialogs control names and values are spoken.  
There is a Vietnamese translation of the README file.  Thanks to Nguyen Hoang Giang for providing this.  It is in the file audacity_readme_vi.txt in the installation folder in your program files folder.

When playing or recording the ENTER key executes pause/resume.  In this case, pressing CTRL+ENTER sends ENTER.  I like this because the numpad ENTER key is easier to find than "p" if your hands are off the keyboard.  this can be turned off with an option in Adjust JAWS Options.  Try it out and let us know if it works for you and if you like it.  

The script version can be obtained by pressing JAWSKey+CTRL+V (twice quickly to display it in the virtual viewer), and also appears in JAWS hot key help.

The URL for accessing the Audacity Guide for JAWS users can be modified by editing the config file.  To do this, edit audacity.jsi (by default in the personal Settings folder in the folder containing the scripts) with a text editor such as Notepad or JAWS Script Manager.  Change or add a line in the Settings section that starts with "JAWSGuideLink=".  The URL should follow the = sign.  If Audacity has run since JAWS was started, you will need to restart JAWS for the changes to take affect.

To install: 
Place the installer in a folder on your machine.
Run it to install the files.  It also allows you to choose which JAWS versions to install into and whether to install for the current user or all users.  If you choose the full install type, you will be able to remove it via Add or Remove Programs, and it will make a folder in your Program Files folder to store the uninstaller.  If you choose the Just Scripts install type, it will not be removable from Add or Remove Programs, and it will not create a folder in your Program Files folder or any registry entries.  
If you choose the Just Scripts install type, the README and What's New files will be installed in the JAWS scripts folder for each version, and What's new.txt will be called audacity_whatsnew.txt.  (The Vietnamese README file will not be installed in a Just Scripts install.)
The installer will compile the script package in each JAWS version.
If you want to modify the installer, or are just curious how it works, you can install the installer source by selecting the Custom install type and choosing the Install Installer source component.

Issues:

We have had problems getting the state of Play, Pause, Record, and Stop on some configurations.  In function GetAudacityState there is commented out code to determine the pressed state of toolbar buttons by testing the button graphic name.  There are also CS_IMG constants for the pressed state of the Play, Pause, and Record buttons that must be uncommented as well.  If the current code doesn't work for you, this might work.  This code needs further work, so if you need this code please let us know.

The position fields sometimes are not shortened.  This happens because the JAWS GetWindowText function returns just the numbers with no h, m, :, etc.  We do not know what causes this.  I have been able to correct this by shutting down and restarting Audacity-- or JAWS, I can't find my notes on this.  This was observed with JAWS 10.

A side effect of ENTER pausing during record and play is that you can't use ENTER to select/unselect tracks while playing or recording.  This also affects  entering a label while playing or recording.  In this case the ENTER key adds "p" in a label instead of terminating it.  Use Control+ENTER to send ENTER in this case.

If you redefine the numpad ENTER key and set JAWS to treat extended keys separately, both ENTER keys will be mapped to the typing keys ENTER.  If you don't like this feature you can deactivate it by adding a semicolon on the lines for ENTER, NumPadEnter, and Control+ENTER in audacity.jkm and removing semicolons on the lines containing /* and */ before and after scripts Enter and CtrlEnter in audacity.jss.  

We have received reports that the installer cannot find the JAWS script compiler on 64-bit machines.    We think we have fixed this, but let us know if you have trouble.

The script was developed with Audacity 2.0.3 and JAWS 10.0.1178u on Windows XP SP3, and JAWS 13 and 14 on a laptop running Windows 7.  It will probably work with any JAWS after 5.0, although the options for Audacity in Adjust JAWS Verbosity may not look very good.
There is no specific Braille support at this time.

Messages and string constants are in audacity.jsm facilitating translation.

I would be interested in feedback on the script and suggestions for improvement, but can't promise any updates.

Here is the text of the JAWS hot key help:
JAWS keystrokes for script version 2.0 9/14/13 06:30UTC, for Audacity 2.0.0 or later:
To say the selection start position, press Alt+[.
To say the selection end position or length, press Alt+].
To move focus to these controls, press the key twice quickly.
To say the Audio Position value, press Alt+Delete.
To say the active cursor while the PC cursor is active, press Alt+Delete twice quickly.
To increase gain of focus track, press Alt+Shift+UpArrow.
To reduce gain of focus track, press Alt+Shift+DownArrow.
To adjust pan left, press Alt+Shift+LeftArrow.
To adjust pan right, press Alt+Shift+RightArrow.
The last 4 keys replace the default JAWS mouse movement scripts while focus is in the main window.  If you want to activate the original functionality while
in the main window, turn on the JAWS cursor.
To toggle speech on or off, press shift+Insert+s.
To toggle alert messages on or off, press Control+`).  This duplicates the Announce Audacity messages option in Adjust JAWS options.
See the what's new.txt for more info.
In a toolbar to move to the next toolbar press Control+Tab
In a toolbar to move to the previous toolbar press Control+Shift+Tab
To speak the program's state (play/pause/record/stop) press JAWSKey+delete
To reset all script options to default values, press Shift+Control+`
To switch between the two lists in the Edit Chains dialog, press F6.
To get help with Audacity hot keys, press Insert+w.
To get the default Windows hot key help, press Insert+w twice quickly.

If the "ENTER pauses during play/record" option is on, pressing Enter while playing or recording sends the Pause key.  Use Control+ENTER to execute ENTER
in this situation.

In some common VST plugins, such as L1V:
To set focus to the preset control, press Alt+P.
To load an existing preset, press  Alt+L.
To save the current settings as a preset, press  Alt+S.

To change settings for the Audacity script press JAWSKey+V.

List JAWS Hot Keys


Enjoy!
