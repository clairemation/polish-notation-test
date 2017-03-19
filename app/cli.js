var readFile = require('./read-file.js'),
  processData = require('./process-data.js');

readFile(process.argv[2]).then((data) => {
  var result = processData(data).join('\n');
  return(console.log(result));
}).catch((e) => {
  return console.log(e);
});