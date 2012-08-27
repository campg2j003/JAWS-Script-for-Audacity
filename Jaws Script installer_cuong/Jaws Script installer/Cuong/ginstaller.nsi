/*
Audacity Jaws script installer
Written by Dang Manh Cuong <dangmanhcuong@gmail.com>
This installer required NSIS Script from http://nsis.sourceforge.net

 ;This installer has the folowing features and limitations
Features:
. Install for all English version of Jaws. This feature will exists until Freedom Scientific changes the place to put scripts.
. Get the correct install path  of Jaws from the registry, so the install will have the best rezult.
. Check the existence of Jaws before starting setup. If no Jaws installed, display a warning message.
. If only one version of Jaws installed, does not display the select Jaws version page.
. create macros for extracting, compiling, deleting, modifying script, so user can create a multi scripts package quick and easily.
. Create bat file for compiling multiple scripts at a time using SCompile.exe.
. Macro to copy script from all user to current user for modifying in some cases.
Limitations:
. User cannot select more than one version to install.
. This installer created for English version only.
Date created: Wednesday, July 11, 2012
Last updated: Sunday, August 26, 2012

Modifications:

8/26/2012 Commented out $INSTDIR removed message in section un.uninstaller.
8/19/12 Added function DirPageLeave to check for existence of $INSTDIR.
8/18/12 Removed Cuong's DisplayJawsList and CheckJaws.  Renamed JawsPage and JawsPageLeave to DisplayJawsList and DisplayJawsListLeave.
Moved message that $INsTDIR was not removed to un.OnInstSuccess from section un.uninstaller.
8/18/12 Previous saved to HG rev 8.
8/18/12 Remembers JAWS selected versions if you come back to the versions page.
Installation summary page now shows the $INSTDIR for full installations and installer source folder if selected.
Issues: The output of makensis shows warnings generated for code in function __JAWSInstallScriptItemsDefault when ${ScriptItemsBegin} is used.
The uninstaller has shown a message saying that $INSTDIR can't be removed when it is actually removed.
Even if the warning about not being able to remove $INSTDIR is displayed and $UNINSTDIR is in fact not removed, the finish message says the uninstall is successful.
8/17/12 This compiles and runs, but does not check list view items.  Values placed in the LVItem structure are correct and SendMessage ${LVM_SETITEMSTATE} returns 1 indicating success, but ${GETITEMSTATE} immediately following returns state unchecked.  Have tried it before setfocus, before show.
8/16/12 Added function MarkSelectedVersions to check the list view items of selected versions.  Wrote LVCheckItem.
Changed code in JawsPage to set $SELECTEDJAWSVERSIONs when only one JAWS version is found.
8/15/12 Added open/close uninstlog in -uninstaller section.
8/15/12 Changed macro __FileDatedNF to test for dest file existence before logging it.
Full install works, log is generated correctly, uninstall works, but it doesn't delete uninst.exe and $INSTDIR.
Changed to use the ${WriteUninstaller} uninstlog macro.
8/15/12 Changed JAWSScriptItemsBegin to use a function.
8/14/12 Changed uninstall section to delete using uninstlog and not use rmdir /r to remove $INSTDIR.
Made ${JAWSScriptItemsBegin/End and default version
Made most of code in install JAWS scripts section into a macro.  Moved version uninstall macros ahead of install scripts section.
8/14/12 If Install Source is not selected install type is 2 when Custom is selected.
8/13/12 Added function ComponentsPageLeave to select SecUninstaller if type JUSTSCRIPTS is not selected, this covers type Custom.
ADDED CODE TO SET THE PAGE TITLE ON THE CONFIRMATION PAGE.
8/13/12 Added ${NSD_CreateTextMultiline}.
Added function GetSecIDs and variables to store section indexes needed for InstConfirmPre, called from .OnInit.  The issue is that the defines for section indexes aren't defined until after the sections are defined, yet they are needed in the dir and confirmInst page pre functions.  All of the functions could be moved after the sections, but that would make it harder to package the pages, sections, and functions into a header file.
8/12/12 Added DirPagePre to skip directory page if not full install.
Added Confirm Install page.
Added insttype /NOCUSTOM.
Made JAWS section silent.
8/9/12 Added start of section Installer Source.
Added section Install JAWS scripts.
Added Welcome and Components pages.
Converted for MUI2.
Issue: need a way for the user to choose between installing scripts in All Users or current user.  One may wish to make that choice even if the installer can write All Users and the installer is set to install to All Users-- i.e. into Program Files.
Issue: need a way to choose to install scripts into the program files folder, e.g. to view them if there is no JAWS.
8/8/12 Changed GetJawsScriptDir and GetJawsProgDir to return on TOS instead of $2.
8/7/12 Previous saved to HG rev 7.
8/7/12 Now sends LVM_SetListViewExtendedStyle message after creating list box, works.
Commented out code to insert a column.
Fixed problems in LVIsItemChecked.
This shows checkboxes on items and correctly gets selected versions.
In report view list view items are read by JAWS but do not appear on screen.  Set LVS_DEFAULT_STYLE to 0 and __NSD_ListView_EXSTYLE adds LVS_LIST.  This makes them visible.  It seems like LVS_REPORT was causing the problem.  Increased height of list view.
Tested JAWSMIN/MAXVERSION which work.
8/6/12 Added ${DisplayLVItem}, ${LVGetExStyle}, and ${NSD_GetStyle.  Added debugging code to show this information for the list view at start of JawsPageLeave.
Added LVSetFont.
8/5/12 Now loads list view-- JAWS sees items but they don't appear on screen and checked/unchecked status is not indicated.  JAWSPageLeave now processes versions.  There is debugging in LVIsItemChecked and JawsPageLeave.  Inserting a column doesn't work, we insert a header but with no subitem count.
Made the list view bigger.
8/4/12 Now inserts column in list view, changed LvIsItemChecked to use LVM_GETITEMSTATE.
List view loads 1 item but it is not visible, but JAWS says there is 1 item, this before the change to insert a column.  Don't know why only 1 version is being processed.
In JawsPage now tests for min/max version.
8/1/12 Added functions from ccousins.nsi, modified for multiple JAWS versions, uses nsdialogs.nsh, aborts after JAWS page, does not show initial pages.
7/24/2012 Previous saved to HG rev 6.
7/23/2012 by Gary Campbell <campg2003@gmail.com>:
In DisplayJawsList now only counts registry keys whose names start with a digit.  This rejects keys like "Common" and "Registration".  Added !include strfunc.nsh.
Added comments.
*/

