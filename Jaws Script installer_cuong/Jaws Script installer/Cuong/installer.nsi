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
. create macros for extracting, compiling, deleting, modifying script, so user can create a package containing multiple scripts quickly and easily.
;. Macro to copy script from all user to current user.
Limitations:
. This installer works with English versions only.
Date created: Wednesday, July 11, 2012
Last updated: Wednesday, September 12, 2012

Modifications:

9/13/12 Added macro JAWSInstallFullItems to install the README file.
9/12/12 Previous saved to HG rev 34.
9/12/2012 Moved header code to jfw.nsh.
9/12/12 Previous saved to HG rev 33.
9/12/12 Added macros JAWSLOG_* so that the installer can coexist in another installer using uninstlog.
Wrapped the rest of the installer in macro JAWSScriptInstaller and moved it into the header.
9/12/12 Previous saved to HG rev 32.
9/12/12 Moved SetCompressor before the header section.  This is so that uninstlog.nsh could be used in code to install scripts in each version.
Moved SetOverwrite before the header.  This is so that the SetOverwriteDefault define is not in code that would be used to add to another installer.
Changed the method of specifying what to do to install scripts in a JAWS version.  Now, you define the macro JAWSInstallScriptItems before including the header.  If not defined, a default version is used.
Made the definition of JAWSSrcDir overridable by specifying it before including the header.
Made the header section to be included only once, as if it were in its own file.
9/12/12 Moved code to put all (or most) code that will go in the header file together.  Made code and sections into macros.
Still a problem with JAWSScriptItem macros.
9/10/12 Previous saved to HG rev 31.
9/10/12 The sense of the overwrite scripts prompt was reversed.  This has been fixed.
9/9/12 Now does not set shell var context if JAWSALLOWALLÏSERS is not defined.
Does not write JAWSSHELLCONTEXT to ini file if JAWSALLOWALLUSERS is not defined.
9/8/12 Added !define JAWSALLOWALLUSERS.  If not defined, the "Install for" group box is not included.
If JAWSALLOWALLUSERS is defined, the JAWS Versions page is shown even if there is only 1 JAWS version installed so that the user can choose whether to install to current user or all users.  If the JAWS Versions Page is displayed and there is only 1 version, that version is checked and initial focus is on the selected radio button.
Now remembers the previously selected radio button when returning to the page.
Added define JAWSSrcDir which specifies the folder relative to the current folder on the system generating the installer of the folder containing the script files, ending with a backslash if nonempty.  Converted the Audacity files section and the default files function to use it.
Added code to get the script version from the script jss file.
Searches in ${JAWSSrcDir}${ScriptApp}.jss for the line:
Const CS_SCRIPT_VERSION = "<version>"
Case doesn't matter but spaces do.  VERSION is defined as the text between the double quotes.  If this line is not found, VERSION is set to "".
On the Welcome page now shows the title without a version if VERSION is not defined.
9/7/12 Now removes the unselected radio button from the tabbing order right after it is created.  The BS_Uautoradiobutton style causes the system to manage this when the buttons are changed, but both were initially in the tabbing order.
Added define and macro to provide ${NSD_RemoveStyle} used to remove radio button from tabbing order.
Added code to create and read the install file.
Added .jdf, .jfd, and .jff files to audacity installed items.  Added .jbf, .jbt, .jfd, and .jff to default script items.
Adjusted positions of group box and radio buttons.
9/6/12 Added group box and radio buttons for script install location.  Did not add any supporting code.
Added var JAWSSHELLCONTEXT and code to set it.
Added code in PageInstConfirmPre to display the user context.  This information has not been saved and has not been recorded in the uninstaller.
9/6/12 Previous saved to HG rev 30.
9/6/12 Fixed a bug in DisplayJawsListLeave that was not providing the version string to CheckScriptExists.
If the user chooses not to overwrite scripts in a version, that version is deselected in the list view.
Added check for no versions selected, stays on the Select JAWS Versions page if that happens.
9/6/12 Added /SD to some messageboxes in the uninstaller.  Will still prompt about changed files.
Added define UNINSTALLKEY containing the location of the uninstall info.
Added installdirregkey.
Added code in .oninit to uninstall if program is already installed.
8/27/12 Previous saved to HG rev 15.
8/27/12 Moved macro and define for ForJawsVersions and ForJawsVersionsEnd to just before pages.
8/27/12 PageInstConfirm now reports JAWS versions that contain files for this application which may be overwritten.
8/26/12 Fixed syntax for custom page header for install confirm page.
Added message on Install Confirm page about an existing installation.
Updated messages and comments.
8/26/12 Previous saved to HG rev 14.
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
${FileDated} "${JAWSSrcDir}" "audacity.jfd"
${FileDated} "${JAWSSrcDir}" "audacity.jff"
${FileDated} "${JAWSSrcDir}" "audacity.jkm"
${FileDated} "${JAWSSrcDir}" "audacity.jsd"
${FileDated} "${JAWSSrcDir}" "audacity.jsm"
${FileDated} "${JAWSSrcDir}" "audacity.jss"
!macroend ;JAWSInstallScriptItems

;/*
;Items to be placed in the installation folder in a full install.
!macro JAWSInstallFullItems
${File} "${JAWSSrcDir}" "${ScriptApp}_README.txt"
${File} "${JAWSSrcDir}" "What's new.txt"
!macroend ;JAWSInstallFullItems
;*/

;*/

;-----

!include "jfw.nsh"

!insertmacro JAWSScriptInstaller
