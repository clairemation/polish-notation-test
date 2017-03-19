const program = require('../app/evaluate.js'),
  arrayify = require('../app/arrayify.js'),
  // Two alternate implementations of the expression parser
  evaluateWithStack = require('../app/eval-with-stack.js'),
  evaluateWithTree = require('../app/eval-with-tree.js');

describe('File input', () => {
  it('should read data from specified file', () => {
    return program('./spec/test-input').then((success) => {
      expect(success).not.toBeUndefined();
    })
    .catch((error) => {
      expect(error).toBeUndefined();
    });
  });
});

describe('Arrayify', () => {
  it('should convert a document string into an array of arrays', () => {
    var results = arrayify('+ 3 4\n* 5 6');
    expect(Array.isArray(results)).toBe(true);
  });
});

operationTests(evaluateWithTree);
operationTests(evaluateWithStack);

function operationTests(evaluate){
  describe('Operations', () => {
    it('should add', () => {
      expect(evaluate(['+', '2.5', '2'])).toBe(4.5);
    });
    it('should multiply', () => {
      expect(evaluate(['*', '2.5', '2'])).toBe(5);
    });
    it('should divide', () => {
      expect(evaluate(['/', '2.5', '2'])).toBe(1.25);
    });
    it('should handle different-length tokens', () => {
      expect(evaluate(['+', '2', '40.5'])).toBe(42.5);
    });
    it('should handle compound expressions', () => {
      expect(evaluate(['*', '+', '2', '/', '12', '3', '4'])).toBe(24);
    });
    it('should be commutative', () => {
      var forwards = evaluate(['*', '+', '2', '3', '4']);
      var reverse = evaluate(['*', '4', '+', '3', '2']);
      expect(forwards).toBe(reverse);
    });
  });
}