;Begin of code
;!define JAWSDEBUG ; debug
;User defined constants
;Name of script (displayed on screens, install folder, etc.) here
!Define ScriptName "Jaws Script for Audacity"
!define ScriptApp "audacity" ; the base name of the app the scripts are for
!define JAWSMINVERSION "" ; min version of JAWS for which this script can be installed
!define JAWSMAXVERSION "" ; max version of JAWS for which this script can be installed

!Define InstallFile $instdir\Install.ini ; file that stores information for the uninstaller
!Define tempFile $temp\Install.ini
!Define UnInstaller "Uninst.exe"
!Define JawsDir "$appdata\Freedom Scientific\Jaws" ;the folder where app data for Jaws 6.0 and above is located
!Define Scriptdir "Settings\Enu" ;folder in $JawsDir to put the script
!Define JawsApp "JFW.EXE" ;Use to check if Jaws installed
!Define Compiler "Scompile.exe" ;Use to recompile script after installation

; Name of folder relative to $INSTDIR in which to install the installer source files.
!define JAWSINSTALLERSRC "Installer Source"

ShowInstDetails Show ; debug
AutoCloseWindow False ; debug
SetCompressor /solid lzma ;create the smallest file
SetOverwrite on ;always overwrite files
!define SetOverwriteDefault "on"
;Name shown to user, also name of installer file
Name "${ScriptName}"
;The executable file to write
OutFile "${ScriptName}.exe"
;installation directory
InstallDir "$programfiles\${scriptName}" 
BrandingText "${ScriptName} (packaged by Dang Manh Cuong)"
!include "JFW.nsh" ;Header file to store all macros

!include "uninstlog.nsh"
!include "strfunc.nsh" ; used in DisplayJawsList to check for a digit, and other things
; Declare used functions from strfunc.nsh.
${StrLoc}

!include "nsDialogs.nsh"
;Modern UI configurations
;!Include "MUI.nsh"
!Include "MUI2.nsh"
  !define MUI_ABORTWARNING
  !define MUI_UNABORTWARNING
!define MUI_FINISHPAGE_SHOWREADME "$instdir\audacity_readme.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "View readme file"
  !define MUI_FINISHPAGE_TEXT_LARGE
  !define MUI_FINISHPAGE_LINK "Go to author's project"
  !define MUI_FINISHPAGE_LINK_LOCATION "http://code.google.com/p/dangmanhcuong"


;-----
; The following goes in the .nsh file.
; Macros to bracket instructions used to install the scripts in a JAWS version.
; Usage:
;${JAWSScriptItemsBegin}
;Instructions to install script files into a JAWS version.  $OUTDIR will be set to the directory where the scripts should be installed.
;${JAWSScriptItemsEnd}
;If not defined, a default is used.

!macro __JAWSScriptItemsBegin
function __JAWSInstallScriptItems
!macroend

!macro __JAWSScriptItemsEnd
functionend
!define __JAWSInstallScriptItemsDefined
!macroend

!macro __JAWSInstallScriptItems
!ifdef __JAWSInstallScriptItemsDefined
call __JAWSInstallScriptItems
!else
call __JAWSInstallScriptItemsDefault
!EndIf
!macroend

!define JAWSScriptItemsBegin "!insertmacro __JAWSScriptItemsBegin"
!define JAWSScriptItemsEnd "!insertmacro __JAWSScriptItemsEnd"

!macro __FileDatedNF path item
!define __FileDatedNFUID ${__LINE__}
File /nonfatal "${path}${item}"
IfFileExists "$OUTDIR\${item}" 0 end${__FileDatedNFUID}
${AddItemDated} "$OUTDIR\${item}"
end${__FileDatedNFUID}:
!undef __FileDatedNFUID
!macroend
!define FileDatedNF "!insertmacro __FileDatedNF"

; If not defined, we use this default function.  It copies the jss file, then tries to copy every other kind of script file if it exists.
function __JAWSInstallScriptItemsDefault
${FileDated} "script\" "${ScriptApp}.jss"
${FileDatedNF} "script\" "${ScriptApp}.jbs"
${FileDatedNF} "script\" "${ScriptApp}.jcf"
${FileDatedNF} "script\" "${ScriptApp}.jdf"
${FileDatedNF} "script\" "${ScriptApp}.jgf"
${FileDatedNF} "script\" "${ScriptApp}.jkm"
${FileDatedNF} "script\" "${ScriptApp}.jsd"
${FileDatedNF} "script\" "${ScriptApp}.jsh"
${FileDatedNF} "script\" "${ScriptApp}.jsm"
functionend ; __JAWSInstallScriqtItemsDefault


;/*
; The following would appear in the user's file after including the header.
${JAWSScriptItemsBegin}
${FileDated} "script\" "audacity.jss"
${FileDated} "script\" "audacity.jsd"
${FileDated} "script\" "audacity.jkm"
${FileDated} "script\" "audacity.jsm"
${JAWSScriptItemsEnd}
;*/

;-----
; These are section indexes of sections whose state we need to know to write the installation summary.
var JAWSSecInstSrc
var JAWSSecUninstaller

;-----
Var INSTALLEDJAWSVERSIONS ;separated by |
var INSTALLEDJAWSVERSIONCOUNT
var SELECTEDJAWSVERSIONS
var SELECTEDJAWSVERSIONCOUNT

;-----

; Multiline edit box
!define __NSD_TextMultiline_CLASS EDIT
!define __NSD_TextMultiline_STYLE ${DEFAULT_STYLES}|${WS_TABSTOP}|${ES_MULTILINE}
!define __NSD_TextMultiline_EXSTYLE ${WS_EX_WINDOWEDGE}|${WS_EX_CLIENTEDGE}
!insertmacro __NSD_DefineControl TextMultiline


;-----
;Pages
!define MUI_WELCOMEPAGE_TITLE "setup for ${ScriptName}, ${VERSION}"
!define MUI_WELCOMEPAGE_TEXT "Welcome to the installation for ${ScriptName}.$\n\
This wizard will guide you through the installation of ${ScriptName}.$\n"
; ${LegalCopyright}$\n\ EOL
!Insertmacro Mui_Page_Welcome
;The order of the insstype commands is important.
insttype "Full"
insttype "JustScripts"
;insttype /NOCUSTOM
insttype /COMPONENTSONLYONCUSTOM
!define INST_FULL 1
!define INST_JUSTSCRIPTS 2
!define INST_CUSTOM 33

