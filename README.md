# baseline-correction-regression

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][codecov-image]][codecov-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Iterative regression-based baseline correction.

The algorithm is based on the document [_Baseline correction by improved iterative polynomial fitting with automatic threshold_](https://doi.org/10.1016/j.chemolab.2005.08.009)

## Installation

`$ npm install --save ml-baseline-correction-regression`

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

[npm-image]: https://img.shields.io/npm/v/ml-baseline-correction-regression.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-baseline-correction-regression
[travis-image]: https://img.shields.io/travis/mljs/baseline-correction-regression/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/baseline-correction-regression
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/baseline-correction-regression.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/mljs/baseline-correction-regression
[david-image]: https://img.shields.io/david/mljs/baseline-correction-regression.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/baseline-correction-regression
[download-image]: https://img.shields.io/npm/dm/ml-baseline-correction-regression.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-baseline-correction-regression
