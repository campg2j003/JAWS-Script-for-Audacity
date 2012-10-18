; JAWS script for Audacity multitrack sound editor V2.0.1.0 (http://audacity.sourceforge.net).
;Original author: Gary Campbell
;Modified: Dang Manh Cuong
;Modifications:
;10/17/12 by Dang Manh Cuong: 
; The folowing scripts will now return when a dialog open: SaySelectionStart, SaySelectionEnd, SayAudacityState, DeleteSelectedAudio.
; Script JawsDelete now performs normal functionality at metadata editor.
; Remove script AudacitySayFrame, and all things relatest to it because it work on my PC only.
; Jaws now speech controls in warning dialog of importing uncompress Audio correctly. This done by creating function IsWarningDialog, and adding to funtion HandleCustomWindow, also modify script SayLine to make Jaws reads these well.
; Fix: warning with no track selected while focus on vertual viewer
;10/14/12 by Dang Manh Cuong
; Added function SayUnavailable. This replaces function SayNoProject and SayNoTrackSelected.
;Commented out these two function,and replace it with the new one for testing.
;10/13/12 by Dang Manh Cuong
; Scripts Jaws home and Jaws end now do not warn about no project in vertual buffer.
;10/12/12 by Dang Manh Cuong:
;Added condition to check if no project open into function IsTrackSelected.
; Function SayNoTrackSelected now returns when no project open.
; Function AnnounceMessage now return in any opening dialogs.
;Modified script MoveToStartOfSelectedTracks, MoveToEndOfSelectedTracks, SelectToBeginning, SelectToEnd: cause function sayNoTrackSelected return when focus in a dialog box.
;10/11/12 by Dang Manh Cuong
; Script SayAudacityState now warns with no project open.
;Added function IsTrackSelected and function SayNoTrackSelected. These alert when perform a script require current track must be selected, but user didn't select before.
;Added these new funtionalities to the folowing scripts: JawsDelete, DeleteSelectedAudio, MoveToStartOfSelectedTracks, SelectToBeginning, SelectToEnd, copy, cut.
;Modified function saySelectionPosition. Added condition to allow users to give [ ] to their file name if needed.
;Script sayAppVersion now displays script version in vertual buffer if press JawsKey+v twice.
;10/9/12 Previous saved to HG rev 64.
;10/9/12 by Gary Campbell:
;Merged in changes from repo audacity_cuong changeset 27:e663d81eefa2.
;10/5/2012 by Dang Manh Cuong:
;Modified mouse movement function. User can now perform the default Jaws mouse movement scripts when no project open
;Modified script DeleteSelectedAudio to make it works on my PC.
; Script CloseFocusTrack, DeleteSelectedAudio, JawsHome, JawsEnd now stop speaking alert message when playing audio.
;10/9/12 by Gary Campbell:
;Merged in Cuong's changes from repo audacity_cuong change set 26:8e4fe6bd4ee9.
;10/3/2012 by Dang Manh Cuong:
;Modified script SayAppVersion. This script now just performs default script, and then speaks a message that tells the current script version.
;Modified function SayNoProject. This function now works well at any area at the main window. Code given by Garry Campbell
;9/30/12 Previous saved to HG rev 59.
;9/30/12 Added FocusInTrackPanel test to condition for speaking position in FinishMarkerLeft and StartMarkerRight.
;Added no project message in JAWSHome and JAWSEnd.
;9/29/12 In GetAudacityState added tests of the toolbar button graphic name.  If the first call to GetObjectState fails, uses the graphics to identify the state of the remaining controls.  Added CS_IMG constants for the pressed state of the Play, Pause, and Record buttons.
;9/29/12 Previous saved to HG rev 58.
;9/27/12 by Dang Manh Cuong:
;SelectFromStartOfLine and SelectToEndOfLine scripts now warn when no project is open.
;9/29/12 By Gary Campbell:
;Added and commented out code in GetObjectState to get object state with invisible cursor.  This works on Cuong's machine, but it is very slow, so commented out.
;9/24/12 Changed IsStopped to use GetAudacityState.  This is because on Cuong's machine the Stop button does not return CTRL_DISABLED.
;Added Cuong's SelectAll script, but changed FocusInTrackPanel to FocusInMainWindow because it works in selection bar and toolbars as well.
;Removed duplicate line for AdjustJawsOptions in hotkey help.
;9/21/12 Previous saved to HG rev 55.
;9/21/12 Made function GetAudacityState and changed SayAudacityState to use it.  This is motivated by debugging, but it's a good change anyway.
;9/20/12 Previous saved to HG rev 54.
;9/20/12 Updated script version number.
;9/20/12 Previous saved to HG rev 53.
;9/20/12 Changed the conditions for not executing the default script in Start/FinishMarkerLeft/Right and made them perform their default scripts instead of silently sending the key through.
;In MarkerMovement changed so that it doesn't say "no project" in the virtual buffer.  I think something else prevented this, but the logic looked wrong.
;Movement and selection keys no longer say the position when no project is open.
;9/20/12 Previous saved to HG rev 52.
;9/19/12 Updated hot key help message.
;Added script SayJump and key assignments that bind it to ,, ., shift+,, and Shift+..
;removed commented-out code.
;9/19/12 Previous saved to HG rev 51.
;9/19/12 by Gary Campbell:
; ProcessVST now tests that we found the desired control so that it won't process in other dialogs.
;Now speaks control names in many plug-in dialogs.
;9/19/12 Previous saved to HG rev 50.
;9/19/12 Merged in Cuong's changes from audacity_cuong rev 25:ee441e30dd05.
;9/19/12 by Dang Manh Cuong:
;Modified ProcessVST function. Corrected the issue: "when focus move to the buttons control, it always say the button's name..."
;User can now use the same hotkeys as VST script at the main window.
;Updated comments.
;9/19/12 by Gary Campbell:
;Added Cuong's ProcessVST from his 9/19 distribution, added condition that hWnd is nonzero to the DialogActive test.
;Changed ID_PRESET from 1001 to 11000.  1001 is the edit control that is the child of many combo boxes, like Sample Rate in the selection bar, and setting focus to the parent combobox class works.
;9/18/12 by Gary Campbell:
;Added default processing for ProcessVST.  
;In scripts bound to [CTRL+]Shift+Left/RightArrow if not stopped sends the key to the app.  In play these keys do long jumps or nothing and in recording they don't select.
;9/18/12 by Dang Manh Cuong:
;Modified script SayAppVersion. The script now says current script version after saying Audacity version.
;Added message for the script above into Audacity.jsm file.
;updated comment to scripts has used ProcessVST function

; 9/17/12 Merged in Cuong's changes from default branch, rev 40.
;9/17/12 Previous saved to HG rev 42.
;9/15/2012 Added script ENTER.  If not stopped, it sends key for pause.  Had to add key binding for it to audacity.jkm.  A side effect of doing this is that if JAWS is not set to treate extended keys separately, both numpad ENTER and typing keys ENTER will appear as the typing keys ENTER.  (I tried a separate NumPadEnter script but it still appeared as typing enter, even though GetScriptKeyName() returns NumPadEnter, and even if you use TypeKey(GetCurrentScriptKeyName())).  It is possible to run separate scripts.  It does not seem to be possible for a script to send NumPadEnter to the application.
;9/17/12 Previous saved to HG rev 41.
;9/15/2012 Script DeleteSelectedAudio now works only if stopped.
;9/16/12 Previous saved to HG rev 38.
;-- merge
;9/17/2012 by Dang Manh Cuong:
;Added function to set focus to some common controls in VST plugins, such as preset, load preset, and save preset.
;Added script to swich to the controls above using the new function, also add its hotkeys to the script hotkey help.
;Issue: when focus move to the buttons control, it always say the button's name, and I've not find the way to correct yet.
;9/15/2012 by Dang Manh Cuong
;Update the dicionary file to correct mispronounced word in the Compress Dynamic 1.2.6 dialog
;-- end merge
;9/14/2012 by Gary Campbell:
;Changed function announce message to use SayCurrentScriptKeyLabel and TypeCurrentScriptKey.  Removed the sKey parameter, changed calls, and removed param from jsd.  Now speaks keys assigned to Audacity scripts when not performing Audacity functions.
;Shortened message spoken when ends of selection are moved and added position announcement.
;9/6/12 Previous saved to HG rev 29.
;9/6/2012 by Gary Campbell:
;In GetPositionField now removes zeros and point if no fractional digits.  Replaces 00 before decimal with 1 0.  Does not do this for formats without a decimal point, like 00h00m00s+frames.
;9/5/12 by Gary Campbell:
;Changed  GetPositionField so that it says all three digits following the decimal if there is a nonzero digit.
;9/5/12 Previous saved to HG rev 28.
;9/5/12 by Gary Campbell:
;Updated jsd file.  Corrected syntax in hotkey help.
;Made SayPrev/NextCharacter say "no project" in track panel.
;Issue: position field announcement reads 68s for .068s.
;9/4/12 by Gary Campbell:
;In MouseMovement changed test from !IsJawsCursor to IsPCCursor to exclude invisible cursor as well.
;In AddDefaultConfig made first write to ini file not flush.
;In HandleCustomWindows commented out return false for track panel.
;In CutToClipboard commented out extra AnnounceMessage call.
;In many places moved return after SayNoProject.
;Added more message constants.
;Updated messages and comments.
;9/3/12 Previous saved to HG rev 27.
;9/3/12 Added SayPrior/NextCharacter to speak cursor position if stopped and messages are on.
;9/3/12 Previous saved to HG rev 25.
;9/3/12 by Gary Campbell:
;Merged in changes from audacity_cuong rev 22:3eb23898db16.
;9/3/12 by Dang Manh Cuong
;Modified function SaySelection Position to make sure the selection toolbar is turned on.
;Rewrote funtion AddDefaultConfig. This function can now be used to reset script settings to their default values.
;Wrote script to reset the script config to default values, added its hotkey to the script hotkey help.
; modified function AutoStartEvent to write the config file with default settings if it does not exist.
;9/2/12 by Dang Manh Cuong
;Modified script AdjustJawsOptions to make it work with Jaws 9.0 or later.
;Added function AddDefaultConfig, called from AutoStartEvent  to store default script settings the first time the script is run.
;Removed unused code in function FocusInTrackPanel.
;Rewrote function NoProject.
;Added test to verify that the selection toolbar is turned on.
; Previous saved to HG rev 21.
;9/2/2012 by Gary Campbell:
;In SaySelectionPosition changed OT_POSITION to OT_USER_REQUESTED_INFORMATION as specified in sayActiveCursor in JAWS 10 default.jss.
;Added function IsStopped, also to jsd.
;9/1/2012 In audacity.jsm updated hotkey help to document JAWS script options.
;Added message constants for program states.
;Removed FocusInMainWindow where FocusInTrackPanel is also used.
;9/1/12 Previous saved to HG rev 20.
;9/1/2012 Placed the last revision, say stop state via ObjStateChangedEvent, on branch br_objstatechanged,  because it doesn't work.
; Previous saved to HG rev 18.
;9/1/2012 Added script AdjustJawsVerbosity so that options will be available in versions prior to JAWS 10, not tested.  The Audacity options will appear at the top of the list but will not indicate that they are for Audacity.
;8/31/2012 Turning messages and toolbar alerts on/off now work.
;HandleCustomWindows now calls HandleCustomWindows so that other functions such as in default.jsb can process the window.
;Changed file extension of settings file from .Ini to .jsi.
;8/31/2012 Made FocusInTrackPanel also call FocusInMainWindow so that condition does not need to be tested when it is used.
;Added SayFocusedObject to not say "track table" when moving between tracks.
;Added script AdjustJawsOptions code.  Added options for announce messages and announce toolbars.  Constants and messages are before script AdjustJawsOptions.
; Rewrote script AnnounceOnOff to use UOAnnounceMessages.  It contains literal text.
;8/30/2012 In SaySelectionPosition moved TypeCurrentScriptKey before the IsMainWindow test so that it will be sent to other dialogs.  Moved finding position inside AnnounceOn test since it is not needed until then.  Commented out sending key after a dialog opens because the sent key is what opened the dialog.
;Changed Copy and CutToClipboard to not use AnnounceMessage.  This should allow them to speak in selection bar and toolbars.
;Changed IsMainWindow to FocusInMainWindow.  Changed WrongFocus to FocusInTrackPanel, reversed the sense of its calls.
;Added UserBufferIsActive to SayActiveCursor.
;8/30/2012 Previous saved to HG rev 17.
;8/29/2012 by Dang manh Cuong: Edidted script Jaws home and Jaws End to test the new feature of SayFormattedMessage funtions.
;Removed function HandleCustomWindow created by me.
;8/29/2012 Now speaks state of program-- play, record, stop, play pause, record pause.  Currently bound to JAWSKey+delete.
;8/28/2012 NextDocumentWindow now skips grabber and statics at start of toolbar.
;8/27/2012 Modified HandleCustomWindows to speak the toolbar name when focus moves to a new toolbar.
;Made function GetToolbar to get the toolbar containing the focused control.  Modified JSD.
;Added scripts Next/PreviousDocumentWindow to move focus to the next/previous toolbar when focus is in the toolbars.
;8/26/2012 Previous saved to HG rev 13.
;8/26/2012 by Gary Campbell: Scripts JawsHome andJawsEnd now do not speak the key name if they speak an Audacity message.  They do speak the key name if not in the track table or if Audacity announce messages are off.
;Copy and Cut are modified to work in toolbars and selection bar, but still do not speak because AnnounceMessage tests for !WrongFocus.
;8/25/2012 Rewrote HandleCustomWindows to announce change of focus between main window areas.
;8/25/2012 by Gary Campbell: Moved strings to announce Toolbar, Selection Bar, and Track Panel to audacity.jsm.
;Made message strings in jsm file for many messages.  Did not do copy or cut.
;Rewrote HandleCustomWindows.  Now announces when focus changes from the toolbars to the track panel or the selection bar.  Added IsToolBar, but it has not been tested and is not being used.
;8/24/2012 by Gary Campbell:
;Updated messages and comments.
;Removed commented-out code in IsMainWindow.
;In script DeleteSelectedAudio moved Return to after SayNoProject.  Also added else so that key is sent if not in an audio track just in case it is used somewhere else.  This could also be done by moving TypeCurrentScriptKey at the start of the script.
;In scripts Copy, CutToClipboard, and possibly others added additional conditions for doing the Audacity processing.
;Do Copy/Cut audio work from the selection and tool bars?  (Yes.)  If so my changes need to be modified.
;8/22/2012 by Gary Campbell: In SaySelectionPosition moved getting of field value after the key is sent to Audacity.  Previously Start/EndSelection was speaking the previous value.
;Changed type of hPosition from Handle to Int.
;Changed WrongFocus to test whether the window name of the focused control is not the track panel.
;8/21/2012 by Gary Campbell: Commented out call to NoProject in script SayActiveCursor.
;Previous saved to HG rev 10.
;8/21/2012 by Gary Campbell: In function AnnounceMessage changed variable Key to sKey because of error compiling on JAWS 10.0.1178u.
;8/21/2012 Previous saved to HG rev 9.
;Cuong's modifications:
;8/10/2012 wrote function and script to turn off announcement messages.
;8/2/2012 Commented out function NoProjectOpen. (This exits my script when working with unsaved project, so I removed it at this time.)
;8/1/2012 created function to prevent Jaws from speaking unwanted message when user presses default hotkey, such as Jaws home or Jaws end...
;Jaws now speaks the text in warning dialog while importing an uncompressed audio file.
;7/31/2012 modified some spoken messages and documentation
;Modified the scripts SaySelectionStart and SaySelectionEnd to make it work only in the main window or an  open project.
;Created function for saying start and end selection position when user presses default hotkeys
;SayactiveCursor now performs its default function when no project is open.
;7/28/2012 Added code to make the script be able to compile for Jaws versions before 13.0.
;7/23/2012 wrote functions MouseMovement and CursorMovement to use in scripts assigned to JAWS mouse and cursor movement scripts. This makes the source smaller.
;7/19/2012: created alert messages for copy, cut, deselect all audio, and close current track.
;7/16/2012: modify the scripts for adjusting track gain and pan. User can perform the default normal JAWS functions (mouseLeft, MouseRight, MouseUp, and MouseDown) by turning the Jaws cursor on.
;Added alert messages  for JawsHome, JawsEnd, and wrote code to activate some default script follow by announcing message.
;Modified the JawsDelete script to announce when user deletes the selected audio.
;Created some spoken messages.
;7/15/2012: wrote functions to check if no project is open.
;Created dictionary file for some mispronounced words (usually appear in Preferences dialogs synce Audacity 2.2.1).
;Modified the hotkey help script. The hotkey now displays as a link.
;7/13/2012: created spoken message when user moves the start or end of the selection to the left or right by a small amount.
;7/12/2012: added announce message for start and end selection.
;7/11/2012: added new hotkeys to the script hotkey help.
;Added function AutoStartEvent to announce that this script is active.
;7/2/2012:
; Added function HandleCustomWindows.
;wrote scripts obfor adjusting gain and pan.
;Added hot key Jawskey+Shift+s to toggle mute synthersizer.
;End of Cuong's modifications

; 5/16/12 Converted to work with Audacity 2.0.0 and JAWS 10.0.1178u.
; Added JAWS and Audacity hotkey help.
; SayActiveCursor now says the value of the Audio Position field when in the main window and the PC cursor is active, press twice quickly for cursor position.
; Added ScriptFileName.
; Put messages and string constants in audacity.jsm.
; Added script version string which appears in JAWS hot key help.
; 5/12/07 Broke code to get value of a selection position field into a separate function GetPositionField(). Added script SaySelectionEnd().

Include "hjconst.jsh"
Include "hjglobal.jsh"
Include "common.jsm"
Include "audacity.jsm"

;The next line makes the script compiled on Jaws 13.0 to behave the same as it does with earlier versions.
;#pragma StringComparison partial

; The spacing of the following line must be preserved exactly so that the installer can read the version from it.  There is exactly 1 space between const and the name, and 1 space on either side of the equals sign.
Const CS_SCRIPT_VERSION = "1.2 10/17/12"

Const
	ID_SELECTION_START = 2705,
	ID_SELECTION_END = 2706,   ; selection end or selection length
	;ID_AUDIO_POSITION = -232, ; value changes, it is the 2nd window after _END.
	ID_END_RADIO = 2704,
	ID_LENGTH_RADIO = 2703,
	WC_wxWindowClass = "wxWindowClass", ; grabber control on toolbars
	IniFile="Audacity.jsi",
;For VST plugins
ID_Load_Preset=11001 ,
ID_Save_Preset=11002,
;ID_Preset=1001,
ID_Preset=11000,
	;For user options.
	CI_MESSAGES_OFF = 0,
	CI_MESSAGES_FULL = 1, ; announce all messages
	CI_TOOLBARS_OFF = 0,
	CI_TOOLBARS_ON = 1, ; announce all toolbars

	;Names of toolbar button images for use when GetObjectInfoByName doesn't work.
	;Each ends with a trailing space.
	CS_IMGRECORDPRESSED = "graphic 405 ",
	CS_IMGPLAYPRESSED = "graphic 28 ",
	CS_IMGPAUSEPRESSED = "graphic 161 "



Globals
Int App_FirstTime, String sMessage, String sScriptName

Int Function AnnounceOn ()
;Indicate whether messages related to certain Audacity operations should be spoken.  Return True if messages should be spoken.
Var
Int iAnnounce
Let iAnnounce=IniReadInteger ("Settings", "Announce", 0, IniFile)
If iAnnounce==1 then
Return true
endIf
EndFunction

Int Function AnnounceToolbarsOn ()
;Indicate whether messages related to changing toolbars should be spoken.  Return True if messages should be spoken.
Var
Int iAnnounce
Let iAnnounce=IniReadInteger ("Settings", "AnnounceToolbars", 0, IniFile)
If iAnnounce==1 then
Return true
endIf
EndFunction ; AnnounceToolbarsOn

Int Function FocusInTrackPanel ()
;This function indicates that user focus is in the track panel to prevent Jaws from speaking messages such as move to start of track etc. in the selection bar or toolbar.
Return (FocusInMainWindow () && GetWindowName(GetFocus()) == WN_TRACKPANEL )
EndFunction ; FocusInTrackPanel

Void Function SaySelectionPosition (Int iPosition, string sKey, string sMessage)
;This function now follows the method of saying selection start and end position, from Gary Campbell.
Var
Handle wnd, ;the window containing the selection bar
String sValue ;the selection field value 
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
ElIf DialogActive () then
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey () ;allow users to type [, ] if focus in any text box
ElIf FocusInMainWindow () then
TypeCurrentScriptKey ()
Pause () ;Wait for possible appearance of Boundary Position dialog.
If !DialogActive () then
Pause ()
let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iPosition)
;If the Announce Messages option is on, speak the selection posision.
If AnnounceOn () Then
Let sValue=GetPositionField (wnd) ;get value of desired control
If !sValue then ;the selection toolbar is turned off
Say (MSGNoSelection, OT_Error)
Else
SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sMessage, sMessage)
SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sValue, sValue)
endIf ;say selection position
endIf ; AnnounceOn
endIf ; if !DialogActive
endIf ; If FocusInMainWindow
EndFunction ; SaySelectionPosition

