; JAWS script for Audacity multitrack sound editor V2.0.1.0 (http://audacityteam.org).
;Original author: Gary Campbell
;Modified: Dang Manh Cuong
;Vietnamese README file translation by Nguyen Hoang Giang.

; This constant contains the script version.  The spacing of the following line must be preserved exactly so that the installer can read the version from it.  There is exactly 1 space between const and the name, and 1 space on either side of the equals sign.
Const CS_SCRIPT_VERSION = "2.1.0 2016-09-22T21:00Z"

; This puts the copyright in the jsb file.
Messages

@msgCopyright
JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012-2016  Gary Campbell and Dang Manh Cuong.  All rights reserved.

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

Include "hjconst.jsh"
Include "hjglobal.jsh"
Include "common.jsm"
Include "audacity.jsm"
Include "msaaconst.jsh"
;include "debugstring.jsh" ; debug
;use "debugstring.jsb" ; debug

;The following line makes JAWS 17 to use the old localization model. Although the scripts stored in Settings\Language folder seem to work without adding this, international characters of messages in Audacity.jsm are not processed correctly.
;#pragma usePoFile 0

;The next line makes the script compiled on Jaws 13.0 to behave the same as it does with earlier versions.
;#pragma StringComparison partial

Const
	ID_SELECTION_START = 2705,
	ID_SELECTION_END = 2706,   ; selection end or selection length
	ID_END_RADIO = 2704,
	ID_LENGTH_RADIO = 2703,
	ID_STOP_BUTTON = 5100, ; stop button when previewing an effect, also of all OK buttons
	WC_wxWindowClass = "wxWindowClass", ; grabber control on toolbars, pre 2.1.2
	WC_wxWindowClass2 = "wxWindow", ; grabber control on toolbars, 2.1.2
	CS_INI_FILE="Audacity.jsi",
	;For VST plugins
	ID_Load_Preset=11001,
	ID_Save_Preset=11002,
	ID_Preset=11000,
	;For user options.  The first two can be used for options that don't need special on and off values, which is all of them right now.  This is added to make support of future options easier.
	CI_UO_OFF = 0,
	CI_UO_ON = 1,
	CI_MESSAGES_OFF = 0,
	CI_MESSAGES_FULL = 1, ; announce all messages
	CI_TOOLBARS_OFF = 0,
	CI_TOOLBARS_ON = 1, ; announce all toolbars
	CI_ENTERPAUSE_OFF = 0, ; ENTER during play/record sent to ap
	CI_ENTERPAUSE_ON = 1, ; ENTER pauses during play and record
	;For the Edit chains dialog
	ID_Chains_List=7001,
	ID_Chain_Cmds_List=10002,
	ID_Chain_Cmds_List2=7002, ;Audacity 2.0.4 or higher
	ID_RECORDING_METER = -31987, ;can negative IDs in WXWindows change??
	ID_RECORDING_METER_COMBINED = -31990,
	ID_PLAYBACK_METER = -31985,
	ID_PLAYBACK_METER_COMBINED = -31989

	
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
	Int gfAudacityAutostarted, ;Set in AutoStartEvent, cleared in HandleCustomWindows and HandleCustomApp.
	String gsIniFile, ; CS_Ini_File for pre JAWS 13, the JCF file for 13 and later.
	String gsIniSection, ;"Settings" for pre JAWS 13, "NonJCFOptions" for 13 and later
	;For adjust Jaws options and quick settings script
	Int gfEnterPause,
	Int announceMessage,
	Int AnnounceToolbars,
	Int gfSilencePreview,
	Int gfRecordSpeechOff,
	String gsJawsGuideLink, ;URL of Audacity Guide for JAWS users
	;Commented this out 9/14/13.
	;String gsJawsGuideTitle, ;title of Audacity Guide for JAWS users
	
	Handle ghNull, ; to clear a handle
	;When focus is on a slider with an associated edit, this holds the handle of the associated edit so that it will be spoken by SayNonHighlightedText.  Be sure to set this to 0 when focus moves away from the slider.
	Handle ghSliderEdit,
	Int gfPreviewing,
	Int gfSilence, ; If true, suppresses speech in HandleCustomWindows and HandleCustomRealWindows.
	Int gfSuppressNextTutor, ;Suppress next TutorMessegeEvent, not currently used.
	Int gfInLabel, ;True if a label writing command has been entered but ENTER hasn't been pressed and we haven't left the label track.
	Int giScheduleClearSilence, ;the value returned by ScheduleFunction when silencing speech when starting recording, probably not needed.  It would be used to unschedule the function.
	String gsGoTrackUpKey, ;key that moves focus to the prior (lower numbered) track
	String gsGoTrackDownKey, ;key that moves focus to the next (higher numbered) track
	String gsMoveTrackUpKey, ; key that moves a track up in the track panel (to lower-numbered tracks)
	String gsMoveTrackDownKey, ; key that moves a track down in the track panel (to higher-numbered tracks)
	Int giTrackMark ;Holds the number of the marked track, 0 if none
	
Int Function GetQuickSetting (String sKey)
;Get the desired user option.
;For JAWS 13.0 and later gets the setting from the NonJCFOptions section of the JCF file.  For earlier versions gets it from the JSI file.
;sKey: key of desired setting.
If GetJFWVersion()<1300000 Then
	;New method given by Le Van Mai (Cuong's friend)
	Return IniReadInteger (gsIniSection, sKey, 0, CS_INI_FILE)
Else
	return GetNonJCFOption(sKey)
EndIf ; else JAWS 13 or later
EndFunction ; GetQuickSetting

Int Function FocusInTrackPanel ()
;Indicates that the focus is in the track panel.  It is used to prevent JAWS from speaking messages such as move to start of track etc. in the selection bar or toolbar.
Return (FocusInMainWindow () && GetWindowName(GetFocus()) == WN_TRACKPANEL )
EndFunction ; FocusInTrackPanel

Void Function SaySelectionPosition (Int iPosition, String sMessage)
;say the selection position field and pass the key to the ap.
;iPosition - control ID of the selection position control.
;sMessage - Spoken message
;Designed for use by SelectionStart and SelectionEnd scripts.  Checks to see if Set Selection Boundary dialog appears.
;This function now uses the method of saying selection start and end position, from Gary Campbell.
Var
	Handle wnd, ;the window containing the selection bar
	String sValue ;the selection field value 
	
If DialogActive ()||MenusActive () || gfInLabel Then
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
		;If the Announce Messages option is on, speak the selection posision.
		If GetQuickSetting ("AnnounceMessage") Then
			;Do not use SayPositionField because the message is spoken before the value but only if the value is available.
			Let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iPosition)
			Let sValue=GetPositionField (wnd) ;get value of desired control
			If !sValue Then ;the selection toolbar is turned off
				Say (MSGNoSelection, OT_Error)
			Else
				SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sMessage, sMessage)
				SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sValue, sValue)
			EndIf ;say selection position
		EndIf ; AnnounceOn
	EndIf ; if !DialogActive
EndIf ; If FocusInMainWindow
EndFunction ; SaySelectionPosition

Void Function MarkerMovement (String sScript, String sAlert)
;Used for marker scripts, such as move start of selection to the left by a small amount
;First, check to make sure we have a project open.
If !UserBufferIsActive ()&&FocusInTrackPanel () && IsStopped () && !gfInLabel Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayFormattedMessage (OT_Cursor, sAlert) ;The alert specified by calling script
	EndIf ; if AnnounceOn
Else
	;Not main window, perform the specified script, passed as a parameter. This method suggested by Doug Lee
	FormatStringWithEmbeddedFunctions("<$" +sScript +">") ;instead of PerformScript method. 
EndIf ; else not main window
EndFunction ; MarkerMovement

Void Function MouseMovement (String sScript)
;Used to bypass scripts such as MouseLeft, MouseRight etc. that are assigned to Audacity keys while in the main window.
;sScript - name of JAWS script to be executed when not in the Audacity main window.
If FocusInMainWindow () 
&& IsPCCursor () && !NoProject () Then ;focus at the main window, there's a project open, and the Jaws cursor is not active
	TypeCurrentScriptKey () ;Audacity hotkey for adjusting gain
Else
	;otherwise, perform the default JAWS script
	formatStringWithEmbeddedFunctions("<$" +sScript +">")
EndIf ; else perform default script
EndFunction ; MouseMovement

Void Function AnnounceKeyMessage (String Message)
;This speaks an alert message when the user presses certain Audacity hotkeys, such as j or Shift J when appropriate, and passes the key to Audacity.
; Message - message to be spoken.
If !UserBufferIsActive ()&&FocusInMainWindow () Then
	If GetQuickSetting ("AnnounceMessage") Then
		SayUsingVoice (VCTX_Message, Message, OT_status) ;Speak alert message.
	EndIf ; if AnnounceOn
	TypeCurrentScriptKey ()
;Update MSAA so JAWS will announce updated values.
	MSAARefresh()
Else
	;Not main window, etc.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ; else not main window, etc.
EndFunction ; AnnounceKeyMessage

Void Function SayNotStopped ()
If GetQuickSetting ("AnnounceMessage") Then
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
Var
	String sTemp,
	Int iTemp
	
