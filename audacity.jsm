; English messages for Audacity 2.0.0 script by Gary Campbell last updated 5/16/2012.

; These are window names used to identify windows.  (Should they be translated?)
Const
	WN_TOOLDOCK = "ToolDock", ; grandparent of toolbar buttons and selection bar controls
	WN_TRACKPANEL = "Track Panel" ; window name of track table

Messages
@msgProgName
Audacity
@@

; %1 - string containing script version and date.
@msgHotKeyHelp
JAWS keystrokes for script version %1, for Audacity 2.0.0:

To say the selection start position, press %keyfor(SaySelectionStart).
To say the selection end position or length, press %keyfor(SaySelectionEnd).
To move focus to these controls, press the key twice quickly.
To say the Audio Position value, press %keyfor(SayActiveCursor).
To say the active cursor while the PC cursor is active, press %keyfor(SayActiveCursor) twice quickly.
To get help with Audacity hot keys, press %keyfor(WindowKeysHelp).
To get the default Windows hot key help, press %keyfor(WindowKeysHelp) twice quickly.

To close this message, press ESC.
@@

@msgAudacityHotKeyHelp
Default keystrokes for Audacity v2.0.0 (from Audacity 2.0 Guide, by David Bailes, at http://vip.chowo.co.uk/wp-content/uploads/jaws/Audacity-2.0-Guide.html):

General
Command  Keystrokes
Open audio file  Ctrl + O
Import audio file  Ctrl + Shift + I
New project  Ctrl + N
Save project  Ctrl + S
Preferences dialog  Ctrl + P
Cycle forward through Toolbars, Track table, and Selection bar  Ctrl + F6
Cycle backward through Toolbars, Track table, and Selection bar  Ctrl + Shift + F6
Zoom normal  Ctrl + 2
Zoom in  Ctrl + 1
Zoom out  Ctrl + 3

Playback
Command  Keystrokes
Start/Stop  Spacebar
Start/Stop and move cursor  Shift + A
Pause/unpause  P
Seek backward short period during playback  Left Arrow
Seek forward short period during playback  Right Arrow
Seek backward long period during playback  Shift + Left Arrow
Seek forward long period during playback  Shift + Right Arrow
Play cut/delete preview  C
Play looped  Shift + Spacebar
Output Device dialog  Shift + O

Track table
Command  Keystrokes
Move to previous track  Up Arrow
Move to next track  Down Arrow
Toggle selection of focused track  Enter
Select all the tracks (and all the audio)  Ctrl + A
Deselect all the tracks (and any time-range)  Ctrl + Shift + A
Open menu of focused track  Application Key or Shift + M
Close (Delete) focused track  Shift + C

Audio track
Command  Keystrokes
Change gain of focused track  Shift + G
Change pan of focused track  Shift + P
Mute/Unmute focused track  Shift + U
Mute all tracks  Ctrl + U
Unmute all tracks  Ctrl Shift + U
Solo/Unsolo focused track  Shift + S

Moving the cursor
Command  Keystrokes
Move to start of tracks (time zero)  Home
Move to end of all audio  End
Move to start of audio in selected tracks  J
Move to end of audio in selected tracks  K
New cursor position at playback position  [
Stop playback and move cursor  Shift + A
Move backward short period  Comma
Move forward short period  Period
Move backward long period  Shift + Comma
Move forward long period  Shift + Period
Cursor left by a small amount  Left Arrow
Cursor right by a small amount  Right Arrow

Selecting a time range
Command  Keystrokes
Select time range which includes all the audio, and select all tracks  Ctrl + A
Selection start at start of tracks (time zero)  Shift + Home
Selection end at end of all the audio  Shift + End
Selection start at playback position  [
Selection end at playback position  ]
Selection start at start of audio in selected tracks  Shift + J
Selection end at end of audio in selected tracks  Shift + K
To move the end of the selection to the right by a small amount  Shift + Right Arrow
To move the end of the selection to the left by a small amount  Ctrl + Shift + Left Arrow
To move the start of the selection to the right by a small amount  Ctrl + Shift + Right Arrow
To move the start of the selection to the left by a small amount  Shift + Left Arrow

Editing
Command  Keystrokes
Undo  Ctrl + Z
Redo  Ctrl + Y
Delete selected audio  Delete
Cut selected audio  Ctrl + X
Copy selected audio  Ctrl + C
Paste  Ctrl + V
Replace selected audio with silence  Ctrl + L
Close (Delete) focused track  Shift + C

Recording
Command  Keystrokes
Record  R
Append Record  Shift + R
Pause/unpause  P
Stop  Spacebar
Audio Host dialog  Shift + H
Input Device dialog  Shift + I
Number of channels dialog  Shift + N

To close this message, press ESC.
@@

EndMessages