Void Function MarkerMovement (string sScript, string sAlert)
;Used for marker scripts, such as move start of selection to the left by a small amount
;First, check to make sure we have a project open.
If !UserBufferIsActive ()&&FocusInTrackPanel () && IsStopped () then
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
EndIf
TypeCurrentScriptKey ()
If AnnounceOn () then
SayFormattedMessage (OT_Cursor, sAlert) ;The alert specified by calling script
endIf ; if AnnounceOn
Else
;Not main window, perform the specified script, passed as a parameter. This method suggested by Doug Lee
formatStringWithEmbeddedFunctions("<$" +sScript +">") ;instead of PerformScript method. 
endIf ; else not main window
EndFunction ; MarkerMovement

Void Function MouseMovement (string sScript)
;Used to bypass scripts such as mouse left, mouse right etc. that are assigned to Audacity keys while in the main window.
; Script - name of JAWS script to be executed when not in the Audacity main window.
If FocusInMainWindow () 
&& IsPCCursor () && !NoProject () then ;focus at the main window, there's a project open, and the Jaws cursor is not active
TypeCurrentScriptKey () ;Audacity hotkey for adjusting gain
Else
;otherwise, perform the default Jaws script
formatStringWithEmbeddedFunctions("<$" +sScript +">")
endIf ; else perform default script
EndFunction ; MouseMovement

