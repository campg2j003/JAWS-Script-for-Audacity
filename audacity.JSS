; JAWS script for Audacity multitrack sound editor V2.0.1.0 (http://audacity.sourceforge.net).
;Original author: Gary Campbell
;Modified: Dang Manh Cuong
; Modifications:
;Cuong's modifications:
;8/10/2012 wrote function and script to turn off announce messages.
;8/2/2012 remove function NoProjectOpen. (This exits my script when working with unsave project, so I remove it at this time. It still exists in this source code)
;8/1/2012 created function to prevent Jaws to speaks unwanted message when user presses default hotkey, such as Jaws home, Jaws end...
;Jaws now speaks the text in warning dialog while import uncompress audio file
;7/31/2012 modified some spoken message and documentation
;Modified the scripts SaySelectionStart and SaySelectionEnd to make it work in main window or a project open only
;Created function for saying start and end selection position when user presses default hotkeys
;SayactiveCursor now performs its default hotkey when no project open
;7/28/2012 Added code to make the script be able to recompile on earlier version of Jaws 13.0
;7/23/2012 wrote functions MouseMovement, and CursorMovement to use in scripts has same condition, but perform different scripts at the end. This method will make the source smaller.
;7/19/2012: created alert messages when user copy, cut or deselect all audio, or close current track.
;7/16/2012: modify the scripts of adjusting gains and pans. User can perform the default hotkeys by turning Jaws cursor on.
;Added alert message when navigate by modifying scripts: JawsHome, JawsEnd, and wrote code to activate some default script folow by announcing message
;Modify the JawsDelete script to announce message when user delete the selected of audio
;Created some spoken message
;7/15/2012: wrote functions to check if no project open.
;Created dictionary file for some mispronounces words.
;Modified the hotkey help script. The hotkey now display at a link.
;7/13/2012: created spoken message when user move the start, end selection to the left or right by a small amount 
;7/12/2012: added announce message for start and end selection
;7/11/2012: added new hotkeys to the script hotkey help.
;Added function AutoStartEvent to verify this script active
;7/2/2012:
; Added function handle custom windows
;wrote scripts of adjusting gain and pand
;Added hot key Jawskey+Shift+s to toggle mude synthersizer in some cases.
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
;The next line make the script compile on Jaws 13.0 to be compatible on earlier version.
;#pragma StringComparison partial
Const CS_SCRIPT_VERSION = "1.1 8/10/12"

Const
	ID_SELECTION_START = 2705,
	ID_SELECTION_END = 2706,   ; selection end or selection length
	;ID_AUDIO_POSITION = -232, ; value changes, it is the 2nd window after _END.
	ID_END_RADIO = 2704,
	ID_LENGTH_RADIO = 2703,
StrToolbars="Toolbars",
StrSelectionBar="Selection bars",
StrTrackPanel="Track panel",
IniFile="Audacity.Ini"

Globals
Int App_FirstTime, String sMessage, String sScriptName

Int Function AnnounceOn ()
;varify that user choose to turn off the announce message in some scripts
Var
Int iAnnounce
Let iAnnounce=IniReadInteger ("Settings", "Announce", 0, IniFile)
If iAnnounce==1 then
Return true
EndIf
EndFunction

Int Function WrongFocus ()
;This function varify that user focus at the selection bar or toolbar window, an prevent Jaws to speak some unwanted message, such as move to start of track etc. I named it "WrongFocus"
;I use style bit to varify that
Var
Int Style, String sFrame
Let Style=GetWindowStyleBits (GetFocus ())
Let sFrame=GetFrameNameAtCursor ()
If Style==0x52010000
||Style==0x50030004
||Style==0x50000380
||Style==0x50010222 then
Return true
EndIf
EndFunction

Void Function SaySelectionPosition (handle hPosition, string sKey, string sMessage)
;This function now folow the method of saying selection start and end position, from Gary Campbell
Var
Handle wnd, ;the window contain the selection bar
 String sValue ;the value should be get
let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), hPosition)
Let sValue=GetPositionField (wnd) ;move to the window contain the selection bar
/*
If NoProject () then
Return
SayNoProject ()
ElIf IsMainWindow () then
*/
If IsMainWindow ()&&AnnounceOn () then
TypeCurrentScriptKey ()
Pause () ;Wait if any dialog appear, does not say anything
If !DialogActive () then
Pause ()
SayFormattedMessage (OT_Position, sMessage, sMessage)
SayFormattedMessage (OT_Position, sValue, sValue)
Else
TypeKey (SKey)
EndIf
EndIf
EndFunction

