const fs = require('fs'),
  arrayify = require('./arrayify.js'),
  Stack = require('./stack.js'),
  evaluate = require('./eval-with-stack.js');

function readAndEvaluate(filename){
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        var inputArrays = arrayify(data);
        var output = inputArrays.map((array) => evaluate(array));
        resolve(output);
      }
    });
  });
};

module.exports = readAndEvaluate;