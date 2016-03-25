module.exports = normalizeToRange;

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
  if (arguments.length === 1) {
    min = 0;
    max = 1;
  }

  if (!array.length)
    throw new Error('Array must not be empty');

  if (max <= min)
    throw new Error('Max can\'t be less than or equal to min');

  var highValue = array.reduce((a, b) => {
    if (field) {
      return a[field] > b[field] ? a : b;
    }

    return Math.max(a, b);
  });

  var divisor = field ? highValue[field] / max : highValue / max;

  return array.map(x => {

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
