import PolynomialRegression from 'ml-regression-polynomial';

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
export default function (x, y, options = {}) {
    let {
        maxIterations = 100,
        Regression = PolynomialRegression,
        regressionOptions,
        tolerance = 0.001
    } = options;

    if (!regressionOptions && Regression === PolynomialRegression) {
        regressionOptions = 3;
    }

    let baseline = y.slice();
    let fitting = y.slice();
    let oldFitting = y;
    let iteration = 0;
    let delta;
    while (iteration < maxIterations) {
        // Calculate the fitting result
        let regression = new Regression(x, baseline, regressionOptions);

        delta = 0;
        for (var i = 0; i < baseline.length; i++) {
            fitting[i] = regression.predict(x[i]);
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
    let corrected = new Array(baseline.length);
    for (var j = 0; j < baseline.length; j++) {
        corrected[j] = y[j] - baseline[j];
    }

    return {corrected, delta, iteration, baseline};
}
