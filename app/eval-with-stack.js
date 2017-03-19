const Stack = require('./stack'),
  polishOperate = require('./polish-operation.js');

function evalWithStack(array){
  var stack = new Stack();
  var num = 0,
  str = "";
  // Read expression backwards as postfix operation, for easier parsing
  for (let i = array.length - 1; i >= 0; i--){
    str = array[i];
    // Number -> push to stack.
    // Operator -> pop last 2 numbers, apply operator, and push result.
    stack.push((str.match(/\d/)) ? parseFloat(str) : polishOperate(str, stack.pop(), stack.pop()));
  }
  // Last remaining element on stack is our solution.
  return stack.pop();
};

module.exports = evalWithStack;