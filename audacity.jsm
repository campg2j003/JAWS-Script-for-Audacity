; English messages for Audacity 2.2.0 script by Gary Campbell last updated 2017-08-20.
/*
JAWS script for Audacity multitrack sound editor V2.0 or later 
(http://audacityteam.org).

    Copyright (C) 2012-2017  Gary Campbell and Dang Manh Cuong.  All rights reserved.

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
	WN_RECORDING_METER_TOOLBAR = "Recording Meter", ;window name of Recording Meter toolbar
	WN_PLAYBACK_METER_TOOLBAR = "Playback Meter", ;window name of Playback Meter toolbar
	WN_COMBINED_METER_TOOLBAR = "Combined Meter", ;window name of Combined Meter toolbar (Audacity 2.1.3 and earlier)
	WN_EDIT_CHAINS = "Edit Chains", ; name of the Edit Chains dialog
	WN_PREPARING_PREVIEW = "Preparing preview", ;appears in effect dialogs briefly when starting previewing
	WN_PREVIEWING = "Previewing", ;appears in progress dialog while previewing effects
	WN_STOP_BTN = "Stop" ;name of Stop button to stop previewing

Const
	; These are used to announce different areas of the main window.  They should be translated.
	CS_Toolbars="Toolbars",
	CS_SelectionBar="Selection bar",
	CS_TrackPanel="Track panel"

;These are used to match "select on", etc. to remove it from track names.  It should be whatever is appended to the track name in the track panel.  Note that they begin with a space and are case sensitive.
Const
    CS_SELECT_ON = " Select On",
    CS_MUTE_ON = " Mute On",
    CS_SOLO_ON = " Solo On"
    
;For announcing selected tracks.
Const
	CS_TRACKS_ITEM_SEP = ",", ;separates track ranges
	CS_TRACKS_RANGE_SEP = "-" ;separates first and last track of a track range

;For user options.  The text after the : should be translated, the text before must not be translated.
Const
	UO_ANNOUNCE_MESSAGES = "UOAnnounceMessages:Announce Audacity messages", ;also used in message spoken by AnnounceOnOff.
	UO_ANNOUNCE_TOOLBARS = "UOAnnounceToolbars:Announce toolbars",
	UO_ENTER_PAUSE = "UOEnterPause:ENTER pauses during play/record",
	UO_SILENCE_PREVIEW = "UOSilencePreview:Silence Preview",
	UO_SILENCE_RECORD = "UOSilenceRecord:Silence Record"

Messages
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
If on, ENTER executes Pause during playback and record, and Control+ENTER sends ENTER.  Otherwise, sends ENTER to Audacity.
@@
@msgUO_SilencePreviewHlp
If on, Turns speech off while previewing an effect.
@@
@msgUO_SilenceRecordHlp
If on, silences speech that occurs when starting to record.
@@
EndMessages

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

;Audacity key layer keys, must match keys JAWSKey+a&X where X sytarts a sublayer.
const
	;These are the prefix keys for the Audacity layer.  There are two because there are JAWSKey and Insert entries in the JKM for the same key.
	ksAudacityLayer1 = "JAWSKey+a",
	ksAudacityLayer2 = "Insert+a",
	ksPositionLayer = "p",
	ksShortLayer = "s",
	ksTempoLayer = "t"

Const
	CS_JawsGuide_LINK = "http://vip.chowo.co.uk/wp-content/uploads/jaws/Audacity-2.1.3-Guide.html", ;default URL to Audacity guide for JAWS
;This should reference the guide from which the Audacity Keys help message was taken.
CS_JawsGuide_Title = "Audacity 2.1.3 Guide", 
CS_JawsGuide_Author = "David Bailes",
CS_JawsGuide_LINK_DISP = "link to JAWS guide" ;Name displayed in links list

Messages
@msgProgName
Audacity
@@

; Begins the hotkey help.
; %1 - string containing script version and date.
@msgScript_Ver
JAWS keystrokes for script version %1, for Audacity 2.0.0 or later:

@@
@msgScriptKeyHelp

To say the selection start position, press %keyfor (SaySelectionStart).
To say the selection end position or length, press %keyfor(SaySelectionEnd).
To move focus to these controls, press the key twice quickly.
To say the Audio Position value, press %keyfor(SayActiveCursor).
In the main window to say the numbers of the selected tracks, press %KeyFor(SaySelectedText).
To say the active cursor while the PC cursor is active, press %keyfor(SayActiveCursor) twice quickly.
To Say the current selection type (Audacity 2.2.0 and later), press %KeyFor(SaySelectionType).
To set the selection type (Audacity 2.2.0 and later), press JAWSKey+a,p followed by s (start-end), l (end-length), e (length-end) or c (length-center).  You can also use the numbers 1-4.

To increase gain of focus track, press %keyfor (MouseUp).
To reduce gain of focus track, press %keyfor (MouseDown).
To adjust pan left, press %keyfor (MouseLeft).
To adjust pan right, press %keyfor (MouseRight).
The last 4 keys replace the default JAWS mouse movement scripts while focus is in the main window.  If you want to activate the original functionality while in the main window, turn on the JAWS cursor.

To say the value of the recording meter, press %KeyFor(SayRecordingMeter).
 Press twice quickly to move focus to the meter.
To say the value of the playback meter, press %KeyFor(SayPlaybackMeter).
 Press twice quickly to move focus to the meter.

To go to a track by number, press %KeyFor(GoToTrack).
To move the current track to a track position by number, press %KeyFor(MoveCurrentTrackTo).
To mark the current track, press %KeyFor(MarkTrack).
To go to the marked track, press %KeyFor(GoToMarkedTrack).
To go to the marked track and mark the starting track, press %KeyFor(ExchangeWithMark).
To move the current track to the position of the marked track and set the mark to the current track, press %KeyFor(MoveCurrentTrackToMark).

To find the tempo, press %KeyFor(TempoStartStop).  Playback starts.  Then press %KeyFor(TempoTap) for each beat.  (You only need to press the last key of the sequence for any Tempo layer key once you've entered the Tempo layer.)  
When you are finished press %KeyFor(TempoStartStop) again.  Playback stops and the tempo in beats per minute is spoken.  
After that you can press %KeyFor(TempoAnnounce) to speak the tempo again or %KeyFor(TempoCopy) to copy it to the clipboard.  The value will be retained until %KeyFor(TempoStartStop) is pressed again.  It is wise to press ESC when you are done with the Tempo layer to avoid confusion.  
The tempo is calculated by dividing the time of the last beat minus the time of the first beat by the number of beats minus 1.

To toggle speech on or off, press %keyfor(MuteSynthesizer).
To toggle alert messages on or off, press %keyfor (AnnounceOnOff)).  This duplicates the Announce Audacity messages option in Adjust JAWS options.
See What's new.md for more info.

In a toolbar to move to the next toolbar press %KeyFor (NextDocumentWindow)
In a toolbar to move to the previous toolbar press %KeyFor (PreviousDocumentWindow)

To speak the program's state (play/pause/record/stop) press %KeyFor(SayAudacityState)
To reset all script options to default values, press %keyfor (ResetConfig)
To switch between the two lists in the Edit Chains dialog, press %keyfor (SwitchChainsList).

To get help with Audacity hot keys, press %keyfor(AudacityKeysHelp).
To get the default Windows hot key help, press %keyfor(AudacityKeysHelp) twice quickly.

If the "ENTER pauses during play/record" option is on, pressing %KeyFor(ENTER) while playing or recording sends the Pause key.  Use %KeyFor(CtrlEnter) to execute ENTER in this situation.

In some common VST plugins, such as L1V:
To set focus to the preset control, press %keyfor (VSTPreset).
To load an existing preset, press  %keyfor (VSTLoadPreset).
To save the current settings as a preset, press  %keyfor (VSTSavePreset).

If SilencePreview is on and you hit the Preview button in an effect, sometimes the silencing of the previewing does not get turned off.  This will result in missing speech that occurs as a result of focus changes.  You can fix this by switching away from Audacity and back.
 
To change settings for the Audacity script, press %KeyFor (AdjustJawsOptions) %Keyfor (AdjustJawsVerbosity) %Keyfor (QuickSettings).

To Change the URL for the Audacity Jaws Guide, press %keyfor (AddAudacityJawsGuide)
@@
@msgAudacityLayerHelp
Go to a track by number press g.
Move a track by number press m.
Mark current track press k.
Go to marked track press Shift+g.
Exchange current track with mark press x.
Move current track to mark press Shift+m.
Enter layer to set or say position display type layer press p.
Enter layer to say short audio sections (Shift+F5-F8) press s.
Enter layer to find tempo press t.
@@
;Speaks the name of the Position Display Type layer (from KeymapChangedEvent) when p is pressed.
@msgPositionLayer_start
position
@@
@msgPositionLayerHelp
start-end press s.
start-length press l.
length-end press e.
length-center press c.
say position display type press p.
@@
@msgShortLayer_Start
short
@@
@msgShortLayerHelp
Shift+F5-F8 press j, k, l, ;.
Shift+Control+F5, F7 press Control+j, Control+;.
c press c.
@@
@msgTempoLayer_Start
tempo
@@
@msgTempoNoBeats
no beats
@@
@msgTempoNoTempoStored
No tempo stored
@@
;%1=tempo (i.e. 147.8)
@msgTempoCopied
Copied %1
@@
@msgTempoLayerHelp
Start/stop press SPACE.
Announce press a.
Copy to clipboard press c.
@@
@msgPresetHotkeyHelp
To set focus to the preset option, press %keyfor (VSTPreset).
To load an existing preset, press  %keyfor (VSTLoadPreset).
To save the current settings as a preset, press  %keyfor (VSTSavePreset).

@@

;Spoken before loading the Audacity for JAWS Guide web page.
@msgLoadingJawsGuide_L
loading Audacity JAWS Guide web page
@@
@msgLoadingJawsGuide_S
JAWS Guide
@@

;Text of Audacity hotkey help that appears before the link to the Audacity guide for JAWS.
;We don't use a % substitution for the link because it must be added to the virtual buffer by a separate function call to make it a link.
;%1 -- Audacity guide title
;%2 Audacity guide author
;There is a newline before and after the guide link.
@msgAudacityHotKeyHelp1
Default keystrokes for Audacity v2.1.3 (from %1, by %2).  Access the guide at
@@
;Text of hotkey help following the link to the guide.  The first character of the message starts a new line.  I can't get a blank line at the start of the message.
@msgAudacityHotkeyHelp2


General


Command Keystroke

Open audio file Ctrl + O 
Import audio file Ctrl + Shift + I 
New project Ctrl + N 
Save project Ctrl + S 
Preferences dialog Ctrl + P 
Cycle forward through Toolbars, Track table, and Selection bar Ctrl + F6 
Cycle backward through Toolbars, Track table, and Selection bar Ctrl + Shift + F6 
Cycle forward through the Audacity main window and any open modeless dialogs Alt + F6 
Cycle backward through the Audacity main window and any open modeless dialogs Alt + Shift + F6 
Zoom normal Ctrl + 2 
Zoom in Ctrl + 1 
Zoom out Ctrl + 3 

Playback


Command Keystroke

Start/Stop Spacebar 
Start/Stop and move cursor X 
Pause/resume P 
Seek backward short period during playback Left Arrow 
Seek forward short period during playback Right Arrow 
Seek backward long period during playback Shift + Left Arrow 
Seek forward long period during playback Shift + Right Arrow 
Play looped Shift + Spacebar 
Select Playback Device dialog Shift + O 
Play cut/delete preview C 
Play short period before selection start Shift + F5 
Play short period after selection start Shift + F6 
Play short period before selection end Shift + F7 
Play short period after selection end Shift + F8 
Play short period before and after selection start Ctrl + Shift + F5 
Play short period before and after selection end Ctrl + Shift + F7 

Track table


Command Keystroke

Move to previous track Up Arrow 
Move to next track Down Arrow 
Move to first track Ctrl + Home 
Move to last track Ctrl + End 
Toggle selection of focused track Enter 
Select all the tracks (and a time range which includes all the audio) Ctrl + A 
Deselect all the tracks (and any time-range) Ctrl + Shift + A 
Select all the tracks Ctrl + Shift + K 
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
Stop playback and move cursor X 
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
Selection end at playback position ] 
Selection start at start of audio in selected tracks Shift + J 
Selection end at end of audio in selected tracks Shift + K 
To move the end of the selection to the right by a small amount Shift + Right Arrow 
To move the end of the selection to the left by a small amount Ctrl + Shift + Left Arrow 
To move the start of the selection to the right by a small amount Ctrl + Shift + Right Arrow 
To move the start of the selection to the left by a small amount Shift + Left Arrow 

Editing


Command Keystroke

Undo Ctrl + Z 
Redo Ctrl + Y 
Delete selected audio Delete 
Cut selected audio Ctrl + X 
Copy selected audio Ctrl + C 
Paste Ctrl + V 
Replace selected audio with silence Ctrl + L 
Duplicate the selected audio Ctrl + D 
Close (Delete) focused track Shift + C 
Find zero crossings Z 

Labels


Command Keystroke

Add label at selection Ctrl + B 
Add label at playback position Ctrl + M 
Move to next label Alt + Right Arrow 
Move to previous label Alt + Left Arrow 

Recording


Command Keystroke

Record R 
Append Record Shift + R 
Pause/resume P 
Stop Spacebar 
Select Audio Host dialog Shift + H 
Select Recording Device dialog Shift + I 
Select Recording Channels dialog Shift + N 
@@

@msg_App_Start
Wellcome to Audacity. Press %Keyfor(AudacityScriptkeyHelp) to display the list of JAWS hot keys for Audacity.
@@

;Is the same text for Start and End acceptable in msgMoveSelection, msgMoveTo, and msgSelectTo in all languages??
@msgStart
start
@@

@msgEnd
end
@@

@msgLength
length
@@

@msgCenter
center
@@

;Say a position field.  %1 is field name, %2 is value.
@msgPositionField
%1 %2
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
There are no tracks in the project.
@@

@msgNoProject_s
No tracks
@@

;Used??
@msgSelection
selection
@@

@msgTrack
track
@@

;Used to say track number.  %1 -- number of current track, %2 -- total number of tracks.
@msgTrackPosition
%1 of %2
@@
    
;Substituted in msgMoveTo and msgSelectTo.
@msgAllAudio
all audio
@@

@msgSelectedTracks
selected tracks
@@

; %1 is where we move, like start or end, %2 is of what, e.g. track or selection.
@msgMoveTo
Move to %1 of %2
@@

; %1 = where we are selecting to, like start or end, %2 is of what, e.g. track or selection..
@msgSelectTo
Select to %1 of %2
@@

@msgDelete_l
Delete selected audio
@@

@msgDelete_s
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

@msgSelectInAllTracks
select in all tracks
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

@msgNoSelection
To use this feature you must enable the selection toolbar
@@
;Audacity 2.1.3 and earlier
@msgNoRecordingMeter 
To use this feature you must enable the Recording Meter or Combined Meter toolbar
@@
; Audacity 2.2.0
@msgNoRecordingMeter22 
To use this feature you must enable the Recording Meter
@@
;Audacity 2.1.3 and earlier
@msgNoPlaybackMeter 
To use this feature you must enable the Playback Meter or Combined Meter toolbar
@@
;Audacity 2.2.0
@msgNoPlaybackMeter22 
To use this feature you must enable the Playback Meter
@@
@msg_Script_Version
Jaws script version %1, for Audacity 2.0.0 or later.
@@
@MsgNoTrackSelected_L
To use this feature you must select at least one track first. Press ENTER to select a track.
@@
@msgNoTrackSelected_S
No tracks selected.
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
;for changing Jaws guide's link
@msgNoChange_l
No change has been made.
@@
@msgNoChange_s
No change.
@@
@MSGNewURL
The URL has been change to %1
@@
@MSGJawsGuideDialog
Enter the new URL for the Audacity with Jaws Guide.
@@

;Used to speak the field value along with the slider value in the Compressor effect.
;%1 percentage value of the slider (without percent), %2 value of the field (the static after the slider).
@msgCompressorSlider
%1%%%2
@@

; Prompt for the input boxes in the GoToTrack and MoveCurrentTrackTo scripts.
@msgTrackNumber
track number:
@@

; Title of the input box in the  GoToTrack script.
@msgGoToTrackTitle
go to
@@

;Title of the input box in the MoveCurrentTrackTo script.
@msgMoveTrackToTitle
Move to
@@


;%1 = track number
@msgTrackMarked
Track %1 marked
@@

@msgNoTrackMarked
no mark
@@

;Messages to announce some Audacity keys
@msgZoomNormal
zoom normal
@@

@msgZoomIn
zoom in
@@

@msgZoomOut
zoom out
@@

@msgMuteAllTracks
mute all tracks
@@

@msgUnmuteAllTracks
unmute all tracks
@@

@msgReplaceWithSilence
replace with silence
@@

@msgZeroCrossing
zero crossing
@@

@msgImportAudio
import audio
@@

@msgExportAudio
export audio
@@

@msgNewWindow
new window
@@

@msgSaveProject
save project
@@

@msgPreferences
preferences
@@

@msgDuplicate
duplicate
@@

@msgTrim
trim
@@

@msgExportMultiple
Export Multiple
@@

@msgSplitCut
Split Cut
@@

@msgSplitDelete
Split Delete
@@

@msgPasteNewLabel
Paste Text to New Label
@@

@msgSplit
Split
@@

@msgSplitNew
Split New
@@

@msgJoin
Join
@@

@msgDisjoin
Detach at Silences
@@

@msgCutLabels
Cut labels
@@

@msgDeleteLabels
Delete labels
@@

@msgSplitCutLabels
Split Cut labels
@@

@msgSplitDeleteLabels
Split Delete labels
@@

@msgSilenceLabels
Silence labels
@@

@msgCopyLabels
Copy labels
@@

@msgSplitLabels
Split labels
@@

@msgJoinLabels
Join labels
@@

@msgDisjoinLabels
Detach at Silences labels
@@

@msgToggleSpectralSelection
Toggle spectral selection
@@

@msgSelSyncLockTracks
select In All Sync-Locked Tracks
@@

@msgZoomSel
Zoom to Selection
@@

@msgFitInWindow
Fit in Window
@@

@msgFitV
Fit Vertically
@@

@msgGoSelStart
Go to Selection Start
@@

@msgGoSelEnd
Go to Selection End
@@

@msgCollapseAllTracks
Collapse All Tracks
@@

@msgExpandAllTracks
Expand All Tracks
@@

@msgPlayLooped
Loop Play
@@

@msgNewMonoTrack
Mono Track
@@

@msgMixAndRenderToNewTrack
Mix and Render to New Track
@@

@msgAddLabel
Add Label At Selection
@@

@msgAddLabelPlaying
Add Label At Playback Position
@@

@msgRepeatLastEffect
Repeat last effect
@@

@msgFirstTrack
First Track
@@

@msgLastTrack
Last Track
@@

@msgTrackPan
Change pan
@@

@msgTrackMoveTop
Move focused track to top
@@

@msgTrackMoveBottom
Move focused track to bottom
@@

@msgInputDevice
Change recording device
@@

@msgOutputDevice
Change playback device
@@

@msgAudioHost
Change audio host
@@

@msgInputChannels
Change recording channels
@@


EndMessages
