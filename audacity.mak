# To prepare the build folder:
# make -f audacity.mak preparebuild
# to build audacity JAWS script installer (need to preparebuild first):
# make -f audacity.mak installer
# To see what needs to be built (-n is dry run):
# make -f audacity.mak -n installer 
#
# other targets:

# Modification history:

# 10/7/15 Copied from ccousins make file and converted to Audacity.

# The following variables are used as targets or prerequisites.  Files contained in them cannot contain spaces: $(SRCDIR) $(PROD) $(DEV) $(SCRIPTSRC) $(MYNSISLIBDIR) $(INSTALLSRCDIR) $(INSTALLSRC)

# Empty string, so we can put \ at end of line without it being a continuation character.
NULL=

DEV:=$(dev)\$(NULL)

# Set these variables to null to get all source files from the current working directory.  Note that if they are not empty they need to end with backslash.
SRCDIR := $(NULL)
INSTALLSRCDIR:=$(SRCDIR)Jaws_script_installer\$(NULL)
# base name of program files.
PROD:=audacity

# for some tools
PROG:=$(ProgramFiles)
MAKENSIS="$(PROG)\nsis\makensis.exe"
WBIN:=c:/progra~2/mingw_sylvan/win32/wbin/

BUILDDIR=$(SRCDIR)build\$(NULL)
# source files
SCRIPTSRC=$(SRCDIR)audacity.jdf $(SRCDIR)audacity.jkm $(SRCDIR)audacity.jsd $(SRCDIR)audacity.jsm $(SRCDIR)audacity.jss $(SRCDIR)audacity.qs $(SRCDIR)audacity.qsm $(SRCDIR)audacity_readme.txt $(SRCDIR)audacity_readme_vi.txt $(SRCDIR)copying.txt

# Does not use uninstlog from the jfw_nsh submodule, uses only the uninstlog submodule.
INSTALLSRC=$(INSTALLSRCDIR)installer.nsi $(INSTALLSRCDIR)install.ini $(INSTALLSRCDIR)jfw_nsh\JFW.nsh $(INSTALLSRCDIR)uninstlog\uninstlog.nsh $(INSTALLSRCDIR)uninstlog\uninstlog_enu.nsh

.PHONY: all installer

#all: $(SRCDIR)$(PROD).exe $(SRCDIR)$(PROD).html

installer:
	$(MAKENSIS) "$(BUILDDIR)installer.nsi"

preparebuild: $(SCRIPTSRC) $(INSTALLSRC) $(MISCSRC)
	-$(WBIN)rm -rf $(BUILDDIR)
	MKDIR "$(BUILDDIR)" $(BUILDDIR)script $(BUILDDIR)script\lang
	$(WBIN)cp $(INSTALLSRC) $(BUILDDIR)
	REM What's new.txt doesn't work as part of $(SCRIPTSRC) won't work with blanks in file names, so we include it explicitly.  
	$(WBIN)cp $(SCRIPTSRC) "$(SRCDIR)What's new.txt" $(BUILDDIR)script
	$(WBIN)cp -R $(SRCDIR)lang $(BUILDDIR)script
