; JAWS script for Audacity multitrack sound editor V2.0.1.0 (http://audacityteam.org).
;Original author: Gary Campbell
;Modified: Dang Manh Cuong
;Vietnamese README file translation by Nguyen Hoang Giang.

; This constant contains the script version.  The spacing of the following line must be preserved exactly so that the installer can read the version from it.  There is exactly 1 space between const and the name, and 1 space on either side of the equals sign.
Const CS_SCRIPT_VERSION = "2.0 10/5/15 19:45UTC"

; This puts the copyright in the jsb file.
Messages

@msgCopyright
JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012-2015  Gary Campbell and Dang Manh Cuong.  All rights reserved.

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
;10/5/15 In AdjustJawsVerbosity replaced strListOfOptions with the version from AdjustJawsOptions.  This adds a couple of options that were overlooked.  This is for support of JAWS versions prior to 9.0 and is not tested.
;Moved JAWS options help messages to after the other JAWS options constants.
;10/5/15 Previous saved to HG 192:4152c0d30b00.
;9/29/15 Changed Alt+Up/DownArrow to Control+Shift+Up/DownArrow.
;9/28/15 Previous saved to HG changeset:   188:6a035d4cd476.
;9/28/15 Added mark, web site change, and RefreshFocus to What's New.
;9/26/15 Added code to refresh track panel after CloseFocusTrack.  Added function RefreshFocus.
;9/23/15 Previous saved to HG changeset:   182:dc6e89354c2c.
;9/23/15 Changed Audacity web site to http://audacityteam.org.
;9/22/15 Previous saved to HG changeset:   180:eb23d14b240.
;9/22/15 Added code to MoveTrackUp, MoveTrackDown, GoToTrack and MoveCurrentTrackTo to send key to app if not in track panel.
;Added global variables gsGoTrackUpKey, gsGoTrackDownKey for the keys that move focus to prior/next track, and gsMoveTrackUpKey and gsMoveTrackDownKey for keys that move a track.  This will make it easier to allow the user to specify these keys if desired.
;Added scripts MarkTrack, GoToMarkedTrack, ExchangeWithMark, and MoveCurrentTrackToMark.  Added keys in JKM.  
;Changed NavigateTrackPanel so that it clamps the values if they are outside the track table.
;Added new keys to script key help.
;Reorganized script key help and added blank lines between sections.
;9/18/15 Previous saved to HG changeset:   178:04e0202a6328.
;9/18/15 Finished scripts GoToTrack and MoveCurrentTrackTo.  Added associated messages to jsm.  Wrote scripts MoveTrackUp and MoveTrackDown, currently assigned to Alt+Up/DownArrow.  These assignments should probably not be released.
;9/17/15 Added functions NavigateTrackPanel and IsDigits, and scripts GoToTrack and MoveCurrentTrackTo.  GoToTrack is partially written.  The functions are written.  Wrote JSD entry for NavigateTrackPanel.  Added key JAWSKey+a&g for GoToTrack.  Consider renaming NavigateTrackPanel to NavigateToTrack.
;Works.
;9/17/15 Previous saved to HG changeset:   177:38ea73ad4564.
;9/17/15 Added Open/CloseListBox.
;5/11/15 Previous saved to HG changeset:   176:fa11e2d464b0.
;5/11/15 Added AdjustJawsOptions support for SilencePreview and SilenceRecord options.
;Added constants CI_UO_ON and CI_UO_OFF to support boolean settings so they don't need their own on and off constants.
;Added a comment near the AdjustJawsOptions code explaining how to add a new option.  
;Compiled but not tested.
;5/11/15 Previous saved to HG changeset:   175:afeeb7b2d893.
;5/7/15 jsm: updated guide URL and version msg.
;Updated copyright date in jsm.
;In JAWS hotkey help added a paragraph about turning Preview Silence off.
;README: Deleted issue about correctly identifying play state.
;Added paragraph about turning silence preview off.
;3/31/15 Previous saved to HG changeset:   174:fa732fae52b5.
;3/30/15 Added scripts Tab and ShiftTab to cause JAWS to update label display info (in alpha version from Robert Hanggi).  Added MSAARefresh() in AnnounceKeyMessage to make JAWS read updated values after keys like j, k, etc.  (Observed it not working for C.)
;3/30/15 Previous saved to HG changeset:   173:b29b44afdd42.
;3/29/15 Added ProgressBarChangedEvent that obeys gfSilence.
;3/28/15 Previous saved to HG changeset:   172:32ae2fb7b7ca.
;3/28/15 Added code in SayFocusedObject to return if gfSilence is set.  This suppresses speaking of the creation of the first track in the project.  Something odd about this-- the first time after you change the associated setting it hasn't updated yet.
;3/28/15 Previous saved to HG changeset:   171:3e12c08f2ec3.
;3/28/15 Updated copyright message.
;Added ability to silence the speech that occurs when starting to record.
;3/28/15 Previous saved to HG changeset:   170:3ab850c030e6.
;3/28/15 Added code to silence speech during previewing.  The flags associated with this (gfSilence and gfPreviewing) are cleared by AutoStartEvent every time it runs, so if they aren't turned off when previewing is over switching focus away from Audacity and back will clear them.  However, have not been able to get this implementation stuck.
;Implemented a flag to suppress the next tutor message.  This is currently not used.
;Changed 1 to symbolic constants in code that writes default settings entries and the default value of code that reads settings.
;3/28/15 Previous saved to HG changeset:   169:3d20f4e12301.
;3/27/15 Changed back to using the globals used before.  (The only one is gfEnterPause.)  Uncommented the global declarations, their initialization in AutoStartEvent, and LoadNonJCFOptions.  In AutoStartEvent made loading of JAWS guide link only execute for pre JAWS 13, and added initialization for it in LoadNonJCFOptions.
;Added new globals gsIniFile and gsIniSection.  For pre JAWS 13 gsIniFile is the old CS_Ini_File, for 13 and later it is "Audacity.jcf".  gsIniSection is "Settings" and "NonJCFOptions", respectively.  Removed constant Settings, which was replaced by gsIniSection.  Most existing code that only executes pre JAWS 13 still uses CS_Ini_File.  These changes should allow AddAudacityJAWSGuide to work.
;In script AddAudacityJawsGuide now initializes URL to default if not in file.
;In Audacity.qsm corrected case of ID for the root node.  The root node text and help text are now correctly displayed.
;3/25/15 Changed AnnounceOn to GetQuickSetting.  It now uses the JSI file for JAWS prior to 13.0 and GetNonJCFOption for 13.0 and later.  Converted references to globals representing settings to calls to GetQuickSetting.
;Commented out LoadNonJCFOptions because no globals need to be initialized.
;Note that globals can be used for option values since LoadNonJCFOptions is called when the QuickSettings dialog finishes, so it was not necessary to change the globals to calls to GetQuickSetting.
;Decided that for JAWS 13 or later we use QuickSettings and NonJCFOptions, and we don't attempt to transfer settings from a JSI file.  For prior to JAWS 13 we continue to use JSI file.
;3/11/15 Previous saved to HG rev 165.
;3/11/15 Merged changes from repo audacity_cuong changeset 53:cfe6956ccc18.  This contains a partial implementation of silencing speech during previewing which doesn't work.
;12/04/14 by Dang Manh Cuong (merge parent changeset:   155:3a7120b2adb7):
;Modified script record. Now user has ability to turn jaws speech off when pressing the record or record append key in the quick setting.
;7/25/14 Previous saved to HG changeset:   160:28d0b01c49b7.
;7/25/14 Now speaks the field value after the slider percentage in the compressor dialog.  May want to include this behavior in SayLine.  SayCharacter?
;7/25/14 Previous saved to HG rev 159.
;7/25/14 Added Record script to silence the key that starts recording.  Should this be controlled by a user option?
;7/25/14 Previous saved to HG rev 158.
;7/25/14 Removed HandleCustomWindows entry from audacity.jsd.  It had no arguments, whereas the version in JAWS 10 and JAWS 15 has one argument.  It appears it has been with us since the beginning.
;Updated messages in jsm file.
;Script AddAudacityJAWSGuide now updates the global containing the URL so its effect is immediately available.
;Added .qs and .qsm files to installer.  Updated What's New and English README files.
;7/16/14 Previous saved to HG rev 154 (same as 156 except that 156 contains correct version of audacity.jsm).
;7/16/14 Merged changes from repo audacity_cuong changeset:   51:2fdf46c42638.
;5/15/14 by Dang Manh Cuong:
; Wrote script Preview: turn Jaws speech off when hitting the preview button in some effect dialog.
;Issue: cannot turn Jaws speech on when finish previewing
;Updated comments
;3/22/14 by Dang Man Cuong
;Script AddAudacityJawsGuide now returns user doesn't type anything to the box.
;Updated messages and comments.
;3/20/14 by Dang Manh Cuong
;Script AddAudacityJawsGuide now returns if new and current URL are the same.
;Updated message and documentation for the script above.
;3/19/14 by Dang Manh Cuong:
;Added script AddAudacityJawsGuide for changing Jaws guide link.
;3/17/14 by Dang Manh Cuong
;Modified function HandleCustomWindows. Jaws now reads the checkbox and button in the quick settings dialog when navigated to these by the tab key.
;Make the settings section in the JSI file at a contans for easier to change if needed, and modified all relatest scripts.
;3/16/14 by DangManh Cuong
;Commented out keystroke: Jawskey+V for testing the quick settings script.
;Wrote xml files for the QuickSetting (Similar to script adjust Jaws options). This use on Jaws 13 or later.
;Wrote function LoadNonJCF Options to get info from JCF file, and write to Audacity>JSI file. This for script QuickSettings
;Modified Hotkey Help message. Now the hotkey Insert+v displays in all Jaws version. Although, it removed from JKM file
;3/14/14 by Gary Campbell:
;Merged changes from repo audacity_cuong changeset:   49:b3b6b02544ec.
;And fixed a couple more typos.
;1/27/14 by Dang Manh Cuong: 
;Updated comments.  Corrected some misspellings.
;10/30/13 by Gary Campbell:
;Corrected referenced changeset in modification comments of 148.
;10/30/13 Previous saved to HG rev 148.
;10/30/13 by Gary Campbell:
;Merged changes from repo audacity_cuong changeset:   47:ea1a0a992a00 (correction: 48:b3ac8e4ba038).
;10/23/13 by Dang Manh Cuong:
;Uncommented script Paste from clipboard. Remove the check for no project in this script.
;Updated comment
;Previous saved to HG rev 147.
;10/23/13 by Gary Campbell:
;Merged changes from repo audacity_cuong changeset:   47:ea1a0a992a00, other minor comment fix.
;10/16/13 by Dang Manh Cuong:
;Modified the script swichChainsList due to the control ID for swiching to Chain CMD changed in Audacity 2.0.4
;Commented out script Paste from clipboard because it does not allow pasting into a blank project.
;10/16/13: Modified the script swichChangeList due to the control ID for swiching to Change CMD changed in Audacity 2.0.4

;Commented out script Paste from clipboard
;9/27/13 Changed scripts SelectToStart/EndOfLine to use msgSelectedTo so that they say "select to start/end of all audio".  This makes msgStartOfFile and msgEndOfFile unused.
;Changed JawsHome to say "all audio" instead of "track", making it consistent with JawsEnd.
    ;Changed msgSelectedTo to msgSelectTo.
;9/26/13 Changed msgNoTracksSelected to msgNoTrackSelected_L, added msgNoTrackSelected_S, changed content of msgNoTrackSelected_L.  Changed Say to SayMessage for this message.
;9/15/13 Previous saved to HG rev 142, tagged with rel2.0_0915.

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
	ID_STOP_BUTTON = 5100, ; stop button when previewing an effect, also of all OK buttons
	WC_wxWindowClass = "wxWindowClass", ; grabber control on toolbars
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
	ID_Chain_Cmds_List2=7002 ;Audacity 2.0.4 or higher
	
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
		Let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), iPosition)
		;If the Announce Messages option is on, speak the selection posision.
		If GetQuickSetting ("AnnounceMessage") Then
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
If !UserBufferIsActive ()&&FocusInTrackPanel () && IsStopped () Then
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
If !NoProject ()&&! UserBufferIsActive ()&&FocusInMainWindow () Then
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
	
