; English messages for Audacity 2.0.0 script by Gary Campbell last updated 10/9/2012.
/*
JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012, 2013  Gary Campbell and Dang Manh Cuong.  All rights reserved.

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
    
    See the file copying.txt for details.
*/

; These are window names used to identify windows. (Should they be translated?)
Const
	WN_TOOLDOCK = "ToolDock", ; grandparent of toolbar buttons and selection bar controls
	WN_TRACKPANEL = "Track Panel", ; window name of track table
	WN_SELECTION = "Selection", ;window name of selection bar
	WN_TRANSPORT_TOOLBAR = "Transport", ; window name of Transport toolbar
	WN_EDIT_CHAINS = "Edit Chains" ; name of the Edit Chains dialog

Const
	; These are used to announce different areas of the main window.  They should be translated.
	CS_Toolbars="Toolbars",
	CS_SelectionBar="Selection bar",
	CS_TrackPanel="Track panel"

;For user options.  The text after the : should be translated, the text before must not be translated.
Const
	UO_ANNOUNCE_MESSAGES = "UOAnnounceMessages:Announce Audacity messages",
	UO_ANNOUNCE_TOOLBARS = "UOAnnounceToolbars:Announce toolbars",
	UO_ENTER_PAUSE = "UOEnterPause:ENTER pauses during play/record"

;These are used to strip leading zeros from audio positions.
Const
	;The format of a position with value 0 containing thousands separators, not including the last 0, like the seconds format, with blanks removed
	csPositionGroupFmt = "000,00",
	;The word following the days in a position.
	csDays = "days",
	;The format of a position with value 0 containing hours, minutes, and seconds, up to but not including the decimal point, like the HHõMMõSS.sss  format, with blanks removed
	csPositionHHMMFmt = "00h00m00",
	csGroupSep = ",", ; thousands separator character
	csDecimal = "." ; decimal point

Const
	;The key for pause
	csPauseKey="p"

Messages
@msgProgName
Audacity
@@

; Begins the hotkey help.
; %1 - string containing script version and date.
@msgScript_Ver
JAWS keystrokes for script version %1, for Audacity 2.0.0 or later:

@@
@msgHotKeyHelp

To say the selection start position, press %keyfor (SaySelectionStart).
To say the selection end position or length, press %keyfor(SaySelectionEnd).
To move focus to these controls, press the key twice quickly.
To say the Audio Position value, press %keyfor(SayActiveCursor).
To say the active cursor while the PC cursor is active, press %keyfor(SayActiveCursor) twice quickly.
To increase gain of focus track, press %keyfor (MouseUp).
To reduce gain of focus track, press %keyfor (MouseDown).
To adjust pan left, press %keyfor (MouseLeft).
To adjust pan right, press %keyfor (MouseRight).
The last 4 keys replace the default JAWS mouse movement scripts while focus is in the main window.  If you want to activate the original functionality while in the main window, turn on the JAWS cursor.
To toggle speech on or off, press %keyfor(MuteSynthesizer).
To toggle alert messages on or off, press %keyfor (AnnounceOnOff)).  This duplicates the Announce Audacity messages option in Adjust JAWS options.
See the what's new.txt for more info.
In a toolbar to move to the next toolbar press %KeyFor (NextDocumentWindow)
In a toolbar to move to the previous toolbar press %KeyFor (PreviousDocumentWindow)
To speak the program's state (play/pause/record/stop) press %KeyFor(SayAudacityState)
To reset all script options to default values, press %keyfor (ResetConfig)
To switch between the two lists in the Edit Chains dialog, press %keyfor (SwitchChainsList).
To get help with Audacity hot keys, press %keyfor(WindowKeysHelp).
To get the default Windows hot key help, press %keyfor(WindowKeysHelp) twice quickly.

In some common VST plugins, such as L1V:
To set focus to the preset control, press %keyfor (VSTPreset).
To load an existing preset, press  %keyfor (VSTLoadPreset).
To save the current settings as a preset, press  %keyfor (VSTSavePreset).

To change settings for the Audacity script press %KeyFor (AdjustJawsOptions).

@@
@msgPresetHotkeyHelp
To set focus to the preset option, press %keyfor (VSTPreset).
To load an existing preset, press  %keyfor (VSTLoadPreset).
To save the current settings as a preset, press  %keyfor (VSTSavePreset).

@@

@msgAudacityHotKeyHelpOld
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

@@