; Displays 1 lines of aab 98 chars.
!define MUI_COMPONENTSPAGE_TEXT_TOP "Full allows you to uninstall using Add/Remove Programs.  $\n\
Just Scripts installs scripts and README, can't be uninstalled from Add/Remove Programs."
;!define MUI_COMPONENTSPAGE_TEXT_COMPLIST text
;!define MUI_COMPONENTSPAGE_TEXT_INSTTYPE text
;!define MUI_COMPONENTSPAGE_TEXT_DESCRIPTION_TITLE text
;!define MUI_COMPONENTSPAGE_TEXT_DESCRIPTION_INFO text ;Text to display inside the description box when no section is selected.
!define MUI_PAGE_CUSTOMFUNCTION_LEAVE ComponentsPageLeave
!insertmacro mui_page_Components

function ComponentsPageLeave
getcurinsttype $0
intop $0 $0 + 1
;messagebox MB_OK "ComponentsPageLeave: insttype = $0, justscripts = ${INST_JUSTSCRIPTS}" ; debug
;sectiongetflags $JAWSSecInstSrc $1 ; debug
;messagebox MB_OK "ComponentsPageLeave: SecInstSrc flags = $1" ; debug
intcmp $0 ${INST_JUSTSCRIPTS} end +1 +1
;sectiongetflags $JAWSSecUninstaller $1 ; debug
;messagebox MB_OK "ComponentsPageLeave: before selecting insttype = $0, section flags = $1" ; debug

!insertmacro SelectSection $JAWSSecUninstaller
;sectiongetflags $JAWSSecUninstaller $1 ; debug
;messagebox MB_OK "ComponentsPageLeave: after selecting section flags = $1" ; debug
end:
functionend

;Page custom DisplayJawsList checkJaws ;Select Jaws version page
page custom DisplayJawsList DisplayJawsListLeave ;Select Jaws version page

PageEx Directory
PageCallbacks DirPagePre "" DirPageLeave
DirText "Choose the folder in which to store ${ScriptName}'s installation files, such as uninstaller, help or other files. $\n\
Setup will store ${ScriptName}'s installation in the following folder. To install in a different folder, click Browse and select another folder."
PageExEnd

function DirPagePre
${Unless} ${SectionIsSelected} $JAWSSecUninstaller
Abort ; skip page if it is not full installation.
${EndUnless}
functionend

function DirPageLeave
IfFileExists $INSTDIR +1 next
${GetFileAttributes} $INSTDIR DIRECTORY $0
intcmp $0 1 +1 +3
MessageBox MB_YESNO "The specified folder exists, which most likely means that ${ScriptName} is already installed.  If you want to install over the current installation choose Yes." IDYES next
abort
MessageBox MB_OK "$INSTDIR exists and it is not a folder!"
abort
next:
FunctionEnd

page custom PageInstConfirmPre

!ifndef StrRepIncluded
${StrRep}
!EndIf

function PageInstConfirmPre
!insertmacro MUI_HEADER_TEXT "Confirm Installation Settings" ""
;!define MUI_PAGE_HEADER_SUBTEXT " "
${StrRep} $1 "$SELECTEDJAWSVERSIONS" "|" ", "
strcpy $0 "The scripts will be installed in the following JAWS versions: $1.$\r$\n"
;getcurinsttype $2 ; debug
;messagebox MB_OK "JAWSPageConfirmPRE: inst type $2" ; debug
${If} ${SectionIsSelected} $JAWSSecUninstaller
strcpy $0 "$0Installation folder: $INSTDIR.$\r$\nThis installation should be uninstalled via Add/Remove Programs.$\r$\n"
${If} ${SectionIsSelected} $JAWSSecInstSrc ; SecInstSrc
strcpy $0 "$0The installer source will be installed in $INSTDIR\${JAWSINSTALLERSRC}."
${EndIf} ; installer source
${Else}
strcpy $0 "$0This instaallation cannot be uninstalled viaa Add/Remove Programs."
${EndIf}
nsDialogs::create 1018
pop $2

${NSD_CreateTextMultiline} 0u 0u 100% 100% "$0"
pop $3
${NSD_AddStyle} $3 ${ES_READONLY}

${NSD_SetFocus} $3
nsDialogs::show
functionend

!insertmacro mui_page_instfiles

!insertmacro mui_page_Finish

;Uninstall pages
;  !insertmacro MUI_UNPAGE_COMPONENTS
  !insertmacro MUI_UNPAGE_INSTFILES
  !insertmacro MUI_LANGUAGE "English"

Function .OnInit
call GetSecIDs ; Initializes variables with some section indexes.
strCpy $0 0
EnumRegkey $1 hklm "software\Freedom Scientific\Jaws" $0
${If} $1 == ""
MessageBox MB_ICONINFORMATION|MB_OK "Setup cannot start because the Jaws program is not installed on your system."
quit
${Else}
; Not needed with MUI2?
;!insertmacro mui_Installoptions_extract Install.ini
${EndIf}
FunctionEnd

Function .OnInstSuccess
; Hopefully no longer needed.
;!Insertmacro RemoveTempFile
FunctionEnd


!ifndef StrTokINCLUDED
${StrTok}
!endif


!macro tstenumjawsversions var root key index
; Resembles enumregkey to test GetJAWSVersions.
strcpy ${var} ""
; compare with number of items in strtok.
intcmp ${index} 6 tstenumskip 0 tstenumskip
${strtok} ${var} "5.0|6.0|9.0|10.0|11.0|12.0" "|" ${index} 0
;intcmp ${index} 3 tstenumskip 0 tstenumskip
;${strtok} ${var} "9.0|10.2|11.0" "|" ${index} 0
tstenumskip:
!macroend

