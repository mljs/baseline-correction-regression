import baselineCorrection from '..';

// https://en.wikipedia.org/wiki/Cauchy_distribution
function lorentzian(x, x0 = 0, gamma = 1) {
  return (
    (gamma * gamma) / (Math.PI * gamma * (gamma * gamma + (x - x0) * (x - x0)))
  );
}

describe('Simulated', () => {
  const size = 100;
  const fourth = size / 4;
  let times = new Array(size);
  let original = new Array(size);
  let noisy = new Array(size);
  for (let i = 0; i < size; ++i) {
    times[i] = i;
    original[i] =
      8 * lorentzian(i, fourth) +
      16 * lorentzian(i, 2 * fourth) +
      8 * lorentzian(i, 3 * fourth);
    noisy[i] = original[i] + i;
  }
  it('Lineal baseline complet', () => {
    let { delta, iteration } = baselineCorrection(times, noisy);
    expect(delta).toBeLessThan(0.001);
    expect(iteration).toBeLessThan(100);
  });
  it('Reduce number of points', () => {
    let { delta, iteration } = baselineCorrection(times, noisy, {
      reduce: true,
      nbPoints: 15,
    });
    expect(delta).toBeLessThan(0.001);
    expect(iteration).toBeLessThan(100);
  });
  it('BaselineZones', () => {
    let { delta, iteration } = baselineCorrection(times, noisy, {
      baselineZones: [
        { from: 92, to: 86 },
        { from: 0, to: 20 },
        { from: 34, to: 40 },
        { from: 98, to: 90 },
      ],
    });
    expect(delta).toBeLessThan(0.001);
    expect(iteration).toBeLessThan(100);
  });
});
// zones = [{from: 2, to: 5}, {from: 20, to: 23}, {from: 27, to: 18}]
