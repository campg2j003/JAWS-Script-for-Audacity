; JAWS script for Audacity multitrack sound editor V2.0.1.0 (http://audacityteam.org).
;Original author: Gary Campbell
;Modified: Dang Manh Cuong
;Vietnamese README file translation by Nguyen Hoang Giang.

; This constant contains the script version.  The spacing of the following line must be preserved exactly so that the installer can read the version from it.  There is exactly 1 space between const and the name, and 1 space on either side of the equals sign.
Const CS_SCRIPT_VERSION = "2.2.2-beta-2020-05-06"
;Last updated 2020-05-03T18:20Z

; This puts the copyright in the jsb file.
Messages

@msgCopyright
JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacityteam.org).

    Copyright (C) 2012-2020  Gary Campbell and Dang Manh Cuong.  All rights reserved.

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

;The next line makes the script compiled on Jaws 13.0 to behave the same as it does with earlier versions.
;#pragma StringComparison partial

Const
	ID_SELECTION_BAR = 10,
	;For Audacity 2.1.3 and earlier.
	ID_SELECTION_START = 2705,
	ID_SELECTION_END = 2706,   ; selection end or selection length
	ID_END_RADIO = 2704,
	ID_LENGTH_RADIO = 2703,

	;For Audacity 2.2.0 and later
	ID_SELECTION_START_22 = 2719,
	ID_SELECTION_END_22 = 2722,   ; selection end
	ID_SELECTION_TYPE_COMBO = 2704,
	ID_SELECTION_LENGTH = 2720,
	ID_SELECTION_CENTER = 2721,
	ID_AUDIO_POSITION = 2723,
	;For Audacity 2.3.0 and later
	ID_SELECTION_START_23 = 2705,
	ID_SELECTION_END_23 = 2708,   ; selection end
	ID_SELECTION_LENGTH_23 = 2706,
	ID_SELECTION_CENTER_23 = 2707,
	ID_AUDIO_POSITION_23 = 2709,

	ID_STOP_BUTTON = 5100, ; stop button when previewing an effect, also of all OK buttons
	;For VST plugins
	ID_Load_Preset=11001,
	ID_Save_Preset=11002,
	ID_Preset=11000,
	;For the Edit chains dialog
	ID_Chains_List=7001,
	ID_Chain_Cmds_List=10002,
	ID_Chain_Cmds_List2=7002, ;Audacity 2.0.4 or higher

	WC_wxWindowClass = "wxWindowClass", ; grabber control on toolbars, pre 2.1.2
	WC_wxWindowClass2 = "wxWindow", ; grabber control on toolbars, 2.1.2
	CS_INI_FILE="Audacity.jsi",
	;For user options.  The first two can be used for options that don't need special on and off values, which is all of them right now.  This is added to make support of future options easier.
	CI_UO_OFF = 0,
	CI_UO_ON = 1,
	CI_MESSAGES_OFF = 0,
	CI_MESSAGES_FULL = 1, ; announce all messages
	CI_TOOLBARS_OFF = 0,
	CI_TOOLBARS_ON = 1, ; announce all toolbars
	CI_ENTERPAUSE_OFF = 0, ; ENTER during play/record sent to ap
	CI_ENTERPAUSE_ON = 1, ; ENTER pauses during play and record
	CI_SAY_POSITION_NONE = 0, ;say no positions except when explicitly requested
	CI_SAY_POSITION_NOT_ARROWS = 1, ;say only positions that do not involve previewing
	CI_SAY_POSITION_ALL = 2 ;say all positions


Globals
	Int App_FirstTime,
	Int gfAudacityAutostarted, ;Set in AutoStartEvent, cleared in HandleCustomWindows and HandleCustomApp.
	String gsIniFile, ; CS_Ini_File for pre JAWS 13, the JCF file for 13 and later.
	String gsIniSection, ;"Settings" for pre JAWS 13, "NonJCFOptions" for 13 and later
	;For adjust Jaws options and quick settings script
	Int gfEnterPause,
	Int announceMessage,
	Int AnnounceToolbars,
	Int gfSilencePreview, ;Silence Preview quick setting
	Int gfRecordSpeechOff,
	Int gfSayPosition,
	Int gfPreviewMotion, ;true plays preview with cursor motions
	Int gfToggleMotionPreview, ;true motion preview, false quicksettings
	String gsJawsGuideLink, ;URL of Audacity Guide for JAWS users
	;Commented this out 9/14/13.
	;String gsJawsGuideTitle, ;title of Audacity Guide for JAWS users

	Handle ghNull, ; to clear a handle
	;When focus is on a slider with an associated edit, this holds the handle of the associated edit so that it will be spoken by SayNonHighlightedText.  Be sure to set this to 0 when focus moves away from the slider.
	Handle ghSliderEdit,
	;When a position field is scheduled to be spoken after cursor motion completes, this holds the handle of the associated position field so that it will be spoken by SayNonHighlightedText.  Be sure to set this to 0 after the field is spoken.
	Handle ghSayPositionField,
	Int gfPositionFieldUpdated,
	Int gfPreviewing, ;true if effect previewing
	Int gfSilence, ; If true, suppresses speech .
	Int gfSilenceClearOnNext, ;clear gfSilence after next HandleCustomWindows or SayFocusedObject
	Int gfSuppressNextTutor, ;Suppress next TutorMessegeEvent, not currently used.
	Int gfInLabel, ;True if a label writing command has been entered but ENTER hasn't been pressed and we haven't left the label track.
	Int giScheduleClearSilence, ;the value returned by ScheduleFunction when silencing speech when starting recording, probably not needed.  It would be used to unschedule the function.
	String gsGoTrackUpKey, ;key that moves focus to the prior (lower numbered) track
	String gsGoTrackDownKey, ;key that moves focus to the next (higher numbered) track
	String gsMoveTrackUpKey, ; key that moves a track up in the track panel (to lower-numbered tracks)
	String gsMoveTrackDownKey, ; key that moves a track down in the track panel (to higher-numbered tracks)
	Int giTrackMark, ;Holds the number of the marked track, 0 if none
	;Control ID values that change in different versions of Audacity.
	Int giIDSelectionTypeCombo,
	Int giIDSelectionStart,
	Int giIDSelectionEnd,
	Int giIDSelectionLength,
	Int giIDSelectionCenter,
	Int giIDAudioPosition

;Keys for playing previews with cursor motion keys.  These are executed after the motion commands so they play what we just moved over.
Const
	KS_PREVIEW_START_BACKWARD = "Shift+F6", ;Preview for selection start backward motion
	KS_PREVIEW_START_FORWARD = "Shift+F6", ;Preview for selection start forward motion
	KS_PREVIEW_END_BACKWARD = "Shift+F7", ;Preview for selection end backward motion
	KS_PREVIEW_END_FORWARD = "Shift+F7", ;Preview for selection end forward motion

	;Keys to send to preview audio at the selection range ends.  These are used by the JAWSKey+left/right keys.
	KS_PREVIEW_START_BEFORE = "Shift+F5",
	KS_PREVIEW_START_AFTER = "Shift+F6",
	KS_PREVIEW_END_BEFORE = "Shift+F7",
	KS_PREVIEW_END_AFTER = "Shift+F8"

;Key layer
Globals
	Int giAudacityKeyLayer
const
	CI_AUDACITY_NOLAYER = 0,
	CI_AUDACITY_LAYER = 1,
	CI_POSITION_LAYER = 2,
	CI_SHORT_LAYER = 3,
	CI_TEMPO_LAYER = 4

;Tempo
Globals
	Int giTempoStart, ; tick count of first tap
	Int giTempoLast, ; tick count of last tap
	String gsTempoBPM,
	Int giTempoCount,
	Int gfTempoRunning

/*
;JAWS 11 Update 1 and later, using arrays.
Globals
    Int giTempoSum, ;sum of all times in gaiTempoTimes
    IntArray gaiTempoTimes

*/


Int Function GetQuickSetting (String sKey)
;Get the desired user option.
;For JAWS 13.0 and later gets the setting from the NonJCFOptions section of the JCF file.  For earlier versions gets it from the JSI file.
;sKey: key of desired setting.
If GetJFWVersion()<1300000 Then
	;New method given by Le Van Mai (Cuong's friend)
	Return IniReadInteger (gsIniSection, sKey, 0, CS_INI_FILE)
Else
	Return GetNonJCFOption(sKey)
EndIf ; else JAWS 13 or later
EndFunction ; GetQuickSetting

Int Function FocusInTrackPanel ()
;Indicates that the focus is in the track panel.  It is used to prevent JAWS from speaking messages such as move to start of track etc. in the selection bar or toolbar.
Return (FocusInMainWindow () && GetWindowName(GetFocus()) == WN_TRACKPANEL )
EndFunction ; FocusInTrackPanel

Int Function FocusInSelectionBar ()
Return GetControlID (GetParent (GetFocus ())) == ID_SELECTION_BAR
EndFunction ; FocusInSelectionBar

Object Function GetTrackPanelObj ()
;Get the accessible object of the track panel.
Var
	Object obj,
	Handle hTemp

Let hTemp = GetRealWindow(GetFocus())
Let hTemp = FindWindow (hTemp, "", WN_TRACKPANEL)
SaveCursor ()
InvisibleCursor ()
MoveToWindow(hTemp)
Pause ()
Let obj = GetCurrentObject (0)
RestoreCursor ()
Return obj
EndFunction ; GetTrackPanelObj

Void Function SaySelectionPosition (Int iPosition, String sMessage)
;say the selection position field and pass the key to the ap.
;iPosition - control ID of the selection position control.
;sMessage - Spoken message
;Designed for use by SelectionStart and SelectionEnd scripts.  Checks to see if Set Selection Boundary dialog appears.
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
	If GetQuickSetting ("AnnounceMessage") Then
		SchedulePositionField(iPosition)
	EndIf ; AnnounceOn
	TypeCurrentScriptKey ()
	Pause () ;Wait for possible appearance of Boundary Position dialog.
	If !DialogActive () Then
		Pause ()
		;If the Announce Messages option is on, speak the selection posision.
		If GetQuickSetting ("AnnounceMessage") Then
			;We can't do this above because we don't want to do it if a dialog appears after the keypress.
			;Do not use SayPositionField because the message is spoken before the value but only if the value is available.
			Let wnd=GetPositionFieldHandle (iPosition)
			Let sValue=GetPositionField (wnd) ;get value of desired control, used only to make sure the selection bar is visible.
			If !sValue Then ;the selection toolbar is turned off
				Say (msgNoSelection, OT_ERROR)
				Let ghSayPositionField = ghNull;undo SchedulePositionField
			Else
				SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sMessage, sMessage)
				;From before speaking with SayNonhighlighted/ScreenStabilizedEvent.
				;SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sValue, sValue)
			EndIf ;say selection position
		EndIf ; AnnounceOn
	EndIf ; if !DialogActive
EndIf ; If FocusInMainWindow
EndFunction ; SaySelectionPosition

Void Function MarkerMovement (String sScript, String sAlert)
;Used by scripts that move the ends of the selection, such as move start of selection to the left by a small amount.
;sScript - name of script to perform.  This is used only when not in main window.
;sAlert - message to be spoken.
;First, check to make sure we have a project open.
If !UserBufferIsActive ()&&FocusInTrackPanel () && IsStopped () && !gfInLabel Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayFormattedMessage (OT_CURSOR, sAlert) ;The alert specified by calling script
	EndIf ; if AnnounceOn
Else
	;Why not just type current script key?
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
	FormatStringWithEmbeddedFunctions("<$" +sScript +">")
EndIf ; else perform default script
EndFunction ; MouseMovement

Void Function AnnounceKeyMessage (String Message)
;This speaks an alert message when the user presses certain Audacity hotkeys, such as j or Shift J when appropriate, and passes the key to Audacity.
; Message - message to be spoken.
If !UserBufferIsActive ()&&FocusInMainWindow () && !gfInLabel Then
	If GetQuickSetting ("AnnounceMessage") Then
		SayUsingVoice (VCTX_MESSAGE, Message, OT_STATUS) ;Speak alert message.
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
	SayFormattedMessage (OT_ERROR, msgNotStopped_l, msgNotStopped_s)
EndIf
EndFunction ; SayNotStopped

Void Function SayNoProject ()
;If no project is open, speak an alert message.
SayFormattedMessage (OT_ERROR, MsgNoProject_l, msgNoProject_s)
EndFunction ; SayNoProject

Int Function NoProject ()
;Return True if no project is open  (focus in main window and no tracks in track panel).
;This is a feature from GoldWave scripts.
Var
	Int iSubtype,
	Handle hTemp,
	Object obj

If !UserBufferIsActive () && FocusInMainWindow () Then
	Let obj = GetTrackPanelObj ()
	If obj.AccChildCount == 0 Then
		Return TRUE
	EndIf ; if no tracks
EndIf ; if in main window
Return FALSE
EndFunction ; NoProject

Function AutoStartEvent ()
Var
	String sTemp,
	Int iTemp

;DebugString("AutoStart") ; debug
;gfAudacityAutoStarted prevents activation of Silence Preview when switching from another app while focus is in a dialog.
Let gfAudacityAutostarted = TRUE
;We reset these flags in case they get stuck on.
Let gfSilence = FALSE
Let gfSilenceClearOnNext = FALSE
Let gfPreviewing = FALSE
Let gfInLabel = FALSE
Let gfToggleMotionPreview = FALSE
	;Let App_firsttime = False ; debug
