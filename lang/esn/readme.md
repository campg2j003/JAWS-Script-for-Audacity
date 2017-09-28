2017-09-20  Scripts de JAWS para Audacity V2.0 (para versión de los scripts 2.2.0) por Gary Campbell <campg2003@gmail.com> y Dang Manh Cuong <dangmanhcuong@gmail.com>

Este paquete de scripts de JAWS proporciona compatibilidad con Audacity 2.0.0 y posteriores, incluido Audacity 2.2.0.

# Características:
- Combinaciones de teclas para leer comienzo de selección, final o longitud de selección y posición de audio, desde cualquier sitio de la ventana principal.
- Combinaciones de teclas para mover el foco a los controles de rango de selección.
- Muestra ayuda de teclas rápidas de Audacity y de JAWS.
- La Guía de Audacity para usuarios de JAWS, por David Bailes, es accesible desde la ayuda sobre teclas de Audacity (TeclaJAWS+w).
- Lee las áreas de la ventana principal: Barras de herramientas, Panel de pista y Barra de selección, a medida que el foco se mueve entre éstas.
- Al mover el foco de una barra de herramientas a otra, lee el nombre de la barra de herramientas.
- Cuando el foco está en las barras de herramientas, al pulsar CTRL+TAB y Shift+CTRL+TAB se mueve, respectivamente, al primer control de la barra de herramientas siguiente y al último control de la barra de herramientas anterior.
- Cuando el foco está en el panel de pista y Audacity detenido, se puede configurar que al pulsar las flechas izquierda/derecha se reproduzca una vista previa del audio sobre el que se sitúa el cursor.
- Cuando el foco está en el panel de pista, se puede configurar que al pulsar las flechas izquierda y derecha se lea la posición del cursor.
- Las combinaciones de teclas que extienden o contraen la selección se pueden configurar para que verbalicen la posición nueva o reproduzcan una vista previa del audio.
- Indica cuando no hay pistas en el proyecto para muchas operaciones.
- Se proporcionan combinaciones de teclas para verbalizar el valor (de pico máximo) de los medidores de grabación y reproducción.
- Cuando está activo el cursor del PC y el foco se encuentra en la ventana principal, los controles de ganancia y posicionamiento de las pistas se pasan a la aplicación. De lo contrario, ejecutan sus funciones predeterminadas para mover el ratón.
- En muchos plugins VST, hay combinaciones de teclas que mueven el foco al control de Predefiniciones y activan los pertinentes para Guardar/Cargar predefiniciones.
- Se verbalizan los nombres y valores de controles en los diálogos de muchos plugins.  
- Compatibilidad con varios idiomas: se admiten alemán, español e inglés. Además de ésta al español por Fernando Gregoire, hay una traducción del archivo LÉAME al vietnamita. Está en el archivo audacity_readme_vi.txt en la carpeta de instalación en la carpeta de archivos de programa.
- En la ventana principal, TeclaJAWS+Shift+FlechaAbajo (SaySelectedText, Verbalizar el Texto Seleccionado) verbaliza los números (o los nombres si se pulsa dos veces rápidamente) de las pistas seleccionadas.
- Puede ir a una pista por su número. También puede mover una pista a una posición específica por un número. También puede fijar una "marca" en una pista y volver allí más tarde, o mover una pista allí.
- Al mover una pista mediante el teclado se proporciona respuesta de voz. (Consulte más abajo).
- El instalador ahora puede instalar para el usuario actual o para todos los usuarios. Las instalaciones para todos los usuarios pueden realizarse en la carpeta de scripts compartida, aun para JAWS 17.
- Cuando se graba o reproduce, la tecla ENTER ejecuta pausa/reanudar. En este caso, presionar CTRL+ENTER envía ENTER. Esto me gusta porque, si no está con las manos en el teclado, la tecla ENTER del teclado numérico es más fácil de encontrar que "p". Se puede desactivar con una opción en Ajuste de opciones de JAWS. Pruébelo y háganos saber si le funciona y le gusta.  

# Instalación y desinstalación de los scripts

## Para instalar:

1. Coloque el instalador en una carpeta de la máquina.
2. Ejecútelo para instalar los archivos.

Se admiten tres tipos de instalación:

- Sólo scripts: instala los scripts, pero no instala ninguna información de desinstalación ni crea una carpeta en %ProgramFiles%.
- Completa: instala los scripts en la carpeta de scripts para las versiones/idiomas seleccionados, crea una carpeta en `%programfiles%` (`%localappdata%` en instalaciones para el usuario actual) (la carpeta de instalación) que contiene un desinstalador y archivos adicionales opcionales como LÉAME, etc.
- Personalizada: como Completa, pero permite instalar el código fuente del instalador.

En instalaciones completas o personalizadas para todos los usuarios, los archivos del desinstalador y el LÉAME se instalan en la carpeta de instalación. 

Si elige el tipo de instalación Sólo Scripts, los archivos LÉAME y What's New (novedades) se instalarán en la carpeta de scripts de JAWS de cada versión, y `What's new.md` se llamará `audacity_whatsnew.md`.  (El archivo LÉAME en vietnamita no se instalará en una instalación Sólo Scripts.)

La página Versiones/Idiomas muestra una lista de las versiones e idiomas de JAWS instalados en la máquina. Para verificar las versiones de JAWS en que desea instalar, pulse `ESPACIO`. Compilará el paquete de scripts para cada versión de JAWS. Observe que los scripts sólo se compilarán correctamente en el idioma en que se esté ejecutando JAWS.

Si los privilegios del usuario permiten instalar para todos los usuarios, se realiza una instalación para todos los usuarios. De lo contrario, se realiza una instalación para el usuario actual. Si los privilegios permiten instalar para todos los usuarios, puede forzarse una instalación para el usuario actual añadiendo el conmutador de línea de comandos `/currentuser`.

En instalaciones para todos los usuarios, en la página Versiones/Idiomas puede elegir si instalar los scripts para todos los usuarios o para el usuario actual.  

Si desea modificar el instalador o simplemente tiene curiosidad de cómo funciona, puede instalar el código fuente del instalador seleccionando el tipo de instalación Personalizada y eligiendo instalar el componente código fuente del Instalador.

##Para desinstalar:
El paquete se puede desinstalar mediante Programas y Características (Agregar o Quitar Programas). También puede ejecutar `uninst.exe` en la carpeta de instalación (`%programfiles(x86)%\Jaws Script for Audacity` o `%localappdata%\Jaws Script for Audacity`).

Si el desinstalador detecta que los archivos de scripts se modificaron desde que se instalaron, pide confirmación antes de quitarlos. Responder Sí eliminará todos los archivos modificados. Responder No los dejará todos. El archivo de configuración (`audacity.jcf` o `audacity.jsi`) no se quita.

# Uso de los scripts

Nota: Los scripts verbalizan nombres ante algunas combinaciones de teclas de Audacity y utilizan otras para la ejecución de algunas operaciones. Si reasigna estas teclas en Preferencias de Audacity > Teclado, también debe cambiar sus asignaciones en `audacity.jkm` si desea que los scripts sigan funcionando correctamente. Algunas características de los scripts podrían no funcionar con el conjunto de teclas predeterminado.

## Lo básico
Una vez se instalen, la primera vez que Audacity obtenga el foco los scripts verbalizarán un mensaje de bienvenida. Puede examinar la lista de combinaciones de teclas que proporcionan los scripts pulsando `TeclaJAWS+h` (`HotKeyHelp`, Ayuda de Teclas Rápidas). Puede obtener una lista de combinaciones de teclas de Audacity pulsando `TeclaJAWS+w`. Esta página también tiene un enlace que abrirá la Guía de Audacity para usuarios de JAWS, por David Bailes, en su navegador web.

Puede leer los campos Comienzo de selección y Final/Longitud de selección pulsando respectivamente `Alt+`` y `Alt++`. Pulsando estas teclas dos veces rápidamente moverá el foco a los campos. Observe que, en versiones de Audacity anteriores a la 2.2.0, `Alt++` verbaliza "final" o "longitud" en función de la configuración de los botones de opción de la barra de selección.
Cuando está activo el cursor del PC, pulsar `Alt+SUPR` verbaliza el valor del campo Posición de audio. (Es útil mientras se graba o reproduce). Al pulsarse dos veces rápidamente, se ejecuta la función normal de JAWS.
Pulsar `TeclaJAWS+SUPR` anuncia el estado en que se encuentra Audacity actualmente-- detenido, reproduciendo, reproducción pausada, grabando o grabación pausada. (En versiones recientes de Audacity esta información también está disponible en la barra de estado.)