;DebugString("AutoStart") ; debug
;gfAudacityAutoStarted prevents activation of Silence Preview when switching from another app while focus is in a dialog.
Let gfAudacityAutostarted = True
;We reset these two flags in case they get stuck on.
Let gfSilence = False
Let gfPreviewing = False
Let gfInLabel = False
If !App_FirstTime Then
	Let App_FirstTime=1
	SayFormattedMessage (OT_No_Disable, MSG_App_Start)
	If GetJFWVersion()<1300000 Then
		Let gsIniFile = CS_Ini_File
		Let gsIniSection = "Settings"
	Else
		Let gsIniFile = "Audacity.jcf"
		Let gsIniSection = "NonJCFOptions"
	EndIf ; else V13 or later
	If GetJFWVersion()<1300000 Then
		;write default settings of Audacity script if settings file doesn't exist.
		If !FileExists (FindJAWSPersonalizedSettingsFile (CS_INI_FILE, True)) Then
			AddDefaultConfig ()
		EndIf
		;Read a value for the JAWS ref guide link, initialize to default.
		;The disadvantage of storing these in globals is that you have to shut down and restart JAWS to make changes to an externally edited config file take effect.  This could be avoided by reading from the config file when the values are needed.  Because of the complexity of decoding this value, I choose to use globals despite this disadvantage.  One could also decrease the complexity by using a second key for the title.
		/*
		Commented the title part of this feature out because it could make the hot key help claim it is for a different version of the guide than it was taken from.
		Let sTemp = StringTrimTrailingBlanks (IniReadString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK + cScSpace + CS_JawsGuide_TITLE , CS_INI_FILE))
		Let iTemp = StringContains (sTemp, cScSpace)
		If iTemp Then
		;We found a space and it's not the last character.
		Let gsJawsGuideLink = StringLeft (sTemp, iTemp - 1)
		Let gsJawsGuideTitle = StringRight(sTemp, StringLength (sTemp) - iTemp)
		Else
		Let gsJawsGuideLink = sTemp
		Let gsJawsGuideTitle = CS_JawsGuide_Title
		EndIf ; else no space
		*/

		Let gsJawsGuideLink = StringTrimTrailingBlanks (IniReadString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK, CS_INI_FILE))
	EndIf ; if before JAWS 13

	;Set keys that move the focus up and down in the track panel.
	Let gsGoTrackUpKey = "UpArrow"
	Let gsGoTrackDownKey = "DownArrow"

	;Set keys that move a track up and down in the track panel.
	Let gsMoveTrackUpKey = "Control+Shift+UpArrow"
	Let gsMoveTrackDownKey = "Control+Shift+DownArrow"
EndIf ; if first time
EndFunction ; AutoStartEvent

Void Function SayNonHighlightedText (Handle hwnd, String buffer)
;SayString("Enter SayNonHighlighted") ; debug
	;If we are monitoring an edit associated with a slider, speak it.
If ghSliderEdit && hWnd == ghSliderEdit Then
	Say (buffer, OT_NONHIGHLIGHTED_SCREEN_TEXT)
EndIf
SayNonhighlightedText (hWnd, buffer)
;SayString("Exit SayNonHighlighted") ; debug
EndFunction ; SayNonHighlightedText

int function NewTextEventShouldBeSilent(handle hFocus, handle hwnd, string buffer, int nAttributes,
	int nTextColor, int nBackgroundColor, int nEcho, string sFrameName)
Var
	Int iRtn
Let iRtn = gfSilence || NewTextEventShouldBeSilent(hFocus, hwnd, buffer, nAttributes,
	nTextColor, nBackgroundColor, nEcho, sFrameName)
Return iRtn
EndFunction ;NewTextEventShouldBeSilent
	
Globals Handle ghAudacityLastArea,
	Handle ghAudacityLastToolbar

Void Function TutorMessageEvent(Handle hWnd, Int nMenuMode)
; Suppress tutor message while previewing.
If gfSilence Then
	Return
EndIf
If gfSuppressNextTutor Then
    Let gfSuppressNextTutor = False
    Return
EndIf
    ;DebugString("Tutor message for " + GetWindowType(hWnd)) ; debug
TutorMessageEvent(hWnd, nMenuMode)    
EndFunction ; TutorMessageEvent

void function ProgressBarChangedEvent(handle hProgress, string sName, string sValue)
If gfSilence Then
	Return
EndIf
ProgressBarChangedEvent(hProgress, sName, sValue)
endFunction

/*
Void Function ActiveItemChangedEvent (handle curHwnd, int curObjectId, int curChildId,
	handle prevHwnd, int prevObjectId, int prevChildId)
SayString("ActiveItemChangedEvent") ; debug
ActiveItemChangedEvent (curHwnd, curObjectId, curChildId, prevHwnd, prevObjectId, prevChildId)
EndFunction
*/

Int Function HandleCustomAppWindows(Handle hWnd)
	Var
	Int iRtn

If True Then Return True EndIf ; test what happens if we disable app window.
;DebugString("Enter HandleApp") ; debug
If gfSilencePreview && CheckAudacityVersion ("2,1,2") && DialogActive () && !gfAudacityAutoStarted Then
	;DebugString("GetWindowName of appWindow: " + GetWindowName(hWnd))
	Let gfSilence = True
	;DebugString("Exit HandleApp, starting previewing") ; debug
	Return True
EndIf ;2.1.2 or later
Let iRtn = HandleCustomAppWindows(hWnd)
;DebugString("Exit HandleApp") ; debug
Return iRtn
EndFunction ;HandleCustomAppWindows

Int Function HandleCustomRealWindows(Handle hReal)
;Suppress speech for preview.
var int iRtn, ; debug
	String sFirst

Let sFirst = GetWindowName(GetFirstChild(hReal))
;DebugString("Enter HandleReal " + sFirst) ; debug
;SayString("Enter HandleReal") ; debug
If gfSilencePreview && CheckAudacityVersion ("2,1,2") && DialogActive () && !gfAudacityAutoStarted && (sFirst == WN_PREPARING_PREVIEW || sFirst == WN_PREVIEWING) Then
	;DebugString("GetWindowName of RealWindow: " + GetWindowName(hReal))
	Let gfSilence = True
	;DebugString("Exit HandleReal, starting previewing") ; debug
	Return True
EndIf ;2.1.2 or later
If gfSilence Then
	;DebugString("HandleCustomReal: speech suppressed") ; debug
	Return True
EndIf ; if gfSilence
Let iRtn = HandleCustomRealWindows(hReal)
;SayString("Exit HandleReal") ; debug
;DebugString("Exit HandleReal") ; debug
return iRtn
EndFunction ; HandleCustomRealWindows

/* Debugging functions
void function ProcessSayAppWindowOnFocusChange(handle AppWindow, handle FocusWindow)
Var
	Int OldDebugSay = DebugSay
;DebugString("Enter ProcessSayAppWindowOnFocusChange: App=" + IntToString(AppWindow) + ", focus=" + IntToString(FocusWindow) + ", dlg=" + IntToString(DialogActive())) ; debug
Let DebugSay = False
;DebugString("AppWindow: " + GetTreeInfo(AppWindow))
Let DebugSay = OldDebugSay
ProcessSayAppWindowOnFocusChange(AppWindow, FocusWindow)
;DebugString("Exit ProcessSayAppWindowOnFocusChange") ; debug
EndFunction ;ProcessSayAppWindowOnFocusChange

void function ProcessSayRealWindowOnFocusChange(handle AppWindow, handle RealWindow, string RealWindowName, handle FocusWindow)
Var
	Int OldDebugSay = DebugSay
;SayString("Enter ProcessReal") ; debug
;DebugString("Enter ProcessSayRealWindowOnFocusChange: app=" + IntToString(AppWindow) + ", Real=" + IntToString(RealWindow) + ", focus=" + IntToString(FocusWindow) + ", dlg=" + IntToString(DialogActive())) ; debug
;Let DebugSay = False
;DebugString("RealWindow: " + GetTreeInfo(RealWindow))
;Let DebugSay = OldDebugSay
ProcessSayRealWindowOnFocusChange(AppWindow, RealWindow, RealWindowName, FocusWindow)
;DebugString("Exit ProcessSayRealWindowOnFocusChange") ; debug
;SayString("Exit ProcessReal") ; debug
EndFunction ;ProcessSayRealWindowOnFocusChange
*/

/*
void function ProcessSayFocusWindowOnFocusChange(string RealWindowName, handle FocusWindow)
;SayString("Enter ProcessFocus") ; debug
;DebugString("enter ProcessSayFocusWindow: " + GetWindowName(FocusWindow) + ", " + IntToString(gfSilence)) ; debug
ProcessSayFocusWindowOnFocusChange(RealWindowName, FocusWindow)
;DebugString("Exit ProcessSayFocusWindow") ; debug
;SayString("Exit ProcessSayFocused") ; debug
EndFunction ;processsayfocuswindowonfocuschange
*/
	
Int Function HandleCustomWindows (Handle hFocus)
Var
	Handle hParent,
	Handle hOld,
	Handle hToolbar,
	Handle hTemp,
	Handle hTemp2,
	String sName,
	Int iMSAA_JCFOpt,
	int iRtn

Let gfAudacityAutoStarted = False
;See if Stop being spoken in previewing is an invisible window.
	If !IsWindowVisible(hFocus) Then
	If GetControlID(hFocus) == ID_STOP_BUTTON Then ; debug
		;SayString("invisible stop") ; debug
		Return False ; debug
	EndIf ; debug
	Return True
EndIf ; not visible

	;DebugString("HandleCustom: hFocus=" + IntToString(hFocus) + ", text=" + GetWindowText(hFocus, False) + ", class=" + GetWindowClass(hFocus)) ; debug
