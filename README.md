# normalize-to-range

Normalize an array of numbers or objects to a specified range.

[![Build Status](https://travis-ci.org/zakangelle/normalize-to-range.png?branch=master)](https://travis-ci.org/zakangelle/normalize-to-range)

[![browser support](https://ci.testling.com/zakangelle/normalize-to-range.png)
](https://ci.testling.com/zakangelle/normalize-to-range)

## Installation

```
$ npm install normalize-to-range
```

## Usage

```js
var normalize = require('normalize-to-range');

// Arrays of objects
normalize(someArrayOfObjects, 0, 300, 'propertyName');

// Arrays of numbers
normalize(someArrayOfNumbers, 0, 1000);

// By default normalizes between 0 and 1
normalize(someArrayOfNumbers);
```

## Test
Tests are done with [tape](https://github.com/substack/tape) by running:

```
$ npm test
```
