module.exports = normalizeToRange;

var check = require('check-types');

/**
 * Normalize an array of numbers or objects to a specific range
 * @param {array} array
 * @param {number} min Low end of range used to normalize
 * @param {number} max High end of range used to normalize
 * @param {string} field (optional) Object property name whose value will be normalized 
 * @return {array}
 */
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
    throw new Error('Array must not be empty');

  if (max <= min)
    throw new Error('Max can\'t be less than or equal to min');
  
  var highValue = getHighValue(array, field);
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

/**
 * Get the highest value of an array of numbers or array of objects that contain number values
 * @param {array} array
 * @param {string} field (optional) Object property name to reference when maxing 
 * @return {number}
 */
function getHighValue(array, field)
{
  // Array of objects
  if (field) {
    return Math.max.apply(null, array.map(function(x) {
      if (!check.number(x[field]))
        throw new TypeError('Field must be a number');

      return x[field];
    }));
  }

  // Array of numbers
  else {
    array.map(function(x) {
      if (!check.number(x))
        throw new TypeError('Array values must be numbers');
    });

    return Math.max.apply(null, array);
  }
}
