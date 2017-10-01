01.10.2017 JAWS skript für Audacity V2.0 (für Skript Version 2.2.0) von Gary Campbell <campg2003@gmail.com> und Dang Manh Cuong <dangmanhcuong@gmail.com>

Dieses Jaws Skript Paket bietet Unterstützung für Audacity 2.0.0 und neuer einschliesslich Audacity 2.2.0.

# Features:
- Tastenkombinationen zur Ansage der Dauer, der Start und Ende Position der Selektion und der aktuellen Audio Position.
- Tastenkombinationen um den Fokus zu den  Selektion Bereich Steuerelementen zu bewegen.
- Anzeigen der Hilfe für die Jaws und Audacity Tastenkombinationen.
- Der Audacity Leitfaden für Jaws Anwender von David Bailes ist direkt aus der Audacity Tastenkombinationen Hilfe erreichbar (Jaws Taste + W).
- Spricht beim Wechseln zwischen dem Spuren-Panel, der Selektion Leiste und den Werkzeugleisten die Bezeichnung dieser Fensterbereiche.
- Spricht den Namen der Werkzeugleiste, wenn der Fokus von einer Werkzeugleiste zu einer anderen verschoben wird.
- Wenn der Fokus in einer Werkzeugleiste ist, kann mit CTRL + Tab zur nächsten und mit CTRL + Shift + Tab zur vorherigen Werkzeugleiste navigiert werden.
- Bei gestoppter Wiedergabe kann mit den Pfeil nach links / Pfeil nach rechts Tasten eine Audio Vorschau der Cursor Position wiedergegeben werden.
- Mit Pfeil nach links / Pfeil nach rechts kann die Cursor Position angesagt werden.
- Beim Erweitern oder Reduzieren der Selektion durch Tastenkombinationen kann eine Audio Vorschau  wiedergegeben oder die neue Position angesagt werden.
- Informiert, wenn keine Spuren in einem Projekt vorhanden sind und deshalb die gewählte Operation nicht angewendet werden kann.
- Tastenkombinationen, um die Werte des Wiedergabe- und Aufnahmepegels anzusagen (maximale Spitze).
- Mit den Jaws Tastenkombinationen zur Steuerung der Maus können die Lautstärke und das Panorama der aktiven Spur verändert werden. Diese werden an die Applikation durchgereicht, wenn der PC Cursor aktiviert und der Fokus im Hauptfenster ist. Andernfalls werden die Standard Funktionen zur Maussteuerung ausgeführt.
- In vielen VST-Plugins kann das Preset Steuerelement mittels Tastenkombination fokussiert sowie Presets geladen und gespeichert werden.
- In vielen Plugin Dialogen werden Namen und Werte der Steuerelemente angesagt.
- Unterstützung mehrere Sprachen: Englisch, Spanisch und Deutsch werden unterstützt. Ebenso ist eine Übersetzung der readme Datei in Vietnamesisch vorhanden. Vielen Dank an Nguyen Hoang Giang, Dang Manh Cuong und Le Thi Theu dies anzubieten. Diese Datei audacity_readme_vi.txt ist im Installationsverzeichnis im Programme Ordner zu finden.
- Spricht die Nummern der aktuell selektierten Spuren durch Drücken von Jaws Taste + Shift + Pfeil nach unten (SaySelectedText). Die Namen der aktuell selektierten Spuren werden durch zwei Mal kurz nacheinander drücken gesprochen.
- Spuren können durch angabe einer Nummer aktiviert oder an eine bestimmte Position verschoben werden. Ebenso kann eine bestimmte Spur "gemerkt" werden, um zu einem späteren Zeitpunkt diese Spur zu aktivieren oder eine andere Spur an diese gemerkte Position zu verschieben.
- Feedback, wenn eine Spur mit der Tastatur verschoben wird (siehe weiter unten)
- Der Installer kann die Skripts für alle Benutzer oder für den aktuellen Benutzer installieren. Werden die Skripts für alle Benutzer installiert, werden diese in das gemeinsame Scripts Verzeichnis kopiert, auch für Jaws 17. 
- Während der Wiedergabe / Aufnahme bewirkt die Enter Taste das Pausieren und Fortsetzen. CTRL + Enter sendet in diesem Fall Enter. Ich mag dies, da die Num Pad Enter Taste einfacher gefunden werden kann als die P Taste, wenn die Hände nicht auf der Tastatur liegen. Diese Funktion kann mit einer Option im Schnelleinstellungs Dialog von Jaws deaktiviert werden. Probiere es aus und lass uns wissen, ob das für Dich funktioniert und ob Du dies magst.
 