;We reset these two flags in case they get stuck on.
Let gfSilence = False
Let gfPreviewing = False
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
;If we are monitoring an edit associated with a slider, speak it.
If ghSliderEdit && hWnd == ghSliderEdit Then
	Say (buffer, OT_NONHIGHLIGHTED_SCREEN_TEXT)
EndIf
SayNonhighlightedText (hWnd, buffer)
EndFunction ; SayNonHighlightedText

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

Int Function HandleCustomRealWindows(Handle hReal)
;Suppress speech for preview.
var int iRtn ; debug

;DebugString("Enter HandleReal" + GetWindowName(hReal)) ; debug
If gfSilence Then
	;DebugString("HandleCustomReal: speech suppressed") ; debug
	Return True
EndIf ; if gfSilence
Let iRtn = HandleCustomRealWindows(hReal)
;DebugString("Exit HandleReal") ; debug
return iRtn
EndFunction ; HandleCustomRealWindows

Int Function HandleCustomWindows (Handle hFocus)
Var
	Handle hParent,
	Handle hOld,
	Handle hToolbar,
	Handle hTemp,
	Handle hTemp2,
	String sName,
	Int iMSAA_JCFOpt

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

If gfSilencePreview && hFocus == GetAppMainWindow(hFocus) Then
	;DebugString("previewing " + IntToString(hFocus)) ; debug
    Let gfSilence = True
	;DebugString("suppress focus exit say custom") ; debug
	Return True
