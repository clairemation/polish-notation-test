function arrayify(str){
  var array = str.split('\n');
  array = array.map((e) => e.split(" "));
  return array;
}

module.exports = arrayify;