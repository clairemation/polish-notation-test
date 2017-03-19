# Claire Samuels Rockerbox test submission
## a.k.a. Forward Polish Math Evalumalator 7000

3/18/2017

Type `npm run exec [filename]` to evaluate the contents of a file containing prefix/normal Polish notation expressions.

Type `npm run test` to run the provided test input file.

Type `npm run jasmine` to run unit tests. The tests are in ./spec/index-spec.js.

Two different implementations of the evaluation algorithm are included, one using a stack and one using a tree. The default script uses the stack version (but you can swap out 'tree' for 'stack' in the filename in the require statement in process-data.js) and the jasmine spec tests both versions.

Thank you.