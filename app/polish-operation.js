function polishOperation(opString, p1, p2){
  const operations = {
    "*": function(x, y){return x * y},
    "+": function(x, y){return x + y},
    "/": function(x, y){return x / y}
  }
  return operations[opString](p1, p2);
}

module.exports = polishOperation;