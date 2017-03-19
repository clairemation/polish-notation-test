const fs = require('fs');

function readFile(filename){
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) return reject(new Error(err));
      else resolve(data);
    });
  });
};

module.exports = readFile;