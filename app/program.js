const readFile = require('./read-file.js'),
  processData = require('./process-data.js');

module.exports = function(filename){
  return new Promise((resolve, reject) => {
    readFile(filename).then(
      (data) => {
        try {
          var result = processData(data);
          resolve(result);
        }
        catch(e){
          reject(new Error(e));
        }
      },
      (error) => {
        reject(new Error(error));
      }
    );
  });
};