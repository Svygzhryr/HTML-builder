const path = require('path');
const fs = require('fs/promises');

let projdist = path.join(__dirname, 'project-dist');
let assets = path.join(__dirname, 'project-dist', 'assets');

let assembleHTML = async function() {
    let srcHtml = path.join(__dirname, 'template.html');
    let srcData = await fs.readFile(srcHtml, 'utf-8');
    let components = await fs.readdir(path.join(__dirname, 'components'));
    let data;
    for (let file of components) {
       data = await fs.readFile(path.join(__dirname, 'components', file), 'utf8');
       srcData = srcData.replace(`{{${file.slice(0, -5)}}}`, data);
    }

    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), srcData);
}

let assembleAssets = async function() {
  let proj = fs.mkdir(projdist, {recursive: true});
  let ass = fs.mkdir(assets, {recursive: true});
  let font = fs.mkdir(path.join(assets, 'fonts'), {recursive: true});
  let img = fs.mkdir(path.join(assets, 'img'), {recursive: true});
  let svg = fs.mkdir(path.join(assets, 'svg'), {recursive: true});


  let imgs = await fs.readdir(path.join(__dirname, 'assets', 'img'));
  for (let file of imgs) {
   await fs.copyFile(path.join(__dirname, 'assets', 'img', file), path.join(assets, 'img', file));
  }

  let fonts = await fs.readdir(path.join(__dirname, 'assets', 'fonts'));
  for (let file of fonts) {
   await fs.copyFile(path.join(__dirname, 'assets', 'fonts', file), path.join(assets, 'fonts', file));
  }

  let svgs = await fs.readdir(path.join(__dirname, 'assets', 'svg'));
  for (let file of svgs) {
   await fs.copyFile(path.join(__dirname, 'assets', 'svg', file), path.join(assets, 'svg', file));
  }
}

let assembleStyles = async function() {

  let checkStyles = await fs.readdir(path.join(__dirname, 'project-dist'));
  if (checkStyles.includes('style.css')) {
    fs.unlink(path.join(__dirname, 'project-dist', 'style.css'));
  }

  let files = await fs.readdir(path.join(__dirname, 'styles'));

  for (let file of files) {
  let fileName = file.match(/[^.]*/gi);
    if (fileName[2] == 'css') {
      let content = await fs.readFile(path.join(__dirname, 'styles', file));
      await fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), content);
    }
  }

}

assembleHTML();
assembleAssets();
assembleStyles();