Void Function AnnounceMessage (string Message)
;This speaks an alert message when the user presses certain Audacity hotkeys, such as j or Shift J when appropriate, and passes the key to Audacity.
; Message - message to be spoken.
If !NoProject ()&&! UserBufferIsActive ()&&FocusInTrackPanel ()   then
If AnnounceOn () then
SayUsingVoice (VCTX_Message, Message, OT_status) ;Speak alert message.
endIf ; if AnnounceOn
TypeCurrentScriptKey ()
Else
;not main window, etc.
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
endIf ; else not main window, etc.
EndFunction ; AnnounceMessage
/*
Void Function SayNoProject ()
;If no project is open, speak an alert message.
SayFormattedMessage (OT_error, msgNoProject_l, msgNoProject_s)
EndFunction ; sayNoProject
*/

Int Function NoProject ()
;return true if no project is open  (no tracks in track panel).
;This is a feature from GoldWave scripts.
Var
Int iSubtype,
Handle hTemp,
Object obj
If FocusInMainWindow () then
Let hTemp = GetRealWindow(GetFocus())
Let hTemp = FindWindow (hTemp, "", WN_TRACKPANEL)
SaveCursor ()
InvisibleCursor()
MoveToWindow(hTemp)
Pause ()
Let obj = GetCurrentObject(0)
RestoreCursor ()
If obj.AccChildCount == 0 Then
return true
endIf ; if no tracks
endIf ; if in main window
Return False
EndFunction ; NoProject

