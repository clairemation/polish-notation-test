function SimpleStack(){
  this.top = null;
}

SimpleStack.prototype.push = function(value){
  this.top = {value, below: this.top};
}

SimpleStack.prototype.pop = function(){
  var node = this.top;
  this.top = this.top.below;
  return node.value;
}

module.exports = SimpleStack;