function GetJAWSVersions
; Makes a list of installed JAWS versions.  If $JAWSMINVERSION or $JAWSMAXVERSION are defined, versions outside of their limits are excluded.
; return: TOS - string containing list of JAWS versions separated by |, TOS-1 - number of JAWS versions found.
push $0
push $1
push $R0
push $2
push $3
push $4
;${chkst} 0 ; debug
strCpy $R0 0 ; registry entry index
strcpy $1 0 ; number of JAWS versions found
strcpy $0 "" ; JAWS versions found
loop:
;EnumRegkey $2 hklm "software\Freedom Scientific\Jaws" $R0 ;Enumerate the existing version of Jaws
!insertmacro tstEnumJawsversions $2 hklm "software\Freedom Scientific\Jaws" $R0 ;test Enumerate the existing versions of Jaws
;messagebox MB_OK "GetJawsVersions: got version $2 at index $R0" ; debug
;${chkst} 1
strcmp $2 "" done ; exit loop if after last JAWS version
IntOp $R0 $R0 + 1 ;increase the registry key index by one unit
; Is this registry key a version number?  I have seen "Common" Victor checks for "Registration", and I don't know of any version that doesn't start with a digit.
; We search for the first character of the entry in a string of digits.  If we find it, we know it staarts with a digit.  If not, we can skip this entry.
strcpy $3 $2 1 ; copy first character
${StrLoc} $4 "0123456789" $3 ">"
strcmp $4 "" loop ; if "", the character was not found
; character is in "0" through "9"
; Starts with a digit, is a version.

;Is it within min and max version limits?
${If} "${JAWSMINVERSION}" == ""
${OrIf} $2 >= "${JAWSMINVERSION}"
;messagebox MB_OK "passed minversion" ; debug
${If} "${JAWSMAXVERSION}" == ""
${OrIf} $2 <= "${JAWSMAXVERSION}"
;messagebox MB_OK "passed minversion" ; debug
intop $1 $1 + 1 ; increment versions count
;Add this version to the Jaws versions we have already found if any
strcpy $0 "$0$2|"
${EndIf} ; meets max version conditions
${EndIf} ; meets min version condition
;${chkst} 3
goto loop ;continue checking

done: ; done with loop
;${chkst} 4
strcmp $0 "" +2 ; Did we find any JAWS versions?
strcpy $0 $0 -1 ;yes, remove trailing |
detailprint "GetJAWSVersions: got $1 versions: $0" ; debug
;messagebox MB_OK "GetJAWSVersions: got $1 versions: $0" ; debug
;${chkst} 8 ; debug
pop $4
pop $3
pop $2
;messagebox MB_OK "After popping $$2 $$4 = $4, $$3 = $3, $$2 = $2" ; debug
pop $R0
; Put the return values on the stack and restore their registers.
exch $1
exch
exch $0
; stack: versions, version count
functionend

; Probably won't do anything.
Section -Install
;Exstract script to enu folder
;this will have to change to use install file logging.
;!Insertmacro ExtractScript "script\*.*"
;Recompile scripts
;Needs to change to support multiple versions.
;!insertmacro RecompileSingle ${ScriptApp}
SectionEnd

Section -Uninstaller SecUninstaller
sectionIn ${INST_FULL}
!insertmacro UNINSTLOG_OPENINSTALL
; Set up for uninstallation.  Also copies .txt files to $InstDir, but that will probably change.
;CopyFiles /silent ${TempFile} ${InstallFile} ;copy the install.ini to the instal directory
SetOutPath $Instdir
;File *.txt
;Write the uninstaller and add it to the registry
${WriteUninstaller} "$Instdir\${UnInstaller}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${ScriptName}" "DisplayName" "${ScriptName} (remove only)"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${ScriptName}" "UninstallString" '"$INSTDIR\${UnInstaller}"'
!insertmacro UNINSTLOG_CLOSEINSTALL
sectionEnd

;---
; Install JAWS Scripts section
!macro _ForJawsVersions
; Place before the code that installs scripts to a version.
; Follow the code with _ForJawsVersions.  These macros can be used more than once but they cannot be nested.
!ifndef _ForJawsVersionsCounter
!define _ForJawsVersionsCounter 0
!else
!define /math _ForJawsVersionsCounterTemp ${_ForJawsVersionsCounter} + 1
!undef _ForJawsVersionsCounter
!define _ForJawsVersionsCounter ${_ForJawsVersionsCounterTemp}
!undef _ForJawsVersionsCounterTemp
!endif
push $0
push $R0
strcpy $R0 0
_ForJawsVersionsLoop${_ForJawsVersionsCounter}:
${StrTok} $0 "$SELECTEDJAWSVERSIONS" "|" $R0 0
!macroend ; _ForJawsVersions
!define ForJawsVersions "!insertmacro _ForJawsVersions"

!macro _ForJawsversionsEnd
; Place after the code that installs scripts to a version.
intop $R0 $R0 + 1
intcmp $R0 $SELECTEDJAWSVERSIONCOUNT 0 _ForJawsVersionsLoop${_ForJawsVersionsCounter} 0
pop $R0
pop $0
!macroend
!define ForJawsVersionsEnd "!insertmacro _ForJawsVersionsEnd"

; Insert this inside the section that installs the scripts.
; Assumes setOverWrite is set.
; Must be inserted before function JawsInstallVersion.
!macro JAWSInstallScriptsSectionCode
GetCurInstType $0
IntOp $0 $0 + 1 ;make it the same as for SectionIn
IntCmp $0 ${INST_JUSTSCRIPTS} NoLogging
!insertmacro UNINSTLOG_OPENINSTALL
NoLogging:
${ForJawsVersions}
; $0 contains the version string.
call JawsInstallVersion
${ForJawsVersionsEnd}
GetCurInstType $0
IntOp $0 $0 + 1 ;make it the same as for SectionIn
IntCmp $0 ${INST_JUSTSCRIPTS} NoLogging2
!insertmacro UNINSTLOG_CLOSEINSTALL
NoLogging2:
!macroend

; Adapted from ccousins.nsi
Section "-Install JAWS Scripts" SecJAWS
SectionIn ${INST_FULL} ${INST_JUSTSCRIPTS}
SetOverwrite on ;Always overwrite
!insertmacro JAWSInstallScriptsSectionCode
SetOverwrite ${SetOverwriteDefault}
SectionEnd ;Install JAWS scripts

section "Installer Source" SecInstSrc
;SectionIn ${INST_FULL}
!insertmacro UNINSTLOG_OPENINSTALL
${CreateDirectory} "$INSTDIR\${JAWSINSTALLERSRC}"
SetOutPath  "$INSTDIR\Installer Source"
${File} "" "uninstlog.nsh"
SetOutPath $INSTDIR
!insertmacro UNINSTLOG_CLOSEINSTALL
SectionEnd

