13.4.2017 JAWS skript f�r Audacity V2.0 (f�r Skript Version 2.1.0) von Gary Campbell <campg2003@gmail.com> und Dang Manh Cuong <dangmanhcuong@gmail.com>

Dieses Jaws Skript Paket bietet Unterst�tzung f�r Audacity 2.0.0 und neuer.

# Features:
- Tastenkombinationen zur Ansage der Selektion Start, Selektion Ende oder Dauer, und der Audio Position, von �berall im Hauptfenster.
- Tastenkombinationen um den Fokus zu den  Selektion Start und Selektion Ende / -Dauer Steuerelementen zu bewegen.
- Anzeigen der Hilfe f�r die Jaws und Audacity Tastenkombinationen.
- Der Audacity Leitfaden f�r Jaws Anwender von David Bailes ist direkt aus der Audacity Tastenkombinationen Hilfe erreichbar (Jaws Taste + W).
- Ansage der wichtigsten Fensterbereiche: Werkzeugleisten, Spuren Panel und Selektion Leiste, wenn der Fokus zwischen diesen gewechselt wird.
- Spricht den Namen der Werkzeugleiste, wenn der Fokus von einer Werkzeugleiste zu einer anderen verschoben wird.
- Wenn der Fokus in einer Werkzeugleiste ist, kann mit CTRL + Tab zur n�chsten und mit CTRL + Shift + Tab zur vorherigen Werkzeugleiste gewechselt werden.
- Jaws Taste + Entfernen spricht den aktuellen Transportstatus: Stop, Wiedergabe, Wiedergabe-Pause, Aufnahme oder Aufnahme-Pause.
- Spricht die Cursor Position wenn die Pfeil nach links oder Pfeil nach rechts Tasten gedr�ckt werden, Audacity gestoppt ist und der Fokus im Spuren Panel ist.
- Beim Erweitern oder Reduzieren der Selektion mit Tastenkombinationen wird die neue Position oder Dauer angesagt.
- Informiert, wenn keine Spuren in einem Projekt vorhanden sind und deshalb die gew�hlte Operation nicht angewendet werden kann.
- Tastenkombinationen, um die Werte des Wiedergabe- und Aufnahmepegels anzusagen (maximale Spitze).
- Die Steuerung der Lautst�rke und des Panoramas der Spur werden nun an die Applikation durchgereicht, wenn der PC Cursor aktiviert und der Fokus im Hauptfenster ist. Andernfalls werden die Standard Funktionen zur Maussteuerung ausgef�hrt.
- In vielen VST-Plugins kann das Preset Steuerelement mittels Tastenkombination fokussiert und Presets geladen und gespeichert werden.
- In vielen Plugin Dialogen werden Namen und Werte der Steuerelemente angesagt.
- Unterst�tzung mehrere Sprachen: Englisch, Spanisch und Deutsch werden unterst�tzt. Ebenso ist eine �bersetzung der readme Datei in Vietnamesisch vorhanden. Vielen Dank an Nguyen Hoang Giang, Dang Manh Cuong and Le Thi Theu dies anzubieten. Diese Datei audacity_readme_vi.txt ist im Installationsverzeichnis im Programme Ordner zu finden.
- Spuren k�nnen durch angabe einer Nummer aktiviert oder an eine bestimmte Position verschoben werden. Ebenso kann eine bestimmte Spur "gemerkt" werden, um sp�ter diese Spur zu aktivieren oder eine andere Spur an diese gemerkte Position zu verschieben.
- Feedback, wenn eine Spur mit der Tastatur verschoben wird (siehe weiter unten)
- Der Installer kann nun die Skripts f�r alle Benutzer oder f�r den aktuellen Benutzer installieren. Werden die Skripts f�r alle Benutzer installiert, werden diese in das gemeinsame Scripts Verzeichnis kopiert, auch f�r Jaws 17. 
- W�hrend der Wiedergabe / Aufnahme bewirkt die Enter Taste das Pausieren und Fortsetzen. CTRL + Enter sendet in diesem Fall Enter. Ich mag dies, da die Num Pad Enter Taste einfacher gefunden werden kann als die P Taste, wenn die H�nde nicht auf der Tastatur liegen. Diese Funktion kann mit einer Option im Schnelleinstellungs Dialog von Jaws deaktiviert werden. Probiere es aus und lass uns wissen, ob das f�r Dich funktioniert und ob Du dies magst.
 
# Installieren und Deinstallieren der Skripts

## Installieren:

