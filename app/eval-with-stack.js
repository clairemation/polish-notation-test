var Stack = require('./stack'),
  polishOperate = require('./polish-operation.js');

function evalWithStack(array){
  var stack = new Stack();
  var num = 0,
  str = "";
  // Read expression backwards as postfix operation--more convenient
  for (let i = array.length - 1; i >= 0; i--){
    str = array[i];
    // If number, push to stack. If operator, pop last 2 numbers off stack, apply operator, and push result to stack
    num = (str.match(/\d/)) ? parseFloat(str) : polishOperate(str, stack.pop(), stack.pop());
    stack.push(num);
  }
  // Last remaining element on stack is our solution.
  return stack.pop();
};

module.exports = evalWithStack;