# Installieren und Deinstallieren der Skripts

## Installieren:
1. Platziere den Installer in einem Ordner auf Deinem Computer.
2. Starte den Installer um die Dateien zu installieren.

Drei Installationstypen werden unterstützt:
- Nur Skripts:Installiert nur die Skripts. Es wird keine Option zur Deinstallation und kein Verzeichnis im Ordner Programme erstellt.
- Vollständig: Installiert die Skripts im Ordner Scripts für die gewählte Jaws Version und Sprache. Erstellt einen Ordner  in %programfiles%, (%localappdata% für aktuellen Benutzer Installation). In den Installationsordner werden die Deinstallationsoption und optionale zusätzliche Dateien wie die readme Datei kopiert.
- Benutzerdefiniert: Wie vollständig, erlaubt jedoch die Installation der Quelldaten des Installers.

Für die vollständige und die benutzerdefinierte Installation für alle Benutzer werden die Deinstallationsoption und die Readme Datei im Installationsverzeichnis installiert.

Wenn der nur Skripts Typ gewählt wird, werden die readme und die whats new Dateien in den Jaws Scripts Ordner jeder Version installiert, und whatsnew.md wird in audacity_whatsnew.md umbenannt. (die readme Datei in Vietnamesisch wird bei einer nur Skripts Installation nicht kopiert)

Wenn die Berechtigungen des Benutzers die Installation für alle Benutzer erlaubt, wird eine Installation für alle Benutzer ausgeführt, andernfalls wird die Installation für den aktuellen Benutzer ausgeführt. Wenn die Berechtigungen die Installation für alle Benutzer erlaubt, kann mit dem Kommandozeilenparameter /currentuser die Installation für den aktuellen Benutzer erzwungen werden.

Bei der alle Benutzer Installation, auf der Seite Versionen/Sprache, kann zwischen der Installation für alle Benutzer oder der Installation für den aktuellen Benutzer gewählt werden.

Der Installer erlaubt es auszuwählen, in welche Jaws Version und Sprache die Skripts installiert werden. Er kompilliert das Skript Paket für jede Version. Mit der Leertaste können die gewünschten Versionen, in welche das Skript Paket installiert werden soll, ausgewählt werden. Beachte, dass das Skript Paket nur für die Sprache der aktuell laufenden Jaws Version sauber kompilliert werden kann.

Wenn Du den Installer modifizieren möchtest, oder Du betrachten möchtest, wie er funktioniert, kannst Du die Quelldaten des Installers installieren, in dem im benutzerdefinierten Installationstyp die Option Installer Source installieren gewählt wird.

## Deinstallieren:
Das Paket kann unter Programme und Features deinstalliert werden (Programme hinzufügen oder entfernen). Alternativ kann die Datei uninst.exe im Installationsverzeichnis ausgeführt werden (%programfiles(x86)%\Jaws Script for Audacity oder %localappdata%\Jaws Script for Audacity).

Wenn der Uninstaller erkennt, dass die Skripts seit der Installation modifiziert wurden, muss das Löschen der Skripts bestätigt werden. Wird ja gewählt, werden alle modifizierten Dateien gelöscht, wird nein gewählt, bleiben alle Skripts unverändert. Die Konfigurationsdatei (audacity.jcf oder audacity.jsi) wird nicht entfernt.

# Verwenden der Skripts
Hinweis: Das Skript spricht Namen einiger Audacity Tastenkombinationen und verwendet andere um bestimmte Operationen auszuführen. Wenn in Audacity im Menü Einstellungen, Tastatur diese Tastenkombinationen geändert werden, müssen auch dessen Zuordnungen in der Datei audacity.jkm geändert werden, damit das Skript weiterhin sauber funktioniert.

## Grundlagen
Nach der Installation spricht das Skript eine Willkommen Meldung, wenn Audacity erstmals den Fokus erhält. Du kannst eine Liste der vom Skript bereitgestellten Tastenkombinationen anschauen, in dem Du Jaws Taste + H drückst ( Hotkey Hilfe). Eine Liste mit Audacity Tastenkombinationen erhälst Du mit Jaws Taste + W. Diese Seite enthält auch einen Link, mit dem der Audacity Leitfaden für Jaws Anwender von David Bailes im Browser geöffnet werden kann. 

