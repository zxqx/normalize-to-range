module.exports = normalizeToRange;

function normalizeToRange(array, min, max, field)
{
  if (array === null || array === undefined)
    throw new TypeError('Required argument array not provided');

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

  if (max < min) throw 'Max can\'t be less than min';
  
  var highValue = getHighValue(array, field);
  var divisor   = highValue / max;

  return array.map(function(x) {
    x[field] = x[field] / divisor;
    if (x[field] < min) x[field] = min;

    return x;
  });
}

function getHighValue(array, field) {
  return Math.max.apply(null, array.map(function(x) {
    return x[field];
  }));
}