En Audacity 2.2.0, los botones de opción Final/Longitud en la barra de selección se reemplazaron por un cuadro combinado que añade opciones adicionales. Hay teclas para leer y configurar este control. Todas empiezan con el comando por niveles `TeclaJAWS+a, p`. Luego pulse alguna de estas teclas:

- `c` o `1`: establecer comienzo/final
- `l` o `2`: establecer comienzo/longitud
- `f` o `3`: establecer longitud/final
- `e` o `4`: establecer longitud/centro
- `p`: verbalizar configuración actual
- `?`: verbalizar un mensaje de ayuda para este nivel.

`Alt+``` verbaliza el valor que se lista primero y `Alt+FlechaDerecha` verbaliza el segundo. Después de `?` puede pulsar cualquiera de estas teclas sin tener que repetir el comando para activar el nivel.

Puede obtenerse la versión de los scripts pulsando `TeclaJAWS+CONTROL+V` (dos veces rápidamente para mostrarla en el visualizador virtual), y también aparece en la ayuda de teclas rápidas de JAWS.

La URL para tener acceso a la Guía de Audacity para usuarios de JAWS se puede modificar mediante los scripts pulsando `Control+Shift+j`. Esto abre un diálogo que contiene un cuadro de edición con la URL. Actualícela o reemplácela y presione Aceptar.