Function AutoStartEvent ()
If !App_FirstTime then
Let App_FirstTime=1
SayFormattedMessage (OT_No_Disable, MSG_App_Start)
endIf ; if first time
;write default settings of Audacity script if settings file doesn't exist.
If !FileExists (FindJAWSPersonalizedSettingsFile (IniFile, true)) then
AddDefaultConfig ()
endIf
EndFunction

Globals handle ghAudacityLastArea,
	Handle ghAudacityLastToolbar

/*
Function KeyPressedEvent (int nKey, string strKeyName, int nIsBrailleKey, int nIsScriptKey)
DebugInteger(nKey) ; debug
DebugString(strKeyName) ; debug
KeyPressedEvent (nKey, strKeyName, nIsBrailleKey, nIsScriptKey)
EndFunction
*/

Int Function HandleCustomWindows ()
;Announce when focus changes to a different area of the main window.
Var handle hParent,
	Handle hFocus,
	Handle hOld,
	Handle hToolbar,
	String sName,
	Int iMSAA_JCFOpt

If !FocusInMainWindow() Then
	If DialogActive () && GetWindowName(GetFocus()) == cscNULL Then
		let iMSAA_JCFOpt = GetJCFOption (opt_MSAA_mode)
		SetJCFOption (opt_MSAA_mode, 2)
		Let sName = GetObjectName()
		SetJCFOption (opt_MSAA_mode, iMSAA_JCFOpt)
		SayControlEx(GetFocus (), 
		sName, "",   ; control name, type
		"",   ; control state
		"", "",   ; Container name, type
		"", "",   ; value, position
		"")   ; dialog text
		Return True
ElIf IsWarningDialog () then
SayWindowTypeAndText (GetFocus ())
return true
			EndIf ; no window name
	Return HandleCustomWindows () ; not main window, continue with normal processing
endIf ; if ! focus in main window
Let hFocus = GetFocus ()
Let hParent = GetParent(hFocus)
If GetWindowName(hFocus) != WN_TRACKPANEL Then
Let hParent = GetParent(hParent)
endIf ; if not track panel
; If hFocus is the track panel, hParent is its parent.  Otherwise it is the grandparent of hFocus.
Let hOld = ghAudacityLastArea
If hParent != hOld Then
Let ghAudacityLastArea = hParent ; new area.
; We could use FocusInTrackPanel here but we've already tested most of its conditions.
If GetWindowName(hFocus) == WN_TRACKPANEL Then
Say (StrTrackPanel, OT_Position)
Return HandleCustomWindows ()
endIf ; if track panel
; We could also identify the selection by testing for WindowHierarchyX = 3.
If GetWindowName(GetFirstChild(hParent)) == WN_SELECTION Then
Say (StrSelectionBar, OT_position)
Else
Say (StrToolBars, OT_position)
endIf ; else toolbar
endIf ; new area

If IsToolbar(GetToolbar ()) Then
Let hToolbar = GetToolbar()
If hToolbar != ghAudacityLastToolbar Then
Let ghAudacityLastToolbar = hToolbar
If AnnounceToolbarsOn () Then
Say(GetWindowName(hToolbar), OT_CONTROL_GROUP_NAME)
endIf
endIf ; new toolbar
endIf ; If IsToolbar
;Speaks an alert when no project open
If NoProject () &&AnnounceOn () then
SayUnavailable (1)
;SayNoProject ()
endIf
Return HandleCustomWindows () ; allow others to process
EndFunction ; HandleCustomWindows

Void Function SayFocusedObject ()
If FocusInTrackPanel () Then
;Suppress speaking of "track table" when moving between tracks.
SayObjectActiveItem ()
Else
SayFocusedObject ()
endIf
EndFunction ; SayFocusedObject

Int Function IsToolbar (handle hWnd)
; Return True if hWnd is one of the toolbars.
; The toolbars are in a window named ToolDock under the app window.  It is the second window, the selection bar is inside the window following it, which is also named ToolDock.
; Assumes focus is in the main window.
Var Handle hParent
Let hParent = GetParent(hWnd)
If hParent == 0 Then
;Make sure we have a window handle, just to be safe.
Let hParent = hWnd
endIf ; no parent
If GetWindowName(hParent) == WN_TOOLDOCK && GetWindowHierarchyX(hParent) == 2 Then
Return True
endIf
Return False
EndFunction ; IsToolbar

Handle Function GetToolbar()
; When focus is on a toolbar control returns the handle of the toolbar containing the control.
Return GetParent(GetFocus())
EndFunction ; GetToolbar

Int Function FocusInMainWindow()
Var
	Handle hFocus,
	Handle hWnd
	
Let hFocus = GetFocus()
If (GetWindowName(hFocus) == WN_TRACKPANEL || GetWindowName(GetParent(GetParent(hFocus))) == WN_TOOLDOCK) then
	Return True
endIf
Return False
EndFunction

String Function GetPositionField (handle hWnd)
;We don't receive a control ID because of Audio Position field.
Var
	String s,
	String s1,
	String s2,
	String s3,
	String s4,
	Int i,
	Int j

Let s = GetWindowText(hWnd, 0)

;Remove "uninteresting" stuff from the position, like leading neros and ".000"
; A position can be in several formats, such as "0 0  h 0 0  m 0 0 .0 0 0  s " or "0 0 0 ,0 0 0  seconds ".
;These strings may need to be localized because H, M, ., and comma may be different.
Let s2 = StringStripAllBlanks(s)
If StringContains(s2, csGroupSep) Then
	;SayString("no point") ; debug
	Let s1 = csPositionGroupFmt ;does not include final 0.
Else
	;Let s1 = "0 0  h 0 0  m 0 0 .0 0" ; we strip as much of this as matches off the front, we don't match the last 0 so it will say something.
	;SayString("decimal") ; debug
	Let s1 = ""
	If StringContains (s2, csDays) Then
		Let s1 = "00" + csDays
	endIf
	Let s1 = s1 + csPositionHHMMFmt ; we strip as much of this as matches off the front up to the decimal point.
	;SayString("s1 = " + s1) ; debug
	;S1 contains what needs to be ssripped from the staart of s2.
endIf ; else contains decimal
; Return is in s1 and s2, passed by reference!!!
StringTrimCommon(s1, s2, 1) ; 1=trim from start
Let i = StringContains (s2, csDecimal)
If i > 0 Then
	;Check all digits immediately following the decimal point for nonzero digits.
	Let s3 = StringRight (s2, StringLength (s2) - i)
	; We want to know if there are nonzero digits between the point and the next nondigit.  We change all zeros to blanks and strip the leading blanks.  The difference in length is the number of leading digits.
	Let s4 = StringTrimLeadingBlanks(StringReplaceChars(s3, "0", " "))
	If !StringContainsChars(Substring(s4, 1, 1), "123456789") Then
		;No nonzeros, find the number of zeros.
		Let j = StringLength(s3) - StringLength(s4)
		;SayString("no nonzeros, j = " + IntToString(j)) ; debug
		If i == 1 Then
			Let s2 = "0" + s2
			Let i = i + 1
		endIf ; if decimal is first char
		Let s3 = StringReplaceSubstrings(substring(s2, 1, i - 1), "00", "0")
		Let s2 = s3 + Substring (s2, i + 1 + j, StringLength(s2) - j)
	Else
		; nonzeros after decimal
	Let s3 = StringReplaceSubstrings(substring(s2, 1, i - 1), "00", "0")
		Let s2 = s3 + Substring (s2, i, StringLength(s2) - i + 1)
	endIf ; if no nonzeros after decimal