If !App_FirstTime Then
	Let App_FirstTime=1
	SayFormattedMessage (OT_NO_DISABLE, msg_App_Start)
	If GetJFWVersion()<1300000 Then
		Let gsIniFile = CS_INI_FILE
		Let gsIniSection = "Settings"
	Else
		Let gsIniFile = "Audacity.jcf"
		Let gsIniSection = "NonJCFOptions"
	EndIf ; else V13 or later
	If GetJFWVersion()<1300000 Then
		;write default settings of Audacity script if settings file doesn't exist.
		If !FileExists (FindJAWSPersonalizedSettingsFile (gsIniFile, TRUE)) Then
			AddDefaultConfig ()
		EndIf
		;Read a value for the JAWS ref guide link, initialize to default.
		;The disadvantage of storing these in globals is that you have to shut down and restart JAWS to make changes to an externally edited config file take effect.  This could be avoided by reading from the config file when the values are needed.  Because of the complexity of decoding this value, I choose to use globals despite this disadvantage.  One could also decrease the complexity by using a second key for the title.
		/*
		Commented the title part of this feature out because it could make the hot key help claim it is for a different version of the guide than it was taken from.
		Let sTemp = StringTrimTrailingBlanks (IniReadString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK + cScSpace + CS_JawsGuide_TITLE , gsIniFile))
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

		Let gsJawsGuideLink = StringTrimTrailingBlanks (IniReadString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK, gsIniFile))
	EndIf ; if before JAWS 13

	;ID values that change in different versions of Audacity.
	;If different Audacity versions can run simultaneously, this needs to be outside of If app_firsttime.
	If CheckAudacityVersion ("2,2,0") Then
		Let giIDSelectionTypeCombo = ID_SELECTION_TYPE_COMBO
		Let giIDSelectionStart = ID_SELECTION_START_22
		Let giIDSelectionEnd = ID_SELECTION_END_22
		Let giIDSelectionLength = ID_SELECTION_LENGTH
		Let giIDSelectionCenter = ID_SELECTION_CENTER
		Let giIDAudioPosition = ID_AUDIO_POSITION
	EndIf ; v2.2.0
	
	If CheckAudacityVersion ("2,3,0") Then
		;Let giIDSelectionTypeCombo = ID_SELECTION_TYPE_COMBO
		Let giIDSelectionStart = ID_SELECTION_START_23
		Let giIDSelectionEnd = ID_SELECTION_END_23
		Let giIDSelectionLength = ID_SELECTION_LENGTH_23
		Let giIDSelectionCenter = ID_SELECTION_CENTER_23
		Let giIDAudioPosition = ID_AUDIO_POSITION_23
	EndIf ; v2.3.0
	
	;Set keys that move the focus up and down in the track panel.
	Let gsGoTrackUpKey = "UpArrow"
	Let gsGoTrackDownKey = "DownArrow"

	;Set keys that move a track up and down in the track panel.
	Let gsMoveTrackUpKey = "Control+Shift+UpArrow"
	Let gsMoveTrackDownKey = "Control+Shift+DownArrow"
EndIf ; if first time
EndFunction ; AutoStartEvent

Void Function SayNonHighlightedText (Handle hwnd, String buffer)
;SayString("Enter SayNonHighlighted " + IntToString(hwnd) + " " + buffer) ; debug
;If we are monitoring an edit associated with a slider, speak it.
If ghSliderEdit && hwnd == ghSliderEdit Then
	Say (buffer, OT_NONHIGHLIGHTED_SCREEN_TEXT)
EndIf
If ghSayPositionField && hwnd == ghSayPositionField Then
	Let gfPositionFieldUpdated = True
EndIf
/*
If ghSayPositionField && hwnd == ghSayPositionField Then
	Say (FormatPositionField(buffer), OT_NONHIGHLIGHTED_SCREEN_TEXT)
	Let ghSayPositionField = ghNull
EndIf
*/
SayNonHighlightedText (hwnd, buffer)
;SayString("Exit SayNonHighlighted") ; debug
EndFunction ; SayNonHighlightedText

Void Function ScreenStabilizedEvent(Handle hWnd)
;SayString("ScreenStab " + IntToString(hWnd)) ;debug
If ghSayPositionField  && gfPositionFieldUpdated Then
	;SayString("Stab position") ; debug
	Say (GetPositionField(ghSayPositionField), OT_NONHIGHLIGHTED_SCREEN_TEXT)
	Let ghSayPositionField = ghNull
	Let gfPositionFieldUpdated = False
EndIf
ScreenStabilizedEvent(hWnd)
EndFunction ;ScreenStabilizedEvent

	Int Function NewTextEventShouldBeSilent(Handle hFocus, Handle hwnd, String buffer, Int nAttributes,
	Int nTextColor, Int nBackgroundColor, Int nEcho, String sFrameName)
Var
	Int iRtn
;SayString ("ShouldBeSilent " + IntToString (gfSilence)) ; debug
Let iRtn = gfSilence || NewTextEventShouldBeSilent(hFocus, hwnd, buffer, nAttributes,
	nTextColor, nBackgroundColor, nEcho, sFrameName)
Return iRtn
EndFunction ; NewTextEventShouldBeSilent

Globals Handle ghAudacityLastArea,
	Handle ghAudacityLastToolbar

Void Function TutorMessageEvent(Handle hWnd, Int nMenuMode)
; Suppress tutor message while previewing.
If gfSilence Then
	Return
EndIf
If gfSuppressNextTutor Then
	Let gfSuppressNextTutor = FALSE
	Return
EndIf
;DebugString("Tutor message for " + GetWindowType(hWnd)) ; debug
TutorMessageEvent(hWnd, nMenuMode)    
EndFunction ; TutorMessageEvent

Void Function ProgressBarChangedEvent(Handle hProgress, String sName, String sValue)
If gfSilence Then
	Return
EndIf
ProgressBarChangedEvent(hProgress, sName, sValue)
EndFunction ; ProgressBarChangedEvent

/*
Void Function ActiveItemChangedEvent (handle curHwnd, int curObjectId, int curChildId,
	handle prevHwnd, int prevObjectId, int prevChildId)
SayString("ActiveItemChangedEvent") ; debug
ActiveItemChangedEvent (curHwnd, curObjectId, curChildId, prevHwnd, prevObjectId, prevChildId)
EndFunction
*/

/*
Silence Effect Previewing.

This feature silences speech that occurs as a result of focus changes during previewing of an effect.  Determining the conditions that should start and stop this feature is difficult because they do not occur while execution is stopped.  I used a facility that writes debug messages to a string that record information about window attributes during execution of JAWS focus events such as HandleCustomAppWindows, HandleCustomRealWindows, and HandleCustomWindows.  (The messages can then be displayed in the User Buffer when execution has completed.)  These conditions change depeneding on the version of Audacity.

When previewing is activated, a dialog appears (in some versions) that displays a message indicating "preparing preview".  A dialog containing a progress bar and a stop button appears until previewing is complete.  Then the dialog of the effect reappears.

The current process works as follows:

Two global flags are used to record the stages of activation of effect previewing.  gfSilence is set when we detect  that the Preview button has been activated.  gfPreviewing is set when we detect that previewing is in progress.

Detecting the start of effect previewing:
We cannot detect the start of effect previewing by monitoring keystrokes or by noticing that focus is on the Preview button because it can be started by pressing SPACE on the button, by a hot key, or by the mouse.  Focus may not be on the button when the latter two occur.
For Audacity versions before 2.1.2, we notice that in HandleCustomWindows the focus is on the app main window.  For 2.1.2 and later we notice that the first child of the app window (or real window) is a window named "Preparing Preview" or "Previewing".  We record that this has occurred by setting gfSilence.  We repeat this in HandleCustomRealWindows.  (This may not be necessary but it was where this test was done previously and we leave it for safety.)  When this flag is set, we detect that previewing is active when focus is on the stop button.  We record that this has occurred by setting gfPreviewing.  We detect that previewing is finished the next time we enter HandleCustomWindows.

The activation condition can also occur when focus moves to us from another app, so we set gfAudacityAutostarted in AutoStartEvent and clear it in HandleCustomWindows.  It must be clear for previewing to start.
*/

; This is probably where Silence Previewing should have been handled.  We retain the code in HandleCustomRealWindows just in case this isn't called first.
Int Function HandleCustomAppWindows(Handle hWnd)
Var
	Int iRtn,
	String sFirst

;DebugString("Enter HandleApp") ; debug
Let sFirst = GetWindowName (GetFirstChild (GetRealWindow(GetFocus ())))
If gfSilencePreview && CheckAudacityVersion ("2,1,2") && DialogActive () && !gfAudacityAutostarted && (sFirst == WN_PREPARING_PREVIEW || sFirst == WN_PREVIEWING) Then
	;DebugString("GetWindowName of appWindow: " + GetWindowName(hWnd))
	Let gfSilence = TRUE
	;DebugString("Exit HandleApp, starting previewing") ; debug
	Return TRUE
EndIf ;2.1.2 or later
Let iRtn = HandleCustomAppWindows(hWnd)
;DebugString("Exit HandleApp") ; debug
Return iRtn
EndFunction ; HandleCustomAppWindows

Int Function HandleCustomRealWindows(Handle hReal)
;Suppress speech for preview.
Var Int iRtn, ; debug
	String sFirst

;This may no longer be needed because it is handled in HandleCustomAppWindows, but we keep this code just in case.
Let sFirst = GetWindowName(GetFirstChild(hReal))
;DebugString("Enter HandleReal " + sFirst) ; debug
;SayString("Enter HandleReal") ; debug
If gfSilencePreview && CheckAudacityVersion ("2,1,2") && DialogActive () && !gfAudacityAutostarted && (sFirst == WN_PREPARING_PREVIEW || sFirst == WN_PREVIEWING) Then
	;DebugString("GetWindowName of RealWindow: " + GetWindowName(hReal))
	Let gfSilence = TRUE
	;DebugString("Exit HandleReal, starting previewing") ; debug
	Return TRUE
EndIf ;2.1.2 or later
If gfSilence Then
	;DebugString("HandleCustomReal: speech suppressed") ; debug
	Return TRUE
EndIf ; if gfSilence
Let iRtn = HandleCustomRealWindows(hReal)
;SayString("Exit HandleReal") ; debug
;DebugString("Exit HandleReal") ; debug
Return iRtn
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
	Int iRtn

Let gfAudacityAutostarted = FALSE
;See if Stop being spoken in previewing is an invisible window.
If !IsWindowVisible(hFocus) Then
	If GetControlID(hFocus) == ID_STOP_BUTTON Then ; debug
		;SayString("invisible stop") ; debug
		Return FALSE ; debug
	EndIf ; debug
	Return TRUE
EndIf ; not visible

;DebugString("HandleCustom: hFocus=" + IntToString(hFocus) + ", text=" + GetWindowText(hFocus, False) + ", class=" + GetWindowClass(hFocus)) ; debug
If GetWindowClass(hFocus) == "button" && GetWindowText(hFocus, FALSE) == "" Then ; debug
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
	Let gfInLabel = FALSE
EndIf

; Turn off silencing for preview.
If gfSilence && gfPreviewing Then
	; stop preview silence
	;DebugString("Turning off preview silence") ; debug
	Let gfSilence = FALSE
	Let gfPreviewing = FALSE
EndIf ; stop preview silence

;Make Jaws read the checkbox and button in the quick settings dialog
Let sName=GetWindowName (GetRealWindow (GetCurrentWindow ()))
If DialogActive ()&&sName==WN_QUICK_SETTINGS Then
	Return
EndIf ;quick settings dialog

If DialogActive () && (sName == WN_EQUALIZATION || sName == WN_GRAPHIC_EQ) && GetWindowSubtypeCode (hFocus) == WT_UPDOWNSLIDER Then
	Let iMSAA_JCFOpt = GetJCFOption (OPT_MSAA_MODE)
	SetJCFOption (OPT_MSAA_MODE, 2)
	SayControlEx(hFocus, 
	GetObjectName (), "",   ; control name, type
	"",   ; control state
	"", "",   ; Container name, type
	GetObjectValue (), "",   ; value, position
	"")   ; dialog text
	SetJCFOption (OPT_MSAA_MODE, iMSAA_JCFOpt)
	Return TRUE
EndIf

If DialogActive () && GetWindowSubtypeCode (hFocus) == WT_LEFTRIGHTSLIDER && GetWindowSubtypeCode (GetPriorWindow(hFocus)) == WT_EDIT Then
	Let ghSliderEdit = GetPriorWindow (hFocus)
	Let hTemp = GetPriorWindow(ghSliderEdit) ; control name
	SayControlEx(hFocus, 
	GetWindowName(hTemp), "",   ; control name, type
	"",   ; control state
	"", "",   ; Container name, type
	"", "",   ; value, position
	"")   ; dialog text
	Return TRUE
ElIf DialogActive () && GetWindowSubtypeCode (hFocus) == WT_LEFTRIGHTSLIDER && GetWindowSubtypeCode (GetPriorWindow(hFocus)) == WT_STATIC && GetWindowSubtypeCode (GetNextWindow(hFocus)) == WT_STATIC Then
	Let ghSliderEdit = GetNextWindow (hFocus)
	Let hTemp = GetPriorWindow(hFocus) ; control name
	SayControlEx(hFocus, 
	GetWindowName(hTemp), "",   ; control name, type
	;"", "", ; name, type
		"",   ; control state
		"", "",   ; Container name, type
		FormatString(msgCompressorSlider, GetObjectValue(hFocus), GetWindowText (ghSliderEdit, FALSE)), "",   ; value, position
		"")   ; dialog text
	Return TRUE
Else
	;this must be executed any time focus moves away from a slider with a monitored edit, even when we exit the dialog
	Let ghSliderEdit = ghNull
EndIf ;else not slider

If !CheckAudacityVersion ("2,1,2") && hFocus == GetAppMainWindow(hFocus) Then
	;Audacity version before 2.1.2.
	;DebugString("previewing " + IntToString(hFocus)) ; debug
	Let gfSilence = TRUE
	;DebugString("suppress focus exit say custom") ; debug
	Return TRUE
