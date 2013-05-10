; JAWS script for Audacity multitrack sound editor V2.0.1.0 (http://audacity.sourceforge.net).
;Original author: Gary Campbell
;Modified: Dang Manh Cuong

; This constant contains the script version.  The spacing of the following line must be preserved exactly so that the installer can read the version from it.  There is exactly 1 space between const and the name, and 1 space on either side of the equals sign.
Const CS_SCRIPT_VERSION = "2.0 5/10/13 17:43UTC"

; This puts the copyright in the jsb file.
Messages
@msgCopyright
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
@@
EndMessages

;Modifications:
;5/9/13 Changed PasteFromClipboard to perform default processing if in a dialog or menu, removed cuong's test for DialogActive.  
;Issue: Should default processing for paste happen anywhere outside the track panel?  (yes) Can you paste into a time field?  select all?  cut? copy?  (They all affect the audio.)
;5/9/13 Previous saved to HG rev 121.
;4/27/13 by Dang Manh Cuong:
;Passed Ctrl+v through the Manage Curves dialog.
;4/3/13 by Gary Campbell:
;Changed version number because of changed installer files, etc.
;2/16/13 Previous saved to HG rev 117.
;2/16/13 Changed script Enter  to perform the default enter script in the user buffer.  This causes links to be run by the ENTER key.
;Changed so that Audacity hotkey help does not display a link to default JAWS hotkey help.
;The link in Audacity hotkey help now displays the default JAWS hotkey help instead of itself over again.  Changed script HotKeyHelp to AudacityHotKeyHelp and WindowKeysHelp to AudacityKeysHelp.  Added definitions for them in jkm file.
;2/15/13 Added code to make the link to the Audacity JAWS guide an active link.  Split the msgAudacityHotKeyHelp into two messages-- before and after the link.  The code is designed so that it can be modified to read the URL from the JSI file.
;2/2/13 Previous saved to HG rev 115.
;2/2/13 by Gary Campbell:
;Merged in Cuong's changes from audacity_cuong changeset:   40:532e7096944b.
;Restored editing keystrokes in Audacity hotkey help.
;2/2/13 by Dang Manh Cuong
;Updated keystrokes for audacity 2.0.3 (from audacity 2.0.3 guide)
;Modified function AnnounceOn do to testing new method given by my friend Le Van Mai
;2/1/13 Previous saved to HG rev 111.
;2/1/13 In audacity.jsm updated Audacity hotkey help to the Guide for JAWS v2.0.3.
; 1/31/13 Added Enter Pause to options list.
;1/28/13 Added EnterPause option to control whether ENTER pauses during play/record.
;1/22/13 Previous saved to HG rev 109.
; 1/22/13 Added copyright statement.  Added code to include the copyright statement in the jsb file.
; Reindented with jsstidy V0.0.7
; 1/17/13 Previous saved to HG rev 107.
; 1/16/13 Indented with jsstidy v0.0.5.  Fixed comments, removed unused code.
; 1/15/13 Previous saved to HG rev 106.
; 1/8/13 In function NoProject added test for active user buffer.
;12/31/12 Previous saved to HG rev 104.
;12/29/12 Moved modification history for last merge and before to file changehistory.txt.
;Changed version to 2.0rc.
;Updated README and What's new.
;Moved script version constant to the top of the script.
;12/29/12 Previous saved to HG rev 103.
;12/29/12 Changed the name of SwichPane to SwitchChainsList in jkm, jsd, jsm.
;12/28/12 The link for displaying default JAWS hotkeys in Hotkey Help works from the links list (JAWSKey+F7) in the virtual viewer.
;In JAWS 10 when the link is activated from the text in the virtual viewer, it redisplays the Audacity hot keys list.  This is the same behavior as seen in Outlook for Office 2003.
;12/26/12 Removed "to close" line from hotkey help.  Added call to AddHotkeyLinks (defined in default.jss) to a link to display default JAWS hotkeys.  There is also commented out code to add the link and clos message in case AddHotkeyLinks doesn't work.
;12/23/12 In ProcessVST does not turn speech on if it was previously off.  Added pause after setting focus so that button is not spoken.
;In SwichPane changed so that focus is placed on chains list if focus is on any control in the dialog except the chains list.
;12/23/12 Previous saved to HG rev 102.
;12/23/12 Removed sKey parm from SaySelectionPosition.
;Changed GetObjectState to GetObjState.
;Changed StrToolbars/SelectionBar/TrackPanel to CS_....
;Changed ID_Change_List to ID_Chains_List, ID_Change_Parms to ID_Chain_Cmds_List.
;Changed IniFile to CS_INI_FILE.
;12/23/12 Previous saved to HG rev 101.
;12/20/12 Formatting and typo fixes.
;Added variables sMessage and sScriptName in scripts so global can be removed.
;In DeleteSelectedAudio changed TypeCurrentScriptKeylabel to SayCurrentScriptKeyLabel.
;In AnnounceOnOff we now use the same message used by AdjustJawsOptions.  This removes the string literal without the need for another message constant.
;In SayAudacityState commented out (hopefully) unused variables.  Changed literal space to constant cScSpace.
;In script Enter changed "p" to csPauseKey.  Added this constant to audacity.jsm.
;12/14/12 Previous saved to HG rev 100.
;12/14/12 Changed AnnounceMessage to test for FocusInMainWindow instead of FocusInTrackPanel.
; Removed tests for FocusInTrackPanel (which should have been FocusInMainWindow) and UserBufferIsActive because these tests are done in AnnounceMessage.
;Renamed function AnnounceMessage to AnnounceKeyMessage to indicate that it sends the key.  Also changed jsd.
;12/12/12 Previous saved to HG rev 99.
;12/12/12 Changed JAWSDelete and DeleteSelectedAudio so that they delete audio if Focus in the main window instead of track panel.
;Added SayCurrentScriptKeyLabel in DeleteSelectedAudio.
;Rewrote JAWSDelete to not use IsTrackSelected because it duplicates processing in DeleteSelectedAudio and is slow.  Also removed testing for no project since it is handled in DeleteSelectedAudio.
;Commented out no project announcement in HandleCustomWindow so that it will not speak when moving between toolbar, track panel, and selection bar.  It previously didn't speak in track panel, only in toolbar and selection bar.

Include "hjconst.jsh"
Include "hjglobal.jsh"
Include "common.jsm"
Include "audacity.jsm"
Include "msaaconst.jsh"

;The next line makes the script compiled on Jaws 13.0 to behave the same as it does with earlier versions.
;#pragma StringComparison partial

Const
	ID_SELECTION_START = 2705,
	ID_SELECTION_END = 2706,   ; selection end or selection length
	ID_END_RADIO = 2704,
	ID_LENGTH_RADIO = 2703,
	WC_wxWindowClass = "wxWindowClass", ; grabber control on toolbars
	CS_INI_FILE="Audacity.jsi",
	;For VST plugins
	ID_Load_Preset=11001,
	ID_Save_Preset=11002,
	ID_Preset=11000,
	;For user options.
	CI_MESSAGES_OFF = 0,
	CI_MESSAGES_FULL = 1, ; announce all messages
	CI_TOOLBARS_OFF = 0,
	CI_TOOLBARS_ON = 1, ; announce all toolbars
CI_ENTERPAUSE_OFF = 0, ; ENTER during play/record sent to ap
CI_ENTERPAUSE_ON = 1, ; ENTER pauses during play and record
	;For the Edit chains dialog
	ID_Chains_List=7001,
	ID_Chain_Cmds_List=10002

/*
Const
	;Names of toolbar button images for use when GetObjectInfoByName doesn't work.  See GetAudacityState.
	;Each ends with a trailing space.
	CS_IMGRECORDPRESSED = "graphic 405 ",
	CS_IMGPLAYPRESSED = "graphic 28 ",
	CS_IMGPAUSEPRESSED = "graphic 161 "
*/


Globals
	Int App_FirstTime,
Int gfEnterPause,
String gsJawsGuideLink ;URL of Audacity Guide for JAWS users

Int Function AnnounceOn (string sKey)
;Indicate whether messages related to certain Audacity operations should be spoken.  Return True if messages should be spoken.
;This function can be used to check if announce toolbars is on by specifying the appropriate value for sKey.
;sKey: key to read in audacity.JSI file
;New method given by Le Van Mai (Cuong's friend)
Return IniReadInteger ("Settings", sKey, 0, CS_INI_FILE)
EndFunction ; AnnounceOn

Int Function FocusInTrackPanel ()
;Indicates that the focus is in the track panel.  It is used to prevent JAWS from speaking messages such as move to start of track etc. in the selection bar or toolbar.
Return (FocusInMainWindow () && GetWindowName(GetFocus()) == WN_TRACKPANEL )
EndFunction ; FocusInTrackPanel

Void Function SaySelectionPosition (Int iPosition, string sMessage)
;say the selection position field and pass the key to the ap.
;iPosition - control ID of the selection position control.
;sMessage - Spoken message
;This function now uses the method of saying selection start and end position, from Gary Campbell.
Var
	Handle wnd, ;the window containing the selection bar
	String sValue ;the selection field value 

If DialogActive ()||MenusActive () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey () ;allow users to type [, ] if focus in any text box
ElIf NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () Then
	TypeCurrentScriptKey ()
	Pause () ;Wait for possible appearance of Boundary Position dialog.
	If !DialogActive () Then
		Pause ()
		let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iPosition)
		;If the Announce Messages option is on, speak the selection posision.
		If AnnounceOn ("AnnounceMessage") Then
			Let sValue=GetPositionField (wnd) ;get value of desired control
			If !sValue Then ;the selection toolbar is turned off
				Say (MSGNoSelection, OT_Error)
			Else
				SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sMessage, sMessage)
				SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sValue, sValue)
			endIf ;say selection position
		endIf ; AnnounceOn
	EndIf ; if !DialogActive
