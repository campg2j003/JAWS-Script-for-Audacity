(This file last updated 8/18/2017)

# New in 2.2.0-alpha-2017-08-18
- In the track panel UpCell and DownCell (Alt+Control+Up/DownArrow) move to the prior/next selected track.
- If SaySelectedText is pressed twice quickly track names are spoken instead of track numbers.
# New in 2.2.0-alpha-2017-08-15
- Added ability to find the tempo of a portion of audio.  See Script Key Help for details.  There is also a commented out implementation based on Robert Hänggi's NVDA add-on which uses arrays and therefore requires JAWS 11 update 1 or later.
- SaySelectedText (JAWSKey+Shift+DownArrow) now says the track numbers of the selected tracks when focus is in the main window.
# New in 2.2.0-alpha-2017-08-05
- Added Audacity layer key help.
- Added Position Display key layer.
- Added "Short" key layer for speaking Shift+F5-F8 and Shift+Control+F5 and F7from the home row.
# New in 2.2.0-alpha-2017-07-10
- Converted code that speaks position fields to work with Audacity 2.2.0-Alpha-09JUL17.

# New in 2.1.0

- The package has a new home.  It is now hosted at https://github.com/campg2j003/JAWS-Script-for-Audacity.  The source is now available there.  GitHub has an issue tracker which you can use to submit bug reports, enhancement requests, or other suggestions.  It is accessed from the Issues link on the repository page.  The file CONTRIBUTING.md has been added that contains information for script developers on working with the scripts on GitHub.  This file only appears in the Git repository.
- Now supports Audacity V2.1.3.
- Multiple language support is now provided for the installer and script.  English and Spanish are currently supported.  
- The README is now HTML.  (The source is Markdown and is converted to HTML in the build process.)  Therefore, it is now displayed in your default web browser instead of in Notepad.
- Added additional usage information to the README.

