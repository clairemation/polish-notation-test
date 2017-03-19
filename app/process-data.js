const arrayify = require('./arrayify.js'),
  evaluate = require('./eval-with-stack.js');
  // Alternate evaluate algorithm:
  // evaluate = require('./eval-with-tree.js');

function processData(data){
  var inputArrays = arrayify(data);
  var output = inputArrays.map((array) => evaluate(array));
  return output;
}

module.exports = processData;