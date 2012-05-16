; Modifications:
; 5/12/07 Broke code to get value of a selection position field into a separate function GetPositionField().  Added script SaySelectionEnd().

Include "hjconst.jsh"
Include "hjglobal.jsh"
Include "common.jsm"

Const
	ID_SELECTION_START = 2704,
	ID_SELECTION_END = 2705,   ; selection end or selection length
	ID_END_RADIO = 2703,
	ID_LENGTH_RADIO = 2702


String Function GetPositionField (handle hWnd)
Var
	String s,
	String sValue,
	Int i,
Int j

SaveCursor()
InvisibleCursor()
MoveToWindow (hWnd)
Pause()
Let s = GetObjectValue ()
RestoreCursor()

; Don't say leading parts if they are 0.
Let i = 1
If (StringSegment (s, cscSpace, i) == "00") Then
	Let i = 3   ; point to Minutes
	If (StringSegment (s, cscSpace, i) == "00") Then
		Let i = 5   ; point to seconds
	EndIf   ; Minutes are 0
EndIf   ; hour is 0

Let sValue = cscNull
While (i <= StringSegmentCount (s, cscSpace))
	; Copy end of string
	Let sValue = sValue + StringSegment(s, cscSpace, i)
	Let i = i + 1
EndWhile

Return sValue
EndFunction

Script SaySelectionStart ()

Var
	Handle hWnd,
	String sName,
	String sValue

Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)

Let sValue = GetPositionField(hWnd)
SayMessage (OT_NO_DISABLE, sValue, sValue)

EndScript


Script SaySelectionEnd ()

Var
	Handle hWnd,
	String sName,
	String sValue,
	Int bIsSelected

Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_END_RADIO)
SaveCursor()
InvisibleCursor()
MoveToWindow (hWnd)
Pause()
Let bIsSelected = ControlIsChecked ()
RestoreCursor()

If (Not bIsSelected) Then
	Let hWnd = GetNextWindow (hWnd)
EndIf

Let sName = GetWindowName (hWnd)

Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)

Let sValue = GetPositionField(hWnd)
SayMessage (OT_NO_DISABLE, sName + sValue, sValue)

EndScript
