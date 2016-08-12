@echo off
setlocal
set INSTALLSRCDIR=Jaws_script_installer
rem base name of program files.
set PROD=audacity

set BUILDDIR=build\
set JAWSDIR=%appdata%\Freedom Scientific\JAWS\17.0\settings\enu
REM Name of md2html (on execution path or absolute path).
set MD2HTML=md2html
REM %MD2HTML% -V
rem source files
set SCRIPTSRC=audacity.jdf audacity.jkm audacity.jsd audacity.jsm audacity.jss audacity.qs audacity.qsm
set OTHERSRC=readme_vi.txt copying.txt "What's new.md"
REM These are basenames of .md files that should be converted to HTML files.
set MARKDOWNSRC=readme
set INSTALLSRC=installer.nsi installer_lang_enu.nsh installer_lang_esn.nsh jfw_nsh\JFW.nsh jfw_nsh\JFW_lang_enu.nsh jfw_nsh\JFW_lang_esn.nsh jfw_nsh\readme.md jfw_nsh\uninstlog\uninstlog.nsh jfw_nsh\uninstlog\uninstlog_enu.nsh jfw_nsh\uninstlog\uninstlog_esn.nsh jfw_nsh\uninstlog\logging.nsh
if "%1"=="/?" goto help
if "%1"=="-?" goto help
if "%1"=="-h" goto help
if "%1"=="--help" goto help
if not "%1"=="" goto loop
:help
echo usage: build opt...
echo where opt is:
echo b - remove and make build folder structure
echo c - remove build folder
echo i - make the installer
echo t - copy script files to the JAWS script folder overwriting existing files
echo f - copy the script sources from the JAWS script folder to this folder overwriting existing files
goto done

:loop
if "%1"=="" goto done
if "%1"=="b" goto build
if "%1"=="c" goto clean
if "%1"=="i" goto installer
if "%1"=="t" goto tojaws
if "%1"=="f" goto fromjaws
echo invalid option "%1"
goto help

:clean
rd /q /s %BUILDDIR%
goto next

:build
if exist %BUILDDIR% rd /q /s %BUILDDIR%
mkdir %BUILDDIR% %BUILDDIR%\script
for %%i in (%INSTALLSRC%) do copy %INSTALLSRCDIR%\%%i %BUILDDIR%
for %%i in (%SCRIPTSRC% %OTHERSRC%) do copy %%i %BUILDDIR%script
for %%i in (%MARKDOWNSRC%) do %MD2HTML% -c %%i.md %BUILDDIR%script\%%i.html
if errorlevel 1 goto done
md %BUILDDIR%script\lang
REM /d makes the fileset consist only of folders
for /d %%i in (lang\*) do (
REM %%i is something like lang\esn
md %BUILDDIR%script\%%i
for %%j in (%SCRIPTSRC%) do if exist %%i\%%j copy %%i\%%j %BUILDDIR%script\%%i\%%j
for %%j in (%MARKDOWNSRC%) do if exist %%i\%%j.md %MD2HTML% -c %%i\%%j.md %BUILDDIR%script\%%i\%%j.html
if errorlevel 1 goto done
)
goto next
:installer
if not exist "%programfiles(x86)%" goto installer32
"%programfiles(x86)%\nsis\makensis" "%BUILDDIR%\installer.nsi"
goto next
:installer32
"%programfiles%\nsis\makensis" "%BUILDDIR%\installer.nsi"
goto next
:tojaws
for %%i in (%SCRIPTSRC%) do copy /y %%i "%JAWSDIR%"
goto next
:fromjaws
set curdir=%CD%
pushd "%JAWSDIR%"
rem echo copy script files from %CD% to %CURDIR%
for %%i in (%SCRIPTSRC%) do copy /y %%i %curdir%
popd
goto next
:next
shift
goto loop
:done
