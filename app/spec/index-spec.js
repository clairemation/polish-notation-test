var program = require('../evaluate.js');
describe("operations", function(){
  var results;
  beforeEach(function(done){
    program('./app/spec/test-input', function(str){
      console.log(results = str);
      done();
    });
    done();
  });
  it("should end sometime", function(done){
    expect(results).toBe("20\n20\n");
  });
});