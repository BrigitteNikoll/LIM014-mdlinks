
//Importar el modulo path
const path = require('path');
//Importar modulo file system
const fs = require("fs");
//Importar una librería
const axios = require('axios');

//Rutas de prueba
const relativePath = 'index.js';
const absolutePath = 'C:\\Users\\Usuario\\LIM014-mdlinks\\index.js';
const directory = 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando';
const fileMD = 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\readme.md';

//REORGANIZANDO

//Función que verifica si la ruta existe (devuelve un boleano)
const isValidRoute = (route) => fs.existsSync(route);
//console.log(isValidRoute(relativePath));

//Función que verifica si la ruta es absoluta (devuelve un boleano)
const pathAbsolute = (route) => path.isAbsolute(route);
//console.log(pathAbsolute(relativePath));

//Función que pasa una ruta relativa a una absoluta (devuelve una ruta absoluta)
const relativeToAbsolute = (route) => path.resolve(route);
//console.log(relativeToAbsolute(relativePath));

//OPCION 1:
//Función que verifica si una ruta es un directorio (devuelve un boleano)
const isDirectory = (route) => fs.statSync(route).isDirectory(); //TESTEADO
//console.log(isDirectory(fileMD));

//Leer el directorio (devuelve un array con los RUTA RELATIVA de archivos encontrados dentro del directorio)
const readDirectory = (route) => fs.readdirSync(route);
//console.log(readDirectory(directory));

//OPCION 2:
//Función que verifica si una ruta es un archivo (devuelve un boleano)
const isFile = (route) => fs.statSync(route).isFile();
//console.log(isFile(absolutePath));

//Leer el archivo (devuelve el texto encontrado en el archivo)
const readFile= (route) => {
  const read = fs.readFileSync(route, {encoding: "utf-8", flag: "r"}); //Indagar
  return read;
};
//console.log("Mírame: " , readFile(fileMD));

//Función que verifica si es un archivo .md (devuelve un buleano)
const isMarkdown = (route) => path.extname(route) === '.md';
//console.log("¿Es un archivo con extensión .md?" , isMarkdown(fileMD));


//Función que obtiene un array de la ruta de los archivos encontrados que tengan extensión .md
const getAllFilesMd = (route) => {
  let arrFiles = [];
  if (isFile(route)) {
    arrFiles.push(route);
  } else {
    readDirectory(route).forEach((file) => {
      const completePath = path.join(route, file);
      const recursive = getAllFilesMd(completePath);
      arrFiles = arrFiles.concat(recursive);
    });
  }
  const mdPath = arrFiles.filter((x) => isMarkdown(x));
  return mdPath;
};
//console.log('Esta es la ruta de los archivos con extensión .md encontrados: ', getAllFilesMd(fileMD));
//console.log('Esta es la ruta de los archivos con extensión .md encontrados en el directorio: ', getAllFilesMd(directory));


//Función para obtener los links de un archivo con extensión .md (href, text, file)
const gettingLinks = (route) => {
  let arrayLinks = [];
  const routeAbsolute = relativeToAbsolute(route);
  //console.log("Esta es la ruta absoluta: ", getAllFilesMd(routeAbsolute));
getAllFilesMd(routeAbsolute).forEach((file) =>{
  //console.log("Este es el archivo revisado: " , file);
    const ussingRegularExpresions = /\[(.*)\]\(((?!#).+)\)/gi;
    //console.log(readFile(file).match(ussingRegularExpresions))
    const showingLinks = readFile(file).match(ussingRegularExpresions)
    //console.log("link:" , link[1].slice(0,-1))
    //console.log("link:" , link[0].slice(1))
    if(showingLinks != null){
      showingLinks.map((element) => {let link = element.split('](')
      const object = {
        href: link[1].slice(0,-1),
        text: link[0].slice(1),
        file: file
      }
      arrayLinks.push(object);
    })
  }

  //¿Por qué resulta indefinido?
  //console.log("Estos son los links encontrados en el archivo, showingLinks");
})
  return arrayLinks;
}
//console.log("Obteniendo links y descomponiéndolos en href, text, file" , gettingLinks(directory));


// validar links de array
const validateLinks = (arrLiknsValidate) => {
  const arr = arrLiknsValidate.map((obj) => (axios.get(obj.href))
    .then((url) => ({ status: url.status, message: url.statusText, ...obj }))
    .catch(() => ({ status: 404, message: 'Esta ruta no existe', ...obj })));
    return Promise.all(arr);
};
//validateLinks(gettingLinks(fileMD)).then((url) => console.log(url))


 module.exports = {
  readDirectory,
  pathAbsolute,
  relativeToAbsolute,
  isValidRoute,
  isDirectory,
  isFile,
  isMarkdown,
  readFile,
  validateLinks,
  getAllFilesMd,
  gettingLinks,

}



