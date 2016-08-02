var test = require('tape');
var normalize = require('../index.js');

test('Array of numbers', function(t) {
  t.plan(2);

  var array = [5, 10, 15, 20, 25, 30, 35, 40];
  t.deepEquals(normalize(array, 0, 8), [1, 2, 3, 4, 5, 6, 7, 8]);

  array = [0, 50, 100];
  t.deepEquals(normalize(array, 100, 1000), [100, 500, 1000]);
});

test('Default params', function(t) {
  t.plan(1);

  var array = [0, 100, 200];
  t.deepEquals(normalize(array), [0, 0.5, 1]);
});