EndIf

If DialogActive() && gfSilence && GetControlID(hFocus) == ID_STOP_BUTTON && GetWindowName (hFocus) == WN_STOP_BTN Then
	;DebugString("HandleCustom: got stop button " + GetWindowName(hFocus)) ; debug
	Let gfPreviewing = TRUE
	Return TRUE
EndIf ; stop button

If gfSilence Then
	;DebugString("custom suppressing focus") ; debug
	If gfSilenceClearOnNext Then
		Let gfSilence = FALSE
		Let gfSilenceClearOnNext = FALSE
	EndIf
	Return TRUE ; we're doing something like previewing and we don't want focus change stuff spoken
EndIf ; if gfSilence

;Announce when focus changes to a different area of the main window.
If !FocusInMainWindow() Then
	If DialogActive () && GetWindowName(GetFocus()) == cscNull Then
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
		Return TRUE
	ElIf IsWarningDialog ()&&!CheckAudacityVersion ("2,0,3") Then
		SayWindowTypeAndText (GetFocus ())
		;SayString("Exit HandleFocus warning dlg") ; debug
		Return TRUE
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
		Say (CS_TrackPanel, OT_POSITION)
		Return HandleCustomWindows (hFocus)
	EndIf ; if track panel
	; We could also identify the selection by testing for WindowHierarchyX = 3.
	If GetWindowName(GetFirstChild(hParent)) == WN_SELECTION Then
		Say (CS_SelectionBar, OT_POSITION)
	Else
		Say (CS_Toolbars, OT_POSITION)
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
	If gfSilenceClearOnNext Then
		Let gfSilence = FALSE
		Let gfSilenceClearOnNext = FALSE
	EndIf
	Return
EndIf
If FocusInTrackPanel () Then
	;Suppress speaking of "track table" when moving between tracks.
	SayObjectActiveItem ()
Else
	SayFocusedObject ()
EndIf
EndFunction ; SayFocusedObject

Void Function SayWindowTypeAndText (Handle hWnd)
If gfSilence Then
	If gfSilenceClearOnNext Then
		Let gfSilence = FALSE
		Let gfSilenceClearOnNext = FALSE
	EndIf
	Return
EndIf
SayWindowTypeAndText (hWnd)
EndFunction ; SayWindowTypeAndText

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
If (GetWindowName(hParent) == WN_TOOLDOCK && GetWindowHierarchyX(hParent) == 2)
    || (GetWindowName(hParent) == WN_TOOLDOCK && GetWindowHierarchyX(GetParent(hParent)) == 2) Then ;Audacity V2.1.3
	Return TRUE
EndIf
Return FALSE
EndFunction ; IsToolbar

Handle Function GetToolbar ()
; When focus is on a toolbar control returns the handle of the toolbar containing the control.
Return GetParent(GetFocus())
EndFunction ; GetToolbar

Handle Function FindToolbar(String sToolbar)
;Find toolbar sToolbar.
Var
	Handle hTemp,
	Handle hTemp2
Let hTemp = GetFirstChild (GetAppMainWindow (GetFocus()))
;In Audacity 2.3.3 this is TopPanel, and toolbars are children of this window.
Let hTemp2 = FindWindow (hTemp, "", sToolbar)
If !hTemp2 Then
	;Pre Audacity v2.3.3
	Let hTemp = GetNextWindow (hTemp) ; parent of toolbars
	Let hTemp = FindWindow (hTemp, "", sToolbar)
Else
	Let hTemp = hTemp2
EndIf ;if pre 2.3.3
Return hTemp
EndFunction ; FindToolbar
	
Int Function FocusInMainWindow ()
;Returns True if the focused control is in the main window, False otherwise.  Returns False in dialog, menus or context menu.
Var
	Handle hFocus,
	Handle hWnd

Let hFocus = GetFocus ()
If (GetWindowName(hFocus) == WN_TRACKPANEL || GetWindowName(GetParent(GetParent(hFocus))) == WN_TOOLDOCK) Then
	Return TRUE
EndIf
Return FALSE
EndFunction ; FocusInMainWindow

String Function GetPositionField (Handle hWnd)
;Returns the value of the specified audio selection or position field.
;hWnd - the handle of the control.
;Return - the value of the position field suitable for speaking.
;We don't receive a control ID because of Audio Position field.
Var
	String s,
	Int iMSAAMode,
	Object obj,
	Int iTemp

Let s = GetWindowText(hWnd, 0)
If s == "" Then
	;Try to get the text with MSAA.
	;/*
	Let iMSAAMode = GetJCFOption (OPT_MSAA_MODE)
	SetJCFOption (OPT_MSAA_MODE, 2)
	Let obj = GetObjectFromEvent(hWnd, -4, 0, iTemp)
	If obj Then
		Let s = obj.accName(0)
	EndIf
	SetJCFOption (OPT_MSAA_MODE, iMSAAMode)
	;*/ ; objectFromEvent
	/*
	;This seems to work no better than GetObjectFromEvent, but it does work the same.  It is similar to the code in UtilitySayMSAAObjectInfo for object name, however, Script Utility F9 speaks the letters and . that this does not.
	Let iMSAAMode = GetJCFOption (OPT_MSAA_MODE)
	SetJCFOption (OPT_MSAA_MODE, 2)
	SaveCursor ()
	InvisibleCursor ()
	MoveToWindow (hWnd)
	Pause ()
	Let s = GetObjectName (True)
	RestoreCursor ()
	SetJCFOption (OPT_MSAA_MODE, iMSAAMode)
	*/ ;invisible cursor and GetObjectName.
EndIf ; if s==""

Return FormatPositionField (s)
EndFunction ; GetPositionField

String  Function FormatPositionField(String s)
;Format string s for speaking.
;s: position field as retrieved from window.
Var
	String s1,
	String s2,
	String s3,
	String s4,
	Int i,
	Int j,
	Int iRtn

;Remove "uninteresting" stuff from the position, like leading zeros and ".000"
;A position can be in several formats, such as "0 0  h 0 0  m 0 0 .0 0 0  s " or "0 0 0 ,0 0 0  seconds ".
;These strings may need to be localized because H, M, ., and comma may be different.
Let s2 = stringStripAllBlanks(s)
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
	If !StringContainsChars(SubString(s4, 1, 1), "123456789") Then
		;No nonzeros, find the number of zeros.
		Let j = StringLength(s3) - StringLength(s4)
		;SayString("no nonzeros, j = " + IntToString(j)) ; debug
		If i == 1 Then
			Let s2 = "0" + s2
			Let i = i + 1
		EndIf ; if decimal is first char
		Let s3 = StringReplaceSubstrings(SubString(s2, 1, i - 1), "00", "0")
		Let s2 = s3 + SubString (s2, i + 1 + j, StringLength(s2) - j)
	Else
		; nonzeros after decimal
		Let s3 = StringReplaceSubstrings(SubString(s2, 1, i - 1), "00", "0")
		Let s2 = s3 + SubString (s2, i, StringLength(s2) - i + 1)
	EndIf ; if no nonzeros after decimal
EndIf ; if decimal
; What we want is in s2.
;Don't say leading parts if they are 0.

Return s2
EndFunction ;FormatPositionField

Int Function GetPositionFieldID(Int iPosition)
Var
	Int iSelectionType,
	Int iId
If CheckAudacityVersion("2,2,0") Then
	;SayString("giIDSelectionTypeCombo " + IntToString(giIDSelectionTypeCombo)) ; debug
	Let iSelectionType = GetCurrentItem (FindDescendantWindow (GetRealWindow (GetFocus ()), giIDSelectionTypeCombo))
	;1=start end, 2= start length, 3= length end, 4=length center
	If iPosition == ID_SELECTION_START Then
		If iSelectionType == 1 Then ; start, end
			Let iId = giIDSelectionStart
		ElIf iSelectionType == 2 Then ; start, length
			Let iId = giIDSelectionStart
		ElIf iSelectionType == 3 Then ; length, end
			Let iId = giIDSelectionLength
		Else ; length, center
			Let iId = giIDSelectionLength
		EndIf ; else length center
	Else
		;iPosition = ID_SELECTION_END
		If iSelectionType == 1 Then ; start, end
			Let iId = giIDSelectionEnd
		ElIf iSelectionType == 2 Then ; start, length
			Let iId = giIDSelectionLength
		ElIf iSelectionType == 3 Then ; length, end
			Let iId = giIDSelectionEnd
		Else ; length, center
			Let iId = giIDSelectionCenter
		EndIf ; else length center
	EndIf ; else ID_SELECTION_END
Else
	;2.1.3 or earlier.
	Let iId = iPosition
EndIf
;SayString("GetPositionFieldID: type " + IntToString(iSelectionType) +", iId " + IntToString(iId)) ; debug
Return iId
EndFunction ; GetPositionFieldID

Handle Function GetPositionFieldHandle(Int iPosition)
Return FindDescendantWindow (GetRealWindow (GetFocus ()), GetPositionFieldID (iPosition))
EndFunction ; GetPositionFieldHandle

Int Function SayPositionField (Int iPosition, Int fSilent)
;Say the specified position field.
;iPosition For Audacity 2.1.3 and earlier, the ctrl ID of the position field.  For Audacity 2.2.0 and later ID_SELECTION_START and ID_SELECTION_END are used as "command values" and transformed into the appropriate control IDs based on the selection type.
;fSilent -- If True does not speak error message if the selection toolbar could not be found.
;Returns True if a position value was found, False if it could not be gotten, in which case it speaks a corresponding message (unless fSilent is True).
;Respects AnnounceMessage for the error message.
Var
	Handle hWnd,
	String sValue,
	Int iRtn

;;If the Announce Messages option is on, speak the selection posision.
;If GetQuickSetting ("AnnounceMessage") Then
Let hWnd = GetPositionFieldHandle(iPosition)
Let sValue=GetPositionField (hWnd) ;get value of desired control
If !sValue Then ;the selection toolbar is turned off
	If !fSilent && GetQuickSetting ("AnnounceMessage") Then
		Say (msgNoSelection, OT_ERROR)
	EndIf ;if fSilent
	Return FALSE
Else
	SayFormattedMessage (OT_USER_REQUESTED_INFORMATION, sValue, sValue)
EndIf ;say selection position
;EndIf ; AnnounceOn
Return TRUE
EndFunction ; SayPositionField

Void Function SchedulePositionField(Int iPosition)
;Schedule a position field to be spoken after cursor motion completes and the field is updated.
;iPosition For Audacity 2.1.3 and earlier, the ctrl ID of the position field.  For Audacity 2.2.0 and later ID_SELECTION_START and ID_SELECTION_END are used as "command values" and transformed into the appropriate control IDs based on the selection type.
Let ghSayPositionField = GetPositionFieldHandle(iPosition)
;SayString("Scheduling " + IntToString(ghSayPositionField)) ; debug
EndFunction ;SchedulePositionField

Script SaySelectionStart ()
;Say the value of the Selection Start field.
;If pressed twice quickly sets focus to it.  (Does not use SayPositionField for this reason.)

Var
	Handle hWnd,
	String sValue,
	String sName,
	String sMsg,
	Int iSelectionType,
	Int iId
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
	;Do it
	If CheckAudacityVersion("2,2,0") Then
		;Audacity 2.2.0 and later
		Let iSelectionType = GetCurrentItem (FindDescendantWindow (GetRealWindow (GetFocus ()), giIDSelectionTypeCombo))
		;1=start end, 2= start length, 3= length end, 4=length center
		Let iId = GetPositionFieldID(ID_SELECTION_START)
		If iSelectionType == 1 Then ; start, end
			;Let iId = ID_SELECTION_START_22
			Let sName = msgStart
		ElIf iSelectionType == 2 Then ; start, length
			;Let iId = ID_SELECTION_START_22
			Let sName = msgStart
		ElIf iSelectionType == 3 Then ; length, end
			;Let iId = ID_SELECTION_LENGTH
			Let sName = msgLength
		Else ; length, center
			;Let iId = ID_SELECTION_LENGTH
			Let sName = msgLength
		EndIf ; else length center
	Else
		;Before 2.2.0
		Let iId = ID_SELECTION_START
	EndIf ; else before 2.2.0
	;SayString("iID=" + IntToString(iId)) ; debug
	Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), iId)
	If (IsSameScript()) Then
		SetFocus(hWnd)
		Return
	EndIf ;if IsSameScript
	Let sValue = GetPositionField(hWnd)
	If !sValue Then ;selection toolbar is turned off
		Say (msgNoSelection, OT_ERROR)
	Else
		Let sMsg = FormatString(msgPositionField, sName, sValue)
		;SayString("sName = " + sName + ", sValue = " + sValue) ; debug
		;SayString("SayingMessage") ; debug
		SayMessage (OT_NO_DISABLE, sMsg, sValue)
		;SayString("after SayingMessage") ; debug
	EndIf
EndIf ; Else do it
EndScript ; SaySelectionStart

Script SaySelectionEnd ()
;Say the value of the Selection End or Length field.
;If pressed twice quickly sets focus to it.  (Does not use SayPositionField for this reason.)

Var
	Handle hRadio,
	Handle hEnd, ; handle of the edit control
	String sName,
	String sValue,
	String sMsg,
	Int iSelectionType,
	Int iId,
	Int bIsSelected

If NoProject () Then
	SayNoProject ()
	Return
ElIf DialogActive () || MenusActive () Then
	;Pass key to app.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
