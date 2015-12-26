; 11/12/15 User-visible messages for JFW.nsh.
;Does not include debug messages or messages printed to log file/log window.

;Do not translate text inside ${...}.  These will be replaced with their values.  Also true for things like $variablename, $0, or $R1.  (To cause a $ to appear in text, it is doubled, like $$R0 will appear as $0.)

;$R1=script file name without extension, $1=exit code (number), $R2=text output by program.
LangString CouldNotCompile ${LANG_SPANISH} "No se pudo compilar $R1.jss, SCompile devolvió $1$\r$\n$$OutDir=$OutDir, Salida:$\r$\n$R2. ¿Reintentar compilación?"

LangString CouldNotFindCompiler ${LANG_SPANISH} "No se encontró el compilador de scripts de JAWS $R0. Para usar esto, necesitará compilarlo con el Asistente de Scripts de JAWS."

LangString NoVersionSelected ${LANG_SPANISH} "No se seleccionaron versiones."

LangString InstallFolderExists ${LANG_SPANISH} "La carpeta especificada existe, lo cual muy probablemente significa que ${ScriptName} ya está instalado. Si desea instalar sobre la instalación actual, elija Sí."

LangString InstDirNotFolder ${LANG_SPANISH} "¡$INSTDIR existe y no es una carpeta!"

LangString InstConfirmHdr ${LANG_SPANISH} "Confirmar configuración de instalación"

LangString InstConfirmText ${LANG_SPANISH} "Lo siguiente resume las acciones que efectuará esta instalación. Para cambiar la configuración, haga clic en Atrás. Para continuar, haga clic en Instalar (Alt+I)."
LangString InstConfirmCurrentUser ${LANG_SPANISH} "el usuario actual"
LangString InstConfirmAllUsers ${LANG_SPANISH} "todos los usuarios"

;$2=$(InstConfirmCurrentUser or $(InstConfirmAllUsers followed by a space, $1=comma-separated list of versions.
LangString InstConfirmVersions ${LANG_SPANISH} "Los scripts se instalarán para $2 en las versiones de JAWS siguientes:$\r$\n$1.$\r$\n"

;$0=previous text, should not be followed by space.  $1=list of versions.
LangString InstConfirmHaveFiles ${LANG_SPANISH} "$0Las versiones de JAWS siguientes contienen archivos para esta aplicación (archivos coincidentes con ${ScriptApp}.*): $1$\r$\nEstos archivos se pueden sobreescribir durante la instalación.$\r$\n"

LangString InstConfirmUninstAddRemovePrograms ${LANG_SPANISH} "$0Carpeta de instalación: $INSTDIR.$\r$\nEsta instalación se ha de desinstalar a través de Agregar o quitar programas.$\r$\n"

;$0=previous text.
LangString InstConfirmExistingInstall ${LANG_SPANISH} "$0En esta máquina ya existe una instalación de ${ScriptName}.$\r$\n"

LangString InstConfirmInstallerSrc ${LANG_SPANISH} "$0El código fuente del instalador se instalará en $INSTDIR\${JAWSINSTALLERSRC}."
LangString InstConfirmNotInstalled ${LANG_SPANISH} "$0Esta instalación no se puede desinstalar a través de Agregar o quitar programas."
LangString OverwriteScriptsQuery ${LANG_SPANISH} "Ya hay scripts para ${ScriptName} en $2. ¿Desea sobreescribirlos?"

LangString JawsNotInstalled ${LANG_SPANISH} "No se puede iniciar el instalador porque el programa Jaws no está instalado en el sistema."

LangString CantFindJawsProgDir ${LANG_SPANISH} "No se encontró la carpeta $0 ya sea en $programfiles o $programfiles64. La instalación puede continuar, pero quizá deba compilar los scripts usted."

LangString BrandingText ${LANG_SPANISH} "${ScriptName} (empaquetado por Dang Manh Cuong)"
LangString SuccessfullyRemoved ${LANG_SPANISH} "${ScriptName} se ha quitado correctamente del equipo."
LangString InstallFolderNotRemoved ${LANG_SPANISH} "Advertencia: la carpeta de instalación $INSTDIR no se quitó. Probablemente contenga archivos que no se hayan eliminado."
LangString SureYouWantToUninstall ${LANG_SPANISH} "¿Está seguro de que desea quitar por completo $(^Name) y todos sus componentes?"
LangString UninstallUnsuccessful ${LANG_SPANISH} "La desinstalación no se realizó correctamente, código de salida $1. Elija Aceptar para instalar de todos modos, o Cancelar para salir."
LangString AlreadyInstalled ${LANG_SPANISH} "${ScriptName} ya está instalado en este equipo. Se recomienda encarecidamente que antes de continuar lo desinstale. ¿Desea desinstalarlo?"

;e.g. V2.0 ...
LangString VersionMsg ${LANG_SPANISH} "V${VERSION}"

;Messages in the Install Type combo box.
LangString InstTypeFull ${LANG_SPANISH} "Completa"
LangString InstTypeJustScripts ${LANG_SPANISH} "Sólo scripts"

;Text at the top of the Components page.
LangString InstTypeFullMsg ${LANG_SPANISH} "Completa le permite desinstalar utilizando Agregar o quitar programas.  $\n\
Sólo Scripts instala los scripts y el LÉAME, no pudiéndose desinstalar desde Agregar o quitar programas."

;Name of the Installer Sourse section (the Install Source custom component)
LangString SecInstallerSource ${LANG_SPANISH} "Código fuente del instalador"

LangString WelcomePageTitle ${LANG_SPANISH} "Instalación de ${ScriptName}"

!if VERSION != ""
!define _VERSIONMSG " $(VersionMsg)"
!else
!define _VERSIONMSG ""
!endif

LangString WelcomeTextCopyright ${LANG_SPANISH} "Le damos la bienvenida a la instalación de ${ScriptName}${_VERSIONMSG}.$\n\
Este asistente le guiará por la instalación de ${ScriptName}.$\n\
${LegalCopyright}$\n"
LangString WelcomeTextNoCopyright ${LANG_SPANISH} "Le damos la bienvenida a la instalación de ${ScriptName}${_VERSIONMSG}.$\n\
Este asistente le guiará por la instalación de ${ScriptName}.$\n"
!undef _VERSIONMSG

;list view
;Text at the top of the Select JAWS Versions/Languages dialog.
LangString SelectJawsVersions ${LANG_SPANISH} "Seleccione las versiones/idiomas de JAWS en que instalar los scripts:"

;JAWS versions/languages list view caption
LangString LVLangVersionCaption ${LANG_SPANISH} "Versiones e idiomas de JAWS"

;Install for All/Current user group box ($JAWSGB)
LangString GBInstallForCaption ${LANG_SPANISH} "Instalar para"
LangString RBCurrentUser ${LANG_SPANISH} "El usuario a&ctual" ;$JAWSRB1
LangString RBAllUsers ${LANG_SPANISH} "&Todos los usuarios" ;$JAWSRB2

LangString DirPageText ${LANG_SPANISH} "Elija la carpeta en que almacenar archivos de instalación de ${ScriptName} tales como el desinstalador, la ayuda u otros archivos. $\n\
El instalador almacenará la instalación de ${ScriptName} en la carpeta siguiente. Para instalar en una carpeta diferente, haga clic en Examinar y seleccione otra carpeta."

LangString ViewReadmeFile ${LANG_SPANISH} "Ver archivo LÉAME"
