/*
debug version to test allocation of structs.
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
Last updated: Tuesday, August 7, 2012

Modifications:
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
;User defined constants
;Name of script (displayed on screens, install folder, etc.) here
!Define ScriptName "Jaws Script for Audacity"
!define ScriptApp "audacity" ; the base name of the app the scripts are for
!define JAWSMINVERSION "" ; min version of JAWS for which this script can be installed
!define JAWSMAXVERSION "" ; max version of JAWS for which this script can be installed

!Define InstallFile $instdir\Install.ini ; file that stores information for the uninstaller
!Define tempFile $temp\Install.ini
!Define UnInstaller "Uninst.exe"
!Define JawsDir "$appdata\Freedom Scientific\Jaws" ;the folder where app data for Jaws 6.0 or above is located
!Define Scriptdir "Settings\Enu" ;folder in $JawsDir to put the script
!Define JawsApp "JFW.EXE" ;Use to check if Jaws installed
!Define Compiler "Scompile.exe" ;Use to recompile script after installation

ShowInstDetails Show ; debug
AutoCloseWindow False ; debug
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

!include "strfunc.nsh" ; used in DisplayJawsList to check for a digit, and other things
; Declare used functions from strfunc.nsh.
${StrLoc}

!include "nsDialogs.nsh"
;Modern UI configurations
!Include "MUI.nsh"
  !define MUI_ABORTWARNING
  !define MUI_UNABORTWARNING
!define MUI_FINISHPAGE_SHOWREADME "$instdir\audacity_readme.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "View readme file"
  !define MUI_FINISHPAGE_TEXT_LARGE
  !define MUI_FINISHPAGE_LINK "Go to author's project"
  !define MUI_FINISHPAGE_LINK_LOCATION "http://code.google.com/p/dangmanhcuong"

;-----
;Pages
;!Insertmacro Mui_Page_Welcome
;!insertmacro mui_page_Components
;Page custom DisplayJawsList checkJaws ;Select Jaws version page
page custom JawsPage JawsPageLeave
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
MessageBox MB_ICONINFORMATION|MB_OK "Setup cannot start because the Jaws programme is not installed on your system."
quit
${Else}
!insertmacro mui_Installoptions_extract Install.ini
${EndIf}
FunctionEnd

Function .OnInstSuccess
!Insertmacro RemoveTempFile
FunctionEnd


!ifndef StrTokINCLUDED
${StrTok}
!endif

Var INSTALLEDJAWSVERSIONS ;separated by |
var INSTALLEDJAWSVERSIONCOUNT
var SELECTEDJAWSVERSIONS
var SELECTEDJAWSVERSIONCOUNT


!macro tstenumjawsversions var root key index
; Resembles enumregkey to test GetJAWSVersions.
strcpy ${var} ""
; compare with number of items in strtok.
intcmp ${index} 6 tstenumskip 0 tstenumskip
${strtok} ${var} "5.0|6.0|9.0|10.2|11.0|12.0" "|" ${index} 0
;intcmp ${index} 3 tstenumskip 0 tstenumskip
;${strtok} ${var} "9.0|10.2|11.0" "|" ${index} 0
tstenumskip:
!macroend

; set some registers to known valuse for debugging.
!macro setregs
  StrCpy $0 S0
  StrCpy $1 S1
  StrCpy $2 S2
  StrCpy $3 S3
  StrCpy $4 S4
  strcpy $R0 SR0
!macroend

;Check the value at top of stack to verify that it has not changed, written for debugging but not used.
; Set $R9 to original value of TOS before starting test.
!macro __chkst n
exch $R8
strcmp $R9 $R8 +2
messagebox MB_OK "chkst: #${n}, TOS $R8 != original $R9, $$R0 = $R0"
exch $R8
!macroend
!define chkst '!insertmacro __chkst'

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
strcpy $3 $2 1 ; copy first character
${StrLoc} $4 "0123456789" $3 ">"
strcmp $4 "" loop
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
done:
;${chkst} 4
strcmp $0 "" +2
strcpy $0 $0 -1 ;remove trailing |
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
;messagebox MB_OK "After exch $$1, $$1 = $1, expecting S1" ; debug
exch
;messagebox MB_OK "after exchanging top 2 stack elements" ; debug
exch $0
; stack: versions, version count
functionend

; Cuong's code similar to JawsPage, partially converted.
Function DisplayJawsList 
call GetJAWSVersions
pop $INSTALLEDJAWSVERSIONS
pop $INSTALLEDJAWSVERSIONCOUNT
;Get the counter number of Jaws install on system
${If} $INSTALLEDJAWSVERSIONCOUNT >= 2 ;there are two or more versions of Jaws installed
!insertmacro mui_installoptions_display install.ini ;Display the Select Jaws Version Page
${Else}
;If only one version installed, don't display Select Jaws Version Page
  !InsertMacro MUI_INSTALLOPTIONS_READ $3 "Install.ini" "Field 2" "ListItems"
StrCpy $3 $3 -1 ; remove last separator
    !InsertMacro MUI_INSTALLOPTIONS_WRITE "Install.ini" "Field 2" "State" $3 ;select current Jaws version automatically
Call CheckJaws
${EndIf}
FunctionEnd

;Store the script and compiler locations in the temp file, also set SetShellVarContext.
;Overwrites $4, $5.
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
;Exstract script to enu folder
;this will have to change to use install file logging.
!Insertmacro ExtractScript "script\*.*"
;Recompile scripts
;Needs to change to support multiple versions.
!insertmacro RecompileSingle audacity
SectionEnd

Section -Uninstaller
; Set up for uninstallation.  Also copies .txt files to $InstDir.
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

;Global variables

var JAWSDLG ; handle of JAWS page dialog
var JAWSLV ; handle of JAWS versions list view

; I think from Gary's code, probably not  used yet-- 8/4/12.
var JAWSSCRIPTDEST ; fully qualified path to which scripts are installed, does not handle multiple versions.
var JAWSPROGDIR ; directory containing JAWS executables

;Messages, styles, and structs for handling a list view.
;!define LVM_FIRST           0x1000
!define /math LVM_GETITEMTEXTA ${LVM_FIRST} + 45
!define /math LVM_GETITEMTEXTW ${LVM_FIRST} + 115
!define LVM_GETUNICODEFORMAT 0x2006
!define /math LVM_GETITEMSTATE ${LVM_FIRST} + 44
!define /math LVM_GETITEMA ${LVM_FIRST} + 5
!define /math LVM_GETITEMW ${LVM_FIRST} + 75
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
/*
; This was an attempt to use LVM_SetExtendedListViewStyle to set the list view extended style that was abandoned when it was verified that nsdialogs::createcontrol uses CreateWindowEx which the MSDN list view examples also use.  This probably won't work as is because I don't think SendMessage will execute the | on the styles param; maybe make another define /math ${__NSD_ListView_EXSTYLE} or use math plugin to or them.
!macro _NSD_CreateListView
push $0
nsDialogs::CreateControl ${__NSD_ListView_CLASS} ${__NSD_ListView_STYLE} ${__NSD_ListView_EXSTYLE}
pop $0
;SendMessage $0 ${LVM_SetExtendedListViewStyle} 0 ${__NSD_ListView_EXSTYLE}
exch $0 ; put result on stack and restore $0
!macroend
!define NSD_CreateListView "!insertmacro _NSD_CreateListView"
*/

