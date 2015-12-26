; 11/12/15 User-visible messages for JFW.nsh.
;Does not include debug messages or messages printed to log file/log window.

;Do not translate text inside ${...}.  These will be replaced with their values.  Also true for things like $variablename, $0, or $R1.  (To cause a $ to appear in text, it is doubled, like $$R0 will appear as $0.)

;$R1=script file name without extension, $1=exit code (number), $R2=text output by program.
LangString CouldNotCompile ${LANG_ENGLISH} "Could not compile $R1.jss, SCompile returned $1$\r$\n$$OutDir=$OutDir, Output:$\r$\n$R2.  Retry compile?"

LangString CouldNotFindCompiler ${LANG_ENGLISH} "Could not find JAWS script compiler $R0.  You will need to compile it with JAWS Script Manager to use it."

LangString NoVersionSelected ${LANG_ENGLISH} "No versions selected."

LangString InstallFolderExists ${LANG_ENGLISH} "The specified folder exists, which most likely means that ${ScriptName} is already installed.  If you want to install over the current installation choose Yes."

LangString InstDirNotFolder ${LANG_ENGLISH} "$INSTDIR exists and it is not a folder!"

LangString InstConfirmHdr ${LANG_ENGLISH} "Confirm Installation Settings"

LangString InstConfirmText ${LANG_ENGLISH} "The following summarizes the actions that will be performed by this install.  Click Back to change settings.  Click Install (Alt+i) to continue."
LangString InstConfirmCurrentUser ${LANG_ENGLISH} "the current user"
LangString InstConfirmAllUsers ${LANG_ENGLISH} "all users"

;$2=$(InstConfirmCurrentUser or $(InstConfirmAllUsers followed by a space, $1=comma-separated list of versions.
LangString InstConfirmVersions ${LANG_ENGLISH} "The scripts will be installed for $2in the following JAWS versions:$\r$\n$1.$\r$\n"

;$0=previous text, should not be followed by space.  $1=list of versions.
LangString InstConfirmHaveFiles ${LANG_ENGLISH} "$0The following JAWS versions contain files for this application (files that match ${ScriptApp}.*): $1$\r$\nThese files may be overwritten during installation.$\r$\n"

LangString InstConfirmUninstAddRemovePrograms ${LANG_ENGLISH} "$0Installation folder: $INSTDIR.$\r$\nThis installation should be uninstalled via Add/Remove Programs.$\r$\n"

;$0=previous text.
LangString InstConfirmExistingInstall ${LANG_ENGLISH} "$0There is an existing installation of ${ScriptName} on this machine.$\r$\n"

LangString InstConfirmInstallerSrc ${LANG_ENGLISH} "$0The installer source will be installed in $INSTDIR\${JAWSINSTALLERSRC}."
LangString InstConfirmNotInstalled ${LANG_ENGLISH} "$0This installation cannot be uninstalled via Add/Remove Programs."
LangString OverwriteScriptsQuery ${LANG_ENGLISH} "There are scripts for ${ScriptName} in $2.  Do you want to overwrite them?"

LangString JawsNotInstalled ${LANG_ENGLISH} "Setup cannot start because the Jaws program is not installed on your system."

LangString CantFindJawsProgDir ${LANG_ENGLISH} "Couldn't find the folder $0 in either $programfiles or $programfiles64.  The install can continue, but you might have to compile the scripts yourself."

LangString BrandingText ${LANG_ENGLISH} "${ScriptName} (packaged by Dang Manh Cuong)"
LangString SuccessfullyRemoved ${LANG_ENGLISH} "${ScriptName}  has been successfully removed from your computer."
LangString InstallFolderNotRemoved ${LANG_ENGLISH} "Warning: the install folder $INSTDIR was not removed.  It probably contains undeleted files."
LangString SureYouWantToUninstall ${LANG_ENGLISH} "Are you sure you want to completely remove $(^Name) and all of its components?"
LangString UninstallUnsuccessful ${LANG_ENGLISH} "The uninstall was unsuccessful, exit code $1.  Choose OK to install anyway, Cancel to quit."
LangString AlreadyInstalled ${LANG_ENGLISH} "${ScriptName} is already installed on this computer.  It is strongly recommended that you uninstall it before continuing.  Do you wish to uninstall?"

;e.g. V2.0 ...
LangString VersionMsg ${LANG_ENGLISH} "V${VERSION}"

;Messages in the Install Type combo box.
LangString InstTypeFull ${LANG_ENGLISH} "Full"
LangString InstTypeJustScripts ${LANG_ENGLISH} "Just Scripts"

;Text at the top of the Components page.
LangString InstTypeFullMsg ${LANG_ENGLISH} "Full allows you to uninstall using Add or Remove Programs.  $\n\
Just Scripts installs scripts and README, can't be uninstalled from Add or Remove Programs."

;Name of the Installer Sourse section (the Install Source custom component)
LangString SecInstallerSource ${LANG_ENGLISH} "Installer Source"

LangString WelcomePageTitle ${LANG_ENGLISH} "Setup for ${ScriptName}"

!if VERSION != ""
!define _VERSIONMSG " $(VersionMsg)"
!else
!define _VERSIONMSG ""
!endif

LangString WelcomeTextCopyright ${LANG_ENGLISH} "Welcome to the installation for ${ScriptName}${_VERSIONMSG}.$\n\
This wizard will guide you through the installation of ${ScriptName}.$\n\
${LegalCopyright}$\n"
LangString WelcomeTextNoCopyright ${LANG_ENGLISH} "Welcome to the installation for ${ScriptName}${_VERSIONMSG}.$\n\
This wizard will guide you through the installation of ${ScriptName}.$\n"
!undef _VERSIONMSG

;list view
;Text at the top of the Select JAWS Versions/Languages dialog.
LangString SelectJawsVersions ${LANG_ENGLISH} "Select JAWS versions/languages to which to install scripts:"

;JAWS versions/languages list view caption
LangString LVLangVersionCaption ${LANG_ENGLISH} "JAWS Versions/Languagess"

;Install for All/Current user group box ($JAWSGB)
LangString GBInstallForCaption ${LANG_ENGLISH} "Install for"
LangString RBCurrentUser ${LANG_ENGLISH} "&Current user" ;$JAWSRB1
LangString RBAllUsers ${LANG_ENGLISH} "&All users" ;$JAWSRB2

LangString DirPageText ${LANG_ENGLISH} "Choose the folder in which to store ${ScriptName}'s installation files, such as uninstaller, help or other files. $\n\
Setup will store ${ScriptName}'s installation in the following folder. To install in a different folder, click Browse and select another folder."

LangString ViewReadmeFile ${LANG_ENGLISH} "View README file"
