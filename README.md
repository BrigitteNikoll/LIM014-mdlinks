# Markdown Links
Es una librería que permite leer y analizar archivos en formato markdown para verificar los links que contenga el archivo y poder validar su estado. 

## 1. Diagrama de Flujo
Para poder implementar esta librería, se realizaron 2 diagramas de flujo para cada módulo.

### API
![Api]

### CLI (Command Line Interface - Interfaz de Línea de Comando)
![Cli]

## 2. Instalación
Se puede instalar la libreríade la siguiente manera:
npm install md-links-lrc.

## 3. Modo de Uso 
* md-links path --validate
![validate]

* md-links path --stats
![stats]

* md-links path --validate --stats
![validate y stats]

Si se ingresa una ruta errónea, entonces saldría en la consola el siguiente mensaje:

![fai]
