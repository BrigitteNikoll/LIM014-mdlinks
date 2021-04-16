const {
  pathAbsolute,
  relativeToAbsolute,
  isValidRoute,
  gettingLinks,
  getAllFilesMd,
  validateLinks,
} = require('./index.js');

const mdlinks = (path, option = { validate: false }) => new Promise((resolve, reject) => {
  if (option.validate === true) {
    resolve(validateLinks(gettingLinks(path)));
  }

  if (option.validate === false) {
    if (isValidRoute(path)) {
      if (!pathAbsolute(path)) {
        resolve(relativeToAbsolute(path));
      }
      if (relativeToAbsolute(path)) {
        if (getAllFilesMd(path)) {
          resolve(gettingLinks(path));
        }
      }
    } else {
      reject("Esta ruta no existe");
    }
  }
});

module.exports = mdlinks;
