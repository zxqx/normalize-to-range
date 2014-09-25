module.exports = normalizeToRange;

var arrayMax = require('array-max');
var check    = require('check-types');

/**
 * Normalize an array of numbers or objects to a specific range
 * @param {array} array
 * @param {number=} min Low end of range used to normalize, defaults to 0
 * @param {number=} max High end of range used to normalize, defaults to 1
 * @param {string=} field Object property name whose value will be normalized
 * @return {array}
 */
function normalizeToRange(array, min, max, field)
{
  if (!check.array(array))
    throw new TypeError('Argument array must be an array');

  if (arguments.length === 1) {
    min = 0;
    max = 1;
  }

  if (!check.number(min))
    throw new TypeError('Argument min must be a number');

  if (!check.number(max))
    throw new TypeError('Argument max must be a number');

  if (field && !check.string(field))
    throw new TypeError('Argument field must be a string');

  if (!array.length)
    throw new Error('Array must not be empty');

  if (max <= min)
    throw new Error('Max can\'t be less than or equal to min');
  
  var highValue = arrayMax(array, field);
  var divisor   = highValue / max;

  return array.map(function(x) {

    // Array of objects
    if (field) {
      x[field] = x[field] / divisor;
      if (x[field] < min) x[field] = min;
    }

    // Array of numbers
    else {
      x = x / divisor;
    }

    return x;
  });
}
