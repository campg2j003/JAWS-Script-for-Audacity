; @(#) $Id: jfw_bx.nsi,v 1.26 2007/03/27 12:52:55 Owner Exp $
; Install wizard for BX
; This script requires NSIS 2.0 and above
; http://nsis.SourceForge.net
;
; Written by Victor Tsaran
  ;--------------------------------
  ;Modern UI Configuration
  !define VERSION "2.0"
  NAME "BX, v${VERSION}"
  !define RELEASE "BX"

  ;Include Modern UI Macro's
  !include "MUI.nsh"
  SetCompressor LZMA
  CRCCheck On
  ShowInstDetails hide
  ShowUninstDetails hide
  SetOverwrite On
  SetDateSave on

  !define MUI_WELCOMEPAGE_TITLE "Welcome to the installation of ${RELEASE}"
  !define MUI_WELCOMEPAGE_TEXT "Written by Doug Lee\n\
  This wizard will guide you through the installation of ${RELEASE}\n\
  It is recommended that you close all other applications before starting Setup. This will allow Setup to update certain \
  system files without rebooting your computer.$\n"
  !define MUI_FINISHPAGE_TEXT_LARGE
  !define MUI_FINISHPAGE_LINK "Visit the web site of Doug Lee"
  !define MUI_FINISHPAGE_LINK_LOCATION "www.dlee.org"
  !define MUI_FINISHPAGE_NOREBOOTSUPPORT
;  !define MUI_WELCOMEFINISHPAGE_BITMAP ""
  !define MUI_WELCOMEFINISHPAGE_BITMAP_NOSTRETCH

  !define MUI_ABORTWARNING

  !define MUI_UNINSTALLER
  !define MUI_UNPAGE_INSTFILES_CUSTOMFUNCTION_LEAVE Un.LastWarningMessage

  !define MUI_FINISHPAGE_CUSTOMFUNCTION_LEAVE InstLastWarningMessage
  !define MUI_CUSTOMPAGECOMMANDS
; Custom page macros
  !InsertMacro MUI_PAGE_WELCOME
  !InsertMacro MUI_PAGE_LICENSE "bxlicense.txt"
  Page custom CheckJAWSVersions
  ;!insertmacro MUI_PAGE_DIRECTORY
  !insertmacro MUI_PAGE_INSTFILES
  !insertmacro MUI_PAGE_FINISH
  Page custom InstLastWarningMessage

  !InsertMacro MUI_UNPAGE_WELCOME
  UninstPage custom un.DisplayUninstallOptions
  !InsertMacro MUI_UNPAGE_INSTFILES
  !InsertMacro MUI_UNPAGE_FINISH
  UninstPage custom Un.LastWarningMessage

  !define MUI_HEADERBITMAP "${NSISDIR}\Contrib\Icons\modern-header.bmp"
  !define MUI_SPECIALINI "ioSpecial.ini"

; Several user-defined constants
  !define ScriptCompiler "scompile.exe"
  !define JAWSApp "jfw.exe"
  !define SETTINGSDIR "settings\enu"
  !define UnInstaller "uninst_bx.exe"
  !define HELPDIR "$INSTDIR"
  !define HELPFILE "BXMan.htm"
  !define INSTINIFILE "install.ini"
  !define UNINSTINIFILE "uninstall.ini"
  var x
  var JAWSVersion
  var JAWSBuild
  var JAWSInstallDirs
  var ScriptCompilerPath
  var UserSettingsPath

  OutFile "jfw_bx.exe"

; Set installation directory
InstallDir "$PROGRAMFILES\${RELEASE}"

; Installation directory
InstallDirRegKey HKLM "Software\${RELEASE}" "Install_Dir"

  ;--------------------------------
  ;Languages
  !insertmacro MUI_LANGUAGE "English"

  ;---
  ; Language strings
  LangString TEXT_IO_PAGETITLE ${LANG_ENGLISH} "Checking installed versions of JAWS..."

  ;--------------------------------
  ;Reserve Files
  ReserveFile "${INSTINIFILE}"
  ReserveFile "${UNINSTINIFILE}"
  ReserveFile ${MUI_WELCOMEFINISHPAGE_BITMAP}
  !insertmacro MUI_RESERVEFILE_INSTALLOPTIONS

Section "install" SecCore
  StrCmp $1 "" CouldNotExtractPathMsg

InstallLoop:
  ClearErrors
  Push "$1"
  Call SplitFirstStrPart
  Pop $3
  Pop $4
  ;MessageBox MB_OK "$3 and $4"
  StrCmp $3 "" CouldNotExtractPathMsg

; Get JAWS version for the path in $3, the result will be in $JAWSVersion
  Push $3
  Call GetJAWSEXEVersion

; For JAWS 6.0 and higher, the version number is no longer sufficient, so we will use 6.0, 6.1 etc.
  IntCmp $JAWSVersion 6 +1 +3
  StrCpy $UserSettingsPath "$APPDATA\Freedom Scientific\JAWS\$JAWSBuild"
  Goto l1
  StrCpy $UserSettingsPath $3
  ;MessageBox MB_OK "$INSTDIR"
l1:
  StrCpy $INSTDIR "$UserSettingsPath\${SETTINGSDIR}"
  StrCpy $ScriptCompilerPath $3
  SetOutPath $INSTDIR

; back up original files
; The following is needed for JAWS 6 to make sure that the default files  are there.
  ExecWait "$ScriptCompilerPath\${SCRIPTCOMPILER} default.jss" $R9
  rename "default.jsb" "default_fs.jsb"
  IfErrors CouldNotBackupMsg
  Rename "default.jss" "default_fs.jss"
;  IfErrors CouldNotBackupMsg
  CopyFiles /SILENT "default.jsd" "default_fs.jsd"
;    IfErrors CouldNotBackupMsg

  ; Unpack necessary files from the installer
  file "settings\*.*"
  SetOutPath "$INSTDIR\Sounds"
  file "settings\Sounds\*.*"
  SetOutPath $INSTDIR

  IntCmp $JAWSVersion 5 +1 +3 +1
  file "settings\j5\*.*"
  Goto NextCycle
  IntCmp $JAWSVersion 4 +1 WrongVersionMsg
  file "settings\j4\*.*"


NextCycle:
  ExecWait "$ScriptCompilerPath\${ScriptCompiler} default.jss" $R9
  StrCpy $JAWSInstallDirs "$JAWSInstallDirs|$3"
  StrCmp $4 "" WriteRegKeys
  StrCpy $1 $4
  Goto InstallLoop

WriteRegKeys:
; ChopLeft the beginning | from $InstallDirs
  StrLen $8 $JAWSInstallDirs
  StrCpy $JAWSInstallDirs $JAWSInstallDirs $8 1

; Change the output directory to our real installation directory
  StrCpy $INSTDIR "$PROGRAMFILES\${RELEASE}"
  SetOutPath $INSTDIR

; Extract documentation
  file "settings\doc\*.*"

; Write install keys into registry
  WriteRegStr HKLM "Software\${RELEASE}" "Install_Dir" "$INSTDIR"
  WriteRegStr HKLM "Software\${RELEASE}" "InstalledForJFWVersions" "$JAWSInstallDirs"
; Write the uninstall keys into registry
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${RELEASE}" "DisplayName" "${RELEASE} (remove only)"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${RELEASE}" "UninstallString" '"$INSTDIR\${UnInstaller}"'
  WriteUninstaller "${UnInstaller}"
  GoTo Done

CouldNotBackupMsg:
  MessageBox MB_OK "Installer could not back up your original files successfully.$\n\
  Without this operation completed, installer cannot continue. Please check the validity of your JAWS installation."
  Quit

WrongVersionMsg:
  MessageBox MB_OK "BX will not work with this version of JAWS. The installer will now quit.$\n"
  Quit

CouldNotExtractPathMsg:
  MessageBox MB_OK "Could not set installation path. The installer will now quit.$\n"
  Quit

Done:
SectionEnd

Section "Start Menu Shortcuts"
  CreateDirectory "$SMPROGRAMS\${RELEASE}"
  CreateShortCut "$SMPROGRAMS\${RELEASE}\Uninstall.lnk" "$INSTDIR\${UnInstaller}" "" "$INSTDIR\${UnInstaller}" 0
  CreateShortCut "$SMPROGRAMS\${RELEASE}\Help.lnk" "$INSTDIR\${HELPFILE}" "" "${HELPDIR}\${HELPFILE}" 0
SectionEnd

Function .onInit
; Check if we are already installed
  ReadRegStr $x HKLM "Software\${RELEASE}" "InstalledForJFWVersions"
  StrCmp $X "" ContinueInstall

  push $X
  call SplitFirstStrPart
  pop $R1
  pop $R2

  StrCpy $R1 "$R1\${SETTINGSDIR}"
  IfFileExists "$R1\default_fs.jsb" Reinstall +1
  IfFileExists "$R1\bx*.*" +1 ContinueInstall
  IfFileExists "$INSTDIR\${UnInstaller}" ContinueInstall

Reinstall:
  MessageBox MB_YESNO "It was determined that ${RELEASE} is already installed on your computer.$\n\
  Would you like to attempt to reinstall ${RELEASE}?$\n" IDYES +1 IDNO CancelInstall
  CopyFiles /SILENT "$INSTDIR\${UnInstaller}" $TEMP
  ExecWait '$TEMP\${UnInstaller} /S _?=$INSTDIR' $R9
  IntCmp $R9 0 +1 CancelInstall
  MessageBox MB_OK "Uninstallation was successful$\n"
  GoTo ContinueInstall

CancelInstall:
  MessageBox MB_OK "The installation of ${RELEASE} could not continue...$\n"
  Quit

ContinueInstall:
  !insertmacro MUI_INSTALLOPTIONS_EXTRACT "${INSTINIFILE}"
FunctionEnd

Function CheckJAWSVersions
  IntOp $R0 $R0 * 0 ; enumeration counter
  IntOp $R9 $R9 * 0 ; successful entries counter
  loop1:
  EnumRegKey $R1 HKLM "Software\Freedom Scientific\JAWS" $R0 ; Enumerate existing versions of JAWS
  StrCmp $R1 "" DisplayJAWSList
  StrCmp $R1 "Registration" NextCycle
  ReadRegStr $R2 HKLM "Software\Freedom Scientific\JAWS\$R1" "Target" ; Find out paths for JAWS installations
  StrCmp $R2 "" NextCycle

  Push $R2  ; Pass the parameter directory name to the CheckJAWSSettings function
  Call VerifyJAWSSettings ; Otherwise, check if ${JAWSApp} is there and the settings are OK
  Pop $R8 ; pop the return value from the stack
  IntCmp $R8 0 NextCycle
  IntCmp $R8 1 +1
  IntOp $R9 $R9 + 1 ; increase a successful entries counter

; For valid versions of JAWS fill up a value list in .ini configuration file
  !InsertMacro MUI_INSTALLOPTIONS_READ $R5 "${INSTINIFILE}" "Field 2" "ListItems"
  StrCmp $R5 "" +3
    !InsertMacro MUI_INSTALLOPTIONS_WRITE "${INSTINIFILE}" "Field 2" "ListItems" "$R5|JAWS $R1 installed in $R2"
  GoTo NextCycle
  !InsertMacro MUI_INSTALLOPTIONS_WRITE "${INSTINIFILE}" "Field 2" "ListItems" "JAWS $R1 installed in $R2"
NextCycle:
  IntOp $R0 $R0 + 1
  GoTo loop1

DisplayJAWSList:
; If no valid JAWS registry keys found, check if it was registered in the list of applications
  IntCmp $R9 0 CheckJAWSApp
  IntCmp $R9 1 0 0 Continue
; otherwise, there is no need to display "select versions" dialog box because there is only one version installed.
  IntCmp $R9 1 +1
  StrCpy $1 $R2
  StrCpy $INSTDIR "$1\${SETTINGSDIR}"
  GoTo JAWS_OK

; Display the list of JAWS installations
Continue:
  !insertmacro MUI_INSTALLOPTIONS_READ $R5 "${INSTINIFILE}" "Field 2" "ListItems"
  !InsertMacro MUI_INSTALLOPTIONS_DISPLAY_RETURN "${INSTINIFILE}"
    Pop $R8 ; Pop the return value from the stack
  StrCmp $R8 "cancel" CancelInstall +1
  !InsertMacro MUI_INSTALLOPTIONS_READ $R5 "${INSTINIFILE}" "Field 2" "State"
  !InsertMacro MUI_INSTALLOPTIONS_WRITE "${INSTINIFILE}" "Field 2" "ListItems" "" ; clean up the ListItems value

; Extract the path from the selected value returned by "state"
; Afterwards, set $INSTDIR to the extracted path(s)
EnumerateDirs:
  Push $R5
  Push " in "
  Call strstr
  Pop $R5
  StrCmp $R5 "" ExitEnumerateDirs
  StrLen $R4 $R5
; Strip the " in " from the beginning of the $R5 string and reset its length var
  StrCpy $R5 $R5 $R4 4	; Lenth of the " in " string +1
  StrLen $R4 $R5
  Push $R5
  Push "|"
  Call StrStr
  Pop $R7
  StrLen $R3 $R7
  IntOp $R4 $R4 - $R3
  StrCpy $R6 $R5 $R4
  StrCpy $R5 $R7
  StrCpy $1 "$1|$R6"
  Goto EnumerateDirs
ExitEnumerateDirs:
  ;StrCpy $1 $R5
  ;StrCpy $INSTDIR "$1\${SETTINGSDIR}"
; ChopLeft the beginning | from $1
  StrLen $R4 $1
  StrCpy $1 $1 $R4 1
  GoTo JAWS_OK

; Check for existence of ${JAWSApp} among registered applications
CheckJAWSApp:
  IntOp $R0 $R0 * 0
  loop2:
; Enumerate all registered applications and see if ${JAWSApp} is there
  EnumRegKey $R3 HKLM "Software\Microsoft\Windows\CurrentVersion\App Paths" $R0
  StrCmp $R3 "" Failed
  StrCmp $R3 "${JAWSApp}" +3
    IntOp $R0 $R0 + 1
  GoTo loop2
  ReadRegStr $R4 HKLM "Software\Microsoft\Windows\CurrentVersion\App Paths\$R3" "Path"
  StrCmp $R4 "" Failed

  Push $R4  ; Pass the parameter directory name to the CheckJAWSSettings function
  Call VerifyJAWSSettings ; Otherwise, check if ${JAWSApp} is there and the settings are OK
  Pop $R8
  IntCmp $R8 0 Failed
  IntCmp $R8 1 +1

   StrCpy $1 $R4
  StrCpy $INSTDIR "$1\${SETTINGSDIR}"
  GoTo JAWS_OK

Failed:
  MessageBox MB_OK "Your installation of JAWS seems to be corrupted.$\n\
  Please reinstall JAWS and run this installation again. The installer will now quit.$\n"
  Quit

CancelInstall:
  MessageBox MB_OK "You have chosen to cancel this installation. The installer will now quit.$\n"
  Quit

JAWS_OK:
Call GetJAWSEXEVersion
FunctionEnd

Function VerifyJAWSSettings
; Check the validity of the JAWS directory, its settings and the script compiler
  Pop $R6  ; Gotta pick the directory name from the stack
  IfFileExists "$R6\*.*" +1 Failed ; Check if the registry key points to valid JAWS directory
  IfFileExists "$R6\${JAWSApp}" +1 Failed
  IfFileExists "$R6\${ScriptCompiler}" OK Failed
;  IfFileExists "$R6\${SETTINGSDIR}\default.jsb" OK Failed

Failed:
  Push 0 ; Set the error flag
  Return

OK:
  Push 1 ; Return the success flag
  Return
FunctionEnd 

Function StrStr ; searches for a given string
Exch $R1 ; st=haystack,old$R1, $R1=needle
Exch    ; st=old$R1,haystack
Exch $R2 ; st=old$R1,old$R2, $R2=haystack
Push $R3
Push $R4
Push $R5
StrLen $R3 $R1
StrCpy $R4 0
; $R1=needle
; $R2=haystack
; $R3=len(needle)
; $R4=cnt
; $R5=tmp
loop:
StrCpy $R5 $R2 $R3 $R4
StrCmp $R5 $R1 done
StrCmp $R5 "" done
IntOp $R4 $R4 + 1
Goto loop
done:
StrCpy $R1 $R2 "" $R4
Pop $R5
Pop $R4
Pop $R3
Pop $R2
Exch $R1
FunctionEnd

Function SplitFirstStrPart
  Exch $R0
  Push $R1
  Push $R2
  StrLen $R1 $R0
  IntOp $R1 $R1 + 1

loop:
  IntOp $R1 $R1 - 1
  StrCpy $R2 $R0 1 -$R1
  StrCmp $R1 0 exit0
  StrCmp $R2 "|" exit1 loop ; Change " " to "\" if str=dirpath

exit0:
  StrCpy $R1 ""
  Goto exit2

exit1:
  IntOp $R1 $R1 - 1
  StrCpy $R2 $R0 "" -$R1
  IntOp $R1 $R1 + 1
  StrCpy $R0 $R0 -$R1
  StrCpy $R1 $R2

exit2:
  Pop $R2
  Exch $R1 ;rest
  Exch
  Exch $R0 ;first
FunctionEnd

Function InstLastWarningMessage
   MessageBox MB_OK "Important:$\n\
  Please remember to restart JAWS after this installation completes. This step is vital in order to ensure the proper functionality of BX.$\n"
FunctionEnd

Function GetJAWSEXEVersion
  Pop $8
  GetDllVersion "$8\${JAWSAPP}" $R0 $R1
  IntOp $R2 $R0 / 0x00010000
  IntOp $R3 $R0 & 0x0000FFFF
  IntOp $R4 $R1 / 0x00010000
  IntOp $R5 $R1 & 0x0000FFFF
  StrCpy $0 "$R2.$R3.$R4.$R5"
  StrCpy $JAWSBuild $R2.$R3
  IntOp $JAWSVersion 1 * $R2
FunctionEnd



; Uninstaller functions and sections
  var InstalledPathsList
  var PathsList



Function un.OnInit
  !InsertMacro MUI_INSTALLOPTIONS_EXTRACT "${UNINSTINIFILE}"
FunctionEnd

Function un.GetJAWSEXEVersion
  Pop $8
  GetDllVersion "$8\${JAWSAPP}" $R0 $R1
  IntOp $R2 $R0 / 0x00010000
  IntOp $R3 $R0 & 0x0000FFFF
  IntOp $R4 $R1 / 0x00010000
  IntOp $R5 $R1 & 0x0000FFFF
  StrCpy $0 "$R2.$R3.$R4.$R5"
  StrCpy $JAWSBuild $R2.$R3
  IntOp $JAWSVersion 1 * $R2
FunctionEnd

; uninstall section.
Section "Uninstall"
  StrCpy $0 $PathsList
  StrCmp $0 "" CancelUninstall

UninstallLoop:
  Push $0
  Call un.SplitFirstStrPart
  Pop $1
  Pop $2
  StrCmp $1 "" CancelUninstall

  Push "$1"
  call un.GetJAWSEXEVersion
  IntCmp $JAWSVersion 6 +1 +2
  StrCpy $1 "$APPDATA\Freedom Scientific\JAWS\$JAWSBuild"
  StrCpy $INSTDIR "$1\${SETTINGSDIR}"
  ;MessageBox MB_OK "$JAWSVersion $JAWSBuild"
  IfFileExists "$INSTDIR\bx*.*" +1 LoopEnd
  IfFileExists "$INSTDIR\default_fs.*" +1 LoopEnd
; Remove scripts
  Delete "$INSTDIR\default.jsb"
  Delete "$INSTDIR\default.jss"
  Delete "$INSTDIR\default.jsd"
  Delete "$INSTDIR\bx.kmp"
  Delete "$INSTDIR\bx_user.kmp"
  Delete "$INSTDIR\bx_cache.ini"
  Delete "$INSTDIR\bx.jcf"
  Delete "$INSTDIR\bx.jsb"
  Delete "$INSTDIR\bx.jsd"
  Delete "$INSTDIR\tlbinf32.chm"
  Delete "$INSTDIR\tlbinf32.dll"
; Restore backups
  Rename "$INSTDIR\default_fs.jsb" "$INSTDIR\default.jsb"
  Rename "$INSTDIR\default_fs.jss" "$INSTDIR\default.jss"
  Rename "$INSTDIR\default_fs.jsd" "$INSTDIR\default.jsd"

LoopEnd:
  StrCmp $2 "" FinishUninstall
  StrCpy $0 $2
  Goto UninstallLoop

FinishUninstall:
; If we have BX versions remaining, do not remove any of the following, just update a registry key
  StrCmp $InstalledPathsList "" +1 JustUpdateRegistry
; Reset BX $INSTDIR
  StrCpy $INSTDIR "$PROGRAMFILES\${RELEASE}"
  ; MUST REMOVE UNINSTALLER too, and its folder
  Delete "$INSTDIR\${UnInstaller}"
  Delete "$INSTDIR\*.*"
  RmDir "$INSTDIR"

  ; remove shortcuts, if any.
  Delete "$SMPROGRAMS\${RELEASE}\*.*"
  RmDir "$SMPROGRAMS\${RELEASE}"

  ; remove registry keys
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${RELEASE}"
  DeleteRegKey HKLM "SOFTWARE\${RELEASE}"
  GoTo done

JustUpdateRegistry:
  WriteRegStr HKLM "Software\${RELEASE}" "InstalledForJFWVersions" "$InstalledPathsList"
  Goto done

CancelUninstall:
  MessageBox MB_OK "Could not find valid instalation of BX. Aborting uninstall."
  Quit

done:
SectionEnd

Function un.DisplayUninstallOptions
  ReadRegStr $R5 HKLM "Software\${RELEASE}" "InstalledForJFWVersions"
  StrCmp $R5 "" CancelUninstall
  StrCpy $InstalledPathsList $R5

loop:
  push $R5
  call un.SplitFirstStrPart
  pop $R6
  pop $R7
  StrCmp $R6 "" exit

  IfFileExists "$R6\${JAWSAPP}" +2 +1
  StrCmp $R7 "" exit
  push "$R6\${JAWSAPP}"
  call un.GetJAWSEXEVersion
  pop $R8
; For valid versions of JAWS fill up a value list in .ini configuration file
  !InsertMacro MUI_INSTALLOPTIONS_READ $R4 "${UNINSTINIFILE}" "Field 2" "ListItems"
  StrCmp $R4 "" +3
    !InsertMacro MUI_INSTALLOPTIONS_WRITE "${UNINSTINIFILE}" "Field 2" "ListItems" "$R4|JAWS $R8 installed in $R6"
  GoTo NextCycle
  !InsertMacro MUI_INSTALLOPTIONS_WRITE "${UNINSTINIFILE}" "Field 2" "ListItems" "JAWS $R8 installed in $R6"

NextCycle:
  StrCpy $R5 $R7
  StrCpy $R9 "$R9|$R6"
  Goto loop

exit:
  !insertmacro MUI_INSTALLOPTIONS_READ $R4 "${UNINSTINIFILE}" "Field 2" "ListItems"
  !InsertMacro MUI_INSTALLOPTIONS_DISPLAY_RETURN "${UNINSTINIFILE}"
  Pop $R8 ; Pop the return value from the stack
  StrCmp $R8 "cancel" CancelUninstall +1
  !InsertMacro MUI_INSTALLOPTIONS_READ $R5 "${UNINSTINIFILE}" "Field 2" "State"
  !InsertMacro MUI_INSTALLOPTIONS_WRITE "${UNINSTINIFILE}" "Field 2" "ListItems" "" ; clean up the ListItems value

; Initialize $R1 for storing paths list
  StrCpy $R1 ""
; Extract the path from the selected value returned by "state"
EnumerateDirs:
  Push $R5
  Push " in "
  Call un.strstr
  Pop $R5
  StrCmp $R5 "" ExitEnumerateDirs
  StrLen $R4 $R5
; Strip the " in " from the beginning of the $R5 string and reset its length var
  StrCpy $R5 $R5 $R4 4	; Lenth of the " in " string
  StrLen $R4 $R5
  Push $R5
  Push "|"
  Call un.StrStr
  Pop $R7
  StrCmp $R7 "" AddPath
  StrLen $R3 $R7
  IntOp $R4 $R4 - $R3
  StrCpy $R5 $R5 $R4
AddPath:
  StrCpy $R1 "$R1|$R5"
  StrCpy $R5 $R7
  Goto EnumerateDirs
ExitEnumerateDirs:
; Strip the leading "|" from the list of paths
  StrLen $R4 $R1
  StrCpy $R1 $R1 $R4 1
  GoTo done

CancelUninstall:
  MessageBox MB_OK "You have chosen to cancel this uninstall wizard. The uninstaller will now quit.$\n"
  quit

done:
  StrCpy $PathsList $R1
  call un.HandleInstallationPaths
FunctionEnd

Function un.HandleInstallationPaths
  StrCpy $R1 $PathsList
  StrCpy $R0 $InstalledPathsList
  ;MessageBox MB_OK "R1 is $R1 and R0 is $R0"

; Initialize $R9
  StrCpy $R9 ""

loop:
  Push $R1
  call un.SplitFirstStrPart
  Pop $R2
  ;MessageBox MB_OK "R2 is $R2"
  StrCmp $R2 "" exit
  Pop $R3

loop1:
  Push $R0
  call un.SplitFirstStrPart
  Pop $R4
  Pop $R5

  StrCmp $R4 $R2 ContinueLoop +1
  StrCpy $R9 "$R9|$R4"
  StrCpy $R0 $R5
  Goto loop1

ContinueLoop: 
  StrCmp $R5 "" exit
  StrCpy $R1 $R3
  StrCpy $R0 $R5
  Goto loop  

exit:
; Strip the leading "|" and store remaining paths, if any, into $PathsList
  StrLen $R8 $R9
  StrCpy $InstalledPathsList $R9 $R8 1
  FunctionEnd

Function Un.LastWarningMessage
   MessageBox MB_OK "Important:$\n\
  Please remember to restart JAWS after this uninstallation wizard completes.$\n\
  This step is vital in order to ensure that BX was properly removed from your system."
FunctionEnd

Function un.SplitFirstStrPart
  Exch $R0
  Push $R1
  Push $R2
  StrLen $R1 $R0
  IntOp $R1 $R1 + 1

loop:
  IntOp $R1 $R1 - 1
  StrCpy $R2 $R0 1 -$R1
  StrCmp $R1 0 exit0
  StrCmp $R2 "|" exit1 loop ; Change " " to "\" if str=dirpath

exit0:
  StrCpy $R1 ""
  Goto exit2

exit1:
  IntOp $R1 $R1 - 1
  StrCpy $R2 $R0 "" -$R1
  IntOp $R1 $R1 + 1
  StrCpy $R0 $R0 -$R1
  StrCpy $R1 $R2

exit2:
  Pop $R2
  Exch $R1 ;rest
  Exch
  Exch $R0 ;first
FunctionEnd


Function un.StrStr ; searches for a given string
Exch $R1 ; st=haystack,old$R1, $R1=needle
Exch    ; st=old$R1,haystack
Exch $R2 ; st=old$R1,old$R2, $R2=haystack
Push $R3
Push $R4
Push $R5
StrLen $R3 $R1
StrCpy $R4 0
; $R1=needle
; $R2=haystack
; $R3=len(needle)
; $R4=cnt
; $R5=tmp
loop:
StrCpy $R5 $R2 $R3 $R4
StrCmp $R5 $R1 done
StrCmp $R5 "" done
IntOp $R4 $R4 + 1
Goto loop
done:
StrCpy $R1 $R2 "" $R4
Pop $R5
Pop $R4
Pop $R3
Pop $R2
Exch $R1
FunctionEnd
