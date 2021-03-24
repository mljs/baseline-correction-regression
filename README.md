# baseline-correction-regression

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Iterative regression-based baseline correction.

The algorithm is based on the document [_Baseline correction by improved iterative polynomial fitting with automatic threshold_](https://doi.org/10.1016/j.chemolab.2005.08.009)

## Installation

`$ npm i ml-baseline-correction-regression`

## Usage

```js
import baselineCorrection from 'ml-baseline-correction-regression';

let time = [/* ... */];
let originalSignal = [/* ... */];
const {corrected, delta, iteration, baseline} = baselineCorrection(time, originalSignal);
```

## [API Documentation](https://mljs.github.io/baseline-correction-regression/)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-baseline-correction-regression.svg
[npm-url]: https://npmjs.org/package/ml-baseline-correction-regression
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/baseline-correction-regression.svg
[codecov-url]: https://codecov.io/gh/mljs/baseline-correction-regression
[ci-image]: https://github.com/mljs/baseline-correction-regression/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/mljs/baseline-correction-regression/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/ml-baseline-correction-regression.svg
[download-url]: https://npmjs.org/package/ml-baseline-correction-regression
