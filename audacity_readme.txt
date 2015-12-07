12/7/2015  JAWS script for Audacity V2.0 (for script version 2.0 10/6/15  22:55UTC) by Gary Campbell <campg2003@gmail.com> and Dang Manh Cuong <dangmanhcuong@gmail.com>

This JAWS script package provides support for Audacity 2.0.0 and later.

# Features:
- Keystrokes to speak selection start, selection end or length, and Audio Position from anywhere in the main window.
- Keystrokes to move the focus to the selection start and selection end/length controls.
- Displays JAWS and Audacity hotkey help.
- The Audacity Guide for JAWS users, by David Bailes, is accessible from the Audacity keys help (JAWSKey+w).
- Speaks main window areas: Toolbars, Track Panel, and selection Bar, as focus moves between them.
- Speaks the toolbar name when focus moves from one toolbar to another.
- When focus is in the toolbars pressing CTRL+TAB and Shift+CTRL+TAB move to the first control on the next toolbar and the last control on the previous toolbar, respectively.
- JAWSKey+Delete speaks the current program state: stop, play, play pause, record, or record pause.
- Speaks cursor position when left/right arrows are pressed and Audacity is stopped when focus is in the track panel.
- Indicates when no project is open (no tracks in track panel) for many operations.
- Track gain and pan controls now are passed to the application when the PC cursor is active and focus is in the main window.  Otherwise they execute their default mouse movement functions.
- Keystrokes that extend or contract the selection speak the new position (or length).
- In many VST plug-ins, keystrokes move focus to the Presets control and activate save/Load Presets.
- In many plug-in dialogs control names and values are spoken.  
- There is a Vietnamese translation of the README file.  Thanks to Nguyen Hoang Giang for providing this.  It is in the file audacity_readme_vi.txt in the installation folder in your program files folder.
- You can go to a track by number.  You can also move a track to a specific position by number.  You can also set a "mark" on a track and later return there, or move a track there.
- Feedback is provided when moving a track via the keyboard.  (See below.)
- The installer now supports multiple languages.
- When playing or recording the ENTER key executes pause/resume.  In this case, pressing CTRL+ENTER sends ENTER.  I like this because the numpad ENTER key is easier to find than "p" if your hands are off the keyboard.  this can be turned off with an option in Adjust JAWS Options.  Try it out and let us know if it works for you and if you like it.  
 
The script version can be obtained by pressing JAWSKey+CTRL+V (twice quickly to display it in the virtual viewer), and also appears in JAWS hot key help.

The URL for accessing the Audacity Guide for JAWS users can be modified via the script by pressing Control+Shift+j.  This opens a dialog with an edit box containing the URL.  Update or replace it and press OK.

# To install: 
1. Place the installer in a folder on your machine.
2. Run it to install the files.

It also allows you to choose which JAWS versions to install into and whether to install for the current user or all users.  If you choose the full install type, you will be able to remove it via Add or Remove Programs, and it will make a folder in your Program Files folder to store the uninstaller.  If you choose the Just Scripts install type, it will not be removable from Add or Remove Programs, and it will not create a folder in your Program Files folder or any registry entries.  
If you choose the Just Scripts install type, the README and What's New files will be installed in the JAWS scripts folder for each version, and What's new.txt will be called audacity_whatsnew.txt.  (The Vietnamese README file will not be installed in a Just Scripts install.)

The installer will compile the script package in each JAWS version.

If you want to modify the installer, or are just curious how it works, you can install the installer source by selecting the Custom install type and choosing the Install Installer source component.


# Script Options

The script has several options that control some of its features which can be accessed by pressing JAWSKey+v.  For JAWS versions prior to 13 these settings are stored in file audacity.jsi in the PersonalSettings folder of the JAWS installation.  For versions after 13 they are stored in audacity.jcf in the NonJCFOptions section.  If you upgrade from a version of JAWS before 13 to 13 or later the settings are not transferred from audacity.jsi, so you will have to set them again.


# Going to and Moving Tracks

It is possible to go to a track by number, move a track to a position by number, and remember a track position to return there later or to move a track there.  Feedback is also given if you move a track with the keyboard.  This feature only works in Audacity 2.1.1 and later, and requires some configuration in Audacity to work.  You must assign the Move Focused Track Up Audacity command to Control+Shift+UpArrow and Move Focused Track Down to Control+Shift+DownArrow.  To do this:

