/*
Audacity Jaws script installer
Written by Dang Manh Cuong <dangmanhcuong@gmail.com>
This installer required NSIS Script from http://nsis.sourceforge.net

This installer has the folowing features and limitations
Features:
. Install for all English version of Jaws. This feature will exists until Freedom Scientific changes the place to put scripts.
. Get the correct install path  of Jaws from the registry, so the install will have the best rezult.
. Check the existed of Jaws before starting setup. If no Jaws installed, display a warning message..
. If only one version of Jaws installed, does not display the select Jaws version page.
. create macros for extracting, compiling, deleting, modifying script, so user can create a multi scripts package quick and easily.
. Create bat file for compiling multiple scripts at a time using SCompile.exe.
. Macro to copy script from all user to current user for modifying in some cases.
Limitations:
. User cannot select more than one version to install.
. This installer created for English version only.
Date created: Wednesday, July 11, 2012
Last updated: Thursday, July 12, 2012
*/

;Begin of code
;User define constains
;Name of script here
!Define ScriptName "Jaws Script for Audacity"
!Define InstallFile $instdir\Install.ini
!Define tempFile $temp\Install.ini
!Define UnInstaller "Uninst.exe"
!Define JawsDir "$appdata\Freedom Scientific\Jaws" ;the folder where Jaws 6.0 or above located
!Define Scriptdir "Settings\Enu" ;folder to put the script
!Define JawsApp "JFW.EXE" ;Use to check if Jaws installed
!Define Compiler "Scompile.exe" ;Use to recompile script after installation

SetCompressor /solid lzma ;create the smallest file
SetOverwrite on ;always overwrite files

;Name in file
Name "${ScriptName}"
;The executable file to write
OutFile "${ScriptName}.exe"
;installation directory
InstallDir "$programfiles\${scriptName}" 
BrandingText "${ScriptName} (packaged by Dang Manh Cuong)"
!include "JFW.nsh" ;Header file to store all macros

;Modern UI configurations
!Include "MUI.nsh"
  !define MUI_ABORTWARNING
  !define MUI_UNABORTWARNING
!define MUI_FINISHPAGE_SHOWREADME "$instdir\audacity_readme.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "View readme file"
  !define MUI_FINISHPAGE_TEXT_LARGE
  !define MUI_FINISHPAGE_LINK "Go to author's project"
  !define MUI_FINISHPAGE_LINK_LOCATION "http://code.google.com/p/dangmanhcuong"
;Pages
!Insertmacro Mui_Page_Welcome
Page custom DisplayJawsList checkJaws ;Select Jaws version page
;!insertmacro mui_page_Components
PageEx Directory
DirText "Choose the folder in which to store ${ScriptName}'s installation, such as uninstaller, help or other files. $\n\
Setup will store ${ScriptName}'s installation in the following folder. To install in a different folder, click Browse and select another folder. Click Install to start the installation."
PageExEnd
!insertmacro mui_page_instfiles
!insertmacro mui_page_Finish

;Uninstall pages
;  !insertmacro MUI_UNPAGE_COMPONENTS
  !insertmacro MUI_UNPAGE_INSTFILES
  !insertmacro MUI_LANGUAGE "English"

Function .OnInit
strCpy $0 0
EnumRegkey $1 hklm "software\Freedom Scientific\Jaws" $0
${If} $1 == ""
MessageBox MB_ICONINFORMATION|MB_OK "Setup cannot start because the Jaws programme has not installed on your system."
quit
${Else}
!insertmacro mui_Installoptions_extract Install.ini
${EndIf}
FunctionEnd

Function .OnInstSuccess
!Insertmacro RemoveTempFile
FunctionEnd

Function DisplayJawsList 
strCpy $0 0
loop:
EnumRegkey $2 hklm "software\Freedom Scientific\Jaws" $0 ;Enumerate the existing version of Jaws
strcmp $2 "" done
IntOp $0 $0 + 1 ;increase the successfully counter by one unit
;Get the Detected Jaws version if exists
  !InsertMacro MUI_INSTALLOPTIONS_READ $3 "Install.ini" "Field 2" "ListItems"
;Then combine it with the new one
    !InsertMacro MUI_INSTALLOPTIONS_WRITE "Install.ini" "Field 2" "ListItems" "$3Jaws $2|" 
    !InsertMacro MUI_INSTALLOPTIONS_WRITE "Install.ini" "Field 2" "State" "Jaws $2" ;Always select one of the existing version of Jaws
goto loop ;continue checking
done:
;Get the counter number of Jaws install on system
${If} $0 >= 2 ;there are two or more version of Jaws install
!insertmacro mui_installoptions_display install.ini ;Display the Select Jaws Version Page
${Else}
;If only one version installed, don't display Select Jaws Version Page
  !InsertMacro MUI_INSTALLOPTIONS_READ $3 "Install.ini" "Field 2" "ListItems"
StrCpy $3 $3 -1
    !InsertMacro MUI_INSTALLOPTIONS_WRITE "Install.ini" "Field 2" "State" $3 ;select current Jaws version automatically
Call CheckJaws
${EndIf}
FunctionEnd

Function CheckJaws
readIniStr $4 "$Pluginsdir\install.ini" "Field 2" State ;Check the selected Jaws version
StrCpy $4 $4 "" 5 ;get the version number next to word "Jaws" (stored in the install options file) 
${If} $4 >= "6.0" ;Current selected version is 6.0 or later
;Add the installation path to ${tempFile}
WriteIniStr ${TempFile} Install ScriptDir "${JawsDir}\$4\${ScriptDir}" ;get the script location from current user
SetShellVarContext all
WriteIniStr ${TempFile} Install AllUser "${JawsDir}\$4\${ScriptDir}" ;get the script location from all user
${Else}
;Jaws 5.0 or erlier, the path of enu folder stored in its installation location. So we'll find the path by reading from registry
ReadRegStr $5 HKLM "SOFTWARE\Freedom Scientific\Jaws\$4" "Target"
WriteIniStr ${TempFile} Install ScriptDir "$5\${ScriptDir}"
${EndIf}
;Get the path of the SCompile.exe for recompiling script after installation
;It locate under the Jaws' installation path
ReadRegStr $5 HKLM "SOFTWARE\Freedom Scientific\Jaws\$4" "Target" ;Find the installation path of Jaws
WriteIniStr ${TempFile} Install Compiler $5${Compiler}
FunctionEnd


Section Install
;Exstrac script to enu folder
!Insertmacro ExtractScript "script\*.*"
;Recompile scripts
!insertmacro RecompileSingle audacity
SectionEnd

Section -Uninstaller
CopyFiles /silent ${TempFile} ${InstallFile} ;copy the install.ini to the instal directory
SetOutPath $Instdir
File *.txt
;Write the installer and add it to the registry
WriteUninstaller "$Instdir\${UnInstaller}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${ScriptName}" "DisplayName" "${ScriptName} (remove only)"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${ScriptName}" "UninstallString" '"$INSTDIR\${UnInstaller}"'
sectionEnd

;Uninstaller function and Section
Function un.onInit
    MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "Are you sure you want to completely remove $(^Name) and all of its components?" IDYES +2
  Abort
FunctionEnd

Function un.OnUninstSuccess
!Insertmacro RemoveTempFile
HideWindow
  MessageBox MB_ICONINFORMATION|MB_OK "${ScriptName}  has been successfully removed from your computer."
FunctionEnd

Section Un.RemoveScript
!insertmacro un.DeleteScript "audacity*.*"
SectionEnd

Section un.Uninstaller
DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${ScriptName}"
RmDir /r $instdir
SetAutoclose true
SectionEnd