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
Last updated: Tuesday January 5 2016

Modifications:

12/24/15 Language strings work.
12/23/15 Added language-specific processing in Just Scripts and Full Install.
12/22/15 Added Spanish language strings.
11/12/15 Converted to use language strings.  
11/11/15 Previous saved to HG changeset:   203:3395f730d20d.
11/9/11 Moved jsd file to lang-specific section.
11/1/15 Added constructs for languages, and Spanish language message files.
7/25/14 Added QuickSettings files.
*/

/*
Installer for JAWS script for Audacity multitrack sound editor V2.0 or later (http://audacity.sourceforge.net).

    Copyright (C) 2012, 2013  Gary Campbell and Dang Manh Cuong.  All rights reserved.

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
;!define JAWSLicenseFile "copying.txt" ; defined in language file

;Optional installer finish page features
;Assigns default if not defined.
;!define MUI_FINISHPAGE_SHOWREADME "$instdir\${ScriptApp}_readme.txt"
;!define JAWSNoReadme ;uncomment if you don't have a README.
!define MUI_FINISHPAGE_LINK "$(GoToAuthorsPage)"
!define MUI_FINISHPAGE_LINK_LOCATION "http://code.google.com/p/dangmanhcuong"

;SetCompressor is outside the header because including uninstlog.nsh produces code.  setOverWriteDefault should not be in code used to add JAWS to another installer, although we probably want it in the default installer macro.
SetOverwrite on ;always overwrite files
;Allows us to change overwrite and set it back to the default.
!define SetOverwriteDefault "on"

;Remove the ; from the following line and matching close comment to cause the default JAWSInstallScriptItems macro to be used.
;/*
; The following appears in the user's file before including the JFW.nsh header.
;We include langstring header after the MUI_LANGUAGE macro.
!include "uninstlog.nsh"
!ifndef StrLoc_INCLUDED
${StrLoc}
!endif
!macro JAWSInstallScriptItems
;Contains the instructions to install the scripts in each version of JAWS.  If not defined, the installer will use a default version that tries to install every type of JAWS script file for an application I know of.
;Assumes uninstlog is open when called.
;Version in $0, lang in $1.
${FileDated} "${JAWSSrcDir}" "audacity.jdf"
${FileDated} "${JAWSSrcDir}" "audacity.jss"
${FileDated} "${JAWSSrcDir}" "audacity.qs"

;Language-specific files
${Switch} $1
${Case} "esn"
${FileDated} "${JAWSSrcDir}lang\esn\" "audacity.jkm"
${FileDated} "${JAWSSrcDir}lang\esn\" "audacity.jsd"
${FileDated} "${JAWSSrcDir}lang\esn\" "audacity.jsm"
${FileDated} "${JAWSSrcDir}lang\esn\" "audacity.qsm"
${Break}
${Default}
${FileDated} "${JAWSSrcDir}" "audacity.jkm"
${FileDated} "${JAWSSrcDir}" "audacity.jsd"
${FileDated} "${JAWSSrcDir}" "audacity.jsm"
${FileDated} "${JAWSSrcDir}" "audacity.qsm"
${Break}
${EndSwitch}
;If it is a Just Scripts installation, install text files into the script folder.
push $0
GetCurInstType $0
IntOp $0 $0 + 1 ;make it like SectionIn
${If} $0 = 2 ;${INST_JUSTSCRIPTS} not defined yet
  ;We're not logging.
${Switch} $1
${Case} "esn"
  File "${JAWSSrcDir}lang\esn\${ScriptApp}_readme.txt"
  ;File "/oname=$OUTDIR\${ScriptApp}_whatsnew.txt" "${JAWSSrcDir}lang\esn\What's new.txt"
${Break}
${Default}
  File "${JAWSSrcDir}${ScriptApp}_readme.txt"
  File "/oname=$OUTDIR\${ScriptApp}_whatsnew.txt" "${JAWSSrcDir}What's new.txt"
${Break}
${EndSwitch}
  ${If} $JAWSREADME == ""
    ;no README location for the Finish page, set it to the first version we install.
    StrCpy $JAWSREADME "$OUTDIR\${ScriptApp}_readme.txt"
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
${StrLoc} $0 $3 "|" "<"
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
${AddItem} "$OUTDIR\${ScriptApp}_readme_esn.txt"
File "/oname=${ScriptApp}_readme_esn.txt" "${JAWSSrcDir}lang\esn\${ScriptApp}_readme.txt"
;${AddItem} "What's new_esn.txt"
;File "/oname=What's new_esn.txt" "${JAWSSrcDir}lang\esn\" "What's new.txt"
${Break}
${Default}
${AddItem} "$OUTDIR\${ScriptApp}_readme_enu.txt"
File "/oname=${ScriptApp}_readme_enu.txt" "${JAWSSrcDir}${ScriptApp}_readme.txt"
${AddItem} "$OUTDIR\What's new_enu.txt"
File "/oname=What's new_enu.txt" "${JAWSSrcDir}What's new.txt"
${Break}
${EndSwitch}
;Set the location of the README file for the Finish page.
${If} $JAWSREADME == ""
  ;no README location for the Finish page, set it to the first version we install.
  StrCpy $JAWSREADME "$OUTDIR\${ScriptApp}_readme_$1.txt"
DetailPrint "JAWSInstallFullItems: setting $$JAWSREADME (for lang $1) to $JAWSREADME" ; debug
${EndIf} ;$JAWSREADME not yet set
${LoopUntil} $3 == ""
pop $4
pop $3
pop $2
pop $1
pop $0

${File} "${JAWSSrcDir}" "${ScriptApp}_readme_vi.txt" ; Vietnamese README file
!ifdef JAWSLicenseFile
${File} "${JAWSSrcDir}" "$(JAWSLicenseFile)"
!EndIf ; if JAWSLicenseFile
!macroend ;JAWSInstallFullItems
;*/

;*/

;-----
!include "mui2.nsh"

!include "jfw.nsh"

!insertmacro JAWSScriptInstaller
;Strange though it seems, the language file includes must follow the invocation of JAWSScriptInstaller.
  !include "uninstlog_enu.nsh"
  !include "uninstlog_esn.nsh"
!include "installer_lang_enu.nsh"
!include "installer_lang_esn.nsh"
