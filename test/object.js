var test = require('tape');
var normalize = require('../index.js');

test('Array of objects', function(t) {
  t.plan(3);

  var array = [
    { color: 'green', height: 2000 },
    { color: 'red', height: 1000 },
    { color: 'purple', height: 500 }
  ];

  var shouldEqual = [
    { color: 'green', height: 500 },
    { color: 'red', height: 250 },
    { color: 'purple', height: 125 }
  ];

  t.deepEquals(normalize(array, 0, 500, 'height'), shouldEqual);

  array = [
    { color: 'green', height: 10000 },
    { color: 'red', height: 5000 },
    { color: 'purple', height: 2000 }
  ];

  shouldEqual = [
    { color: 'green', height: 10 },
    { color: 'red', height: 5 },
    { color: 'purple', height: 2 }
  ];

  t.deepEquals(normalize(array, 0, 10, 'height'), shouldEqual);

  array = [
    { color: 'green', height: 0 },
    { color: 'red', height: 50 },
    { color: 'purple', height: 100 }
  ];

  shouldEqual = [
    { color: 'green', height: 100 },
    { color: 'red', height: 500 },
    { color: 'purple', height: 1000 }
  ];

  t.deepEquals(normalize(array, 100, 1000, 'height'), shouldEqual);
});

test('Throw on empty array', function(t) {
  t.plan(1);

  var array = [];

  t.throws(function() {
    normalize(array, 0, 100, 'height');
  });
});

test('Throw when max is less than or equal to min', function(t) {
  t.plan(2);

  var array = [
    { color: 'green', height: 2000 },
    { color: 'red', height: 1000 },
    { color: 'purple', height: 500 }
  ];

  t.throws(function() {
    normalize(array, 100, 40, 'height');
  });

  t.throws(function() {
    normalize(array, 100, 100, 'height');
  });
});

