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
            original[i] = 8 * lorentzian(i, fourth) + 16 * lorentzian(i, 2 * fourth) + 8 * lorentzian(i, 3 * fourth);
            noisy[i] = original[i] + i;
        }

        let {error, iteration} = baselineCorrection(times, noisy);

        expect(error).toBeLessThan(0.001);
        expect(iteration).toBeLessThan(100);
    });
});
