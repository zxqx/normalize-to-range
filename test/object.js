var test      = require('tape');
var normalize = require('../index.js');

test('Array of objects', function(t) {
  t.plan(2);
  
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
});

test('Throw on null or undefined required argument', function(t) {
  t.plan(3);

  var array = [
    { color: 'green', height: 2000 },
    { color: 'red', height: 1000 },
    { color: 'purple', height: 500 }
  ];

  t.throws(function() {
    normalize(null, 0, 100, 'height');
  });

  t.throws(function() {
    normalize(array, null, 100, 'height');
  });

  t.throws(function() {
    normalize(array, 0, null, 'height');
  });
});

test('Throw on empty array', function(t) {
  t.plan(1);

  var array = [];

  t.throws(function() {
    normalize(array, 0, 100, 'height');
  });
});

test('Throw on empty objects', function(t) {
  t.plan(1);

  var array = [{}, {}, {}];

  t.throws(function() {
    normalize(array, 0, 100, 'height');
  });
});

test('Throw on bad argument types', function(t) {
  t.plan(4);

  var array = [
    { color: 'green', height: 2000 },
    { color: 'red', height: 1000 },
    { color: 'purple', height: 500 }
  ];

  var obj = { color: 'green', height: 2000 };
  
  t.throws(function() {
    normalize(obj, 100, 500, 'height');
  });

  t.throws(function() {
    normalize(array, '100', 500, 'height');
  });

  t.throws(function() {
    normalize(array, 100, 'asdasfsf', 'height');
  });

  t.throws(function() {
    normalize(array, 100, 500, ['height']);
  });
});

test('Throw when field name is bad', function(t) {
  t.plan(1);

  var array = [
    { color: 'green', height: '2000' },
    { color: 'red', height: 1000 },
    { color: 'purple', height: 500 }
  ];

  t.throws(function() {
    normalize(array, 100, 600, 'width');
  });
});

test('Throw when there\'s a non-number field value', function(t) {
  t.plan(2);

  var array = [
    { color: 'green', height: '2000' },
    { color: 'red', height: 1000 },
    { color: 'purple', height: 500 }
  ];

  t.throws(function() {
    normalize(array, 100, 600, 'height');
  });

  array = [
    { color: 'green', height: ['butt', 'head' ] },
    { color: 'red', height: 1000 },
    { color: 'purple', height: 500 }
  ];

  t.throws(function() {
    normalize(array, 100, 600, 'height');
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