Else ; do it
	If CheckAudacityVersion("2,2,0") Then
		;Audacity 2.2.0 and later
		Let iSelectionType = GetCurrentItem (FindDescendantWindow (GetRealWindow (GetFocus ()), giIDSelectionTypeCombo))
		Let iId = GetPositionFieldID(ID_SELECTION_END)
		;1=start end, 2= start length, 3= length end, 4=length center
		If iSelectionType == 1 Then ; start, end
			;Let iId = ID_SELECTION_END_22
			Let sName = msgEnd
		ElIf iSelectionType == 2 Then ; start, length
			;Let iId = ID_SELECTION_LENGTH
			Let sName = msgLength
		ElIf iSelectionType == 3 Then ; length, end
			;Let iId = ID_SELECTION_END_22
			Let sName = msgEnd
		Else ; length, center
			;Let iId = ID_SELECTION_CENTER
			Let		sName = msgCenter
		EndIf ; else length center
	Else
		;Audacity 2.1.3 and earlier
		Let iId = ID_SELECTION_END
	EndIf ; Else 2.1.3 and earlier
	Let hEnd =	 FindDescendantWindow (GetRealWindow (GetFocus ()), iId)
	If (IsSameScript()) Then
		SetFocus(hEnd)
		Return
	EndIf ; if IsSameScriqt


	Let sValue = GetPositionField(hEnd)
	If !sValue Then
		Say (msgNoSelection, OT_ERROR)
	Else
		If CheckAudacityVersion("2,2,0") Then
			;Audacity 2.2.0 and later
		Else
			;Audacity 2.1.3 and earlier
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
		EndIf ; else before 2.2.0
		Let sMsg = FormatString(msgPositionField, sName, sValue)
		SayMessage (OT_NO_DISABLE, sMsg, sValue)
	EndIf ; else sValue
EndIf ; else do it
EndScript ; SaySelectionEnd

String Function CleanTrackName (String s)
Var
	String s2

Let s2 = s
Let s2 = StringReplaceSubstrings(s2, CS_SELECT_ON, "")
Let s2 = StringReplaceSubstrings(s2, CS_MUTE_ON, "")
Let s2 = StringReplaceSubstrings(s2, CS_SOLO_ON, "")
Let s2 = StringReplaceSubstrings(s2, CS_SELECTED, "")
Let s2 = StringReplaceSubstrings(s2, CS_MUTED, "")
Let s2 = StringReplaceSubstrings(s2, CS_SOLOED, "")
Return s2
EndFunction ; CleanTrackName

String Function GetSelectedTracks (Int fName)
Var
	Object oTrackPanel,
	Int i,
	Int iTrackCount,
	Int iState,
	String sTracks,
	String sName,
	Int iSelCount, ;number of consecutively selected tracks
	Int iLast ;number of last selected track processed so far

Let iSelCount = 0
Let iLast = 0
Let oTrackPanel = GetTrackPanelObj ()
Let iTrackCount = oTrackPanel.accChildCount
Let sTracks = ""
Let i = 1
While i <= iTrackCount
	Let iState = oTrackPanel.accState(i)
	;This is a bitwise and, we are testing the bit for the selected state.
	If iState & STATE_SYSTEM_SELECTED Then
		If iSelCount Then
			Let iSelCount = iSelCount + 1
			Let iLast = i
		Else
			; not iSelCount
			If sTracks Then
				Let sTracks = sTracks + CS_TRACKS_ITEM_SEP
			EndIf
			If fName Then
				Let sName = oTrackPanel.accName (i)
				Let sName = CleanTrackName (sName)
				Let sTracks = sTracks + sName
			Else
				Let sTracks = sTracks + IntToString(i)
			EndIf ;else not fName
			Let iSelCount = iSelCount + 1 ;=1
		EndIf ;else not iSelCount
	Else
		;not selected.  If iSelCount == 1 it is the first number of a possible range and it has been added to the output.
		If iSelCount > 1 Then
			If iSelCount == 2 Then
				Let sTracks = sTracks + CS_TRACKS_ITEM_SEP
			Else
				Let sTracks = sTracks + CS_TRACKS_RANGE_SEP
			EndIf
			If fName Then
				Let sName = oTrackPanel.accName(iLast)
				Let sName = CleanTrackName (sName)
				Let sTracks = sTracks + sName
			Else
				Let sTracks = sTracks + IntToString(iLast)
			EndIf ;else not fName
			Let iSelCount = 0
		EndIf ;iSelCount > 1
	EndIf ; else not selected
	Let i = i + 1
EndWhile
If iSelCount > 1 Then
	If iSelCount == 2 Then
		Let sTracks = sTracks + CS_TRACKS_ITEM_SEP
	Else
		Let sTracks = sTracks + CS_TRACKS_RANGE_SEP
	EndIf
	If fName Then
		Let sName = oTrackPanel.accName (iLast)
		Let sName = CleanTrackName (sName)
		Let sTracks = sTracks + sName
	Else
		Let sTracks = sTracks + IntToString(iLast)
	EndIf ;else not fName
	Let iSelCount = 0
EndIf ;iSelCount > 1
Return sTracks
EndFunction ; GetSelectedTracks

Script SaySelectedText ()
;If in the main window say the selected tracks.
Var
	String sTracks

If FocusInMainWindow () Then
	Let sTracks = GetSelectedTracks (IsSameScript ())
	If sTracks Then
		Say(sTracks, OT_USER_REQUESTED_INFORMATION)
	Else
		SayMessage (OT_ERROR, cmsgNothingSelected)
	EndIf
Else
	PerformScript SaySelectedText ()
EndIf
EndScript ; SaySelectedText

Script DownCell ()
Var
	Object o,
	Int iMax,
	Int i

If !IsPCCursor () || UserBufferIsActive () || !FocusInTrackPanel () Then
	PerformScript DownCell ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project
Let o = GetFocusObject(0)
Let iMax = o.AccChildCount
If iMax == 0 Then
	Beep ()
	Return
EndIf
Let i = o.accFocus
If i == iMax Then
	Beep ()
	Return
EndIf
Let i = i + 1
While i <= iMax && !(o.accState (i) & STATE_SYSTEM_SELECTED)
	Let i = i + 1
EndWhile
If i <= iMax Then
	NavigateTrackPanel (IntToString (i), gsGoTrackUpKey, gsGoTrackDownKey)
	Pause ()
	SayLine ()
Else
	Beep ()
EndIf
EndScript ; DownCell

Script UpCell ()
Var
	Object o,
	Int i

If !IsPCCursor () || UserBufferIsActive () || !FocusInTrackPanel () Then
	PerformScript UpCell ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project
Let o = GetFocusObject(0)
If o.AccChildCount == 0 Then
	Beep ()
	Return
EndIf
Let i = o.accFocus
If i <= 1 Then
	Beep ()
	Return
EndIf
Let i = i - 1
While i > 0 && !(o.accState (i) & STATE_SYSTEM_SELECTED)
	Let i = i - 1
EndWhile
If i > 0 Then
	Pause ()
	NavigateTrackPanel (IntToString (i), gsGoTrackUpKey, gsGoTrackDownKey)
	SayLine ()
Else
	Beep ()
EndIf
EndScript ; UpCell

Script SayActiveCursor ()
; Say audio position field if PC cursor is on, or perform the normal function if pressed twice quickly.
Var
	Handle hWnd,
	String sValue

If (Not FocusInMainWindow () || IsSameScript () || Not IsPCCursor () || UserBufferIsActive ())||NoProject () Then
	PerformScript SayActiveCursor()
	Return
EndIf
If CheckAudacityVersion("2,2,0") Then
	;Audacity 2.2.0 and later
	Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), giIDAudioPosition)
Else
	; Audacity 2.1.3 or earlier
	Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
	Let hWnd = GetNextWindow(GetNextWindow(hWnd))
EndIf ; else 2.1.3 or earlier
;hWnd is Audio Position field.
Let sValue = GetPositionField(hWnd)
If !sValue Then
	Say (msgNoSelection, OT_ERROR)
Else
	SayMessage (OT_NO_DISABLE, sValue, sValue)
EndIf
EndScript ; SayActiveCursor

Script SaySelectionType ()
;Say the value of the Selection Type combo.
Var
	String sText

Let sText = GetWindowText (FindDescendantWindow (GetRealWindow (GetFocus ()), giIDSelectionTypeCombo), 0)
SayMessage (OT_NO_DISABLE, sText, sText)
EndScript ; SaySelectionType

Script SetSelectionType(Int iType)
;Set the Selection Type combo to the specified value.
;iType - index (1-4) in combo box of desired setting.
;Usage: in JKM file key=SetSelectionType(1)
Var
	Int iStart,
	Int iCount,
	Int fSilence,
	String sKey,
	Handle hWnd,
	Handle hFocus

Let hWnd = FindDescendantWindow (GetRealWindow (GetFocus ()), giIDSelectionTypeCombo)
Let iStart = GetCurrentItem (hWnd)
If iStart == iType Then
	PerformScript SaySelectionType ()
	Return
EndIf
If iType > iStart Then
	Let sKey = cksDownArrow
Else
	Let sKey = cksUpArrow
EndIf
Let iCount = abs (iType - iStart)
Let hFocus = GetFocus ()
Let fSilence = gfSilence
Let gfSilence = TRUE
SetFocus (hWnd)
Pause ()
While iCount
	TypeKey (sKey)
	Pause ()
	Let iCount = iCount - 1
EndWhile
Pause ()
SetFocus (hFocus)
Pause ()
Let gfSilence = fSilence
PerformScript SaySelectionType ()
EndScript ; SetSelectionType

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
	Let sMessage=FormatString (msgScript_Ver, CS_SCRIPT_VERSION)
	SayFormattedMessage (OT_USER_BUFFER, sMessage)
	SayFormattedMessage (OT_USER_BUFFER, msgScriptKeyHelp)
	;In JAWS 10 the produced link redisplays the Audacity hot keys list when activated from the text.  It works correctly from the links list (JAWSKey+F7).  This is the same behavior as seen in Outlook for Office 2003.
	AddHotKeyLinks ()
	;UserBufferAddText (cScBufferNewLine)
	;UserBufferAddText (cMsgHotKeysLink, cFuncHotKey, cMsgHotKeysFunc)
	;UserBufferAddText (cScBufferNewLine)
	;UserBufferAddText (cMsgBuffExit)
Else
	If DialogActive () && FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Preset) Then
		;We are in a dialog with a preset.
		SayFormattedMessage (OT_USER_BUFFER, msgPresetHotkeyHelp)
		;UserBufferAddText (cScBufferNewLine)
		;UserBufferAddText(cMsgHotKeysLink, cFuncHotKey, cMsgHotKeysFunc)
		;UserBufferAddText (cScBufferNewLine)
		;UserBufferAddText (cMsgBuffExit)
		AddHotKeyLinks ()
		Return
	EndIf
	PerformScript HotKeyHelp ()
EndIf ;else not in main window
EndScript ; AudacityScriptKeyHelp

/*
To add a new key layer to the JAWSKey+a layer which is introduced with key X and name XName:
In JKM file:
add keystrokes for JAWSKey+a&X&Y and Insert+a&X&Y, where Y are the final keys of the new sequences.  If you want to stay in the layer after executing a key add a final *, so it should look like JAWSKey+a&X&Y*.
Add JAWSKey+a&X&Shift+/*=XNameLayerHelp (and Insert+).
In JSM file:
Add constant ksXNameLayer = "X", the letter that starts the layer.
Add @msgXNameLayer_Start for the name of the layer spoken when it is entered.
Add @msgXNameLayerHelp with the keys of the layer.  You cannot use %KeyFor.
Add the key X to @msgAudacityLayerHelp.
In JSS file:
add CI_XNAME_LAYER constant.
Add scripts for the new layer keys.
Add script XNameLayerHelp which speaks msgXNameLayerHelp.
In KeymapChangedEvent:
In branch for KeySequencePending add test for ksXNameLayer and set giAudacityKeyLayer to CI_XNAME_LAYER.
Speak the message msgXNameLayer_Start.
*/

void function KeymapChangedEvent(int iKeyCode, string sKeyName, int iKeyStatus)
;var
;string sSoundFile
;SayString("key " + sKeyName + ", status " + IntToString(iKeyStatus)) ; debug
if iKeyStatus == KeySequenceStart
|| iKeyStatus  == KeySequenceRestarted then
	If StringCompare (sKeyName, ksAudacityLayer1) == 0 || StringCompare (sKeyName, ksAudacityLayer2) == 0 Then
		let giAudacityKeyLayer = CI_AUDACITY_LAYER
		Let GlobalActiveLayer = NoLayerActive
		PlayJCFSoundFile(Section_Options,hKey_KeyLayerSound)
		return
	EndIf ; Audacity layer key
elif iKeyStatus == KeySequencePending then
	If giAudacityKeyLayer == CI_AUDACITY_LAYER Then
		if StringCompare(sKeyName,ksPositionLayer) == 0 then
			let giAudacityKeyLayer = CI_POSITION_LAYER	
			SayMessage(OT_STATUS,msgPositionLayer_start, msgPositionLayer_start)
			Return
		ElIf StringCompare(sKeyName,ksShortLayer) == 0 then
			let giAudacityKeyLayer = CI_SHORT_LAYER	
			SayMessage(OT_STATUS,msgShortLayer_Start, msgShortLayer_Start)
			Return
		ElIf StringCompare(sKeyName,ksTempoLayer) == 0 then
			let giAudacityKeyLayer = CI_TEMPO_LAYER
			Let gfTempoRunning = FALSE
			SayMessage(OT_STATUS,msgTempoLayer_Start, msgTempoLayer_Start)
			Return
		endIf ; Tempo layer
	EndIf ; Audacity layer
elif iKeyStatus == KeySequenceComplete Then
	if giAudacityKeyLayer Then
		let giAudacityKeyLayer = CI_AUDACITY_NOLAYER
		Return
	EndIf
ElIf iKeyStatus == KeySequenceCanceled
if giAudacityKeyLayer Then
	PlayJCFSoundFile(Section_Options,hKey_TableLayerExitSound)
	;SayString("cancel") ; debug
	let giAudacityKeyLayer = CI_AUDACITY_NOLAYER
	Return