Al introducir una etiqueta en una pista de etiqueta, JAWS suele verbalizar las funciones de Audacity para letras aun cuando las letras se introducen en la etiqueta. Ahora si utiliza los métodos estándar para crear etiquetas suprimimos este comportamiento. Esta característica se activa con las combinaciones de teclas `Control+b` y `Control+m`, y se desactiva al pulsar `ENTER. (Se desactiva asimismo si se desplaza con las flechas a otra pista o si el foco se mueve fuera del panel de pista.) No se activará si se desplaza a la pista de etiqueta con las flechas y empieza a escribir.  Si cambia las asignaciones de tecla estándar para estos comandos, también tendrá que cambiar `audacity.jkm`en concordancia.

Cuando el foco está en una pista de etiqueta, al pulsar `TAB` se intentará verbalizar la etiqueta "actual". Esto se hace buscando texto con un fondo blanco.    Esto no siempre funciona, particularmente con un montón de etiquetas. (En versiones de Audacity recientes funcionan mejor `Alt+FlechasIzquierda/Derecha`.)

## Vista previa de audio
Puede configurar los scripts para reproducir audio después de los comandos de movimiento del cursor. Para esto hay dos opciones de interés en Configuración Rápida. Anunciar Posición controla si los comandos de movimiento del cursor verbalizan o no las posiciones del cursor. Si se activa Vista Previa de Movimiento, se ejecuta un comando Vista Previa (`Shift+F6` para la posición inicial y `Shift+F7` para la final) luego de la tecla de cursor. Esto le permite oír una parte del audio al comienzo y al final de la selección. Observe que es probable que la longitud de este audio sea mayor a la del audio sobre el que mueva el cursor. Puede conmutar temporalmente entre verbalizar la posición y reproducir el audio con `TeclaJAWS+p`. Si se abre Configuración Rápida o Audacity deja de tener el foco, las configuraciones volverán al valor especificado en la configuración rápida.

Cuando se está en los campos de posición del comienzo/final de la selección, `Shift+FlechaArriba` y `Shift+FlechaAbajo` aumentan y disminuyen el número en silencio y reproducen una vista previa.

Hay varias teclas que ejecutan las de vista previa y a las que es más cómodo llegar. En el panel de pista y la barra de selección, `TeclaJAWS+FlechaIzquierda` ejecuta `Shift+F6` y `TeclaJAWS+FlechaDerecha` ejecuta `Shift+F7`. Éstas reproducen el comienzo y final de la selección (dentro de la selección). Añadir Shift reproduce justo antes y después (fuera) de la selección.

El nivel de `TeclaJAWS+a,c` (corto) también ejecuta las teclas de vista previa. Puede ser útil en portátiles en que para ejecutar las teclas de función es necesario que mantenga pulsada la tecla `FN`. Una vez que active el nivel, `j`, `k`, `l` y `ñ` ejecutan de `Shift+F5` a `Shift+F8`. `Control+j` ejecuta `Control+Shift+F5` y `Control+l` ejecuta `Control+Shift+F7`. Este nivel también ejecuta las flechas izquierda/derecha, con Shift y `Shift+Control` flechas izquierda/derecha, `SayCharacter` (Verbalizar Carácter), `SayWord` (Verbalizar Palabra), `SayLine` (Verbalizar Línea) y `c`. `?` verbaliza ayuda para el nivel. Una vez que active este nivel, puede pulsar cualquiera de estas teclas sin pulsar las iniciales del nivel. Pulsar `ESC` o cualquier tecla que no esté en el nivel sale del mismo.

## Opciones de los scripts

Los scripts poseen varias opciones que controlan algunas de sus características, a las cuales se puede acceder pulsando TeclaJAWS+v. En versiones de JAWS anteriores a la 13 estas opciones se almacenan en el archivo audacity.jsi en la carpeta PersonalizedSettings de la instalación de JAWS. En versiones posteriores a la 13 se almacenan en audacity.jcf, en la sección NonJCFOptions. Si actualiza desde una versión de JAWS anterior a la 13 a la 13 o posterior la configuración de audacity.jsi no se transfiere, de modo que tendrá que volver a establecerla.

## Ir a pistas y moverlas.

Es posible moverse a una pista por su número, mover una pista a una posición específica por un número y recordar la posición de una pista para regresar allí más tarde, o para mover una pista allí. Asimismo, si mueve una pista con el teclado se brinda respuesta de voz. Esta característica sólo funciona en Audacity 2.1.1 y posterior, y para funcionar requiere cierta configuración en Audacity. Debe asignar el comando de Audacity Mover la Pista Activa hacia Arriba a Control+Shift+FlechaArriba y Mover la Pista Activa hacia Abajo a Control+Shift+FlechaAbajo. Para hacerlo:

1. En Audacity abra Preferencias (CTRL+p) y vaya a la categoría Teclado (pulse t).
2. Tabule al cuadro de edición y escriba "mover activa" (yo uso la presentación en árbol).
3. Tabule a la presentación en árbol y busque Mover la pista activa abajo.
4. Presione TAB hasta el campo atajo y pulse Control+Shift+FlechaAbajo.
5. Presione TAB hasta el botón Establecer y pulse ESPACIO para activarlo.
6. Pulse Shift+TAB dos veces para regresar a la presentación en árbol.
7. Busque el comando Mover la pista activa arriba y asígnele Control+Shift+FlechaArriba del mismo modo.
8. Tabule hasta Aceptar y pulse la BARRA ESPACIADORA.

Si desea utilizar teclas distintas, tendrá que cambiar las asignaciones en audacity.jkm.

Una vez configuradas, puede ir a una pista pulsando `TeclaJAWS+a,i`. Los scripts solicitan un número. Puede escribir un número para ir a dicha pista. Prefije el número con `+` para desplazarse hacia abajo (a números de pista más altos) esa cantidad de pistas, o `-` para desplazarse hacia arriba. Puede mover una pista con `TeclaJAWS+a,m`. Puede marcar la pista actual con `TeclaJAWS+a,k`. Luego puede volver a la pista marcada con `TeclaJAWS+a,Shift+i` y mover la pista actual a la posición marcada con `TeclaJAWS+a,Shift+m`. Observe que esta marca tan sólo recuerda el número de una pista, de modo que, si añade o elimina pistas arriba de ésta, señalará a una pista errónea. `SayLine` (`TeclaJAWS+8TeclNum`) verbaliza, cuando el foco está en el panel de pista, el número de la pista actual y el número total de pistas. (Algunos podrían pensar, "Pero Audacity ya verbaliza los números de las pistas". Lo hace cuando crean una pista, pero no si la renombran o si resulta de haber importado un archivo.)

## Determinación del tempo
El nivel de `TeclaJAWS+a,t` le permite determinar el tempo pulsando al ritmo de la música. Para hacerlo, muévase al comienzo del audio. Acto seguido pulse `TeclaJAWS+a,t,ESPACIO`. Audacity inicia la reproducción. Mientras tanto, presione `ENTER` por cada pulsación. Cuando vuelva a pulsar `ESPACIO`, se verbaliza el tempo en pulsaciones por minuto. `a` lo vuelve a verbalizar. `c` lo copia al portapapeles. El valor del tempo se mantiene hasta la próxima vez que se pulse `ESPACIO` en el nivel tempo. Esta característica se basa en una similar del complemento para NVDA por Robert Hänggi, aunque el algoritmo es un tanto diferente.

Nota: Hay otra implementación de esta característica que se asemeja más al algoritmo en NVDA, pero requiere JAWS 11 update 1. Para activarla, ejecute Audacity y abra el Asistente de Scripts pulsando `TeclaJAWS+0` (en la fila de números de las teclas para escribir). Puede ubicar las secciones relevantes buscando "JAWS 11". Tiene que descomentar dos secciones y comentar otra. Para descomentar una sección, coloque un punto y coma (;) justo antes de `/*` y `*/` al principio y al final de la sección. Para comentar una sección, borre el punto y coma anterior a sus marcadores `/*` y `*/`. Luego pulse `Control+g` para guardar y compilar los scripts.

# Problemas:

1.  Esta versión añade la capacidad de silenciar en la vista previa de efectos como Amplificar. A veces esto no se desactiva. Si sucede esto, conmutar el foco a un sitio distinto que Audacity y volver lo desactivará.

2.  Los campos de posición a veces no se acortan. Esto sucede porque la función de JAWS GetWindowText devuelve tan sólo los números sin h, m, :, etc. No sabemos lo que lo provoca. He podido corregirlo saliendo de Audacity y reiniciándolo. Esto se observó con JAWS 10, 15,  16, 17 y 18. He observado que a veces este problema se va por sí solo.

3.  Si está activada la característica "Enter pausa al reproducir/grabar" (que es lo predeterminado), `ENTER` no seleccionará o deseleccionará la pista actual mientras reproduzca o grabe. En este caso, utilice `Control+ENTER` en lugar de `ENTER`.

4.  Si redefine la tecla ENTER del teclado numérico y configura JAWS para tratar las teclas del teclado extendido por separado, ambas teclas ENTER se asignarán a la tecla ENTER para escribir. Si esta característica no le gusta, la puede desactivar agregando un punto y coma en las líneas para ENTER, NumPadEnter y Control+ENTER en audacity.jkm, y quitando los punto y comas en las líneas que contienen /* y */ antes y después de los scripts Enter y CtrlEnter en audacity.jss. Si modifica `audacity.jss`, por favor cambie la fecha en la constante version, a fin de que si se comunica con nosotros al respecto sepamos que se trata de una versión modificada.

5.  El compilador de scripts de JAWS sólo compila para el idioma en que se está ejecutando actualmente. (Consulte más abajo.)

6.  En versiones de JAWS anteriores a la 13, la combinación de teclas para configurar las opciones de los scripts (`TeclaJAWS+v`) no aparecerá en la ayuda de teclas rápidas. No obstante, seguirá funcionando. Si aquello se torna un problema, podríamos mitigarlo a través de scripting.


# Compatibilidad con Varios Idiomas
Esta versión del framework del instalador contiene compatibilidad con varios idiomas. Ahora trata los pares versión/idioma como anteriormente trataba las versiones, con lo que ahora la presentación en lista de selección de versiones muestra entradas como 16.0/esn. Actualmente se admiten alemán, español e inglés.

Aunque el instalador instala y compila los scripts en las carpetas de los idiomas seleccionados, el compilador de scripts de JAWS siempre compila los archivos de scripts en el idioma en que se está ejecutando la versión actual de JAWS. Por lo tanto, después de instalar tendrá que ejecutar JAWS en cada uno de los otros idiomas y compilar los scripts.

# Notas para desarrolladores de scripts
Si modifica los archivos de scripts, por favor actualice la constante version cerca del principio de `audacity.jss`. Es particularmente importante si distribuye los scripts. Aun si tan sólo los modifica para su propio uso, esto asegurará que si se comunica con nosotros al respecto sepamos que se trata de una versión modificada.

Los mensajes y constantes de cadenas de los scripts de JAWS para Audacity están en `audacity.jsm` y `audacity.qsm`. Observe que, a partir de la versión 2.2.0, los archivos de mensajes deben tener codificación UTF-8.

Ahora los mensajes del instalador son traducibles. Ahora el texto de los mensajes se ha separado del código del instalador, de modo que se puedan preparar conjuntos de mensajes para cada idioma. Actualmente se admiten alemán, español e inglés. Los mensajes están en archivos de cabeceras `.nsh` con nombres como `*_esn.nsh` o `*_lang_esn.nsh`. Estos archivos también deben tener codificación UTF-8. Para compilar el instalador se requieren NSIS 3.0 o posterior.

Este paquete ahora se hospeda en GitHub. El repositorio está en <https://github.com/campg2j003/JAWS-Script-for-Audacity>. Si quiere colaborar con cambios en los scripts, por favor consulte [CONTRIBUTING.md](https://github.com/campg2j003/JAWS-Script-for-Audacity/blob/master/CONTRIBUTING.md) en el repositorio.

# Notas para traductores
Observe que `readme.html` se genera desde `readme.md`, que sólo está disponible a través del repositorio en GitHub. Para más información, consulte [CONTRIBUTING.md](CONTRIBUTING.md).

# Créditos
- Codificación de los scripts: Gary Campbell y Dang Manh Cuong <dangmanhcuong@gmail.com>
- Traducción al alemán: Michael Vogt
- Traducción al español: Fernando Gregoire
- LÉAME en vietnamita: Nguyen Hoang Giang, Dang Manh Cuong y Le Thi Theu

# Conclusión
El desarrollo reciente de los scripts se realizó con Audacity 2.1.3 y versiones alfa y beta de 2.2.0. Probablemente funcionará con cualquier JAWS posterior al 5.0, aunque puede que las opciones de Audacity en Ajuste de la Cantidad de Información de JAWS no se vean muy bien y ello no se ha probado. (Recuerdo que una de las funciones de JAWS que utilizamos se marcó en el FSDN como que requiere JAWS 10.) El desarrollo reciente se ha hecho con JAWS 17, 18 y 2018 beta (compilación 1708.29) en un portátil de 64 bits que ejecuta Windows 10. Aunque la compatibilidad con versiones de JAWS anteriores permanece, el código actual no se ha probado con éstas. Por el momento no hay compatibilidad específica con braille.

Me interesarían comentarios sobre los scripts y sugerencias de mejoras, pero no puedo prometer ninguna actualización.

# Aquí va el texto de la ayuda de teclas rápidas de JAWS:

```
Para verbalizar la posición inicial de la selección, pulse Alt+AcentoGrave.
Para verbalizar la posición final de la selección, pulse Alt+Más.
Para mover el foco a estos controles, pulse la tecla dos veces rápidamente.
Para verbalizar el valor de posición del audio, pulse Alt+Suprimir.
Para verbalizar el cursor activo mientras esté activo el del PC, pulse Alt+Suprimir dos veces rápidamente.
Para verbalizar el tipo de selección actual (Audacity 2.2.0 y posteriores), pulse Tecla JAWS+a, p, p.
Para establecer el tipo de selección (Audacity 2.2.0 y posteriores), pulse TeclaJAWS+a,p seguido de c (comienzo-final), l (final-longitud), f (longitud-final)
o e (longitud-centro). También puede utilizar los números 1-4.
Para verbalizar en la ventana principal los números de las pistas seleccionadas, pulse Mayúscula+Insert+ExtendedDownArrow. Para verbalizar los nombres de
las pistas, pulse dos veces rápidamente.

