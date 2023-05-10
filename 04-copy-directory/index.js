const path = require('path');
const fs = require('fs/promises');
const { mkdir, copyFile, readdir, constants } = require('fs/promises');

let originPath = path.join(__dirname, 'files');
let copyPath = path.join(__dirname, 'files-copy');


let createCopy = async function() {

  try {
    let copyFiles = await readdir(copyPath);
    for (let file of copyFiles) {
      fs.unlink(path.join(copyPath, file))
    }
  } catch (err) {

  }


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