; values for LVITEM struct mask field
!define LVIF_TEXT 0x00000001
!define LVIF_STATE 0x00000008

/* I got these struct definitions from AutoIt v3.3.8.1 structureconstants.au3
$tagLVITEM = "uint Mask;int Item;int SubItem;uint State;uint StateMask;ptr Text;int TextMax;int Image;lparam Param;" & _
		"int Indent;int GroupID;uint Columns;ptr pColumns;ptr piColFmt;int iGroup"
*/

; You can't use /* */ in the definition because the params for system::cal is a NSIS string, but this is a good reference.
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
/*
system::call "*$R1(i, i r0, i 0, i, i, i .r9, i R0, i, i, i, i, i, i, i, i)" ; debug
system::alloc 10 ; debug
system::copy 8 $R6 $R9
system::call "*$R6(*i .R8)" ; debug
IntFmt $R7 "%x" $R8 ; debug
messagebox MB_OK "first word of text: $R7" ; debug
*/
SendMessage $JAWSLV ${LVM_INSERTITEMA} 0 $R1 $R2
intcmp $R2 -1 0 +2 +2
; error
messagebox MB_OK "LVInsertItem: LVM_INSERTITEMW failed for item $0" ; debug
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
intfmt $R0 "%x" $1
;messagebox MB_OK "LVIsItemChecked: item state = 0x$R0" ; debug
;pop $R0 ; debug
intop $1 $1 & ${LVIS_IMAGESTATECHECKED}
;system::free $R0
pop $R0
;messagebox MB_OK "LVIsItemChecked: returning $1" ; debug
functionend