Para previsualizar en el panel de pista y la barra de selección el audio posterior (perteneciente) al comienzo de la selección, pulse Tecla JAWS+Flecha
Izquierda
Para previsualizar en el panel de pista y la barra de selección el audio anterior (perteneciente) al final de la selección, pulse Tecla JAWS+Flecha Derecha
Para previsualizar en el panel de pista y la barra de selección el audio anterior (no perteneciente) al comienzo de la selección, pulse Control+Mayúscula+ExtendedLeftArrow
Para previsualizar en el panel de pista y la barra de selección el audio posterior (no perteneciente) al final de la selección, pulse Tecla JAWS+Mayúscula+Flecha
Derecha

Para conmutar entre reproducción de audio y verbalización de posición ante los comandos de movimiento del cursor, pulse .
Esto es igual que activar la Vista Previa de Movimiento y desactivar Anunciar Posición, o bien, desactivar la Vista Previa de Movimiento y activar Anunciar
Posición. Así, puede conmutar rápidamente entre oír la posición del cursor u oír el audio. Este cambio es temporal. No cambia el valor guardado de estas
configuraciones, con lo cual éstas se restablecerán a los valores que haya establecido en Configuración Rápida cuando abra este diálogo o cambie el foco
desde Audacity a otra aplicación.