1. Platziere den Installer in einem Ordner auf Deinem Computer.
2. Starte den Installer um die Dateien zu installieren.

Drei Installationstypen werden unterst�tzt:

- Nur Skripts:Installiert nur die Skripts. Es wird keine Option zur Deinstallation und kein Verzeichnis im Ordner Programme erstellt.
- Vollst�ndig: Installiert die Skripts im Ordner Scripts f�r die gew�hlte Jaws Version und Sprache. Erstellt einen Ordner  in %programfiles%, (%localappdata% f�r aktuellen Benutzer Installation). In den Installationsordner werden die Deinstallationsoption und optionale zus�tzliche Dateien wie die readme Datei kopiert.
- Benutzerdefiniert: Wie vollst�ndig, erlaubt jedoch die Installation der Quelldaten des Installers.

F�r die vollst�ndige und die benutzerdefinierte Installation f�r alle Benutzer werden die Deinstallationsoption und die Readme Datei im Installationsverzeichnis installiert.

Wenn der nur Skripts Typ gew�hlt wird, werden die readme und die whats new Dateien in den Jaws Scripts Ordner jeder Version installiert, und whatsnew.md wird in audacity_whatsnew.md umbenannt. (die readme Datei in Vietnamesisch wird bei einer nur Skripts Installation nicht kopiert)

Wenn die Berechtigungen des Benutzers die Installation f�r alle Benutzer erlaubt, wird eine Installation f�r alle Benutzer ausgef�hrt, andernfalls wird die Installation f�r den aktuellen Benutzer ausgef�hrt. Wenn die Berechtigungen die Installation f�r alle Benutzer erlaubt, kann mit dem Kommandozeilenparameter /currentuser die Installation f�r den aktuellen Benutzer erzwungen werden.

Bei der alle Benutzer Installation, auf der Seite Versionen/Sprache, kann zwischen der Installation f�r alle Benutzer oder der Installation f�r den aktuellen Benutzer gew�hlt werden.

Der Installer erlaubt es auszuw�hlen, in welche Jaws Version und Sprache die Skripts installiert werden. Er kompilliert das Skript Paket f�r jede Version. Beachte, dass das Skript Paket nur f�r die Sprache der aktuell laufenden Jaws Version sauber kompilliert werden kann.

Wenn Du den Installer modifizieren m�chtest, oder Du betrachten m�chtest, wie er funktioniert, kannst Du die Quelldaten des Installers installieren, in dem im benutzerdefinierten Installationstyp die Option Installer Source installieren gew�hlt wird.

## Deinstallieren:
Das Paket kann unter Programme und Features deinstalliert werden (Programme hinzuf�gen oder entfernen). Alternativ kann die Datei uninst.exe im Installationsverzeichnis ausgef�hrt werden (%programfiles(x86)%\Jaws Script for Audacity oder %localappdata%\Jaws Script for Audacity).

Wenn der Uninstaller erkennt, dass die Skripts seit der Installation modifiziert wurden, muss das L�schen der Skripts best�tigt werden. Wird ja gew�hlt, werden alle modifizierten Dateien gel�scht, wird nein gew�hlt, bleiben alle Skripts unver�ndert. Die Konfigurationsdatei (audacity.jcf oder audacity.jsi) wird nicht entfernt.

# Verwenden der Skripts
Hinweis: Das Skript spricht Namen einiger Audacity Tastenkombinationen und verwendet andere um bestimmte Operationen auszuf�hren. Wenn in Audacity im Men� Einstellungen, Tastatur diese Tastenkombinationen ge�ndert werden, m�ssen auch dessen Zuordnungen in der Datei audacity.jkf ge�ndert werden, damit das Skript weiterhin sauber funktioniert.

## Grundlagen
Nach der Installation spricht das Skript eine Willkommen Meldung, wenn Audacity erstmals den Fokus erh�lt. Du kannst eine Liste der vom Skript bereitgestellten Tastenkombinationen anschauen, in dem Du Jaws Taste + H dr�ckst ( Hotkey Hilfe). Eine Liste mit Audacity Tastenkombinationen erh�lst Du mit Jaws Taste + W. Diese Seite enth�lt auch einen Link, mit dem der Audacity Leitfaden f�r Jaws Anwender von David Bailes im Browser ge�ffnet werden kann. 