@msgAudacityHotKeyHelp
Default keystrokes for Audacity v2.0.3 (from Audacity 2.0.3 Guide, by David Bailes, at http://vip.chowo.co.uk/wp-content/uploads/jaws/Audacity-2.0.3-Guide.html):
General
Command Keystrokes 
Open audio file Ctrl + O 
Import audio file Ctrl + Shift + I 
New project Ctrl + N 
Save project Ctrl + S 
Preferences dialog Ctrl + P 
Cycle forward through Toolbars, Track table, and Selection bar Ctrl + F6 
Cycle backward through Toolbars, Track table, and Selection bar Ctrl + Shift + F6 
Zoom normal Ctrl + 2 
Zoom in Ctrl + 1 
Zoom out Ctrl + 3 

Playback
Command Keystroke 
Start/Stop Spacebar 
Start/Stop and move cursor Shift + A 
Pause/unpause P 
Seek backward short period during playback Left Arrow 
Seek forward short period during playback Right Arrow 
Seek backward long period during playback Shift + Left Arrow 
Seek forward long period during playback Shift + Right Arrow 
Play cut/delete preview C 
Play looped Shift + Spacebar 
Output Device dialog Shift + O 

Track table
Command Keystroke 
Move to previous track Up Arrow 
Move to next track Down Arrow 
Toggle selection of focused track Enter 
Select all the tracks (and all the audio) Ctrl + A 
Deselect all the tracks (and any time-range) Ctrl + Shift + A 
Open menu of focused track Application Key or Shift + M 
Close (Delete) focused track Shift + C 

Audio track
Command Keystroke 
Change gain of focused track Shift + G 
Change pan of focused track Shift + P 
Mute/Unmute focused track Shift + U 
Mute all tracks Ctrl + U 
Unmute all tracks Ctrl + Shift + U 
Solo/Unsolo focused track Shift + S 

Moving the cursor
Command Keystroke 
Move to start of tracks (time zero) Home 
Move to end of all audio End 
Move to start of audio in selected tracks J 
Move to end of audio in selected tracks K 
New cursor position at playback position [ 
Stop playback and move cursor Shift + A 
Move backward short period Comma 
Move forward short period Period 
Move backward long period Shift + Comma 
Move forward long period Shift + Period 
Cursor left by a small amount Left Arrow 
Cursor right by a small amount Right Arrow 

Selecting a time range
Command Keystroke 
Select time range which includes all the audio, and select all tracks Ctrl + A 
Selection start at start of tracks (time zero) Shift + Home 
Selection end at end of all the audio Shift + End 
Selection start at playback position [ 
Selection end at playback position ] 
Selection start at start of audio in selected tracks Shift + J 
Selection end at end of audio in selected tracks Shift + K 
Find zero crossings Z 
To move the end of the selection to the right by a small amount Shift + Right Arrow 
To move the end of the selection to the left by a small amount Ctrl + Shift + Left Arrow 
To move the start of the selection to the right by a small amount Ctrl + Shift + Right Arrow 
To move the start of the selection to the left by a small amount Shift + Left Arrow 

Recording
Command Keystroke 
Record R 
Append Record Shift + R 
Pause/unpause P 
Stop Spacebar 
Audio Host dialog Shift + H 
Input Device dialog Shift + I 
Number of channels dialog Shift + N 
@@

@msg_App_Start
Wellcome to audacity. Press %Keyfor(HotkeyHelp)) to display the list of JAWS hot keys for Audacity.
@@

;Is the same text for Start and End acceptable in msgMoveSelection, msgMoveTo, and msgSelectedTo in all languages??
@msgStart
start
@@

@msgEnd
end
@@

@msgLeft
left
@@

@msgRight
right
@@

@msgSelectionStart
Selection Start
@@

@msgSelectionEnd
Selection end
@@

; %1 = "start" or "end" of selection, %2 = direction ("left" or "right").
@msgMoveSelection_L
Move Selection %1 to %2
@@
@msgMoveSelection
%1 %2
@@

@MsgNoProject_l
There is no project open.
@@

@msgNoProject_s
No project
@@

@msgSelection
selection
@@

@msgTrack
track
@@

@msgAllAudio
all audio
@@

@msgSelectedTracks
selected tracks
@@

; %1 is where we move, like start or end, %2 is of what, e.g. track or selection.
@MSGMoveTo
Move to %1 of %2
@@

; %1 = where we are selectiog to, like start or end.
@MSGSelectedTo
Selected to %1
@@

@MsgStartOfFile
Select from start of file.
@@

@MSgEndOfFile
Select to end of file.
@@

@MSGDelete_l
Delete selected audio
@@

@MSGDelete_s
Delete
@@

;Messages for program states.
@msgPause
pause
@@
@msgPlay
play
@@
@msgStop
stop
@@
@msgRecord
record
@@

@msgDeselectAll
deselect all
@@

@MSGSelectAll
All tracks selected
@@

@msgCloseFocusedTrack
close focused track
@@

@msgNotStopped_l
Cannot perform this operation unless stopped.
@@
@msgNotStopped_s
not stopped.
@@

@msgNoTransportToolbar
Cannot find transport toolbar.  The transport toolbar must be enabled for this script to work.
@@

@msgCopyAudio
Copy selected audio to clipboard
@@

@msgCutAudio
cut selected audio to clipboard
@@

@msgAnnounceOff
Announce messages off
@@

@msgAnnounceOn
Announce messages on
@@

@msgResetScriptOptions
Script options reset to default values
@@

; For user options.
@msgUO_AudacityOptionsHlp
Audacity-specific options
@@
@msgUO_AnnounceMessagesHlp
If on, speaks messages for Audacity audio operations.
@@
@msgUO_AnnounceToolbarsHlp
If on, speaks the toolbar name when focus moves from one toolbar to another.
@@
@msgUO_EnterPauseHlp
If on, ENTER executes Pause during playback and record.  Otherwise, sends ENTER to Audacity.
@@
@msgNoSelection
To use this feature you must enable the selection toolbar
@@
@msg_Script_Version
Jaws script version %1, for Audacity 2.0.0 or later.
@@
@MsgNoTrackSelected
To use this feature you must select current track first. Press enter to select this.
@@

;messages for warning dialog when import uncompress audio
@msgCopy
Make a copy of the files before editing (safer)
@@

@msgDirectEdit
Read the files directly from the original (faster)
@@

@msgDoNotWarn
Don't warn again and always use my choice above
@@

;Messages for the two lists in the Edit Chains dialog.
@msgChains
Chains
@@
@msgChainCommands
Chain commands
@@
EndMessages