endIf ; if decimal
; What we want is in s2.
; Don't say leading parts if they are 0.

Return s2
EndFunction ; GetPositionField

Script SaySelectionStart ()

Var
	Handle hWnd,
	String sName,
	String sValue
;I modified this script to make it work on open project only.
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return ;exit this script when no project open
ElIf DialogActive () then
Return ;exit this script without saying anything
Else
Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
If (IsSameScript()) Then
	SetFocus(hWnd)
	Return
endIf ;if IsSameScript
endIf ; Else not NoProject()
Let sValue = GetPositionField(hWnd)
If !sValue then ;some time user turn off the selection toolbar, so this condition varify the selection boolbar is turned on or not
Say (msgNoSelection, OT_error)
Else
SayMessage (OT_NO_DISABLE, sValue, sValue)
endIf
EndScript

Script SaySelectionEnd ()

Var
	Handle hRadio,
	Handle hEnd, ; handle of the edit control
	String sName,
	String sValue,
	Int bIsSelected
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
ElIf DialogActive () then
Return
Else ; project open
Let hEnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
If (IsSameScript()) Then
	SetFocus(hEnd)
	Return
endIf ; if IsSameScriqt

Let hRadio = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_END_RADIO)
SaveCursor()
InvisibleCursor()
MoveToWindow (hRadio)
Pause()
Let bIsSelected = ControlIsChecked ()
RestoreCursor()

If (Not bIsSelected) Then
	Let hRadio = GetNextWindow (hRadio)
endIf

Let sName = GetWindowName (hRadio)

Let sValue = GetPositionField(hEnd)
If !sValue then
Say (msgNoSelection, OT_error)
Else
SayMessage (OT_NO_DISABLE, sName + sValue, sValue)
endIf
endIf ; else project open
EndScript

Script SayActiveCursor()
; Say audio position field if PC cursor is on, or perform the normal function if pressed twice quickly.
Var
	Handle hWnd,
	String sValue
If (Not FocusInMainWindow() || IsSameScript() || Not IsPCCursor() || UserBufferIsActive ())||NoProject () Then
	PerformScript SayActiveCursor()
	Return
endIf
Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
Let hWnd = GetNextWindow(GetNextWindow(hWnd))
;hWnd is Audio Position field.
Let sValue = GetPositionField(hWnd)
If !sValue then
Say (msgNoSelection, OT_error)
Else
SayMessage (OT_NO_DISABLE, sValue, sValue)
endIf
EndScript

Script  ScriptFileName()
ScriptAndAppNames(msgProgName)
EndScript

Script HotkeyHelp ()
If UserBufferIsActive () then
UserBufferDeactivate ()
endIf
If (!IsSameScript() && FocusInMainWindow()) Then
Let sMessage=FormatString (MSGScript_Ver, CS_SCRIPT_VERSION)
SayFormattedMessage (OT_User_buffer, sMessage)
SayFormattedMessage (OT_User_Buffer, MSGHotkeyHelp)
Else
	PerformScript HotKeyHelp()
endIf
EndScript

Script WindowKeysHelp ()

If (!IsSameScript() && FocusInMainWindow())
Then
	SayFormattedMessage(OT_USER_BUFFER, msgAudacityHotKeyHelp)
Else
	PerformScript WindowKeysHelp()
endIf
EndScript

;These scripts allow access to Audacity keys assigned to the same keys as Jaws scripts such as mouse up, mouse down etc..  The user can still perform the JAWS functions by turning on Jaws cursor.
Script MouseUp ()
Let sScriptName="MouseUp" ;Perform script name for MouseUp in a variable
MouseMovement (sScriptName)
EndScript

Script MouseDown ()
Let sScriptName="MouseDown"
MouseMovement (sScriptName)
EndScript

Script MouseLeft ()
Let sScriptName="MouseLeft"
MouseMovement (sScriptName)
EndScript

Script MouseRight ()
Let sScriptName="MouseRight"
MouseMovement (sScriptName)
EndScript

;The scripts below just speak an alert message when user presses certain Audacity hotkeys when they are active.
Script SelectionStart ()
;Say selection start position when user presses the left braket key.
SaySelectionPosition (ID_SELECTION_START, "[", msgSelectionStart)
EndScript

Script SelectionEnd ()
;Say selection end position
SaySelectionPosition (ID_SELECTION_END, "]", msgSelectionEnd)
EndScript

Script FinishMarkerRight ()
;move the end of the selection to the right by a small amount.
Var
	Handle hWnd

If !IsPCCursor () || UserBufferIsActive () Then
	PerformScript SelectNextCharacter ()
	Return
EndIf

If !IsStopped () Then
	;When playing this does long jump right, in recording I don't think it does anything, and it certainly doesn't select.
TypeCurrentScriptKey ()
Return
EndIf ; playing/recording

Let sMessage=FormatString (MSGMoveSelection, msgEnd, msgRight)
Let sScriptName="SelectNextCharacter" ;The default script to perform if not in main window
MarkerMovement (sScriptName, sMessage)
If AnnounceOn () && !NoProject () && FocusInTrackPanel () Then
pause ()
let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
endIf
EndScript

Script FinishMarkerLeft ()
Var
	Handle hWnd

If !IsPCCursor () || UserBufferIsActive () || !IsStopped () Then
	PerformScript SelectPriorWord ()
	Return
EndIf

Let sMessage=FormatString (MSGMoveSelection, msgEnd, msgLeft)
Let sScriptName="SelectPriorWord"
MarkerMovement (sScriptName, sMessage)
If AnnounceOn () && !NoProject () Then
pause ()
let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
endIf
EndScript

Script StartMarkerRight ()
Var
	Handle hWnd

If !IsPCCursor () || UserBufferIsActive () || !IsStopped () Then
	PerformScript SelectNextWord ()
	Return
EndIf

Let sMessage=FormatString (MSGMoveSelection, msgStart, msgRight)
Let sScriptName="SelectNextWord"
MarkerMovement (sScriptName, sMessage)
If AnnounceOn () && !NoProject () Then
pause ()
let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
endIf
EndScript

Script StartMarkerLeft ()
Var
	Handle hWnd

If !IsPCCursor () || UserBufferIsActive () Then
	PerformScript SelectPriorCharacter ()
	Return
EndIf

If !IsStopped () Then
	;When playing this does long jump right, in recording I don't think it does anything, and it certainly doesn't select.
TypeCurrentScriptKey ()
Return
EndIf ; playing/recording

Let sMessage=FormatString (MSGMoveSelection, msgStart, msgLeft)
Let sScriptName="SelectPriorCharacter"
MarkerMovement (sScriptName, sMessage)
If AnnounceOn () && !NoProject () && FocusInTrackPanel () Then
pause ()
let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
endIf
EndScript

Script JawsHome ()
;If we are speaking an Audacity message, don't speak the key name.
If NoProject () && FocusInTrackPanel () &&!UserBufferIsActive () Then
SayUnavailable (1)
;	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () &&! NoProject () &&!UserBufferIsActive ()&&AnnounceOn () &&IsStopped ()==true  then
JawsHome () ; do Home without speaking key label
SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, msgStart, msgtrack))
Else
PerformScript JAWSHome()
endIf
EndScript