If GetWindowClass(hFocus) == "button" && GetWindowText(hFocus, False) == "" Then ; debug
;DebugString("WindowName = " + GetWindowName(hFocus) + ", " + CollectWindowInfo(hFocus)) ; debug
EndIf ; debug
If IsWindowVisible(hFocus) && GetControlID(hFocus) == 5100 Then ; debug
	;SayString("got stop button") ; debug
	;DebugString("GetCustom: hFocus: " + CollectWindowInfo(hFocus) + "Parent: " + CollectWindowInfo(GetParent(hFocus))) ; debug
	;DebugString("HandleFocused, tree of parent of Stop: " + GetTreeInfo(GetParent(hFocus))) ; debug
	;DebugString("HandleCustom: 5100, " + GetWindowName(hFocus) + ", first = " + GetWindowName(GetFirstWindow(hFocus))) ; debug
EndIf ; debug
;SayString("Enter HandleFocus") ; debug
If hFocus != GlobalPrevFocus Then
	;This test keeps this from being executed by SayWindowPromptAndText.
	Let gfInLabel = False
EndIf

; Turn off silencing for preview.
If gfSilence && gfPreviewing Then
    ; stop preview silence
	;DebugString("Turning off preview silence") ; debug
	Let gfSilence = False
    Let gfPreviewing = False
EndIf ; stop preview silence

;Make Jaws read the checkbox and button in the quick settings dialog
Let sName=GetWindowName (GetRealWindow (GetCurrentWindow ()))
If DialogActive ()&&sName=="QuickSettings - audacity" then
	Return
EndIf ;quick settings dialog

If DialogActive () && GetWindowSubtypeCode (hFocus) == WT_LEFTRIGHTSLIDER && GetWindowSubtypeCode (GetPriorWindow(hFocus)) == WT_EDIT Then
	Let ghSliderEdit = GetPriorWindow (hFocus)
	Let hTemp = GetPriorWindow(ghSliderEdit) ; control name
	SayControlEx(hFocus, 
	GetWindowName(hTemp), "",   ; control name, type
	"",   ; control state
	"", "",   ; Container name, type
	"", "",   ; value, position
	"")   ; dialog text
	Return True
ElIf DialogActive () && GetWindowSubtypeCode (hFocus) == WT_LEFTRIGHTSLIDER && GetWindowSubtypeCode (GetPriorWindow(hFocus)) == WT_STATIC && GetWindowSubtypeCode (GetNextWindow(hFocus)) == WT_STATIC Then
	Let ghSliderEdit = GetNextWindow (hFocus)
	Let hTemp = GetPriorWindow(hFocus) ; control name
	SayControlEx(hFocus, 
	GetWindowName(hTemp), "",   ; control name, type
	;"", "", ; name, type
	"",   ; control state
	"", "",   ; Container name, type
	FormatString(msgCompressorSlider, GetObjectValue(hFocus), GetWindowText (ghSliderEdit, False)), "",   ; value, position
	"")   ; dialog text
	Return True
Else
	;this must be executed any time focus moves away from a slider with a monitored edit, even when we exit the dialog
	Let ghSliderEdit = ghNull
EndIf ;else not slider

If !CheckAudacityVersion ("2,1,2") && hFocus == GetAppMainWindow(hFocus) Then
	;Audacity version before 2.1.2.
	;DebugString("previewing " + IntToString(hFocus)) ; debug
    Let gfSilence = True
	;DebugString("suppress focus exit say custom") ; debug
	Return True
EndIf

If DialogActive() && gfSilence && GetControlId(hFocus) == ID_STOP_BUTTON && GetWindowName (hFocus) == WN_STOP_BTN Then
	;DebugString("HandleCustom: got stop button " + GetWindowName(hFocus)) ; debug
	Let gfPreviewing = True
	Return True
EndIf ; stop button

If gfSilence Then
	;DebugString("custom suppressing focus") ; debug
    Return True ; we're doing something like previewing and we don't want focus change stuff spoken
EndIf ; if gfSilence

;Announce when focus changes to a different area of the main window.
If !FocusInMainWindow() Then
	If DialogActive () && GetWindowName(GetFocus()) == cscNULL Then
	;SayString("No window name") ; debug
		Let iMSAA_JCFOpt = GetJCFOption (OPT_MSAA_MODE)
		SetJCFOption (OPT_MSAA_MODE, 2)
		Let sName = GetObjectName()
		SetJCFOption (OPT_MSAA_MODE, iMSAA_JCFOpt)
		SayControlEx(GetFocus (), 
		sName, "",   ; control name, type
		"",   ; control state
		"", "",   ; Container name, type
		"", "",   ; value, position
		"")   ; dialog text
		;SayString("Exit HandleFocus null winname") ; debug
		Return True
	ElIf IsWarningDialog ()&&!CheckAudacityVersion ("2,0,3") then
		SayWindowTypeAndText (GetFocus ())
		;SayString("Exit HandleFocus warning dlg") ; debug
		Return true
	EndIf ; no window name
	;SayString("Calling HandleCustom") ; debug
	Let iRtn = HandleCustomWindows (hFocus) ; not main window, continue with normal processing
	;SayString("Exit HandleFocus not main window") ; debug
	Return iRtn
EndIf ; if ! focus in main window
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
		Return HandleCustomWindows (hFocus)
	EndIf ; if track panel
	; We could also identify the selection by testing for WindowHierarchyX = 3.
	If GetWindowName(GetFirstChild(hParent)) == WN_SELECTION Then
		Say (CS_SelectionBar, OT_position)
	Else
		Say (CS_ToolBars, OT_position)
	EndIf ; else toolbar
EndIf ; new area

If IsToolbar(GetToolbar ()) Then
	Let hToolbar = GetToolbar ()
	If hToolbar != ghAudacityLastToolbar Then
		Let ghAudacityLastToolbar = hToolbar
		If GetQuickSetting ("AnnounceToolbars") Then
			Say(GetWindowName(hToolbar), OT_CONTROL_GROUP_NAME)
		EndIf
	EndIf ; new toolbar
EndIf ; If IsToolbar
Let iRtn = HandleCustomWindows (hFocus) ; allow others to process
;SayString("Exit HandleFocus") ; debug
Return iRtn
EndFunction ; HandleCustomWindows

Void Function SayFocusedObject ()
If gfSilence Then
	Return
EndIf
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
;Returns True if the focused control is in the main window, False otherwise.  Returns False in dialog, menus or context menu.
Var
	Handle hFocus,
	Handle hWnd
	
Let hFocus = GetFocus ()
If (GetWindowName(hFocus) == WN_TRACKPANEL || GetWindowName(GetParent(GetParent(hFocus))) == WN_TOOLDOCK) Then
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
	EndIf
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

Int Function SayPositionField (Int iPosition, Int fSilent)
;Say the specified position field.
;iPosition CTRL ID of the position field: ID_SELECTION_START or ID_SELECTION_END.
;fSilent -- If True does not speak error message if the selection toolbar could not be found.
;Returns True if a position value was found, False if it could not be gotten, in which case it speaks a corresponding message (unless fSilent is True).
;Respects AnnounceMessage.
var
	Handle hWnd,
	String sValue,
	Int iRtn

;If the Announce Messages option is on, speak the selection posision.
If GetQuickSetting ("AnnounceMessage") Then
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iPosition)
	Let sValue=GetPositionField (hWnd) ;get value of desired control
	If !sValue Then ;the selection toolbar is turned off
		If !fSilent Then
			Say (MSGNoSelection, OT_Error)
		EndIf ;if fSilent
		Return False
	Else
		SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sValue, sValue)
	EndIf ;say selection position
EndIf ; AnnounceOn
Return True
EndFunction ;SayPositionField

Script SaySelectionStart ()
;Say the value of the Selection Start field.
;If pressed twice quickly sets focus to it.  (Does not use SayPositionField for this reason.)

Var
	Handle hWnd,
	String sValue
	;I modified this script to make it work on open project only.
If NoProject () Then
	SayNoProject ()
	Return ;exit this script when no project open
ElIf DialogActive ()||MenusActive () Then
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
If !sValue Then ;selection toolbar is turned on
	Say (msgNoSelection, OT_error)
Else
	SayMessage (OT_NO_DISABLE, sValue, sValue)
EndIf
EndScript ; SaySelectionStart

Script SaySelectionEnd ()
;Say the value of the Selection End or Length field.
;If pressed twice quickly sets focus to it.  (Does not use SayPositionField for this reason.)

Var
	Handle hRadio,
	Handle hEnd, ; handle of the edit control
	String sName,
	String sValue,
	Int bIsSelected
	
If NoProject () Then
	SayNoProject ()
	Return
ElIf DialogActive () || MenusActive () Then
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
	If !sValue Then
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

Script AudacityScriptKeyHelp ()
Var
	String sMessage
	
If UserBufferIsActive () Then
	UserBufferDeactivate ()
EndIf
If !IsSameScript () && FocusInMainWindow () Then
	Let sMessage=FormatString (MSGScript_Ver, CS_SCRIPT_VERSION)
	SayFormattedMessage (OT_User_buffer, sMessage)
	SayFormattedMessage (OT_User_Buffer, msgScriptkeyHelp)
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
EndScript ; AudacityScriptKeyHelp

Function ShowJawsGuide()
SayMessage(OT_JAWS_MESSAGE, msgLoadingJawsGuide_L, msgLoadingJawsGuide_S)
run(gsJawsGuideLink)
EndFunction ; ShowJawsGuide

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
	UserBufferAddText(FormatString(msgAudacityHotKeyHelp1, CS_JawsGuide_Title, CS_JawsGuide_Author))
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
EndScript ; AudacityKeysHelp

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
	;Handle hWnd,
	String sScriptName,
	String sMessage
	
If !IsPCCursor () || UserBufferIsActive () || gfInLabel Then
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
If GetQuickSetting ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	SayPositionField (ID_SELECTION_END, True)
EndIf
EndScript ; FinishMarkerRight

Script FinishMarkerLeft ()
Var
	;Handle hWnd,
	String sScriptName,
	String sMessage
	