EndIf ; Audacity layer
EndIf ; elif KeySequenceCanceled
KeymapChangedEvent(iKeyCode, sKeyName, iKeyStatus)
endFunction ; KeymapChangedEvent

Script AudacityLayerHelp ()
Say(msgAudacityLayerHelp, OT_USER_REQUESTED_INFORMATION)
EndScript ; AudacityLayerHelp

Script PositionLayerHelp ()
Say(msgPositionLayerHelp, OT_USER_REQUESTED_INFORMATION)
EndScript ; PositionLayerHelp

Script ShortLayerHelp ()
Say(msgShortLayerHelp, OT_USER_REQUESTED_INFORMATION)
EndScript ; ShortLayerHelp

Script SendKey(String sKey)
;Send the key sequence in sKey.  This is used to allow a key to send a specified key sequence to the program.  No label is spoken.
TypeKey(sKey)
EndScript ; SendKey

Function ShowJawsGuide()
SayMessage(OT_JAWS_MESSAGE, msgLoadingJawsGuide_L, msgLoadingJawsGuide_S)
Run(gsJawsGuideLink)
EndFunction ; ShowJawsGuide

Script AudacityKeysHelp ()
If !IsSameScript() && FocusInMainWindow() Then
	If UserBufferIsActive () Then
		UserBufferDeactivate ()
	EndIf
	UserBufferClear()
	UserBufferAddText(FormatString(msgAudacityHotKeyHelp1, CS_JawsGuide_Title, CS_JawsGuide_Author))
	UserBufferAddText(gsJawsGuideLink, "ShowJawsGuide()", CS_JawsGuide_LINK_DISP)
	UserBufferAddText(msgAudacityHotkeyHelp2)
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

Let sMessage=FormatString (msgMoveSelection, msgEnd, msgRight)
Let sScriptName="SelectNextCharacter" ;The default script to perform if not in main window
MarkerMovement (sScriptName, sMessage)
If GetQuickSetting ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	If gfSayPosition Then
		;SayPositionField (ID_SELECTION_END, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_END)
	EndIf
	If gfPreviewMotion Then
		TypeKey (KS_PREVIEW_END_FORWARD)
	EndIf
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

Let sMessage=FormatString (msgMoveSelection, msgEnd, msgLeft)
Let sScriptName="SelectPriorWord"
MarkerMovement (sScriptName, sMessage)
If GetQuickSetting ("AnnounceMessage") && !NoProject () Then
	Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	If gfSayPosition Then
		;SayPositionField (ID_SELECTION_END, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_END)
	EndIf
	If gfPreviewMotion Then
		TypeKey (KS_PREVIEW_END_BACKWARD)
	EndIf
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

Let sMessage=FormatString (msgMoveSelection, msgStart, msgRight)
Let sScriptName="SelectNextWord"
MarkerMovement (sScriptName, sMessage)
If GetQuickSetting ("AnnounceMessage") && !NoProject () Then
	Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	If gfSayPosition Then
		;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_START)
	EndIf
	If gfPreviewMotion Then
		TypeKey (KS_PREVIEW_START_FORWARD)
	EndIf
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

Let sMessage=FormatString (msgMoveSelection, msgStart, msgLeft)
Let sScriptName="SelectPriorCharacter"
MarkerMovement (sScriptName, sMessage)
If GetQuickSetting ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	If gfSayPosition Then
		;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_START)
	EndIf
	If gfPreviewMotion Then
		TypeKey (KS_PREVIEW_START_BACKWARD)
	EndIf
EndIf
EndScript ; StartMarkerLeft

Script JawsHome ()
;If we are speaking an Audacity message, don't speak the key name.
If IsPCCursor () && NoProject () && FocusInTrackPanel () Then
	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () &&!UserBufferIsActive () && !gfInLabel && GetQuickSetting ("AnnounceMessage")Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ;!IsStopped
	JawsHome () ; do Home without speaking key label
	SayFormattedMessage (OT_POSITION, FormatString (msgMoveTo, msgStart, msgAllAudio))
Else
	PerformScript JawsHome ()
EndIf
EndScript ; JawsHome

Script JawsEnd ()
;If we are speaking an Audacity message, don't speak the key name.
If IsPCCursor () && NoProject () && FocusInTrackPanel () Then
	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () && !UserBufferIsActive () && !gfInLabel && GetQuickSetting ("AnnounceMessage") Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ;!IsStopped
	JawsEnd () ; do End without speaking key label
	SayFormattedMessage (OT_POSITION, FormatString (msgMoveTo, msgEnd, msgAllAudio))
	If gfSayPosition > CI_SAY_POSITION_NONE Then
		;SayPositionField (ID_SELECTION_END, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_END)
	EndIf
Else
	PerformScript JawsEnd ()
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
	AnnounceKeyMessage (FormatString (msgMoveTo, msgStart, msgSelectedTracks))
	Pause ()
	;delay(10)
	;Pause ()
	;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
	SchedulePositionField(ID_SELECTION_START)
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
	AnnounceKeyMessage (FormatString (msgMoveTo, msgEnd, msgSelectedTracks))
	Pause ()
	;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
	SchedulePositionField(ID_SELECTION_START)
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
	;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
	SchedulePositionField(ID_SELECTION_START)
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
	;SayPositionField (ID_SELECTION_END, TRUE) ;silence error message
	SchedulePositionField(ID_SELECTION_END)
EndIf
EndScript ; SelectToEnd

Script SelectFromStartOfLine ()
;Select from current position to the start of all audio.
;We do not use AnnounceKeyMessage so that we can execute the default JAWS script instead of just sending the key on.
If NoProject () Then
	SayNoProject ()
	Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!UserBufferIsActive () && !gfInLabel && GetQuickSetting ("AnnounceMessage") Then
	SelectFromStartOfLine ()
	SayFormattedMessage (OT_NO_DISABLE, FormatString (msgSelectTo, msgStart, msgAllAudio)) ;alerts when user activates this script at the main window, and a project is open
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
If IsPCCursor ()&&FocusInTrackPanel ()&&!UserBufferIsActive () && !gfInLabel && (GetQuickSetting ("AnnounceMessage") || gfSayPosition) Then
	SelectToEndOfLine ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayFormattedMessage (OT_NO_DISABLE, FormatString(msgSelectTo, msgEnd, msgAllAudio))
	EndIf ;AnnounceMessage
	If gfSayPosition > CI_SAY_POSITION_NONE Then
		Pause ()
		;SayPositionField (ID_SELECTION_END, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_END)
	EndIf ;if gfSayPosition
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
		SayFormattedMessage (OT_JAWS_MESSAGE, msgDelete_l, msgDelete_s)
	EndIf ; if AnnounceOn
Else ; not main window, etc.
	; !NoProject () && !DialogActive () && !MenusActive () && IsTrackSelected () && !FocusInTrackPanel () 
	; Just in case it is used somewhere else (like CTRL+k).  Actually, we could do it at the top of the script and eliminate this else.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndIf ; else not main window, etc.
EndScript ; DeleteSelectedAudio

Script JawsDelete ()
;If focus is in the main window, a project exists, and audio is selected, the DEL key will delete it.  In this case we perform the script DeleteSelectedAudio.  Otherwise we perform the default script.  DeleteSelectedAudio handles the no project, selected track, and stopped tests.

If FocusInTrackPanel () && !gfInLabel Then
	PerformScript DeleteSelectedAudio()
Else
	; gfInLabel || (IsTrackSelected () && !FocusInTrackPanel ()) ; ?? not sure these are the right conditions here
	PerformScript JawsDelete ()
EndIf
EndScript ; JawsDelete

Script JAWSBackspace ()
;This script is similar to the JawsDelete script.  DeleteSelectedAudio handles the no project, selected track, and stopped tests.
If FocusInTrackPanel () && !gfInLabel Then
	PerformScript DeleteSelectedAudio()
Else
	PerformScript JAWSBackspace()
EndIf
EndScript ; JAWSBackspace

Script SayPriorCharacter ()
If UserBufferIsActive () || DialogActive () || !IsPCCursor () || !FocusInTrackPanel () || gfInLabel Then
	PerformScript SayPriorCharacter ()
	Return
EndIf

If NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project
;Is PC Cursor, user buffer not active, in track panel, not in a dialog, not entering a label, in project.
;If GetQuickSetting ("AnnounceMessage") && IsStopped () Then
If IsStopped () Then
	;In track panel, stopped, not entering a label.
	TypeCurrentScriptKey ()
	Pause ()
	If gfSayPosition Then
		;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_START)
	EndIf
	If gfPreviewMotion Then
		TypeKey (KS_PREVIEW_START_BACKWARD)
	EndIf
;ElIf !IsStopped () Then
Else
	;Stopped.
	TypeCurrentScriptKey ()
/*
Else
	;Stopped, AnnounceMessages off.
	PerformScript SayPriorCharacter ()
*/
EndIf ; else not stopped
EndScript ; SayPriorCharacter

Script SayNextCharacter ()
If UserBufferIsActive () || DialogActive () || !IsPCCursor () || !FocusInTrackPanel () || gfInLabel Then
	PerformScript SayNextCharacter ()
	Return
EndIf

If NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project
;Is PC Cursor, user buffer not active, in track panel, not in a dialog, not entering a label, in project.
;If GetQuickSetting ("AnnounceMessage") && IsStopped () Then
If IsStopped () Then
	;In track panel, stopped, not entering a label.
	TypeCurrentScriptKey ()
	Pause ()
	If gfSayPosition Then
		;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_START)
	EndIf
	If gfPreviewMotion Then
		TypeKey (KS_PREVIEW_START_FORWARD)
	EndIf
;ElIf !IsStopped () Then
Else
	;Not stopped.
	TypeCurrentScriptKey ()
EndIf ; else not stopped
EndScript ; SayNextCharacter

Script SayPriorWord ()
;inside the start
If UserBufferIsActive () || DialogActive () || !IsPCCursor () || !(FocusInTrackPanel () || FocusInSelectionBar ()) || gfInLabel Then
	PerformScript SayPriorWord ()
	Return
EndIf

;Is PC Cursor, user buffer not active, in track panel or selection bar, not in a dialog, not entering a label.
TypeKey(KS_PREVIEW_START_AFTER)
EndScript ; SayPriorWord

Script SayNextWord ()
;inside the end
If UserBufferIsActive () || DialogActive () || !IsPCCursor () || !(FocusInTrackPanel () || FocusInSelectionBar ()) || gfInLabel Then
	PerformScript SayNextWord ()
	Return
EndIf

;Is PC Cursor, user buffer not active, in track panel or selection bar, not in a dialog, not entering a label.
TypeKey(KS_PREVIEW_END_BEFORE)
EndScript ; SayNextWord

Script SelectPriorWord ()
;Outside the start
If UserBufferIsActive () || DialogActive () || !IsPCCursor () || !(FocusInTrackPanel () || FocusInSelectionBar ()) || gfInLabel Then
	PerformScript SelectPriorWord ()
	Return
EndIf

;Is PC Cursor, user buffer not active, in track panel or selection bar, not in a dialog, not entering a label.
TypeKey(KS_PREVIEW_START_BEFORE)
EndScript ; SelectPriorWord

Script SelectNextWord ()
;outside the end
If UserBufferIsActive () || DialogActive () || !IsPCCursor () || !(FocusInTrackPanel () || FocusInSelectionBar ()) || gfInLabel Then
	PerformScript SelectNextWord ()
	Return
EndIf

;Is PC Cursor, user buffer not active, in track panel or selection bar, not in a dialog, not entering a label.
TypeKey(KS_PREVIEW_END_AFTER)
EndScript ; SelectNextWord


Script Copy ()
;Copy selected sound to clipboard in main window.
If NoProject () Then
	SayNoProject ()
	Return
EndIf ; no project
If !IsTrackSelected () &&!UserBufferIsActive ()&&!DialogActive () && !MenusActive () && !gfInLabel Then
	SayNoTrackSelected ()
	Return
ElIf FocusInMainWindow () && !gfInLabel
&&!UserBufferIsActive () Then ;this third condition makes the default script active in virtual viewer
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayUsingVoice (VCTX_MESSAGE, msgCopyAudio, OT_STATUS) ;speak alert message
	EndIf ; if AnnounceOn
Else
	;If no project open, or focus in other windows, perform the default script
	PerformScript CopySelectedTextToClipboard ()
EndIf
EndScript ; Copy

Script CutToClipboard ()
If NoProject () Then
	SayNoProject ()
	Return
EndIf ; no project
If !IsTrackSelected () &&! DialogActive () && !gfInLabel Then
	SayNoTrackSelected ()
	Return
ElIf FocusInMainWindow () && !gfInLabel
&&!UserBufferIsActive () Then ;this third condition makes the default script active in virtual viewer
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf
	TypeCurrentScriptKey ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayUsingVoice (VCTX_MESSAGE, msgCutAudio, OT_STATUS) ;speak alert message
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
EndFunction ; RefreshFocus

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
Say (sMessage, OT_STATUS)
EndScript ; AnnounceOnOff

Script ToggleMotionPreview ()
Var
	String sMessage

;We extract the message from the AdjustJawsOptions constant so we don't need another message constant.
Let sMessage=StringSegment (UO_MOTION_PREVIEW, ":", 2)
If gfToggleMotionPreview Then
	Let gfToggleMotionPreview = FALSE
	Let gfPreviewMotion = GetQuickSetting("PreviewMotion")
	Let sMessage = sMessage + cScSpace + cmsg_off
	Let gfSayPosition = GetQuickSetting("SayPosition")
