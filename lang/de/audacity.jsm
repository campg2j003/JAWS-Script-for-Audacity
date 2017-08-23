; German messages for Audacity 2.1.0 script by Gary Campbell last updated 2017-02-17.
;Translation based on English version dated 2017-08-12.
/*
JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012-2017  Gary Campbell and Dang Manh Cuong.  All rights reserved.
    Copyright (C) 2014-2016 Fernando Gregoire, for the Spanish translation. All rights reserved.
    Copyright (C) 2017 Michael Vogt, for the German translation. All rights reserved.

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
	WN_TOOLDOCK = "Werkzeug-Dock", ; grandparent of toolbar buttons and selection bar controls
	WN_TRACKPANEL = "Spurbereich", ; window name of track table
	WN_SELECTION = "Selektion", ;window name of selection bar
	WN_TRANSPORT_TOOLBAR = "Transport", ; window name of Transport toolbar
	WN_EDIT_CHAINS = "Ketten bearbeiten", ; name of the Edit Chains dialog
	WN_PREPARING_PREVIEW = "Vorschau erstellen", ;appears in effect dialogs briefly when starting previewing
	WN_PREVIEWING = "Vorschau", ;appears in progress dialog while previewing effects
	WN_STOP_BTN = "Stop" ;name of Stop button to stop previewing

Const
	; These are used to announce different areas of the main window.  They should be translated.
	CS_Toolbars="Werkzeugleisten",
	CS_SelectionBar="Selektion Leiste",
	CS_TrackPanel="Spuren Panel"

;For user options.  The text after the : should be translated, the text before must not be translated.
Const
	UO_ANNOUNCE_MESSAGES = "UOAnnounceMessages:Ansagen von Audacity Meldungen",  ;also used in message spoken by AnnounceOnOff.
	UO_ANNOUNCE_TOOLBARS = "UOAnnounceToolbars:Werkzeugleisten ansagen",
	UO_ENTER_PAUSE = "UOEnterPause:Enter Unterbrechen w�hrend Wiedergabe / Aufnahme",
	UO_SILENCE_PREVIEW = "UOSilencePreview:Still w�hrend Vorschau",
	UO_SILENCE_RECORD = "UOSilenceRecord:Still w�hrend Aufnahme"

Messages
; For user options.
@msgUO_AudacityOptionsHlp
Audacity spezifische Optionen
@@
@msgUO_AnnounceMessagesHlp
Wenn aktiviert, informiertt Jaws �ber die Ausf�hrung von Audacity Audio Operationen.
@@
@msgUO_AnnounceToolbarsHlp
Wenn aktiviert, werden die Bezeichnungen der Werkzeugleisten gesprochen, wenn der Fokus von einer Werkzeugleiste zu einer anderen verschoben wird.
@@
@msgUO_EnterPauseHlp
Wenn aktiviert, wird mit Enter die Wiedergabe oder Aufnahme pausiert und CTRL + Enter verh�lt sich wie Enter. Andernfalls wird Enter an Audacity durchgereicht.
@@
@msgUO_SilencePreviewHlp
Wenn aktiviert, werden w�hrend der Vorschau von Effekten Sprachmeldungen deaktiviert.
@@
@msgUO_SilenceRecordHlp
Wenn aktiviert, wird die Sprachausgabe beim Starten der Aufnahme deaktiviert.
@@
EndMessages

;These are used to strip leading zeros from audio positions.
Const
	;The format of a position with value 0 containing thousands separators, not including the last 0, like the seconds format, with blanks removed
	csPositionGroupFmt = "000.00",
	;The word following the days in a position.
	csDays = "Tage",
	;The format of a position with value 0 containing hours, minutes, and seconds, up to but not including the decimal point, like the HH�MM�SS.sss  format, with blanks removed
	csPositionHHMMFmt = "00h00m00",
	csGroupSep = "", ; thousands separator character
	csDecimal = "." ; decimal point

Const
	;The key for pause
	csPauseKey="p"

Const
	CS_JawsGuide_LINK = "http://vip.chowo.co.uk/wp-content/uploads/jaws/Audacity-2.1.3-Guide.html", ;default URL to Audacity guide for JAWS
;This should reference the guide from which the Audacity Keys help message was taken.
CS_JawsGuide_Title = "Jaws Leitfaden f�r Audacity 2.3.1 (englisch)", 
CS_JawsGuide_Author = "David Bailes",
CS_JawsGuide_LINK_DISP = "Link zum Jaws Leitfaden" ;Name displayed in links list

Messages
@msgProgName
Audacity
@@

; Begins the hotkey help.
; %1 - string containing script version and date.
@msgScript_Ver
Tastenkombinationen f�r die Jaws Skripts f�r Audacity, Version %1 (f�r Audacity 2.0.0 oder neuer):

@@
@msgScriptKeyHelp
 ---


Ansagen der Start Position der Selektion: %keyfor (SaySelectionStart)
Ansagen der Ende Position oder der L�nge der Selektion: %keyfor(SaySelectionEnd) (Umlaut Taste)
Fokus zum Eingabefeld der Start oder Ende Position der Selektion platzieren: zwei Mal kurz aufeinander dr�cken.
Ansagen der Position des Audio Cursors: %keyfor(SayActiveCursor)
Bei aktiviertem PC-Cursor: zwei Mal kurz nacheinander dr�cken.

Erh�hen der Lautst�rke der aktiven Spur: %keyfor (MouseUp)
Verringern der Lautst�rke der aktiven Spur: %keyfor (MouseDown)
Panorama der aktiven Spur nach links %keyfor (MouseLeft)
Panorama der aktiven Spur nach rechts: %keyfor (MouseRight).
Die letzten vier Tastenkombinationen ersetzen die Standard Jaws Skripts der Steuerung des Mauszeigers, wenn der Fokus im Hauptfenster ist. Durch Aktivieren des Jaws Cursors kann die originale Jaws Maussteuerung im Hauptfenster verwendet werden.

Ansagen des Aufnahmepegels: %KeyFor(SayRecordingMeter)
Fokus zum Eingabefeld des Aufnahmepegels: zwei Mal kurz nacheinander dr�cken
Ansagen des Wiedergabepegels: %KeyFor(SayPlaybackMeter)
Fokus zum Eingabefeld des Wiedergabepegels: zwei Mal kurz nacheinander dr�cken.

Eine bestimmte Spur aktivieren durch angeben einer Zahl: %KeyFor(GoToTrack)
Die Aktive Spur an eine bestimmte Position verschieben, durch angeben einer Zahl: %KeyFor(MoveCurrentTrackTo)
Die aktive Spur merken: %KeyFor(MarkTrack)
Die zuletzt gemerkte Spur aktivieren: %KeyFor(GoToMarkedTrack)
Die zuletzt gemerkte Spur aktivieren und die zuvor aktive Spur merken: %KeyFor(ExchangeWithMark)
Aktive Spur an die zuletzt gemerkte Position verschieben und diese merken: %KeyFor(MoveCurrentTrackToMark)

Meldungen der Sprachausgabe ein- und ausschalten (muten des Synthesizers): %keyfor(MuteSynthesizer)
Ansagen bestimmter Audacity Prozesse aktivieren / deaktivieren: %keyfor (AnnounceOnOff) (Paragraph Taste)
Hinweis: dies verdoppelt die Ansagen von Audacity Nachrichten in den Jaws Schnelleinstellungen Optionen. Weitere Informationen in what's new.md.

Zur n�chsten Werkzeugleiste navigieren, wenn der Fokus in einer Werkzeugleiste ist: %KeyFor (NextDocumentWindow)
Zur vorherigen Werkzeugleiste navigieren, wenn der Fokus in einer Werkzeugleiste ist: %KeyFor (PreviousDocumentWindow)

Transport Status ansagen (Wiedergabe, Aufnahme, Pause, Stop): %KeyFor(SayAudacityState)
Alle Optionen der Jaws Skripts f�r Audacity auf die Standardwerte zur�cksetzen: %keyfor (ResetConfig) (Paragraph Taste)
Wechseln zwischen den beiden Listen im Ketten editieren Dialog: %keyfor (SwitchChainsList)

Audacity Tastenkombinationen Hilfe: %keyfor(AudacityKeysHelp)
Standard Windows Tastenkombinationen Hilfe: %keyfor(AudacityKeysHelp) zwei Mal kurz nacheinander

Pause w�hrend Wiedergabe / Aufnahme an / aus: wenn die "Eingabetaste unterbricht Wiedergabe / Aufnahme" Option aktiviert ist, bewirkt das Dr�cken der %KeyFor(ENTER) Taste das Senden der Pause Taste. In dieser Konstelation bewirkt %KeyFor(CtrlEnter) das Senden der Enter Taste.

In einigen VST-Plugins, wie beispielsweise dem L1V:
Fokus auf die "Preset" Schaltfl�che: %keyfor (VSTPreset)
Um ein existierendes Preset zu laden: %keyfor (VSTLoadPreset)
Speichern der aktuellen Einstellungen des VST-Plugins als Preset: %keyfor (VSTSavePreset)

Wenn die "Stille Vorschau" aktiviert ist und in einem Effekt Dialog die Vorschau Taste gedr�ckt wird, wird manchmal die "Stille Vorschau" nicht erwartungsgem�ss deaktiviert. Dies f�hrt zu fehlenden Jaws Ansagen beim Wechsel des Fokus. Das kurzzeitige Wechseln zu einer anderen Anwendung behebt das Problem.

�ndern der Einstellungen der Audacity Skripts: %KeyFor (AdjustJawsOptions) %Keyfor (AdjustJawsVerbosity) %Keyfor (QuickSettings).

Um die URL des Jaws Guide f�r Audacity zu �ndern: %keyfor (AddAudacityJawsGuide)
@@
@msgPresetHotkeyHelp
Fokus auf die "Preset" Schaltfl�che: %keyfor (VSTPreset)
Um ein existierendes Preset zu laden: %keyfor (VSTLoadPreset)
Speichern der aktuellen Einstellungen des VST-Plugins als Preset: %keyfor (VSTSavePreset)

@@

;Spoken before loading the Audacity for JAWS web page.
@msgLoadingJawsGuide_L
Laden des Jaws Leitfaden f�r Audacity Anwender im Standard Browser...
@@
@msgLoadingJawsGuide_S
Lade Audacity Jaws Guide Webseite...
@@

;Text of Audacity hotkey help that appears before the link to the Audacity guide for JAWS.
;We don't use a % substitution for the link because it must be added to the virtual buffer by a separate function call to make it a link.
;%1 -- Audacity guide title
;%2 Audacity guide author
;There is a newline before and after the guide link.
@msgAudacityHotKeyHelp1
Standard Tastenkombinationen f�r Audacity v2.1.3
(Aus dem %1, von %2)

Link zum audacity Guide for Jaws (englisch):
@@
;Text of hotkey help following the link to the guide.  The first character of the message starts a new line.  I can't get a blank line at the start of the message.
@msgAudacityHotkeyHelp2
---


Allgemeines


Beschreibung Tastenkombination
Audiodatei �ffnen: Ctrl + O 
Audio Datei importieren: Ctrl + Shift + I 
Neues Projekt: Ctrl + N 
Projekt speichern: Ctrl + S 
Einstellungen Dialog: Ctrl + P 
Vorw�rts rotieren durch Werkzeugleisten, Spurliste und Selektion Eingabefelder: Ctrl + F6 
R�ckw�rts rotieren durch Werkzeugleisten, Spurliste und Selektion Eingabefelder: Ctrl + Shift + F6 
Vorw�rts rotieren durch die  Spurliste und alle ge�ffneten nicht modalen Dialogfenster: Alt + F6 
R�ckw�rts rotieren durch die Spurliste und alle ge�ffneten nicht modalen Dialogfenster: Alt + Shift + F6 
Normaler Zoom: Ctrl + 2 
Einzoomen (vergr�ssern): Ctrl + 1 
Auszoomen (verkleinern): Ctrl + 3 

Wiedergabe


Beschreibung Tastenkombination
Wiedergabe starten / stoppen: Leertaste 
Wiedergabe starten / stoppen und Cursor bewegen: X 
Pause an / aus: P 
Ein kleines Intervall r�ckw�rts w�hrend der Wiedergabe: Pfeil nach links 
Ein kleines Intervall vorw�rts w�hrend der Wiedergabe: Pfeil nach rechts 
Ein grosses Intervall r�ckw�rts w�hrend der Wiedergabe: Shift + Pfeil nach links 
Ein grosses Intervall nach rechts w�hrend der Wiedergabe: Shift + Pfeil nach rechts 
Wiedergabe endlos Schlaufe: Shift + Leertaste 
Dialog Wiedergabeger�t w�hlen: Shift + O 
Abspielen der ausschneiden / l�schen Vorschau: C 
Ein kurzes Intervall vor der Selektion Start Position Wiedergeben: Shift + F5 
Ein kurzes Intervall nach der Selektion Start Position Wiedergeben: Shift + F6 
Ein kurzes Intervall vor der Selektion Ende Position Wiedergeben: Shift + F7 
Ein kurzes Intervall nach der Selektion Ende Position wiedergeben: Shift + F8 
Ein kurzes Intervall vor und nach der Selektion Start Position wiedergeben: Ctrl + Shift + F5 
Ein kurzes Intervall vor und nach der Selektion Ende Position wiedergeben: Ctrl + Shift + F7 

Spuren Panel


Beschreibung Tastenkombination
Zur vorherigen Spur: Pfeil nach oben 
Zur n�chsten Spur: Pfeil nach unten 
Zur ersten Spur: CTRL + Home 
Zur letzten Spur: Ctrl + Ende 
Selektion der Spur aktivieren / deaktivieren: Enter 
Alle Spuren selektieren (und einen Zeitbereich, der alle Audios enth�lt): Ctrl + A 
Deselektieren aller Spuren (und allen Zeitbereichen): Ctrl + Shift + A 
Selektieren aller Spuren: Ctrl + Shift + K 
Kontextmen� der aktuellen Spur anzeigen: Shift + M 
(Anwendungstaste deselektiert alles, deshalb nicht empfohlen)
Schliessen (l�schen) der aktiven Spur: Shift + C 

Audio Spur


Beschreibung Tastenkombination
�ndern der Lautst�rke der aktiven Spur (Gain): Shift + G 
�ndern des Panorama der aktiven Spur: Shift + P 
Muten der aktiven Spur an / aus: Shift + U 
Muten aller Spuren aktivieren: Ctrl + U 
Muten aller Spuren deaktivieren: Ctrl + Shift + U 
Solo der aktiven Spur an / aus: Shift + S 

Bewegen des Cursors


Beschreibung Tastenkombination
Zum Start der Spuren (Time Zero): Home 
Zum Ende aller Audios: Ende 
Zum Start aller Audios der selektierten Spuren: J 
Zum Ende aller Audios der selektierten Spuren: K 
Neue Cursor Position an Wiedergabe Position: [ (� Taste)
Wiedergabe stoppen und Cursor an diese Position: X 
Kleines Intervall r�ckw�rts: Komma 
Kleines Intervall vorw�rts: Punkt 
Grosses Intervall r�ckw�rts: Shift + Komma 
Grosses Intervall vorw�rts: Shift + Punkt 
Cursor ein kleines Intervall nach links: Pfeil nach links 
Cursor ein kleines Intervall nach rechts: Pfeil nach rechts 

Selektieren eines Zeitbereichs


Beschreibung Tastenkombination
Selektieren eines Zeitbereichs der alle Audios enth�lt, und alle Spuren selektiert: Ctrl + A 
Selektion Start beim Beginn aller Spuren (Time Zero): Shift + Home 
Selektion Ende am Ende aller Audios: Shift + Ende 
Selektion Ende Position bei aktueller Wiedergabe Position: ]  (Umlaut Taste)
Selektion Start Position beim Anfang der Audios der selektierten Spuren: Shift + J 
Selektion Ende Position am Ende der Audios der selektierten Spuren: Shift + K 
Selektion Ende Position ein kleines Intervall nach rechts: Shift + Pfeil nach rechts 
Selektion Ende Position ein kleines Intervall nach links: Ctrl + Shift + Pfeil nach links 
Selektion Start Position ein kleines Intervall nach rechts: Ctrl + Shift + Pfeil nach rechts 
Selektion Start Position ein kleines Intervall nach links: Shift + Pfeil nach links 

Editieren


Beschreibung Tastenkombination
R�ckg�ngig: Ctrl + Z 
Wiederholen: Ctrl + Y 
Selektiertes Audio l�schen: Entfernen 
Selektiertes Audio in Zwischenablage ausschneiden: Ctrl + X 
Selektiertes Audio in Zwischenablage kopieren: Ctrl + C 
Aus Zwischenablage einf�gen: Ctrl + V 
Selektiertes Audio mit Stille ersetzen: Ctrl + L 
Selektiertes Audio duplizieren: Ctrl + D 
Aktive Spur schliessen (l�schen): Shift + C 
Nulldurchg�nge finden: Z

Textmarken


Beschreibung Tastenkombination
Textmarke der Selektion hinzuf�gen: Ctrl + B 
Textmarke an Wiedergabe Position hinzuf�gen: Ctrl + M 
Zur n�chsten Textmarke: Alt + Pfeil nach rechts 
Zur vorherigen Textmarke: Alt + Pfeil nach links 

Aufnahme


Beschreibung Tastenkombination
Aufnahme starten: R 
Aufnahme anf�gen: Shift + R 
Pause / Fortsetzen: P 
Aufnahme stoppen: Leertaste 
Audio Host selektieren Dialog: Shift + H 
Aufnahmeger�t ausw�hlen Dialog: Shift + I 
Aufnahme Kan�le Dialog: Shift + N 
@@

@msg_App_Start
Willkommen in Audacity. Um die Liste der Jaws Tastenkombinationen f�r Audacity anzuzeigen, dr�cken Sie  %Keyfor(AudacityScriptkeyHelp).
@@

;Is the same text for Start and End acceptable in msgMoveSelection, msgMoveTo, and msgSelectedTo in all languages??
@msgStart
Start
@@

@msgEnd
Ende
@@

@msgLeft
links
@@

@msgRight
rechts
@@

@msgSelectionStart
Selektion Start
@@

@msgSelectionEnd
Selektion Ende
@@

; %1 = "start" or "end" of selection, %2 = direction ("left" or "right").
@msgMoveSelection_L
Verschiebe den %1 der Selektion an das %2
@@
@msgMoveSelection
%1 %2
@@

@MsgNoProject_l
Es sind keine Spuren im Projekt vorhanden
@@

@msgNoProject_s
Keine Spuren
@@

;Used??
@msgSelection
Selektion
@@

@msgTrack
Spur
@@

;Used to say track number.  %1 -- number of current track, %2 -- total number of tracks.
@msgTrackPosition
%1 von %2
@@
    
;Substituted in msgMoveTo and msgSelectTo.
@msgAllAudio
Alle Audios
@@

@msgSelectedTracks
Selektierte Spuren
@@

; %1 is where we move, like start or end, %2 is of what, e.g. track or selection.
@MSGMoveTo
Verschiebe %1 zu %2
@@

; %1 = where we are selecting to, like start or end, %2 is of what, e.g. track or selection..
@msgSelectTo
Selektiere von %1 bis %2
@@

@MSGDelete_l
Selektiertes Audio l�schen
@@

@MSGDelete_s
L�schen
@@

;Messages for program states.
@msgPause
Pause
@@
@msgPlay
Wiedergabe
@@
@msgStop
Stop
@@
@msgRecord
Aufnahme
@@

@msgDeselectAll
Alles Deselektieren
@@

@msgSelectInAllTracks
Selektiere in allen Spuren
@@

@MSGSelectAll
Selektiere alle Spuren
@@

@msgCloseFocusedTrack
Aktive Spur schliessen
@@

@msgNotStopped_l
Die Operation kann nur ausgef�hrt werden, wenn die Wiedergabe oder Aufnahme gestoppt ist
@@
@msgNotStopped_s
Nicht gestoppt
@@

@msgNoTransportToolbar
Die Transport Werkzeugleiste kann nicht gefunden werden. Die Transport Werkzeugleiste muss eingeblendet werden, damit diese Skripts funktionieren.
@@

@msgCopyAudio
Kopiere selektiertes Audio in die Zwischenablage
@@

@msgCutAudio
Schneidet das selektierte Audio in die Zwischenablage aus
@@

@msgAnnounceOff
Ansage ausgef�hrter Operationen deaktiviert
@@

@msgAnnounceOn
Ansagen ausgef�hrter Operationen aktiviert
@@

@msgResetScriptOptions
Zur�cksetzen der Skript Optionen
@@

@msgNoSelection
Um diese Funktion zu verwenden muss die Selektion Werkzeugleiste eingeblendet sein.
@@
@msgNoRecordingMeter
Um diese Funktion zu verwenden muss die Aufnahmepegel oder die Kombination Pegel Werkzeugleiste eingeblendet sein.
@@
@msgNoPlaybackMeter
Um diese Funktion zu verwenden muss die Wiedergabe Pegel oder die Kombination Pegel Werkzeugleiste eingeblendet sein.
@@
@msg_Script_Version
Jaws Skripts Version %1, f�r Audacity 2.0.0 oder neuer.
@@
@MsgNoTrackSelected_L
Um diese Funktion zu verwenden muss mindestens eine Spur selektiert sein. Dr�cken Sie Enter, um eine Spur zu selektieren.
@@
@msgNoTrackSelected_S
Keine Spuren selektiert.
@@

;messages for warning dialog when import uncompress audio
@msgCopy
Erstelle vor dem Editieren eine Kopie der Dateien (sicherer)
@@

@msgDirectEdit
Lese die Dateien direkt vom Original (schneller)
@@

@msgDoNotWarn
Nicht mehr warnen und immer diese Auswahl verwenden
@@

;Messages for the two lists in the Edit Chains dialog.
@msgChains
Kommandosequenzen (Ketten)
@@
@msgChainCommands
Kommando Sequenzen (Ketten)
@@
;for changing Jaws guide's link
@msgNoChange_l
Keine �nderungen vorgenommen.
@@
@msgNoChange_s
Keine �nderungen
@@
@MSGNewURL
Die URL wurde ge�ndert: %1
@@
@MSGJawsGuideDialog
Geben Sie die neue URL des Audacity Guide f�r Jaws ein.
@@

;Used to speak the field value along with the slider value in the Compressor effect.
;%1 percentage value of the slider (without percent), %2 value of the field (the static after the slider).
@msgCompressorSlider
%1%%%2
@@

; Prompt for the input boxes in the GoToTrack and MoveCurrentTrackTo scripts.
@msgTrackNumber
Spur Nummer:
@@

; Title of the input box in the  GoToTrack script.
@msgGoToTrackTitle
Gehe zu
@@

;Title of the input box in the MoveCurrentTrackTo script.
@msgMoveTrackToTitle
Verschiebe an
@@


;%1 = track number
@msgTrackMarked
Spur %1 gemerkt
@@

@msgNoTrackMarked
Keine gemerkte Spur
@@

    ;Message to announce some Audacity keys
    @msgZoomNormal
Normaler Zoom
@@

@msgZoomIn
Einzoomen (Vergr�ssern)
@@

@msgZoomOut
Auszoomen (Verkleinern)
@@

@msgMuteAllTracks
Mute alle Spuren
@@

@msgUnmuteAllTracks
Unmuten aller Spuren
@@

@msgReplaceWithSilence
Mit Stille ersetzen
@@

@msgZeroCrossing
Nulldurchg�nge
@@

@msgImportAudio
Audio importieren
@@

@msgExportAudio
Audio exportieren
@@

@msgNewWindow
Neues Fenster
@@

@msgSaveProject
Projekt speichern
@@

@msgPreferences
Einstellungen
@@

@msgDuplicate
Duplizieren
@@

@msgTrim
Trimmen
@@

@msgExportMultiple
Mehrere exportieren
@@

@msgSplitCut
Split ausschneiden
@@

@msgSplitDelete
Split l�schen
@@

@msgPasteNewLabel
F�ge Text aus Zwischenablage in neue Textmarke ein.
@@

@msgSplit
Splitten
@@

@msgSplitNew
Split neu
@@

@msgJoin
Verbinden
@@

@msgDisjoin
Trennen bei Stille
@@

@msgCutLabels
Textmarke in Zwischenablage ausschneiden
@@

@msgDeleteLabels
Textmarken l�schen
@@

@msgSplitCutLabels
Textmarken teilen und ausschneiden
@@

@msgSplitDeleteLabels
Textmarken teilen und l�schen
@@

@msgSilenceLabels
Textmarken Stille
@@

@msgCopyLabels
Textmarken in Zwischenablage kopieren
@@

@msgSplitLabels
Textmarken splitten
@@

@msgJoinLabels
Textmarken zusammenf�gen
@@

@msgDisjoinLabels
Trenne Textmarken bei Stille
@@

@msgToggleSpectralSelection
Spektral Selektion aktivieren / deaktivieren
@@

@msgSelSyncLockTracks
Selektiere in allen synchronisierten Spuren
@@

@msgZoomSel
Auf die Selektion zoomen
@@

@msgFitInWindow
Auf Fenstergr�sse einpassen
@@

@msgFitV
Auf Fensterh�he einpassen
@@

@msgGoSelStart
Gehe zum Start der Selektion 
@@

@msgGoSelEnd
Gehe zum Ende der Selektion
@@

@msgCollapseAllTracks
Alle Spuren einklappen
@@

@msgExpandAllTracks
Alle Spuren ausklappen
@@

@msgPlayLooped
Endloswiedergabe
@@

@msgNewMonoTrack
Mono Spur
@@

@msgMixAndRenderToNewTrack
Mixdown und in neue Spur rendern
@@

@msgAddLabel
Neue Textmarke der Selektion
@@

@msgAddLabelPlaying
Neue Textmarke an der Wiedergabe Position
@@

@msgRepeatLastEffect
Wiederhole den letzten Effekt
@@

@msgFirstTrack
Erste Spur
@@

@msgLastTrack
Letzte Spur
@@

@msgTrackPan
Panorama �ndern
@@

@msgTrackMoveTop
Verschiebe fokussierte Spur an den Anfang
@@

@msgTrackMoveBottom
Verschiebe fokussierte Spur an das Ende
@@

@msgInputDevice
Aufnahme Ger�t
@@

@msgOutputDevice
Wiedergabe Ger�t
@@

@msgAudioHost
Audio Host
@@

@msgInputChannels
Eingangs Kan�le
@@


EndMessages