Du kannst die Selektion Start und Selektion Ende Position oder die Selektion Dauer ansagen mit Alt + [ und Alt + ]. Zwei Mal kurz nacheinander gedr�ckt wird das jeweilige Eingabefeld zur Eingabe der Position fokussiert. Beachte, dass Alt + ] "Ende" oder "L�nge" spricht, je nach gew�hltem Optionsfeld. Bei aktiviertem PC Cursor wird mit Alt + Entfernen die Audio Cursor Position angesagt (das ist Hilfreich w�hrend der Wiedergabe oder Aufnahme). Zwei Mal kurz nacheinander gedr�ckt wird die normale Jaws Funktion ausgef�hrt. Mit Jaws Taste + Entfernen wird der aktuelle Transport Status von Audacity angesagt: gestoppt, Wiedergabe, Wiedergabe Pause, Aufnahme oder Aufnahme Pause (In fr�heren Versionen von Audacity ist dieser Status in der Statuszeile erreichbar).

Die Skript Version wird mit Jaws Taste + Ctrl + V angesagt und durch zwei Mal kurz im virtuellen Betrachter angezeigt, eben so in der Hotkey Hilfe.

Die URL f�r den Zugriff zum Audacity Guide f�r Jaws Anwender kann mit Ctrl + Shift + J ge�ndert werden. Dies �ffnet einen Dialog mit einem Textfeld, welches die URL enth�lt. Editiere oder ersetze diese und w�hle ok.

Bei der Eingabe der Bezeichnung einer Textmarke spricht Jaws aus Gewohnheit die Funktionsnamen von Audacity der zugeordneten Buchstabentasten, sobald diese Buchstaben in der Textmarkenbezeichnung eingetippt werden. Wir unterdr�cken nun dieses Verhalten wenn die standard Methoden zum Erstellen von Textmarken verwendet werden. Dieses Feature wird mit  Ctrl + B und Ctrl + M aktiviert und durch Dr�cken von Enter wieder deaktiviert (dies wird auch deaktiviert durch aktivieren einer anderen Spur oder durch Verlassen des Spuren Panel). Durch aktivieren einer Textmarkenspur und lostippen wird dieses Feature nicht aktiviert. Wenn die Standard Tastenkombinationen dieser Funktionen in Audacity ge�ndert werden, m�ssen diese auch in audacity.jkf entsprechend angepasst werden.

Wenn der Fokus in einer Textmarkenspur ist, wird durch Dr�cken der Tabulator Taste versucht, die "aktuelle" Textmarke zu sprechen. Dies wird getan, in dem Text mit weissem Hintergrund gesucht wird. Das funktioniert nicht immer, besonders bei vielen vorhandenen Textmarken. 

## Skript Optionen

Das Skript hat verschiedene Optionen, mit denen dessen Features konfiguriert werden k�nnen. Diese k�nnen mit JAws Taste + V erreicht werden. F�r Jaws Versionen vor 13  sind diese im Ordner personal settings der Jaws Installation in der Datei audacity.jsi definiert. F�r Version 13 und neuer sind diese in der Datei audacity.jcf, im Abschnitt NonJCFOptions hinterlegt. Beim Aktualisieren einer Version vor 13 auf die Version 13 oder neuer werden diese Einstellungen nicht aus audacity.jsi �bernommen. In diesem Fall m�ssen die Einstellungen erneut vorgenommen werden.

## Spuren aktivieren und verschieben

Es ist m�glich eine Spur durch eingabe einer Zahl zu aktivieren, eine Spur durch eingabe einer Zahl an eine bestimmte Position zu verschieben, und eine bestimmte Spur zu "merken", um diese Spur zu einem sp�teren Zeitpunkt wieder zu aktivieren, oder die aktive Spur an die gemerkte Position zu verschieben. Auch beim Verschieben einer Spur mit der Tastatur wird hilfreiches Feedback gesprochen. Dieses Feature funktioniert mit Audacity ab Version 2.1.1 und erfordert ein paar Anpassungen der Audacity Konfiguration. Die Audacity Funktion Fokussierte Spur nach oben verschieben muss Ctrl + Shift + Pfeil nach oben und die Funktion Fokussierte Spur nach unten verschieben Ctrl + Shift + Pfeil nach unten zugeordnet werden. Gehe wie folgt vor:

1. �ffne den Einstellungen Dialog (Ctrl + P) und w�hle die Kategorie Tastatur (Taste K).
2. Tabbe zum Eingabefeld und gebe "Fokussierte Spur" ein (ich verwende die Baum Ansicht).
3. Tabbe zur Baumansicht und w�hle die Funktion Fokussierte Spur nach unten verschieben
4. Tabbe zum Tastatur-Bindungen Eingabefeld und dr�cke Ctrl + Shift + Pfeil nach unten
5. Tabbe zum Setzen Schalter und dr�cke die Leertaste, um die Tastenkombination zuzuordnen.
6. Dr�cke zwei Mal Shift + Tab, um in die Baumansicht zur�ck zu gelangen.
7. W�hle die Funktion Fokussierte Spur nach oben verschieben und ordne die Tastenkombination Ctrl + Shift + Pfeil nach oben auf die gleiche Weise wie zuvor zu.
8. Tabbe zu ok und dr�cke die Leertaste.

Wenn andere Tastenkombinationen zugeordnet werden, muss die Datei audacity.jkm entsprechend angepasst werden.

Einmal konfiguriert, kann mit Jaws Taste + A, G eine bestimmte Spur aktiviert werden. Das Skript fragt nach einer Zahl, durch eingeben der Zahl der gew�nschten Position in der Spurliste wird die entsprechende Spur aktiviert. Durch voranstellen eines +  um die entsprechende Zahl nach unten (zu h�heren Spurnummern), durch Voranstellen eines - nach oben. Mit Jaws Taste + A, M wird die aktive Spur an eine bestimmte Position verschoben. Die aktive Spur kann mit Jaws Taste + A, K "gemerkt" werden. Danach kann mit Jaws Taste + A, Shift + G jederzeit die gemerkte Spur aktiviert werden oder mit Jaws Taste + A, Shift + M die aktive Spur an die gemerkte Position verschoben werden. Beachte, dass dieses "Merken" lediglich die Position der Spur in der Spurliste "notiert". Wenn davor Spuren eingef�gt oder verschoben werden, zeigt der Vermerk auf die falsche Spur.

Sprich Zeile (Jaws Taste + Num Pad 5) sagt die aktuelle Spurnummer und die Anzahl  aller Spuren an, wenn der Fokus im Spuren Panel ist. (Einige m�gen denken "Aber Audacity sagt bereits Spurnummern". Das stimmt wenn eine Spur erstellt wird, jedoch nicht, wenn sie umbenannt wird. Oder wenn es das Resultat vom Importieren einer Datei ist.)

# Bekannte Probleme

1. Diese Version des Skripts bietet die M�glichkeit des Deaktivierens der Sprachmeldungen (Stille) w�hrend der Vorschau von Effekten (Vorh�ren vor der Anwendung einer Operation auf die Audiodaten). Manchmal wird diese Stille nicht richtig nach der Vorschau wieder ausgeschaltet. Dies kann durch kurzes Wechseln des Fokus weg von Audacity und wieder zur�ck behoben werden.

2. Die Position Steuerelemente liefern manchmal ungek�rzte Zeitwerte. Das geschieht, da die JAWS GetWindowText Funktion lediglich Werte ohne h, m, s etc. liefert. Wir wissen nicht, wodurch dies ausgel�st wird. Ich konnte dies durch Beenden und neu Starten von Audacity korrigieren. Das Ph�nomen wurde in Jaws 10, 15, 16 und 17 beobachtet. Ich habe beobachtet, dass dieses Problem manchmal von alleine verschwindet. 

3. Wenn das "Enter pausiert w�hrend Wiedergabe / Aufnahme" Feature aktiviert ist (das ist die Voreinstellung), f�hrt Enter nicht zum Selektieren und Deselektieren der aktiven Spur w�hrend der Wiedergabe oder Aufnahme. Verwenden Sie in diesem Fall Ctrl + Enter anstatt Enter. 

4. Wenn die Num Pad Enter Taste redefiniert und die erweiterten Tasten zur unterschiedlichen Belegung konfiguriert sind, werden denoch beide Enter Tasten identisch zugeordnet. Wenn dieses Feature nicht erw�nscht ist, kann es deaktiviert werden, in dem in audacity.jkm ein Semikolon vor die Zeilen Enter, Numpad Enter und Ctrl + Enter eingef�gt wird und in audacity.jss die Semikolons in den Zeilen, die /* und */ vor und nach den Skripts Enter und CtrlEnter enthalten. Wenn audacity.jss modifiziert wird, �ndern Sie in der Version Konstanten das Datum. So wissen Sie das genau, wenn Sie mit uns dar�ber kommunizieren. 

5. Der Jaws Skript Compiler kompilliert nur f�r die aktuell laufende  Sprachversion von Jaws (siehe weiter unten).

