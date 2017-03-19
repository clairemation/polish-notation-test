const program = require('./program.js');

program(process.argv[2]).then(
  (result) => {
    console.log(result.join('\n'));
  },
  (error) => {
    console.log(error);
  }
);