EndIf ; If FocusInMainWindow
EndFunction ; SaySelectionPosition

Void Function MarkerMovement (string sScript, string sAlert)
;Used for marker scripts, such as move start of selection to the left by a small amount
;First, check to make sure we have a project open.
If !UserBufferIsActive ()&&FocusInTrackPanel () && IsStopped () Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If AnnounceOn ("AnnounceMessage") Then
		SayFormattedMessage (OT_Cursor, sAlert) ;The alert specified by calling script
	EndIf ; if AnnounceOn
Else
	;Not main window, perform the specified script, passed as a parameter. This method suggested by Doug Lee
	FormatStringWithEmbeddedFunctions("<$" +sScript +">") ;instead of PerformScript method. 
EndIf ; else not main window
EndFunction ; MarkerMovement

Void Function MouseMovement (string sScript)
;Used to bypass scripts such as MouseLeft, MouseRight etc. that are assigned to Audacity keys while in the main window.
;sScript - name of JAWS script to be executed when not in the Audacity main window.
If FocusInMainWindow () 
&& IsPCCursor () && !NoProject () Then ;focus at the main window, there's a project open, and the Jaws cursor is not active
	TypeCurrentScriptKey () ;Audacity hotkey for adjusting gain
Else
	;otherwise, perform the default JAWS script
	formatStringWithEmbeddedFunctions("<$" +sScript +">")
endIf ; else perform default script
EndFunction ; MouseMovement

Void Function AnnounceKeyMessage (string Message)
;This speaks an alert message when the user presses certain Audacity hotkeys, such as j or Shift J when appropriate, and passes the key to Audacity.
; Message - message to be spoken.
If !NoProject ()&&! UserBufferIsActive ()&&FocusInMainWindow () Then
	If AnnounceOn ("AnnounceMessage") Then
		SayUsingVoice (VCTX_Message, Message, OT_status) ;Speak alert message.
	EndIf ; if AnnounceOn
	TypeCurrentScriptKey ()
Else
	;Not main window, etc.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ; else not main window, etc.
EndFunction ; AnnounceKeyMessage

Void Function SayNotStopped ()
If AnnounceOn ("AnnounceMessage") Then
	SayFormattedMessage (ot_Error, msgNotStopped_l, msgNotStopped_s)
EndIf
EndFunction ; SayNotStopped

Void Function SayNoProject ()
;If no project is open, speak an alert message.
SayFormattedMessage (OT_error, msgNoProject_l, msgNoProject_s)
EndFunction ; SayNoProject

Int Function NoProject ()
;Return True if no project is open  (focus in main window and no tracks in track panel).
;This is a feature from GoldWave scripts.
Var
	Int iSubtype,
	Handle hTemp,
	Object obj

If !UserBufferIsActive () && FocusInMainWindow () Then
	Let hTemp = GetRealWindow(GetFocus())
	Let hTemp = FindWindow (hTemp, "", WN_TRACKPANEL)
	SaveCursor ()
	InvisibleCursor ()
	MoveToWindow(hTemp)
	Pause ()
	Let obj = GetCurrentObject (0)
	RestoreCursor ()
	If obj.AccChildCount == 0 Then
		Return True
	EndIf ; if no tracks
EndIf ; if in main window
Return False
EndFunction ; NoProject

Function AutoStartEvent ()
If !App_FirstTime Then
	Let App_FirstTime=1
	SayFormattedMessage (OT_No_Disable, MSG_App_Start)