1. In Audacity open Preferences (CTRL+p) and go to the Keyboard category (press k).
2. Tab to the edit box and enter "move focused" (I'm using tree view).
3. Tab to the tree view and find Move focused track down.
4. Press TAB to the Shortcut field and press Control+Shift+DownArrow.
5. Press TAB to the Set button and press SPACE to activate it.
6. Press Shift+TAB twice to move back to the tree view.
7. Find the Move focused track up command and assign Control+Shift+UpArrow to it in the same way.
8. Tab to OK and press SPACEBAR.

If you want to use different keys you will have to change the assignments in audacity.jkm.


# Issues:

This version of the scripts adds the ability to silence previewing in effects like Amplify.  Sometimes this doesn't get turned off.  If this happens, switching focus away from Audacity and back will turn it off.

The position fields sometimes are not shortened.  This happens because the JAWS GetWindowText function returns just the numbers with no h, m, :, etc.  We do not know what causes this.  I have been able to correct this by shutting down and restarting Audacity.  This was observed with JAWS 10, 15, and 16.

A side effect of ENTER pausing during record and play is that you can't use ENTER to select/unselect tracks while playing or recording.  This also affects  entering a label while playing or recording.  In this case the ENTER key adds "p" in a label instead of terminating it.  Use Control+ENTER to send ENTER in this case.

When entering a label in a label track JAWS used to speak the Audacity functions for letter keys even though the letters were being entered into the label.  We now suppress this behavior if you use the standard methods for creating a label.  This feature is activated by the Control+b and Control+m keystrokes and is deactivated when ENTER is pressed.  (It is also deactivated if you arrow to another track or if focus moves out of the track panel.)  It will not activate if you arrow to the label track and start writing.  If you change the standard key assignments for these commands you will also need to change audacity.jkm accordingly.

When focus is in a label track pressing TAB will try to speak the "current" label.  This is done by searching for text on a white background.  This is intended to give feedback when tabbing to labels in a label track.  This doesn't always work, particularly with a lot of labels.  Actually this ability is active anytime focus is in the track panel.

If you redefine the numpad ENTER key and set JAWS to treat extended keys separately, both ENTER keys will be mapped to the typing keys ENTER.  If you don't like this feature you can deactivate it by adding a semicolon on the lines for ENTER, NumPadEnter, and Control+ENTER in audacity.jkm and removing semicolons on the lines containing /* and */ before and after scripts Enter and CtrlEnter in audacity.jss.  

The script was developed with Audacity 2.0.3, 2.0.4, 2.0.5, 2.1.0, and 2.1.1 and JAWS 10.0.1178u on Windows XP SP3, and JAWS 13-16 on a laptop running Windows 7, 8.1, and 10.  It will probably work with any JAWS after 5.0, although the options for Audacity in Adjust JAWS Verbosity may not look very good.  Recent development has been done with JAWS 16 on Windows 10.  Although support remains for previous versions of JAWS, the current code has not been tested with them.  There is no specific Braille support at this time.

# Multiple Language Support
Messages and string constants for the script are in audacity.jsm facilitating translation.  Fernando Gregoire has contributed a Spanish translation.  Gracias!

This version of the installer framework contains the first cut of support for installation of scripts in multiple languages.  It now treats version/language pairs as it previously treated versions, so the version selection list view now shows entries like 16.0/enu.  English and Spanish are currently supported.
Note that the JAWS 17 localization structure is not currently well-known and therefore may not be supported.

The installer messages are now localizable.  The message text has now been separated from the installer code so that message sets can be prepared for each language.  The only language currently supported is English.

I would be interested in feedback on the script and suggestions for improvement, but can't promise any updates.

# Here is the text of the JAWS hot key help:

```
JAWS keystrokes for script version 2.0 10/6/15  22:55UTC, for Audacity 2.0.0 or later:
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

To go to a track by number, press JAWSKey+a, g.
To move the current track to a track position by number, press JAWSKey+a, m.
To mark the current track, press JAWSKey+a, k.
To go to the marked track, press JAWSKey+a, Shift+g.
To go to the marked track and mark the starting track, press JAWSKey+a, x.
To move the current track to the position of the marked track and set the mark to the current track, press Insert+a, Shift+m.

To toggle speech on or off, press Shift+Insert+S.
To toggle alert messages on or off, press Control+`).  This duplicates the Announce Audacity messages option in Adjust JAWS options.
See what's new.txt for more info.

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

If SilencePreview is on and you hit the Preview button in an effect, sometimes the silencing of the previewing does not get turned off.  This will result
in missing speech that occurs as a result of focus changes.  You can fix this by switching away from Audacity and back.
 
To change settings for the Audacity script, press   JAWSKey+V.

To Change the URL for the Audacity Jaws Guide, press Shift+Control+J

List JAWS Hot Keys
Press ESCAPE to close this message. 
```

Enjoy!
