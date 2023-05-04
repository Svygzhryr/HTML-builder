const fs = require('fs');
const path = require('node:path');

const get = path.join(__dirname, 'text.txt')
file = fs.createReadStream(get);

file.on('data', function (chunk) {
    console.log(chunk.toString());
});