14/11/2015  Scripts de JAWS para Audacity V2.0 (para versión de los scripts 2.0 6/10/15  22:55UTC) por Gary Campbell <campg2003@gmail.com> and Dang Manh Cuong <dangmanhcuong@gmail.com>

Este paquete de scripts de JAWS proporciona compatibilidad con Audacity 2.0.0 y posterior.

Características:
Combinaciones de teclas para leer comienzo de selección, final o longitud de selección y posición de audio, desde cualquier sitio de la ventana principal.
Combinaciones de teclas para mover el foco a los controles comienzo de selección y final/longitud de selección.
Muestra ayuda de teclas rápidas de Audacity y de JAWS.
La Guía de Audacity para usuarios de JAWS, por David Bailes, es accesible desde la ayuda sobre teclas de Audacity (TeclaJAWS+w).
Lee las áreas de la ventana principal: Barras de herramientas, Panel de pista y Barra de selección, a medida que el foco se mueve entre éstas.
Al mover el foco de una barra de herramientas a otra, lee el nombre de la barra de herramientas.
Cuando el foco está en las barras de herramientas, al pulsar CTRL+TAB y Shift+CTRL+TAB se mueve respectivamente al primer control de la barra de herramientas siguiente y al último control de la barra de herramientas anterior.
TeclaJAWS+Suprimir lee el estado actual del programa: detenido, reproduciendo, reproducción pausada, grabando o grabación pausada.
Cuando Audacity está detenido y el foco se encuentra en el panel de pista, al pulsar las flechas izquierda y derecha lee la posición del cursor.
Indica cuando no hay ningún proyecto abierto (no hay pistas en el panel de pista) para muchas operaciones.
Cuando está activo el cursor del PC y el foco se encuentra en la ventana principal, los controles de ganancia y posicionamiento de las pistas ahora se pasan a la aplicación. De lo contrario, ejecutan sus funciones predeterminadas para mover el ratón.
Las combinaciones de teclas que extienden o contraen la selección leen la posición (o longitud) nueva.
En muchos plugins VST, hay combinaciones de teclas que mueven el foco al control de Predefiniciones y activan los pertinentes para Guardar/Cargar predefiniciones.
Se leen los nombres y valores de controles en los diálogos de muchos plugins.  
Además de ésta al español por Fernando Gregoire, hay una traducción del archivo LÉAME al vietnamita. Gracias a Nguyen Hoang Giang por proporcionarla.  Está en el archivo audacity_readme_vi.txt en la carpeta de instalación dentro de la carpeta de archivos de programa.
Puede ir a una pista por su número. También puede mover una pista a una posición específica por un número. También puede fijar una "marca" en una pista y volver allí más tarde, o move o una pista allí.
Al mover una pista mediante el teclado se proporciona respuesta de voz. (Consulte más abajo).
El instalador ahora admite varios idiomas.

Cuando se graba o reproduce, la tecla ENTER ejecuta pausa/reanudar. En este caso, presionar CTRL+ENTER envía ENTER. Esto me gusta porque, si no está con las manos en el teclado, la tecla ENTER es más fácil de encontrar que "p". Esto se puede desactivar con una opción en Ajuste de opciones de JAWS. Pruébelo y háganos saber si le funciona y le gusta.  

Se puede obtener la versión de los scripts pulsando TeclaJAWS+CTRL+V (dos veces rápidamente para mostrarla en el visualizador virtual) y también aparece en la ayuda de teclas rápidas de JAWS.

La URL para acceder a la Guía de Audacity para usuarios de JAWS se puede modificar mediante los scripts pulsando Control+Shift+j. Esto abre un diálogo que contiene un cuadro de edición con la URL. Actualícela o reemplácela y pulse Aceptar.

Para instalar: 
Coloque el instalador en una carpeta de su máquina.
Ejecútelo para instalar los archivos. También le permite elegir dentro de qué versiones de JAWS instalar y si instalar para el usuario actual o todos los usuarios. Si elige el tipo de instalación completa, podrá quitarla desde Agregar o Quitar Programas y creará una carpeta en la carpeta Archivos de programa (Program Files) para almacenar el desinstalador. Si elige el tipo de instalación Sólo Scripts, no será quitable desde Agregar o Quitar Programas, no creará ninguna carpeta en la carpeta Archivos de programa (Program Files) ni entradas del registro.  
Si elige el tipo de instalación Sólo Scripts, los archivos LÉAME y Novedades se instalarán en la carpeta de scripts de JAWS de cada versión, y What's new.txt se llamará audacity_whatsnew.txt. (En una instalación de Sólo Scripts el archivo LÉAME en vietnamita no se instalará).
El instalador compilará el paquete de scripts en cada versión de JAWS.
Si desea modificar el instalador o simplemente tiene curiosidad de cómo funciona, puede instalar el código fuente del instalador seleccionando el tipo de instalación Personalizada y eligiendo el componente Instalar código fuente del Instalador.