If !IsPCCursor () || UserBufferIsActive () || !IsStopped () || gfInLabel Then
	PerformScript SelectPriorWord ()
	Return
EndIf

Let sMessage=FormatString (MSGMoveSelection, msgEnd, msgLeft)
Let sScriptName="SelectPriorWord"
MarkerMovement (sScriptName, sMessage)
If GetQuickSetting ("AnnounceMessage") && !NoProject () Then
	pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	SayPositionField (ID_SELECTION_END, True)
EndIf
EndScript ; FinishMarkerLeft

Script StartMarkerRight ()
Var
	;Handle hWnd,
	String sScriptName,
	String sMessage
	
If !IsPCCursor () || UserBufferIsActive () || !IsStopped () || gfInLabel Then
	PerformScript SelectNextWord ()
	Return
EndIf

Let sMessage=FormatString (MSGMoveSelection, msgStart, msgRight)
Let sScriptName="SelectNextWord"
MarkerMovement (sScriptName, sMessage)
If GetQuickSetting ("AnnounceMessage") && !NoProject () Then
	pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	SayPositionField(ID_SELECTION_START, True)
EndIf
EndScript ; StartMarkerRight

Script StartMarkerLeft ()
Var
	;Handle hWnd,
	String sScriptName,
	String sMessage
	
If !IsPCCursor () || UserBufferIsActive () || gfInLabel Then
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
If GetQuickSetting ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	SayPositionField (ID_SELECTION_START, True)
EndIf
EndScript ; StartMarkerLeft

Script JawsHome ()
;If we are speaking an Audacity message, don't speak the key name.
If NoProject () && FocusInTrackPanel () &&!UserBufferIsActive () Then
	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () &&! NoProject () &&!UserBufferIsActive () && !gfInLabel && GetQuickSetting ("AnnounceMessage")Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ;!IsStopped
	JawsHome () ; do Home without speaking key label
	SayFormattedMessage (OT_Position, FormatString (msgMoveTo, msgStart, msgAllAudio))
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
If IsPCCursor () &&FocusInTrackPanel () && !NoProject () &&!UserBufferIsActive () && !gfInLabel && GetQuickSetting ("AnnounceMessage") Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ;!IsStopped
	JAWSEnd () ; do End without speaking key label
	SayFormattedMessage (OT_Position, FormatString (msgMoveTo, msgEnd, msgAllAudio))
	SayPositionField (ID_SELECTION_END, True)
Else
	PerformScript JAWSEnd ()
EndIf
EndScript ; JawsEnd

Script MoveToStartOfSelectedTracks ()
If DialogActive () ||MenusActive () || gfInLabel Then
	;A dialog is open, we are in a menu, or we are writing a label, pass key to application and speak its label.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (MSGMoveTo, msgStart, msgSelectedTracks))
	Pause ()
	SayPositionField (ID_SELECTION_START, True)
EndIf
EndScript ; MoveToStartOfSelectedTracks

Script MoveToEndOfSelectedTracks ()
If DialogActive () ||MenusActive () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (MSGMoveTo, msgEnd, msgSelectedTracks))
	Pause ()
	SayPositionField (ID_SELECTION_START, True)
EndIf
EndScript ; MoveToEndOfSelectedTracks

Script SelectToBeginning ()
;Select to start of selected tracks.
If DialogActive () || MenusActive () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (msgSelectTo, msgStart, msgSelectedTracks))
	Pause ()
	SayPositionField (ID_SELECTION_START, True)
EndIf
EndScript ; SelectToBeginning

Script SelectToEnd ()
;Select to end of tracks.
If DialogActive () || MenusActive () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (msgSelectTo, msgEnd, msgSelectedTracks))
	Pause ()
	SayPositionField (ID_SELECTION_END, True)
EndIf
EndScript ; SelectToEnd

Script SelectFromStartOfLine ()
;Select from current position to the start of all audio.
;We do not use AnnounceKeyMessage so that we can execute the default JAWS script instead of just sending the key on.
If NoProject () Then
	SayNoProject ()
	Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () && !gfInLabel Then
	SelectFromStartOfLine ()
	If GetQuickSetting ("AnnounceMessage") Then ;User can turn off this message
		SayFormattedMessage (OT_No_Disable, FormatString (msgSelectTo, msgStart, msgAllAudio)) ;alerts when user activates this script at the main window, and a project is open
	EndIf
	;Otherwise, perform default script
Else
	PerformScript SelectFromStartOfLine ()
EndIf
EndScript ; SelectFromStartOfLine

Script SelectToEndOfLine ()
;Select from current position to the end of file
;We do not use AnnounceKeyMessage so that we can execute the default JAWS script instead of just sending the key on.
If NoProject () Then
	SayNoProject ()
	Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!UserBufferIsActive ()&&!NoProject () && !gfInLabel Then
	SelectToEndOfLine ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayFormattedMessage (OT_No_Disable, FormatString(msgSelectTo, msgEnd, msgAllAudio))
		Pause ()
		SayPositionField (ID_SELECTION_END, True)
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
ElIf DialogActive () || MenusActive () || gfInLabel Then
	;Pass key to app.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
ElIf FocusInMainWindow () Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ; If not stopped
	TypeCurrentScriptKey ()
	If GetQuickSetting ("AnnounceMessage") Then
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
;If focus is in the main window, a project exists, and audio is selected, the DEL key will delete it.  In this case we perform the script DeleteSelectedAudio.  Otherwise we perform the default script.

If FocusInMainWindow () && !gfInLabel Then
	; (!gfInLabel || !FocusInMainWindow () || IsTrackSelected ()) && (FocusInTrackPanel ()&&!NoProject ())
	PerformScript DeleteSelectedAudio()
Else
	; gfInLabel || NoProject() || ((!FocusInMainWindow () || IsTrackSelected ()) && !FocusInTrackPanel ()) ; ?? not sure these are the right conditions here
	PerformScript JAWSDelete ()
EndIf
EndScript ; JawsDelete

Script JAWSBackspace ()
;This script is similar to the JawsDelete script.
If FocusInTrackPanel ()&&!NoProject () && !gfInLabel Then
	PerformScript DeleteSelectedAudio()
Else
	PerformScript JAWSBackspace()
EndIf
EndScript ; JAWSBackspace

Script SayPriorCharacter ()
;Var
	;Handle hWnd
	
If !userBufferIsActive () && GetQuickSetting ("AnnounceMessage") && IsPCCursor () && FocusInTrackPanel () && IsStopped () && !gfInLabel Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; if no project
	TypeCurrentScriptKey ()
	Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	SayPositionField (ID_SELECTION_START, True) ;silence error message
Else
	PerformScript SayPriorCharacter ()
EndIf
EndScript ; SayPriorCharacter

Script SayNextCharacter ()
;Var
	;Handle hWnd
	
If !userBufferIsActive () && GetQuickSetting ("AnnounceMessage") && IsPCCursor () && FocusInTrackPanel () && IsStopped () && !gfInLabel Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; if no project
	TypeCurrentScriptKey ()
	Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	SayPositionField (ID_SELECTION_START, True) ;silence error message
Else
	PerformScript SayNextCharacter ()
EndIf
EndScript ; SayNextCharacter


Script Copy ()
;Copy selected sound to clipboard in main window.
If !IsTrackSelected () &&!UserBufferIsActive ()&&!DialogActive () && !MenusActive () && !gfInLabel Then
	SayNoTrackSelected ()
	Return
ElIf FocusInMainWindow () && !gfInLabel
&&!UserBufferIsActive () Then ;this third condition makes the default script active in virtual viewer
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; no project
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayUsingVoice (VCTX_Message, msgCopyAudio, OT_status) ;speak alert message
	EndIf ; if AnnounceOn
Else
	;If no project open, or focus in other windows, perform the default script
	PerformScript CopySelectedTextToClipboard ()
EndIf
EndScript ; Copy

Script CutToClipboard ()
If !IsTrackSelected () &&! DialogActive () && !gfInLabel Then
	SayNoTrackSelected ()
	Return
ElIf FocusInMainWindow () && !gfInLabel
&&!UserBufferIsActive () Then ;this third condition makes the default script active in virtual viewer
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; no project
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If GetQuickSetting ("AnnounceMessage") Then
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
RefreshFocus ()
EndScript ; DeselectAll

Void Function RefreshFocus ()
;Refresh the focused window.  Intended for refreshing the track panel after changes that JAWS does not pick up until after refreshing the screen.
Pause ()
RefreshWindow (GetFocus ())
MSAARefresh ()
EndFunction ;RefreshFocused

Script CloseFocusTrack ()
;If this key will close the current track, speak a message, otherwise send to ap normally.
If NoProject () Then
	SayNoProject ()
	Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel () && !gfInLabel Then
	;!UserBufferIsActive () makes the default script active in virtual viewer.
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ; if not Stopped
	AnnounceKeyMessage (msgCloseFocusedTrack)
	RefreshFocus ()
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

Void Function SayActiveLabel ()
;Speak the text of the active label if any.  Assumes focus in track panel.
SaveCursor ()
InvisibleCursor ()
RouteInvisibleToPC ()
;Delay(2)
Pause ()
If FindColors (IgnoreColor, RGBStringToColor ("255255255"), S_NEXT, True) Then
	Say(GetColorField (), OT_LINE)
EndIf
RestoreCursor ()
EndFunction ;SayActiveLabel

Script Tab()
PerformScript Tab()
If !UserBufferIsActive() && !DialogActive() && FocusInTrackPanel() Then
;Force MSAA to be refreshed so JAWS will correctly read current label (in alpha version).
	MSAARefresh()
