/*
Header file for Jaws Script Installer
Written by Dang Manh Cuong
This use for my jfw script installer I've created synce July 2011
This only move the macro wich I've created from the installer file for simpile use
If you're advance user, you can use macros begin with Advance in its name. This allow you to process in all user, or current user folder
Date created: Saturday, July 14, 2012
*/

;Installation macros
!Macro RemoveTempFile
;Remove my extracted temporary files
IfFileExists ${TempFile} 0 +2
Delete ${TempFile}
!Macroend

!Macro AddHotkey JKM Key Script
;Add hotkeys to *.jkm file
;Usually use for advance user
ReadIniStr $0 ${TempFile} Install ScriptDir
WriteIniStr "$0\${JKM}.jkm" "Common Keys" ${Key} ${Script}
!MacroEnd

!Macro Recompile
;This Macro can be insert in the .OnInstSuccess function, or a section at the botum of every installer section for recompiling multiple scripts.
;If you want to recompile scripts in all user folder, use macro advance Recompile
ReadIniStr $0 ${TempFile} Install ScriptDir
nsExec::exec $0\recompile.bat ;Executes the batch file hiddenly
Delete $0\recompile.* ;delete it after finish compiling
!MacroEnd

!Macro AdvanceRecompile Path
;The ${path} is AllUser for all user folder, and scriptdir for current user folder
ReadIniStr $0 ${TempFile} Install ${path}
nsExec::exec $0\recompile.bat ;Executes the batch file hiddenly
Delete $0\recompile.* ;delete it after finish compiling
!MacroEnd

!Macro initializeScripts
;Recompile and re-initialize scripts
ReadIniStr $0 ${TempFile} Install ScriptDir
;create a batch file and add the command to refresh script
FileOpen $2 $0\recompile.bat a
FileSeek $2 0 end ;go to the botum of file
FileWrite $2 "$\r$\n"
FileWrite $2 "recompile.vbs"
FileClose $2
;Re-initialize the script by calling the Jaws function
;First, create a vbs file for calling
FileOpen $2 $0\recompile.vbs w
FileWrite $2 "dim oJAWS :"
FileWrite $2 "$\r$\n"
FileWrite $2 'set oJAWS = createObject("FreedomSci.JAWSAPI")'
FileWrite $2 "$\r$\n"
FileWrite $2 'oJAWS.RunFunction "ReloadAllConfigs"'
FileClose $2
nsExec::exec $0\recompile.bat ;Executes the batch file hiddenly
Delete $0\recompile.* ;delete it after finish compiling
!MacroEnd

!macro Compiler Source
;Get the path of enu folder and compiler file
ReadIniStr $0 ${TempFile} Install ScriptDir ;the path of the Enu folder
ReadIniStr $1 ${TempFile} Install Compiler ;the path of SCompile.exe
;Create compiler file
FileOpen $2 $0\recompile.bat a ;Open the created bat file
;Move to the end and add code for compiling
FileSeek $2 0 end
FileWrite $2 '"$1" "${Source}.jss"'
FileWrite $2 "$\r$\n"
FileClose $2
!macroEnd

!macro AdvanceCompiler Path Source
;Get the path of enu folder and compiler file
;The ${path} constain is a same at the condition in the "AdvanceRecompile" macro
ReadIniStr $0 ${TempFile} Install ${path} ;the path of the Enu folder
ReadIniStr $1 ${TempFile} Install Compiler ;the path of SCompile.exe
FileOpen $2 $0\recompile.bat a ;Open the created bat file
;Move to the end and add code for compiling
FileSeek $2 0 end
FileWrite $2 '"$1" "${Source}.jss"'
FileWrite $2 "$\r$\n"
FileClose $2
!macroEnd

!Macro RecompileSingle Source
;Recommend for scripts wich have only one source (*.JSS) file, or doesn't make any modification to any original files
;Using this macro to save time of the installer because it doesn't store and delete any temporary files
ReadIniStr $0 ${TempFile} Install ScriptDir
ReadIniStr $1 ${TempFile} Install Compiler
;Exec the sCompile.exe hiddently
;The extention of script source has been added
nsExec::Exec '"$1" "$0\${Source}.jss"'
!MacroEnd

!Macro AdvanceCompileSingle Path Source
ReadIniStr $0 ${TempFile} Install ${Path}
ReadIniStr $1 ${TempFile} Install Compiler
;Exec the sCompile.exe hiddently
;The extention of script source has been added
nsExec::Exec '"$1" "$0\${Source}.jss"'
!MacroEnd

!Macro ExtractScript File
;where ${file} your files
;Get the script location
;If you want to extract files to some special folder, such as personalize settings, ,zip etc, create it into the folder where you put scripts, copy all needed file to this, and use this macro to add to the package
ReadIniStr $0 ${TempFile} Install ScriptDir
setOutPath $0
;put file, include subdirectory their
File /R ${File}
!Macroend

!Macro AdvanceExtractScript Path File
;where ${file} your files, and ${path} your folder
;Get the script location
;If you want to extract files to some special folder, such as personalize settings, ,zip etc, create it into the folder where you put scripts, copy all needed file to this, and use this macro to add to the package
ReadIniStr $0 ${TempFile} Install ${Path}
setOutPath $0
;put file, include subdirectory their
File /R ${File}
!Macroend

!Macro CopyScript Name
;Use to copy any script source from share folder
ReadIniStr $0 ${TempFile} "Install" "ScriptDir"
IfFileExists $0\${Name} copy
ReadIniStr $1 "${TempFile}" "Install" "AllUser"
CopyFiles /silent "$1\${Name}" "$0\${Name}"
copy:
!Macroend

!macro ModifyScript File Code
;Use to add some code to the existing script
;Like adding: use "skypewatch.jsb"" to default.jss
ReadIniStr $0 ${TempFile} Install ScriptDir
FileOpen $1 $0\${File} a
;Go to the botum of file
FileSeek $1 0 end
;Add a blank lines to safely modify
FileWrite $1 "$\r$\n"
FileWrite $1 `${Code}`
FileClose $1
!Macroend

!macro AdvanceModifyScript Path File Code
;Use to add some code to the existing script
;Like adding: use "skypewatch.jsb"" to default.jss
ReadIniStr $0 ${TempFile} Install ${Path}
FileOpen $1 $0\${File} a
;Go to the botum of file
FileSeek $1 0 end
;Add a blank lines to safely modify
FileWrite $1 "$\r$\n"
FileWrite $1 `${Code}`
FileClose $1
!Macroend

;Uninstallation macros
!Macro un.DeleteScript Files
;where ${files} your files
;Get the script location
;If you want to delete file in subfolder in enu, include it on the parameter
ReadIniStr $1 ${InstallFile} Install ScriptDir
Delete $1\${Files}*.*
!Macroend

!Macro un.AdvanceDeleteScript Path Files
;where ${files} your files
;Get the script location
;If you want to delete file in subfolder in enu, include it on the parameter
ReadIniStr $1 ${InstallFile} Install ${path}
Delete $1\${Files}*.*
!Macroend

!Macro Un.RemoveHotkey JKM Key
ReadIniStr $1 ${InstallFile} Install ScriptDir
DeleteIniStr "$1\${jkm}.jkm" "Common Keys" ${Key}"
!MacroEnd