Else
	Let gfToggleMotionPreview = TRUE
	Let gfPreviewMotion = CI_UO_ON
	Let sMessage = sMessage + cScSpace + cmsg_on
	Let gfSayPosition = CI_UO_OFF
EndIf
Say (sMessage, OT_STATUS)
EndScript ; ToggleMotionPreview

Void Function SayActiveLabel ()
;Speak the text of the active label if any.  Assumes focus in track panel.
SaveCursor ()
InvisibleCursor ()
RouteInvisibleToPc ()
;Delay(2)
Pause ()
If FindColors (IgnoreColor, RGBStringToColor ("255255255"), s_next, TRUE) Then
	Say(GetColorField (), OT_LINE)
EndIf
RestoreCursor ()
EndFunction ; SayActiveLabel

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
	While hNext && (IsWindowDisabled (hNext) || !IsWindowVisible (hNext))
		Let hNext = GetNextWindow(hNext)
	EndWhile
	If !hNext Then
		Let hNext = GetFirstWindow (hToolbar)
	EndIf ; last window
	Let hWnd = GetFirstChild (hNext)
	;Toolbars start with a grabber control, and some of them have static controls following the grabber.  We skip these to get to the first control.
	While hWnd && ( IsWindowDisabled(hWnd) ; V2.1.3
	|| (StringCompare(GetWindowClass(hWnd), WC_wxWindowClass) == 0) ;Pre 2.1.2
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
	While hPrior && (IsWindowDisabled (hPrior) || !IsWindowVisible (hPrior))
		Let hPrior = GetPriorWindow (hPrior)
	EndWhile
	;hPrior is previous visible toolbar, or null if none
	If !hPrior Then
		Let hPrior = GetLastWindow (hToolbar) ;last toolbar
	EndIf ; first window
	Let hWnd = GetLastWindow(GetFirstChild (hPrior))
	While hWnd && IsWindowDisabled (hWnd)
		Let hWnd = GetPriorWindow (hWnd)
	EndWhile
	;If !hWnd then all of the windows on the toolbar are disabled!!!
	If hWnd Then
		SetFocus (hWnd)
	EndIf
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
	;In Audacity 2.3.3 this is TopPanel, and toolbars are children of this window.
Let hTemp = FindToolbar (WN_TRANSPORT_TOOLBAR)
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
	Let gfInLabel = FALSE
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
Else
	PerformScript OpenListBox ()
EndIf
EndScript ; OpenListBox

Script CloseListBox ()
;If focus is in the track panel, pass the key through.
If FocusInTrackPanel() Then
	;SayString("move track up") ; debug
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
Else
	PerformScript CloseListBox ()
EndIf
EndScript ; CloseListBox

Int Function IsDigits(String s)
;Returns True if all of the characters in s are digits, +, or -.
Var
	String s2

Let s2 = stringStripAllBlanks(StringReplaceChars(s, "+-0123456789", " "))
;SayString("IsDigits(" + s + "), s2 = " + s2 + ", returning " + IntToString(StringLength(s2))) ; debug
Return StringLength(s2) == 0
EndFunction ; IsDigits

Void Function NavigateTrackPanel (String sDest, String sUpKey, String sDownKey)
;sDest: string containing the number of the track to move to.  If starts with + move down that many tracks, if -, move up that many tracks.  If it would move beyond the first or last track its value is adjusted acordingly.
;sUpKey: string containing name of key to move up (to lower numbered tracks).
;sDownKey: string containing name of key to move down (to higher numbered tracks).
;Assumes focus in track panel.
Var
	Object o,
	Int iNum,
	Int iStart,
	Int iMax,
	Int iCount,
	Int fSilence,
	String sKey,
	String s

Let iStart = GetFocusObject (0).accFocus
Let iMax = GetFocusObject (0).accChildCount
;SayString ("iNum = " + IntToString (iNum) + ", iStart = " + IntToString (iStart) + ", iMax = " + IntToString(iMax)) ; debug
Let sDest = stringStripAllBlanks(sDest)
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
If iNum < 0 Then
	Let sKey = sUpKey
Else
	Let sKey = sDownKey
EndIf
Let fSilence = gfSilence
Let gfSilence = TRUE
While iCount > 0
	TypeKey(sKey)
	If iCount % 3 == 0 Then
		Delay(1)
	EndIf
	Let iCount = iCount - 1
EndWhile
Pause()
Pause()
Let gfSilence = fSilence

EndFunction ; NavigateTrackPanel

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

EndScript ; GoToTrack

Script MarkTrack ()
If !FocusInTrackPanel () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf

Let giTrackMark = GetFocusObject (0).accFocus
SayMessage (OT_JAWS_MESSAGE, FormatString (msgTrackMarked, IntToString (giTrackMark)))
EndScript ; MarkTrack

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
EndScript ; GoToMarkedTrack

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
EndScript ; ExchangeWithMark

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
EndScript ; MoveCurrentTrackToMark

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

EndScript ; MoveTrackUp

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

EndScript ; MoveTrackDown

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
Let iMSAAMode = GetJCFOption (OPT_MSAA_MODE)
SetJCFOption (OPT_MSAA_MODE, 1)
	Let obj = GetObjectFromEvent(hWnd, -4, 0, iTemp)
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
In AdjustJawsOptions and AdjustJawsVerbosity add UO_OPTION_NAME to variable strListOfOptions.
In audacity.jsm add a UO_OPTION_NAME constant and a msgUO_OptionNameHlp message.  UO_OPTION_NAME is a string containing the function name UOOptionName, a colon, and the text that appears in the text attribute of the DisplayName element in audacity.qsm.  The value of msgUOOptionName is the line from the HelpMsg element in audacity.qsm.
*/

Script AdjustJawsVerbosity ()
;This is to support JAWS versions that do not support tree-style user options.  This should work but may not look very nice.  Not tested!
Var
	String strListOfOptions

;Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS
Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS + _DLG_SEPARATOR + UO_ENTER_PAUSE + _DLG_SEPARATOR + UO_SILENCE_PREVIEW + _DLG_SEPARATOR + UO_SILENCE_RECORD
JAWSVerbosityCore (strListOfOptions)
EndScript ; AdjustJawsVerbosity

Script AdjustJAWSOptions ()
Var
	String strListOfOptions
If InHJDialog () Then
	SayFormattedMessage (OT_ERROR, cMSG337_L, cMSG337_S)
	Return
EndIf
Let strListOfOptions = UO_ANNOUNCE_MESSAGES + _DLG_SEPARATOR + UO_ANNOUNCE_TOOLBARS + _DLG_SEPARATOR + UO_ENTER_PAUSE + _DLG_SEPARATOR + UO_SILENCE_PREVIEW + _DLG_SEPARATOR + UO_SILENCE_RECORD
If GetJFWVersion () >= 900000 Then
	OptionsTreeCore (strListOfOptions) ;the OptionsTreeCore available in JAWS 9.0 or later
Else
	JAWSVerbosityCore (strListOfOptions) ;The AdjustJawsVerbosity available prior to Jaws 9.0. Not tested
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
;This function is also used in script AnnounceOnOff.
Var
	Int iVal
Let iVal = IniReadInteger (gsIniSection, "AnnounceMessage", CI_MESSAGES_OFF, gsIniFile)
If !iRetCurVal Then
	If iVal == CI_MESSAGES_FULL Then
		Let iVal = CI_MESSAGES_OFF
	Else
		; This paves the way for multiple values.
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "AnnounceMessage", iVal, gsIniFile)
EndIf ; if !iRetCurVal
If iVal == CI_MESSAGES_OFF Then
	Return cmsg_off
ElIf iVal == CI_MESSAGES_FULL Then
	Return cmsg_on
EndIf
EndFunction ; UOAnnounceMessages

String Function UOAnnounceMessagesHlp ()
Return msgUO_AnnounceMessagesHlp
EndFunction ; UOAnnounceMessagesHlp

String Function UOAnnounceToolbars (Int iRetCurVal)
Var
	Int iVal

Let iVal = IniReadInteger (gsIniSection, "Announcetoolbars", CI_TOOLBARS_OFF, gsIniFile)
If !iRetCurVal Then
	If iVal == CI_TOOLBARS_ON Then
		Let iVal = CI_TOOLBARS_OFF
	Else
		; This paves the way for multiple values.
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "Announcetoolbars", iVal, gsIniFile)
EndIf ; if !iRetCurVal
If iVal == CI_TOOLBARS_OFF Then
	Return cmsg_off
ElIf iVal == CI_TOOLBARS_ON Then
	Return cmsg_on
EndIf
EndFunction ; UOAnnounceToolbars

String Function UOAnnounceToolbarsHlp ()
Return msgUO_AnnounceToolbarsHlp
EndFunction ; UOAnnounceToolbarsHlp

String Function UOEnterPause (Int iRetCurVal)
Var
	Int iVal

Let iVal = IniReadInteger (gsIniSection, "EnterPause", CI_ENTERPAUSE_ON, gsIniFile)
If !iRetCurVal Then
	If iVal == CI_ENTERPAUSE_ON Then
		Let iVal = CI_ENTERPAUSE_OFF
	Else
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "EnterPause", iVal, gsIniFile)
EndIf ; if !iRetCurVal
If iVal == CI_ENTERPAUSE_OFF Then
	Return cmsg_off
ElIf iVal == CI_ENTERPAUSE_ON Then
	Return cmsg_on
EndIf
EndFunction ; UOEnterPause

String Function UOEnterPauseHlp ()
Return msgUO_EnterPauseHlp
EndFunction ; UOEnterPauseHlp

String Function UOSilencePreview (Int iRetCurVal)
Var
	Int iVal

Let iVal = IniReadInteger (gsIniSection, "SilencePreview", CI_UO_ON, gsIniFile)
If !iRetCurVal Then
	If iVal == CI_UO_ON Then
		Let iVal = CI_UO_OFF
	Else
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "SilencePreview", iVal, gsIniFile)
EndIf ; if !iRetCurVal
If iVal == CI_UO_OFF Then
	Return cmsg_off
ElIf iVal == CI_UO_ON Then
	Return cmsg_on
EndIf
EndFunction ; UOSilencePreview

String Function UOSilencePreviewHlp ()
Return msgUO_SilencePreviewHlp
EndFunction ; UOSilencePreviewHlp

String Function UOSilenceRecord (Int iRetCurVal)
Var
	Int iVal

Let iVal = IniReadInteger (gsIniSection, "SilenceRecord", CI_UO_ON, gsIniFile)
If !iRetCurVal Then
	If iVal == CI_UO_ON Then
		Let iVal = CI_UO_OFF
	Else
		Let iVal = iVal + 1
	EndIf
	IniWriteInteger (gsIniSection, "SilenceRecord", iVal, gsIniFile)
EndIf ; if !iRetCurVal
If iVal == CI_UO_OFF Then
	Return cmsg_off
ElIf iVal == CI_UO_ON Then
	Return cmsg_on
EndIf
EndFunction ; UOSilenceRecord

String Function UOSilenceRecordHlp ()
Return msgUO_SilenceRecordHlp
EndFunction ; UOSilenceRecordHlp

Void Function AddDefaultConfig ()
;Adds values of default settings to Audacity.JSI File.  
IniWriteInteger (gsIniSection, "AnnounceMessage", CI_MESSAGES_FULL, gsIniFile, FALSE) ; don't flush because we're going to write another one
IniWriteInteger (gsIniSection, "EnterPause", CI_ENTERPAUSE_ON, gsIniFile, FALSE) ; don't flush because we're going to write another one
IniWriteInteger (gsIniSection, "AnnounceToolbars", CI_TOOLBARS_ON, gsIniFile, FALSE) ; no flush
IniWriteInteger (gsIniSection, "SilencePreview", CI_UO_ON, gsIniFile, FALSE) ; no flush
IniWriteInteger (gsIniSection, "SilenceRecord", CI_UO_ON, gsIniFile, FALSE) ; no flush
IniWriteInteger (gsIniSection, "SayPosition", CI_UO_ON, gsIniFile, FALSE) ; no flush
IniWriteInteger (gsIniSection, "PreviewMotion", CI_UO_OFF, gsIniFile, FALSE) ; no flush
IniWriteString (gsIniSection, "JAWSGuideLink", CS_JawsGuide_LINK, gsIniFile, TRUE)
Let gsJawsGuideLink = CS_JawsGuide_LINK
;Let gsJawsGuideTitle = CS_JawsGuide_Title
EndFunction ; AddDefaultConfig

Script ResetConfig ()
;Reset all audacity JAWS script options to their default values.
Var
	String sMessage

;First we remove the old key because of our changes in Audacity.JSI file made by script v1.1.
If GetJFWVersion()<1300000 && FileExists (FindJAWSPersonalizedSettingsFile (gsIniFile, TRUE)) Then
	;Remove obsolete key if it exists.
	Let sMessage=IniReadString (gsIniSection, "announce", "", gsIniFile) ;the old key "anounce" has been changed to "AnnounceMessage"
	If sMessage Then
		IniRemoveKey (gsIniSection, "announce", gsIniFile, FALSE)
	EndIf ;sMessage
EndIf ;FileExists
AddDefaultConfig ()
Say (msgResetScriptOptions, OT_MESSAGE)
EndScript ; ResetConfig

Script SayAppVersion ()
;Says current program and script version
Var
	String sMessage

PerformScript SayAppVersion () ;Says current program version
Let sMessage=FormatString (msg_Script_Version, CS_SCRIPT_VERSION) ;current script version
Say (sMessage, OT_NO_DISABLE) ;says current script version
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
	SayUsingVoice (VCTX_MESSAGE, MSGSelectAll, OT_STRING)
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
;For use by short/long jumps (,, ., etc.).  sends the key, if in track panel and gfPreviewMotion or gfSayPosition speaks start position, otherwise speaks the key label.
;If you want a separate script for each key, turn this into a function and call it from the scripts.
;Var
;Handle hWnd