Script JawsEnd ()
;If we are speaking an Audacity message, don't speak the key name.
If NoProject () && FocusInTrackPanel () &&!UserBufferIsActive () Then
SayUnavailable (1)
;	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () && !NoProject () &&!UserBufferIsActive ()&&AnnounceOn () &&IsStopped () ==true then
JAWSEnd () ; do End without speaking key label
SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, msgEnd, msgAllAudio))
Else
PerformScript JAWSEnd()
endIf
EndScript


Script MoveToStartOfSelectedTracks ()
If DialogActive () then
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
;The condition below past current hotkey to application if any dialog open
ElIf !IsTrackSelected () then
;SayNoTrackSelected ()
SayUnavailable (2)
Return
Else
AnnounceMessage (FormatString (MSGMoveTo, msgStart, msgSelectedTracks))
EndIf
EndScript

Script MoveToEndOfSelectedTracks ()
If DialogActive () then
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
ElIf !IsTrackSelected () then
;SayNoTrackSelected ()
SayUnavailable (2)
Return
else
AnnounceMessage (FormatString (MSGMoveTo, msgEnd, msgSelectedTracks))
EndIf
EndScript

Script SelectToBeginning ()
;Select to start of tracks.
If DialogActive () then
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
ElIf !IsTrackSelected () then
;SayNoTrackSelected ()
SayUnavailable (2)
Return
Else
AnnounceMessage (FormatString (MSGSelectedTo, msgStart))
EndIf
EndScript

Script SelectToEnd ()
;Select to end of tracks.
If DialogActive () then
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
ElIf !IsTrackSelected () then
;SayNoTrackSelected ()
SayUnavailable (2)
Return
Else
AnnounceMessage (FormatString (MSGSelectedTo, msgEnd))
EndIf
EndScript

Script SelectFromStartOfLine ()
;Select from current position to the start of file by pressing shift+ home
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () then
SelectFromStartOfLine ()
If AnnounceOn () then ;User can turn off this message
SayFormattedMessage (OT_No_Disable, msgStartOfFile) ;alerts when user activates this script at the main window, and a project is open
endIf
;Otherwise, perform default script
Else
PerformScript SelectFromStartOfLine()
endIf
EndScript

Script SelectToEndOfLine ()
;Select from current position to the end of file
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!UserBufferIsActive ()&&!NoProject () then
SelectToEndOfLine ()
If AnnounceOn () then
SayFormattedMessage (OT_No_Disable, msgEndOfFile)
endIf
Else
PerformScript SelectToEndOfLine()
endIf
EndScript

Script DeleteSelectedAudio ()
;Alerts when user deletes selected sound
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
ElIf DialogActive () then
Return
ElIf !IsTrackSelected () then
;SayNoTrackSelected ()
SayUnavailable (2)
return
ElIf FocusInTrackPanel ()&& IsStopped () ==true then
TypeCurrentScriptKey ()
If AnnounceOn () then
SayFormattedMessage (OT_Jaws_Message, MSGDelete_l, MSGDelete_s)
endIf ; if AnnounceOn
Else ; not main window, etc.
; Just in case it is used somewhere else.  Actually, we could do it at the top of the script and eliminate this else.
TypeCurrentScriptKey ()
endIf ; else not main window, etc.
EndScript

Script JawsDelete ()
;If focus is in the main window, a project exists, and audio is selected, the del key will delete it. In this case we perform the script DeleteSelectedAudio.
If FocusInMainWindow ()&&! IsTrackSelected () &&!NoProject () then
;SayNoTrackSelected ()
SayUnavailable (2)
Return
ElIf FocusInTrackPanel ()&&!NoProject () then
PerformScript DeleteSelectedAudio()
Else
PerformScript JAWSDelete()
endIf
EndScript

Script JawsBackspace ()
;This script is similar to the JawsDelete script.
If FocusInTrackPanel ()&&!NoProject () then
PerformScript DeleteSelectedAudio()
Else
PerformScript JAWSBackspace()
endIf
EndScript

Script SayPriorCharacter ()
var
	Handle hWnd

If !userBufferIsActive () && AnnounceOn () && IsPCCursor () && FocusInTrackPanel () && IsStopped () Then
If NoProject () Then
;SayNoProject ()
SayUnavailable (1)
Return
endIf ; if no project
TypeCurrentScriptKey ()
Pause ()
let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
Else
PerformScript SayPriorCharacter ()
endIf
EndScript ; SayPriorCharacter

Script SayNextCharacter ()
var
	Handle hWnd

If !userBufferIsActive () && AnnounceOn () && IsPCCursor () && FocusInTrackPanel () && IsStopped () Then
If NoProject () Then
SayUnavailable (1)
;SayNoProject ()
Return
endIf ; if no project
TypeCurrentScriptKey ()
Pause ()
let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
Else
PerformScript SayNextCharacter ()
endIf
EndScript ; SayNextCharacter


Script Copy ()
;Copy selected sound to clipboard in main window.
If !IsTrackSelected () &&!UserBufferIsActive () then
;SayNoTrackSelected ()
SayUnavailable (2)
Return
ElIf FocusInMainWindow ()
&&!UserBufferIsActive () then ;this second condition makes the default script active in virtual viewer

If NoProject () then
SayUnavailable (1)
;SayNoProject ()
return
endIf ; no project
TypeCurrentScriptKey ()
If AnnounceOn () then
SayUsingVoice (VCTX_Message, msgCopyAudio, OT_status) ;the alert message declare here
endIf ; if AnnounceOn
Else
;If no project open, or focus in other windows, perform the default script
PerformScript CopySelectedTextToClipboard()
endIf
EndScript

Script CutToClipboard ()
If !IsTrackSelected () then
;SayNoTrackSelected ()
SayUnavailable (2)
Return

ElIf FocusInMainWindow ()
&&!UserBufferIsActive () then ;this second condition makes the default script active in virtual viewer
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
return
endIf ; no project
TypeCurrentScriptKey ()
If AnnounceOn () then
SayUsingVoice (VCTX_Message, msgCutAudio, OT_status) ;speak alert message
endIf ; if AnnounceOn
; We've already sent the key.
;AnnounceMessage ("cut selected audio to clipboard", CksCut)
Else
PerformScript CutToClipboard()
endIf
EndScript

Script DeselectAll ()
;Unselect all audio
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel () then ;!UserBufferIsActive () makes the default script active in virtual viewer
AnnounceMessage (msgDeselectAll)
endIf
EndScript

Script CloseFocusTrack ()
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel () &&! IsStopped ()== true then ;!UserBufferIsActive () makes the default script active in virtual viewer.
AnnounceMessage (msgCloseFocusedTrack)
Else
TypeCurrentScriptKey ()
endIf
EndScript ; CloseFocusTrack

Script AnnounceOnOff ()
Var String sMessage
Let sMessage="Announce messages" + UOAnnounceMessages(0)
Say (sMessage, OT_Status)
EndScript

Script NextDocumentWindow ()
Var
	Handle hToolbar,
	Handle hNext,
	Handle hWnd

If !IsToolbar (GetToolbar ()) Then
PerformScript NextDocumentWindow ()
Else
; Is a toolbar.
Let hToolbar = GetToolbar ()
Let hNext = GetNextWindow (hToolbar)
If !hNext Then
Let hNext = GetFirstWindow (hToolbar)
endIf ; last window
Let hWnd = GetFirstChild (hNext)
; Toolbars start with a grabber control, and some of them have static controls following the grabber.  We skip these to get to the first control.
While hWnd && ( (StringCompare(GetWindowClass(hWnd), WC_wxWindowClass) == 0) || (GetWindowSubtypeCode (hWnd) == WT_STATIC))
;SayString("class=" + GetWindowClass(hWnd) + ", subtype = " + IntToString(GetWindowSubtypeCode(hWnd))) ; debug
Let hWnd = GetNextWindow(hWnd)
EndWhile
SetFocus (hWnd)
endIf ; else is toolbar
EndScript ; NextDocumentWindow

Script PreviousDocumentWindow ()
Var
	Handle hToolbar,
	Handle hPrior,
	Handle hWnd