;write default settings of Audacity script if settings file doesn't exist.
If !FileExists (FindJAWSPersonalizedSettingsFile (CS_INI_FILE, True)) Then
	AddDefaultConfig ()
EndIf
Let gfEnterPause = IniReadInteger("Settings", "EnterPause", CI_ENTERPAUSE_ON, CS_INI_FILE)
;If we haven't read a value for the JAWS ref guide link, initialize to default.
If !gsJawsGuideLink Then
Let gsJawsGuideLink = CS_JawsGuide_LINK
EndIf
EndIf ; if first time
EndFunction ; AutoStartEvent

Globals Handle ghAudacityLastArea,
	Handle ghAudacityLastToolbar

Int Function HandleCustomWindows ()
Var
	Handle hParent,
	Handle hFocus,
	Handle hOld,
	Handle hToolbar,
	String sName,
	Int iMSAA_JCFOpt

;Announce when focus changes to a different area of the main window.
If !FocusInMainWindow() Then
	If DialogActive () && GetWindowName(GetFocus()) == cscNULL Then
		let iMSAA_JCFOpt = GetJCFOption (OPT_MSAA_MODE)
		SetJCFOption (OPT_MSAA_MODE, 2)
		Let sName = GetObjectName()
		SetJCFOption (OPT_MSAA_MODE, iMSAA_JCFOpt)
		SayControlEx(GetFocus (), 
		sName, "",   ; control name, type
		"",   ; control state
		"", "",   ; Container name, type
		"", "",   ; value, position
		"")   ; dialog text
		Return True
	ElIf IsWarningDialog () Then
		SayWindowTypeAndText (GetFocus ())
		return true
	EndIf ; no window name
	Return HandleCustomWindows () ; not main window, continue with normal processing
EndIf ; if ! focus in main window
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
		Say (CS_TrackPanel, OT_Position)
		Return HandleCustomWindows ()
	EndIf ; if track panel
	; We could also identify the selection by testing for WindowHierarchyX = 3.
	If GetWindowName(GetFirstChild(hParent)) == WN_SELECTION Then
		Say (CS_SelectionBar, OT_position)
	Else
		Say (CS_ToolBars, OT_position)
	endIf ; else toolbar
EndIf ; new area

If IsToolbar(GetToolbar ()) Then
	Let hToolbar = GetToolbar ()
	If hToolbar != ghAudacityLastToolbar Then
		Let ghAudacityLastToolbar = hToolbar
		If AnnounceOn ("AnnounceToolbars") Then
			Say(GetWindowName(hToolbar), OT_CONTROL_GROUP_NAME)
		EndIf
	EndIf ; new toolbar
EndIf ; If IsToolbar
Return HandleCustomWindows () ; allow others to process
EndFunction ; HandleCustomWindows

Void Function SayFocusedObject ()
If FocusInTrackPanel () Then
	;Suppress speaking of "track table" when moving between tracks.
	SayObjectActiveItem ()
Else
	SayFocusedObject ()
EndIf
EndFunction ; SayFocusedObject

Int Function IsToolbar (Handle hWnd)
; Return True if hWnd is one of the toolbars.
; The toolbars are in a window named ToolDock under the app window.  It is the second window, the selection bar is inside the window following it, which is also named ToolDock.
; Assumes focus is in the main window.
Var
	Handle hParent

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

Handle Function GetToolbar ()
; When focus is on a toolbar control returns the handle of the toolbar containing the control.
Return GetParent(GetFocus())
EndFunction ; GetToolbar

Int Function FocusInMainWindow ()
;Returns True if the focused control is in the main window, False otherwise.
Var
	Handle hFocus,
	Handle hWnd

Let hFocus = GetFocus ()
If (GetWindowName(hFocus) == WN_TRACKPANEL || GetWindowName(GetParent(GetParent(hFocus))) == WN_TOOLDOCK) then
	Return True
EndIf
Return False
EndFunction ; FocusInMainWindow

String Function GetPositionField (Handle hWnd)
;Returns the value of the specified audio selection or position field.
;hWnd - the handle of the control.
;Return - the value of the position field suitable for speaking.
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

;Remove "uninteresting" stuff from the position, like leading zeros and ".000"
;A position can be in several formats, such as "0 0  h 0 0  m 0 0 .0 0 0  s " or "0 0 0 ,0 0 0  seconds ".
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
	;S1 contains what needs to be stripped from the staart of s2.
EndIf ; else contains decimal
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
		EndIf ; if decimal is first char
		Let s3 = StringReplaceSubstrings(substring(s2, 1, i - 1), "00", "0")
		Let s2 = s3 + Substring (s2, i + 1 + j, StringLength(s2) - j)
	Else
		; nonzeros after decimal
		Let s3 = StringReplaceSubstrings(substring(s2, 1, i - 1), "00", "0")
		Let s2 = s3 + Substring (s2, i, StringLength(s2) - i + 1)
	EndIf ; if no nonzeros after decimal
EndIf ; if decimal
; What we want is in s2.
;Don't say leading parts if they are 0.

Return s2
EndFunction ; GetPositionField

Script SaySelectionStart ()
;Say the value of the Selection Start field.

Var
	Handle hWnd,
	String sName,
	String sValue
;I modified this script to make it work on open project only.
If NoProject () Then
	SayNoProject ()
	Return ;exit this script when no project open
ElIf DialogActive ()||MenusActive () then
	;Pass key to app.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
Else
	Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	If (IsSameScript()) Then
		SetFocus(hWnd)
		Return
	EndIf ;if IsSameScript
EndIf ; Else not NoProject()
Let sValue = GetPositionField(hWnd)
If !sValue then ;some time user turn off the selection toolbar, so this condition varify the selection boolbar is turned on or not
	Say (msgNoSelection, OT_error)
Else
	SayMessage (OT_NO_DISABLE, sValue, sValue)
EndIf
EndScript ; SaySelectionStart

Script SaySelectionEnd ()
;Say the value of the Selection End or Length field.

Var
	Handle hRadio,
	Handle hEnd, ; handle of the edit control
	String sName,
	String sValue,
	Int bIsSelected

If NoProject () then
	SayNoProject ()
	Return
ElIf DialogActive () || MenusActive () then
	;Pass key to app.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
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
		Say (msgNoSelection, OT_error)
	Else
		SayMessage (OT_NO_DISABLE, sName + sValue, sValue)
	EndIf
EndIf ; else project open
EndScript ; SaySelectionEnd

Script SayActiveCursor ()
; Say audio position field if PC cursor is on, or perform the normal function if pressed twice quickly.
Var
	Handle hWnd,
	String sValue

If (Not FocusInMainWindow () || IsSameScript () || Not IsPCCursor () || UserBufferIsActive ())||NoProject () Then
	PerformScript SayActiveCursor()
	Return
