; JAWS script for Audacity multitrack sound editor V2.0.0 (http://audacity.sourceforge.net).

; Modifications:
; 5/16/12 Converted to work with Audacity 2.0.0 and JAWS 10.0.1178u.
; Added JAWS and Audacity hotkey help.  When pressed twice quickly these run the default JAWS commands.
; SayActiveCursor now says the value of the Audio Position field when in the main window and the PC cursor is active, press twice quickly for cursor position.
; Added ScriptFileName.
; Put messages and string constants in audacity.jsm.
; Added script version string which appears in JAWS hot key help, version is 1.0 5/16/12.
; 5/12/07 Broke code to get value of a selection position field into a separate function GetPositionField().  Added script SaySelectionEnd().

Include "hjconst.jsh"
Include "hjglobal.jsh"
Include "common.jsm"
Include "audacity.jsm"

Const CS_SCRIPT_VERSION = "1.0 5/16/12"

Const
	ID_SELECTION_START = 2705,
	ID_SELECTION_END = 2706,   ; selection end or selection length
	;ID_AUDIO_POSITION = -232, ; value changes, it is the 2nd window after _END.
	ID_END_RADIO = 2704,
	ID_LENGTH_RADIO = 2703

Int Function IsMainWindow()
Var
	Handle hFocus,
	Handle hWnd
	
Let hFocus = GetFocus()
If (GetWindowName(hFocus) == WN_TRACKPANEL || GetWindowName(GetParent(GetParent(hFocus))) == WN_TOOLDOCK) Then 
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

Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
If (IsSameScript()) Then
	SetFocus(hWnd)
	Return
EndIf

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

EndScript

Script SayActiveCursor()
; Say audio position field if PC cursor is on, or perform the normal function if pressed twice quickly.
Var
	Handle hWnd,
	String sValue
If (Not IsMainWindow() || IsSameScript() || Not IsPCCursor()) Then
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

If (!IsSameScript() && IsMainWindow())
Then
	SayFormattedMessage(OT_USER_BUFFER, FormatString(msgHotKeyHelp, CS_SCRIPT_VERSION))
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