function GetSecIDs
; Places the section index of the Get Installer Source and the SecUninstaller sections in variables.  This is because SecInstSrc is not defined before the code for PageInstConfirmPre that references them.
strcpy $JAWSSecInstSrc ${SecInstSrc}
strcpy $JAWSSecUninstaller ${SecUninstaller}
;messagebox MB_OK "GetSecIDs:$$JAWSSecUninstaller = $JAWSSecUninstaller, $$JAWSSecInstSrc = $JAWSSecInstSrc" ; debug 
functionend

;-----
;Uninstaller function and Section
Function un.onInit
    MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "Are you sure you want to completely remove $(^Name) and all of its components?" IDYES +2
  Abort
FunctionEnd

Function un.OnUninstSuccess
  ;!Insertmacro RemoveTempFile
  HideWindow
  IfFileExists "$INSTDIR" +1 instdirgone
    MessageBox MB_ICONEXCLAMATION|MB_OK "Warning: the install folder $INSTDIR was not removed.  It probably contains undeleted files."
    return
  instdirgone:
  MessageBox MB_ICONINFORMATION|MB_OK "${ScriptName}  has been successfully removed from your computer."
FunctionEnd

Section Un.RemoveScript
;!insertmacro un.DeleteScript "${ScriptApp}*.*"
;SetShellVarContext all
!insertmacro UNINSTLOG_UNINSTALL
SetOutPath "$INSTDIR"


Delete "${UninstLog}"

SectionEnd

Section un.Uninstaller
DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${ScriptName}"
; Set outpath to somewhere else, ProgramFiles for now, should be maybe parent of $INSTDIR.
SetOutPath "$PROGRAMFILES"
DetailPrint "Attempting to remove $INSTDIR$\r$\n"
;RmDir /r $instdir
; We don't use rmdir /r in case user chose c:\Program Files as install dir.
Rmdir "$INSTDIR" 
;IfFileExists "$INSTDIR" +1 instdirgone
;MessageBox MB_OK "Warning: the install folder $INSTDIR was not removed.  It probably contains undeleted files."
;instdirgone:
SetAutoclose true
SectionEnd

;Global variables

var JAWSDLG ; handle of JAWS page dialog
var JAWSLV ; handle of JAWS versions list view

; I think from Gary's code, probably not used yet-- 8/4/12.
;var JAWSSCRIPTDEST ; fully qualified path to which scripts are installed, does not handle multiple versions.
;var JAWSPROGDIR ; directory containing JAWS executables

;-----
; List view control

;Messages, styles, and structs for handling a list view.
;!define LVM_FIRST           0x1000
!define /math LVM_GETITEMTEXTA ${LVM_FIRST} + 45
!define /math LVM_GETITEMTEXTW ${LVM_FIRST} + 115
!define LVM_GETUNICODEFORMAT 0x2006
!define /math LVM_GETITEMSTATE ${LVM_FIRST} + 44
!define /math LVM_SETITEMSTATE ${LVM_FIRST} + 43
!define /math LVM_GETITEMA ${LVM_FIRST} + 5
!define /math LVM_GETITEMW ${LVM_FIRST} + 75
!define /math LVM_SETITEMA ${LVM_FIRST} + 6
!define /math LVM_INSERTITEMA ${LVM_FIRST} + 7
!define /math LVM_INSERTITEMW ${LVM_FIRST} + 77
!define /math LVM_INSERTCOLUMNA ${LVM_FIRST} + 27
!define /math LVM_INSERTCOLUMNW ${LVM_FIRST} + 97
!define /math LVM_GETEXTENDEDLISTVIEWSTYLE ${LVM_FIRST} + 55
!define /math LVM_SETEXTENDEDLISTVIEWSTYLE ${LVM_FIRST} + 54 ; wparam is mask, lparam is style, returns old style


;!define LVS_DEFAULT 0x0000000D ; Default control style  LVS_SHOWSELALWAYS + LVS_SINGLESEL + LVS_REPORT
; Itt looks like LVS_REPORT causes the items to disappear from the screen (but JAWS can still read them).
!define LVS_DEFAULT 0x0000000 ; Default control style  
!define LVS_LIST 0x0003 ; This style specifies list view
!define LVS_NOCOLUMNHEADER 0x4000 ; Column headers are not displayed in report view
;!define LVS_REPORT 0x0001 ; This style specifies report view
!define LVS_EX_CHECKBOXES 0x00000004 ; Enables check boxes for items

;This is similar to the code that defines a control in nsdialogs.nsh.
!define __NSD_ListView_CLASS SysListView32
;!define __NSD_ListView_STYLE ${DEFAULT_STYLES}|${WS_TABSTOP}|${WS_VSCROLL}|${LVS_DEFAULT}|${LVS_NOCOLUMNHEADER}
!define __NSD_ListView_STYLE ${DEFAULT_STYLES}|${WS_TABSTOP}|${WS_VSCROLL}|${LVS_DEFAULT}|${LVS_LIST} ; debug
!define __NSD_ListView_EXSTYLE ${WS_EX_WINDOWEDGE}|${WS_EX_CLIENTEDGE}|${LVS_EX_CHECKBOXES}
;!define __NSD_ListView_EXSTYLE 0 ; debug
;!define __NSD_ListView_EXSTYLE ${LVS_EX_CHECKBOXES} ; debug
; This is an "internal" macro from nsdialogs.nsh.
!insertmacro __NSD_DefineControl ListView
; values for LVITEM struct mask field
!define LVIF_TEXT 0x00000001
!define LVIF_STATE 0x00000008

/* I got these struct definitions from AutoIt v3.3.8.1 structureconstants.au3
$tagLVITEM = "uint Mask;int Item;int SubItem;uint State;uint StateMask;ptr Text;int TextMax;int Image;lparam Param;" & _
		"int Indent;int GroupID;uint Columns;ptr pColumns;ptr piColFmt;int iGroup"
*/

; You can't use /* */ in the definition because the params for system::call is a NSIS string, but this is a good reference.
;!define tagLVITEM "u /*Mask*/, i /*Item*/, i /*SubItem*/, u /*State*/, u /*StateMask*/, t /*Text*/, i /*TextMax*/, i /*Image*/, i /*Param*/, i /*Indent*/, i /*GroupID*/, u /*Columns*/, i /*pColumns*/, i /*piColFmt*/, i /*iGroup*/"
!define LVIS_IMAGESTATEMASK 0xf000
!define LVIS_IMAGESTATECHECKED 0x2000 ; item is checked
!define LVIS_IMAGESTATEUNCHECKED 0x1000 ; item is unchecked

