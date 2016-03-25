# normalize-to-range

Normalize an array of numbers or object values to a specified range.

[![Build Status](https://travis-ci.org/zakangelle/normalize-to-range.png?branch=master)](https://travis-ci.org/zakangelle/normalize-to-range)

## Installation

```
$ npm install normalize-to-range
```

## Usage

```js
import normalize from 'normalize-to-range';

// Array of numbers
normalize([0, 1, 7, 9, 10], 0, 300);
// [0, 30, 210, 270, 300]

// Array of objects
normalize([{ height: 12 }, { height: 40 }], 0, 1000, 'height');
// [{ height: 300 }, { height: 1000 }]

// By default normalizes between 0 and 1
normalize(someArrayOfNumbers);
```

## Test
Tests are done with [tape](https://github.com/substack/tape) by running:

```
$ npm test
```
