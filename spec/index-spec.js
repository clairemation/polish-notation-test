const PATH = '../app/';
function pathify(name){ return PATH + name + '.js'};
const arrayify = require(pathify('arrayify')),
  cli = require(pathify('cli')),
  readFile = require(pathify('read-file')),
  processData = require(pathify('process-data')),
  // Two alternate implementations of the evaluation algorithm
  evaluateWithStackAlgo = require(pathify('eval-with-stack')),
  evaluateWithTreeAlgo = require(pathify('eval-with-tree'));

describe('File input', () => {
  it('should return data from specified file', () => {
    return readFile("./spec/test-input").then(
      (success) => {
        console.log(success)
        expect(success).not.toBeUndefined();
      },
      (error) => {
        expect(error).toBeUndefined();
      }
    );
  });
  // it('should return an error if file not found', () => {
  //   return readFile('FAKEPATH', () => true).then(
  //     (success) => {
  //       expect(success).toBeUndefined();
  //     },
  //     (error) => {
  //       expect(error).not.toBeUndefined();
  //     }
  //   );
  // });
});

describe('Arrayify', () => {
  it('should convert a string into an array of test case arrays', () => {
    testArrayify('+ 3 4\n* 5 6');
  });
  it('should handle a string with a single line', () => {
    testArrayify('+ 3 4');
  });
  it('should handle a string with 40 lines', () => {
    testArrayify('+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2');
  });
  function testArrayify(str){
    var results = arrayify(str);
    expect(Array.isArray(results)).toBe(true);
    var elementsAreArrays = results.reduce((prev, current) => prev && Array.isArray(current), true);
    expect(elementsAreArrays).toBe(true);
  }
});

operationTests(evaluateWithStackAlgo, 'Stack operations');
operationTests(evaluateWithTreeAlgo, 'Tree operations');

function operationTests(evaluate, name){
  describe(name, () => {
    it('should add', () => {
      expect(evaluate(['+', '5', '2'])).toBe(7);
    });
    it('should multiply', () => {
      expect(evaluate(['*', '5', '2'])).toBe(10);
    });
    it('should do floating-point division', () => {
      expect(evaluate(['/', '5', '2'])).toBe(2.5);
    });
    it('should handle tokens of varying lengths', () => {
      expect(evaluate(['+', '4', '200'])).toBe(204);
    });
    it('should handle an expression of just a single token', () => {
      expect(evaluate(['1'])).toBe(1);
    });
    it('should handle compound operations', () => {
      expect(evaluate(['*', '+', '2', '/', '12', '3', '4'])).toBe(24);
    });
    it('should be commutative', () => {
      var forwards = evaluate(['*', '+', '2', '3', '4']);
      var reverse = evaluate(['*', '4', '+', '3', '2']);
      expect(forwards).toEqual(reverse);
    });
  });
}