EndIf
Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
Let hWnd = GetNextWindow(GetNextWindow(hWnd))
;hWnd is Audio Position field.
Let sValue = GetPositionField(hWnd)
If !sValue Then
	Say (msgNoSelection, OT_error)
Else
	SayMessage (OT_NO_DISABLE, sValue, sValue)
EndIf
EndScript ; SayActiveCursor

Script  ScriptFileName ()
ScriptAndAppNames(msgProgName)
EndScript ; ScriptFileName

Script AudacityHotkeyHelp ()
Var
	String sMessage

If UserBufferIsActive () Then
	UserBufferDeactivate ()
EndIf
If !IsSameScript () && FocusInMainWindow () Then
	Let sMessage=FormatString (MSGScript_Ver, CS_SCRIPT_VERSION)
	SayFormattedMessage (OT_User_buffer, sMessage)
	SayFormattedMessage (OT_User_Buffer, MSGHotkeyHelp)
	;In JAWS 10 the produced link redisplays the Audacity hot keys list when activated from the text.  It works correctly from the links list (JAWSKey+F7).  This is the same behavior as seen in Outlook for Office 2003.
	AddHotkeyLinks ()
	;UserBufferAddText (cScBufferNewLine)
	;UserBufferAddText (cMsgHotKeysLink, cFuncHotKey, cMsgHotKeysFunc)
	;UserBufferAddText (cScBufferNewLine)
	;UserBufferAddText (cMsgBuffExit)
Else
	If DialogActive () && FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Preset) Then
		;We are in a dialog with a preset.
		sayFormattedMessage (OT_User_Buffer, msgPresetHotkeyHelp)
		;UserBufferAddText (cScBufferNewLine)
		;UserBufferAddText(cMsgHotKeysLink, cFuncHotKey, cMsgHotKeysFunc)
		;UserBufferAddText (cScBufferNewLine)
		;UserBufferAddText (cMsgBuffExit)
		AddHotkeyLinks ()
		Return
	EndIf
	PerformScript HotKeyHelp ()
EndIf ;else not in main window
EndScript ; HotkeyHelp

Function ShowJawsGuide()
SayMessage(OT_JAWS_MESSAGE, msgLoadingJawsGuide_L, msgLoadingJawsGuide_S)
run(gsJawsGuideLink)
EndFunction

/*
Int Function IsWinKeyHelp()
;This causes Hotkey and window key help to display links to default JAWS and Windows hotkeys.  To use it we could make it return a global that we set in AudacityHotKeyHelp.
Return True
EndFunction
*/


Script AudacityKeysHelp ()
If !IsSameScript() && FocusInMainWindow() Then
If UserBufferIsActive () Then
	UserBufferDeactivate ()
EndIf
	UserBufferClear()
	UserBufferAddText(msgAudacityHotKeyHelp1)
	UserBufferAddText(gsJawsGuideLink, "ShowJawsGuide()", CS_JawsGuide_LINK_DISP)
	UserBufferAddText(msgAudacityHotKeyHelp2)
	;AddHotKeyLinks ()
	UserBufferAddText (cScBufferNewLine)
	UserBufferAddText (cMsgBuffExit)
	UserBufferActivate()
	JAWSTopOfFile()
	SayLine()
Else
	PerformScript WindowKeysHelp()
EndIf
EndScript ; WindowKeysHelp

;These scripts allow access to Audacity keys assigned to the same keys as JAWS scripts such as MouseUp, MouseDown etc.  The user can still perform the JAWS functions by turning on the JAWS cursor.
Script MouseUp ()
Var
	String sScriptName

Let sScriptName="MouseUp" ;Perform script name for MouseUp in a variable
MouseMovement (sScriptName)
EndScript ; MouseUp

Script MouseDown ()
Var
	String sScriptName

Let sScriptName="MouseDown"
MouseMovement (sScriptName)
EndScript ; MouseDown

Script MouseLeft ()
Var
	String sScriptName

Let sScriptName="MouseLeft"
MouseMovement (sScriptName)
EndScript ; MouseLeft

Script MouseRight ()
Var
	String sScriptName

Let sScriptName="MouseRight"
MouseMovement (sScriptName)
EndScript ; MouseRight

;The scripts below just speak an alert message when user presses certain Audacity hotkeys when they are active.
Script SelectionStart ()
;Say selection start position when user presses the left bracket key to set it.
SaySelectionPosition (ID_SELECTION_START, msgSelectionStart)
EndScript ; SelectionStart

Script SelectionEnd ()
;Say selection end position
SaySelectionPosition (ID_SELECTION_END, msgSelectionEnd)
EndScript ; SelectionEnd

Script FinishMarkerRight ()
;move the end of the selection to the right by a small amount.
Var
	Handle hWnd,
	String sScriptName,
	String sMessage

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
If AnnounceOn ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	pause ()
	let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
EndIf
EndScript ; FinishMarkerRight

Script FinishMarkerLeft ()
Var
	Handle hWnd,
	String sScriptName,
	String sMessage

If !IsPCCursor () || UserBufferIsActive () || !IsStopped () Then
	PerformScript SelectPriorWord ()
	Return
EndIf

Let sMessage=FormatString (MSGMoveSelection, msgEnd, msgLeft)
Let sScriptName="SelectPriorWord"
MarkerMovement (sScriptName, sMessage)
If AnnounceOn ("AnnounceMessage") && !NoProject () Then
	pause ()
	let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
EndIf
EndScript ; FinishMarkerLeft

Script StartMarkerRight ()
Var
	Handle hWnd,
	String sScriptName,
	String sMessage

If !IsPCCursor () || UserBufferIsActive () || !IsStopped () Then
	PerformScript SelectNextWord ()
	Return
EndIf

Let sMessage=FormatString (MSGMoveSelection, msgStart, msgRight)
Let sScriptName="SelectNextWord"
MarkerMovement (sScriptName, sMessage)
If AnnounceOn ("AnnounceMessage") && !NoProject () Then
	pause ()
	let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
EndIf
EndScript ; StartMarkerRight

Script StartMarkerLeft ()
Var
	Handle hWnd,
	String sScriptName,
	String sMessage

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
If AnnounceOn ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	pause ()
	let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
EndIf
EndScript ; StartMarkerLeft

Script JawsHome ()
;If we are speaking an Audacity message, don't speak the key name.
If NoProject () && FocusInTrackPanel () &&!UserBufferIsActive () Then
	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () &&! NoProject () &&!UserBufferIsActive ()&&AnnounceOn ("AnnounceMessage")Then
	If !IsStopped () Then
		SayNotStopped ()
		return
	EndIf ;!IsStopped
	JawsHome () ; do Home without speaking key label
	SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, msgStart, msgTrack))