EndIf

If DialogActive() && gfSilence && GetControlId(hFocus) == ID_STOP_BUTTON Then
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
		Return True
	ElIf IsWarningDialog ()&&!CheckAudacityVersion ("2,0,3") then
		SayWindowTypeAndText (GetFocus ())
		Return true
	EndIf ; no window name
	Return HandleCustomWindows (hFocus) ; not main window, continue with normal processing
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
Return HandleCustomWindows (hFocus) ; allow others to process
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
;Returns True if the focused control is in the main window, False otherwise.
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
If !sValue Then ;some time user turn off the selection toolbar, so this condition varify the selection boolbar is turned on or not
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
If GetQuickSetting ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	pause ()
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
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
If GetQuickSetting ("AnnounceMessage") && !NoProject () Then
	pause ()
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_END)
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
If GetQuickSetting ("AnnounceMessage") && !NoProject () Then
	pause ()
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
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
If GetQuickSetting ("AnnounceMessage") && !NoProject () && FocusInTrackPanel () Then
	pause ()
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
EndIf
EndScript ; StartMarkerLeft

Script JawsHome ()
;If we are speaking an Audacity message, don't speak the key name.
If NoProject () && FocusInTrackPanel () &&!UserBufferIsActive () Then
	SayNoProject ()
	Return