Void Function MarkerMovement (string sScript, string sAlert)
;Use for marker scripts, such as move start selection to the left by small amount
;First, check to make sure we have a project open
/*
If NoProject () then
Return
SayNoProject ()
*/
If IsMainWindow ()&&!UserBufferIsActive ()&&!WrongFocus () then
TypeCurrentScriptKey ()
If AnnounceOn () then
SayFormattedMessage (OT_Cursor, sAlert) ;The alert depend on each script
EndIf
Else
;Perform the specify script at a variable. This method suggested by Dug Lee
  formatStringWithEmbeddedFunctions("<$" +sScript +">") ;instead of PerformScript method. 
EndIf
EndFunction

Void Function MouseMovement (string sScript)
;Use to replace the scripts mouse left, mouse right etc
If IsMainWindow () 
&& !IsJAWSCursor () then ;focus at the main window, and the Jaws cursor is not active
TypeCurrentScriptKey () ;The default hotkey of adjusting gain
;otherwise, perform the default Jaws script
Else
  formatStringWithEmbeddedFunctions("<$" +sScript +">")
EndIf
EndFunction

Void Function AnnounceMessage (string Message, string Key)
;This just speaks an alert message when user press some default Audacity's hotkey, such as j or Shift J
;If IsMainWindow () &&!NoProject ()&&! UserBufferIsActive ()&&!WrongFocus () then
If IsMainWindow () &&! UserBufferIsActive ()&&!WrongFocus () then
If AnnounceOn () then
SayUsingVoice (VCTX_Message, Message, OT_status) ;the alert message declare here
EndIf
TypeCurrentScriptKey ()
Else
TypeString (Key)
EndIf
EndFunction
/*
Void Function SayNoProject ()
;If no project open, we'll call this function to speaks an alert
SayFormattedMessage (OT_error, msgNoProject_l, msgNoProject_s)
EndFunction

Int Function NoProject ()
;return true if no project open
;This is a feature from GoldWave scripts
;This just a testing perfect function
;This have a very big confution when working with unsave project, so I remove it untill I find the way to fix. it.
If IsMainWindow () then
If GetWindowName (GetRealWindow (GetFocus ()))== msgProgName 
&& GetColorText ()==000000000 
return true
Else
Return False
EndIf
EndFunction
*/

Function AutoStartEvent ()
If !App_FirstTime then
Let App_FirstTime=1
SayFormattedMessage (OT_No_Disable, MSG_App_Start)
EndIf
EndFunction

Int Function HandleCustomWindows ()
/*
If NoProject () then
SayNoProject ()
ElIf  GetControlID (GetCurrentWindow ())==ID_END_RADIO
*/
If  GetControlID (GetCurrentWindow ())==ID_END_RADIO
||GetControlID (GetCurrentWindow ())==ID_LENGTH_RADIO then ;Focus at the selection bar
Say (StrSelectionBar, OT_position)
ElIf GetWindowName (GetCurrentWindow ())==WN_TRACKPANEL then ;Focus at the track panel
Say (StrTrackPanel, OT_Position)
EndIf
EndFunction

Int Function IsMainWindow()
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

/*SaveCursor()
InvisibleCursor()
MoveToWindow (hWnd)
Pause()
Let s = GetObjectValue ()
RestoreCursor()
*/
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
;I modify this script to make it works on open project only
/*
If NoProject () then
Return
SayNoProject ()
Else
*/
Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
If (IsSameScript()) Then
	SetFocus(hWnd)
	Return
EndIf
;EndIf
Let sValue = GetPositionField(hWnd)
SayMessage (OT_NO_DISABLE, sValue, sValue)

EndScript


Script SaySelectionEnd ()

Var
	Handle hRadio,
	Handle hEnd, ; handle of the edit control
	String sName,
	String sValue,
	Int bIsSelected
/*
If NoProject () then
Return
SayNoProject ()
Else
*/
Let hEnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
If (IsSameScript()) Then
	SetFocus(hEnd)
	Return
EndIf

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
SayMessage (OT_NO_DISABLE, sName + sValue, sValue)
;EndIf
EndScript