Du kannst die Selektion Start und Selektion Ende Position oder die Selektion Dauer ansagen mit Alt + [ und Alt + ] (ü und Umlaut-Taste deutschsprachiger Tastaturlayouts). Zwei Mal kurz nacheinander gedrückt wird das jeweilige Eingabefeld zur Eingabe der Position fokussiert. Beachte, dass in Audacity Versionen vor v2.2.0 Alt + ] "Ende" oder "Länge" spricht, je nach gewähltem Optionsfeld.
 
Mit Alt + Entfernen wird die Audio Cursor Position angesagt (bei aktiviertem PC-Cursor). Das ist Hilfreich während der Wiedergabe oder Aufnahme. Zwei Mal kurz nacheinander gedrückt wird die normale Jaws Funktion ausgeführt.
 
Mit Jaws Taste + Entfernen wird der aktuelle Transport Status von Audacity angesagt: gestoppt, Wiedergabe, Wiedergabe Pause, Aufnahme oder Aufnahme Pause (in früheren Versionen von Audacity ist dieser Status in der Statuszeile erreichbar).


In Audacity 2.2.0 wurden die Optionsfelder der Selektion Leiste zur Wahl zwischen der Ende Position und Selektion Dauer durch ein Kombinationsfeld mit zusätzlichen Optionen ersetzt. Das Skript bietet Tastenkombinationen, um die aktuell gewählte Option dieses Steuerelements anzusagen oder um eine andere Option auszuwählen.

Die Tastenkombination Ebene "Position" wird initialisiert mit Jaws Taste + A, P

 Dann können folgende Tasten verwendet werden:
- Hilfe Text der Tastenkombination Ebene sprechen: ?
- Aktuell gewählte Selektionsart ansagen: P
- Selektionsart wählen:
- Start - Ende: S oder 1
- Start - Länge: L oder 2
- Länge - Ende: E oder 3
- Länge - zentriert: C oder 4