If !IsToolbar (GetToolbar ()) Then
PerformScript PreviousDocumentWindow ()
Else
; Is a toolbar.
Let hToolbar = GetToolbar ()
Let hPrior = GetPriorWindow (hToolbar)
If !hPrior Then
Let hPrior = GetLastWindow (hToolbar)
endIf ; first window
Let hWnd = GetLastWindow(GetFirstChild (hPrior))
SetFocus (hWnd)
endIf ; else is toolbar
EndScript ; PreviousDocumentWindow

Const
	ST_NOTOOLBAR = 0,
	ST_PAUSE = 1,
	ST_PLAY = 2,
	ST_RECORD = 4,
	ST_STOPPED = 8
	
Int Function GetAudacityState ()
Var
	Int iPauseState,
	Int iPlayState,
	Int iStopState,
	Int iRecordState,
	Handle hTemp,
	Int iState

Let hTemp = GetFirstChild(GetAppMainWindow(GetFocus()))
Let hTemp = GetNextWindow(hTemp) ; parent of toolbars
Let hTemp = FindWindow (hTemp, "", WN_TRANSPORT_TOOLBAR)
If !hTemp Then
Return ST_NOTOOLBAR
endIf ; if no transport toolbar

Let hTemp = GetNextWindow(GetFirstChild(hTemp)) ; skip the grabber
Let iPauseState = GetObjectState(hTemp)
If iPauseState == -1 Then
;We can't get the state from the object, so we'll use the name of the toolbar button image.
;SayString("pause = " + GetWindowText(hTemp, 0)) ; debug
If StringCompare(GetWindowText(hTemp, 0), CS_IMGPAUSEPRESSED) == 0 Then
Let iPauseState = CTRL_PRESSED
EndIf
Let hTemp = GetNextWindow(hTemp)
;SayString("play = " + GetWindowText(hTemp, 0)) ; debug
If StringCompare(GetWindowText(hTemp, 0), CS_IMGPLAYPRESSED) == 0 Then
Let iPlayState = CTRL_PRESSED
EndIf
Let hTemp = GetNextWindow(hTemp)
;Let iStopState = GetObjectState(hTemp)
Let hTemp = GetNextWindow(GetNextWindow(GetNextWindow(hTemp))) ; skip Start and End
If StringCompare(GetWindowText(hTemp, 0), CS_IMGRECORDPRESSED) == 0 Then
Let iRECORDState = CTRL_PRESSED
EndIf
Else
Let hTemp = GetNextWindow(hTemp)
Let iPlayState = GetObjectState(hTemp)
Let hTemp = GetNextWindow(hTemp)
Let iStopState = GetObjectState(hTemp)
Let hTemp = GetNextWindow(GetNextWindow(GetNextWindow(hTemp))) ; skip Start and End
Let iRecordState = GetObjectState(hTemp)
EndIf ; else got object state
;SayString("Object states: pause = " + DecToHex(iPauseState) + ", play = " + DecToHex(iPLayState) + ", stop = " + DecToHex(iStopState) + ", record = " + DecToHex(iRecordState)) ; debug
If iPlayState & CTRL_PRESSED Then
Let iState = ST_PLAY
ElIf iRecordState & CTRL_PRESSED Then
Let iState = ST_RECORD
Else
Let iState = ST_STOPPED
endIf
If iPauseState & CTRL_PRESSED Then
let iState = iState | ST_PAUSE
endIf
Return iState
EndFunction ; GetAudacityState

Script SayAudacityState ()
;Announces whether Audacity is stopped, playing, paused, or recording.
Var
	Int iPauseState,
	Int iPlayState,
	Int iStopState,
	Int iRecordState,
	Handle hTemp,
	Int iState,
	String sMsg

Let iState = GetAudacityState ()
If iState == ST_NOTOOLBAR Then
	Say(msgNoTransportToolbar, OT_JAWS_MESSAGE)
	Return
ElIf DialogActive () then
Return ;dialog active
ElIf NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return ;No project
EndIf ; no toolbar
If iState & ST_PLAY Then
Let sMsg = msgPlay
ElIf iState & ST_RECORD Then
Let sMsg = msgRecord
Else
Let sMsg = msgStop
endIf
If iState & ST_PAUSE Then
let sMsg = sMsg + " " + msgPause
endIf
Say(sMsg, OT_JAWS_MESSAGE)
EndScript ; SayAudacityState

;/*
;This script causes ENTER to do pause if not stopped, otherwise does normal ENTER.
;If you comment this out you should also comment out entries for keys ENTrR and NumPadEnter in the jkm file.  Otherwise, if JAWS is set to treat numpad keys serarately, not commenting out these entries will cause Audacity to see both keys as standa"rd ENTER.
Script Enter ()
;SayString(GetCurrentScriptKeyName())
If FocusInMainWindow() && !IsStopped () Then
	TypeKey("p")
Else
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	;PerformScript Enter ()
endIf
EndScript
;*/

Int Function GetObjectState(Handle hWnd)
;Gets the object state from an object in a window.  Assumes the object has the same name as the window (returned by GetWindowName).  This is used to get the Pressed state of toolbar buttons.
;The returned state uses control attribute values from hjconst.jsh, not MSAASTATE values from msaaconst.jsh.
;Returns -1 if unable to get the object state.
Var
	Int iState,
	Int iSubtype,
	String sName,
	Int iRtn

Let sName = GetWindowName(hWnd)
Let iRtn = GetObjectInfoByName(hWnd, sName, 1, iSubtype, iState)
If !iRtn Then
	Return -1 ; error
EndIf
/*
;This works on Cuong's machine, but it is very slow!!!
iRtn = GetObjectInfoByName(hWnd, sName, 1, iSubtype, iState)
If !iRtn Then
	DebugString("Before") ; debug
	SaveCursor ()
	InvisibleCursor ()
	MoveToWindow(hWnd)
	Pause ()
	Let iState = GetControlAttributes ()
	RestoreCursor ()
	DebugString("after") ; debug
EndIf
*/
Return iState
EndFunction ; GetObjectState

/*
Int Function IsStopped ()
;Returns nonzero if currently stopped or the Transport toolbar cannot be found. Returns FALSE otherwise.
;We don't cache the stop button handle becaause the Transport toolbar may have been deselected since last invocation.  We might could detect the toolbar being destroyed with WindowDestroyedEvent.  We return FALSE in this situation so that operation is not interrupted.
var
	Handle hTemp
Let hTemp = GetFirstChild(GetAppMainWindow(GetFocus()))
Let hTemp = GetNextWindow(hTemp) ; parent of toolbars
Let hTemp = FindWindow (hTemp, "", WN_TRANSPORT_TOOLBAR)
If !hTemp Then
;Say("Cannot find transport toolbar.  The transport toolbar must be enabled for this script to work.", OT_JAWS_MESSAGE)
Return False
endIf ; if no transport toolbar
Let hTemp = GetNextWindow(GetFirstChild(hTemp)) ; skip the grabber
Let hTemp = GetNextWindow(hTemp)
Let hTemp = GetNextWindow(hTemp)
Return GetObjectState(hTemp) & CTRL_DISABLED
EndFunction ; IsStopped
*/

Int Function IsStopped ()
Return GetAudacityState () & ST_STOPPED
EndFunction ; IsStopped

; *** Adapted from ie.jss
Script AdjustJawsVerbosity ()
;This is to support JAWS versions that do not support tree-style user options.  This should work but may not look very nice.  Not tested!
var
	string strListOfOptions

Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS
JawsVerbosityCore (strListOfOptions)
EndScript ; AdjustJawsVerbosity

Script AdjustJAWSOptions ()
var
	string strListOfOptions
if InHJDialog () then
	SayFormattedMessage (OT_error, cMSG337_L, cMSG337_S)
	return