EndIf
If FocusInTrackPanel () Then
	SayActiveLabel ()
EndIf
EndScript ; Tab

Script ShiftTab()
PerformScript ShiftTab()
If !UserBufferIsActive() && !DialogActive() && FocusInTrackPanel() Then
;Force MSAA to be refreshed so JAWS will correctly read current label (in alpha version).
	MSAARefresh()
EndIf
If FocusInTrackPanel () Then
	SayActiveLabel ()
EndIf
EndScript ; ShiftTab

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
	While hWnd && ( (StringCompare(GetWindowClass(hWnd), WC_wxWindowClass) == 0) ;Pre 2.1.2
	|| (StringCompare(GetWindowClass(hWnd), WC_wxWindowClass2) == 0)
	|| (GetWindowSubtypeCode (hWnd) == WT_STATIC))
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
	Let iState = iState | ST_PAUSE
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
	Let sMsg = sMsg + cScSpace + msgPause
EndIf
Say(sMsg, OT_JAWS_MESSAGE)
EndScript ; SayAudacityState

;/*
;This script causes ENTER to do pause if not stopped, otherwise does normal ENTER.
;If you comment this out you should also comment out entries for keys ENTER and NumPadEnter in the jkm file.  Otherwise, if JAWS is set to treat numpad keys separately, not commenting out these entries will cause Audacity to see both keys as standard ENTER.
Script Enter ()
;SayString (GetCurrentScriptKeyName ()) ; debug
If gfInLabel Then
	Let gfInLabel = False
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf ; if gfInLabel
If FocusInMainWindow () && !IsStopped () && GetQuickSetting("EnterPause") Then
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

Script CtrlEnter ()
;SayString (GetCurrentScriptKeyName ()) ; debug
If FocusInMainWindow () && !IsStopped () && !gfInLabel && GetQuickSetting("EnterPause") Then
	TypeKey (cksEnter)
	Say(cksEnter, OT_KEYBOARD)
Else
	;Not pause
	If UserBufferIsActive () Then
		PerformScript ControlEnter ()
	Else
		SayCurrentScriptKeyLabel ()
		TypeCurrentScriptKey ()
	EndIf ; else user buffer not active
EndIf ; else not pause
EndScript ; CtrlEnter
;*/


Script OpenListBox ()
;If focus is in the track panel, pass the key through.
Var Int iRtn ; debug
If FocusInTrackPanel() Then
    ;SayString("move track down") ; debug
    SayCurrentScriptKeyLabel ()
    TypeCurrentScriptKey ()
    ;If iRtn Then SayString("success") ; debug
else
    PerformScript OpenListBox ()
EndIf
EndScript ;OpenListBox

Script CloseListBox ()
;If focus is in the track panel, pass the key through.
If FocusInTrackPanel() Then
    ;SayString("move track up") ; debug
    SayCurrentScriptKeyLabel ()
    TypeCurrentScriptKey ()
Else
    PerformScript CloseListBox ()
EndIf
EndScript ;CloseListBox

Int Function IsDigits(String s)
;Returns True if all of the characters in s are digits, +, or -.
Var
	String s2

Let s2 = StringStripAllBlanks(StringReplaceChars(s, "+-0123456789", " "))
;SayString("IsDigits(" + s + "), s2 = " + s2 + ", returning " + IntToString(StringLength(s2))) ; debug
Return StringLength(s2) == 0
EndFunction ;IsDigits

Void Function NavigateTrackPanel (String sDest, String sUpKey, String sDownKey)
;sDest: string containing the number of the track to move to.  If starts with + move down that many tracks, if -, move up that many tracks.  If it would move beyond the first or last track its value is adjusted acordingly.
;sUpKey: string containing name of key to move up (to lower numbered tracks).
;sDownKey: string containing name of key to move down (to higher numbered tracks).
;Assumes focus in track panel.
Var
	Object o,
	int iNum,
	Int iStart,
	Int iMax,
	Int iCount,
	Int fSilence,
	String sKey,
	String s

Let iStart = GetFocusObject (0).accFocus
Let iMax = GetFocusObject (0).accChildCount
;SayString ("iNum = " + IntToString (iNum) + ", iStart = " + IntToString (iStart) + ", iMax = " + IntToString(iMax)) ; debug
Let sDest = StringStripAllBlanks(sDest)
If ! IsDigits(sDest) Then
	Return
EndIf ; if not digits, +, or -
Let s = StringLeft(sDest, 1)
Let iNum = StringToInt(sDest)
If !(s == "+" || s == "-") Then
	;Absolute
	Let iNum = iNum - iStart
EndIf ; if absolute
;SayString ("iNum = " + IntToString (iNum) + ", iStart = " + IntToString (iStart) + ", iMax = " + IntToString(iMax)) ; debug
;Clamp to limits
If iStart + iNum > iMax Then
	Let iNum = iMax -iStart
	;SayString ("> iMax, now " + IntToString(iNum)) ; debug
ElIf iStart + iNum < 1 Then
	Let iNum = 1 - iStart
EndIf
Let iCount = abs(iNum)
if iNum < 0 Then
	Let sKey = sUpKey
Else
	Let sKey = sDownKey
EndIf
Let fSilence = gfSilence
Let gfSilence = True
While iCount > 0
	TypeKey(sKey)
	If iCount % 3 == 0 Then
		delay(1)
	EndIf
	Let iCount = iCount - 1
EndWhile
Pause()
	Let gfSilence = fSilence

EndFunction ;NavigateTrackPanel

Script GoToTrack ()

Var
	String s

If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf

If InputBox(msgTrackNumber, msgGoToTrackTitle, s) Then
	Pause ()
	NavigateTrackPanel (s, gsGoTrackUpKey, gsGoTrackDownKey)
	SayFocusedObject ()
EndIf ; InputBox

EndScript ;GoToTrack

Script MarkTrack ()
If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf

Let giTrackMark = GetFocusObject (0).accFocus
SayMessage (OT_JAWS_MESSAGE, FormatString (msgTrackMarked, IntToString (giTrackMark)))
EndScript ;MarkTrack

Script GoToMarkedTrack ()
If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If giTrackMark <= 0 Then
	SayMessage(OT_JAWS_MESSAGE, msgNoTrackMarked)
	Return
EndIf ; no mark
NavigateTrackPanel (IntToString(giTrackMark), gsGoTrackUpKey, gsGoTrackDownKey)
SayFocusedObject ()
EndScript ;GoToMarkedTrack

Script ExchangeWithMark ()
Var
	Int iStartTrack

If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf

If giTrackMark <= 0 Then
	SayMessage(OT_JAWS_MESSAGE, msgNoTrackMarked)
	Return
EndIf ; no mark

Let iStartTrack = GetFocusObject (0).accFocus
NavigateTrackPanel (IntToString(giTrackMark), gsGoTrackUpKey, gsGoTrackDownKey)
SayFocusedObject ()
Let giTrackMark = iStartTrack
EndScript ;ExchangeWithMark

Script MoveCurrentTrackTo ()

Var
	String s

If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf

If InputBox(msgTrackNumber, msgMoveTrackToTitle, s) Then
	Pause ()
	NavigateTrackPanel (s, gsMoveTrackUpKey, gsMoveTrackDownKey)
	SayFocusedObject ()
EndIf ; InputBox

EndScript ; MoveCurrentTrackTo

Script MoveCurrentTrackToMark ()
Var
	Int iStartTrack

If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf

If giTrackMark <= 0 Then
	SayMessage(OT_JAWS_MESSAGE, msgNoTrackMarked)
	Return
EndIf ; no mark

Let iStartTrack = GetFocusObject (0).accFocus
NavigateTrackPanel (IntToString(giTrackMark), gsMoveTrackUpKey, gsMoveTrackDownKey)
SayFocusedObject ()
Let giTrackMark = iStartTrack
EndScript ;MoveCurrentTrackToMark

Script MoveTrackUp ()
Var
	Object o,
	String s

;SayCurrentScriptKeyLabel ()
If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
Let o = GetFocusObject(0)
If o.accFocus == 1 Then
	Return
EndIf
Let s = o.accName (o.accFocus - 1)
TypeCurrentScriptKey ()
Say (s, OT_LINE)

EndScript

Script MoveTrackDown ()
Var
	Object o,
	String s

;SayCurrentScriptKeyLabel ()
If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
Let o = GetFocusObject(0)
If o.accFocus == o.AccChildCount Then
	Return
EndIf
Let s = o.accName (o.accFocus + 1)
TypeCurrentScriptKey ()
Say (s, OT_LINE)

EndScript

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
/*To add a new option:
In audacity.qs copy an existing setting (from <setting through </setting>) element and change the ID and Name attributes appropriately.  (I didn't think you could include spaces in attribute values, but it seems to work.)
In audacity.qsm copy an existing DisplayName element (from <DisplayName through </DisplayName>).  The value of the ID attribute needs to match exactly that of the corresponding Setting element in audacity.qs.  The value of the Text attribute is the text shown in the QuickSettings list and the text in the line between <HelpMsg> and </HelpMsg> is the text of the setting help.
To support JAWS prior to V13:
Copy the two functions UOOptionName and UOOptionNameHlp for an option below, changing OptionName to the new option name in the copy.
In AdjustJawsOptions add UO_OPTION_NAME to variable strListOfOptions.
In audacity.jsm add a UO_OPTION_NAME constant and a msgUO_OptionNameHlp message.  UO_OPTION_NAME is a string containing the function name UOOptionName, a colon, and the text that appears in the text attribute of the DisplayName element in audacity.qsm.  The value of msgUOOptionName is the line from the HelpMsg element in audacity.qsm.
*/