Script SayActiveCursor()
; Say audio position field if PC cursor is on, or perform the normal function if pressed twice quickly.
Var
	Handle hWnd,
	String sValue
If (Not IsMainWindow() || IsSameScript() || Not IsPCCursor())||NoProject () Then
	PerformScript SayActiveCursor()
	Return
EndIf
Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
Let hWnd = GetNextWindow(GetNextWindow(hWnd))
Let sValue = GetPositionField(hWnd)
SayMessage (OT_NO_DISABLE, sValue, sValue)

EndScript

Script  ScriptFileName()
ScriptAndAppNames(msgProgName)
EndScript

Script HotkeyHelp ()
If UserBufferIsActive () then
UserBufferDeactivate ()
EndIf
If (!IsSameScript() && IsMainWindow()) Then
Let sMessage=FormatString (MSGScript_Ver, CS_SCRIPT_VERSION)
SayFormattedMessage (OT_User_buffer, sMessage)
SayFormattedMessage (OT_User_Buffer, MSGHotkeyHelp)
Else
	PerformScript HotKeyHelp()
EndIf
EndScript

Script WindowKeysHelp ()

If (!IsSameScript() && IsMainWindow())
Then
	SayFormattedMessage(OT_USER_BUFFER, msgAudacityHotKeyHelp)
Else
	PerformScript WindowKeysHelp()
EndIf
EndScript

;These scripts replace the default Jaws' script, such as mouse up, mouse down etc, but user still activate it by turning on Jaws cursor first
Script MouseUp ()
Let sScriptName="MouseUp" ;Perform script MouseUp at a variable
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

;The scripts below just speak an alert message when user pressing default Audacity's hotkeys
Script SelectionStart ()
;Say selection start position at the time user press the brakets key
SaySelectionPosition (ID_SELECTION_START, "[", "Selection Start")
EndScript

Script SelectionEnd ()
;Say selection end position
SaySelectionPosition (ID_SELECTION_END, "]", "Selection end")
EndScript

Script FinishMarkerRight ()
;move the end of the selection to the right by a small amount
Let sMessage=FormatString (MSGMoveSelection, "End", "Right")
Let sScriptName="SelectNextCharacter" ;The default script to perform if not in main window
MarkerMovement (sScriptName, sMessage)
EndScript

Script FinishMarkerLeft ()
Let sMessage=FormatString (MSGMoveSelection, "End", "Left")
Let sScriptName="SelectPriorWord"
MarkerMovement (sScriptName, sMessage)
EndScript

Script StartMarkerRight ()
Let sMessage=FormatString (MSGMoveSelection, "Start", "Right")
Let sScriptName="SelectNextWord"
MarkerMovement (sScriptName, sMessage)
EndScript

Script StartMarkerLeft ()
Let sMessage=FormatString (MSGMoveSelection, "Start", "Left")
Let sScriptName="SelectPriorCharacter"
MarkerMovement (sScriptName, sMessage)
EndScript

Script JawsHome ()
PerformScript JAWSHome()
;If IsMainWindow () &&IsPCCursor () &&!WrongFocus () &&!NoProject () &&!UserBufferIsActive () then
If IsMainWindow () &&IsPCCursor () &&!WrongFocus () &&!UserBufferIsActive ()&&AnnounceOn () then
SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, "Start", "track"))
EndIf
EndScript

Script JawsEnd ()
PerformScript JAWSEnd()
;If IsMainWindow () &&IsPCCursor ()&&!WrongFocus ()&&!NoProject ()&&!UserBufferIsActive () then
If IsMainWindow () &&IsPCCursor () &&!WrongFocus () &&!UserBufferIsActive ()&&AnnounceOn () then
SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, "End", "all audio"))
EndIf
EndScript

Script MoveToStartOfSelectedTracks ()
AnnounceMessage (FormatString (MSGMoveTo, "Start", "Selected Tracks"), "j")
EndScript

Script MoveToEndOfSelectedTracks ()
AnnounceMessage (FormatString (MSGMoveTo, "End", "Selected Tracks"), "k")
EndScript

Script SelectToBeginning ()
AnnounceMessage (FormatString (MSGSelectedTo, "Start"), "J")
EndScript

Script SelectToEnd ()
AnnounceMessage (FormatString (MSGSelectedTo, "End"), "K")
EndScript