If !UserBufferIsActive ()&&FocusInTrackPanel () && NoProject () Then
	TypeCurrentScriptKey ()
	SayNoProject ()
	Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel () && !gfInLabel && (gfSayPosition || gfPreviewMotion) && IsStopped () Then
	;Pause ()
	;Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	;Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
	;TypeCurrentScriptKey () ;if we use SayPositionField
	If gfSayPosition Then
		;SayPositionField (ID_SELECTION_START, TRUE) ;silence error message
		SchedulePositionField(ID_SELECTION_START)
	EndIf ;if gfSayPosition
	TypeCurrentScriptKey () ; should come after SchedulePositionField
	If gfPreviewMotion Then
		TypeKey (KS_PREVIEW_START_AFTER)
	EndIf ;if gfPreviewMotion
Else
	TypeCurrentScriptKey ()
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
	;After moving to a lable with ALT+RIght/LeftArrow you must change to a different track (and back) for the track to test as selected.  We disable this test until this is fixed in Audacity or a work-around is found.
	If True Then
		Return TRUE
	EndIf
If NoProject () Then
	Return FALSE
Else
	Let hWnd = GetFirstChild (GetLastWindow (GetFirstChild (GetAppMainWindow (GetFocus ()))))
	;SayString ("Window name = " + GetWindowName(hWnd)) ; debug
	Let iMSAAMode = GetJCFOption(OPT_MSAA_MODE)
	SetJCFOption(OPT_MSAA_MODE, 1)
	Let obj = GetObjectFromEvent(hWnd, -4, 0, i)
	; obj is the table.
	Let iTrackCount = obj.accChildCount
	Let i = 1
	While i <= iTrackCount
		Let iState = obj.accState(i)
		;This is a bitwise and, we are testing the bit for the selected state.
		If iState & STATE_SYSTEM_SELECTED Then
			SetJCFOption(OPT_MSAA_MODE, iMSAAMode)
			Return TRUE
		EndIf ; selected
		Let i = i + 1
	EndWhile
	;None selected.
	SetJCFOption(OPT_MSAA_MODE, iMSAAMode)
	Return FALSE
EndIf ;Else project exists
EndFunction ; IsTrackSelected

Void Function SayNoTrackSelected ()
;Announce that the current track is not selected
If !NoProject () &&!MenusActive () Then ;Only announce when a project exists
	SayMessage (OT_ERROR, MsgNoTrackSelected_L, msgNoTrackSelected_S)
EndIf ;No project
EndFunction ; SayNoTrackSelected

Int Function IsWarningDialog ()
;Verify that focus is in the warning dialog that appears when importing uncompressed audio files.
Var
	String sName

Let sName = GetWindowName (GetFocus ())
If DialogActive ()
&& (sName==msgCopy
||sName==msgDirectEdit
||sName==msgDoNotWarn) Then
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
Var
	String sName,
	Handle hFocus,
	Int iMSAA_JCFOpt

Let gfInLabel = FALSE
If IsPCCursor () && NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project

If IsPCCursor () && DialogActive () Then
	Let hFocus = GetFocus ()
	Let sName=GetWindowName (GetRealWindow (GetCurrentWindow ()))
	If (sName == WN_EQUALIZATION || sName == WN_GRAPHIC_EQ) && GetWindowSubtypeCode (hFocus) == WT_UPDOWNSLIDER Then
		PriorLine ()
		Pause ()
		Let iMSAA_JCFOpt = GetJCFOption (OPT_MSAA_MODE)
		SetJCFOption (OPT_MSAA_MODE, 2)
		SayControlEx(hFocus, 
		"", cScSpace,   ; control name, type
		"",   ; control state
		"", "",   ; Container name, type
		GetObjectValue (), "",   ; value, position
		"")   ; dialog text
		SetJCFOption (OPT_MSAA_MODE, iMSAA_JCFOpt)
		Return TRUE
	EndIf ;Equalizer dlg
EndIf ; dialog active

PerformScript SayPriorLine ()
EndScript ; SayPriorLine


Script SayNextLine ()
Var
	String sName,
	Handle hFocus,
	Int iMSAA_JCFOpt

Let gfInLabel = FALSE
If IsPCCursor () && NoProject () Then
	SayNoProject ()
	Return
EndIf ; if no project

If IsPCCursor () && DialogActive () Then
	Let hFocus = GetFocus ()
	Let sName=GetWindowName (GetRealWindow (GetCurrentWindow ()))
	If (sName == WN_EQUALIZATION || sName == WN_GRAPHIC_EQ) && GetWindowSubtypeCode (hFocus) == WT_UPDOWNSLIDER Then
		NextLine ()
		Pause ()
		Let iMSAA_JCFOpt = GetJCFOption (OPT_MSAA_MODE)
		SetJCFOption (OPT_MSAA_MODE, 2)
		SayControlEx(hFocus, 
		"", cScSpace,   ; control name, type
		"",   ; control state
		"", "",   ; Container name, type
		GetObjectValue (), "",   ; value, position
		"")   ; dialog text
		SetJCFOption (OPT_MSAA_MODE, iMSAA_JCFOpt)
		Return TRUE
	EndIf ;Equalizer dlg
EndIf ; dialog active

PerformScript SayNextLine ()
EndScript ; SayNextLine

Script SelectPriorLine ()
;In selection bar edit controls plays a preview after moving the digit.  Note that Shift+UpArrow moves the position forward.
Var
	Int iId,
	Int fOldSilence

If !FocusInMainWindow () || UserBufferIsActive () Then
	PerformScript SelectPriorLine ()
	Return
EndIf
Let iId = GetControlID (GetFocus ())
Let fOldSilence = gfSilence
If iId == GetPositionFieldID (ID_SELECTION_START) Then
	Let gfSilence = TRUE
	TypeCurrentScriptKey ()
	TypeKey (KS_PREVIEW_START_FORWARD)
	Pause ()
	Let gfSilence = fOldSilence
	Return
EndIf
If iId == GetPositionFieldID (ID_SELECTION_END) Then
	Let gfSilence = TRUE
	TypeCurrentScriptKey ()
	TypeKey (KS_PREVIEW_END_FORWARD)
	Pause ()
	Let gfSilence = fOldSilence
	Return
EndIf
;Catch-all, shouldn't happen.
PerformScript SelectPriorLine ()
EndScript ; SelectPriorLine

Script SelectNextLine ()
;In selection bar edit controls plays a preview after changing the digit.  Note that Shift+DownArrow moves the position backward.
Var
	Int iId,
	Int fOldSilence

If !FocusInMainWindow () || UserBufferIsActive () Then
	PerformScript SelectNextLine ()
	Return
EndIf
Let fOldSilence = gfSilence
Let iId = GetControlID (GetFocus ())
If iId == GetPositionFieldID (ID_SELECTION_START) Then
	Let gfSilence = TRUE
	TypeCurrentScriptKey ()
	TypeKey (KS_PREVIEW_START_BACKWARD)
	Pause ()
	Let gfSilence = fOldSilence
	Return
EndIf
If iId == GetPositionFieldID (ID_SELECTION_END) Then
	Let gfSilence = TRUE
	TypeCurrentScriptKey ()
	TypeKey (KS_PREVIEW_END_BACKWARD)
	Pause ()
	Let gfSilence = fOldSilence
	Return
EndIf
;Catch-all, shouldn't happen.
PerformScript SelectNextLine ()
EndScript ; SelectNextLine

Script SwitchChainsList ()
;Switch between the Chains and Chain Commands lists in the Edit Chains dialog.
;In Audacity v2.3.0 this became the Manage Macros dialog.
;Feature suggested by Dang Manh Cuong
;Code given by Gary Campbell
Var
	Handle wnd,
	Handle hReal,
	Int iCurId,
	String sMessage,
	String sDlgTitle,
	String sMsgChainsList,
	String sMsgCmdsList


If CheckAudacityVersion("2,3,0") Then
	Let sDlgTitle = WN_MANAGE_MACROS
	Let sMsgChainsList = msgMacros
	Let sMsgCmdsList = msgMacroCommands
Else
	Let sDlgTitle = WN_EDIT_CHAINS
	Let sMsgChainsList = msgChains
	Let sMsgCmdsList = msgChainCommands
EndIf ; else pre 2.3.0
Let hReal = GetRealWindow (GetFocus ())
If DialogActive () &&GetWindowName (hReal)==sDlgTitle Then
	Let iCurId = GetControlID (GetFocus ())
	If iCurId == ID_Chains_List Then
		If CheckAudacityVersion ("2,0,4") Then ;The control IDs of Chain Commands list changed in Audacity 2.0.4. 
			;SayString("Finding chain commands") ; debug
			Let		wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Chain_Cmds_List2)
		Else
			;pre 2.0.4
			Let		wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Chain_Cmds_List)
		EndIf ;Check Audacity version
		Let sMessage=sMsgCmdsList ;list of commands in the right list
	Else
		Let wnd=FindDescendantWindow (hReal, ID_Chains_List)
		Let sMessage=sMsgChainsList ;list of chains in the left list
	EndIf ; Else neither list.
	;SayString("Focus to " + IntToString(wnd)) ; debug
	SetFocus (wnd)
	;speaks a message when switching between the listss
	If GetQuickSetting ("AnnounceMessage") Then
		SayUsingVoice (VCTX_MESSAGE, sMessage, OT_STRING)
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
If !IsStopped () Then
	SayNotStopped ()
	Return
Else
	PerformScript PasteFromClipboard ()
EndIf 
EndScript ; PasteFromClipboard

Script SayRecordingMeter()
Var String s,
	Handle hTemp,
	Handle hParent
If DialogActive () || !FocusInMainWindow () || gfInLabel Then
	TypeCurrentScriptKey ()
	SayCurrentScriptKeyLabel ()
	Return
EndIf
Let hTemp = FindToolbar (WN_RECORDING_METER_TOOLBAR)
If hTemp Then
	Let hTemp = GetNextWindow (GetFirstChild (hTemp))
EndIf 
If !hTemp || !IsWindowVisible (hTemp) Then
	/*
	;This was to find the combined meter when not docked.  It doesn't work, since the frame order can change.
	Let hTemp = GetAppMainWindow(hParent)
	Let hTemp = GetPriorWindow (GetPriorWindow(GetPriorWindow (hTemp)))
	Let hTemp = FindDescendantWindow (hTemp, ID_RECORDING_METER_COMBINED2)
	*/
	Let hTemp = FindWindow (hParent, "", WN_COMBINED_METER_TOOLBAR)
	If hTemp Then
		Let hTemp = GetNextWindow (GetFirstChild (hTemp))
	EndIf
EndIf
If !hTemp || !IsWindowVisible (hTemp) Then
	If CheckAudacityVersion("2,2,0") Then
		Let s = msgNoRecordingMeter22
	Else
		Let s = msgNoRecordingMeter
	EndIf
	Say (s, OT_ERROR)
	Return
EndIf ; if no recording meter
;EndIf ;else recording meter
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
EndScript ; SayRecordingMeter

Script SayPlaybackMeter()
Var String s,
	Handle hTemp,
	Handle hParent
If DialogActive () || !FocusInMainWindow ()  || gfInLabel Then
	TypeCurrentScriptKey ()
	SayCurrentScriptKeyLabel ()
	Return
EndIf
Let hTemp = FindToolbar (WN_PLAYBACK_METER_TOOLBAR)
If hTemp Then
	Let hTemp = GetNextWindow (GetFirstChild (hTemp))
EndIf
If !hTemp || !IsWindowVisible (hTemp) Then
	/*
	;This was to find the combined meter when not docked.  It doesn't work, since the frame order can change.
	Let hTemp = GetAppMainWindow(hParent)
	Let hTemp = GetPriorWindow (GetPriorWindow(GetPriorWindow (hTemp)))
	Let hTemp = FindDescendantWindow (hTemp, ID_PLAYBACK_METER_COMBINED2)
	*/
	Let hTemp = FindWindow (hParent, "", WN_COMBINED_METER_TOOLBAR)
	If hTemp Then
		Let hTemp = GetNextWindow (GetNextWindow (GetFirstChild (hTemp)))
	EndIf
EndIf ;combined meter
If !hTemp || !IsWindowVisible (hTemp) Then
	If CheckAudacityVersion("2,2,0") Then
		Let s = msgNoPlaybackMeter22
	Else
		Let s = msgNoPlaybackMeter
	EndIf
	Say (s, OT_ERROR)
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
EndScript ; SayPlaybackMeter

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

Let fRes = TRUE
Let iCounter = 1
While fRes && iCounter <= iMax
	Let iTemp = StringToInt(StringSegment(sVersion, ",", iCounter))
	Let iTemp2 = StringToInt(StringSegment(sCheckVer, ",", iCounter))
	If iTemp > iTemp2 Then
		Return TRUE
	ElIf iTemp < iTemp2 Then
		Return FALSE
	EndIf
	;Equal
	Let iCounter = iCounter + 1
EndWhile
Return TRUE
EndFunction ; CheckAudacityVersion

Script test ()
;Test FocusInMainWindow
Var String s,
	Handle hTemp

;/*
SayString("ghSayPositionField = " + IntToString(ghSayPositionField) + "," + IntToString(gfPositionFieldUpdated)) ; debug
;*/
/*
SayString("gfSayPosition = " + IntToString(gfSayPosition)) ; debug
*/
/*
SayString("FocusInSelectionBar = " + IntToString(FocusInSelectionBar ())) ; debug
*/
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
/*
If FocusInTrackPanel() Then
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
/*
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
*/
SayString("IsToolBar = " + IntToString(IsToolbar(GetToolbar())))
EndScript ; test

Void Function loadNonJCFOptions ()
;This function is used by the QuickSettings facility, support for Jaws 13 and later
Var
	String NonJCF ;the section for storing settings within the JCF file
