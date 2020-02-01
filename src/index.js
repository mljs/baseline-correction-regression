import PolynomialRegression from 'ml-regression-polynomial';
import { XY } from 'ml-spectra-processing';

/**
 * Iterative regression-based baseline correction
 * @param {Array<number>} x - Independent axis variable
 * @param {Array<number>} y - Dependent axis variable
 * @param {object} [options] - Options object
 * @param {number} [options.maxIterations = 100] - Maximum number of allowed iterations
 * @param {function} [options.Regression = PolynomialRegression] - Regression class with a predict method
 * @param {*} [options.regressionOptions] - Options for regressionFunction
 * @param {number} [options.tolerance = 0.001] - Convergence error tolerance
 * @return {{corrected: Array<number>, delta: number, iteration: number, baseline: Array<number>}}
 */
const baselineCorrection = function(x, y, options = {}) {
  let {
    maxIterations = 100,
    Regression = PolynomialRegression,
    regressionOptions,
    tolerance = 0.001,
    reduce = true,
    nbPoints = 4001,
  } = options;

  if (!regressionOptions && Regression === PolynomialRegression) {
    regressionOptions = 3;
  }

  let xTemp, yTemp;
  if (reduce) {
    let reducedData = XY.reduce(x, y, { nbPoints });
    yTemp = reducedData.y;
    xTemp = reducedData.x;
  } else {
    xTemp = x.slice();
    yTemp = y.slice();
  }

  let baseline = yTemp.slice();
  let fitting = yTemp.slice();
  let oldFitting = yTemp.slice();
  let iteration = 0;
  let delta, regression;
  while (iteration < maxIterations) {
    // Calculate the fitting result
    regression = new Regression(xTemp, baseline, regressionOptions);

    delta = 0;
    for (let i = 0; i < baseline.length; i++) {
      fitting[i] = regression.predict(xTemp[i]);
      if (baseline[i] > fitting[i]) {
        baseline[i] = fitting[i];
      }

      delta += Math.abs((fitting[i] - oldFitting[i]) / oldFitting[i]);
    }

    // Stop criterion
    if (delta < tolerance) {
      break;
    } else {
      oldFitting = fitting.slice();
      iteration++;
    }
  }

  // removes baseline
  if (reduce) baseline = x.map((e) => regression.predict(e));

  let corrected = baseline.map((e, i) => y[i] - e);

  return { corrected, delta, iteration, baseline };
};

export { baselineCorrection as default };
