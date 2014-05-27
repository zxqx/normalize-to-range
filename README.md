# normalize-to-range

Normalize an array of objects to a specified range.

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

normalize(someArray, 0, 300, 'fieldName');
```

## Test
Tests are done with `tape` by running:

```
$ npm test
```
