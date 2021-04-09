
const {
  pathAbsolute,
  relativeToAbsolute,
  isValidRoute,
  gettingLinks,
  getAllFilesMd

} = require('./index.js')

const mdlinks = (path) => new Promise ((resolve, reject) => {
   if(isValidRoute(path)){
    if(!pathAbsolute(path)){
      resolve(relativeToAbsolute(path))
    }
      if(relativeToAbsolute(path)){
      if(getAllFilesMd(path)){
        resolve(gettingLinks(path))
      }
      }
  }else{
    reject("la ruta no existe")
  }

})

module.exports = mdlinks;
