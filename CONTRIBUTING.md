(Last updated 5/14/16)

Thank you for your interest in contributing to the JAWS Script for Audacity!

# Contributing
If you would like to contribute changes to the script, [fork a copy of the repository](https://help.github.com/articles/fork-a-repo), [create a branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository) for your changes, and [create a pull request](https://help.github.com/articles/creating-a-pull-request).  The installer uses two other submodules: [`uninstlog`](https://github.com/campg2j003/uninstlog) and [`jfw_nsh`](https://github.com/campg2j003/jfw_nsh).  If you want to make changes in those files it is probably best to fork them as well and make your changes in them.  A consequence of using submodules is that if you make a clone of the `JAWS-Script-for-Audacity` repo on your machine you should add the `--recursive` switch to the git clone command.  You also need to run `git submodule update --remote --recursive` after checking out a new branch or pulling new work from GitHub.  Also note that if you download the `JAWS-Script-for-Audacity` repo from GitHub as a zip file, the submodule folders (`jfw_nsh` and `jfw_nsh\uninstlog`) will be empty.  You will have to download the other repos and put the files in these subfolders.  (You also must make sure that you download the proper branch.  Normally you wil be downloading the `master` branch so this is not a problem.  The file `.gitmodules` in the top-level folder and the` jfw_nsh` submodule folder may be of help in determining the right branch.)

To build the installer you will also need [NSIS](http://nsis.sf.net).  The package is made by V2.46.

You will also need [`md2html`][md2html] or some other method of converting Markdown to HTML.  Note that `md2html` produces a table of contents and substitutes text from `md2html.cfg`, so you will have to do this yourself if you use another tool.  `md2html` is written in Python, but there is a [MS Windows executable][md2htmlexe] so you don't have to have Python installed.
[md2html]: https://github.com/campg2j003/md2html
[md2htmlexe]: md2html.exe

There is a [`build.cmd`](build.cmd) script in the repo to build the installer.  It creates a build folder at the top level of the repo, copies the required files to it, converts Markdown files to HTML, and runs the installer.  You will probably have to customize it based on your environment.  It can also copy the JAWS script files to and from the JAWS scripts folder, since you need them there to develop the script, and you don't want to clone into that folder.  You can run `build` with no arguments for help on using it.

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

The contents of the `lang` folder in the top level of the repo, including all subfolders, is copied to the `build\script\lang` folder.  Each script file in the top level of the repo is also copied to the `script` folder.  Note that since specific files are copied to the `script` folder, other files that may be in the repo will not be copied, but *all* files in the `lang` folder structure will be copied, so you should make sure that no extra files exist there.  The required installer files are copied from `Jaws_script_installer`, `Jaws_script_installer\jfw_nsh`, and `Jaws_script_installer\jfw_nsh\uninstlog`, to `build`.  The text files are also copied to `script`, and `readme.md` is converted from Markdown to HTML and stored in `readme.html`.  This is so that GitHub will recognize it as containing markdown but it will still be displayed by the installer if requested.

You can, therefore, create an installer by running:

```
build b i
```

To work on the JAWS script files, run `build t`, work on the files in your JAWS scripts folder, then run `build f` and commit your changes to your repo.

Note that the README file is written in GitHub Markdown.  See [Writing on GitHub][] for more information.
[Writing on GitHub]: https://help.github.com/categories/writing-on-github

# Notes for Translators
The following files in the `JAWS-Script-for-Audacity` repo require translation:

- `audacity.jsm`
- `audacity.qsm`
- `audacity.jkm` (possibly)
- `readme.md`
- `md2html.cfg`
- `Jaws_script_installer\installer_lang*.nsh`


In addition, the following files require translation:

- `jfw_nsh_lang_*.nsh` in the `jfw_nsh` repo
- the `uninstlog_*.nsh` message files in the `uninstlog` repo

The README file is written in the GitHub Markdown format and converted to HTML in the build process.  See [Writing on GitHub][] for more information.  You can check the conversion process by running `md2html -c readme.md readme.html` on your translation.    The file `md2html.cfg` provides text for titles in the HTML files produced by `md2html`.  The `title` option is the text placed in the HTML `<title>` element of the page.  The `toctitle` option is the text placed in a `<span>` element just before the table of contents.  All Markdown (`.md`) files, `md2html.cfg` and the resulting HTML file are UTF-8.

