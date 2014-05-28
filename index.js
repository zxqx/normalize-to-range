module.exports = normalizeToRange;

function normalizeToRange(array, min, max, field)
{
  if (array === null || array === undefined)
    throw new TypeError('Required argument array not provided');
  
  if (!array.length)
    throw new TypeError('Array is empty');

  if (min === null || min === undefined)
    throw new TypeError('Required argument min not provided');

  if (max === null || max === undefined)
    throw new TypeError('Required argument max not provided');

  if (Object.prototype.toString.call(array) !== '[object Array]')
    throw new TypeError('Argument array must be an array');

  if (Object.prototype.toString.call(min) !== '[object Number]')
    throw new TypeError('Argument min must be a number');

  if (Object.prototype.toString.call(max) !== '[object Number]')
    throw new TypeError('Argument max must be a number');

  if (field && Object.prototype.toString.call(field) !=='[object String]')
    throw new TypeError('Argument field must be a string');

  if (max <= min) throw new TypeError('Max can\'t be less than or equal to min');
  
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
  if (!field) {
    array.map(function(x) {
      if (Object.prototype.toString.call(x) !== '[object Number]')
        throw new TypeError('Array values must be numbers');
    });

    return Math.max.apply(null, array);
  }

  return Math.max.apply(null, array.map(function(x) {
    if (x[field] === null || x[field] === undefined)
      throw new TypeError('Field not found');
    if (Object.prototype.toString.call(x[field]) !== '[object Number]')
      throw new TypeError('Field values must be numbers');

    return x[field];
  }));
}
