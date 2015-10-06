;10/5/15 by Gary Campbell: moved UO_*Hlp messages to the same place in the current English file.
; Spanish messages for Audacity 2.0.0 script by Gary Campbell, translated by Fernando Gregoire last updated 14/9/2013.
/*
JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012, 2013  Gary Campbell and Dang Manh Cuong.  All rights reserved.
    Copyright (C) 2014 Fernando Gregoire, for the Spanish translation. All rights reserved.

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
	WN_TOOLDOCK = "Bloqueo de herramientas", ; grandparent of toolbar buttons and selection bar controls
	WN_TRACKPANEL = "Panel de pista", ; window name of track table
	WN_SELECTION = "Selección", ;window name of selection bar
	WN_TRANSPORT_TOOLBAR = "Reproducción", ; window name of Transport toolbar
	WN_EDIT_CHAINS = "Editar secuencias de comandos" ; name of the Edit Chains dialog

Const
	; These are used to announce different areas of the main window.  They should be translated.
	CS_Toolbars="Barras de herramientas",
	CS_SelectionBar="Barra de selección",
	CS_TrackPanel="Panel de pista"

;For user options.  The text after the : should be translated, the text before must not be translated.
Const
	UO_ANNOUNCE_MESSAGES = "UOAnnounceMessages:Anunciar los mensajes de Audacity",
	UO_ANNOUNCE_TOOLBARS = "UOAnnounceToolbars:Anunciar las barras de herramientas",
	UO_ENTER_PAUSE = "UOEnterPause:ENTER pausa al reproducir/grabar"

Messages
; For user options.
@msgUO_AudacityOptionsHlp
Opciones específicas para Audacity
@@
@msgUO_AnnounceMessagesHlp
Si se activa, lee mensajes para las operaciones con audio en Audacity.
@@
@msgUO_AnnounceToolbarsHlp
SI se activa, lee el nombre de las barras de herramientas cuando el foco se mueve de una barra de herramientas a otra.
@@
@msgUO_EnterPauseHlp
Si se activa, ENTER ejecuta Pausa en tanto se reproduce o se graba, y Control+ENTER envía ENTER. De lo contrario, envía ENTER a Audacity.
@@
EndMessages

;These are used to strip leading zeros from audio positions.
Const
	;The format of a position with value 0 containing thousands separators, not including the last 0, like the seconds format, with blanks removed
	csPositionGroupFmt = "000.00",
	;The word following the days in a position.
	csDays = "días",
	;The format of a position with value 0 containing hours, minutes, and seconds, up to but not including the decimal point, like the HHõMMõSS.sss  format, with blanks removed
	csPositionHHMMFmt = "00h00m00s",
	csGroupSep = ".", ; thousands separator character
	csDecimal = "," ; decimal point

Const
	;The key for pause
	csPauseKey="p"

Const
	CS_JawsGuide_LINK = "http://vip.chowo.co.uk/wp-content/uploads/jaws/Audacity-2.0.4-Guide.html", ;default URL to Audacity guide for JAWS
;This should reference the guide from which the Audacity Keys help message was taken.
CS_JawsGuide_Title = "Guía de Audacity 2.0.4 (en inglés)", 
CS_JawsGuide_Author = "David Bailes",
CS_JawsGuide_LINK_DISP = "enlace a la guía para JAWS" ;Name displayed in links list

Messages
@msgProgName
Audacity
@@

; Begins the hotkey help.
; %1 - string containing script version and date.
@msgScript_Ver
Combinaciones de teclas de JAWS con scripts versión %1, para Audacity 2.0.0 o posterior:

@@
@msgScriptKeyHelp

Para verbalizar la posición inicial de la selección, pulse %keyfor (SaySelectionStart).
Para verbalizar la posición final de la selección o la longitud, pulse %keyfor(SaySelectionEnd).
Para mover el foco a estos controles, pulse la tecla dos veces rápidamente.
Para verbalizar el valor de posición del audio, pulse %keyfor(SayActiveCursor).
Para verbalizar el cursor activo mientras esté activo el del PC, pulse %keyfor(SayActiveCursor) dos veces rápidamente.
Para aumentar la ganancia de la pista que tiene el foco, pulse %keyfor (MouseUp).
Para reducir la ganancia de la pista que tiene el foco, pulse %keyfor (MouseDown).
Para ajustar el posicionamiento estéreo hacia la izquierda, pulse %keyfor (MouseLeft).
Para ajustar el posicionamiento estéreo hacia la derecha, pulse %keyfor (MouseRight).
Mientras el foco está en la ventana principal, las cuatro últimas teclas reemplazan los scripts de JAWS predeterminados para mover el ratón. Si desea activar la funcionalidad original mientras esté en la ventana principal, active el cursor de JAWS.
Para activar o desactivar la voz, pulse %keyfor(MuteSynthesizer).
Para activar o desactivar los mensajes de aviso, pulse %keyfor (AnnounceOnOff)).  Esto duplica la opción Anunciar los mensajes de Audacity que se encuentra en Ajuste de opciones de JAWS.
Para más info, vea el archivo whats new.txt.
En una barra de herramientas, pulse %KeyFor (NextDocumentWindow) para moverse a la siguiente
En una barra de herramientas, pulse %KeyFor (PreviousDocumentWindow) para moverse a la anterior
Para leer el estado del programa (reproduciendo/pausado/grabando/detenido), pulse %KeyFor(SayAudacityState)
Para restablecer todas las opciones de los scripts a sus valores predeterminados, pulse %keyfor (ResetConfig)
Para conmutar entre las dos listas del diálogo Editar secuencias de comandos, pulse %keyfor (SwitchChainsList).
Para obtener ayuda sobre las teclas rápidas de Audacity, pulse %keyfor(AudacityKeysHelp).
Para obtener la ayuda predeterminada sobre teclas rápidas de Windows, pulse %keyfor(AudacityKeysHelp) dos veces rápidamente.

Si está activada la opción "ENTER pausa al reproducir/grabar", al pulsar %KeyFor(ENTER) en tanto se reproduce o graba, se envía la tecla Pausa. Para ejecutar ENTER en esta situación, utilice %KeyFor(CtrlEnter).

En algunos plugins VST comunes, como L1V:
Para llevar el foco al control de predefinidos, pulse %keyfor (VSTPreset).
Para cargar una predefinición existente, pulse %keyfor (VSTLoadPreset).
Para guardar la configuración actual como predefinición, pulse %keyfor (VSTSavePreset).

Para cambiar la configuración de los scripts para Audacity, pulse %KeyFor (AdjustJawsOptions).

@@
@msgPresetHotkeyHelp
Para llevar el foco a la opción predefinidos, pulse %keyfor (VSTPreset).
Para cargar una predefinición existente, pulse %keyfor (VSTLoadPreset).
Para guardar la configuración actual como predefinición, pulse %keyfor (VSTSavePreset).

@@

;Spoken before loading the Audacity for JAWS web page.
@msgLoadingJawsGuide_L
cargando página web de la Guía de Audacity para JAWS
@@
@msgLoadingJawsGuide_S
Guía para JAWS
@@

;Text of Audacity hotkey help that appears before the link to the Audacity guide for JAWS.
;We don't use a % substitution for the link because it must be added to the virtual buffer by a separate function call to make it a link.
;û1 -- Audacity guide title
;%2 Audacity guide author
;There is a newline before and after the guide link.
@msgAudacityHotKeyHelp1
Combinaciones de teclas predeterminadas para Audacity v2.0.4 (de la %1, por %2). Acceda a la guía (en inglés) en
@@
;Text of hotkey help following the link to the guide.  The first character of the message starts a new line.  I can't get a blank line at the start of the message.
@msgAudacityHotkeyHelp2


Combinaciones de teclas para comandos generales 
Abrir archivo de audio Ctrl + O 
Importar archivo de audio Ctrl + Shift + I 
Nuevo proyecto Ctrl + N 
Guardar proyecto Ctrl + S 
Diálogo de Preferencias Ctrl + P 
Moverse cíclicamente hacia adelante por Barras de herramientas, Tabla de pistas y Barra de selección Ctrl + F6 
Moverse cíclicamente hacia atrás por Barras de herramientas, Tabla de pistas y Barra de selección Ctrl + Shift + F6 
Zoom normal Ctrl + 2 
Acercar Ctrl + 1 
Alejar Ctrl + 3 

Reproducción
Comando Combinación de teclas 
Iniciar/Detener Barra Espaciadora 
Iniciar/Detener y mover cursor Shift + A 
Pausa/reanudar P 
Rebobinar período corto durante reproducción Flecha Izquierda 
Adelantar período corto durante reproducción Flecha Derecha 
Rebobinar período largo durante reproducción Shift + Flecha Izquierda 
Adelantar período largo durante reproducción Shift + Flecha Derecha 
Reproducir vista previa de corte/eliminación C 
Reproducción en bucle Shift + Barra Espaciadora 
Diálogo Dispositivo de salida Shift + O 

Tabla de pistas
Comando Combinación de teclas 
Moverse a pista anterior Flecha Arriba 
Moverse a pista siguiente Flecha Abajo 
Alternar selección de pista con el foco Enter 
Seleccionar todas las pistas (y todo el audio) Ctrl + A 
Deseleccionar todas las pistas (y todos los rangos de tiempo) Ctrl + Shift + A 
Abrir el menú de la pista que posee el foco Tecla Aplicaciones o Shift + M 
Cerrar (Eliminar) la pista con el foco Shift + C 

Pista de audio
Comando Combinación de teclas 
Cambiar ganancia de pista con el foco Shift + G 
Cambiar posicionamiento estéreo de pista con el foco Shift + P 
Silenciar/Desactivar silencio en la pista con el foco Shift + U 
Silenciar todas las pistas Ctrl + U 
Desactivar silencio en todas las pistas Ctrl + Shift + U 
Solo/Desactivar solo en la pista con el foco Shift + S 

Movimiento del cursor
Comando Combinación de teclas 
Moverse al comienzo de las pistas (tiempo cero) Inicio 
Moverse al final de todo el audio Fin 
Moverse al comienzo del audio en las pistas seleccionadas J 
Moverse al final del audio en las pistas seleccionadas K 
Nueva posición del cursor en posición de reproducción ` 
Detener reproducción y mover cursor Shift + A 
Rebobinar período corto Coma 
Adelantar período corto Punto 
Rebobinar período largo Shift + Coma 
Adelantar período largo Shift + Punto 
Cursor un poquito a la izquierda Flecha Izquierda 
Cursor un poquito a la derecha Flecha Derecha 

Selección de un rango de tiempo
Comando Combinación de teclas 
Seleccionar un rango de tiempo que incluya todo el audio y seleccionar todas las pistas Ctrl + A 
Comienzo de selección al principio de las pistas (tiempo 0) Shift + Inicio 
Final de selección al final de todo el audio Shift + Fin 
Final de selección en posición de reproducción + 
Comienzo de selección al principio del audio en las pistas seleccionadas Shift + J 
Final de selección al final del audio en las pistas seleccionadas Shift + K 
Para mover el final de la selección un poquito a la derecha Shift + Flecha Derecha 
Para mover el final de la selección un poquito hacia la izquierda Ctrl + Shift + Flecha Izquierda 
Para mover el comienzo de la selección un poquito a la derecha Ctrl + Shift + Flecha Derecha 
Para mover el comienzo de la selección un poquito a la izquierda Shift + Flecha Izquierda 

Edición
Comando Combinación de teclas 
Deshacer Ctrl + Z 
Rehacer Ctrl + Y 
Borrar audio seleccionado Suprimir 
Cortar audio seleccionado Ctrl + X 
Copiar audio seleccionado Ctrl + C 
Pegar Ctrl + V 
Reemplazar audio seleccionado por silencio Ctrl + L 
Cerrar (Eliminar) pista con el foco Shift + C 

Grabación
Comando Combinación de teclas 
Grabar R 
Añadir grabación Shift + R 
Pausa/reanudar P 
Detener Barra Espaciadora 
Diálogo Servidor de audio Shift + H 
Diálogo Dispositivo de entrada Shift + I 
Diálogo de cantidad de canales Shift + N 
@@

@msg_App_Start
Bienvenido a Audacity. Para mostrar la lista de teclas rápidas de JAWS para Audacity, pulse %Keyfor(AudacityScriptkeyHelp).
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
Comienzo de selección
@@

@msgSelectionEnd
Final de selección
@@

; %1 = "start" or "end" of selection, %2 = direction ("left" or "right").
@msgMoveSelection_L
Mover %1 de selección a la %2
@@
@msgMoveSelection
%1 %2
@@

@MsgNoProject_l
No hay ningún proyecto abierto.
@@

@msgNoProject_s
Sin proyecto
@@

@msgSelection
selección
@@

@msgTrack
pista
@@

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

; %1 = where we are selectiog to, like start or end.
@MSGSelectedTo
Seleccionado hasta el %1
@@

@MsgStartOfFile
Seleccionado desde el principio del archivo.
@@

@MSgEndOfFile
Seleccionado hasta el final del archivo.
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

@MSGSelectAll
Seleccionadas todas las pistas
@@

@msgCloseFocusedTrack
cerrar pista con el foco
@@

@msgNotStopped_l
No se puede realizar esta operación salvo que esté detenido.
@@
@msgNotStopped_s
no detenido.
@@

@msgNoTransportToolbar
No se encuentra la barra de herramientas de reproducción. Para que estos scripts funcionen, la barra de herramientas de reproducción debe habilitarse.
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
Para utilizar esta función, debe habilitar la barra de herramientas de selección
@@
@msg_Script_Version
Versión de los scripts para JAWS %1, para Audacity 2.0.0 o posterior.
@@
@MsgNoTrackSelected
Para utilizar esta función, debe seleccionar la pista actual antes. Pulse enter para seleccionarla.
@@

;messages for warning dialog when import uncompress audio
@msgCopy
Hacer una copia de los archivos antes de editar (más seguro)
@@

@msgDirectEdit
Leer %los archivos directamente desde el original (más rápido)
@@

@msgDoNotWarn
No volver a preguntar y utilizar siempre la opción seleccionada
@@

;Messages for the two lists in the Edit Chains dialog.
@msgChains
Secuencias de comandos
@@
@msgChainCommands
Secuencia de comandos
@@
EndMessages