EndIf ; if no project
If IsPCCursor () &&FocusInTrackPanel () &&! NoProject () &&!UserBufferIsActive ()&&GetQuickSetting ("AnnounceMessage")Then
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
If IsPCCursor () &&FocusInTrackPanel () && !NoProject () &&!UserBufferIsActive ()&&GetQuickSetting ("AnnounceMessage") Then
	If !IsStopped () Then
		SayNotStopped ()
		Return
	EndIf ;!IsStopped
	JAWSEnd () ; do End without speaking key label
	SayFormattedMessage (OT_Position, FormatString (msgMoveTo, msgEnd, msgAllAudio))
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
;Select to start of selected tracks.
If DialogActive () || MenusActive () Then
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
ElIf !IsTrackSelected () Then
	SayNoTrackSelected ()
	Return
Else
	AnnounceKeyMessage (FormatString (msgSelectTo, msgStart, msgSelectedTracks))
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
	AnnounceKeyMessage (FormatString (msgSelectTo, msgEnd, msgSelectedTracks))
EndIf
EndScript ; SelectToEnd

Script SelectFromStartOfLine ()
;Select from current position to the start of all audio.
;We do not use AnnounceKeyMessage so that we can execute the default JAWS script instead of just sending the key on.
If NoProject () Then
	SayNoProject ()
	Return
EndIf ;No project
If IsPCCursor ()&&FocusInTrackPanel ()&&!NoProject ()&&!UserBufferIsActive () Then
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
If IsPCCursor ()&&FocusInTrackPanel ()&&!UserBufferIsActive ()&&!NoProject () Then
	SelectToEndOfLine ()
	If GetQuickSetting ("AnnounceMessage") Then
		SayFormattedMessage (OT_No_Disable, FormatString(msgSelectTo, msgEnd, msgAllAudio))
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
;If focus is in the main window, a project exists, and audio is selected, the DEL key will delete it.  In this case we perform the script DeleteSelectedAudio.  Otherwise we perform the defaault script.

If FocusInMainWindow () Then
	; (!FocusInMainWindow () || IsTrackSelected ()) && (FocusInTrackPanel ()&&!NoProject ())
	PerformScript DeleteSelectedAudio()
Else
	; NoProject() || ((!FocusInMainWindow () || IsTrackSelected ()) && !FocusInTrackPanel ()) ; ?? not sure these are the right conditions here
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
Var
	Handle hWnd
	
If !userBufferIsActive () && GetQuickSetting ("AnnounceMessage") && IsPCCursor () && FocusInTrackPanel () && IsStopped () Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; if no project
	TypeCurrentScriptKey ()
	Pause ()
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
	Say(GetPositionField (hWnd), OT_USER_REQUESTED_INFORMATION)
