import * as CMath from '../src/core/CustomMath';

describe('CustomMath library', () => {
  const PRECISION = 7;

  describe('factorial', () => {
    test('should calculate the factorial of 5', () => {
      expect(CMath.factorial(5)).toBe(120);
    });

    test('should return 1 for the factorial of 0', () => {
      expect(CMath.factorial(0)).toBe(1);
    });

    test('should return NaN for negative numbers', () => {
      expect(CMath.factorial(-1)).toBeNaN();
    });
  });

  describe('pow', () => {
    test('should calculate 2 to the power of 8', () => {
      expect(CMath.pow(2, 8)).toBe(256);
    });

    test('should handle negative exponents', () => {
      expect(CMath.pow(4, -2)).toBe(0.0625);
    });

    test('should handle zero exponent', () => {
      expect(CMath.pow(100, 0)).toBe(1);
    });

    test('should handle fractional exponents', () => {
      expect(CMath.pow(9, 0.5)).toBeCloseTo(3, PRECISION);
    });
  });

  describe('sqrt', () => {
    test('should calculate the square root of 16', () => {
      expect(CMath.sqrt(16)).toBe(4);
    });
    test('should calculate the square root of 2', () => {
      expect(CMath.sqrt(2)).toBeCloseTo(1.41421356, PRECISION);
    });
  });

  describe('cbrt', () => {
    test('should calculate the cube root of 27', () => {
      expect(CMath.cbrt(27)).toBeCloseTo(3, PRECISION);
    });
    test('should handle negative numbers', () => {
      expect(CMath.cbrt(-8)).toBeCloseTo(-2, PRECISION);
    });
  });

  describe('logarithms', () => {
    test('ln(E) should be close to 1', () => {
      expect(CMath.ln(CMath.E)).toBeCloseTo(1, PRECISION);
    });

    test('log10(100) should be close to 2', () => {
      expect(CMath.log10(100)).toBeCloseTo(2, PRECISION);
    });

    test('log2(8) should be close to 3', () => {
      expect(CMath.log2(8)).toBeCloseTo(3, PRECISION);
    });
  });

  describe('trigonometry (in radians)', () => {
    test('sin(PI/2) should be close to 1', () => {
      expect(CMath.sin(CMath.PI / 2)).toBeCloseTo(1, PRECISION);
    });

    test('cos(PI) should be close to -1', () => {
      expect(CMath.cos(CMath.PI)).toBeCloseTo(-1, PRECISION);
    });

    test('tan(PI/4) should be close to 1', () => {
      expect(CMath.tan(CMath.PI / 4)).toBeCloseTo(1, PRECISION);
    });
  });

  describe('yrtx', () => {
    test('3rd root of 27 should be close to 3', () => {
      expect(CMath.yrtx(27, 3)).toBeCloseTo(3, PRECISION);
    });
  });
});