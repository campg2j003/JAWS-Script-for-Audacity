(Last updated 2017-08-24)

Thank you for your interest in contributing to the JAWS Script for Audacity!

# Contributing
If you would like to contribute changes to the script, [fork a copy of the repository](https://help.github.com/articles/fork-a-repo), [create a branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository) for your changes, and [create a pull request](https://help.github.com/articles/creating-a-pull-request).  The installer uses two other submodules: [`uninstlog`](https://github.com/campg2j003/uninstlog) and [`jfw_nsh`](https://github.com/campg2j003/jfw_nsh).  If you want to make changes in those files it is probably best to fork them as well and make your changes in them.  A consequence of using submodules is that if you make a clone of the `JAWS-Script-for-Audacity` repo on your machine you should add the `--recursive` switch to the git clone command.  You also need to run `git submodule update --remote --recursive` after checking out a new branch or pulling new work from GitHub.  Also note that if you download the `JAWS-Script-for-Audacity` repo from GitHub as a zip file, the submodule folders (`jfw_nsh` and `jfw_nsh\uninstlog`) will be empty.  You will have to download the other repos and put the files in these subfolders.  (You also must make sure that you download the proper branch.  Normally you will be downloading the `master` branch so this is not a problem.  The file `.gitmodules` in the top-level folder and the `jfw_nsh` submodule folder may be of help in determining the right branch.)

To build the installer you will also need [NSIS](http://nsis.sf.net).  The package is made by V2.51, but the files are completely compatible with v2.46.

You will also need [`md2html`](https://github.com/campg2j003/md2html) or some other method of converting Markdown to HTML.  Note that `md2html` produces a table of contents and substitutes text from `md2html.cfg`, so you will have to do this yourself if you use another tool.  `md2html` is written in Python, but there is a [MS Windows executable](https://github.com/campg2j003/md2html/releases/download/v1.0.3/md2html.exe) so you don't have to have Python installed.  To use it, place `md2html.exe` in a folder on your machine.  (If this folder is not on your execution path you will need to set the MD2HTML environment variable in `build.cmd` to it.)

There is a [`build.cmd`](build.cmd) script in the main repo to build the installer.  It creates a build folder at the top level of the repo, copies the required files to it, converts Markdown files to HTML, and runs the installer.  You will probably have to customize it based on your environment.  It can also copy the JAWS script files to and from the JAWS scripts folder, since you need them there to develop the script, and you don't want to clone into that folder.  You can run `build` with no arguments for help on using it.

The `b` option produces the following structure in the root of the repo:
```
build\
  script\
    lang\
      esn\
        Spanish-specific JAWS script files
    script files (non-language specific and English)
  installer files
```

The contents of the `lang` folder in the top level of the repo, including all subfolders, is copied to the `build\script\lang` folder.  Each script file in the top level of the repo is also copied to the `script` folder.  Note that since specific files are copied to the `script` folder, other files that may be in the repo will not be copied.  The required installer files are copied from `Jaws_script_installer`, `Jaws_script_installer\jfw_nsh`, and `Jaws_script_installer\jfw_nsh\uninstlog`, to `build`.  The text files are also copied to `script`, and `readme.md` is converted from Markdown to HTML and stored in `readme.html`.  This is so that GitHub will recognize it as containing markdown but it will still be displayed by the installer if requested.

You can, therefore, create an installer by running:

```
build b i
```

To work on the JAWS script files, run `build t`, work on the files in your JAWS scripts folder, then run `build f` and commit your changes to your repo.

Note that the README file is written in GitHub Markdown.  See [Writing on GitHub](https://help.github.com/categories/writing-on-github) for more information on Markdown.

# Notes for Translators
The following files in the `JAWS-Script-for-Audacity` repo require translation:

- `audacity.jsm`
- `audacity.qsm`
- `audacity.jkm` (possibly)
- `readme.md`
- `md2html.cfg`
- `Jaws_script_installer\installer_lang*.nsh` (to translate the installer interface)


In addition, the following files require translation for the installer interface:

- `jfw_nsh_lang_*.nsh` in the `jfw_nsh` repo
- the `uninstlog_*.nsh` message files in the `uninstlog` repo

The README file is written in the GitHub Markdown format and converted to HTML in the build process.  See [Writing on GitHub](https://help.github.com/categories/writing-on-github) for more information on Markdown.  You can check the conversion process by running `md2html -c readme.md readme.html` on your translation.    The file `md2html.cfg` provides text for titles in the HTML files produced by `md2html`.  The `title` option is the text placed in the HTML `<title>` element of the page.  The `toctitle` option is the text placed in a `<span>` element just before the table of contents.  All Markdown (`.md`) files, `md2html.cfg` and the resulting HTML file are UTF-8.

To add a new language to the JAWS script:

- Add a new folder in the `lang` folder of the main repo.  It should be the same name as the JAWS folder for the language.
- Copy the `.jsm` and `qsm` files from the main folder to the new language folder and translate the messages, noting the comments about what should and should not be translated.
- Also copy and translate `readme.md`.
- Copy and translate `md2html.cfg`.  You will probably only need to translate the text of the `toctitle` and `title` options.  (These are currently the only options in the file, and the only file supported is `readme.md`.  There can also be a `toclocation` option, but this is currently not used.)
- Copy the `jsd` file and translate at least the message text in the `:script` entries since they are spoken by JAWS key help.  
- If you need to change script key assignments, copy  and modify the `jkm` file as well.
- Add the new files to the appropriate places in `Jaws_script_installer\installer.nsi` where it installs the source files.  (Searching for '${Case} "esn"' should find them.)
- Add your language name (the same as your new folder in the lang folder) to $JAWSScriptLangs.  This is a list of language designators separated by vertical bar (|).  Note that "enu|" is automatically prepended to this list.

To add a new language to the installer interface:

- In `Jaws_script_installer`, copy `installer_lang_enu.nsh` to a new file in the same folder, replacing "enu" with the same name as your new folder in the `lang` folder.  Replace the comment block at the top of the file with one that reflects the file being translated something like this:

```
/*  
Spanish messages for installer.nsi (updated 2016-01-22) (1)  
Translation of file installer_lang_enu.nsh last updated 2016-01-22. (2)  
This file last updated 2016-01-22. (3)  
Translated by <your name>.  
*/
```


In the above:

- (1) The first line contains the date the installer was last updated (from installer.nsi).
- (2) The second line contains the "updated" date from the English `.nsh` file on which this translation is based.
- (3) The third line contains the date this file (your translation) was last updated.



- Do the same in the `jfw_nsh` and `uninstlog` repos.
- Add includes for the new language file in the appropriate installer files (the `uninstlog` language file is included in `JFW.nsh`.).
- Add  the appropriate `MUI2_LANGUAGE` macro in `JFW.nsh`.


After you have tested your changes, check them in and submit a pull request for your branch (one for each repo).


Files should either be in US ASCII or UTF-8 encoding.  This is particularly important for the `.md` files, as `md2html` expects non-ASCII characters to be UTF-8.

See [`readme.md`](https://github.com/campg2j003/jfw_nsh/blob/master/readme.md) in `jfw_nsh` for more information on modifying the installer.
