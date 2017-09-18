/*
Audacity Jaws script installer
Written by Dang Manh Cuong <dangmanhcuong@gmail.com>
This installer requires NSIS program from http://nsis.sourceforge.net

This installer has the following features and limitations:
Features:
. Installs into all English versions of Jaws. This will be true as long as Freedom Scientific does not change the place to put scripts.
. The user can choose whether to install scripts for all users or the current user.
. Gets the correct install path of Jaws from the registry.
. Checks for a Jaws installation before starting setup. If Jaws is not installed, displays a warning message and quits.
. contains macros for extracting, compiling, deleting, and modifying scripts, so user can create a package containing multiple scripts quickly and easily.
;. Macro to copy script from all user to current user.

Date created: Wednesday, July 11, 2012
Last updated: 2017-09-18

Modifications:

*/

/*
Installer for JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012-2017  Gary Campbell and Dang Manh Cuong.  All rights reserved.

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

;Start of code
Unicode true
RequestExecutionLevel highest
SetCompressor /solid lzma ;create the smallest file
;!define JAWSDEBUG ; debug
;User defined constants
;Name of script (displayed on screens, install folder, etc.) here
!Define ScriptName "Jaws Script for Audacity"
!define ScriptApp "audacity" ; the base name of the app the scripts are for
!define JAWSMINVERSION "" ; min version of JAWS for which this script can be installed
!define JAWSMAXVERSION "" ; max version of JAWS for which this script can be installed
!define JAWSALLOWALLUSERS ; comment this line if you don't want to allow installation for all users.
;Uncomment and change if the scripts are in another location.
;!define JAWSSrcDir "script\" ;Folder relative to current folder containing JAWS scripts, empty or ends with backslash.

!Define JAWSScriptLangs "esn" ;Supported languages (not including English; these folders must exist in the script source lang directory ${JAWSSrcDir}\lang.

;Will be omitted if not defined.
!define LegalCopyright "$(CopyrightMsg)"
;The file name of the license file in ${JAWSSrcDir}.  If not defined, no license page will be included.
!define JAWSLicenseFile ; defined in language file, this is a flag to include it

;Optional installer finish page features
;Assigns default if not defined.
;!define MUI_FINISHPAGE_SHOWREADME "$instdir\readme.txt"
;!define JAWSNoReadme ;uncomment if you don't have a README.
!define MUI_FINISHPAGE_LINK "$(GoToAuthorsPage)"
!define MUI_FINISHPAGE_LINK_LOCATION "https://github.com/campg2j003/JAWS-Script-For-Audacity"

;SetCompressor is outside the header because including uninstlog.nsh produces code.  setOverWriteDefault should not be in code used to add JAWS to another installer, although we probably want it in the default installer macro.
SetOverwrite on ;always overwrite files
;Allows us to change overwrite and set it back to the default.
!define SetOverwriteDefault "on"

;Remove the ; from the following line and matching close comment to cause the default JAWSInstallScriptItems macro to be used.
;/*
; The following appears in the user's file before including the JFW.nsh header.
;We include langstring header after the MUI_LANGUAGE macro.
;!include "uninstlog.nsh"
!include "strfunc.nsh"
!ifndef StrLoc_INCLUDED
${StrLoc}
!endif
!macro JAWSInstallScriptItems
;Contains the instructions to install the scripts in each version of JAWS.  If not defined, the installer will use a default version that tries to install every type of JAWS script file for an application I know of.
;Assumes uninstlog is open when called.
;Version in $0, lang in $1.
${JawsScriptFile} "${JAWSSrcDir}" "audacity.jdf"
${JawsScriptFile} "${JAWSSrcDir}" "audacity.jss"
${JawsScriptFile} "${JAWSSrcDir}" "audacity.qs"

;Language-specific files
${Switch} $1
${Case} "esn"
${JawsScriptFile} "${JAWSSrcDir}lang\esn\" "audacity.jkm"
${JawsScriptFile} "${JAWSSrcDir}lang\esn\" "audacity.jsd"
${JawsScriptFile} "${JAWSSrcDir}lang\esn\" "audacity.jsm"
${JawsScriptFile} "${JAWSSrcDir}lang\esn\" "audacity.qsm"
${Break}
${Default}
${JawsScriptFile} "${JAWSSrcDir}" "audacity.jkm"
${JawsScriptFile} "${JAWSSrcDir}" "audacity.jsd"
${JawsScriptFile} "${JAWSSrcDir}" "audacity.jsm"
${JawsScriptFile} "${JAWSSrcDir}" "audacity.qsm"
${Break}
${EndSwitch}
;If it is a Just Scripts installation, install text files into the script folder.
push $0
GetCurInstType $0
IntOp $0 $0 + 1 ;make it like SectionIn
${If} $0 = 2 ;${INST_JUSTSCRIPTS} not defined yet
  ;We're not logging.
;Set the location for these files the same as JSD files-- for shared scripts in JAWS 17 this is Scripts\<lang>.
${JawsScriptSetPath} jsd
${Switch} $1
${Case} "esn"
  File "/oname=$OUTDIR\${ScriptApp}_readme.html" "${JAWSSrcDir}lang\esn\readme.html"
  ;File "/oname=$OUTDIR\${ScriptApp}_whatsnew.md" "${JAWSSrcDir}lang\esn\What's new.md"
${Break}
${Default}
  File "/oname=$OUTDIR\${ScriptApp}_readme.html" "${JAWSSrcDir}readme.html"
  File "/oname=$OUTDIR\${ScriptApp}_whatsnew.md" "${JAWSSrcDir}What's new.md"
${Break}
${EndSwitch}
  ${If} $JAWSREADME == ""
    ;no README location for the Finish page, set it to the first version we install.
    StrCpy $JAWSREADME "$OUTDIR\${ScriptApp}_readme.html"
DetailPrint "JAWSInstallScriptItems: JustScripts for $0/$1 setting $$JAWSREADME to $JAWSREADME" ; debug
  ${EndIf} ;$JAWSREADME not yet set
${EndIf} ;if just scripts
pop $0
!macroend ;JAWSInstallScriptItems

;/*
;Items to be placed in the installation folder in a full install.
!macro JAWSInstallFullItems
push $0
push $1
push $2
push $3
push $4
StrCpy $3 "enu|${JAWSScriptLangs}"
${Do}
;Why was this previously < (right to left)?
${StrLoc} $0 $3 "|" ">"
;$0 is position of |
${If} $0 > 0
;We found a |
;IntOp $2 $0  - 1 ;length of lang abbrev
StrCpy $2 $0 ;$2 is length of abbrev.
StrCpy $1 $3 $2 ;lang abbrev
IntOp $2 $2 + 1 ;after the |
StrCpy $3 $3 "" $2 ;Chop off the first element and its |
${Else}
;Last element.
StrCpy $1 $3
StrCpy $3 ""
${EndIf}
;$3 is remaining lang abbreviations.
; $1 is JAWS language abbreviation (folder in ${JAWSScriptSrc}lang).
;$4 is either folder containing lang folders with trailing backslash or "" for default (enu).
StrCpy $4 "lang\"
;Don't think we can use registers with ${File} etc.
${Switch} $1
${Case} "esn"
${AddItem} "$OUTDIR\readme_esn.html"
File "/oname=readme_esn.html" "${JAWSSrcDir}lang\esn\readme.html"
;${AddItem} "What's new_esn.md"
;File "/oname=What's new_esn.md" "${JAWSSrcDir}lang\esn\" "What's new.md"
${Break}
${Default}
${AddItem} "$OUTDIR\readme_enu.html"
File "/oname=readme_enu.html" "${JAWSSrcDir}readme.html"
${AddItem} "$OUTDIR\What's new_enu.md"
File "/oname=What's new_enu.md" "${JAWSSrcDir}What's new.md"
${Break}
${EndSwitch}
;Set the location of the README file for the Finish page.
${If} $JAWSREADME == ""
  ;no README location for the Finish page, set it to the first version we install.
  StrCpy $JAWSREADME "$OUTDIR\readme_$1.html"
DetailPrint "JAWSInstallFullItems: setting $$JAWSREADME (for lang $1) to $JAWSREADME" ; debug
${EndIf} ;$JAWSREADME not yet set
${LoopUntil} $3 == ""
pop $4
pop $3
pop $2
pop $1
pop $0

${File} "${JAWSSrcDir}" "readme_vi.txt" ; Vietnamese README file
!ifdef JAWSLicenseFile
${File} "${JAWSSrcDir}" "copying.txt"
!EndIf ; if JAWSLicenseFile
!macroend ;JAWSInstallFullItems
;*/


!macro JAWSInstallerSrc
!InsertMacro JAWSJFWNSHInstallerSrc
${File} "" "uninstlog.nsh"
${File} "" "uninstlog_enu.nsh"
${File} "" "uninstlog_esn.nsh"
${File} "" "installer.nsi"
${File} "" "installer_lang_enu.nsh"
${File} "" "installer_lang_esn.nsh"
!MacroEnd ;JAWSInstallerSrc


;-----
;Doesn't need to be here-- in jfw.nsh.
;!include "mui2.nsh"

!include "jfw.nsh"

!insertmacro JAWSScriptInstaller
;Strange though it seems, the language file includes must follow the invocation of JAWSScriptInstaller.
  ;!include "uninstlog_enu.nsh"
  ;!include "uninstlog_esn.nsh"
!include "installer_lang_enu.nsh"
!include "installer_lang_esn.nsh"
