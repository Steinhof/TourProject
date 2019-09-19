const fs = require('fs');

const jsRead = fs.readFileSync('../src/public/sw.js');

const jsToJson = jsRead.toString();

console.log(jsToJson.match(/. = []/gi));
