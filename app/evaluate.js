const fs = require('fs'),
  arrayify = require('./arrayify.js'),
  polishOperate = require('./polish-operation.js'),
  Stack = require('./stack.js');

function evaluate(filename, callback = function(){}){
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw new Error(err);
    var input = arrayify(data); // array of prefix expressions
    var output = input.map((array) => {
      var stack = new Stack();
      var num = 0,
        str = "";
      // Read expression backwards as postfix operation--more convenient
      for (let i = array.length - 1; i >= 0; i--){
        str = array[i];
        // If number, push to stack. If operator, pop last 2 numbers off stack, apply operator, and push result to stack.
        num = (str.match(/\d/)) ? parseFloat(str) : polishOperate(str, stack.pop(), stack.pop());
        stack.push(num);
      }
      // Last remaining element on stack is our solution.
      return stack.pop();
    });
    outputStr = output.join('\n');
    callback(outputStr);
  });
};

module.exports = evaluate;