Los scripts poseen varias opciones que controlan algunas de sus características, a las cuales se puede acceder pulsando TeclaJAWS+v. En versiones de JAWS anteriores a la 13 estas opciones se almacenan en el archivo audacity.jsi en la carpeta PersonalizedSettings de la instalación de JAWS. En versiones posteriores a la 13 se almacenan en audacity.jcf, en la sección NonJCFOptions. Si actualiza desde una versión de JAWS anterior a la 13 a la 13 o posterior la configuración de audacity.jsi no se transfiere, de modo que tendrá que volver a establecerla.


Ir a pistas y moverlas.
Es posible moverse a una pista por su número, mover una pista a una posición específica por un número y recordar la posición de una pista para regresar allí más tarde, o para mover una pista allí. Asimismo, si mueve una pista con el teclado se brinda respuesta de voz. Esta característica sólo funciona en Audacity 2.1.1 y posterior, y para funcionar requiere cierta configuración en Audacity. Debe asignar el comando de Audacity Mover la Pista Activa hacia Arriba a Control+Shift+FlechaArriba y Mover la Pista Activa hacia Abajo a Control+Shift+FlechaAbajo. Para hacerlo:
1. En Audacity abra Preferencias (CTRL+p) y vaya a la categoría Teclado (pulse t).
2. Tabule al cuadro de edición y escriba "mover activa" (usando la presentación en árbol).
3. Tabule a la presentación en árbol y busque Mover la pista activa hacia abajo.
4. Presione TAB hasta el campo atajo y pulse Control+Shift+FlechaAbajo.
5. Presione TAB hasta el botón Establecer y pulse ESPACIO para activarlo.
6. Pulse Shift+TAB dos veces para regresar a la presentación en árbol.
7. Busque el comando Mover la pista activa hacia arriba y asígnele Control+Shift+FlechaArriba del mismo modo.
8. Tabule hasta Aceptar y pulse la BARRA ESPACIADORA.

Si desea utilizar teclas distintas, tendrá que cambiar las asignaciones en audacity.jkm.

Esta versión del framework del instalador contiene el primer esbozo de compatibilidad con varios idiomas. Ahora trata los pares versión/idioma como anteriormente trataba las versiones, con lo que ahora la presentación en lista de selección de versiones ahora muestra entradas como 16.0/enu. Actualmente se admiten inglés y español. Tenga en cuenta que actualmente la estructura de traducción de JAWS 17 se desconoce y, por lo tanto, es probable que no se admita.


Problemas:

Esta versión agrega la capacidad de silenciar en la vista previa de efectos como Amplificar. A veces esto no se desactiva. Si sucede esto, conmutar el foco a un sitio distinto que Audacity y volver lo desactivará.

Los campos de posición a veces no se acortan. Esto sucede porque la función de JAWS GetWindowText devuelve tan sólo los números sin h, m, :, etc. No sabemos lo que lo provoca. He podido corregirlo saliendo de Audacity y reiniciándolo. Esto se observó con JAWS 10, 15 y 16.

Un efecto colateral de que ENTER pause al grabar o reproducir es que no puede utilizar ENTER para seleccionar/deseleccionar pistas mientras graba o reproduce. Esto también afecta al ingreso a una etiqueta mientras graba o reproduce. En este caso, la tecla ENTER agrega "p" en la etiqueta en lugar de terminarla. Para enviar ENTER en este caso, utilice Control+ENTER.

Al escribir una etiqueta en una pista de etiqueta, JAWS acostumbra a leer las funciones de Audacity que se efectúan mediante letras, aun cuando las letras se escriben en la etiqueta. Si utiliza métodos estándares para la creación de etiquetas, ahora suprimimos este comportamiento. Esta característica se activa con las combinaciones de teclas Control+b y Control+m y se desactiva al pulsar ENTER. (También se desactiva si se mueve con las flechas a otra pista o el foco se mueve fuera del panel de pista). No se activará si se mueve a la pista de etiqueta con las flechas y comienza a escribir. Si cambia las asignaciones de teclas estándares de estos comandos, también tendrá que cambiar audacity.jkm en concordancia.

Cuando el foco está en una pista de etiqueta, al pulsar TAB se intentará leer la etiqueta "actual". Esto se hace buscando texto en un fondo blanco. Esto está pensado para dar respuesta de voz al tabular a una etiqueta en una pista de etiqueta. No siempre funciona, en especial con un montón de etiquetas. En realidad, esta capacidad está activa en cualquier momento en que el foco se encuentre en el panel de pista.

Si redefine la tecla ENTER del teclado numérico y configura JAWS para tratar las teclas del teclado extendido por separado, ambas teclas ENTER se asignarán a la tecla ENTER para escribir. Si esta característica no le gusta, la puede desactivar agregando un punto y coma en las líneas para ENTER, NumPadEnter y Control+ENTER en audacity.jkm, y quitando los punto y comas en las líneas que contienen /* y */ antes y después de los scripts Enter y CtrlEnter en audacity.jss.  

