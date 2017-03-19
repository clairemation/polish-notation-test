var evaluate = require('./evaluate.js');

evaluate(process.argv[2]).then((result) => {
  console.log(result.join('\n'));
}).catch((err) => {
  console.log('ERROR: ' + err);
});