Else
	PerformScript SayPriorCharacter ()
EndIf
EndScript ; SayPriorCharacter

Script SayNextCharacter ()
Var
	Handle hWnd
	
If !userBufferIsActive () && GetQuickSetting ("AnnounceMessage") && IsPCCursor () && FocusInTrackPanel () && IsStopped () Then
	If NoProject () Then
		SayNoProject ()
		Return
	EndIf ; if no project
	TypeCurrentScriptKey ()
	Pause ()
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
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
ElIf !UserBufferIsActive ()&&FocusInTrackPanel () Then
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

Script Tab()
PerformScript Tab()
If !UserBufferIsActive() && !DialogActive() && FocusInTrackPanel() Then
;Force MSAA to be refreshed so JAWS will correctly read current label (in alpha version).
	MSAARefresh()
EndIf
EndScript ; Tab

Script ShiftTab()
PerformScript ShiftTab()
If !UserBufferIsActive() && !DialogActive() && FocusInTrackPanel() Then
;Force MSAA to be refreshed so JAWS will correctly read current label (in alpha version).
	MSAARefresh()
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
If FocusInMainWindow () && !IsStopped () && GetQuickSetting("EnterPause") Then
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
ElIf FocusInMainWindow () && ! NoProject () && GetQuickSetting ("AnnounceMessage") Then
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
Var
	Handle hWnd
	
TypeCurrentScriptKey ()
If !UserBufferIsActive ()&&FocusInTrackPanel () && NoProject () Then
	SayNoProject ()
	Return
ElIf !UserBufferIsActive ()&&FocusInTrackPanel ()&&GetQuickSetting ("AnnounceMessage") && IsStopped () Then
	Pause ()
	Let hWnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_SELECTION_START)
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
If CheckAudacityVersion ("2,0,4") then ;The control ID of Change CMD has changed since Audacity 2.0.4. So we add this condition to varify that.
		Let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Chain_Cmds_List2)
Else
		Let wnd=FindDescendantWindow (GetRealWindow (GetFocus ()), ID_Chain_Cmds_List)
EndIf ;Check Audacity version
		Let sMessage=msgChainCommands ;list of commands in the right list
	Else
		Let wnd=FindDescendantWindow (hReal, ID_Chains_List)
		Let sMessage=msgChains ;list of chains in the left list
	EndIf ; Else neither list.
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
If DialogActive () || MenusActive () Then
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
	Let fRes = StringToInt(StringSegment(sVersion, ",", iCounter)) >= StringToInt(StringSegment(sCheckVer, ",", iCounter))
	Let iCounter = iCounter + 1
EndWhile
Return fRes
EndFunction ; CheckAudacityVersion

Script test ()
;Test CheckAudacityVersion.
Var String s
/*Let s = "testing 2,0,3, got " + IntToString(CheckAudacityVersion("2,0,3")) + ", should get True\n"
Let s = s + "testing 2,0,4, got " + IntToString(CheckAudacityVersion("2,0,4")) + ", should get True\n"
Let s = s + "testing 2,0,5, got " + IntToString(CheckAudacityVersion("2,0,5")) + ", should get False\n"
*/
/*
;Let s = "gfSilence = " + IntToString(gfSilence)
Let s = IntToString(GetJFWVersion())
SayMessage(OT_USER_BUFFER, s)
*/
;Say number of focused track
;SayInteger(GetFocusObject(0).accFocus) ; debug
If FocusInTrackPanel() Then
    ;/*
    If InputBox("track number:", "go to", s) Then
		var object o = GetFocusObject(0), int rtn
		var int iNum, Int iStart, Int iMove, Int iCount, Int fSilence, String sUp, String sDown, String sKey
		iNum = StringToInt(s)
		sUp = "UpArrow"
		sDown = "DownArrow"
		SayString("going to " + IntToString(iNum))
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
    ;*/
    /*; get focused object rectangle.
    var object o, int ix, int iYTop, int iWidth, int iHeight
    o = GetFocusObject(0)
    o.accLocation(IntRef(ix), IntRef(iYTop), IntRef(iWidth), IntRef(iHeight), o.accFocus)
    SayString("x = " + IntToString(iX) + ", y = " + IntToString(iYTop) + ", width = " + IntToString(iWidth) + ", height = " + IntToString(iHeight))
    */
EndIf ; in track panel
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
If DialogActive () ||MenusActive () Then
	;A dialog is open, pass key to application and speak its label.
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
