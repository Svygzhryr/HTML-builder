const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const getFile = path.join(__dirname, 'text.txt');
const file = fs.createWriteStream(getFile);

let data = readline.createInterface({input, output})

let stopInput = function() {
    data.close();
    output.write("We're done here.\n");
}

data.write("Express yourself..\n");
data.on('SIGINT', () => stopInput());
data.on('line', e => {
  if (e.trim().toLowerCase() == 'exit') {
    stopInput();
  } else file.write(e + '\n');
});