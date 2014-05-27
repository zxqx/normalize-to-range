var test      = require('tape');
var normalize = require('../index.js');

test('Array of numbers', function(t) {
  t.plan(1);

  var array = [5, 10, 15, 20, 25, 30, 35, 40];
  t.deepEquals(normalize(array, 0, 8), [1, 2, 3, 4, 5, 6, 7, 8]);
});

test('Throw when there\'s a non-number array value', function(t) {
  t.plan(2);

  var array = [5, 10, 15, 20, 25, '30', 35, 40];

  t.throws(function() {
    normalize(array, 100, 600);
  });

  array = [5, 10, 15, 20, 25, { number: 35 }, 40];

  t.throws(function() {
    normalize(array, 100, 600);
  });
});