Script SelectFromStartOfLine ()
;Select from current position to the start of file by pressing shift+ home
;If IsMainWindow () &&IsPCCursor ()&&!WrongFocus ()&&!NoProject ()&&!UserBufferIsActive () then
If IsMainWindow () &&IsPCCursor ()&&!WrongFocus ()&&!UserBufferIsActive () then
SelectFromStartOfLine ()
If AnnounceOn () then ;User be able to turn of this announce message
SayFormattedMessage (OT_No_Disable, MSGStartOfFile) ;alerts when user activates this script at the main window, and a project opening
EndIf
;Otherwise, perform default script
Else
PerformScript SelectFromStartOfLine()
EndIf
EndScript

Script SelectToEndOfLine ()
;Select from current position to the end of file
;
;If IsMainWindow () &&IsPCCursor ()&&!WrongFocus ()&&!NoProject ()&&!UserBufferIsActive () then
If IsMainWindow () &&IsPCCursor ()&&!WrongFocus ()&&!UserBufferIsActive () then
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
/*
If NoProject () then
Return
SayNoProject ()
EndIf
*/
If IsMainWindow () &&!WrongFocus ()then
TypeCurrentScriptKey ()
If AnnounceOn () then
SayFormattedMessage (OT_Jaws_Message, MSGDelete_l, MSGDelete_s)
EndIf
EndIf
EndScript

Script JawsDelete ()
;If focus at the main windows, a project exists, and currently selected all or a part of sound, the del key will delete it. So I add a condition to perform the script DeleteSelectedAudio
;If IsMainWindow () &&!NoProject ()&&!WrongFocus () then
If IsMainWindow ()&& !WrongFocus () then
PerformScript DeleteSelectedAudio()
Else
PerformScript JAWSDelete()
EndIf
EndScript

Script JawsBackspace ()
;This script use in the same case of the Jaws delete script
;If IsMainWindow () &&!NoProject () &&!WrongFocus () then
If IsMainWindow () &&!WrongFocus () then
PerformScript DeleteSelectedAudio()
Else
PerformScript JAWSBackspace()
EndIf
EndScript

Script Copy ()
;Copy selected sound to clipboard if exists
/*
If NoProject () then
return
SayNoProject ()
ElIf IsMainWindow ()
*/
If IsMainWindow ()
&&!UserBufferIsActive ()&&!WrongFocus () then ;this second condition make the default script actives in vertual viewer
AnnounceMessage ("Copy selected sound to clipboard", CksCopy)
Else
;If no project open, or focus at other windows, perform the default script
PerformScript CopySelectedTextToClipboard()
EndIf
EndScript

Script CutToClipboard ()
/*
If NoProject () then
return
SayNoProject ()
ElIf IsMainWindow () then
*/
If IsMainWindow () then
AnnounceMessage ("cut selected sound to clipboard", CksCut)
Else
PerformScript CutToClipboard()
EndIf
EndScript

Script DeselectAll ()
;Unselect all audio
/*
If NoProject () then
Return
SayNoProject ()
ElIf IsMainWindow () then
*/
If IsMainWindow () then
AnnounceMessage ("Deselect all", "Control+Shift+a")
EndIf
EndScript

Script CloseFocusTrack ()
/*
If NoProject () then
Return
SayNoProject ()
ElIf IsMainWindow () then
*/
If IsMainWindow () then
AnnounceMessage ("Close focus track", "Shift+C")
Else
TypeString ("C")
EndIf
EndScript

Script AudacitySayFrame ()
;When import uncompress audio file, if a warning dialog appear, Jaws does not read its options clearly. However, we can read it using Jaws or invisible cursor.
;I created a frame on each options in this dialog, and write this script for Jaws to read it.
SaveCursor ()
InvisibleCursor ()
RouteInvisibleToPc ()
Say (GetLine (), OT_No_Disable)
Pause ()
RestoreCursor ()
EndScript

Script AnnounceOnOff ()
If AnnounceOn () then
Let sMessage="Announce messages off"
IniWriteInteger ("Settings", "Announce", 0, IniFile)
Else
Let sMessage="Announce messages on"
IniWriteInteger ("Settings", "Announce", 1, IniFile)
EndIf
Say (sMessage, ot_Status)
EndScript
