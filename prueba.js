 const mdLinks = require('./mdLinks');

mdLinks('C:\\Users\\Usuario\\LIM014-mdlinks\\Probando')
.then(links => {
  console.log(links);
  // => [{ href, text, file }]
})
.catch(console.error);