Let NonJCF="NonJCFOptions"
;Now read the info from the NonJCFOptions section of Audacity.jcf.
;The value following the key name is the default value.
Let announceMessage=IniReadInteger (NonJCF, "AnnounceMessage", CI_MESSAGES_FULL, "Audacity.jcf")
Let AnnounceToolbars=IniReadInteger (NonJCF, "AnnounceToolbars", CI_TOOLBARS_ON, "audacity.jcf")
Let gfEnterPause=IniReadInteger (NonJCF, "EnterPause", CI_ENTERPAUSE_ON, "audacity.jcf")
Let gfSilencePreview = IniReadInteger (NonJCF, "SilencePreview", CI_UO_ON, "audacity.jcf")
Let gfRecordSpeechOff=IniReadInteger (NonJCF, "SilenceRecord", CI_UO_ON, "audacity.jcf")
Let gfSayPosition=IniReadInteger (NonJCF, "SayPosition", CI_UO_ON, "audacity.jcf")
Let gfPreviewMotion=IniReadInteger (NonJCF, "PreviewMotion", CI_UO_OFF, "audacity.jcf")
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
IniWriteInteger (gsIniSection, "SayPosition", gfSayPosition, gsIniFile, false)
IniWriteInteger (gsIniSection, "PreviewMotion", gfPreviewMotion, gsIniFile, false)
IniWriteInteger (gsIniSection, "SilencePreview", gfSilencePreview, gsIniFile, False)
IniWriteInteger (gsIniSection, "SilenceRecord", gfRecordSpeechOff, gsIniFile, False)
IniWriteInteger (gsIniSection, "AnnounceToolbars", AnnounceToolbars, gsIniFile, true)
*/
;The condition below got from JAWS Scripts for Foobar 2000 (written by Andrew Hart)
If GetJFWVersion()<1300000 Then
	Return ; prevent loadNonJCFOptions from chaining to itself since it doesn't exist in JAWS version prior to 13.0
EndIf ;Get JFW
loadNonJCFOptions ()
EndFunction ; loadNonJCFOptions

Script AddAudacityJawsGuide ()
;Script for adding new Jaws Guide link if present
Var
	String sURL, ;The current URL gotten from the JSI file
	String sTemp, ;store current URL
	String sNewURL ;The New URL added by user
Let sURL=IniReadString (gsIniSection, "JAWSGuideLink", sURL, gsIniFile) ;get the URL from settings file
If StringIsBlank(sURL) Then
	;Set default
	Let sURL = CS_JawsGuide_LINK
EndIf
Let sTemp=sURL ;store current URL
;Now display the input box wich contains the Current URL, and allows changing it
InputBox (MSGJawsGuideDialog, "Add Audacity Jaws Guide Link", sURL)
Let sNewURL=sURL ;get the URL from the box.
If StringIsBlank (sNewURL) 
|| sNewURL==sTemp Then ;user doesn't enter anything, or the URL from the box and the original URL are the same.
	SayFormattedMessage (OT_JAWS_MESSAGE, msgNoChange_l, msgNoChange_s)
	Return
ElIf sNewURL != sTemp Then
	Let gsJawsGuideLink = sNewURL
	IniWriteString (gsIniSection, "JAWSGuideLink", gsJawsGuideLink, gsIniFile, TRUE)
	SayFormattedMessage (OT_JAWS_MESSAGE, FormatString (MSGNewURL, sNewURL))
EndIf
EndScript ; AddAudacityJawsGuide

Script Record ()
;Don't speak Record or Record-Append keys.
If DialogActive () ||MenusActive () || gfInLabel Then
	;A dialog is open or we are writing a label, pass key to application and speak its label.
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
Else
	If gfRecordSpeechOff == 1 Then
		;Stop Jaws from saying: "track 1, track 2, etc
		Let gfSilence = TRUE
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
Let gfSilence = FALSE
Let giScheduleClearSilence = 0
EndFunction ; ClearSilence

Script AddLabelAtSelection ()
If FocusInMainWindow () Then
	Let gfInLabel = TRUE
EndIf
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
;The following types key, says label, and speaks message.  Comment out last 2 lines if you use it.
;AnnounceKeyMessage (msgAddLabel)
EndScript ; AddLabelAtSelection

Script AddLabelAtPlayPosition ()
If NoProject () Then
	SayNoProject ()
	Return
EndIf ;No project
If !IsStopped () Then
	Let gfInLabel = TRUE
EndIf ; if not stopped
SayCurrentScriptKeyLabel ()
TypeCurrentScriptKey ()
;The following types key, says label, and speaks message.  Comment out last 2 lines if you use it.
;AnnounceKeyMessage (msgAddLabelPlaying)
EndScript ; AddLabelAtPlayPosition

Void Function SayTimelineEnd ()
Var
	Handle hTemp

Let hTemp = GetFirstChild (GetAppMainWindow (GetFocus()))
Let hTemp = GetNextWindow (hTemp) ; parent of toolbars
Let hTemp = GetNextWindow(GetFirstChild(hTemp)) ;timeline
SaveCursor ()
MoveToWindow (hTemp)
Pause ()
JawsEnd ()
Pause ()
SayWord ()
RestoreCursor ()
EndFunction ; SayTimelineEnd

;*** More scripts for Audacity keys
Script ZoomNormal ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgZoomNormal)
	SayTimelineEnd ()
EndIf
EndScript ; ZoomNormal

Script ZoomIn ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgZoomIn)
	SayTimelineEnd ()
EndIf
EndScript ; ZoomIn

Script ZoomOut ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgZoomOut)
	SayTimelineEnd ()
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgDuplicate)
EndIf
EndScript ; Duplicate

Script Trim ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitCut)
EndIf
EndScript ; SplitCut

Script SplitDelete ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplit)
EndIf
EndScript ; Split

Script SplitNew ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitNew)
EndIf
EndScript ; SplitNew

Script Join ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgJoin)
EndIf
EndScript ; Join

Script Disjoin ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgDisjoin)
EndIf
EndScript ; Disjoin

Script CutLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgCutLabels)
EndIf
EndScript ; CutLabels

Script DeleteLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgDeleteLabels)
EndIf
EndScript ; DeleteLabels

Script SplitCutLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitCutLabels)
EndIf
EndScript ; SplitCutLabels

Script SplitDeleteLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitDeleteLabels)
EndIf
EndScript ; SplitDeleteLabels

Script SilenceLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSilenceLabels)
EndIf
EndScript ; SilenceLabels

Script CopyLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgCopyLabels)
EndIf
EndScript ; CopyLabels

Script SplitLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgSplitLabels)
EndIf
EndScript ; SplitLabels

Script JoinLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgJoinLabels)
EndIf
EndScript ; JoinLabels

Script DisjoinLabels ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgZoomSel)
	SayTimelineEnd ()
EndIf
EndScript ; ZoomSel

Script FitInWindow ()
If NoProject () Then
	SayNoProject ()
	Return
Else
	AnnounceKeyMessage (msgFitInWindow)
	SayTimelineEnd ()
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgGoSelStart)
EndIf
EndScript ; GoSelStart

Script GoSelEnd ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
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
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
	SayNotStopped ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (msgMixAndRenderToNewTrack)
EndIf
EndScript ; MixAndRenderToNewTrack

Script RepeatLastEffect ()
If !FocusInMainWindow () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If NoProject () Then
	SayNoProject ()
	Return
ElIf !IsStopped () Then
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
If !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgInputDevice)
EndIf
EndScript ; InputDevice

Script OutputDevice ()
If !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgOutputDevice)
EndIf
EndScript ; OutputDevice

Script AudioHost ()
If !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgAudioHost)
EndIf
EndScript ; AudioHost

Script InputChannels ()
If !FocusInMainWindow () || gfInLabel Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
	Return
EndIf
If !IsStopped () Then
	SayNotStopped ()
Else
	AnnounceKeyMessage (msgInputChannels)
EndIf
EndScript ; InputChannels

;*** Tempo

/*
; Uses arrays -- JAWS 11 update 1 and later.  Also need to uncomment additional tempo globals above (search for "JAWS 11") and comment out other implementation below.
Script TempoStartStop ()
var
	Int iTempoAvg,
	Int iTemp,
	String s2


If !gfTempoRunning Then
	Let gsTempoBPM = ""
	Let giTempoCount = 0
	Let giTempoStart = 0
	Let giTempoLast = 0
	Let gaiTempoTimes = New IntArray [8]
	;Let giTempoTimesNext = 1
	Let giTempoSum = 0
	Let gfTempoRunning = True
	;TypeKey (cksSpace) ;Start playback.
	If GetAudacityState () == ST_STOPPED Then
		TypeKey (cksSpace)
	EndIf
Else
	;running, stop if we are playing
	If GetAudacityState () == ST_PLAY Then
		TypeKey (cksSpace)
	EndIf
	Let gfTempoRunning = False
	If GiTempoStart && giTempoLast && giTempoCount > 1 Then
		Let iTempoAvg = giTempoSum / giTempoCount - 1
		Let iTemp = 600000/ iTempoAvg
		;iTemp is 10*BPM.
		;Division might round or something, so we get the tenths digit with string manipulation.
		Let gsTempoBPM = IntToString (iTemp)
		Let s2 = StringRight(gsTempoBPM, 1)
		Let gsTempoBPM = StringChopRight (gsTempoBPM, 1)
		if s2 != "0" Then
			Let gsTempoBPM = gsTempoBPM + "." + s2
		EndIf
		PerformScript TempoAnnounce ()
	Else
		Say (msgTempoNoBeats, OT_ERROR)
		Return
	EndIf ;giTempoStart && giTempoLast
EndIf ;else running
EndScript

Script TempoTap ()
Var
	Int iTempoCur

If gfTempoRunning Then
	Let iTempoCur = GetTickCount ()
	If !giTempoStart Then
		Let giTempoCount = 1
		Let giTempoLast = iTempoCur
		Let giTempoStart = giTempoLast
	Else
		;not first
		TempoAddTime (iTempoCur - giTempoLast)
		Let giTempoLast = iTempoCur
	EndIf ;else not first
EndIf ;If running
EndScript

Void Function TempoAddTime (Int iNewTime)
Var
	Int i,
	Int iMax,
	Int iMaxIdx,
	Int iTempoAvg
If giTempoCount < ArrayLength (gaiTempoTimes) Then
	Let gaiTempoTimes[giTempoCount] = iNewTime
	Let giTempoCount = giTempoCount + 1 ;count the tap we are adding
	Let giTempoSum = giTempoSum + iNewTime
Else
	;Array full
	;Find the time that is farthest away from the average
	Let iTempoAvg = giTempoSum / giTempoCount
	For i=1 To ArrayLength (gaiTempoTimes)
		If Abs (iTempoAvg - gaiTempoTimes[i]) > iMax Then
			Let iMax = Abs (iTempoAvg - gaiTempoTimes[i])
			Let iMaxIdx = i
		EndIf
	EndFor
	Let giTempoSum = giTempoSum - gaiTempoTimes[iMaxIdx]
	Let gaiTempoTimes[iMaxIdx] = iNewTime
	Let giTempoSum = giTempoSum + iNewTime
EndIf ;else array full
EndFunction

;End -- JAWS 11 and later.
*/

;/*
;This version works in JAWS 10 and later.
Script TempoStartStop ()
var
	Int iTempoAvg,
	Int iTemp,
	String s2

If !gfTempoRunning Then
	Let gsTempoBPM = ""
	Let giTempoCount = 0
	Let giTempoStart = 0
	Let giTempoLast = 0
	Let gfTempoRunning = TRUE
	TypeKey (cksSpace) ;Start playback.
Else
	;running, stop if we are playing
	If GetAudacityState () == ST_PLAY Then
		TypeKey (cksSpace)
	EndIf
	Let gfTempoRunning = FALSE
	If giTempoStart && giTempoLast && giTempoCount >= 2 Then
		Let iTempoAvg = (giTempoLast - giTempoStart)/(giTempoCount - 1) ;ms/beat
		Let iTemp = 600000/ iTempoAvg
		;iTemp is 10*BPM.
		;Division might round or something, so we get the tenths digit with string manipulation.
		Let gsTempoBPM = IntToString (iTemp)
		Let s2 = StringRight(gsTempoBPM, 1)
		Let gsTempoBPM = stringChopRight (gsTempoBPM, 1)
		if s2 != "0" Then
			Let gsTempoBPM = gsTempoBPM + "." + s2
		EndIf
		PerformScript TempoAnnounce ()
	Else
		Say(msgTempoNoBeats, OT_ERROR)
		Return
	EndIf ;giTempoStart && giTempoLast
EndIf ;else running
EndScript ; TempoStartStop

Script TempoTap ()
If gfTempoRunning Then
	Let giTempoLast = GetTickCount ()
	Let giTempoCount = giTempoCount + 1
	If !giTempoStart Then
		Let giTempoStart = giTempoLast
	EndIf
EndIf ;If running
EndScript ; TempoTap

;*/
Script TempoAnnounce ()
If gsTempoBPM Then
	Say(gsTempoBPM, OT_USER_REQUESTED_INFORMATION)
Else
	Say(msgTempoNoTempoStored, OT_ERROR)
EndIf ;else no beats
EndScript ; TempoAnnounce

Script TempoCopy ()
If !gsTempoBPM Then
	Say(msgTempoNoTempoStored, OT_ERROR)
	Return
EndIf
CopyToClipboard (gsTempoBPM)
Say(FormatString(msgTempoCopied, gsTempoBPM), OT_STATUS)
EndScript ; TempoCopy

Script TempoLayerHelp ()
Say(msgTempoLayerHelp, OT_USER_REQUESTED_INFORMATION)
EndScript ; TempoLayerHelp