Ansagen des Werts des ersten Selektion Steuerelements: Alt + [ (ü)

 Ansagen des Werts des zweiten  Selektion Steuerelements: Alt + Pfeil nach rechts

 
Die Skript Version wird mit Jaws Taste + Ctrl + V angesagt und durch zwei Mal kurz nacheinander drücken im virtuellen Betrachter angezeigt, eben so in der Hotkey Hilfe.

Die URL für den Zugriff zum Audacity Guide für Jaws Anwender kann mit Ctrl + Shift + J geändert werden. Dies öffnet einen Dialog mit einem Textfeld, welches die URL enthält. Editiere oder ersetze diese und wähle ok.


Bei der Eingabe der Bezeichnung einer Textmarke spricht Jaws aus Gewohnheit die Funktionsnamen von Audacity der zugeordneten Buchstabentasten, sobald diese Buchstaben in der Textmarkenbezeichnung eingetippt werden. Wir unterdrücken nun dieses Verhalten wenn die standard Methoden zum Erstellen von Textmarken verwendet werden.
 
Dieses Feature wird mit  Ctrl + B und Ctrl + M aktiviert und durch Drücken von Enter wieder deaktiviert (dies wird auch deaktiviert durch aktivieren einer anderen Spur oder durch Verlassen des Spuren Panel). Durch aktivieren einer Textmarkenspur und lostippen wird dieses Feature nicht aktiviert.
 
Wenn die Standard Tastenkombinationen dieser Funktionen in Audacity geändert werden, müssen diese auch in audacity.jkm entsprechend angepasst werden.


Wenn der Fokus in einer Textmarkenspur ist, wird durch Drücken der Tabulator Taste versucht, die "aktuelle" Textmarke zu sprechen. Dies wird realisiert, in dem Text mit weissem Hintergrund gesucht wird. Das funktioniert nicht immer, besonders bei vielen vorhandenen Textmarken.
 
## Audio Vorschau
Das Skript kann so konfiguriert werden, dass nach Tastenkombinationen zum Bewegen des Cursors  eine Audio Sequenz wiedergegeben wird. Im Schnell Einstellungen Dialog gibt es dafür zwei Optionen.
- Mit der Option "Ansagen der Position Steuerelemente" kann festgelegt werden, ob die Cursor Position nach Tastenkombinationen zum Bewegen des Cursors gesprochen werden oder nicht.
- Wenn die Option "Audio Vorschau nach Cursor Bewegen" aktiviert ist, wird nach Tastenkombinationen zum Bewegen des Cursors die Audacity Funktion Audio Vorschau ausgeführt (entspricht den Tastenkombinationen Shift + F6 für die Vorschau der Start Position und Shift + F7 für die Vorschau der Ende Position).

Das ermöglicht eine kurze Sequenz der Start- oder Ende Position der Selektion zu hören. Dabei kann die Vorschau Sequenz durchaus länger sein als das durch die Cursor Bewegen Funktion übersprungene Audio.
  
Vorübergehend kann zwischen der Audio Vorschau und der Ansage der Position mit Jaws Taste + P umgeschaltet werden. Sobald der Fokus vorübergehend in eine andere Anwendung oder in den Schnell Einstellungen Dialog verschoben wird, wird die im Schnell Einstellungen Dialog definierte Konfiguration wieder verwendet.
  
Wenn der Fokus im Selektion Start oder Selektion Ende Steuerelement ist, kann die fokussierte Ziffer mit Shift + Pfeil nach oben verringert und mit Shift + Pfeil nach unten erhöht werden. Danach wird jeweils die Audio Vorschau gestartet.


Das Skript bietet ein paar Tastenkombinationen, mit denen die Audacity Funktionen der Audio Vorschau besser mit der Tastatur erreicht werden können.
 
Im Spuren Panel und der Selektion Leiste wird mit Jaws Taste + Pfeil nach links die Audacity Tastenkombination Shift + F6 und mit Jaws Taste + Pfeil nach rechts die Audacity Tastenkombination Shift + F7 ausgeführt. Diese spielen den Start und das Ende innerhalb der Selektion ab. Wenn zusätzlich die Shift Taste gedrückt wird, wird der Start und das Ende ausserhalb der Selektion wiedergegeben.


Mit der Tastenkombination Ebene "Kurztasten (short)" können ebenso die Vorschau Tastenkombinationen von Audacity ausgeführt werden. Dies kann hilfreich sein auf Notebooks, bei denen die FN Taste gedrückt gehalten werden muss, um die Funktionstasten ausführen zu können.

Die Tastenkombination Ebene "short" wird initialisiert mit Jaws Taste + A, S

Dann können folgende Tasten verwendet werden:
- Hilfe Text der Tastenkombination Ebene sprechen: ?
- Shift + F5: J
- Shift + F6: K
- Shift + F7: L
- Shift + F8: ; (ö)
- Ctrl + Shift + F5: Ctrl + J
- Ctrl + Shift + F7: Ctrl + L

Ebenso unterstützt diese Tastenkombinationebene Pfeil nach links / rechts, auch zusammen mit Shift, Ctrl und Ctrl + Shift

  Auch die Jaws Standardbefehle SprichZeichen, SprichWort und Sprich Zeile können verwendet werden. Ebenso wird die Audacity Tastenkombination C unterstützt.

  
  Verlassen der Tastenkombination Ebene: Escape (oder jede nicht der Tastenkombination Ebene zugeordnete Taste)
     
## Skript Optionen
Das Skript bietet verschiedene Optionen, mit denen dessen Features konfiguriert werden können. Diese sind mit JAws Taste + V erreichbar. Für Jaws Versionen vor 13  sind diese im Ordner personal settings der Jaws Installation in der Datei audacity.jsi definiert. Für Version 13 und neuer sind diese in der Datei audacity.jcf, im Abschnitt NonJCFOptions hinterlegt. Beim Aktualisieren einer Version vor 13 auf die Version 13 oder neuer werden diese Einstellungen nicht aus audacity.jsi übernommen. In diesem Fall müssen die Einstellungen erneut vorgenommen werden.

## Spuren aktivieren und verschieben
Es ist möglich eine Spur durch eingabe einer Zahl zu aktivieren, eine Spur durch eingabe einer Zahl an eine bestimmte Position zu verschieben, und eine bestimmte Spur zu "merken", um diese Spur zu einem späteren Zeitpunkt wieder zu aktivieren, oder die aktive Spur an die gemerkte Position zu verschieben. Auch beim Verschieben einer Spur mit der Tastatur wird hilfreiches Feedback gesprochen. Dieses Feature funktioniert mit Audacity ab Version 2.1.1 und erfordert ein paar Anpassungen der Audacity Konfiguration. Die Audacity Funktion Fokussierte Spur nach oben verschieben muss Ctrl + Shift + Pfeil nach oben und die Funktion Fokussierte Spur nach unten verschieben Ctrl + Shift + Pfeil nach unten zugeordnet werden. Gehe wie folgt vor:
1. Öffne den Einstellungen Dialog (Ctrl + P) und wähle die Kategorie Tastatur (Taste K).
2. Tabbe zum Eingabefeld und gebe "Fokussierte Spur" ein (ich verwende die Baum Ansicht).
3. Tabbe zur Baumansicht und wähle die Funktion Fokussierte Spur nach unten verschieben
4. Tabbe zum Tastatur-Bindungen Eingabefeld und drücke Ctrl + Shift + Pfeil nach unten
5. Tabbe zum Setzen Schalter und drücke die Leertaste, um die Tastenkombination zuzuordnen.
6. Drücke zwei Mal Shift + Tab, um in die Baumansicht zurück zu gelangen.
7. Wähle die Funktion Fokussierte Spur nach oben verschieben und ordne die Tastenkombination Ctrl + Shift + Pfeil nach oben auf die gleiche Weise wie zuvor zu.
8. Tabbe zu ok und drücke die Leertaste.

Wenn andere Tastenkombinationen zugeordnet werden, muss die Datei audacity.jkm entsprechend angepasst werden.

Einmal konfiguriert, kann mit der Jaws Taste + A, G eine bestimmte Spur aktiviert werden.
 
Das Skript fragt nach einer Zahl, durch eingeben der Zahl der gewünschten Position in der Spurliste wird die entsprechende Spur aktiviert. Durch voranstellen eines +  um die entsprechende Zahl nach unten (zu höheren Spurnummern), durch Voranstellen eines - nach oben.
 
Mit Jaws Taste + A, M wird die aktive Spur an eine bestimmte Position verschoben.
 
Die aktive Spur kann mit Jaws Taste + A, K "gemerkt" werden. 

Danach kann mit Jaws Taste + A, Shift + G jederzeit die gemerkte Spur aktiviert werden oder mit Jaws Taste + A, Shift + M die aktive Spur an die gemerkte Position verschoben werden.
 
Beachte, dass dieses "Merken" lediglich die Position der Spur in der Spurliste "notiert". Wenn davor Spuren eingefügt oder verschoben werden, zeigt der Vermerk auf die falsche Spur.


Sprich Zeile (Jaws Taste + Num Pad 5) sagt die aktuelle Spurnummer und die Anzahl  aller Spuren an, wenn der Fokus im Spuren Panel ist. (Einige mögen denken "Aber Audacity sagt bereits Spurnummern". Das stimmt wenn eine Spur erstellt wird, jedoch nicht, wenn sie umbenannt wird. Oder wenn es das Resultat vom Importieren einer Datei ist.)

## Tempo ermitteln
Mit der Tempo Ebene kann das Tempo einer beliebigen Audio Sequenz im Rythmus der Musik mit der Tastatur getabt und anschliessend berechnet werden.

Dieses Feature funktioniert ähnlich wie ein Add-On von Robert Hänggi in NVDA. Der Algorithmus unterscheidet sich ein wenig davon.


Die Tastenkombination Ebene "Tempo" wird initialisiert mit Jaws Taste + A, T
- Wiedergabe starten: Leertaste
- Pro Beat: Tabulator Taste
 - Um das Ermitteln des Tempos abzuschliessen und die Wiedergabe anzuhalten, drücken Sie erneut die Leertaste
- Das ermittelte Tempo wird angesagt (in Schlägen pro Minute).
- Erneutes Ansagen des ermittelten Tempos: A
- Kopieren des Tempos in die Zwischenablage: C 
- Das ermittelte Tempo bleibt verfügbar, bis erneut die Leertaste gedrückt wird
- Drücken Sie abschliessend Escape, um die Tempo Ebene zu verlassen.

 
# Bekannte Probleme
1. Diese Version des Skripts bietet die Möglichkeit des Deaktivierens der Sprachmeldungen (Stille) während der Vorschau von Effekten (Vorhören vor der Anwendung einer Operation auf die Audiodaten). Manchmal wird diese Stille nicht richtig nach der Vorschau wieder ausgeschaltet. Dies kann durch kurzes Wechseln des Fokus weg von Audacity und wieder zurück behoben werden.
2. Die Position Steuerelemente liefern manchmal ungekürzte Zeitwerte. Das geschieht, da die JAWS GetWindowText Funktion lediglich Werte ohne h, m, s etc. liefert. Wir wissen nicht, wodurch dies ausgelöst wird. Ich konnte dies durch Beenden und neu Starten von Audacity korrigieren. Das Phänomen wurde in Jaws 10, 15, 16 und 17 beobachtet. Ich habe beobachtet, dass dieses Problem manchmal von alleine verschwindet. 
3. Wenn das "Enter pausiert während Wiedergabe / Aufnahme" Feature aktiviert ist (das ist die Voreinstellung), führt Enter nicht zum Selektieren und Deselektieren der aktiven Spur während der Wiedergabe oder Aufnahme. Verwenden Sie in diesem Fall Ctrl + Enter anstatt Enter. 
4. Wenn die Num Pad Enter Taste redefiniert und die erweiterten Tasten zur unterschiedlichen Belegung konfiguriert sind, werden denoch beide Enter Tasten identisch zugeordnet. Wenn dieses Feature nicht erwünscht ist, kann es deaktiviert werden, in dem in audacity.jkm ein Semikolon vor die Zeilen Enter, Numpad Enter und Ctrl + Enter eingefügt wird und in audacity.jss die Semikolons in den Zeilen, die /* und */ vor und nach den Skripts Enter und CtrlEnter enthalten. Wenn audacity.jss modifiziert wird, ändern Sie in der Version Konstanten das Datum. So wissen Sie das genau, wenn Sie mit uns darüber kommunizieren. 
5. Der Jaws Skript Compiler kompilliert nur für die aktuell laufende  Sprachversion von Jaws (siehe weiter unten).
6. In Jaws Versionen vor 13 erscheint die Tastenkombination Jaws Taste + V für die Skriptspezifischen  Optionen nicht in der Hotkey Hilfe. Die Tastenkombination funktioniert trotzdem. Wie auch immer, wir können dies beheben, wenn  sich zeigt, dass dies ein Problem sein sollte.

# Unterstützung mehrerer Sprachen
Diese Version des Installer Frameworks enthält den ersten Wurf, welche die Installation der Skripts in mehreren Sprachen unterstützt. Es behandelt nun Version / Sprache Paare wie bisher Versionen behandelt wurden. So  werden nun in der Version Auswahlliste Einträge wie 16.0 / deu angezeigt. Aktuell werden Englisch, Spanisch und Deutsch unterstützt. 

Obschon der Installer die Skriptdateien in die Ordner der gewählten Sprache installiert und kompilliert, kompilliert der Jaws Script Compiler die Scripts nur in der Sprache der aktuell laufenden Jaws Version. Deshalb muss nach der Installation Jaws in den entsprechenden Sprachen gestartet und die Skripts kompilliert werden (Mit Fokus in Audacity Jaws + F2 drücken, Skript Manager starten, im Editor wird dann audacity.jss angezeigt. Einmal Ctrl + S, dadurch wird das Skript kompiliert).

# Hinweise für Skript Entwickler
Wenn Sie die Skriptdateien modifizieren, aktualisieren Sie bitte die Version Konstante in der Nähe des Anfangs der Datei audacity.jss. Das ist besonders dann wichtig, wenn Sie das Skript Paket weitergeben. Auch wenn Sie die  modifizierten Skript Dateien ausschliesslich selbst verwenden, stellt das Vorgehen sicher, dass wir wissen, dass es sich um eine modifizierte Version handelt, wenn Sie damit mit uns in Kontakt treten.


Meldungen und String Konstanten für das Jaws Skript sind in den Dateien audacity.jsm und audacity.qsm enthalten. Ab Version 2.0.0 müssen alle Dateien als UTF-8 encodiert sein.

Die Meldungstexte des Installers sind nun lokalisierbar. Die Meldungstexte wurden nun vom Programmcode getrennt, so dass für jede Sprache separate Message Sets präpariert werden können. Aktuell werden Englisch, Spanisch und Deutsch unterstützt. Meldungstexte sind in .nsh Header Dateien mit Dateinamen wie *_enu.nsh oder *_lang_enu.nsh deklariert.

Dieses Paket wird jetzt auf GitHub gehostet. Das Repository ist unter <https://github.com/campg2j003/JAWS-Script-for-Audacity>. Wenn Sie Änderungen an den Skripts veröffentlichen möchten, llesen Sie bitte [CONTRIBUTING.md](CONTRIBUTING.md) im repository.

# Hinweise für Übersetzer
Beachte dass readme.html aus readme.md generiert wird, welche nur im GitHub Repository zu finden ist. Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für weitere Informationen.

Beachte, dass das Skript mit #pragma usePoFile 0 kompiliert wird.

# Credits
- Script Entwicklung: Gary Campbell and Dang Manh Cuong <dangmanhcuong@gmail.com>
- Deutsche Übersetzung: Michael Vogt
- Spanische Übersetzung: Fernando Gregoire
- Vietnamesisches README: Nguyen Hoang Giang, Dang Manh Cuong, and Le Thi Theu
 
# Abschliessende Anmerkungen
Zuletzt wurde dieses Skript mit Audacity 2.1.3 und Audacity 2.2.0 Alpha und Beta entwickelt.  Es wird wahrscheinlich mit allen Jaws Versionen ab 5.0 funktionieren, obschon die Optionen für Audacity in den Jaws Schnelleinstellungen nicht sehr gut aussehen, was nicht getestet wurde (ich erinnere mich daran, dass eine Jaws Funktion die wir verwenden, auf FSDN mit "erfordert Jaws 10 oder neuer" vermerkt ist. Die letzten Programmierarbeiten wurden mit Jaws 17,  18 und 2018 Beta auf einem 64 Bit Notebook mit Windows 10 ausgeführt. Auch wenn Support für frühere Versionen von Jaws angeboten wird, wurde  der aktuelle Code nicht mit diesen getestet. Zum jetzigen Zeitpunkt bieten wir keinen spezifischen Support für Braille an.

Ich bin  interessiert an Feedback zu dem Skript und Vorschlägen zu Verbesserungen, kann jedoch keine Updates versprechen.

# Hier ist der Text der Jaws Hotkey Hilfe

Ansagen der Start Position der Selektion: Alt+ü

Ansagen der Ende Position der Selektion: Alt+Plus Taste (Umlaut Taste)

Fokus zum Eingabefeld der Start oder Ende Position der Selektion platzieren: zwei Mal kurz aufeinander drücken.

Ansagen der Position des Audio Cursors: Alt+Entfernen

Bei aktiviertem PC-Cursor: zwei Mal kurz nacheinander drücken.

Ansagen des aktuellen Selektion Typen (Audacity 2.2.0 und neuer): JAWS Taste+a, p, p

Wählen des Selektion Typen (Audacity 2.2.0 und neuer): JAWSTaste + a,p gefolgt von

Start-Ende: S

Start - Länge: L

Länge - Ende: E

Länge - zentriert: C

Ebenso können die Zifferntasten 1 bis 4 verwendet werden.


Ansagen der Nummern der selektierten Spuren: JAWS Taste+Umschalt+A

Ansagen der Bezeichnung der selektierten Spuren: zwei Mal kurz nacheinander drücken.


Im Spuren Panel und der Selektion Leiste:
 
Audio Vorschau nach der Start Position innerhalb der Selektion: Einfügen+Pfeil Links

Audio Vorschau vor der Ende Position innerhalb der Selektion: JAWS Taste+L

Audio Vorschau vor der Start Position ausserhalb der Selektion: Einfügen+Umschalt+Pfeil Links
 
Audio Vorschau nach der Ende Position ausserhalb der Selektion: Einfügen+Umschalt+Pfeil Rechts


Umschalten zwischen Audio Vorschau und Ansagen der Position nach Bewegen der Position: JAWS Taste+p

Diese Funktion ermöglicht ein rasches Umschalten zwischen der Vorschau und der Ansage nach Positionsänderungen und entspricht den Optionen Ansagen der Position und Audio Vorschau nach Bewegen der Position im Schnelleinstellung Dialog. Im Gegensatz zur Konfiguration im Schnelleinstellungen Dialog hat diese Tastenkombination eine temporäre wirkung und ändert die im Schnelleinstellung Dialog vorgenommene Konfiguration nicht. Nach dem vorübergehenden Wechsel in eine andere Anwendung oder dem Schnelleinstellung Dialog wird die im Schnelleinstellungen Dialog definierte Konfiguration verwendet. 
    
    
Erhöhen der Lautstärke der aktiven Spur: Alt+Umschalt+Pfeil Rauf

Verringern der Lautstärke der aktiven Spur: Alt+Umschalt+Pfeil Runter

Panorama der aktiven Spur nach links Alt+Umschalt+Pfeil Links

Panorama der aktiven Spur nach rechts: Alt+Umschalt+Pfeil Rechts.

Die letzten vier Tastenkombinationen ersetzen die Standard Jaws Skripts der Steuerung des Mauszeigers, wenn der Fokus im Hauptfenster ist. Durch Aktivieren des Jaws Cursors kann die originale Jaws Maussteuerung im Hauptfenster verwendet werden.


Ansagen des Aufnahmepegels: g

Fokus zum Eingabefeld des Aufnahmepegels: zwei Mal kurz nacheinander drücken

Ansagen des Wiedergabepegels: h

Fokus zum Eingabefeld des Wiedergabepegels: zwei Mal kurz nacheinander drücken.


Eine bestimmte Spur aktivieren durch angeben einer Zahl: JAWS Taste+a, g

Die Aktive Spur an eine bestimmte Position verschieben, durch angeben einer Zahl: JAWS Taste+a, m

Die aktive Spur merken: JAWS Taste+a, k

Die zuletzt gemerkte Spur aktivieren: JAWS Taste+a, Umschalt+g

Die zuletzt gemerkte Spur aktivieren und die zuvor aktive Spur merken: JAWS Taste+a, x

Aktive Spur an die zuletzt gemerkte Position verschieben und diese merken: Einfügen+a, Umschalt+m


Tempo ermitteln:

Mit der Tempo Ebene kann das Tempo einer Audio Sequenz ermittelt werden.
 
Hinweis: nach der Initialisierung der Tempo Ebene muss lediglich jeweils die letzte Taste der Tastenkombination Sequenz gedrückt werden, um eine Funktion der Tempo Ebene auszuführen.

- Wiedergabe starten: Einfügen+a, t, Leertaste

- Pro Beat: Einfügen+a, t, Eingabe
 
 - Um das Ermitteln des Tempos abzuschliessen und die Wiedergabe anzuhalten, drücken Sie erneut Einfügen+a, t, Leertaste
 
- Das Tempo wird berechnet, in dem die Dauer zwischen dem ersten Beat und dem letzten Beat durch die Anzahl Beats minus 1 dividiert wird

- Das ermittelte Tempo wird angesagt (in Schlägen pro Minute).

- Erneutes Ansagen des ermittelten Tempos: JAWS Taste+a, t, a

- Kopieren des Tempos in die Zwischenablage: JAWS Taste+a, t, c
 
- Das ermittelte Tempo bleibt verfügbar, bis erneut Einfügen+a, t, Leertaste gedrückt wird

- Drücken Sie abschliessend Escape, um die Tempo Ebene zu verlassen.


Meldungen der Sprachausgabe ein- und ausschalten (muten des Synthesizers): Umschalt+Einfügen+S

Ansagen bestimmter Audacity Prozesse aktivieren / deaktivieren: Steuerung+` (Paragraph Taste)

Hinweis: dies verdoppelt die Ansagen von Audacity Nachrichten in den Jaws Schnelleinstellungen Optionen. Weitere Informationen in what's new.md.


Zur nächsten Werkzeugleiste navigieren, wenn der Fokus in einer Werkzeugleiste ist: Steuerung+Tab

Zur vorherigen Werkzeugleiste navigieren, wenn der Fokus in einer Werkzeugleiste ist: Steuerung+Umschalt+Tab


Transport Status ansagen (Wiedergabe, Aufnahme, Pause, Stop): JAWS Taste+Entfernen


Wechseln zwischen den beiden Listen im Ketten editieren Dialog: F6


Audacity Tastenkombinationen Hilfe: Einfügen+w

Standard Windows Tastenkombinationen Hilfe: Einfügen+w zwei Mal kurz nacheinander


Ändern der Einstellungen der Audacity Skripts:   Einfügen+V.

Alle Optionen der Jaws Skripts für Audacity auf die Standardwerte zurücksetzen: Steuerung+Umschalt+` (Paragraph Taste)


Pause während Wiedergabe / Aufnahme an / aus: wenn die "Eingabetaste unterbricht Wiedergabe / Aufnahme" Option aktiviert ist, bewirkt das Drücken der Eingabe Taste das Senden der Pause Taste. In dieser Konstelation bewirkt Steuerung+Eingabe das Senden der Enter Taste.


Wenn die "Stille Vorschau" aktiviert ist und in einem Effekt Dialog die Vorschau Taste gedrückt wird, wird manchmal die "Stille Vorschau" nicht erwartungsgemäss deaktiviert. Dies führt zu fehlenden Jaws Ansagen beim Wechsel des Fokus. Das kurzzeitige Wechseln zu einer anderen Anwendung behebt das Problem.


In einigen VST-Plugins, wie beispielsweise dem L1V:


Fokus auf die "Preset" Schaltfläche: Alt+P

Um ein existierendes Preset zu laden:
 
Speichern der aktuellen Einstellungen des VST-Plugins als Preset: Alt+S


Um die URL des Jaws Guide für Audacity zu ändern: Steuerung+Umschalt+J



Viel Spass!