Else
	PerformScript JAWSHome ()
EndIf
EndScript ; JawsHome

Script JawsEnd ()
;If we are speaking an Audacity message, don't speak the key name.
If NoProject () && FocusInTrackPanel () &&!UserBufferIsActive () Then
	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () && !NoProject () &&!UserBufferIsActive ()&&AnnounceOn ("AnnounceMessage") Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ;!IsStopped
	JAWSEnd () ; do End without speaking key label
	SayFormattedMessage (OT_Position, FormatString (MSGMoveTo, msgEnd, msgAllAudio))
Else
	PerformScript JAWSEnd ()
EndIf
EndScript ; JawsEnd


Script MoveToStartOfSelectedTracks ()
If DialogActive () ||MenusActive () Then
	;A dialog is open, pass key to application and speak its label.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (MSGMoveTo, msgStart, msgSelectedTracks))
EndIf
EndScript ; MoveToStartOfSelectedTracks

Script MoveToEndOfSelectedTracks ()
If DialogActive () ||MenusActive () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (MSGMoveTo, msgEnd, msgSelectedTracks))
EndIf
EndScript ; MoveToEndOfSelectedTracks

Script SelectToBeginning ()
;Select to start of tracks.
If DialogActive () || MenusActive () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (MSGSelectedTo, msgStart))
EndIf
EndScript ; SelectToBeginning

Script SelectToEnd ()
;Select to end of tracks.
If DialogActive () || MenusActive () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (MSGSelectedTo, msgEnd))
EndIf
EndScript ; SelectToEnd

Script SelectFromStartOfLine ()
;Select from current position to the start of file
If NoProject () Then
	SayNoProject ()
	Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () Then
	SelectFromStartOfLine ()
	If AnnounceOn ("AnnounceMessage") Then ;User can turn off this message
		SayFormattedMessage (OT_No_Disable, msgStartOfFile) ;alerts when user activates this script at the main window, and a project is open
	EndIf
	;Otherwise, perform default script
Else
	PerformScript SelectFromStartOfLine ()
EndIf
EndScript ; SelectFromStartOfLine

Script SelectToEndOfLine ()
;Select from current position to the end of file
If NoProject () Then
	SayNoProject ()
	Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!UserBufferIsActive ()&&!NoProject () Then
	SelectToEndOfLine ()
	If AnnounceOn ("AnnounceMessage") Then
		SayFormattedMessage (OT_No_Disable, msgEndOfFile)
	EndIf
Else
	PerformScript SelectToEndOfLine ()
EndIf
EndScript ; SelectToEndOfLine

Script DeleteSelectedAudio ()
;Alerts when user deletes selected sound
If NoProject () Then
	SayNoProject ()
	Return
ElIf DialogActive () || MenusActive () Then
	;Pass key to app.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	return
ElIf FocusInMainWindow () Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ; If not stopped
	TypeCurrentScriptKey ()
	If AnnounceOn ("AnnounceMessage") Then
		SayFormattedMessage (OT_Jaws_Message, MSGDelete_l, MSGDelete_s)
	EndIf ; if AnnounceOn
Else ; not main window, etc.
	; !NoProject () && !DialogActive () && !MenusActive () && IsTrackSelected () && !FocusInTrackPanel () 
	; Just in case it is used somewhere else (like CTRL+k).  Actually, we could do it at the top of the script and eliminate this else.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ; else not main window, etc.
EndScript ; DeleteSelectedAudio

Script JawsDelete ()
;If focus is in the main window, a project exists, and audio is selected, the DEL key will delete it.  In this case we perform the script DeleteSelectedAudio.  Otherwise we perform the defaault script.

If FocusInMainWindow () Then
	; (!FocusInMainWindow () || IsTrackSelected ()) && (FocusInTrackPanel ()&&!NoProject ())
	PerformScript DeleteSelectedAudio()
