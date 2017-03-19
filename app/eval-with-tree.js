const operate = require('./polish-operation.js');

function buildTree(array){
  var i = 0;
  function Tree(){
    // Number => childless node.
    // Operation => insert next 2 expressions as children.
    this.value = array[i++];
    if (!this.value.match(/\d/)){
      this.left =  new Tree();
      this.right = new Tree();
    }
  }
  Tree.prototype.evaluate = function(){
    // Number => return self.
    // Operation => return result on children.
    return this.value.match(/\d/) ? parseFloat(this.value) : operate(this.value, this.left.evaluate(), this.right.evaluate());
  };
  return new Tree();
}

function evaluateArray(array){
  return buildTree(array).evaluate();
}

module.exports = evaluateArray;