6. In Jaws Versionen vor 13 erscheint die Tastenkombination Jaws Taste + V f�r die Skriptspezifischen  Optionen nicht in der Hotkey Hilfe. Die Tastenkombination funktioniert trotzdem. Wie auch immer, wir k�nnen dies beheben, wenn  sich zeigt, dass dies ein Problem sein sollte.


# Unterst�tzung mehrerer Sprachen
Diese Version des Installer Frameworks enth�lt den ersten Wurf, welche die Installation der Skripts in mehreren Sprachen unterst�tzt. Es behandelt nun Version / Sprache Paare wie bisher Versionen behandelt wurden. So  werden nun in der Version Auswahlliste Eintr�ge wie 16.0 / enu angezeigt. Aktuell werden Englisch, Spanisch und Deutsch unterst�tzt. Fernando Gregoire hat die spanische �bersetzung bereitgestellt. Gracias! Michael Vogt hat die deutsche �bersetzung bereitgestellt. Dankesch�n!

Obschon der Installer die Skriptdateien in die Ordner der gew�hlten Sprache installiert und kompilliert, kompilliert der Jaws Script Compiler die Scripts nur in der Sprache der aktuell laufenden Jaws Version. Deshalb muss nach der Installation Jaws in den entsprechenden Sprachen gestartet und die Skripts kompilliert werden.

# Hinweise f�r Skript Entwickler
Wenn Sie die Skriptdateien modifizieren, aktualisieren Sie bitte die Version Konstante in der N�he des Anfangs der Datei audacity.jss. Das ist besonders dann wichtig, wenn Sie das Skript Paket weitergeben. Auch wenn Sie die  modifizierten Skript Dateien ausschliesslich selbst verwenden, stellt das Vorgehen sicher, dass wir wissen, dass es sich um eine modifizierte Version handelt, wenn Sie damit mit uns in Kontakt treten.

Meldungen und String Konstanten f�r das Jaws Skript sind in den Dateien audacity.jsm und audacity.qsm.

Die Meldungstexte des Installers sind nun lokalisierbar. Die Meldungstexte wurden nun vom Programmcode getrennt, so dass f�r jede Sprache separate Message Sets pr�pariert werden k�nnen. Aktuell werden Englisch, Spanisch und Deutsch unterst�tzt. Meldungstexte sind in .nsh Header Dateien mit Dateinamen wie *_enu.nsh oder *_lang_enu.nsh deklariert.

Dieses Paket wird jetzt auf GitHub gehostet. Das Repository ist unter <https://github.com/campg2j003/JAWS-Script-for-Audacity>. Wenn Sie �nderungen an den Skripts ver�ffentlichen m�chten, llesen Sie bitte [CONTRIBUTING.md](CONTRIBUTING.md) im repository.

# Hinweise f�r �bersetzer
Beachte dass readme.html aus readme.md generiert wird, welche nur im GitHub Repository zu finden ist. Siehe [CONTRIBUTING.md](CONTRIBUTING.md) f�r weitere Informationen.

Note that the script is compiled using #pragma usePoFile 0.
Beachte, dass das Skript mit #pragma usePoFile 0 kompiliert wird.
 