Script AdjustJawsVerbosity ()
;This is to support JAWS versions that do not support tree-style user options.  This should work but may not look very nice.  Not tested!
Var
	String strListOfOptions
	
;Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS
Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS + _DLG_SEPARATOR + UO_ENTER_PAUSE + _DLG_SEPARATOR + UO_SILENCE_PREVIEW + _DLG_SEPARATOR + UO_SILENCE_RECORD
JawsVerbosityCore (strListOfOptions)
EndScript ; AdjustJawsVerbosity

Script AdjustJAWSOptions ()
Var
	String strListOfOptions
If InHJDialog () Then
	SayFormattedMessage (OT_error, cMSG337_L, cMSG337_S)
	Return
EndIf
Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS + _DLG_SEPARATOR + UO_ENTER_PAUSE + _DLG_SEPARATOR + UO_SILENCE_PREVIEW + _DLG_SEPARATOR + UO_SILENCE_RECORD
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

String Function UOAnnounceMessages (Int iRetCurVal)
Var
	Int iVal
Let iVal = IniReadInteger (gsIniSection, "AnnounceMessage", CI_MESSAGES_OFF, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_MESSAGES_FULL Then
		Let iVal = CI_MESSAGES_OFF
	Else
		; This paves the way for multiple values.
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "AnnounceMessage", iVal, CS_INI_FILE)
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
	
Let iVal = IniReadInteger (gsIniSection, "Announcetoolbars", CI_TOOLBARS_OFF, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_TOOLBARS_ON Then
		Let iVal = CI_TOOLBARS_OFF
	Else
		; This paves the way for multiple values.
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "Announcetoolbars", iVal, CS_INI_FILE)
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
	
Let iVal = IniReadInteger (gsIniSection, "EnterPause", CI_ENTERPAUSE_ON, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_ENTERPAUSE_ON Then
		Let iVal = CI_ENTERPAUSE_OFF
	Else
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "EnterPause", iVal, CS_INI_FILE)
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

String Function UOSilencePreview (Int iRetCurVal)
Var
	Int iVal
	
Let iVal = IniReadInteger (gsIniSection, "SilencePreview", CI_UO_ON, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_UO_ON Then
		Let iVal = CI_UO_OFF
	Else
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "SilencePreview", iVal, CS_INI_FILE)
EndIf ; if !iRetCurVal
If iVal == CI_UO_OFF Then
	Return cmsg_Off
ElIf iVal == CI_UO_ON Then
	Return cmsg_On
EndIf
EndFunction ; UOSilencePreview

String Function UOSilencePreviewHlp ()
Return msgUO_SilencePreviewHlp
EndFunction ; UOSilencePreviewHlp

String Function UOSilenceRecord (Int iRetCurVal)
Var
	Int iVal
	
Let iVal = IniReadInteger (gsIniSection, "SilenceRecord", CI_UO_ON, CS_INI_FILE)
If !iRetCurVal Then
	If iVal == CI_UO_ON Then
		Let iVal = CI_UO_OFF
	Else
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "SilenceRecord", iVal, CS_INI_FILE)
EndIf ; if !iRetCurVal
If iVal == CI_UO_OFF Then
	Return cmsg_Off
ElIf iVal == CI_UO_ON Then
	Return cmsg_On
EndIf
EndFunction ; UOSilenceRecord

String Function UOSilenceRecordHlp ()
Return msgUO_SilenceRecordHlp
EndFunction ; UOSilenceRecordHlp

Void Function AddDefaultConfig ()
;Adds values of default settings to Audacity.JSI File.  
IniWriteInteger (gsIniSection, "AnnounceMessage", CI_MESSAGES_FULL, gsIniFile, False) ; don't flush because we're going to write another one
IniWriteInteger (gsIniSection, "EnterPause", CI_ENTERPAUSE_ON, gsIniFile, False) ; don't flush because we're going to write another one
IniWriteInteger (gsIniSection, "AnnounceToolbars", CI_TOOLBARS_ON, gsIniFile, False) ; no flush
IniWriteInteger (gsIniSection, "SilencePreview", CI_UO_ON, gsIniFile, False) ; no flush
IniWriteInteger (gsIniSection, "SilenceRecord", CI_UO_ON, gsIniFile, False) ; no flush
IniWriteString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK, gsIniFile, True)
Let gsJawsGuidelink = CS_JawsGuide_LINK
;Let gsJawsGuideTitle = CS_JawsGuide_Title
EndFunction ; AddDefaultConfig

Script ResetConfig ()
;Reset all audacity JAWS script options to their default values.
Var
	String sMessage
	
	;First we remove the old key because of our changes in Audacity.JSI file made by script v1.1.
If GetJFWVersion()<1300000 && FileExists (FindJAWSPersonalizedSettingsFile (CS_INI_FILE, True)) Then
	;Remove obsolete key if it exists.
	Let sMessage=IniReadString (gsIniSection, "announce", "", CS_INI_FILE) ;the old key "anounce" has been changed to "AnnounceMessage"
	If sMessage Then
		IniRemoveKey (gsIniSection, "announce", CS_INI_FILE, false)
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
ElIf FocusInMainWindow () && ! NoProject () && !gfInLabel && GetQuickSetting ("AnnounceMessage") Then
	SayUsingVoice (VCTX_Message, MsgSelectAll, OT_String)
	RefreshFocus ()
EndIf
EndScript ; SelectAll

Script SelectInAllTracks ()
;Perform the Audacity Select In All Tracks keystroke.  (This command selects the current time range in all tracks.)
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgSelectInAllTracks)
EndIf
RefreshFocus ()
EndScript ; SelectInAllTracks

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
;Var
	;Handle hWnd
	
TypeCurrentScriptKey ()
If !UserBufferIsActive ()&&FocusInTrackPanel () && NoProject () Then
	SayNoProject ()
	Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel () && !gfInLabel && GetQuickSetting ("AnnounceMessage") && IsStopped () Then
	Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	SayPositionField (ID_SELECTION_START, True)
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
	SayMessage (OT_error, msgNoTrackSelected_L, msgNoTrackSelected_S)
EndIf ;No project
EndFunction ; SayNoTrackSelected

Int Function IsWarningDialog ()
;Verify that focus is in the warning dialog that appears when importing uncompressed audio files.
Var
	String sName
	
Let sName = GetWindowName (GetFocus ())
If DialogActive ()
&& (sName==MsgCopy
||sName==MSGDirectEdit
||sName==MSGDoNotWarn) Then
	Return TRUE
EndIf ;dialog active
EndFunction ; IsWarningDialog

Script SayLine ()
If IsWarningDialog () && IsPCCursor () && Not UserBufferIsActive () && !CheckAudacityVersion ("2,0,3") Then ;we are in the warning dialog for importing uncompressed audio
	SayWindowTypeAndText (GetFocus ())
Else
	; Not at this dialog, performs default funtionality
	If IsPCCursor () && NoProject () && FocusInTrackPanel () Then
		SayNoProject ()
		Return
	EndIf ; if no project
	PerformScript SayLine()
	If !UserBufferIsActive () && IsPCCursor () && FocusInTrackPanel () Then
		Say (FormatString (msgTrackPosition, IntToString (GetFocusObject (0).accFocus), IntToString (GetFocusObject (0).accChildCount)), OT_POSITION)
	EndIf
EndIf
EndScript ; SayLine

Script SayPriorLine ()
Let gfInLabel = False
If IsPCCursor () && NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project
PerformScript SayPriorLine ()
EndScript ;SayPriorLine


Script SayNextLine ()
Let gfInLabel = False
If IsPCCursor () && NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project
PerformScript SayNextLine ()
EndScript ;SayNextLine

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
If CheckAudacityVersion ("2,0,4") then ;The control ID of Change CMD has changed since Audacity 2.0.4. So we add this condition to varify that.
    ;SayString("Finding chain commands") ; debug
		Let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Chain_Cmds_List2)
Else
		Let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Chain_Cmds_List)
EndIf ;Check Audacity version
		Let sMessage=msgChainCommands ;list of commands in the right list
	Else
		Let wnd=FindDescendantWindow (hReal, ID_Chains_List)
		Let sMessage=msgChains ;list of chains in the left list
	EndIf ; Else neither list.
	;SayString("Focus to " + IntToString(wnd)) ; debug
	SetFocus (wnd)
	;speaks a message when switching between the listss
	If GetQuickSetting ("AnnounceMessage") Then
		SayUsingVoice (VCTX_message, sMessage, ot_String)
	EndIf
Else
	;Not Edit Chains dialog
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ;Else not Edit Chains dialog
EndScript ; SwitchChainsList

Script PasteFromClipboard ()
;Speaks a warning message when not stopped
If DialogActive () || MenusActive () || gfInLabel Then
	;I don't think we need to worry about menus, but check just in case.
	PerformScript PasteFromClipboard ()
	Return
EndIf
;Not in a dialog or menu.
/*
This should be removed because we can paste audio without opening a project.
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
*/
If !IsStopped () then
	SayNotStopped ()
	Return
Else
	PerformScript PasteFromClipboard ()
EndIf 
EndScript ; PasteFromClipboard

Script SayRecordingMeter()
	var String s,
	Handle hTemp,
	Handle hParent
If DialogActive () || !FocusInMainWindow () || gfInLabel Then
	TypeCurrentScriptKey ()
	SayCurrentScriptKeyLabel ()
	Return
