import baselineCorrection from '..';

// https://en.wikipedia.org/wiki/Cauchy_distribution
function lorentzian(x, x0 = 0, gamma = 1) {
    return (gamma * gamma) / (Math.PI * gamma * (gamma * gamma + (x - x0) * (x - x0)));
}

describe('Simulated', () => {
    it('Lineal baseline', () => {
        const size = 30;
        const fourth = size / 4;
        let times = new Array(size);
        let original = new Array(size);
        let noisy = new Array(size);
        for (let i = 0; i < size; ++i) {
            times[i] = i;
            original[i] = lorentzian(i, fourth) + 2 * lorentzian(i, 2 * fourth) + lorentzian(i, 3 * fourth);
            noisy[i] = original[i] + i;
        }

        let {correctedAns} = baselineCorrection(times, noisy);
        expect(correctedAns).toEqual(original);
    });
});