;-----
;Install JAWS scripts.
!define JAWSPROGROOT "$PROGRAMFILES\Freedom Scientific\JAWS"
!define JAWSSCRIPTROOT "$APPDATA\Freedom Scientific\JAWS" ; for v6.0 and later

;Create installed JAWS versions page.
; Adapted from NSDialogs ${NSD_LB_GetSelection, has not been used.
!macro __NSD_LV_GetSelection CONTROL VAR

	SendMessage ${CONTROL} ${LVM_GETCURSEL} 0 0 ${VAR}
	System::Call 'user32::SendMessage(i ${CONTROL}, i ${LVM_GETITEMTEXT}, i ${VAR}, t .s)'
	Pop ${VAR}

!macroend

!define NSD_LV_GetSelection `!insertmacro __NSD_LV_GetSelection`

Function JawsPage
;!InsertMacro SectionFlagIsSet ${SecJAWS} ${SF_SELECTED} DoJawsPage ""
goto DoJawsPage ; debug, uncomment section selected test above.
DetailPrint "JawsPage: install JAWS section not selected" ; debug
abort ; JAWS script install section not selected
DoJawsPage:
; .oninit has determined that there is at least 1 JAWS version installed, but we'll check here so maybe we can eliminate checking in .oninit.
; I use ${If} here so that I can include a debug message which can later be commented out without rewriting the code.
;!insertmacro setregs ; debug
; GetJawsVersions pushes $4 last.  Used with chkst.
;strcpy $R9 $4 ; debug
call GetJAWSVersions
pop $INSTALLEDJAWSVERSIONS
pop $INSTALLEDJAWSVERSIONCOUNT
DetailPrint "JawsPage: found  $INSTALLEDJAWSVERSIONCOUNT versions: $INSTALLEDJAWSVERSIONS" ; debug
messagebox MB_OK "JawsPage: Found $INSTALLEDJAWSVERSIONCOUNT installed JAWS versions compatible with this application: $INSTALLEDJAWSVERSIONS" ; debug
${If} $INSTALLEDJAWSVERSIONCOUNT = 0
DetailPrint "JawsPage: JAWS is not installed, skipping JAWS versions page" ; debug
messagebox MB_OK "JawsPage: JAWS is not installed, skipping JAWS versions page" ; debug
abort ; no JAWS
${EndIf}
${If} $INSTALLEDJAWSVERSIONCOUNT = 1
DetailPrint "JawsPage: 1 JAWS version, skipping JAWS versions page" ; debug
MessageBox MB_OK "JawsPage: 1 JAWS version, skipping JAWS versions page" ; debug
quit ; debug
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
; Doesn't work, don't know why.push $R0
push $R1
system::call "*(${tagLVCOLUMN}) (${LVCF_TEXT}, , , t "Version", 7) i .$R0"
SendMessage $JAWSLV ${LVM_INSERTCOLUMNA} 0 $R0 $R1
system::free $R0
${If} $R1 = -1
messagebox MB_OK "JawsPage: unable to insert column, returned $R1"
${EndIf}
pop $R1
pop $R0
*/ ; column header
;call FindJawsVersions
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
;messagebox MB_OK "JawsPage: added $0 of $INSTALLEDJAWSVERSIONCOUNT items" ; debug
pop $1
pop $0
${NSD_SETFOCUS} $JAWSLV
nsDialogs::Show
FunctionEnd

Function JawsPageLeave
; On exit, var $SELECTEDJAWSVERSIONS contains the list of selected versions separated by | and $SELECTEDJAWSVERSIONCOUNT contains the number of versions selected.
push $0
push $1
push $3
${NSD_GetStyle} $JAWSLV ; debug
pop $0 ; debug
IntFmt $1 "%x" $0 ; debug
!insertmacro LVGetExStyle ; debug
pop $0 ; debug
IntFmt $3 "%x" $0 ; debug
messagebox MB_OK "Enter JawsPageLeave with $INSTALLEDJAWSVERSIONCOUNT versions installed$\r$\nList view style = 0x$1, extended style = 0x$3." ; debug
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
done:
; If any versions were checked, remove final separator.
strcmp $SELECTEDJAWSVERSIONS "" +2
strcpy $SELECTEDJAWSVERSIONS $SELECTEDJAWSVERSIONS -1 ; remove trailing |
DetailPrint "JawsPageLeave: found  $SELECTEDJAWSVERSIONCOUNT versions: $SELECTEDJAWSVERSIONS" ; debug
messagebox MB_OK "JawsPageLeave: found  $SELECTEDJAWSVERSIONCOUNT versions: $SELECTEDJAWSVERSIONS" ; debug
pop $3
pop $1
pop $0
quit ; debug
functionend

function CheckScriptExists
; See if there are scripts for this app installed in the target dir, if so ask user if they should be overwritten.
; $0 string containing JAWS version to check.
; Returns 1 in $1 if scripts not present or user says they can be overwritten, else 0.
push $2
strcpy $1 0 ; return value
;Entry: $0 = version string like "6.0".
call GetJAWSScriptDir
; $2 = full script destination path.
;StrCpy $2 "${JAWSSCRIPTROOT}\$0\${ScriptDir}"
;StrCpy $JAWSPROGDIR "${JAWSPROGROOT}\$0"
;StrCpy $JAWSSCRIPTDEST $2
IfFileExists "$2\${ScriptApp}.*" 0 end
MessageBox MB_YESNO "There are scripts for ${ScriptName} in $2.  Do you want to overwrite them?" IDNO +2
strcpy $1 1 ; yes
End:
pop $2
FunctionEnd

function GetJawsScriptDir
; Get the JAWS script directory based on its version.
; $0 - string containing JAWS version number.
; $2 - (exit) script directory.
; Does logicLib support the >= test for strings? yes!
${If} $0 >= "6.0" ;Current selected version is 6.0 or later
strcpy $2 "${JawsDir}\$0\${ScriptDir}" ;get the script location from current user
${Else}
;Jaws 5.0 or erlier, the enu folder is inside the folder containing the JAWS program, so we'll find the path by reading from the registry.
ReadRegStr $2 HKLM "SOFTWARE\Freedom Scientific\Jaws\$0" "Target"
strcpy $2 "$2\${ScriptDir}"
${EndIf}
functionend

function GetJawsProgDir
; Get the JAWS program directory based on its version.
; $0 - string containing JAWS version number.
; $2 - (exit) program directory.
ReadRegStr $2 HKLM "SOFTWARE\Freedom Scientific\Jaws\$0" "Target"
functionend

;Find the JAWS versions installed on this system.
;This function searches for versions by using file folders.
Function FindJawsVersions
;${Locate} "${JAWSPROGROOT}" "/L=D /G=0" FindJawsVerCallback
FunctionEnd


;Callback for ${locate}.
;$JAWSLV contains handle of list view.
Function FindJawsVerCallback
${LVAddItem} $R7
Push $1 ; return value
FunctionEnd