EndIf
Let hTemp = GetFirstChild (GetAppMainWindow (GetFocus()))
Let hParent = GetNextWindow (hTemp) ; parent of toolbars
If GetAudacityState () & ST_PLAY Then
	;playback
	Let hTemp = FindDescendantWindow (hParent, ID_PLAYBACK_METER)
	If !hTemp || !IsWindowVisible (hTemp) Then
		Let hTemp = FindDescendantWindow (hParent, ID_PLAYBACK_METER_COMBINED)
	EndIf
	If !hTemp || !IsWindowVisible (hTemp) Then
		Say (msgNoPlaybackMeter, OT_Error)
		Return
	EndIf ; if no playback meter
Else
	;Recording
	Let hTemp = FindDescendantWindow (hParent, ID_RECORDING_METER)
	If !hTemp || !IsWindowVisible (hTemp) Then
		Let hTemp = FindDescendantWindow (hParent, ID_RECORDING_METER_COMBINED)
	EndIf
	If !hTemp || !IsWindowVisible (hTemp) Then
		Say (MSGNoRecordingMeter, OT_Error)
		Return
	EndIf ; if no recording meter
EndIf ;else recording meter
If IsSameScript () Then
	SetFocus (hTemp)
	Return
EndIf
SaveCursor ()
InvisibleCursor ()
MoveToWindow(hTemp)
Pause ()
Let s = GetObjectName (0)
RestoreCursor ()
Say (s, OT_SCREEN_MESSAGE)
EndScript ;SayMeter
	
Script SayPlaybackMeter()
	var String s,
	Handle hTemp,
	Handle hParent
If DialogActive () || !FocusInMainWindow ()  || gfInLabel Then
	TypeCurrentScriptKey ()
	SayCurrentScriptKeyLabel ()
	Return
EndIf
Let hTemp = GetFirstChild (GetAppMainWindow (GetFocus()))
Let hParent = GetNextWindow (hTemp) ; parent of toolbars
Let hTemp = FindDescendantWindow (hParent, ID_PLAYBACK_METER)
If !hTemp || !IsWindowVisible (hTemp) Then
	Let hTemp = FindDescendantWindow (hParent, ID_PLAYBACK_METER_COMBINED)
EndIf
If !hTemp || !IsWindowVisible (hTemp) Then
	Say (msgNoPlaybackMeter, OT_Error)
	Return
EndIf
If IsSameScript () Then
	SetFocus (hTemp)
	Return
EndIf
SaveCursor ()
InvisibleCursor ()
MoveToWindow(hTemp)
Pause ()
Let s = GetObjectName (0)
RestoreCursor ()
Say (s, OT_SCREEN_MESSAGE)
EndScript ;SayPlaybackMeter
	
Script ShowCopyright()
SayMessage(OT_USER_BUFFER, msgCopyright)
EndScript ; ShowCopyright

Int Function CheckAudacityVersion (String sCheckVer)
;return True if program version in sCheckVer is >= the version of Audacity.  SCheckver is in the form "major,minor,build,fix".  Trailing segments may be omitted, in which case they are not checked.
Var
	String sVersion, ;get the version
	Int iMax,
	Int iCounter,
	Int fRes,
	Int iTemp,
	Int iTemp2
	;Now check current version number
Let sVersion = GetVersionInfoString (GetAppFilePath (), "FileVersion")
Let iMax = StringSegmentCount (sVersion, ",")
Let iTemp = StringSegmentCount (sCheckVer, ",")
If iTemp < iMax Then
	Let iMax = iTemp
EndIf

Let fRes = True
Let iCounter = 1
While fRes && iCounter <= iMax
	Let iTemp = StringToInt(StringSegment(sVersion, ",", iCounter))
	Let iTemp2 = StringToInt(StringSegment(sCheckVer, ",", iCounter))
	If iTemp > iTemp2 Then
		Return True
	ElIf iTemp < iTemp2 Then
		Return False
	EndIf
	;Equal
	Let iCounter = iCounter + 1
EndWhile
Return True
EndFunction ; CheckAudacityVersion

Script test ()
;Test FocusInMainWindow
Var String s,
	Handle hTemp
	/*
SayString("FocusInMainWindow = " + IntToString(FocusInMainWindow ())) ; debug
*/
	;Test CheckAudacityVersion.
/*
Let s = "testing 2,0,3, got " + IntToString(CheckAudacityVersion("2,0,3")) + ", should get True\n"
Let s = s + "testing 2,0,4, got " + IntToString(CheckAudacityVersion("2,0,4")) + ", should get True\n"
Let s = s + "testing 2,0,5, got " + IntToString(CheckAudacityVersion("2,0,5")) + ", should get True\n"
Let s = s + "testing 2,1,1, got " + IntToString(CheckAudacityVersion("2,1,1")) + ", should get True\n"
Let s = s + "testing 2,1,5, got " + IntToString(CheckAudacityVersion("2,1,5")) + ", should get false\n"
SayMessage(OT_USER_BUFFER, s)
*/
/*
Let s = "gfSilence = " + IntToString(gfSilence)
;Let s = IntToString(GetJFWVersion())
SayMessage(OT_USER_BUFFER, s)
*/
;Say number of focused track
;SayInteger(GetFocusObject(0).accFocus) ; debug
If FocusInTrackPanel() Then
    /*
    If InputBox("track number:", "go to", s) Then
		var object o = GetFocusObject(0), int rtn
		var int iNum, Int iStart, Int iMove, Int iCount, Int fSilence, String sUp, String sDown, String sKey
		iNum = StringToInt(s)
		sUp = "UpArrow"
		sDown = "DownArrow"
		;SayString("going to " + IntToString(iNum))
		iCount = abs(iNum)
		if iNum < 0 Then
			sKey = sUp
		Else
			sKey = sDown
		EndIf
		fSilence = gfSilence
		gfSilence = True
		Let giScheduleClearSilence = ScheduleFunction("ClearSilence", 5)
		Pause()
		While iCount > 0
			TypeKey("Alt+" + sKey)
			If iCount % 3 == 0 Then
				delay(1)
			EndIf
			iCount = iCount - 1
		EndWhile
		Pause()
		gfSilence = fSilence
		SayObjectActiveItem()
		;rtn = o.AccSelect(SELFLAG_TAKEFOCUS, iNum)
		;SayString("returned " + IntToString(rtn))
		
    EndIf ; InputBox
    */
    /*; get focused object rectangle.
    var object o, int ix, int iYTop, int iWidth, int iHeight
    o = GetFocusObject(0)
    o.accLocation(IntRef(ix), IntRef(iYTop), IntRef(iWidth), IntRef(iHeight), o.accFocus)
    ;SayString("x = " + IntToString(iX) + ", y = " + IntToString(iYTop) + ", width = " + IntToString(iWidth) + ", height = " + IntToString(iHeight))
    */
	;Test getting record meter value.
	Let hTemp = GetFirstChild (GetAppMainWindow (GetFocus()))
Let hTemp = GetNextWindow (hTemp) ; parent of toolbars
Let hTemp = FindDescendantWindow (hTemp, ID_RECORDING_METER)
If !hTemp Then
	SayString("Can't find recording meter")
	Return ST_NOTOOLBAR
EndIf ; if no transport toolbar
	;SayString(GetWindowName(hTemp))
	SaveCursor ()
	InvisibleCursor ()
	MoveToWindow(hTemp)
	Pause ()
	Let s = GetObjectName (0)
	SayString(s)
	RestoreCursor ()

EndIf ; in track panel
;SayString ("FocusInTrackPanel = " + IntToString(FocusInTrackPanel())) ; debug
EndScript ; test

Void Function loadNonJCFOptions ()
;This function is used by the QuickSettings facility, support for Jaws 13 and later
Var
String NonJCF ;the section for storing settings within the JCF file
Let NonJCF="NonJCFOptions"
;Now read the info from the NonJCFOptions section of Audacity.jcf.
;The value following the key name is the default value.
Let AnnounceMessage=IniReadInteger (NonJCF, "AnnounceMessage", CI_MESSAGES_FULL, "Audacity.jcf")
Let AnnounceToolbars=IniReadInteger (NonJCF, "AnnounceToolbars", CI_TOOLBARS_ON, "audacity.jcf")
Let gfEnterPause=IniReadInteger (NonJCF, "EnterPause", CI_ENTERPAUSE_ON, "audacity.jcf")
Let gfSilencePreview = IniReadInteger (NonJCF, "SilencePreview", CI_UO_ON, "audacity.jcf")
Let gfRecordSpeechOff=IniReadInteger (NonJCF, "SilenceRecord", CI_UO_ON, "audacity.jcf")
;The disadvantage of storing these in globals is that you have to shut down and restart JAWS to make changes to an externally edited config file take effect.  This could be avoided by reading from the config file when the values are needed.  Because of the complexity of decoding this value, I choose to use globals despite this disadvantage.  One could also decrease the complexity by using a second key for the title.
/*
Commented the title part of this feature out because it could make the hot key help claim it is for a different version of the guide than it was taken from.
Let sTemp = StringTrimTrailingBlanks (IniReadString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK + cScSpace + CS_JawsGuide_TITLE , "audacity.jcf"))
Let iTemp = StringContains (sTemp, cScSpace)
If iTemp Then
;We found a space and it's not the last character.
Let gsJawsGuideLink = StringLeft (sTemp, iTemp - 1)
Let gsJawsGuideTitle = StringRight(sTemp, StringLength (sTemp) - iTemp)
Else
Let gsJawsGuideLink = sTemp
Let gsJawsGuideTitle = CS_JawsGuide_Title
EndIf ; else no space
*/

