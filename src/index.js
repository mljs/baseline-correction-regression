import PolynomialRegression from 'ml-regression-polynomial';

/**
 * Iterative regression-based baseline correction
 * @param {Array<number>} x - Independent axis variable
 * @param {Array<number>} y - Dependent axis variable
 * @param {object} [options] - Options object
 * @param {number} [options.maxIterations = 100] - Maximum number of allowed iterations
 * @param {function} [options.regressionFunction = PolynomialRegression] - Regression class with a predict method
 * @param {*} [options.regressionOptions] - Options for regressionFunction
 * @param {number} [options.tolerance = 0.001] - Convergence error tolerance
 * @return {{correctedAns: Array<number>, error: number, iteration: number, baseline: Array<number>}}
 */
export default function (x, y, options = {}) {
    let {
        maxIterations = 100,
        regressionFunction = PolynomialRegression,
        regressionOptions,
        tolerance = 0.001
    } = options;

    if (!regressionOptions && regressionFunction === PolynomialRegression) {
        regressionOptions = 3;
    }

    let baseline = y.slice();
    let fitting = new Array(baseline.length);
    let oldFitting = y;
    let iteration = 0;
    let error;
    while (iteration < maxIterations) {
        // Calculate the fitting result
        let regression = new regressionFunction(x, baseline, regressionOptions);

        error = 0;
        for (let i = 0; i < baseline.length; i++) {
            fitting[i] = regression.predict(x[i]);
            if (baseline[i] > fitting[i]) {
                baseline[i] = fitting[i];
            }

            error += Math.abs((fitting[i] - oldFitting[i]) / oldFitting[i]);
        }

        // Stop criterion
        if (error < tolerance) {
            break;
        } else {
            oldFitting = fitting.slice();
            iteration++;
        }
    }

    // removes baseline
    let correctedAns = new Array(baseline.length);
    for (let i = 0; i < baseline.length; i++) {
        correctedAns[i] = y[i] - baseline[i];
    }

    return {correctedAns, error, iteration, baseline};
}
