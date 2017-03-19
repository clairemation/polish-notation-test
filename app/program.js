const readFile = require('./read-file.js'),
  processData = require('./process-data.js');

module.exports = function(filename){
  readFile(filename).then((data) => {
    var result = processData(data).join('\n');
    return(console.log(result));
  }).catch((e) => {
    return console.log(e);
  });
};