endIf
Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS
If GetJFWVersion () >= 900000 Then
	OptionsTreeCore (strListOfOptions) ;the OptionsTreeCore available in Jaws 9.0 or later
Else
JawsVerbosityCore (strListOfOptions) ;The AdjustJawsVerbosity available prior to Jaws 9.0. Not tested
endIf ; JAWS 9 or >
EndScript ; adjustJawsOptions

String Function NodeHlp (string sNodeName)
;This is the easiest way for you to create your callback help,
;for your configuration-specific options,
;if you have not specified a node, we have done so using your configuration's name.
;If you don't do this, your top-level or group node will tell your users that no help is available, although we try to be nice about it.
If StringContains (sNodeName, GetActiveConfiguration ()) then
	Return msgUO_AudacityOptionsHlp
Else
	Return NodeHlp (sNodeName);Default for all default and Virtual Cursor groups.
endIf
EndFunction ; NodeHlp

string Function UOAnnounceMessages(int iRetCurVal)
var
	Int iVal
Let iVal = IniReadInteger ("Settings", "Announce", CI_MESSAGES_OFF, IniFile)
if !iRetCurVal then
	if iVal == CI_MESSAGES_FULL Then
		let iVal = CI_MESSAGES_OFF
	else
		; This paves the way for multiple values.
		let iVal = iVal + 1
	endIf
	IniWriteInteger ("Settings", "Announce", iVal, IniFile)
endIf ; if !iRetCurVal
if iVal == CI_MESSAGES_OFF then
	Return cmsg_Off
;ElIf giHTMLFrameUpdateNotification == FrameUpdateNotification_Indicate then
	;Return msgFrameUpdateNotificationSpeakFrameName
ElIf iVal == CI_MESSAGES_FULL Then
	Return cmsg_On
endIf
EndFunction ; UOAnnounceMessages

String Function UOAnnounceMessagesHlp ()
Return msgUO_AnnounceMessagesHlp
EndFunction ; UOAnnounceMessagesHlp

string Function UOAnnounceToolbars(int iRetCurVal)
var
	Int iVal
Let iVal = IniReadInteger ("Settings", "Announcetoolbars", CI_TOOLBARS_OFF, IniFile)
if !iRetCurVal then
	if iVal == CI_TOOLBARS_ON Then
		let iVal = CI_Toolbars_OFF
	else
		; This paves the way for multiple values.
		let iVal = iVal + 1
	endIf
	IniWriteInteger ("Settings", "Announcetoolbars", iVal, IniFile)
endIf ; if !iRetCurVal
if iVal == CI_TOOLBARS_OFF then
	Return cmsg_Off
ElIf iVal == CI_TOOLBARS_ON Then
	Return cmsg_On
endIf
EndFunction ; UOAnnounceToolbars

String Function UOAnnounceToolbarsHlp ()
Return msgUO_AnnounceToolbarsHlp
EndFunction ; UOAnnounceToolbarsHlp

Void Function AddDefaultConfig ()
;Adds values of default settings to Audacity.JSI File.
IniWriteInteger ("Settings", "Announce", 1, IniFile, False) ; don't flush because we're going to write another one
IniWriteInteger ("Settings", "AnnounceToolbars", 1, IniFile, true) ; flush
EndFunction

Script ResetConfig ()
;Reset all audacity Jaws script options' config to default.
AddDefaultConfig ()
Say (msgResetScriptOptions, OT_message)
EndScript ; resetConfig

Script SayAppVersion ()
;Says current program and script version
PerformScript SayAppVersion() ;Says current program version
	Let sMessage=FormatString (msg_Script_Version, cs_Script_Version) ;current script version
Say (sMessage, OT_No_Disable) ;says current script version
If IsSameScript () then
UserBufferAddText (sMessage)
EndIf
EndScript

Script SelectAll ()
;announce a message when user selects all tracks in current project, or no project open.
PerformScript SelectAll()
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
ElIf FocusInMainWindow() && ! NoProject () && AnnounceOn () then
SayUsingVoice (VCTX_Message, MsgSelectAll, OT_String)
EndIf
EndScript

; Cuong's with modification
Void Function ProcessVST (int iControlID)
;Performs some VST plugins' options quickly by hotkeys. The options include: preset, load preset, save preset.
Var
Handle hWnd
Let hwnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iControlID) ;The control ID of the focus should be moved to
If DialogActive () && hWnd then ;make sure user is in a dialog and we found the desired control.
If GetWindowClass (hWnd)=="button" then
SpeechOff () ;prevent Jaws to speaks wile focus move to a button
SetFocus (hWnd) ;move focus to the button
EnterKey () ;presses the enter key to activate the button have focus
SpeechOn ()
Else
;while focus at the preset control, just set focus to this.
SetFocus (hWnd)
endIf; get window class
Else
;process normal functionalities wile focus stands at main window. This mean user can add the same hotkeys of vst for any options they prefer.
;SayString("vst") ; debug
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
endIf ;Dialog active
EndFunction

Script VSTPreset ()
;Set focus to the preset control if present
ProcessVST (ID_Preset)
EndScript

Script VSTLoadPreset ()
;Activates the load preset button
ProcessVST (ID_Load_Preset)
EndScript

Script VSTSavePreset ()
;Save current VST settings as a preset
ProcessVST (ID_Save_Preset)
EndScript

Script SayJump ()
;For use by short/long jumps (,, ., etc.).  sends the key, if in track panel and AnnounceOn speaks start position, otherwise speaks the key label.
;If you want a separate script for each key, turn this into a function and call it from the scripts.
var
	Handle hWnd

TypeCurrentScriptKey ()
If !UserBufferIsActive ()&&FocusInTrackPanel () && NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel ()&&AnnounceOn () && IsStopped () then
Pause ()
let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
Else
SayCurrentScriptKeyLabel ()
EndIf
EndScript

Int Function IsTrackSelected ()
;indicates current track is selected
If NoProject () then
SayUnavailable (1)
;SayNoProject ()
Return
Else
SaveCursor ()
PCCursor ()
If FocusInTrackPanel () then
Let sMessage=GetObjectName () ;get the name of track currently have focus
;if this track has selected, then its object name contain the phrase "Select On", so now I varify that
Let sMessage=StringSegment (sMessage, " ", -2) +" " ;extract the word "Select" in track name
+ StringSegment (sMessage, " ", -1) ;extract the word "on" in track name
If sMessage=="Select On" then ;the track is currently selected
Return true
EndIf ;sMessage
EndIf ;FocusInTrackPanel
RestoreCursor ()
EndIf ;No project
EndFunction

/*
Void Function SayNoTrackSelected ()
;Just announce that current track has not selected
If !NoProject () then ;this just announce when a project exists
Say (msgNoTrackSelected, OT_error)
EndIf ;No project
EndFunction
*/

Int Function SayUnavailable (int iMessage)
;This replace function SayNoProject, and SayNoTrackSelected.
If iMessage==1 then ;alerts with no project open.
SayFormattedMessage (OT_error, msgNoProject_l, msgNoProject_s)
ElIf iMessage==2 &&!NoProject () then ;Alerts with a project open, and no track selected
Say (msgNoTrackSelected, OT_error)
EndIf
EndFunction

Int Function IsWarningDialog ()
;Varify that focus at the warning dialog of importing uncompress audio.
If DialogActive ()
&&GetWindowName (GetFocus ())==MsgCopy
||GetWindowName (GetFocus ())==MSGDirectEdit
||GetWindowName (GetFocus ())==MSGDoNotWarn then
;SayWindowTypeAndText (GetFocus ())
Return TRUE
EndIf ;dialog active	
EndFunction

Script SayLine ()
If IsWarningDialog () then ;Just varify that users are importing uncompress audio, and they want to here the choice in warning dialog by pressing JawsKey+up arrow
SayWindowTypeAndText (GetFocus ())
Else
; Not at this dialog, performs normal funtionality
PerformScript SayLine()
EndIf
EndScript
