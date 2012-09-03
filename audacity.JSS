; JAWS script for Audacity multitrack sound editor V2.0.1.0 (http://audacity.sourceforge.net).
;Original author: Gary Campbell
;Modified: Dang Manh Cuong
;Modifications:
;9/3/12 by Dang Manh Cuong
;Modified function SaySelection Position to make sure the selection toolbar must be turned on.
;rewrote funtion AddDefaultConfig. This function now be able to use to reset script's settings to default.
;Wrote script of resetting script config to default, added its hotkey to the script hotkey help.
; modified the function AutoStartEvent to write default settings if does not exists the config file.
;9/2/12 by Dang Manh Cuong
;Modify the AdjustJawsOptions script to make it work with Jaws 9.0 or later.
;Added function "AddDefaultConfig" to store default Audacity settings for the first time. This called on AutoStartEvent function.
;Remove unused code in FocusInTrackPanel function.
;Rewrote NoProject function.
;Added condition to varify that the selection toolbar is turned on or not
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
;Created dictionary file for some mispronounced words (usually appear in Prefernces dialogs synce Audacity 2.2.1).
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

Const CS_SCRIPT_VERSION = "1.1 9/3/12"

Const
	ID_SELECTION_START = 2705,
	ID_SELECTION_END = 2706,   ; selection end or selection length
	;ID_AUDIO_POSITION = -232, ; value changes, it is the 2nd window after _END.
	ID_END_RADIO = 2704,
	ID_LENGTH_RADIO = 2703,
	WC_wxWindowClass = "wxWindowClass", ; grabber control on toolbars
	IniFile="Audacity.jsi",
	;For user options.
	CI_MESSAGES_OFF = 0,
	CI_MESSAGES_FULL = 1, ; announce all messages
	CI_TOOLBARS_OFF = 0,
	CI_TOOLBARS_ON = 1 ; announce all toolbars

Globals
Int App_FirstTime, String sMessage, String sScriptName

Int Function AnnounceOn ()
;Indicate whether messages related to certain Audacity operations should be spoken.  Return True if messages should be spoken.
Var
Int iAnnounce
Let iAnnounce=IniReadInteger ("Settings", "Announce", 0, IniFile)
If iAnnounce==1 then
Return true
EndIf
EndFunction

Int Function AnnounceToolbarsOn ()
;Indicate whether messages related to changing toolbars should be spoken.  Return True if messages should be spoken.
Var
Int iAnnounce
Let iAnnounce=IniReadInteger ("Settings", "AnnounceToolbars", 0, IniFile)
If iAnnounce==1 then
Return true
EndIf
EndFunction ; AnnounceToolbarsOn

Int Function FocusInTrackPanel ()
;This function indicates that user focus is at the selection bar or toolbar window to prevent Jaws from speaking some unwanted messages, such as move to start of track etc./*
Return (FocusInMainWindow () && GetWindowName(GetFocus()) == WN_TRACKPANEL )
EndFunction ; FocusInTrackPanel

Void Function SaySelectionPosition (Int iPosition, string sKey, string sMessage)
;This function now follows the method of saying selection start and end position, from Gary Campbell
Var
Handle wnd, ;the window containing the selection bar
String sValue ;the selection field value 
If NoProject () then
Return
SayNoProject ()
ElIf FocusInMainWindow () then
TypeCurrentScriptKey ()
;If FocusInMainWindow () then
Pause () ;Wait for any dialog to appear, does not say anything
If !DialogActive () then
Pause ()
let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iPosition)
;If user turn on the announce options, speak the selection posision
If AnnounceOn () Then
Let sValue=GetPositionField (wnd) ;get value of desired control
If !sValue then ;the selection toolbar is turn off
Say (MSGNoSelection, OT_Error)
Else
SayFormattedMessage (OT_Position, sMessage, sMessage)
SayFormattedMessage (OT_Position, sValue, sValue)
EndIf ;say selection position
EndIf ; AnnounceOn
Else ;  DialogActive
;So you press [ while stopped, it sends [ to Audacity, and a dialog opens.  Why do we want to send a key??
;TypeKey (SKey)
EndIf ; else DialogActive
EndIf ; If FocusInMainWindow
EndFunction ; SaySelectionPosition

Void Function MarkerMovement (string sScript, string sAlert)
;Used for marker scripts, such as move start of selection to the left by a small amount
;First, check to make sure we have a project open
If NoProject () then
Return
SayNoProject ()
ElIf FocusInMainWindow ()&&!UserBufferIsActive ()&&FocusInTrackPanel () then
TypeCurrentScriptKey ()
If AnnounceOn () then
SayFormattedMessage (OT_Cursor, sAlert) ;The alert depends on each script
EndIf
Else
;Not main window, perform the specified script, passed as a variable. This method suggested by Dug Lee
  formatStringWithEmbeddedFunctions("<$" +sScript +">") ;instead of PerformScript method. 
EndIf
EndFunction

Void Function MouseMovement (string sScript)
;Used to bypass scripts such as mouse left, mouse right etc. that are assigned to Audacity keys while in the main window.
; Script - name of JAWS script to be executed when not in the Audacity main window.
If FocusInMainWindow () 
&& !IsJAWSCursor () then ;focus at the main window, and the Jaws cursor is not active
TypeCurrentScriptKey () ;Audacity hotkey for adjusting gain
;otherwise, perform the default Jaws script
Else
  formatStringWithEmbeddedFunctions("<$" +sScript +">")
EndIf
EndFunction

Void Function AnnounceMessage (string Message, string sKey)
;This speaks an alert message when the user presses some Audacity hotkeys, such as j or Shift J when appropriate, and passes the key to Audacity.
; Message - message to be spoken.
; sKey - key to be executed when not performing the Audacity function.
If FocusInMainWindow () &&!NoProject ()&&! UserBufferIsActive ()&&FocusInTrackPanel () then
;If FocusInMainWindow () &&! UserBufferIsActive ()&&FocusInTrackPanel () then
If AnnounceOn () then
SayUsingVoice (VCTX_Message, Message, OT_status) ;the alert message declare here
EndIf ; if AnnounceOn
TypeCurrentScriptKey ()
Else
;not main window, etc.
TypeString (sKey)
EndIf ; else not main window, etc.
EndFunction

Void Function SayNoProject ()
;If no project is open, speak an alert message.
SayFormattedMessage (OT_error, msgNoProject_l, msgNoProject_s)
EndFunction

Int Function NoProject ()
;return true if no project is open.
;This is a feature from GoldWave scripts.
;This just a testing perfect function
If FocusInMainWindow () then
If GetObjectSubTypeCode (true, 0)==WT_Table then ;we have no project open
return true
Else
Return False
EndIf
EndIf
EndFunction

Function AutoStartEvent ()
If !App_FirstTime then
Let App_FirstTime=1
SayFormattedMessage (OT_No_Disable, MSG_App_Start)
EndIf ; if first time
;write default settings of Audacity script if not exists.
If !FileExists (FindJAWSPersonalizedSettingsFile (IniFile, true)) then
AddDefaultConfig ()
EndIf
EndFunction

Globals handle ghAudacityLastArea,
	Handle ghAudacityLastToolbar


Int Function HandleCustomWindows ()
;Announce when focus changes to a different area of the main window.
Var handle hParent,
	Handle hFocus,
	Handle hOld,
	Handle hToolbar

If !FocusInMainWindow() Then
	Return HandleCustomWindows () ; not main window, continue with normal processing
EndIf
Let hFocus = GetFocus ()
Let hParent = GetParent(hFocus)
If GetWindowName(hFocus) != WN_TRACKPANEL Then
Let hParent = GetParent(hParent)
EndIf ; if not track panel
; If hFocus is the track panel, hParent is its parent.  Otherwise it is the grandparent of hFocus.
Let hOld = ghAudacityLastArea
If hParent != hOld Then
Let ghAudacityLastArea = hParent ; new area.
; We could use FocusInTrackPanel here but we've already tested most of its conditions.
If GetWindowName(hFocus) == WN_TRACKPANEL Then
Say (StrTrackPanel, OT_Position)
Return False
EndIf ; if track panel
; We could also identify the selection by testing for WindowHierarchyX = 3.
If GetWindowName(GetFirstChild(hParent)) == WN_SELECTION Then
Say (StrSelectionBar, OT_position)
Else
Say (StrToolBars, OT_position)
EndIf ; else toolbar
EndIf ; new area

If IsToolbar(GetToolbar ()) Then
Let hToolbar = GetToolbar()
If hToolbar != ghAudacityLastToolbar Then
Let ghAudacityLastToolbar = hToolbar
If AnnounceToolbarsOn () Then
Say(GetWindowName(hToolbar), OT_CONTROL_GROUP_NAME)
EndIf
EndIf ; new toolbar
EndIf ; If IsToolbar
;Speaks an alert when no project open
If NoProject () &&AnnounceOn () then
SayNoProject ()
EndIf
Return HandleCustomWindows () ; allow others to process
EndFunction ; HandleCustomWindows

Void Function SayFocusedObject ()
If FocusInTrackPanel () Then
SayObjectActiveItem ()
Else
SayFocusedObject ()
EndIf
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
EndIf ; no parent
If GetWindowName(hParent) == WN_TOOLDOCK && GetWindowHierarchyX(hParent) == 2 Then
Return True
EndIf
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
EndIf
Return False
EndFunction

String Function GetPositionField (handle hWnd)
Var
	String s,
	String s1,
	String s2,
	String sValue,
	Int i,
Int j

Let s = GetWindowText(hWnd, 0)
; A position can be in several formats, such as "0 0  h 0 0  m 0 0 .0 0 0  s " or "0 0 0 ,0 0 0  seconds ".
Let s2 = s
If (StringContains(s2, ",")) Then
	Let s1 = "0 0 0 ,0 0"
Else
	Let s1 = "0 0  h 0 0  m 0 0 .0 0" ; we strip as much of this as matches off the front, we don't match the last 0 so it will say something.
EndIf
; Return is in s1 and s2, passed by reference!!!
StringTrimCommon(s1, s2, 1)
; What we want is in s2.
Let sValue = s2
; Don't say leading parts if they are 0.

Return sValue
EndFunction

Script SaySelectionStart ()

Var
	Handle hWnd,
	String sName,
	String sValue
;I modified this script to make it work on open project only.
If NoProject () then
Return ;exit this script when no project open
SayNoProject ()
Else
Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
If (IsSameScript()) Then
	SetFocus(hWnd)
	Return
EndIf ;if IsSameScript
EndIf ; Else not NoProject()
Let sValue = GetPositionField(hWnd)
If! sValue then ;some time user turn off the selection toolbar, so this condition varify the selection boolbar is turned on or not
Say (msgNoSelection, ot_error)
Else
SayMessage (OT_NO_DISABLE, sValue, sValue)
EndIf
EndScript


Script SaySelectionEnd ()

Var
	Handle hRadio,
	Handle hEnd, ; handle of the edit control
	String sName,
	String sValue,
	Int bIsSelected
If NoProject () then
Return
SayNoProject ()
Else ; project open
Let hEnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
If (IsSameScript()) Then
	SetFocus(hEnd)
	Return
EndIf ; if IsSameScriqt

Let hRadio = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_END_RADIO)
SaveCursor()
InvisibleCursor()
MoveToWindow (hRadio)
Pause()
Let bIsSelected = ControlIsChecked ()
RestoreCursor()

If (Not bIsSelected) Then
	Let hRadio = GetNextWindow (hRadio)
EndIf

Let sName = GetWindowName (hRadio)

Let sValue = GetPositionField(hEnd)
If !sValue then
Say (msgNoSelection, ot_error)
Else
SayMessage (OT_NO_DISABLE, sName + sValue, sValue)
EndIf
EndIf ; else project open
EndScript

Script SayActiveCursor()
; Say audio position field if PC cursor is on, or perform the normal function if pressed twice quickly.
Var
	Handle hWnd,
	String sValue
;If (Not FocusInMainWindow() || IsSameScript() || Not IsPCCursor())||NoProject () Then
If (Not FocusInMainWindow() || IsSameScript() || Not IsPCCursor() || UserBufferIsActive ())||NoProject () Then
	PerformScript SayActiveCursor()
	Return
EndIf
Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
Let hWnd = GetNextWindow(GetNextWindow(hWnd))
Let sValue = GetPositionField(hWnd)
If !sValue then
Say (msgNoSelection, ot_error)
Else
SayMessage (OT_NO_DISABLE, sValue, sValue)
EndIf
EndScript

Script  ScriptFileName()
ScriptAndAppNames(msgProgName)
EndScript

Script HotkeyHelp ()
If UserBufferIsActive () then
UserBufferDeactivate ()
EndIf
If (!IsSameScript() && FocusInMainWindow()) Then
Let sMessage=FormatString (MSGScript_Ver, CS_SCRIPT_VERSION)
SayFormattedMessage (OT_User_buffer, sMessage)
SayFormattedMessage (OT_User_Buffer, MSGHotkeyHelp)
Else
	PerformScript HotKeyHelp()
EndIf
EndScript

Script WindowKeysHelp ()

If (!IsSameScript() && FocusInMainWindow())
Then
	SayFormattedMessage(OT_USER_BUFFER, msgAudacityHotKeyHelp)
Else
	PerformScript WindowKeysHelp()
EndIf
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

;The scripts below just speak an alert message when user presses default Audacity hotkeys when they are active.
Script SelectionStart ()
;Say selection start position at the time user press the left braket key.
SaySelectionPosition (ID_SELECTION_START, "[", "Selection Start")
EndScript

Script SelectionEnd ()
;Say selection end position
SaySelectionPosition (ID_SELECTION_END, "]", "Selection end")
EndScript

Script FinishMarkerRight ()
;move the end of the selection to the right by a small amount.
Let sMessage=FormatString (MSGMoveSelection, msgEnd, msgRight)
Let sScriptName="SelectNextCharacter" ;The default script to perform if not in main window
MarkerMovement (sScriptName, sMessage)
EndScript

Script FinishMarkerLeft ()
Let sMessage=FormatString (MSGMoveSelection, msgEnd, msgLeft)
Let sScriptName="SelectPriorWord"
MarkerMovement (sScriptName, sMessage)
EndScript

Script StartMarkerRight ()
Let sMessage=FormatString (MSGMoveSelection, msgStart, msgRight)
Let sScriptName="SelectNextWord"
MarkerMovement (sScriptName, sMessage)
EndScript

Script StartMarkerLeft ()
Let sMessage=FormatString (MSGMoveSelection, msgStart, msgLeft)
Let sScriptName="SelectPriorCharacter"
MarkerMovement (sScriptName, sMessage)
EndScript

Script JawsHome ()
;If we are speaking an Audacity message, don't speak the key name.
;If FocusInMainWindow () &&IsPCCursor () &&FocusInTrackPanel () &&!NoProject () &&!UserBufferIsActive () then
If FocusInMainWindow () &&IsPCCursor () &&FocusInTrackPanel () &&! NoProject () &&!UserBufferIsActive ()&&AnnounceOn () then
JawsHome () ; do Home without speaking key label
If GetJFWVersion ()>=1300000 then
;Synce Jaws 12 update 1, the say formatted message function including message using place folder. So I'd like to try it.
SayFormattedMessage (OT_Position, MSGMoveTo, MSGMoveTo, MSGStart, MSGTrack)
Else
SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, msgStart, msgtrack))
EndIf
Else
PerformScript JAWSHome()
EndIf
EndScript

Script JawsEnd ()
;If we are speaking an Audacity message, don't speak the key name.
;If FocusInMainWindow () &&IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () then
If FocusInMainWindow () &&IsPCCursor () &&FocusInTrackPanel () &&! NoProject () &&!UserBufferIsActive ()&&AnnounceOn () then
JAWSEnd () ; do End without speaking key label
If GetJFWVersion ()>=1300000 then
SayFormattedMessage (OT_Position, MSGMoveTo, MSGMoveTo, MSGEnd, MSGAllAudio)
Else
SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, msgEnd, msgAllAudio))
EndIf
Else
PerformScript JAWSEnd()
EndIf
EndScript

Script MoveToStartOfSelectedTracks ()
AnnounceMessage (FormatString (MSGMoveTo, msgStart, msgSelectedTracks), "j")
EndScript

Script MoveToEndOfSelectedTracks ()
AnnounceMessage (FormatString (MSGMoveTo, msgEnd, msgSelectedTracks), "k")
EndScript

Script SelectToBeginning ()
AnnounceMessage (FormatString (MSGSelectedTo, msgStart), "J")
EndScript

Script SelectToEnd ()
AnnounceMessage (FormatString (MSGSelectedTo, msgEnd), "K")
EndScript

Script SelectFromStartOfLine ()
;Select from current position to the start of file by pressing shift+ home
;If FocusInMainWindow () &&IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () then
If FocusInMainWindow () &&IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () then
SelectFromStartOfLine ()
If AnnounceOn () then ;User can to turn off this message
SayFormattedMessage (OT_No_Disable, MSGStartOfFile) ;alerts when user activates this script at the main window, and a project is open
EndIf
;Otherwise, perform default script
Else
PerformScript SelectFromStartOfLine()
EndIf
EndScript

Script SelectToEndOfLine ()
;Select from current position to the end of file
;If FocusInMainWindow () &&IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () then
If FocusInMainWindow () &&IsPCCursor ()&&FocusInTrackPanel ()&&!UserBufferIsActive ()&&!NoProject () then
SelectToEndOfLine ()
If AnnounceOn () then
SayFormattedMessage (OT_No_Disable, MSGEndOfFile)
EndIf
Else
PerformScript SelectToEndOfLine()
EndIf
EndScript

Script DeleteSelectedAudio ()
;Alerts when user deletes selected sound
If NoProject () then
SayNoProject ()
Return
ElIf FocusInMainWindow () &&FocusInTrackPanel ()then
TypeCurrentScriptKey ()
If AnnounceOn () then
SayFormattedMessage (OT_Jaws_Message, MSGDelete_l, MSGDelete_s)
EndIf ; if AnnounceOn
Else ; not main window, etc.
; Just in case it is used somewhere else.  Actually, we could do it at the top of the script and eliminate this else.
TypeCurrentScriptKey ()
EndIf ; else not main window, etc.
EndScript

Script JawsDelete ()
;If focus is in the main window, a project exists, and audio is selected, the del key will delete it. In this case we perform the script DeleteSelectedAudio.
;If FocusInMainWindow () &&!NoProject ()&&FocusInTrackPanel () then
If FocusInMainWindow ()&& FocusInTrackPanel ()&&!NoProject () then
PerformScript DeleteSelectedAudio()
Else
PerformScript JAWSDelete()
EndIf
EndScript

Script JawsBackspace ()
;This script is similar to the JawsDelete script.
;If FocusInMainWindow () &&!NoProject () &&FocusInTrackPanel () then
If FocusInMainWindow () &&FocusInTrackPanel ()&&!NoProject () then
PerformScript DeleteSelectedAudio()
Else
PerformScript JAWSBackspace()
EndIf
EndScript

Script Copy ()
;Copy selected sound to clipboard if exists
If NoProject () then
SayNoProject ()
return
ElIf FocusInMainWindow ()
&&!UserBufferIsActive () then ;this second condition makes the default script active in virtual viewer

;If FocusInMainWindow ()
;&&!UserBufferIsActive () then ;this second condition makes the default script active in virtual viewer
TypeCurrentScriptKey ()
If AnnounceOn () then
SayUsingVoice (VCTX_Message, "Copy selected audio to clipboard", OT_status) ;the alert message declare here
EndIf ; if AnnounceOn
Else
;If no project open, or focus in other windows, perform the default script
PerformScript CopySelectedTextToClipboard()
EndIf
EndScript

Script CutToClipboard ()
If NoProject () then
return
SayNoProject ()
ElIf FocusInMainWindow ()
&&!UserBufferIsActive () then ;this second condition makes the default script active in virtual viewer
;If FocusInMainWindow ()
;&&!UserBufferIsActive () then ;this second condition makes the default script active in virtual viewer
TypeCurrentScriptKey ()
If AnnounceOn () then
SayUsingVoice (VCTX_Message, "cut selected audio to clipboard", OT_status) ;the alert message declare here
EndIf ; if AnnounceOn
AnnounceMessage ("cut selected audio to clipboard", CksCut)
Else
PerformScript CutToClipboard()
EndIf
EndScript

Script DeselectAll ()
;Unselect all audio
If NoProject () then
Return
SayNoProject ()
ElIf FocusInMainWindow ()
&&!UserBufferIsActive ()&&FocusInTrackPanel () then ;this second condition makes the default script active in virtual viewer
;If FocusInMainWindow ()
;&&!UserBufferIsActive ()&&FocusInTrackPanel () then ;this second condition makes the default script active in virtual viewer
AnnounceMessage (msgDeselectAll, "Control+Shift+a")
EndIf
EndScript

Script CloseFocusTrack ()
If NoProject () then
SayNoProject ()
Return
ElIf FocusInMainWindow ()
&&!UserBufferIsActive ()&&FocusInTrackPanel () then ;this second condition makes the default script active in virtual viewer
;If FocusInMainWindow ()
;&&!UserBufferIsActive ()&&FocusInTrackPanel () then ;this second condition makes the default script active in virtual viewer
AnnounceMessage (msgCloseFocusedTrack, "Shift+C")
Else
;TypeString ("C")
TypeCurrentScriptKey ()
EndIf
EndScript

Script AudacitySayFrame ()
;When import uncompressed audio file, if a warning dialog appears, Jaws does not read its options clearly. However, we can read it using Jaws or invisible cursor.
;I created a frame on each option in this dialog, and write this script for Jaws to read it.
;This script need improvement to work better.
SaveCursor ()
InvisibleCursor ()
RouteInvisibleToPc ()
Say (GetLine (), OT_No_Disable)
Pause ()
RestoreCursor ()
EndScript

Script AnnounceOnOff ()
Var String sMessage
/*
If AnnounceOn () then
Let sMessage=msgAnnounceOff
IniWriteInteger ("Settings", "Announce", 0, IniFile)
Else
Let sMessage=msgAnnounceOn
IniWriteInteger ("Settings", "Announce", 1, IniFile)
EndIf
*/
Let sMessage="Announce messages" + UOAnnounceMessages(0)
Say (sMessage, ot_Status)
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
EndIf ; last window
Let hWnd = GetFirstChild (hNext)
; Toolbars start with a grabber control, and some of them have static controls following the grabber.  We skip these to get to the first control.
While hWnd && ( (StringCompare(GetWindowClass(hWnd), WC_wxWindowClass) == 0) || (GetWindowSubtypeCode (hWnd) == WT_STATIC))
;SayString("class=" + GetWindowClass(hWnd) + ", subtype = " + IntToString(GetWindowSubtypeCode(hWnd))) ; debug
Let hWnd = GetNextWindow(hWnd)
EndWhile
SetFocus (hWnd)
EndIf ; else is toolbar
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
EndIf ; first window
Let hWnd = GetLastWindow(GetFirstChild (hPrior))
SetFocus (hWnd)
EndIf ; else is toolbar
EndScript ; PreviousDocumentWindow

Script SayAudacityState ()
Var
	Int iPauseState,
	Int iPlayState,
	Int iStopState,
	Int iRecordState,
	Handle hTemp,
	String sMsg

Let hTemp = GetFirstChild(GetAppMainWindow(GetFocus()))
Let hTemp = GetNextWindow(hTemp) ; parent of toolbars
Let hTemp = FindWindow (hTemp, "", WN_TRANSPORT_TOOLBAR)
If !hTemp Then
Say("Cannot find transport toolbar.  The transport toolbar must be enabled for this script to work.", OT_JAWS_MESSAGE)
Return
EndIf ; if no transport toolbar
Let hTemp = GetNextWindow(GetFirstChild(hTemp)) ; skip the grabber
Let iPauseState = GetObjectState(hTemp)
Let hTemp = GetNextWindow(hTemp)
Let iPlayState = GetObjectState(hTemp)
Let hTemp = GetNextWindow(hTemp)
Let iStopState = GetObjectState(hTemp)
Let hTemp = GetNextWindow(GetNextWindow(GetNextWindow(hTemp))) ; skip Start and End
Let iRecordState = GetObjectState(hTemp)
;SayString("Object states: pause = " + DecToHex(iPauseState) + ", play = " + DecToHex(iPLayState) + ", stop = " + DecToHex(iStopState) + ", record = " + DecToHex(iRecordState)) ; debug
If iPlayState & CTRL_PRESSED Then
Let sMsg = "play"
ElIf iRecordState & CTRL_PRESSED Then
Let sMsg = "record"
Else
Let sMsg = "stop"
EndIf
If iPauseState & CTRL_PRESSED Then
let sMsg = sMsg + " pause"
EndIf
Say(sMsg, OT_JAWS_MESSAGE)
EndScript ; SayAudacityState

Int Function GetObjectState(Handle hWnd)
;This gets the object state from an object in a window.  Assumes the object has the same name as the window name (returned by GetWindowName).  This is used to get the Pressed state of toolbar buttons.
;The returned state uses control attribute values from hjconst.jsh, not MSAASTATE values from msaaconst.jsh.
Var
	Int iState,
	Int iSubtype,
	String sName

Let sName = GetWindowName(hWnd)
GetObjectInfoByName(hWnd, sName, 1, iSubtype, iState)
Return iState
EndFunction ; GetObjectState

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
JawsVerbosityCore (strListOfOptions) ;The default AdjustJawsVerbosity available in prior Jaws 9.0. Not tested
EndIf ; JAWS 9 or >
EndScript

String Function NodeHlp (string sNodeName)
;This is the easiest way for you to create your callback help,
;for your configuration-specific options,
;if you have not specified a node, we have done so using your configuration's name.
;If you don't do this, your top-level or group node will tell your users that no help is available, although we try to be nice about it.
If StringContains (sNodeName, GetActiveConfiguration ()) then
	Return msgUO_AudacityOptionsHlp
Else
	Return NodeHlp (sNodeName);Default for all default and Virtual Cursor groups.
EndIf
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
	EndIf
	IniWriteInteger ("Settings", "Announce", iVal, IniFile)
EndIf ; if !iRetCurVal
if iVal == CI_MESSAGES_OFF then
	Return cmsg_Off
;ElIf giHTMLFrameUpdateNotification == FrameUpdateNotification_Indicate then
	;Return msgFrameUpdateNotificationSpeakFrameName
ElIf iVal == CI_MESSAGES_FULL Then
	Return cmsg_On
EndIf
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
	EndIf
	IniWriteInteger ("Settings", "Announcetoolbars", iVal, IniFile)
EndIf ; if !iRetCurVal
if iVal == CI_TOOLBARS_OFF then
	Return cmsg_Off
ElIf iVal == CI_TOOLBARS_ON Then
	Return cmsg_On
EndIf
EndFunction ; UOAnnounceToolbars

String Function UOAnnounceToolbarsHlp ()
Return msgUO_AnnounceToolbarsHlp
EndFunction ; UOAnnounceToolbarsHlp

Void Function AddDefaultConfig ()
;Added default settings value to Audacity.JSI File.
IniWriteInteger ("Settings", "Announce", 1, IniFile, true)
IniWriteInteger ("Settings", "AnnounceToolbars", 1, IniFile, true)
EndFunction

Script ResetConfig ()
;Reset all audacity Jaws script' config to default.
AddDefaultConfig ()
Say ("Reset all config to default", ot_message)
EndScript
