const operate = require('./polish-operation.js');

function buildTree(array){
  var i = 0,
  arrayLength = array.length;
  function Tree(){
    this.val = array[i++];
    // If number, no children. If operation, children are next 2 expressions.
    if (!this.val.match(/\d/)){
      this.left =  new Tree();
      this.right = new Tree();
    }
  }
  return new Tree();
}

function evaluateTree(node){
  // If number, return own value. If operation, perform on child tree values and return result.
  return (node.val.match(/\d/)) ? parseFloat(node.val) : operate(node.val, evaluateTree(node.left), evaluateTree(node.right));
}

function evaluateArray(array){
  // console.log(array)
  return evaluateTree(buildTree(array));
}

module.exports = evaluateArray;