# Abschliessende Anmerkungen
Das Skript wurde Entwickelt mit Audacity 2.0.3, 2.0.4, 2.0.5, 2.1.0, 2.1.1 und 2.1.2.  Es wurde auch getestet mit 2.1.3 alpha versionen.  Es wird wahrscheinlich mit allen Jaws Versionen ab 5.0 funktionieren, obschon die Optionen f�r Audacity in den Jaws Schnelleinstellungen nicht sehr gut aussehen, was nicht getestet wurde (ich erinnere daran, dass eine Jaws Funktion die wir verwenden, auf FSDN mit "erfordert Jaws 10 oder neuer" vermerkt ist. Die letzten Programmierarbeiten wurden mit Jaws 17 und 18 auf einem 64 Bit Notebook mit Windows 10 ausgef�hrt. Auch wenn Support f�r fr�here Versionen von Jaws angeboten wird, wurde  der aktuelle Code nicht mit diesen getestet. Zum jetzigen Zeitpunkt bieten wir keinen spezifischen Support f�r Braille an.

Ich bin  interessiert an Feedback zu dem Skript und Vorschl�gen zu Verbesserungen, kann jedoch keine Updates versprechen.

# Hier ist der Text der Jaws Hotkey Hilfe


Ansagen der Start Position der Selektion: Alt+�
Ansagen der Ende Position oder der L�nge der Selektion: Alt+Plus Taste (Umlaut Taste)
Fokus zum Eingabefeld der Start oder Ende Position der Selektion platzieren: zwei Mal kurz aufeinander dr�cken.
Ansagen der Position des Audio Cursors: Alt+Entfernen
Bei aktiviertem PC-Cursor: zwei Mal kurz nacheinander dr�cken.

Erh�hen der Lautst�rke der aktiven Spur: Alt+Umschalt+Pfeil Rauf
Verringern der Lautst�rke der aktiven Spur: Alt+Umschalt+Pfeil Runter
Panorama der aktiven Spur nach links Alt+Umschalt+Pfeil Links
Panorama der aktiven Spur nach rechts: Alt+Umschalt+Pfeil Rechts.
Die letzten vier Tastenkombinationen ersetzen die Standard Jaws Skripts der Steuerung des Mauszeigers, wenn der Fokus im Hauptfenster ist. Durch Aktivieren
des Jaws Cursors kann die originale Jaws Maussteuerung im Hauptfenster verwendet werden.

Ansagen des Aufnahmepegels: g
Fokus zum Eingabefeld des Aufnahmepegels: zwei Mal kurz nacheinander dr�cken
Ansagen des Wiedergabepegels: h
Fokus zum Eingabefeld des Wiedergabepegels: zwei Mal kurz nacheinander dr�cken.

Eine bestimmte Spur aktivieren durch angeben einer Zahl: Einf�gen+a, a
Die Aktive Spur an eine bestimmte Position verschieben, durch angeben einer Zahl: JAWS Taste+a, m
Die aktive Spur merken: JAWS Taste+a, k
Die zuletzt gemerkte Spur aktivieren: JAWS Taste+a, Umschalt+g
Die zuletzt gemerkte Spur aktivieren und die zuvor aktive Spur merken: JAWS Taste+a, x
Aktive Spur an die zuletzt gemerkte Position verschieben und diese merken: Einf�gen+a, Umschalt+m

Meldungen der Sprachausgabe ein- und ausschalten (muten des Synthesizers): Umschalt+Einf�gen+S
Ansagen bestimmter Audacity Prozesse aktivieren / deaktivieren: Steuerung+` (Paragraph Taste)
Hinweis: dies verdoppelt die Ansagen von Audacity Nachrichten in den Jaws Schnelleinstellungen Optionen. Weitere Informationen in what's new.md.

Zur n�chsten Werkzeugleiste navigieren, wenn der Fokus in einer Werkzeugleiste ist: Steuerung+Tab
Zur vorherigen Werkzeugleiste navigieren, wenn der Fokus in einer Werkzeugleiste ist: Steuerung+Umschalt+Tab

Transport Status ansagen (Wiedergabe, Aufnahme, Pause, Stop): JAWS Taste+Entfernen
Alle Optionen der Jaws Skripts f�r Audacity auf die Standardwerte zur�cksetzen: Umschalt+Steuerung+` (Paragraph Taste)
Wechseln zwischen den beiden Listen im Ketten editieren Dialog: F6

Audacity Tastenkombinationen Hilfe: Einf�gen+w
Standard Windows Tastenkombinationen Hilfe: Einf�gen+w zwei Mal kurz nacheinander

Pause w�hrend Wiedergabe / Aufnahme an / aus: wenn die "Eingabetaste unterbricht Wiedergabe / Aufnahme" Option aktiviert ist, bewirkt das Dr�cken der Eingabe
Taste das Senden der Pause Taste. In dieser Konstelation bewirkt Steuerung+Eingabe das Senden der Enter Taste.

In einigen VST-Plugins, wie beispielsweise dem L1V:
Fokus auf die "Preset" Schaltfl�che: Alt+P
Um ein existierendes Preset zu laden: Alt+C
Speichern der aktuellen Einstellungen des VST-Plugins als Preset: Alt+G

Wenn die "Stille Vorschau" aktiviert ist und in einem Effekt Dialog die Vorschau Taste gedr�ckt wird, wird manchmal die "Stille Vorschau" nicht erwartungsgem�ss
deaktiviert. Dies f�hrt zu fehlenden Jaws Ansagen beim Wechsel des Fokus. Das kurzzeitige Wechseln zu einer anderen Anwendung behebt das Problem.

�ndern der Einstellungen der Audacity Skripts:   Einf�gen+V.

Um die URL des Jaws Guide f�r Audacity zu �ndern: Umschalt+Steuerung+J
 

Viel Spass!
