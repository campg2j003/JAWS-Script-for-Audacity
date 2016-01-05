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
Limitations:
. This installer works with English versions only.
Date created: Wednesday, July 11, 2012
Last updated: Fri Jul 25 2014

Modifications:

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


;Will be omitted if not defined.
!define LegalCopyright "Copyright 2012 Gary Campbell and Dang Manh Cuong.  All rights reserved.  This is free software distributed under the terms of the GNU General Public License."
;The file name of the license file in ${JAWSSrcDir}.  If not defined, no license page will be included.
!define JAWSLicenseFile "COPYING.TXT"

;Optional installer finish page features
;Assigns default if not defined.
;!define MUI_FINISHPAGE_SHOWREADME "$instdir\${SCriptApp}_readme.txt"
;!define JAWSNoReadme ;uncomment if you don't have a README.
!define MUI_FINISHPAGE_LINK "Go to author's project page"
!define MUI_FINISHPAGE_LINK_LOCATION "http://code.google.com/p/dangmanhcuong"

;SetCompressor is outside the header because including uninstlog.nsh produces code.  setOverWriteDefault should not be in code used to add JAWS to another installer, although we probably want it in the default installer macro.
SetCompressor /solid lzma ;create the smallest file
SetOverwrite on ;always overwrite files
;Allows us to change overwrite and set it back to the default.
!define SetOverwriteDefault "on"

;Remove the ; from the following line and matching close comment to cause the default JAWSInstallScriptItems macro to be used.
;/*
; The following would appear in the user's file before including the header.
!include "uninstlog.nsh"
!macro JAWSInstallScriptItems
;Contains the instructions to install the scripts in each version of JAWS.  If not defined, the installer will use a default version that tries to install every type of JAWS script file for an application I know of.
;Assumes uninstlog is open when called.
${FileDated} "${JAWSSrcDir}" "audacity.jdf"
${FileDated} "${JAWSSrcDir}" "audacity.jkm"
${FileDated} "${JAWSSrcDir}" "audacity.jsd"
${FileDated} "${JAWSSrcDir}" "audacity.jsm"
${FileDated} "${JAWSSrcDir}" "audacity.jss"
${FileDated} "${JAWSSrcDir}" "audacity.qs"
${FileDated} "${JAWSSrcDir}" "audacity.qsm"
;If it is a Just Scripts installation, install text files into the script folder.
push $0
GetCurInstType $0
IntOp $0 $0 + 1 ;make it like SectionIn
${If} $0 = 2 ;${INST_JUSTSCRIPTS} not defined yet
  ;We're not logging.
  File "${JAWSSrcDir}${ScriptApp}_readme.txt"
  ${If} $JAWSREADME == ""
    ;no README location for the Finish page, set it to the first version we install.
    StrCpy $JAWSREADME "$OUTDIR\${ScriptApp}_readme.txt"
  ${EndIf} ;$JAWSREADME not yet set
  File "/oname=$OUTDIR\${ScriptApp}_whatsnew.txt" "${JAWSSrcDir}What's new.txt"
${EndIf} ;if just scripts
pop $0
!macroend ;JAWSInstallScriptItems

;/*
;Items to be placed in the installation folder in a full install.
!macro JAWSInstallFullItems
${File} "${JAWSSrcDir}" "${ScriptApp}_readme.txt"
;Set the location of the README file for the Finish page.
StrCpy $JAWSREADME "$InstDir\${ScriptApp}_readme.txt"
${File} "${JAWSSrcDir}" "${ScriptApp}_readme_vi.txt" ; Vietnamese README file
${File} "${JAWSSrcDir}" "What's new.txt"
!ifdef JAWSLicenseFile
${File} "${JAWSSrcDir}" "${JAWSLicenseFile}"
!EndIf ; if JAWSLicenseFile
!macroend ;JAWSInstallFullItems
;*/

;*/

;-----

!include "jfw.nsh"

!insertmacro JAWSScriptInstaller
