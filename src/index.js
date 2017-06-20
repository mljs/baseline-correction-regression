import PolynomialRegression from 'ml-regression-polynomial';

export default function baselineCorrection(x, y, options = {}) {
    let {
        maxIterations = 100,
        regressionFunction = PolynomialRegression,
        regressionOptions,
        tolerance = 0.001
    } = options;

    if (!regressionOptions && regressionFunction.constructor.name === PolynomialRegression) {
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
            fitting[i] = regression.predict(baseline[i]);
            if (baseline[i] > fitting[i]) {
                baseline[i] = fitting[i];
            }
            error += Math.abs(fitting[i] - oldFitting[i]) / oldFitting[i];
        }

        // Stop criterion
        if (error < tolerance) {
            break;
        } else {
            oldFitting = fitting.slice();
        }
    }

    // removes baseline
    let correctedAns = new Array(baseline.length);
    for (let i = 0; i < baseline.length; i++) {
        correctedAns[i] = y[i] - baseline[i];
    }

    return {correctedAns, error, iteration};
}