/*
!define tagLVCOLUMN "uint Mask;int Fmt;int CX;ptr Text;int TextMax;int SubItem;int Image;int Order;int cxMin;int cxDefault;int cxIdeal"
*/

!define LVCF_FMT 0x0001
!define LVCF_TEXT 0x0004
!define LVCF_WIDTH 0x0002

!define tagLVCOLUMN "i, i, i, t, i, i, i, i, i, i, i"

; debug function
function DisplayLVItem
; Display the LVITEM struct for item $0 in $JAWSLV.  For debugging.
system::store "p1p2p3p4p5p6p7P0P1P2"
system::call "*(i -1, i $0, i .r2, i .r3, i 0xffff, t .r5, i .r6, i, i, i, i, i .r7, i, i, i) i .r4"
SendMessage $JAWSLV ${LVM_GETITEMA} 0 $4
system::call "*$4(i -1, i .r1, i .r2, i .r3, i 0xffff, t .r5, i .r6, i, i, i, i, i .r7, i, i, i)"
intfmt $R1 "%x" $3
;intfmt $R2 "%x" $4
strcpy $R0 "item $1, subitem $2, state 0x$R1, text $5, len $6, columns $7"
messagebox MB_OK "LVItem: $R0"
system::free $4
system::store "R2R1R0r7r6r5r4r3r2r1"
functionend
!macro _DisplayLVItem item
push $0
strcpy $0 ${item}
call DisplayLVItem
pop $0
!macroend
!define DisplayLVItem "!insertmacro _DisplayLVItem"

; Adapted from AutoIt include file winapi.au3.
!macro GetStockObject obj
; return on stack.
system::call "gdi32::GetStockObject(${obj}) i .s"
!macroend

; Adapted from AutoIt include file guilistview.au3.
!define GUI_DEFAULT_FONT 17
!macro _LVSetFont font
push $0
!insertmacro GetStockObject ${font}
SendMessage $JAWSLV ${WM_SETFONT} $0 1
pop $0
!macroend
!define LVSetFont "!insertmacro _LVSetFont"

!macro _NSD_GetStyle CONTROL
; Window style of CONTROL, returned on stack.
; GWL_STYLE is defined in nsdialogs.nsh.
	System::Call "user32::GetWindowLong(i ${CONTROL}, i ${GWL_STYLE}) i .s"
!macroend
!define NSD_GetStyle "!insertmacro _NSD_GetStyle"

!macro LVGetExStyle
; Returns extended style on stack.
push $0
SendMessage $JAWSLV ${LVM_GETEXTENDEDLISTVIEWSTYLE} 0 0 $0
exch $0
!macroend

function LVInsertItem
; $0 - item number
; $1 - item text
; Assumes the list view handle is in variable $JAWSLV.
push $R0
push $R1
push $R2
strlen $R0 $1
intop $R0 $R0 + 1 ; for terminating null in case we need it.
intop $R0 $R0 * 2 ; unicode?
;u doesn't seem to allocate memory, changed to i.
system::call "*(i ${LVIF_TEXT}, i r0, i 0, i, i, t r1, i R0, i, i, i, i, i, i, i, i) i .R1"
SendMessage $JAWSLV ${LVM_INSERTITEMA} 0 $R1 $R2
intcmp $R2 -1 0 +2 +2
; error
messagebox MB_OK "LVInsertItem: LVM_INSERTITEMA failed for item $0" ; debug
system::free $R1
;messagebox MB_OK "added item $R2" ; debug
pop $R2
pop $R1
pop $R0
functionend

!macro _LVAddItem text
; Add an item to the end of the list view.  Does not handle subitems.
; text - text of item
;The list view handle is in variable $JAWSLV.

push $0
push $1
strcpy $0 9999 ; item number, larger than current number of items
strcpy $1 "${text}"
call LvInsertItem
pop $1
pop $0
!macroend
!define LVAddItem "!insertmacro _LVAddItem"

function LVIsItemChecked
; $0 - (in) item index
; $1 - (out) true if checked
;The list view handle is in variable $JAWSLV.
push $R0
; set up the LVitem struct.
;system::call "*(u ${LVIF_STATE}, i $0, i 0, u, u 0xffff, t, i, i, i, i, i, u, i, i,i) i .R0"
SendMessage $JAWSLV ${LVM_GETITEMSTATE} $0 ${LVIS_IMAGESTATEMASK} $1
;push $R0 ; debug
;intfmt $R0 "%x" $1 ; debug
;messagebox MB_OK "LVIsItemChecked: item state = 0x$R0" ; debug
;pop $R0 ; debug
intop $1 $1 & ${LVIS_IMAGESTATECHECKED}
;system::free $R0
pop $R0
;messagebox MB_OK "LVIsItemChecked: returning $1" ; debug
functionend

function LVCheckItem
; $0 - item index
; $1 - 0 = unchecked, else checked.
push $2
push $R0
strcpy $2 ${LVIS_IMAGESTATECHECKED}
intcmp $1 0 +1 +2 +2
strcpy $2 ${LVIS_IMAGESTATEUNCHECKED} ; unchecked
; We probably don't need to set LVIF_STATE or item.
system::call "*(i ${LVIF_STATE}, i r0, i 0, i r2, i ${LVIS_IMAGESTATEMASK}, t, i, i, i, i, i, i, i, i, i) i .R0"
;messagebox MB_OK "LVCheckItem: setting item $0 to $2 in $JAWSLV" ; debug
SendMessage $JAWSLV ${LVM_SETITEMSTATE} $0 $R0 $R3
system::free $R0
;SendMessage $JAWSLV ${LVM_GETITEMSTATE} $0 ${LVIS_IMAGESTATEMASK} $R4 ; debug
;intfmt $R4 "%x" $R4 ; debug
;messagebox MB_OK "GetItemState returned 0x$R4, SetItemState returned $R3" ; debug
pop $R0
pop $2
functionend

!macro _LVCheckItem item checked
push $0
push $1
strcpy $0 ${item}
strcpy $1 ${checked}
call LVCheckItem
pop $1
pop $0
!macroend
!define LVCheckItem "!insertmacro _LVCheckItem"

