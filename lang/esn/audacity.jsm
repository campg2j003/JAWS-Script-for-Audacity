; Spanish messages for Audacity 2.1.0 script by Gary Campbell last updated 2017-08-24.
;Translation based on English version dated 2017-02-17.
/*
JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012-2017  Gary Campbell and Dang Manh Cuong.  All rights reserved.
    Copyright (C) 2014-2016 Fernando Gregoire, for the Spanish translation. All rights reserved.

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

; These are window names used to identify windows. (they Should be translated)
Const
	WN_TOOLDOCK = "Bloqueo de herramientas", ; grandparent of toolbar buttons and selection bar controls
	WN_TRACKPANEL = "Panel de pista", ; window name of track table
	WN_SELECTION = "Selecci�n", ;window name of selection bar
	WN_TRANSPORT_TOOLBAR = "Reproducci�n", ; window name of Transport toolbar
	WN_EDIT_CHAINS = "Editar secuencias de comandos", ; name of the Edit Chains dialog
	WN_PREPARING_PREVIEW = "Preparando vista previa", ;appears in effect dialogs briefly when starting previewing
	WN_PREVIEWING = "Mostrando vista previa", ;appears in progress dialog while previewing effects
	WN_STOP_BTN = "Detener" ;name of Stop button to stop previewing

Const
	; These are used to announce different areas of the main window.  They should be translated.
	CS_Toolbars="Barras de herramientas",
	CS_SelectionBar="Barra de selecci�n",
	CS_TrackPanel="Panel de pista"

;For user options.  The text after the : should be translated, the text before must not be translated.
Const
	UO_ANNOUNCE_MESSAGES = "UOAnnounceMessages:Anunciar los mensajes de Audacity",  ;also used in message spoken by AnnounceOnOff.
	UO_ANNOUNCE_TOOLBARS = "UOAnnounceToolbars:Anunciar las barras de herramientas",
	UO_ENTER_PAUSE = "UOEnterPause:ENTER pausa al reproducir/grabar",
	UO_SILENCE_PREVIEW = "UOSilencePreview:Silenciar en vista previa",
	UO_SILENCE_RECORD = "UOSilenceRecord:Silenciar al grabar"

Messages
; For user options.
@msgUO_AudacityOptionsHlp
Opciones espec�ficas para Audacity
@@
@msgUO_AnnounceMessagesHlp
Si se activa, lee mensajes para las operaciones con audio en Audacity.
@@
@msgUO_AnnounceToolbarsHlp
SI se activa, lee el nombre de las barras de herramientas cuando el foco se desplaza de una barra de herramientas a otra.
@@
@msgUO_EnterPauseHlp
Si se activa, ENTER ejecuta Pausa en tanto se reproduce o se graba, y Control+ENTER env�a ENTER. De lo contrario, env�a ENTER a Audacity.
@@
@msgUO_SilencePreviewHlp
Si se activa, desactiva la voz mientras se previsualiza un efecto.
@@
@msgUO_SilenceRecordHlp
Si se activa, silencia la voz que tenga lugar cuando se haya empezado a grabar.
@@
EndMessages

;These are used to strip leading zeros from audio positions.
Const
	;The format of a position with value 0 containing thousands separators, not including the last 0, like the seconds format, with blanks removed
	csPositionGroupFmt = "000.00",
	;The word following the days in a position.
	csDays = "d�as",
	;The format of a position with value 0 containing hours, minutes, and seconds, up to but not including the decimal point, like the HH�MM�SS.sss  format, with blanks removed
	csPositionHHMMFmt = "00h00m00",
	csGroupSep = ".", ; thousands separator character
	csDecimal = "," ; decimal point

Const
	;The key for pause
	csPauseKey="p"

Const
	CS_JawsGuide_LINK = "http://vip.chowo.co.uk/wp-content/uploads/jaws/Audacity-2.1.3-Guide.html", ;default URL to Audacity guide for JAWS
;This should reference the guide from which the Audacity Keys help message was taken.
CS_JawsGuide_Title = "Gu�a de Audacity 2.1.3 (en ingl�s)", 
CS_JawsGuide_Author = "David Bailes",
CS_JawsGuide_LINK_DISP = "enlace a la gu�a para JAWS" ;Name displayed in links list

Messages
@msgProgName
Audacity
@@

; Begins the hotkey help.
; %1 - string containing script version and date.
@msgScript_Ver
Combinaciones de teclas de JAWS con scripts versi�n %1, para Audacity 2.0.0 o posterior:

@@
@msgScriptKeyHelp

Para verbalizar la posici�n inicial de la selecci�n, pulse %keyfor (SaySelectionStart).
Para verbalizar la posici�n final de la selecci�n o la longitud, pulse %keyfor(SaySelectionEnd).
Para mover el foco a estos controles, pulse la tecla dos veces r�pidamente.
Para verbalizar el valor de posici�n del audio, pulse %keyfor(SayActiveCursor).
Para verbalizar el cursor activo mientras est� activo el del PC, pulse %keyfor(SayActiveCursor) dos veces r�pidamente.
Para aumentar la ganancia de la pista activa, pulse %keyfor (MouseUp).
Para reducir la ganancia de la pista activa, pulse %keyfor (MouseDown).
Para ajustar el posicionamiento est�reo hacia la izquierda, pulse %keyfor (MouseLeft).
Para ajustar el posicionamiento est�reo hacia la derecha, pulse %keyfor (MouseRight).
Mientras el foco est� en la ventana principal, las cuatro �ltimas teclas reemplazan los scripts de JAWS predeterminados para mover el rat�n. Si desea activar la funcionalidad original mientras est� en la ventana principal, active el cursor de JAWS.

Para verbalizar el valor del medidor de grabaci�n, pulse %KeyFor(SayRecordingMeter).
 Pulse dos veces r�pidamente para mover el foco al medidor.
Para verbalizar el valor del medidor de reproducci�n, pulse %KeyFor(SayPlaybackMeter).
 Pulse dos veces r�pidamente para mover el foco al medidor.

Para ir a una pista por su n�mero, pulse %KeyFor(GoToTrack).
Para mover la pista actual a una posici�n de pista por su n�mero, pulse %KeyFor(MoveCurrentTrackTo).
Para marcar la pista actual, pulse %KeyFor(MarkTrack).
Para ir a la pista marcada, pulse %KeyFor(GoToMarkedTrack).
Para ir a la pista marcada y marcar la pista de partida, pulse %KeyFor(ExchangeWithMark).
Para mover la pista actual a la posici�n de la pista marcada y fijar la marca en la pista actual, pulse %KeyFor(MoveCurrentTrackToMark).

Para activar o desactivar la voz, pulse %keyfor(MuteSynthesizer).
Para activar o desactivar los mensajes de aviso, pulse %keyfor (AnnounceOnOff)).  Esto duplica la opci�n Anunciar los mensajes de Audacity que se encuentra en Ajuste de opciones de JAWS.
Para m�s info, vea el archivo what's new.md.

En una barra de herramientas, pulse %KeyFor (NextDocumentWindow) para moverse a la siguiente
En una barra de herramientas, pulse %KeyFor (PreviousDocumentWindow) para moverse a la anterior

Para leer el estado del programa (reproduciendo/pausado/grabando/detenido), pulse %KeyFor(SayAudacityState)
Para restablecer todas las opciones de los scripts a sus valores predeterminados, pulse %keyfor (ResetConfig)
Para conmutar entre las dos listas del di�logo Editar secuencias de comandos, pulse %keyfor (SwitchChainsList).

Para obtener ayuda sobre las teclas r�pidas de Audacity, pulse %keyfor(AudacityKeysHelp).
Para obtener la ayuda predeterminada sobre teclas r�pidas de Windows, pulse %keyfor(AudacityKeysHelp) dos veces r�pidamente.

Si est� activada la opci�n "ENTER pausa al reproducir/grabar", al pulsar %KeyFor(ENTER) en tanto se reproduce o graba, se env�a la tecla Pausa. Para ejecutar ENTER en esta situaci�n, utilice %KeyFor(CtrlEnter).

En algunos plugins VST comunes, como L1V:
Para llevar el foco al control de predefinidos, pulse %keyfor (VSTPreset).
Para cargar una predefinici�n existente, pulse %keyfor (VSTLoadPreset).
Para guardar la configuraci�n actual como predefinici�n, pulse %keyfor (VSTSavePreset).

Si Silenciar en Vista Previa est� activado y aprieta el bot�n Vista Previa de un efecto, a veces el silencio resultante de la vista previa no se desactiva. Esto provocar� p�rdida de la respuesta de voz como consecuencia de cambios del foco. Puede corregirlo cambiando a un sitio diferente de Audacity y volviendo despu�s.

Para cambiar la configuraci�n de los scripts para Audacity, pulse %KeyFor (AdjustJawsOptions) %Keyfor (AdjustJawsVerbosity) %Keyfor (QuickSettings).

Para cambiar la URL de la Gu�a de JAWS para Audacity, pulse %keyfor (AddAudacityJawsGuide)
@@
@msgPresetHotkeyHelp
Para llevar el foco a la opci�n predefinidos, pulse %keyfor (VSTPreset).
Para cargar una predefinici�n existente, pulse %keyfor (VSTLoadPreset).
Para guardar la configuraci�n actual como predefinici�n, pulse %keyfor (VSTSavePreset).

@@

;Spoken before loading the Audacity for JAWS web page.
@msgLoadingJawsGuide_L
cargando p�gina web de la Gu�a de Audacity para JAWS
@@
@msgLoadingJawsGuide_S
Gu�a para JAWS
@@

;Text of Audacity hotkey help that appears before the link to the Audacity guide for JAWS.
;We don't use a % substitution for the link because it must be added to the virtual buffer by a separate function call to make it a link.
;�1 -- Audacity guide title
;%2 Audacity guide author
;There is a newline before and after the guide link.
@msgAudacityHotKeyHelp1
Combinaciones de teclas predeterminadas para Audacity v2.1.3 (de la %1, por %2). Acceda a la gu�a (en ingl�s) en
@@
;Text of hotkey help following the link to the guide.  The first character of the message starts a new line.  I can't get a blank line at the start of the message.
@msgAudacityHotkeyHelp2


Generales


Comando Combinaci�n de teclas
Abrir archivo de audio Ctrl + O 
Importar archivo de audio Ctrl + Shift + I 
Nuevo proyecto Ctrl + N 
Guardar proyecto Ctrl + S 
Di�logo de Preferencias Ctrl + P 
Moverse c�clicamente hacia adelante por Barras de herramientas, Tabla de pistas y Barra de selecci�n Ctrl + F6 
Moverse c�clicamente hacia atr�s por Barras de herramientas, Tabla de pistas y Barra de selecci�n Ctrl + Shift + F6 
Moverse c�clicamente hacia adelante por la ventana principal de Audacity y todos los di�logos no modales abiertos Alt + F6 
Moverse c�clicamente hacia atr�s por la ventana principal de Audacity y todos los di�logos no modales abiertos Alt + Shift + F6 
Zoom normal Ctrl + 2 
Acercar Ctrl + 1 
Alejar Ctrl + 3 

Reproducci�n


Comando Combinaci�n de teclas 

Iniciar/Detener Barra Espaciadora 
Iniciar/Detener y mover cursor X 
Pausa/reanudar P 
Rebobinar per�odo corto durante reproducci�n Flecha Izquierda 
Adelantar per�odo corto durante reproducci�n Flecha Derecha 
Rebobinar per�odo largo durante reproducci�n Shift + Flecha Izquierda 
Adelantar per�odo largo durante reproducci�n Shift + Flecha Derecha 
Reproducci�n en bucle Shift + Barra Espaciadora 
Di�logo Dispositivo de salida Shift + O 
Reproducir vista previa de corte/eliminaci�n C 
Reproducir per�odo corto antes del comienzo de la selecci�n Shift + F5 
Reproducir per�odo corto despu�s del comienzo de la selecci�n Shift + F6 
Reproducir per�odo corto antes del final de la selecci�n Shift + F7 
Reproducir per�odo corto despu�s del final de la selecci�n Shift + F8 
Reproducir per�odo corto antes y despu�s del comienzo de la selecci�n Ctrl + Shift + F5 
Reproducir per�odo corto antes y despu�s del final de la selecci�n Ctrl + Shift + F7 

Tabla de pistas


Comando Combinaci�n de teclas 

Moverse a pista anterior Flecha Arriba 
Moverse a pista siguiente Flecha Abajo 
Moverse a primera pista Ctrl + Inicio 
Moverse a �ltima pista Ctrl + Fin 
Alternar selecci�n de pista activa Enter 
Seleccionar todas las pistas (y un rango de tiempo que incluye todo el audio) Ctrl + A 
Deseleccionar todas las pistas (y todos los rangos de tiempo) Ctrl + Shift + A 
Seleccionar todas las pistas Ctrl + Shift + K 
Abrir el men� de la pista activa Tecla Aplicaciones o Shift + M 
Cerrar (Eliminar) la pista activa Shift + C 

Pista de audio


Comando Combinaci�n de teclas 

Cambiar ganancia de pista activa Shift + G 
Cambiar posicionamiento est�reo de pista activa Shift + P 
Silenciar/Desactivar silencio en la pista activa Shift + U 
Silenciar todas las pistas Ctrl + U 
Desactivar silencio en todas las pistas Ctrl + Shift + U 
Solo/Desactivar solo en la pista activa Shift + S 

Movimiento del cursor


Comando Combinaci�n de teclas 

Moverse al comienzo de las pistas (tiempo cero) Inicio 
Moverse al final de todo el audio Fin 
Moverse al comienzo del audio en las pistas seleccionadas J 
Moverse al final del audio en las pistas seleccionadas K 
Nueva posici�n del cursor en posici�n de reproducci�n ` 
Detener reproducci�n y mover cursor X 
Rebobinar per�odo corto Coma 
Adelantar per�odo corto Punto 
Rebobinar per�odo largo Shift + Coma 
Adelantar per�odo largo Shift + Punto 
Cursor un poquito a la izquierda Flecha Izquierda 
Cursor un poquito a la derecha Flecha Derecha 

Selecci�n de un rango de tiempo


Comando Combinaci�n de teclas 

Seleccionar un rango de tiempo que incluya todo el audio y seleccionar todas las pistas Ctrl + A 
Comienzo de selecci�n al principio de las pistas (tiempo 0) Shift + Inicio 
Final de selecci�n al final de todo el audio Shift + Fin 
Final de selecci�n en posici�n de reproducci�n + 
Comienzo de selecci�n al principio del audio en las pistas seleccionadas Shift + J 
Final de selecci�n al final del audio en las pistas seleccionadas Shift + K 
Para mover el final de la selecci�n un poquito a la derecha Shift + Flecha Derecha 
Para mover el final de la selecci�n un poquito hacia la izquierda Ctrl + Shift + Flecha Izquierda 
Para mover el comienzo de la selecci�n un poquito a la derecha Ctrl + Shift + Flecha Derecha 
Para mover el comienzo de la selecci�n un poquito a la izquierda Shift + Flecha Izquierda 

Edici�n


Comando Combinaci�n de teclas 

Deshacer Ctrl + Z 
Rehacer Ctrl + Y 
Borrar audio seleccionado Suprimir 
Cortar audio seleccionado Ctrl + X 
Copiar audio seleccionado Ctrl + C 
Pegar Ctrl + V 
Reemplazar audio seleccionado por silencio Ctrl + L 
Duplicar el audio seleccionado Ctrl + D 
Cerrar (Eliminar) pista activa Shift + C 
Encontrar cruces en cero Z

Etiquetas


Comando Combinaci�n de teclas

A�adir etiqueta en la selecci�n Ctrl + B 
A�adir etiqueta en la posici�n de reproducci�n Ctrl + M 
Moverse a la etiqueta siguiente Alt + Flecha Derecha 
Moverse a la etiqueta anterior Alt + Flecha Izquierda 

Grabaci�n


Comando Combinaci�n de teclas 

Grabar R 
A�adir grabaci�n Shift + R 
Pausa/reanudar P 
Detener Barra Espaciadora 
Di�logo Servidor de audio Shift + H 
Di�logo Dispositivo de grabaci�n Shift + I 
Di�logo Canales de grabaci�n Shift + N 
@@

@msg_App_Start
Bienvenido a Audacity. Para mostrar la lista de teclas r�pidas de JAWS para Audacity, pulse %Keyfor(AudacityScriptkeyHelp).
@@

;Is the same text for Start and End acceptable in msgMoveSelection, msgMoveTo, and msgSelectedTo in all languages??
@msgStart
comienzo
@@

@msgEnd
final
@@

@msgLeft
izquierda
@@

@msgRight
derecha
@@

@msgSelectionStart
Comienzo de selecci�n
@@

@msgSelectionEnd
Final de selecci�n
@@

; %1 = "start" or "end" of selection, %2 = direction ("left" or "right").
@msgMoveSelection_L
Mover %1 de selecci�n a la %2
@@
@msgMoveSelection
%1 %2
@@

@MsgNoProject_l
No hay pistas en el proyecto.
@@

@msgNoProject_s
Sin pistas
@@

;Used??
@msgSelection
selecci�n
@@

@msgTrack
pista
@@

;Used to say track number.  %1 -- number of current track, %2 -- total number of tracks.
@msgTrackPosition
%1 de %2
@@
    
;Substituted in msgMoveTo and msgSelectTo.
@msgAllAudio
todo el audio
@@

@msgSelectedTracks
pistas seleccionadas
@@

; %1 is where we move, like start or end, %2 is of what, e.g. track or selection.
@MSGMoveTo
Moverse al %1 de %2
@@

; %1 = where we are selecting to, like start or end, %2 is of what, e.g. track or selection..
@msgSelectTo
Seleccionar hasta el %1 de la %2
@@

@MSGDelete_l
Borrar audio seleccionado
@@

@MSGDelete_s
Borrar
@@

;Messages for program states.
@msgPause
pausado
@@
@msgPlay
reproduciendo
@@
@msgStop
detenido
@@
@msgRecord
grabando
@@

@msgDeselectAll
deseleccionar todo
@@

@msgSelectInAllTracks
seleccionar en todas las pistas
@@

@MSGSelectAll
Seleccionadas todas las pistas
@@

@msgCloseFocusedTrack
cerrar pista activa
@@

@msgNotStopped_l
No se puede realizar esta operaci�n salvo que est� detenido.
@@
@msgNotStopped_s
no detenido.
@@

@msgNoTransportToolbar
No se encuentra la barra de herramientas de reproducci�n. Para que estos scripts funcionen, la barra de herramientas de reproducci�n debe habilitarse.
@@

@msgCopyAudio
Copiar audio seleccionado en portapapeles
@@

@msgCutAudio
cortar audio seleccionado en portapapeles
@@

@msgAnnounceOff
Anuncio de mensajes desactivado
@@

@msgAnnounceOn
Anuncio de mensajes activado
@@

@msgResetScriptOptions
Las opciones de los scripts se restablecieron a sus valores predeterminados
@@

@msgNoSelection
Para utilizar esta funci�n, debe habilitar la barra de herramientas de selecci�n
@@
@msgNoRecordingMeter
Para utilizar esta funci�n, debe habilitar las barras de herramientas de Medici�n de Grabaci�n o Medici�n Combinada
@@
@msgNoPlaybackMeter
Para utilizar esta funci�n, debe habilitar las barras de herramientas de Medici�n de Reproducci�n o Medici�n Combinada
@@
@msg_Script_Version
Versi�n de los scripts para JAWS %1, para Audacity 2.0.0 o posterior.
@@
@MsgNoTrackSelected_L
Para utilizar esta funci�n, antes debe seleccionar por lo menos una pista. Para seleccionar una pista, pulse ENTER.
@@
@msgNoTrackSelected_S
No hay pistas seleccionadas.
@@

;messages for warning dialog when import uncompress audio
@msgCopy
Hacer una copia de los archivos antes de editar (m�s seguro)
@@

@msgDirectEdit
Leer %%los archivos directamente desde el original (m�s r�pido)
@@

@msgDoNotWarn
No volver a preguntar y utilizar siempre la opci�n seleccionada
@@

;Messages for the two lists in the Edit Chains dialog.
@msgChains
Secuencias de comandos
@@
@msgChainCommands
Secuencia de comandos
@@
;for changing Jaws guide's link
@msgNoChange_l
No se han efectuado cambios.
@@
@msgNoChange_s
Sin cambios.
@@
@MSGNewURL
La URL se ha cambiado a %1
@@
@MSGJawsGuideDialog
Escriba la nueva URL a la Gu�a de Audacity con JAWS.
@@

;Used to speak the field value along with the slider value in the Compressor effect.
;%1 percentage value of the slider (without percent), %2 value of the field (the static after the slider).
@msgCompressorSlider
%1%%%2
@@

; Prompt for the input boxes in the GoToTrack and MoveCurrentTrackTo scripts.
@msgTrackNumber
N�mero de pista:
@@

; Title of the input box in the  GoToTrack script.
@msgGoToTrackTitle
Ir a
@@

;Title of the input box in the MoveCurrentTrackTo script.
@msgMoveTrackToTitle
Mover a
@@


;%1 = track number
@msgTrackMarked
Pista %1 marcada
@@

@msgNoTrackMarked
sin marcas
@@

    ;Message to announce some Audacity keys
    @msgZoomNormal
ampliaci�n normal
@@

@msgZoomIn
ampliar
@@

@msgZoomOut
reducir
@@

@msgMuteAllTracks
silenciar todas las pistas
@@

@msgUnmuteAllTracks
desactivar silencio en todas las pistas
@@

@msgReplaceWithSilence
reemplazar con silencio
@@

@msgZeroCrossing
cruces en cero
@@

@msgImportAudio
importar audio
@@

@msgExportAudio
exportar audio
@@

@msgNewWindow
nueva ventana
@@

@msgSaveProject
guardar proyecto
@@

@msgPreferences
preferencias
@@

@msgDuplicate
duplicar
@@

@msgTrim
recortar
@@

@msgExportMultiple
Exportar m�ltiple
@@

@msgSplitCut
Dividir y cortar
@@

@msgSplitDelete
Dividir y borrar
@@

@msgPasteNewLabel
Pegar texto como una nueva etiqueta
@@

@msgSplit
Dividir
@@

@msgSplitNew
Dividir y nueva
@@

@msgJoin
Unir
@@

@msgDisjoin
Desunir en los silencios
@@

@msgCutLabels
Cortar etiquetas
@@

@msgDeleteLabels
Borrar etiquetas
@@

@msgSplitCutLabels
Dividir y cortar etiquetas
@@

@msgSplitDeleteLabels
Dividir y borrar etiquetas
@@

@msgSilenceLabels
Silenciar etiquetas
@@

@msgCopyLabels
Copiar etiquetas
@@

@msgSplitLabels
Dividir etiquetas
@@

@msgJoinLabels
Unir etiquetas
@@

@msgDisjoinLabels
Desunir etiquetas en los silencios
@@

@msgToggleSpectralSelection
Cambiar la selecci�n de espectro
@@

@msgSelSyncLockTracks
seleccionar en todas las pistas enlazadas
@@

@msgZoomSel
Ampliar la selecci�n
@@

@msgFitInWindow
Ajustar a la ventana
@@

@msgFitV
Ajustar verticalmente
@@

@msgGoSelStart
Ir al comienzo de la selecci�n
@@

@msgGoSelEnd
Ir al final de la selecci�n
@@

@msgCollapseAllTracks
Contraer todas las pistas
@@

@msgExpandAllTracks
Expandir todas las pistas
@@

@msgPlayLooped
Reproducir c�clicamente
@@

@msgNewMonoTrack
Pista mono
@@

@msgMixAndRenderToNewTrack
Mezclar y generar en pista nueva
@@

@msgAddLabel
A�adir etiqueta en la selecci�n
@@

@msgAddLabelPlaying
Agregar etiqueta en posici�n de reproducci�n
@@

@msgRepeatLastEffect
Repetir el �ltimo efecto
@@

@msgFirstTrack
Primera pista
@@

@msgLastTrack
�ltima pista
@@

@msgTrackPan
Cambiar posicionamiento
@@

@msgTrackMoveTop
Desplazar pista activa a la parte superior
@@

@msgTrackMoveBottom
Desplazar pista activa a la parte inferior
@@

@msgInputDevice
Cambiar dispositivo de grabaci�n
@@

@msgOutputDevice
Cambiar dispositivo de reproducci�n
@@

@msgAudioHost
Cambiar servidor de audio
@@

@msgInputChannels
Cambiar canales de grabaci�n
@@


EndMessages

