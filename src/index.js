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
 * @param {boolean} [options.reduce = true] - If true, the number of points is reduced to options.nbPoints to performes baseline fitting
 * @param {number} [options.nbPoints = 4001] - Number of points of data input for baseline fitting if options.reduce is true.
 * @return {{corrected: Array<number>, delta: number, iteration: number, baseline: Array<number>}}
 */
export default function baselineCorrectionRegression(x, y, options = {}) {
  let {
    maxIterations = 100,
    Regression = PolynomialRegression,
    regressionOptions,
    tolerance = 0.001,
    reduce = true,
    nbPoints = 4001,
    baselineZones = [],
  } = options;

  if (!regressionOptions && Regression === PolynomialRegression) {
    regressionOptions = 3;
  }

  let xTemp = [];
  let yTemp = [];
  if (baselineZones.length > 0) {
    let rangeIndexs = checkOverlap(x, baselineZones);
    rangeIndexs.forEach((range) => {
      xTemp = xTemp.concat(x.slice(range.from, range.to + 1));
      yTemp = yTemp.concat(y.slice(range.from, range.to + 1));
    });
  } else {
    xTemp = x.slice();
    yTemp = y.slice();
  }

  if (reduce) {
    let reducedData = XY.reduce(xTemp, yTemp, { nbPoints });
    yTemp = reducedData.y;
    xTemp = reducedData.x;
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

  return { corrected, delta, iteration, baseline, model: regression.toJSON };
}

const getCloseIndex = (array = [], goal = 0) => {
  const closest = array.reduce((prev, curr) => {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  return array.indexOf(closest);
};

const checkOverlap = (x, array = []) => {
  let ranges = [];
  array.forEach((range) => {
    let from = getCloseIndex(x, range.from);
    let to = getCloseIndex(x, range.to);
    if (from > to) [from, to] = [to, from];
    ranges.push({ from, to });
  });

  ranges.sort((a, b) => a.from - b.from);

  let stack = [ranges[0]];

  ranges.slice(1).forEach((range) => {
    let top = stack[stack.length - 1];
    if (top.to < range.from) {
      stack.push(range);
    } else if (top.to < range.to) {
      top.to = range.to;
    }
  });
  return stack;
};