Else
	; NoProdect() || ((!FocusInMainWindow () || IsTrackSelected ()) && !FocusInTrackPanel ()) ; ?? not sure these are t`he right conditions here
	PerformScript JAWSDelete ()
EndIf
EndScript ; JawsDelete

Script JAWSBackspace ()
;This script is similar to the JawsDelete script.
If FocusInTrackPanel ()&&!NoProject () Then
	PerformScript DeleteSelectedAudio()
Else
	PerformScript JAWSBackspace()
EndIf
EndScript ; JAWSBackspace

Script SayPriorCharacter ()
var
	Handle hWnd

If !userBufferIsActive () && AnnounceOn ("AnnounceMessage") && IsPCCursor () && FocusInTrackPanel () && IsStopped () Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; if no project
	TypeCurrentScriptKey ()
	Pause ()
	let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
Else
	PerformScript SayPriorCharacter ()
EndIf
EndScript ; SayPriorCharacter

Script SayNextCharacter ()
var
	Handle hWnd

If !userBufferIsActive () && AnnounceOn ("AnnounceMessage") && IsPCCursor () && FocusInTrackPanel () && IsStopped () Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; if no project
	TypeCurrentScriptKey ()
	Pause ()
	let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
Else
	PerformScript SayNextCharacter ()
EndIf
EndScript ; SayNextCharacter


Script Copy ()
;Copy selected sound to clipboard in main window.
If !IsTrackSelected () &&!UserBufferIsActive ()&&!DialogActive () && !MenusActive () Then
	SayNoTrackSelected ()
	Return
ElIf FocusInMainWindow ()
&&!UserBufferIsActive () Then ;this second condition makes the default script active in virtual viewer
	If NoProject () Then
		SayNoProject ()
		return
	EndIf ; no project
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If AnnounceOn ("AnnounceMessage") Then
		SayUsingVoice (VCTX_Message, msgCopyAudio, OT_status) ;speak alert message
	EndIf ; if AnnounceOn
Else
	;If no project open, or focus in other windows, perform the default script
	PerformScript CopySelectedTextToClipboard ()
EndIf
EndScript ; Copy

Script CutToClipboard ()
If !IsTrackSelected () &&! DialogActive () Then
	SayNoTrackSelected ()
	Return
ElIf FocusInMainWindow ()
&&!UserBufferIsActive () Then ;this second condition makes the default script active in virtual viewer
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; no project
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If AnnounceOn ("AnnounceMessage") Then
		SayUsingVoice (VCTX_Message, msgCutAudio, OT_status) ;speak alert message
	EndIf ; if AnnounceOn
	; We've already sent the key.
Else
	PerformScript CutToClipboard ()
EndIf
EndScript ; CutToClipboard

Script DeselectAll ()
;Unselect all audio
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgDeselectAll)
EndIf
EndScript ; DeselectAll

Script CloseFocusTrack ()
;If this key will close the current track, speaak a message, otherwise send to ap normally.
If NoProject () Then
	SayNoProject ()
	Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel () Then
	;!UserBufferIsActive () makes the default script active in virtual viewer.
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ; if not Stopped
	AnnounceKeyMessage (msgCloseFocusedTrack)
Else
	;Focus not in track panel, send to app.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ;else not in track panel
EndScript ; CloseFocusTrack

Script AnnounceOnOff ()
Var
	String sMessage

;Let sMessage="Announce messages" + UOAnnounceMessages(0)
;We extract the message from the AdjustJawsOptions constant so we don't need another message constant.
Let sMessage=StringSegment (UO_ANNOUNCE_MESSAGES, ":", 2) + UOAnnounceMessages(0)
Say (sMessage, OT_Status)
EndScript ; AnnounceOnOff

Script NextDocumentWindow ()
;Skip to next toolbar when in the toolbars.
Var
	Handle hToolbar,
	Handle hNext,
	Handle hWnd

If !IsToolbar (GetToolbar ()) Then
	PerformScript NextDocumentWindow ()
Else
	;Is a toolbar.
	Let hToolbar = GetToolbar ()
	Let hNext = GetNextWindow (hToolbar)
	If !hNext Then
		Let hNext = GetFirstWindow (hToolbar)
	EndIf ; last window
	Let hWnd = GetFirstChild (hNext)
	;Toolbars start with a grabber control, and some of them have static controls following the grabber.  We skip these to get to the first control.
	While hWnd && ( (StringCompare(GetWindowClass(hWnd), WC_wxWindowClass) == 0) || (GetWindowSubtypeCode (hWnd) == WT_STATIC))
		;SayString("class=" + GetWindowClass(hWnd) + ", subtype = " + IntToString(GetWindowSubtypeCode(hWnd))) ; debug
		Let hWnd = GetNextWindow(hWnd)
	EndWhile
	SetFocus (hWnd)
EndIf ; else is toolbar
EndScript ; NextDocumentWindow

Script PreviousDocumentWindow ()
;Skip to previous toolbar when in the toolbars.
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

Const
	;Audacity program states returned by GetAudacityState.
	ST_NOTOOLBAR = 0,
	ST_PAUSE = 1,
	ST_PLAY = 2,
	ST_RECORD = 4,
	ST_STOPPED = 8

Int Function GetAudacityState ()
;Returns a value indicating the current program state, e.g. play, record, stopped, paused.
Var
	Int iPauseState,
	Int iPlayState,
	Int iStopState,
	Int iRecordState,
	Handle hTemp,
	Int iState,
	Int iTemp

Let hTemp = GetFirstChild (GetAppMainWindow (GetFocus()))
Let hTemp = GetNextWindow (hTemp) ; parent of toolbars
Let hTemp = FindWindow (hTemp, "", WN_TRANSPORT_TOOLBAR)
If !hTemp Then
	Return ST_NOTOOLBAR
EndIf ; if no transport toolbar

Let hTemp = GetNextWindow (GetFirstChild (hTemp)) ; skip the grabber
Let iPauseState = GetObjState (hTemp)
Let hTemp = GetNextWindow (hTemp)
Let iPlayState = GetObjState (hTemp)
Let hTemp = GetNextWindow (hTemp)
Let iStopState = GetObjState (hTemp)
Let hTemp = GetNextWindow (GetNextWindow (GetNextWindow (hTemp))) ; skip Start and End
Let iRecordState = GetObjState (hTemp)
;SayString("Object states: pause = " + DecToHex(iPauseState) + ", play = " + DecToHex(iPLayState) + ", stop = " + DecToHex(iStopState) + ", record = " + DecToHex(iRecordState)) ; debug
If iPlayState & CTRL_PRESSED Then
	Let iState = ST_PLAY
ElIf iRecordState & CTRL_PRESSED Then
	Let iState = ST_RECORD
Else
	Let iState = ST_STOPPED
EndIf
If iPauseState & CTRL_PRESSED Then
	let iState = iState | ST_PAUSE
EndIf
Return iState
EndFunction ; GetAudacityState

Script SayAudacityState ()
;Announces whether Audacity is stopped, playing, paused, or recording.
Var
	;Int iPauseState,
	;Int iPlayState,
	;Int iStopState,
	;Int iRecordState,
	Handle hTemp,
	Int iState,
	String sMsg

Let iState = GetAudacityState ()
If DialogActive () ||MenusActive () Then
	;Pass key to app.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return ;dialog active
ElIf iState == ST_NOTOOLBAR Then
	Say(msgNoTransportToolbar, OT_JAWS_MESSAGE)
	Return
ElIf NoProject () Then
	SayNoProject ()
	Return ;No project
EndIf ; no toolbar
If iState & ST_PLAY Then
	Let sMsg = msgPlay
ElIf iState & ST_RECORD Then
	Let sMsg = msgRecord
Else
	Let sMsg = msgStop
EndIf
If iState & ST_PAUSE Then
	let sMsg = sMsg + cScSpace + msgPause
EndIf
Say(sMsg, OT_JAWS_MESSAGE)
EndScript ; SayAudacityState

;/*
;This script causes ENTER to do pause if not stopped, otherwise does normal ENTER.
;If you comment this out you should also comment out entries for keys ENTER and NumPadEnter in the jkm file.  Otherwise, if JAWS is set to treat numpad keys separately, not commenting out these entries will cause Audacity to see both keys as standard ENTER.
Script Enter ()
;SayString (GetCurrentScriptKeyName ()) ; debug
If FocusInMainWindow () && !IsStopped () && gfEnterPause Then
	TypeKey (csPauseKey)
Else
	;Not pause
	If UserBufferIsActive () Then
	PerformScript Enter ()
	Else
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	EndIf ; else user buffer not active
EndIf ; else not pause
EndScript ; Enter
;*/

Int Function GetObjState (Handle hWnd)
;Gets the object state from an object in a window.  Assumes the object has the same name as the window (returned by GetWindowName).  This is used to get the Pressed state of toolbar buttons.
;The returned state uses control attribute values from hjconst.jsh, not MSAASTATE values from msaaconst.jsh.
;Returns -1 if unable to get the object state.
Var
	Int iState,
	Int iSubtype,
	String sName,
	Int iRtn,
	Int iMSAAMode,
	Object obj,
	Int iTemp

Let sName = GetWindowName (hWnd)
Let iMSAAMode = GetJCFOption (OPT_MSAA_MODE)
SetJCFOption (OPT_MSAA_MODE, 1)
Let iRtn = GetObjectInfoByName (hWnd, sName, 1, iSubtype, iState)
;Let iRtn = 0 ; debug
If !iRtn Then
	;Try GetObjectFromEvent.
	;SayString ("GetObjState: GetObjectInfoByName failed for " + sName) ; debug
	Let obj = getObjectFromEvent(hWnd, -4, 0, iTemp)
	If obj Then
		Let iTemp = obj.accState(1)
		If iTemp & STATE_SYSTEM_PRESSED Then
			Let iState = CTRL_PRESSED
		Else
			Let iState = 0
		EndIf
		;SayString("  obj.accState returned 0x" + DecToHex(iTemp)) ; debug
	Else
		;SayString ("  ObjectFromEvent got no object") ; debug
		Let iState = -1 ; set error
	EndIf ; If obj
EndIf ; If !iRtn
SetJCFOption (OPT_MSAA_MODE, iMSAAMode)
;SayString ("GetObjState: iState=0x" + DecToHex(iState) + " for " + sName) ; debug
Return iState
EndFunction ; GetObjState

Int Function IsStopped ()
Return GetAudacityState () & ST_STOPPED
EndFunction ; IsStopped

; *** Adapted from ie.jss
Script AdjustJawsVerbosity ()
;This is to support JAWS versions that do not support tree-style user options.  This should work but may not look very nice.  Not tested!
Var
	String strListOfOptions

Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS
JawsVerbosityCore (strListOfOptions)
EndScript ; AdjustJawsVerbosity

Script AdjustJAWSOptions ()
Var
	String strListOfOptions
If InHJDialog () Then
	SayFormattedMessage (OT_error, cMSG337_L, cMSG337_S)
	Return
EndIf
Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS + _DLG_SEPARATOR + UO_ENTER_PAUSE
If GetJFWVersion () >= 900000 Then
	OptionsTreeCore (strListOfOptions) ;the OptionsTreeCore available in JAWS 9.0 or later
Else
	JawsVerbosityCore (strListOfOptions) ;The AdjustJawsVerbosity available prior to Jaws 9.0. Not tested
EndIf ; JAWS 9 or >
EndScript ; AdjustJAWSOptions

String Function NodeHlp (String sNodeName)
;This is the easiest way for you to create your callback help,
;for your configuration-specific options,
;if you have not specified a node, we have done so using your configuration's name.
;If you don't do this, your top-level or group node will tell your users that no help is available, although we try to be nice about it.
If StringContains (sNodeName, GetActiveConfiguration ()) Then
	Return msgUO_AudacityOptionsHlp
Else
	Return NodeHlp (sNodeName);Default for all default and Virtual Cursor groups.
EndIf
EndFunction ; NodeHlp

string Function UOAnnounceMessages (Int iRetCurVal)
Var
	Int iVal
Let iVal = IniReadInteger ("Settings", "AnnounceMessage", CI_MESSAGES_OFF, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_MESSAGES_FULL Then
		Let iVal = CI_MESSAGES_OFF
	Else
		; This paves the way for multiple values.
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger ("Settings", "AnnounceMessage", iVal, CS_INI_FILE)
EndIf ; if !iRetCurVal
If iVal == CI_MESSAGES_OFF Then
	Return cmsg_Off
ElIf iVal == CI_MESSAGES_FULL Then
	Return cmsg_On
EndIf
EndFunction ; UOAnnounceMessages

String Function UOAnnounceMessagesHlp ()
Return msgUO_AnnounceMessagesHlp
EndFunction ; UOAnnounceMessagesHlp

String Function UOAnnounceToolbars (Int iRetCurVal)
Var
	Int iVal

Let iVal = IniReadInteger ("Settings", "Announcetoolbars", CI_TOOLBARS_OFF, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_TOOLBARS_ON Then
		let iVal = CI_TOOLBARS_OFF
	Else
		; This paves the way for multiple values.
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger ("Settings", "Announcetoolbars", iVal, CS_INI_FILE)
EndIf ; if !iRetCurVal
If iVal == CI_TOOLBARS_OFF Then
	Return cmsg_Off
ElIf iVal == CI_TOOLBARS_ON Then
	Return cmsg_On
EndIf
EndFunction ; UOAnnounceToolbars

String Function UOAnnounceToolbarsHlp ()
Return msgUO_AnnounceToolbarsHlp
EndFunction ; UOAnnounceToolbarsHlp

String Function UOEnterPause (Int iRetCurVal)
Var
	Int iVal

Let iVal = IniReadInteger ("Settings", "EnterPause", CI_ENTERPAUSE_ON, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_ENTERPAUSE_ON Then
		let iVal = CI_ENTERPAUSE_OFF
let gfEnterPause = False
	Else
		Let iVal = iVal + 1
Let gfEnterPause = True
	EndIf
	IniWriteInteger ("Settings", "EnterPause", iVal, CS_INI_FILE)
EndIf ; if !iRetCurVal
If iVal == CI_ENTERPAUSE_OFF Then
	Return cmsg_Off
ElIf iVal == CI_ENTERPAUSE_ON Then
	Return cmsg_On
EndIf
EndFunction ; UOEnterPause

String Function UOEnterPauseHlp ()
Return msgUO_EnterPauseHlp
EndFunction ; UOEnterPauseHlp

Void Function AddDefaultConfig ()
;Adds values of default settings to Audacity.JSI File.
IniWriteInteger ("Settings", "AnnounceMessage", CI_MESSAGES_FULL, CS_INI_FILE, False) ; don't flush because we're going to write another one
IniWriteInteger ("Settings", "EnterPause", CI_ENTERPAUSE_ON, CS_INI_FILE, False) ; don't flush because we're going to write another one
IniWriteInteger ("Settings", "AnnounceToolbars", CI_TOOLBARS_ON, CS_INI_FILE, true) ; flush
EndFunction ; AddDefaultConfig

Script ResetConfig ()
;Reset all audacity JAWS script options to their default values.
Var
	String sMessage

;First we remove the old key because of our changes in Audacity.JSI file made by script v1.1.
If FileExists (FindJAWSPersonalizedSettingsFile (CS_INI_FILE, True)) Then
	;Remove obsolete key if it exists.
	Let sMessage=IniReadString ("Settings", "announce", "", CS_INI_FILE) ;the old key "anounce" has been changed to "AnnounceMessage"
	If sMessage Then
		IniRemoveKey ("settings", "announce", CS_INI_FILE, false)
	EndIf ;sMessage
EndIf ;FileExists
AddDefaultConfig ()
Say (msgResetScriptOptions, OT_message)
EndScript ; ResetConfig

Script SayAppVersion ()
;Says current program and script version
Var
	String sMessage

PerformScript SayAppVersion () ;Says current program version
Let sMessage=FormatString (msg_Script_Version, CS_SCRIPT_VERSION) ;current script version
Say (sMessage, OT_No_Disable) ;says current script version
If IsSameScript () Then
	UserBufferAddText (sMessage)
EndIf
EndScript ; SayAppVersion

Script SelectAll ()
;Announce a message when user selects all tracks in current project, or no project open.
PerformScript SelectAll()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && ! NoProject () && AnnounceOn ("AnnounceMessage") Then
	SayUsingVoice (VCTX_Message, MsgSelectAll, OT_String)
EndIf
EndScript ; SelectAll

; Cuong's with modification
Void Function ProcessVST (Int iControlID)
;Activates Preset, Load Preset, and Save Preset controls in VST plugin dialogs.
Var
	Handle hWnd,
	Int bSpeechOff

Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iControlID) ;The control ID of the control the focus should be moved to
If DialogActive () && hWnd Then ;make sure user is in a dialog and we found the desired control.
	If GetWindowSubtypeCode (hWnd)==WT_BUTTON Then
		Let bSpeechOff = IsSpeechOff ()
		SpeechOff () ;prevent JAWS from speaking while focus moves to the button
		SetFocus (hWnd) ;move focus to the button
		Pause () ;so button doesn't speak after speech is turned back on
		EnterKey () ;activate the button
		If !bSpeechOff Then
			SpeechOn ()
		EndIf
	Else
		;dest not a button.  Why do we set focus here?
		;while focus at the preset control, just set focus to it.
		SetFocus (hWnd)
	EndIf ; get window class
Else
	;Process normal functionalities wile focus stands at main window. This mean user can add the same hotkeys of vst for any options they prefer.
	;SayString("vst") ; debug
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ;Dialog active
EndFunction ; ProcessVST

Script VSTPreset ()
;Set focus to the preset control if present
ProcessVST (ID_Preset)
EndScript ; VSTPreset

Script VSTLoadPreset ()
;Activates the load preset button by pressing alt+l
ProcessVST (ID_Load_Preset)
EndScript ; VSTLoadPreset

Script VSTSavePreset ()
;Save current VST settings as a preset
ProcessVST (ID_Save_Preset)
EndScript ; VSTSavePreset

Script SayJump ()
;For use by short/long jumps (,, ., etc.).  sends the key, if in track panel and AnnounceOn speaks start position, otherwise speaks the key label.
;If you want a separate script for each key, turn this into a function and call it from the scripts.
var
	Handle hWnd

TypeCurrentScriptKey ()
If !UserBufferIsActive ()&&FocusInTrackPanel () && NoProject () Then
	SayNoProject ()
	Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel ()&&AnnounceOn ("AnnounceMessage") && IsStopped () Then
	Pause ()
	let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
Else
	SayCurrentScriptKeyLabel ()
EndIf
EndScript ; SayJump

Int Function IsTrackSelected ()
;indicates that there is a selected track.
Var
	Object obj,
	Handle hWnd,
	String sMsg,
	Int i,
	Int iTrackCount,
	Int iState,
	Int iMSAAMode

If NoProject () Then
	SayNoProject ()
	Return
Else
	Let hWnd = GetFirstChild (GetLastWindow (GetFirstChild (GetAppMainWindow (GetFocus ()))))
	;SayString ("Window name = " + GetWindowName(hWnd)) ; debug
	Let iMSAAMode = GetJcfOption(OPT_MSAA_MODE)
	SetJcfOption(OPT_MSAA_MODE, 1)
	Let obj = getObjectFromEvent(hWnd, -4, 0, i)
	; obj is the table.
	Let iTrackCount = obj.accChildCount
	Let i = 1
	While i <= iTrackCount
		Let iState = obj.accState(i)
		;This is a bitwise and, we are testing the bit for the selected state.
		If iState & STATE_SYSTEM_SELECTED Then
			SetJcfOption(OPT_MSAA_MODE, iMSAAMode)
			Return True
		EndIf ; selected
		Let i = i + 1
	EndWhile
	;None selected.
	SetJcfOption(OPT_MSAA_MODE, iMSAAMode)
	Return False
EndIf ;Else project exists
EndFunction ; IsTrackSelected

Void Function SayNoTrackSelected ()
;Announce that the current track is not selected
If !NoProject () &&!MenusActive () Then ;Only announce when a project exists
	Say (msgNoTrackSelected, OT_error)
EndIf ;No project
EndFunction ; SayNoTrackSelected

Int Function IsWarningDialog ()
;Verify that focus is in the warning dialog that appears when importing uncompressed audio files.
Var
	string sName

Let sName = GetWindowName (GetFocus ())
If DialogActive ()
&& (sName==MsgCopy
||sName==MSGDirectEdit
||sName==MSGDoNotWarn) Then
	Return TRUE
EndIf ;dialog active
EndFunction ; IsWarningDialog

Script SayLine ()
If IsWarningDialog () && IsPCCursor () && not UserBufferIsActive () Then ;we are in the warning dialog for importing uncompressed audio
	SayWindowTypeAndText (GetFocus ())
Else
	; Not at this dialog, performs default funtionality
	PerformScript SayLine()
EndIf
EndScript ; SayLine

Script SwitchChainsList ()
;Switch between the Chains and Chain lists in the Edit Chains dialog.
;Feature suggested by Dang Manh Cuong
;Code given by Gary Campbell
Var
	Handle wnd,
	Handle hReal,
	Int iCurId,
	String sMessage

Let hReal = GetRealWindow (GetFocus ())
If DialogActive () &&GetWindowName (hReal)==WN_EDIT_CHAINS Then
	Let iCurId = GetControlID (GetFocus ())
	If iCurId == ID_Chains_List Then
		Let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Chain_Cmds_List)
		Let sMessage=msgChainCommands ;list of commands in the right list
	Else
		Let wnd=FindDescendantWindow (hReal, ID_Chains_List)
		Let sMessage=msgChains ;list of chains in the left list
	EndIf ; Else neither list.
	SetFocus (wnd)
	;speaks a message when switching between the listss
	If AnnounceOn ("AnnounceMessage") Then
		SayUsingVoice (VCTX_message, sMessage, ot_String)
	EndIf
Else
	;Not Edit Chains dialog
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ;Else not Edit Chains dialog
EndScript ; SwitchChainsList

Script PasteFromClipboard ()
;Speaks a warning message when not stopped or no project.
If DialogActive () || MenusActive () Then
	;I don't think we need to worry about menus, but check just in case.
	PerformScript PasteFromClipboard ()
	Return
EndIf
;Not in a dialog or menu.
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
	Return
Else
	PerformScript PasteFromClipboard ()
EndIf 
EndScript ; PasteFromClipboard

Script ShowCopyright()
SayMessage(OT_USER_BUFFER, msgCopyright)
EndScript ; ShowCopyright
