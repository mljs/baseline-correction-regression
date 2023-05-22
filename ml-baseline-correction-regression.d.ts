declare module 'ml-baseline-correction-regression' {
  class Regression {
    constructor(x: number[] | Float64Array, y: number[] | Float64Array, options: Record<string, any>);

    predict(x: number): number
  }
  export interface BaseLineRegressionOptions {
    /**
     * Maximum number of allowed iterations
     * @default 100
     */
    maxIterations?: number;
    /**
     * Regression class with a predict method. Default PolynomialRegression
     * @default 100
     */
    Regression?: Regression;
    /**
     * regression options for options.Regression
     */
    regressionOptions?: any;
    /**
     * Convergence error tolerance
     */
    tolerance?: number,
    
  }

  export default function baselineCorrectionRegression(
    x: number[] | Float64Array,
    y: number[] | Float64Array,
    options?: BaseLineRegressionOptions,
  ): {
    corrected: number[] | Float64Array,
    baseline: number[] | Float64Array,
    iteration: number,
    delta: number
    regression: Regression
  };
}