Los scripts se desarrollaron con Audacity 2.0.3, 2.0.4, 2.0.5, 2.1.0, y 2.1.1 y JAWS 10.0.1178u en Windows XP SP3, y JAWS 13-16 en un portátil que ejecuta Windows 7, 8.1 y 10. Probablemente funcione en cualquier versión de JAWS posterior a la 5.0, aunque puede que las opciones de Audacity en Ajuste de la Cantidad de Información de JAWS no se vean muy bien. El desarrollo reciente se ha hecho con JAWS 16 en Windows 10. Aunque sigue habiendo compatibilidad con versiones de JAWS anteriores, el código actual no se ha probado con éstas. En este momento no hay compatibilidad específica con braille.

Compatibilidad con Varios Idiomas
Los mensajes y constantes de cadenas de los scripts están en audacity.jsm para facilitar la traducción. Fernando Gregoire ha colaborado con una traducción al español. ¡Gracias!

Los mensajes del instalador ahora pueden traducirse. El texto de los mensajes ahora se ha separado del código del instalador, de modo que se puedan preparar conjuntos de mensajes para cada idioma. Los únicos idiomas que se admiten actualmente son inglés y español.

Me interesarían comentarios sobre los scripts y sugerencias de mejoras, pero no puedo prometer ninguna actualización.

Aquí va el texto de la ayuda de teclas rápidas de JAWS:
Combinaciones de teclas de JAWS con scripts versión 2.0 12/05/15  21:15UTC, para Audacity 2.0.0 o posterior:
Para verbalizar la posición inicial de la selección, pulse Alt+AcentoGrave.
Para verbalizar la posición final de la selección o la longitud, pulse Alt+Más.
Para mover el foco a estos controles, pulse la tecla dos veces rápidamente.
Para verbalizar el valor de posición del audio, pulse Alt+Suprimir.
Para verbalizar el cursor activo mientras esté activo el del PC, pulse Alt+Suprimir dos veces rápidamente.
Para aumentar la ganancia de la pista activa, pulse Alt+Mayúscula+Flecha Arriba.
Para reducir la ganancia de la pista activa, pulse Alt+Mayúscula+Flecha Abajo.
Para ajustar el posicionamiento estéreo hacia la izquierda, pulse Alt+Mayúscula+Flecha Izquierda.
Para ajustar el posicionamiento estéreo hacia la derecha, pulse Alt+Mayúscula+Flecha Derecha.
Mientras el foco está en la ventana principal, las cuatro últimas teclas reemplazan los scripts de JAWS predeterminados para mover el ratón. Si desea activar
la funcionalidad original mientras esté en la ventana principal, active el cursor de JAWS.

Para ir a una pista por su número, pulse Tecla JAWS+a, i.
Para mover la pista actual a una posición de pista por su número, pulse Tecla JAWS+a, m.
Para marcar la pista actual, pulse Tecla JAWS+a, k.
Para ir a la pista marcada, pulse Tecla JAWS+a, Mayúscula+i.
Para ir a la pista marcada y marcar la pista de partida, pulse Tecla JAWS+a, x.
Para mover la pista actual a la posición de la pista marcada y fijar la marca en la pista actual, pulse Insert+a, Mayúscula+m.

Para activar o desactivar la voz, pulse Mayúscula+Insert+S.
Para activar o desactivar los mensajes de aviso, pulse Control+`).  Esto duplica la opción Anunciar los mensajes de Audacity que se encuentra en Ajuste
de opciones de JAWS.
Para más info, vea el archivo whats new.txt.
En una barra de herramientas, pulse Control+Tab para moverse a la siguiente
En una barra de herramientas, pulse Control+Mayúscula+Tab para moverse a la anterior
Para leer el estado del programa (reproduciendo/pausado/grabando/detenido), pulse Tecla JAWS+Suprimir
Para restablecer todas las opciones de los scripts a sus valores predeterminados, pulse Mayúscula+Control+`
Para conmutar entre las dos listas del diálogo Editar secuencias de comandos, pulse F6.
Para obtener ayuda sobre las teclas rápidas de Audacity, pulse Insert+w.
Para obtener la ayuda predeterminada sobre teclas rápidas de Windows, pulse Insert+w dos veces rápidamente.

Si está activada la opción "ENTER pausa al reproducir/grabar", al pulsar Enter en tanto se reproduce o graba, se envía la tecla Pausa. Para ejecutar ENTER
en esta situación, utilice Control+Enter.

En algunos plugins VST comunes, como L1V:
Para llevar el foco al control de predefinidos, pulse Alt+P.
Para cargar una predefinición existente, pulse Alt+C.
Para guardar la configuración actual como predefinición, pulse Alt+G.

Si Silenciar en Vista Previa está activado y aprieta el botón Vista Previa de un efecto, a veces el silencio resultante de la vista previa no se desactiva.
Esto provocará pérdida de la respuesta de voz como consecuencia de cambios del foco. Puede corregirlo cambiando a un sitio diferente de Audacity y volviendo
después.

Para cambiar la configuración de los scripts para Audacity, pulse .

Para cambiar la URL de la Guía de JAWS para Audacity, pulse Mayúscula+Control+J

Lista de Teclas rápidas de JAWS
Para cerrar este mensaje, pulse ESCAPE. 

¡Disfrute!
