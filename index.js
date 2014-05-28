module.exports = normalizeToRange;

var check = require('check-types');

function normalizeToRange(array, min, max, field)
{
  if (!check.array(array))
    throw new TypeError('Argument array must be an array');

  if (!check.number(min))
    throw new TypeError('Argument min must be a number');

  if (!check.number(max))
    throw new TypeError('Argument max must be a number');

  if (field && !check.string(field))
    throw new TypeError('Argument field must be a string');

  if (!array.length)
    throw new TypeError('Array must not be empty');

  if (max <= min)
    throw new TypeError('Max can\'t be less than or equal to min');
  
  var highValue = getHighValue(array, field);
  var divisor   = highValue / max;

  return array.map(function(x) {
    if (!field)
      x = x / divisor;
    else {
      x[field] = x[field] / divisor;
      if (x[field] < min) x[field] = min;
    }

    return x;
  });
}
  
function getHighValue(array, field) {
  if (field) {
    return Math.max.apply(null, array.map(function(x) {
      if (!check.number(x[field]))
        throw new TypeError('Field must be a number');

      return x[field];
    }));
  }
  else {
    array.map(function(x) {
      if (!check.number(x))
        throw new TypeError('Array values must be numbers');
    });

    return Math.max.apply(null, array);
  }
}
