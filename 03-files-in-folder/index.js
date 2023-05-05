const path = require('path');
const fs = require('fs');
const { readdir, stat } = require('fs/promises');

let fileArr = [];
let pathName = path.join(__dirname, 'secret-folder')

let outputInfo = function(file) {
  let fileName = file.match(/[^.]*/gi);
  processInfo(fileName, file)
}

let findFiles = async function() {
  let files = await readdir(pathName);
  
  for (const file of files)
      outputInfo(file);

}

let processInfo = async function(fileName, file) {
  let fileInfo = await stat(path.join(__dirname, 'secret-folder', file));
  if (fileInfo.size !== 0) {
    console.log(`${fileName[0]} - ${fileName[2]} - ${Math.round(fileInfo.size/1024)}kB`)
  }
}

// пример выведения - "example - txt - 128.369kb"
findFiles();