Let gsJawsGuideLink = StringTrimTrailingBlanks (IniReadString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK, "audacity.jcf"))
/* Commented out because we aren't supporting the JSI file for versions that have Quick Settings.
;Write the info above to Audacity.JSI file
IniWriteInteger (gsIniSection, "AnnounceMessage", AnnounceMessage, gsIniFile, false)
IniWriteInteger (gsIniSection, "EnterPause", gfEnterPause, gsIniFile, false)
IniWriteInteger (gsIniSection, "SilencePreview", gfSilencePreview, gsIniFile, False)
IniWriteInteger (gsIniSection, "SilenceRecord", gfRecordSpeechOff, gsIniFile, False)
IniWriteInteger (gsIniSection, "AnnounceToolbars", AnnounceToolbars, gsIniFile, true)
*/
;The condition below got from JAWS Scripts for Foobar 2000 (written by Andrew Hart)
If GetJFWVersion()<1300000 Then
	Return ; prevent loadNonJCFOptions from chaining to itself since it doesn't exist in JAWS version prior to 13.0
EndIf ;Get JFW
loadNonJCFOptions ()
EndFunction ;LoadNonJCFOptions

Script AddAudacityJawsGuide ()
;Script for adding new Jaws Guide link if present
Var
String sURL, ;The current URL gotten from the JSI file
String sTemp, ;store current URL
String sNewURL ;The New URL added by user
Let sURL=IniReadString (gsIniSection, "JAWSGuideLink", sURL, gsIniFile) ;get the URL from settings file
	If StringIsBlank(sUrl) Then
	;Set default
	Let sUrl = CS_JawsGuide_LINK
	EndIf
Let sTemp=sURL ;store current URL
;Now display the input box wich contains the Current URL, and allows changing it
InputBox (MSGJawsGuideDialog, "Add Audacity Jaws Guide Link", sURL)
Let sNewURL=sURL ;get the URL from the box.
If StringIsBlank (sNewURL) 
|| sNewURL==sTemp then ;user doesn't enter anything, or the URL from the box and the original URL are the same.
	SayFormattedMessage (OT_Jaws_Message, MSGNoChange_l, msgNoChange_s)
Return
ElIf sNewURL != sTemp then
    Let gsJawsGuideLink = sNewURL
    IniWriteString (gsIniSection, "JAWSGuideLink", gsJawsGuideLink, gsIniFile, true)
	SayFormattedMessage (OT_Jaws_message, FormatString (msgNewURL, sNewURL))
EndIf
EndScript ;AddAudacityJawsGuide

Script Record ()
;Don't speak Record or Record-Append keys.
If DialogActive () ||MenusActive () || gfInLabel Then
	;A dialog is open or we are writing a label, pass key to application and speak its label.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
Else
	If gfRecordSpeechOff == 1 then
		;Stop Jaws from saying: "track 1, track 2, etc
		Let gfSilence = True
		TypeCurrentScriptKey ()
		Let giScheduleClearSilence = ScheduleFunction("ClearSilence", 5)
	Else
		;gfRecordSpeechOff != 1
		SayCurrentScriptKeyLabel ()
		TypeCurrentScriptKey ()
	EndIf ; else iRecord!=1
EndIf ;else not (DialogActive () ||MenusActive ())
EndScript ; Record

Void Function ClearSilence()
;Clear the gfSilence Flag.  Used to schedule silencing to be terminated.
Let gfSilence = False
	Let giScheduleClearSilence = 0
EndFunction ;ClearSilence

Script AddLabelAtSelection ()
If FocusInMainWindow () Then
	Let gfInLabel = True
EndIf
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
;The following types key, says label, and speaks message.  Comment out last 2 lines if you use it.
;AnnounceKeyMessage (msgAddLabel)
EndScript ; AddLabelAtSelection

Script AddLabelAtPlayPosition ()
If NoProject () then
	SayNoProject ()
	Return
EndIf ;No project
If !IsStopped () Then
	Let gfInLabel = True
EndIf ; if not stopped
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
;The following types key, says label, and speaks message.  Comment out last 2 lines if you use it.
;AnnounceKeyMessage (msgAddLabelPlaying)
EndScript ; AddLabelAtPlayPosition

;*** More scripts for Audacity keys
Script ZoomNormal ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgZoomNormal)
EndIf
EndScript ; ZoomNormal

Script ZoomIn ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgZoomIn)
EndIf
EndScript ; ZoomIn

Script ZoomOut ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgZoomOut)
EndIf
EndScript ; ZoomOut

Script MuteAllTracks ()
If NoProject () Then
	;This isn't disabled with no project but I can't see that it can do anything.
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgMuteAllTracks)
EndIf
RefreshFocus ()
EndScript ; MuteAllTracks

Script UnmuteAllTracks ()
If NoProject () Then
	;This isn't disabled with no project but I can't see that it can do anything.
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgUnmuteAllTracks)
EndIf
RefreshFocus ()
EndScript ; UnmuteAllTracks

Script ReplaceWithSilence ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgReplaceWithSilence)
EndIf
EndScript ; ReplaceWithSilence

Script ZeroCrossing ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgZeroCrossing)
EndIf
EndScript ; ZeroCrossing

Script ImportAudio ()
;Import audio
If !IsStopped () Then
	SayNotStopped ()
	Return
EndIf ; If not stopped
AnnounceKeyMessage (msgImportAudio)
EndScript ; ImportAudio

Script ExportAudio ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ; If not stopped
	AnnounceKeyMessage (msgExportAudio)
EndIf
EndScript ; ExportAudio

Script NewWindow ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
	Return
EndIf
AnnounceKeyMessage (msgNewWindow)
EndScript ; NewWindow

Script SaveProject ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgSaveProject)
EndIf
EndScript ; SaveProject

Script Preferences ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
	Return
EndIf
AnnounceKeyMessage (msgPreferences)
EndScript ; Preferences

Script Duplicate ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgDuplicate)
EndIf
EndScript ; Duplicate

Script Trim ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgTrim)
EndIf
EndScript ; Trim

Script ExportMultiple ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgExportMultiple)
EndIf
EndScript ; ExportMultiple

Script SplitCut ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitCut)
EndIf
EndScript ; SplitCut

Script SplitDelete ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitDelete)
EndIf
EndScript ; SplitDelete

Script PasteNewLabel ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgPasteNewLabel)
EndIf
EndScript ; PasteNewLabel

Script Split ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplit)
EndIf
EndScript ; Split

Script SplitNew ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitNew)
EndIf
EndScript ; SplitNew

Script Join ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgJoin)
EndIf
EndScript ; Join

Script Disjoin ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgDisjoin)
EndIf
EndScript ; Disjoin

Script CutLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgCutLabels)
EndIf
EndScript ; CutLabels

Script DeleteLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgDeleteLabels)
EndIf
EndScript ; DeleteLabels

Script SplitCutLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitCutLabels)
EndIf
EndScript ; SplitCutLabels

Script SplitDeleteLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitDeleteLabels)
EndIf
EndScript ; SplitDeleteLabels

Script SilenceLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSilenceLabels)
EndIf
EndScript ; SilenceLabels

Script CopyLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgCopyLabels)
EndIf
EndScript ; CopyLabels

Script SplitLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitLabels)
EndIf
EndScript ; SplitLabels

Script JoinLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgJoinLabels)
EndIf
EndScript ; JoinLabels

Script DisjoinLabels ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgDisjoinLabels)
EndIf
EndScript ; DisjoinLabels

Script ToggleSpectralSelection ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgToggleSpectralSelection)
EndIf
EndScript ; ToggleSpectralSelection

Script SelSyncLockTracks ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSelSyncLockTracks)
EndIf
EndScript ; SelSyncLockTracks

Script ZoomSel ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgZoomSel)
EndIf
EndScript ; ZoomSel

Script FitInWindow ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgFitInWindow)
EndIf
EndScript ; FitInWindow

Script FitV ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgFitV)
EndIf
EndScript ; FitV

Script GoSelStart ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgGoSelStart)
EndIf
EndScript ; GoSelStart

Script GoSelEnd ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgGoSelEnd)
EndIf
EndScript ; GoSelEnd

Script CollapseAllTracks ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgCollapseAllTracks)
EndIf
EndScript ; CollapseAllTracks

Script ExpandAllTracks ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgExpandAllTracks)
EndIf
EndScript ; ExpandAllTracks

Script PlayLooped ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgPlayLooped)
EndIf
EndScript ; PlayLooped

Script NewMonoTrack ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgNewMonoTrack)
EndIf
EndScript ; NewMonoTrack

Script MixAndRenderToNewTrack ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgMixAndRenderToNewTrack)
EndIf
EndScript ; MixAndRenderToNewTrack

Script RepeatLastEffect ()
If NoProject () Then
	SayNoProject ()
	Return
ElIf FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgRepeatLastEffect)
EndIf
EndScript ; RepeatLastEffect

Script FirstTrack ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgFirstTrack)
EndIf
EndScript ; FirstTrack

Script LastTrack ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgLastTrack)
EndIf
EndScript ; LastTrack

Script TrackPan ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgTrackPan)
EndIf
EndScript ; TrackPan

Script TrackMoveTop ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgTrackMoveTop)
EndIf
EndScript ; TrackMoveTop

Script TrackMoveBottom ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgTrackMoveBottom)
EndIf
EndScript ; TrackMoveBottom

Script InputDevice ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
Else
	AnnounceKeyMessage (msgInputDevice)
EndIf
EndScript ; InputDevice

Script OutputDevice ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
Else
	AnnounceKeyMessage (msgOutputDevice)
EndIf
EndScript ; OutputDevice

Script AudioHost ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
Else
	AnnounceKeyMessage (msgAudioHost)
EndIf
EndScript ; AudioHost

Script InputChannels ()
If FocusInMainWindow () && !IsStopped () Then
	SayNotStopped ()
ElIf !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
Else
	AnnounceKeyMessage (msgInputChannels)
EndIf
EndScript ; InputChannels

