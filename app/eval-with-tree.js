const operate = require('./polish-operation.js');

function buildTree(valArray){
  var i = 0;
  function Tree(){
    this.val = valArray[i++];
    if (!this.val.match(/d/)){
      this.left =  new Tree();
      this.right = new Tree();
    }
  }
  return new Tree();
}

function evaluateTree(node){
  if (node.val.match(/d/)){
    return node.val;
  }
    return operate(node.val, evaluateTree(node.left), evaluateTree(node.right));
}

function evaluateArray(arr){
  return evaluateTree(buildTree(arr));
}

module.exports = evaluateArray;