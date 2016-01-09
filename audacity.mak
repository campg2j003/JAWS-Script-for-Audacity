# To prepare the build folder:
# make -f audacity.mak preparebuild
# to build audacity JAWS script installer (need to preparebuild first):
# make -f audacity.mak installer
# To see what needs to be built (-n is dry run):
# make -f audacity.mak -n installer 
#
# other targets:
## audacity.html - update documentation file.
## audacity.txt - make audacity.txt from audacity.t2t.
## all - rebuild audacity.exe and audacity.html.

# Modification history:

# 10/7/15 Copied from ccousins make file and converted to Audacity.
# 1/25/12 Previous saved to %dev%\ccousins\ HG repo rev 35 as file ccousins.mak.
# 7/25/11 Changed variables that point into the DEV folder structure to end with backslash.  This is so they can be made to be null so that the makefile can be made to run from the source folder created by the installer.
# 7/20/11 For my system added variable to define DEV=dev since dev on my system is lower case.
# 7/19/11 Made targets all and install PHONY.
# 7/14/11 Added DEV variable for Jerry's system

# The following variables are used as targets or prerequisites.  Files contained in them cannot contain spaces: $(SRCDIR) $(PROD) $(DEV) $(SCRIPTSRC) $(MYNSISLIBDIR) $(INSTALLSRCDIR) $(INSTALLSRC)

# Empty string, so we can put \ at end of line without it being a continuation character.
NULL=

DEV:=$(dev)\$(NULL)

# Set these variables to null to get all source files from the current working directory.  Note that if they are not empty they need to end with backslash.
SRCDIR := $(NULL)
INSTALLSRCDIR:=$(SRCDIR)Jaws_script_installer\$(NULL)
MYNSISLIBDIR:=$(DEV)nsis\$(NULL)
MYNSISLIBS:=$(MYNSISLIBDIR)uninstlog.nsh
# base name of program files.
PROD:=audacity

# for some tools
PROG:=$(ProgramFiles)
PYTHON:="c:\python27\python.exe"
TXT2TAGS:=$(PYTHON) "$(TXT2TAGSDIR)txt2tags.py"
MAKENSIS="$(PROG)\nsis\makensis.exe"
WBIN:=c:/progra~2/mingw_sylvan/win32/wbin/

BUILDDIR=$(SRCDIR)build\$(NULL)
# source files
SCRIPTSRC=$(SRCDIR)audacity.jdf $(SRCDIR)audacity.jkm $(SRCDIR)audacity.jsd $(SRCDIR)audacity.jsm $(SRCDIR)audacity.jss $(SRCDIR)audacity.qs $(SRCDIR)audacity.qsm $(SRCDIR)audacity_readme.txt $(SRCDIR)audacity_readme_vi.txt $(SRCDIR)copying.txt
INSTALLSRC=$(INSTALLSRCDIR)installer.nsi $(INSTALLSRCDIR)install.ini $(INSTALLSRCDIR)JFW.nsh $(INSTALLSRCDIR)installer_lang_enu.nsh $(INSTALLSRCDIR)JFW_lang_enu.nsh $(INSTALLSRCDIR)installer_lang_esn.nsh $(INSTALLSRCDIR)JFW_lang_esn.nsh $(INSTALLSRCDIR)uninstlog\uninstlog.nsh $(INSTALLSRCDIR)uninstlog\uninstlog_enu.nsh

%.html: %.t2t
	$(TXT2TAGS) --target=html "$<"

%.txt: %.t2t
	$(TXT2TAGS) --target=txt "$<"

.PHONY: all installer

#all: $(SRCDIR)$(PROD).exe $(SRCDIR)$(PROD).html

#$(SRCDIR)$(PROD).exe: $(au3src) $(myau3libs) $(myau3dbg)


#installer: all $(INSTALLSRC)
installer:
	$(MAKENSIS) "$(BUILDDIR)installer.nsi"

preparebuild: $(SCRIPTSRC) $(INSTALLSRC) $(MISCSRC)
	IF NOT EXIST "$(BUILDDIR)" MKDIR "$(BUILDDIR)"
	$(WBIN)cp $(INSTALLSRC) $(BUILDDIR)
	-mkdir $(BUILDDIR)script $(BUILDDIR)script\lang
	REM What's new.txt doesn't work as part of $(SCRIPTSRC) won't work with blanks in file names, so we include it explicitly.  
	$(WBIN)cp $(SCRIPTSRC) "$(SRCDIR)What's new.txt" $(BUILDDIR)script
	$(WBIN)cp -R $(SRCDIR)lang $(BUILDDIR)script
