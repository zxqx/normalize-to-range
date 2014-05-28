module.exports = normalizeToRange;

function normalizeToRange(array, min, max, field)
{
  if (!provided(array))
    throw new TypeError('Required argument array not provided');

  if (!provided(min))
    throw new TypeError('Required argument min not provided');

  if (!provided(max))
    throw new TypeError('Required argument max not provided');

  if (!isArray(array))
    throw new TypeError('Argument array must be an array');

  if (!isNumber(min))
    throw new TypeError('Argument min must be a number');

  if (!isNumber(max))
    throw new TypeError('Argument max must be a number');

  if (field && !isString(field))
    throw new TypeError('Argument field must be a string');

  if (!array.length)
    throw new TypeError('Array is empty');

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

function provided(arg)
{
  if (arg === null || arg === undefined)
    return false;
  else
    return true;
}

function isArray(arg)
{
  if (Object.prototype.toString.call(arg) === '[object Array]')
    return true;
  else
    return false;
}

function isNumber(arg)
{
  if (Object.prototype.toString.call(arg) === '[object Number]')
    return true;
  else
    return false;
}

function isString(arg)
{
  if (Object.prototype.toString.call(arg) === '[object String]')
    return true;
  else
    return false;
}