Para aumentar la ganancia de la pista activa, pulse Alt+Mayúscula+Flecha Arriba.
Para reducir la ganancia de la pista activa, pulse Alt+Mayúscula+Flecha Abajo.
Para ajustar el posicionamiento estéreo hacia la izquierda, pulse Alt+Mayúscula+Flecha Izquierda.
Para ajustar el posicionamiento estéreo hacia la derecha, pulse Alt+Mayúscula+Flecha Derecha.
Mientras el foco está en la ventana principal, las cuatro últimas teclas reemplazan los scripts de JAWS predeterminados para mover el ratón. Si desea activar
la funcionalidad original mientras esté en la ventana principal, active el cursor de JAWS.

Para verbalizar el valor del medidor de grabación, pulse g.
 Pulse dos veces rápidamente para mover el foco al medidor.
Para verbalizar el valor del medidor de reproducción, pulse h.
 Pulse dos veces rápidamente para mover el foco al medidor.

Para ir a una pista por su número, pulse Tecla JAWS+a, i.
Para mover la pista actual a una posición de pista por su número, pulse Tecla JAWS+a, m.
Para marcar la pista actual, pulse Tecla JAWS+a, k.
Para ir a la pista marcada, pulse Insert+a, Mayúscula+i.
Para ir a la pista marcada y marcar la pista de partida, pulse Tecla JAWS+a, x.
Para mover la pista actual a la posición de la pista marcada y fijar la marca en la pista actual, pulse Insert+a, Mayúscula+m.

