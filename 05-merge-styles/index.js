const path = require('path');
const fs = require('fs/promises');


let createBundle = async function() {  
  let checkBundle = await fs.readdir(path.join(__dirname, 'project-dist'));
  if (checkBundle.includes('bundle.css')) {
   await fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'));
  }

  let files = await fs.readdir(path.join(__dirname, 'styles'));

  for (let file of files) {
  let fileName = file.match(/[^.]*/gi);
    if (fileName[2] == 'css') {
      let content = await fs.readFile(path.join(__dirname, 'styles', file));
      await fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), content);
    }
  }
}

createBundle();
