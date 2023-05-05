const path = require('path');
const fs = require('fs');
const { mkdir, copyFile, readdir, constants } = require('fs/promises');

let originPath = path.join(__dirname, 'files');
let copyPath = path.join(__dirname, 'files-copy');


let createCopy = async function() {
  const createDir = await mkdir(copyPath, { recursive: true });
  let files = await readdir(originPath);
  
  for (const file of files)
      processFiles(file);
}

let processFiles = async function(file) {
    let src = path.join(__dirname, 'files', file);
    let dest = path.join(__dirname, 'files-copy', file);
    copyFile(src, dest); 
    console.log(`File **${file}** successfully copied.`)
}

createCopy();