Para averiguar el tempo, pulse Insert+a, t, Espacio. Comienza la reproducción. Acto seguido pulse Insert+a, t, Enter por cada pulsación. (Una vez que ha
ingresado al nivel Tempo, sólo tiene que pulsar la última tecla de la secuencia de cualquier comando de aquél.)
Cuando haya terminado, vuelva a pulsar Insert+a, t, Espacio. Se detiene la reproducción y se anuncia el tempo en pulsaciones por minuto.
Luego puede pulsar Tecla JAWS+a, t, a para volver a verbalizar el tempo, o Tecla JAWS+a, t, c para copiarlo al portapapeles. El valor se mantendrá hasta
que vuelva a pulsarse Insert+a, t, Espacio. Para evitar confusión, es buena idea que al terminar con el nivel Tempo pulse ESC.
El tempo se calcula dividiendo el tiempo de la última pulsación menos el tiempo de la primera por la cantidad de pulsaciones menos 1.

Para activar o desactivar la voz, pulse Mayúscula+Insert+S.
Para activar o desactivar los mensajes de aviso, pulse Control+OrdinalMasculino).  Esto duplica la opción Anunciar los mensajes de Audacity que se encuentra
en Ajuste de opciones de JAWS.
Para más info, consulte el archivo what's new.md.

En una barra de herramientas, pulse Control+Tab para moverse a la siguiente
En una barra de herramientas, pulse Control+Mayúscula+Tab para moverse a la anterior

Para leer el estado del programa (reproduciendo/pausado/grabando/detenido), pulse Tecla JAWS+Suprimir

Para conmutar entre las dos listas del diálogo Editar secuencias de comandos, pulse F6.

Para obtener ayuda sobre las teclas rápidas de Audacity, pulse Insert+w.
Para obtener la ayuda predeterminada sobre teclas rápidas de Windows, pulse Insert+w dos veces rápidamente.


En algunos plugins VST comunes, como L1V:
Para llevar el foco al control de predefinidos, pulse Alt+P.
Para cargar una predefinición existente, pulse Alt+C.
Para guardar la configuración actual como predefinición, pulse Alt+G.

Para cambiar la configuración de los scripts para Audacity, pulse   Tecla JAWS+V.
Para restablecer todas las opciones de los scripts a los valores predeterminados, pulse Mayúscula+Control+`
Si está activada la opción "ENTER pausa al reproducir/grabar", al pulsar Enter en tanto se reproduce o graba, se envía la tecla Pausa. Para ejecutar ENTER
en esta situación, utilice Control+Enter.
Si Silenciar en Vista Previa está activado y aprieta el botón Vista Previa de un efecto, a veces el silencio resultante de la vista previa no se desactiva.
Esto provocará pérdida de la respuesta de voz como consecuencia de cambios del foco. Puede corregirlo cambiando a un sitio diferente de Audacity y volviendo
después.

Para cambiar la URL de la Guía de JAWS para Audacity, pulse Mayúscula+Control+J ```

¡Disfrute!
