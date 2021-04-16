const {
  isValidRoute,
  pathAbsolute,
  relativeToAbsolute,
  isDirectory,
  readDirectory,
  isFile,
  isMarkdown,
  getAllFilesMd,
  gettingLinks,
  validateLinks
} = require('../index');
jest.setTimeout(10000);

const relativePath = 'index.js';
const absolutePath = 'C:\\Users\\Usuario\\LIM014-mdlinks\\index.js';
const directory = 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando';
const fileMD = 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\readme.md';

describe('isValidRoute', () => {
  it('Debería ser una función ', () => {
    expect(typeof isValidRoute).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(isValidRoute(absolutePath)).toBe(true);
  });
});

describe('pathAbsolute', () => {
  it('Debería ser una función ', () => {
    expect(typeof pathAbsolute).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(pathAbsolute(absolutePath)).toBe(true);
  });pathAbsolute
});


describe('relativeToAbsolute', () => {
  it('Debería ser una función ', () => {
    expect(typeof relativeToAbsolute).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(relativeToAbsolute(relativePath)).toBe(absolutePath);
  });
});



describe('isDirectory', () => {
  it('Debería ser una función ', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(isDirectory(directory)).toBe(true);
  });
});


describe('readDirectory', () => {
  it('Debería ser una función ', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('Debería retornar un array con los archivos', () => {
    expect(readDirectory(directory)).toEqual(['Otra carpeta', 'otro.md', 'readme.md', 'Trash.js']);
  });
});


describe('isFile', () => {
  it('Debería ser una función ', () => {
    expect(typeof isFile).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(isFile(absolutePath)).toBe(true);
  });
});

//FALTA TESTEAR
/* describe('readFile', () => {
  it('Debería ser una función ', () => {
    expect(typeof readFile).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(readFile(fileMD)).toBe(true);
  });
});
 */

describe('isMarkdown', () => {
  it('Debería ser una función ', () => {
    expect(typeof isMarkdown).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(isMarkdown(fileMD)).toBe(true);
  });
});


describe('getAllFilesMd', () => {
  it('Debería ser una función ', () => {
    expect(typeof getAllFilesMd).toBe('function');
  });
  it('Debería retornar un array con la ruta del archivo .md ', () => {
    expect(getAllFilesMd(fileMD)).toEqual(['C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\readme.md' ]);
  });
});


describe('gettingLinks', () => {
  it('Debería ser una función ', () => {
    expect(typeof gettingLinks).toBe('function');
  });
  it('Debería retornar true ', () => {
    expect(gettingLinks(directory)).toEqual([{ href: 'https://github.com/workshopper/learnyounode', text: 'learnyounode', file: 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\Otra carpeta\\otroreadme.md'}, { href: 'https://github.com/workshopper/how-to-npm', text: 'how-to-npm', file: 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\Otra carpeta\\otroreadme.md'}, {href: 'https://github.com/workshopper/learnyounode', text: 'learnyounode', file: 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\Otra carpeta\\otroreadme.md'}, { href: 'https://github.cm/workshopper/learnyounode', text: 'learnyounode', file: 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\readme.md'}, { href: 'https://github.com/workshopper/how-to-npm', text: 'how-to-npm', file: 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\readme.md'}]);
  });
});

const test1 = [
  {
    status: 404,
    message: 'Esta ruta no existe',
    href: 'https://github.cm/workshopper/learnyounode',
    text: 'learnyounode',
    file: 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\readme.md'
  },
  {
    status: 404,
    message: 'Esta ruta no existe',
    href: 'https://github.com/workshopper/how-to-npm',
    text: 'how-to-npm',
    file: 'C:\\Users\\Usuario\\LIM014-mdlinks\\Probando\\readme.md'
  }
];

//REVISAR ESTA FUNCIÓN
describe('validateLinks', () => {
  it('Debería ser una función ', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar true ', (done) => {
    validateLinks(gettingLinks(fileMD))
    .then((h) => {expect(h).toEqual(test1);
    done();
    });
  });
});