; Adapted from NSDialogs ${NSD_LB_GetSelection, has not been used.
!macro __NSD_LV_GetSelection CONTROL VAR

	SendMessage ${CONTROL} ${LVM_GETCURSEL} 0 0 ${VAR}
	System::Call 'user32::SendMessage(i ${CONTROL}, i ${LVM_GETITEMTEXT}, i ${VAR}, t .s)'
	Pop ${VAR}

!macroend

!define NSD_LV_GetSelection `!insertmacro __NSD_LV_GetSelection`

;-----

;Install JAWS scripts.
; I don't think these two are used, maybe they should be.
!define JAWSPROGROOT "$PROGRAMFILES\Freedom Scientific\JAWS"
!define JAWSSCRIPTROOT "$APPDATA\Freedom Scientific\JAWS" ; for v6.0 and later

function MarkSelectedVersions
; Causes the list view items for the JAWS versions that have been previously selected to be checked.  This is to restore the selections if the user comes back to the JAWS versions page.
intcmp $SELECTEDJAWSVERSIONCOUNT 0 0 +2 +2
return ; return if no selected versions
;messagebox MB_OK "Enter MarkSelectedVersions" ; debug
push $0 ; index in $INSTALLEDJAWSVERSIONS
push $1 ; index in $SELECTEDJAWSVERSIONS
push $2 ; value we're looking for
push $3 ; value we're examining
strcpy $0 0
strcpy $1 0
${StrTok} $2 "$SELECTEDJAWSVERSIONS" "|" $1 0 ; first checked version
strcpy $3 ""
loop:
intcmp $0 $INSTALLEDJAWSVERSIONCOUNT done 0 done
intcmp $1 $SELECTEDJAWSVERSIONCOUNT done 0 done
${StrTok} $3 "$INSTALLEDJAWSVERSIONS" "|" $0 0
;messagebox MB_OK "MarkSelectedVersions: checking item $0 $3 against $1 $2" ; debug
${If} $2 == $3
${LVCheckItem} $0 1
intop $1 $1 + 1
${StrTok} $2 "$SELECTEDJAWSVERSIONS" "|" $1 0
${EndIf}
intop $0 $0 + 1
goto loop
done:
pop $3
pop $2
pop $1
pop $0
functionend ; MarkSelectedVersions

;Create installed JAWS versions page.
Function DisplayJawsList
;!InsertMacro SectionFlagIsSet ${SecJAWS} ${SF_SELECTED} DoJawsPage ""
goto DoJawsPage ; debug, uncomment section selected test above.
DetailPrint "DisplayJawsList: install JAWS section not selected" ; debug
abort ; JAWS script install section not selected
DoJawsPage:
; .oninit has determined that there is at least 1 JAWS version installed, but we'll check here so maybe we can eliminate checking in .oninit.
; I use ${If} here so that I can include a debug message which can later be commented out without rewriting the code.
call GetJAWSVersions
pop $INSTALLEDJAWSVERSIONS
pop $INSTALLEDJAWSVERSIONCOUNT
DetailPrint "DisplayJawsList: found  $INSTALLEDJAWSVERSIONCOUNT versions: $INSTALLEDJAWSVERSIONS" ; debug
;messagebox MB_OK "DisplayJawsList: Found $INSTALLEDJAWSVERSIONCOUNT installed JAWS versions compatible with this application: $INSTALLEDJAWSVERSIONS" ; debug
${If} $INSTALLEDJAWSVERSIONCOUNT = 0
DetailPrint "DisplayJawsList: JAWS is not installed, skipping JAWS versions page" ; debug
messagebox MB_OK "DisplayJawsList: JAWS is not installed, skipping JAWS versions page" ; debug
abort ; no JAWS
${EndIf}
${If} $INSTALLEDJAWSVERSIONCOUNT = 1
DetailPrint "DisplayJawsList: 1 JAWS version, skipping JAWS versions page" ; debug
MessageBox MB_OK "DisplayJawsList: 1 JAWS version $INSTALLEDJAWSVERSIONS, skipping JAWS versions page" ; debug
strcpy $SELECTEDJAWSVERSIONS $INSTALLEDJAWSVERSIONS
strcpy $SELECTEDJAWSVERSIONCOUNT $INSTALLEDJAWSVERSIONCOUNT
;quit ; debug
abort ; only 1 JAWS version
${EndIf}

nsDialogs::Create 1018
pop $JAWSDLG
;The versions do not include those installed that are outside JAWSMINVRSION and JAWSMAXVERSION.
${NSD_CreateLabel} 0 0 100% 10u "Select JAWS versions to which to install scripts:"
Pop $0
;math::script 'r0 = ${__NSD_ListView_EXSTYLE}' ; debug
;IntFmt $0 "%x" $0 ; debug
;messagebox MB_OK "Before creating list view ex style = 0x$0, defined is '${__NSD_ListView_EXSTYLE}'" ; debug
${NSD_CreateListView} 0u 12u 100% 100u "JAWS Versions"
Pop $JAWSLV
math::script 'r0 = ${__NSD_ListView_EXSTYLE}'
SendMessage $JAWSLV ${LVM_SetExtendedListViewStyle} 0 $0 $1
;IntFmt $0 "%x" $0 ; debug
;messagebox MB_OK "After sending LVM_SetExtendedListViewStyle, old ex style = 0x$0" ; debug
${LVSetFont} ${DEFAULT_GUI_FONT}

; Set column header
/*
; Doesn't work, don't know why.
push $R0
push $R1
system::call "*(${tagLVCOLUMN}) (${LVCF_TEXT}, , , t "Version", 7) i .$R0"
SendMessage $JAWSLV ${LVM_INSERTCOLUMNA} 0 $R0 $R1
system::free $R0
${If} $R1 = -1
messagebox MB_OK "DisplayJawsList: unable to insert column, returned $R1"
${EndIf}
pop $R1
pop $R0
*/ ; column header
push $0
push $1
strcpy $0 0
loop:
  intcmp $0 $INSTALLEDJAWSVERSIONCOUNT done 0 done
  ${strtok} $1 $INSTALLEDJAWSVERSIONS "|" $0 0
${LVAddItem} "$1"
  intop $0 $0 + 1
goto loop
done:
;messagebox MB_OK "DisplayJawsList: added $0 of $INSTALLEDJAWSVERSIONCOUNT items" ; debug
pop $1
pop $0
; In case we come back to this page check the previously selected versions.
${NSD_SETFOCUS} $JAWSLV
call MarkSelectedVersions
nsDialogs::Show
FunctionEnd

Function DisplayJawsListLeave
; On exit, var $SELECTEDJAWSVERSIONS contains the list of selected versions separated by | and $SELECTEDJAWSVERSIONCOUNT contains the number of versions selected.
push $0
push $1
push $3
/*
${NSD_GetStyle} $JAWSLV ; debug
pop $0 ; debug
IntFmt $1 "%x" $0 ; debug
!insertmacro LVGetExStyle ; debug
pop $0 ; debug
IntFmt $3 "%x" $0 ; debug
messagebox MB_OK "Enter DisplayJawsListLeave with $INSTALLEDJAWSVERSIONCOUNT versions installed$\r$\nList view style = 0x$1, extended style = 0x$3." ; debug
*/

; Get the selected JAWS versions.
strcpy $SELECTEDJAWSVERSIONS ""
strcpy $SELECTEDJAWSVERSIONCOUNT 0
strcpy $0 0
loop:
intcmp $0 $INSTALLEDJAWSVERSIONCOUNT done 0 done
;${DisplayLVItem} $0 ; debug
call LVIsItemChecked
; $1 is nonzero if item $0 is checked
;messagebox MB_OK "after LVIsItemChecked $$1 = $1" ; debug
intcmp $1 0 skip 0 0

;messagebox MB_OK "item $0 is checked" ; debug
call CheckScriptExists
; $1 = 0 if script does not exist or user chooses to overwrite.
;intcmp $1 0 skip 0 0
${strtok} $3 $INSTALLEDJAWSVERSIONS "|" $0 0

strcpy $SELECTEDJAWSVERSIONS "$SELECTEDJAWSVERSIONS$3|"
intop $SELECTEDJAWSVERSIONCOUNT $SELECTEDJAWSVERSIONCOUNT + 1
skip:
intop $0 $0 + 1
goto loop

done: ; we have finished searching for selected JAWS versions.
; If any versions were checked, remove final separator.
strcmp $SELECTEDJAWSVERSIONS "" +2
strcpy $SELECTEDJAWSVERSIONS $SELECTEDJAWSVERSIONS -1 ; remove trailing |
DetailPrint "DisplayJawsListLeave: found  $SELECTEDJAWSVERSIONCOUNT versions: $SELECTEDJAWSVERSIONS" ; debug
;messagebox MB_OK "DisplayJawsListLeave: found  $SELECTEDJAWSVERSIONCOUNT versions: $SELECTEDJAWSVERSIONS" ; debug
pop $3
pop $1
pop $0
;quit ; debug
functionend

function CheckScriptExists
; See if there are scripts for this app installed in the target dir, if so ask user if they should be overwritten.
; $0 string containing JAWS version to check.
; Returns 1 in $1 if scripts not present or user says they can be overwritten, else 0.
push $2
strcpy $1 0 ; return value
;Entry: $0 = version string like "6.0".
call GetJAWSScriptDir
pop $2
; $2 = full script destination path.
;StrCpy $2 "${JAWSSCRIPTROOT}\$0\${ScriptDir}"
;StrCpy $JAWSPROGDIR "${JAWSPROGROOT}\$0"
;StrCpy $JAWSSCRIPTDEST $2
IfFileExists "$2\${ScriptApp}.*" 0 end
MessageBox MB_YESNO "There are scripts for ${ScriptName} in $2.  Do you want to overwrite them?" IDNO +2
strcpy $1 1 ; yes
End:
pop $2
!ifdef JAWSDEBUG ; debug
strcpy $1 1 ; debug
!endif ; debug
FunctionEnd

function GetJawsScriptDir
; Get the JAWS script directory based on its version.
; $0 - string containing JAWS version number.
; Returns script directory on stack.
; Does logicLib support the >= test for strings? yes!
push $2
${If} $0 >= "6.0" ;Current selected version is 6.0 or later
strcpy $2 "${JawsDir}\$0\${ScriptDir}" ;get the script location from current user
${Else}
;Jaws 5.0 or erlier, the enu folder is inside the folder containing the JAWS program, so we'll find the path by reading from the registry.
ReadRegStr $2 HKLM "SOFTWARE\Freedom Scientific\Jaws\$0" "Target"
strcpy $2 "$2\${ScriptDir}"
${EndIf}
exch $2 ; return value
functionend

function GetJawsProgDir
; Get the JAWS program directory based on its version.
; $0 - string containing JAWS version number.
; Returns JAWS program directory on stack.
push $2
ReadRegStr $2 HKLM "SOFTWARE\Freedom Scientific\Jaws\$0" "Target"
exch $2 ; return to TOS, $2 same as before call
functionend


function JawsInstallVersion
; Installs scripts to a JAWS version.
; $0 - string containing JAWS version.
; Assumes overwrite is set to on.
; On exit $outDir set to script directory for the version.
; Should we return an error indication if the script did not compile?
push $1
push $R0
push $R1
call GetJawsScriptDir
pop $R1 ; script dir
${SetOutPath} "$R1"
!ifndef JAWSDEBUG
StrCpy $UninstLogAlwaysLog 1
DetailPrint "JAWSInstallVersion: invoking macro __JAWSInstallScriptItems for version $0" ; debug
!insertmacro __JAWSInstallScriptItems
StrCpy $UninstLogAlwaysLog ""
!EndIf
call GetJawsProgDir
pop $R0
; $R0 has backslash at end of path.
StrCpy $R0 "$R0${Compiler}"
StrCpy $R1 "$R1\${ScriptApp}"
!ifndef JAWSDEBUG ; debug
IfFileExists "$R0" +1 NoCompile
!endif ; debug
!ifdef JAWSDEBUG
MessageBox MB_OK `Pretending to run ExecWait '"$R0" "$R1.jss"' $$1`
!Else ; not JAWSJEBUG
ExecWait '"$R0" "$R1.jss"' $1
IntCmp $1 0 GoodCompile +1 +1
MessageBox MB_OK "Could not compile $R1, SCompile returned $1"
GoTo End
GoodCompile:
;Add .jsb file to log
strCpy $R0 "$UninstLogAlwaysLog"
StrCpy $UninstLogAlwaysLog "1"
${AddItemDated} "$R1.jsb"
StrCpy $UninstLogAlwaysLog "$R0"
!EndIf ; else not JAWSDEBUG
GoTo End
NoCompile:
MessageBox MB_OK "Could not find JAWS script compiler $R0.  You will need to compile it with JAWS Script Manager to use it."
End:
pop $R1
pop $R0
pop $1
functionend ; JawsInstallVersion

