const TEST_INPUT = './spec/test-input',
  arrayify = require('../app/arrayify.js'),
  program = require('../app/program.js'),
  readFile = require('../app/read-file.js'),
  processData = require('../app/process-data.js'),
  // Two alternate implementations of the evaluation algorithm:
  evaluateWithStackAlgo = require('../app/eval-with-stack.js'),
  evaluateWithTreeAlgo = require('../app/eval-with-tree.js');

describe('File input', () => {
  it('should return data from specified file', () => {
    return readFile(TEST_INPUT).then(
      (success) => {
        expect(success).toBe('+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2');
      },
      (error) => {
        expect(error.message).toBeUndefined();
      }
    );
  });
  it('should return an error if file not found', () => {
    return readFile('#', () => true).then(
      (success) => {
        expect(success).toBeUndefined();
      },
      (error) => {
        expect(error.message).not.toBeUndefined();
      }
    );
  });
});

describe('Arrayify', () => {
  it('should convert a string into an array of test case arrays', () => {
    expect(arrayify('+ 3 4\n* 5 6')).toEqual([ [ '+', '3', '4' ], [ '*', '5', '6' ] ]);
  });
  it('should handle a string with a single line', () => {
    expect(arrayify('+ 3 4')).toEqual([['+', '3', '4']]);
  });
  it('should handle a string with 40 lines', () => {
    expect(arrayify('+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2\n+ 3 4\n* 3 4\n/ 3 4\n* + 2 3 4\n* 4 + 3 2')).toEqual([ [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ], [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ], [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ], [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ], [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ], [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ], [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ], [ '+', '3', '4' ], [ '*', '3', '4' ], [ '/', '3', '4' ], [ '*', '+', '2', '3', '4' ], [ '*', '4', '+', '3', '2' ] ]);
  });
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

describe('Program', () => {
  it('should evaluate a series of prefix operations inside a file', () => {
    return program(TEST_INPUT).then(
      (success) => {
        expect(success).toEqual([ 7, 12, 0.75, 20, 20, 7, 12, 0.75, 20, 20, 7, 12, 0.75, 20, 20, 7, 12, 0.75, 20, 20, 7, 12, 0.75, 20, 20, 7, 12, 0.75, 20, 20, 7, 12, 0.75, 20, 20, 7, 12, 0.75, 20, 20 ]);
      },
      (error) => {
        expect(`\n${error.message} \n\ at ${error.stack} \n`).toBeUndefined();
      }
    );
  })
})