## Changes to the Scripts
- Added Spanish translation.
- Added support for the QuickSettings dialog (JAWS 13 and later).
- Made messages for moving and selecting more consistent.
- More Audacity keystrokes announce their names.
- Many more keys now check for stopped and/or a selected track.
- SayLine, SayPriorLine, and SayNextLine now report no project if there are no tracks in the project and the PC cursor is active.  (issue #1)
- Some additional motion and selection commands now speak position information.  These include moving to end of all audio, moving to start/end of selected tracks, and Select to Beginning/End of Selected tracks.
- SayLine now says track number and number of tracks in the track panel.
- Added the ability to go to a track by number.  Entering a number causes focus to move to that track.  Preceding the number with a plus sign moves down (to higher track numbers) that many tracks.  A minus sign moves up that many tracks.  When the operation is complete the name of the target track is spoken.  This is assigned to JAWSKey+a followed by g.  
- Added the ability to move the current track to a track position by number, similar to the Go To track feature.  For this to work, Control+Shift+UpArrow must be assigned to the Move Focused Track Up and Control+Shift+DownArrow must be assigned to the Move Focused Track Down Audacity commands.
- Added scripts for Move Focused Track Up/Down.  They speak the track that the track being moved passed over.  They are currently assigned to Control+Shift+Up/DownArrow.  For these to work, these keys must be assigned to the Move Focused Track Up and Move Focused Track Down Audacity commands.  These will not work in Audacity versions prior to 2.1.1.
- Added scripts MarkTrack (JAWSKey+a,k), GoToMarkedTrack (JAWSKey+a,Shift+g), ExchangeWithMark (JAWSKey+a,x), and MoveCurrentTrackToMark (JAWSKey+a,Shift+m).  The "mark" remembers the number of the current track. This mark is very simple-minded-- it will become confused if you add, delete, or move tracks.  For MoveCurrentTrackToMark to work, Control+Shift+UpArrow must be assigned to the Move Focused Track Up and Control+Shift+DownArrow must be assigned to the Move Focused Track Down Audacity commands.
- Improved label track support.  Letter keys now speak while writing a label.  Since we can't detect the track type, the feature is enabled when commands are executed that write a label.  It is deactivated by commands that end the label (ENTER) or move out of the label track, and when focus moves out of the track panel.  If you move into a label track with the arrow keys, the feature is not activated.  It can be deactivated by moving to the toolbar or selection bar and back.  When this feature is active while playing or recording ENTER terminates the label (and therefore exits label mode) rather than pausing.  TAB and Shift+TAB now attempt to speak the active label while in the track pannel.  They do this by searching for text with the background color white.  This doesn't work all the time.  I'm not sure if this is because the label isn't visible, or if the search completes before it has appeared.  It works any time focus is in the track panel.
- Added the ability to silence the speech that occurs when starting to record.
- Added ability to silence the speech that occurs during the previewing of an effect (a lot of the time!).
- In the track panel the keys Alt+UpArrow and Alt+DownArrow are now sent to the application.  Previously they were not sent through because of a conflict with the OpenListBox and CloseListBox scripts.
- JAWS MSAA info is refreshed after SelectAll and DeselectAll so JAWS now gives the correct selected information without doing a RefreshScreen.
- Added code to refresh the track panel after CloseFocusTrack.  This is intended to make JAWS not indicate that the old track is still current.
- Fixed issue #4: In toolbars CTRL+TAB says "grabber".
- The URL for the JAWS User's Guide can now be updated via the script (Control+Shift+j).
- Updated guide link and Audacity keystrokes to 2.1.3.
- The g key speaks the value of the recording meter.  Pressing twice quickly moves focus to the meter.  The h key does the same for the playback meter.  If the combined meter toolbar is enabled, it is used instead of the individual meters.

## Installer Changes
- The installer framework now supports  installation of scripts in multiple languages.  It now treats version/language pairs as it previously treated versions, so the version selection list view now shows entries like 16.0/enu.  The installer messages are now also localizable.  English and Spanish are currently supported.  
- The installer can now install for all users or the current user.  Therefore, it is possible to install the scripts without admin priveleges.  (For all user installs the uninstaller and supporting files are stored in %programfiles% as before.  For current user installs they are placed in %localappdata%.)  If the user has higher than standard user privileges a command line option allows forcing installation for the current user.
- The radio buttons on the Select Versions/Languages page control both where the scripts are installed and the folder where the uninstaller and other supporting files are placed.  For current user installs the Install for current user or all users radio buttons on the Versions/Languages selection page do not appear.
- The installer can now install into the shared scripts folder of JAWS 17.0.
- Fixed a bug in the uninstaller that caused files to not be uninstalled if the user chose to delete files that were modified since installation.
- Fixed a bug in the uninstaller that allowed uninst.exe and install.ini not to be removed in some cases.
- The uninstaller now asks to delete the first file modified since installation and then processes all of them acording to the user's response.
- The check for existing scripts now ignores .jcf file so saved settings do not trigger the warning.
- The check for an existing installation has been moved to after the Versions/Languages selection screen.  This allows the current/all users choice before checking for an existing installation.
- The installer log now includes messages generated by code for installer pages.  This allows installation settings to be logged.
- The installer log now includes the log of the uninstall when it finds an existing install.  To support this, the uninstaller now has a /logfile=filename command line option to dump the uninstaller log to a file.
- The installer executable is now built with NSIS 2.51.  (The files are still compatible with 2.46.)
- Some parts of the installer have been broken out into separate packages so that they can be used in other projects.  These are jfw_nsh and uninstlog.
- The jfw_nsh README is now installed with the installer source when installing the installer source is requested.

# New in V2.0 (9/15/2013):
- The URL for the JAWS User's Guide is now read from the config file.  It can't be edited from within the script, but it can be updated with a text editor.
- Version 2.0.4 of Audacity assigns keys Control+[ and Control+] to Go to Start/End of Selection.  Therefore, we have changed the keys for reading the selection start and end positions to ALT+[ and ALT+].
- While playing/recording when ENTER pauses, Control+ENTER sends ENTER.
- Added Vietnamese README file (translation by Nguyen Hoang Giang).
- Added an Insert+ key assignment for each JAWSKey key.  This makes the script easier to use on laptops.
- Changed script AudacityHotkeyHelp to AudacityScriptKeyHelp.  This name more clearly represents what it does, and it removes a bogus additional entry in Keyboard Manager that was the result of a case mismatch.
- For Audacity V2.0.3 or later the special processing for the Import Uncompressed Audio Files warning dialog, the special processing is not used since the interface has been fixed.
- For slider controls in diaalogs that have associated edit boxes, the value of the edit control is now spoken when the slider changes while focus is on the slider.  These sliders are now named with the name of the edit control, and some of the extra chatter that occurred when these sliders gain focus has been eliminated.
- Paste now works in Audacity dialogs.
- The link to the Audacity JAWS guide in Audacity hotkey help is now an active link that opens the web page in the default browser.  The URL is read from the JSI file.
- Changed script Enter to perform the default enter script in the user buffer.  This causes links to be run by the ENTER key.
- Changed so that Audacity hotkey help does not display a link to default JAWS hotkey help.
- Added JAWS option EnterPause to control whether ENTER pauses during play/record.
- If the installer cannot read the location of the JAWS program folder from the registry it now supplies a default.  If it cannot find a folder at %programfiles%\Freedom Scientific\JAWS it looks for one in %programfiles64% (actually the value of the NSIS variable $programfiles64), and uses that as the fallback.
- In jfw.nsh added documentation for JAWSALLOWALLUSERS.  
- In jfw.nsh added documentation that if JAWSALLOWALLUSERS is undefined and the installer changes the shell context, it must also change the value of JAWSSHELLCONTEXT acordingly.
- In jfw.nsh if JAWSALLOWALLUSERS is undefined, on the install confirmation page, the message indicating whether installing to the current or all users read "for in".  Changed PageInstConfirmPre to not test JAWSALLOWALLUSERS.  Since JAWSSHELLCONTEXT defaults to "current", "the current user" is written if JAWSALLOWALLUSERS is undefined.
- In jfw.nsh commented out debug message indicating that only 1 JAWS version is installed and the JAWS versions page is being skipped.

# New in JAWS scripts for Audacity version 2.0RC (1/22/2013):

- Adjust JAWS Options (JAWSKey+v) now contains a section for Audacity options.  It currently contains two options: Announce Messages, which duplicates the CTRL+` key, and Announce Toolbars, which controls the announcement of the toolbar name when focus moves from one toolbar to another.  There is support for the older AdjustJawsVerbosity script, but it has not been tested.
- Added JAWSKey+v to the jkm file so that options will appear on JAWS 13, which has a new options facility.
- Fixed speaking of position fields.  Previously, .012s was spoken as 12s.  Now speaks time fields containing two zeros as one 0, so 01h00m00.015s is spoken as 1h0m0.015s.  This is not yet done for formats such as ##h##m##s+##frames.  The "days" format is now supported.  The code for this function has been rewritten to use more message constants, so it hopefully will be localizable.
- The extension of the Audacity script settings file has changed from .Ini to .jsi to conform to the JAWS scripting convention.  You can rename your existing audacity.Ini file to audacity.jsi and it should work.  
- In the settings file changed key announce to announceMessage.  Script ResetConfig now deletes the old (announce) key if it exists.
- JAWS no longer says "track table" when moving between tracks.
- JAWS speaks main window areas: Toolbars, Track Panel, and Selection Bar, as focus moves between them.
- JAWS speaks the toolbar name when focus moves from one toolbar to another.
- When focus is in the toolbars pressing CTRL+TAB and Shift+CTRL+TAB move to the first control on the next toolbar and the last control on the previous toolbar, respectively.
- JAWSKey+Delete speaks the current program state: stop, play, play pause, record, or record pause.
- left/right arrow keys Speak cursor position when Audacity is stopped.
- Keystrokes that extend or contract the selection speak the new position when Focus is in the track panel.
- Functions that use values from the selection bar now speak a message or silently omit the action requiring the value if the selection bar is not enabled.
- Track gain and pan controls now only function when the PC cursor is active.  Otherwise they execute their default mouse movement functions.
- HandleCustomWindows now calls HandleCustomWindows so that this function in scripts "use"d by this script will be executed.
- In many VST plug-ins, keystrokes move focus to the Presets control and activate Save/Load Presets.  Hotkey help is available for these keys in these dialogs.
- In many plug-in dialogs control names and values are now spoken.  Use JAWSKey+TAB to repeat the current control name/value.
- Added script SayJump and key assignments that bind it to comma, period, Shift+comma, and Shift+period.
- Added SelectAll announcement.
- JAWS now indicates when no project is open (no tracks in track panel) for many operations.
- JAWS now speaks an alert message when performing an operation which requires that the current track be selected but it is not.  Added this funtionality to the folowing scripts: JAWSDelete, DeleteSelectedAudio, MoveToStartOfSelectedTracks, SelectToBeginning, SelectToEnd, copy, and cut.
- Scripts CloseFocusTrack, DeleteSelectedAudio, JAWSHome, JAWSEnd, Copy, and Cut speak an error message indicating that they are not valid when Audacity is not stopped.
- The CTRL+JAWSKey+v keystroke now performs its default function, and then speaks the current Audacity script version.  When pressed twice quickly, it displays this information in the virtual viewer.
- The following now pass keys to the app when in a dialog or menu: scripts MoveToStartOfSelectedTracks, MoveToEndOfSelectedTracks, SelectToBeginning, SelectToEnd, SaySelectionStart, SaySelectionEnd, SayAudacityState, DeleteSelectedAudio, JAWSDelete, and Copy, and Functions SaySelectionPosition, and SayNoTrackSelected.
- Changed the conditions for not executing the default script in Start/FinishMarkerLeft/Right and made them perform their default scripts instead of silently sending their keys through.
- [ and ] can now be used in file name dialogs.
- Function AnnounceMessage now returns in open dialogs.
- JAWS now correctly speaks controls in the warning dialog shown when importing uncompressed Audio files.  This is done by new function IsWarningDialog and changes to function HandleCustomWindows and script SayLine.  Removed old implementation in script AudacitySayFrame because it works on Cuong's PC only.
- In the Edit Chains dialog F6 toggles between the Chains and Chain list views.  If the focus is not on the Chains list view, the key moves focus to the Chains list view.  
- In SayLine added tests for IsPCCursor and not UserBufferIsActive.
- When playing and recording, the ENTER key executes pause.  (It sends ENTER when stopped and "p" when playing or recording.)  I like this because the numpad ENTER key is easier to find than "p" if your hands are off the keyboard.  Try it out and let us know if you like it.

# Issues:
- We have had problems getting the state of Play, Pause, Record, and Stop on some configurations.  In function GetAudacityState there is commented out code to determine the pressed state of toolbar buttons by testing the button graphic name.  There are also CS_IMG constants for the pressed state of the Play, Pause, and Record buttons that must be uncommented as well.  If the current code doesn't work for you, this might work.  This code needs further work, so if you need this code please let us know.
- The position fields sometimes are not shortened.  This happens because the JAWS GetWindowText function returns just the numbers with no h, m, :, etc.  We do not know what causes this.  I have been able to correct this by shutting down and restarting Audacity-- or JAWS, I can't find my notes on this.  This was observed with JAWS 10.
- A side effect of ENTER pausing during record and play is that you can't select/unselect tracks while playing or recording.  Also, if you redefine the numpad ENTER key and set JAWS to treat extended keys separately, both ENTER keys will be mapped to the typing keys ENTER.  If you don't like this feature you can deactivate it by adding a semicolon on the lines for ENTER and NumPadEnter in audacity.jkm and removing semicolons on the lines containing /* and */ before and after script Enter in audacity.jss.  
- The script does not recognize when editing a label in a label track.  Arrow keys continue to report the position and DEL/BACKSPACE report deleting audio.  If entering a label while playing, ENTER will pause rather than completing the label.  Does CTRL+m work while recording?

# New in Jaws scripts for Audacity version 1.1 (8/10/2012):

- added alert message for the following default Audacity hotkeys:
  - Close (Delete) focused track  (Shift + C)
  - Deselect all the tracks (and any time-range)  (Ctrl + Shift + A)
  - Move to start of tracks (time zero)  (Home)
  - Move to end of all audio  (End)
  - Move to start or end of audio in selected tracks ( J or K)
  - Selection start at start of tracks (Shift + Home)
  - Selection end at end of all the audio  Shift + End
  - Selection start or end at playback position ([ or ])
  - Move the end of the selection to the right by a small amount  (Shift + Right Arrow)
  - Move the end of the selection to the left by a small amount  (Ctrl + Shift + Left Arrow)
  - Move the start of the selection to the right by a small amount  (Ctrl + Shift + Right Arrow)
  - Move the start of the selection to the left by a small amount  (Shift + Left Arrow)
  - Delete selected audio (Delete, Ctrl+k, Backspace)
  - Cut, copy selected audio (Ctrl+x, Ctrl+c)
You can toggle these alerts on or off by pressing Ctrl+`
- Jaws now speaks the radio buttons in the warning dialog that appears when importing uncompressed audio files.
- Added scripts for adjusting gain and pan. These scripts replace mouse movement scripts (MouseUp, MouseLeft, etc.), but you can use the original functions by activating theJaws cursor. This feature suggested by Gary Campbell, the original author of the script.
- Added hotkey to toggle mute Jaws synthersiser (Insert+shift+s).
- Added function autoStartEvent (just a little tip to indicate that the script is active).
- Created dictionary file for some mispronounced words.
- The Audacity hotkey help (JAWSkey+h) now displays hotkeys as links.
- Created installer package (using Nullsoft scriptable install system).
- Fixed error in installer (fix by Gary Campbell):
- In DisplayJawsList now only counts JAWS version registry keys whose names start with a digit.  This rejects keys like "Common".
