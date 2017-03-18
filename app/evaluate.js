const fs = require('fs'),
  arrayify = require('./arrayify.js'),
  Stack = require('./stack.js'),
  evaluatePrefixOp = require('./eval-with-stack.js');

function evaluate(filename, callback = function(){}){
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw new Error(err);
    var input = arrayify(data); // array of prefix expressions
    var output = input.map((array) => evaluatePrefixOp(array));
    outputStr = output.join('\n');
    callback(outputStr);
  });
};

module.exports = evaluate;