// =============================================================================
// Константы и Вспомогательные функции
// =============================================================================

// The number of terms of the Taylor series for calculating trigonometric and
//or exponential functions. A higher value increases accuracy, but
// reduces performance
const PRECISION_TERMS = 100;

// Definding constants with enough accuracy
export const PI = 3.14159265358979323846;
export const E = 2.71828182845904523536;

/**
 * Calculate absolute number value
 * @param {number} x - Input number
 * @returns {number} Absolute value x
 */
function abs(x) {
  return x < 0 ? -x : x;
}

/**
 * Recursive calculation of the factorial.
 * Used as an auxiliary function for other calculations.
 * @param {number} n - Non-negative number
 * @returns {number} Factorial n.
 */
export function factorial(n) {
  if (n < 0 || n % 1 !== 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// =============================================================================
// Pow and root functions
// =============================================================================

/**
 * Raises a number to an integer power
 * @param {number} base - Base
 * @param {number} exponent - Integer exponent
 * @returns {number} Result of exponentiation
 */
export function pow(base, exponent) {
  if (exponent % 1 !== 0) {
    return exp(exponent * ln(base));
  }

  if (exponent === 0) return 1;
  if (exponent < 0) return 1 / pow(base, -exponent);

  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }
  return result;
}

/**
 * Caluculates the square root using the Newthon method.
 * @param {number} number - Non-negative number.
 * @returns {number} Square root.
 */
export function sqrt(number) {
  if (number < 0) return NaN;
  if (number === 0) return 0;

  let guess = number / 2;
  for (let i = 0; i < 50; i++) {
    guess = 0.5 * (guess + number / guess);
  }
  return guess;
}

/**
 * Calculates the cube root using the Newthon method.
 * @param {number} number - Number.
 * @returns {number} Cube root.
 */
export function cbrt(number) {
  if (number === 0) return 0;
  const isNegative = number < 0;
  const num = abs(number);

  let guess = num / 3;
  for (let i = 0; i < 50; i++) {
    guess = (2 * guess + num / (guess * guess)) / 3;
  }

  return isNegative ? -guess : guess;
}

// =============================================================================
// Exponential and Logarithmic functions
// =============================================================================

/**
 * Calculates e to the power of x (exp(x)) through the Taylor series.
 * @param {number} x - Exponent.
 * @returns {number} e^x.
 */
export function exp(x) {
  let sum = 1;
  let term = 1;
  for (let i = 1; i < PRECISION_TERMS * 2; i++) {
    term *= x / i;
    sum += term;
  }
  return sum;
}

/**
 * Вычисляет натуральный логарифм (ln(x)) через ряд Тейлора для atanh.
 * Этот метод обеспечивает лучшую сходимость, чем прямой ряд для ln.
 * ln(x) = 2 * atanh((x-1)/(x+1))
 * @param {number} x - Положительное число.
 * @returns {number} Натуральный логарифм.
 */
export function ln(x) {
  if (x <= 0) return NaN;
  if (x === 1) return 0;

  // Используем более быстро сходящийся ряд
  const val = (x - 1) / (x + 1);
  let sum = 0;
  for (let n = 0; n < PRECISION_TERMS * 2; n++) {
    const term = pow(val, 2 * n + 1) / (2 * n + 1);
    sum += term;
  }
  return 2 * sum;
}

/**
 * Десятичный логарифм (основание 10).
 * @param {number} x - Положительное число.
 * @returns {number} log10(x).
 */
export function log10(x) {
  return ln(x) / ln(10);
}

/**
 * Двоичный логарифм (основание 2).
 * @param {number} x - Положительное число.
 * @returns {number} log2(x).
 */
export function log2(x) {
  return ln(x) / ln(2);
}

/**
 * Возводит 2 в степень x (для режима 2nd).
 * @param {number} x - Показатель степени.
 * @returns {number} 2^x.
 */
export function pow2x(x) {
  return pow(2, x);
}

// =============================================================================
// Тригонометрические функции
// =============================================================================

/**
 * Вычисляет синус угла в радианах через ряд Тейлора.
 * @param {number} x - Угол в радианах.
 * @returns {number} sin(x).
 */
export function sin(x) {
  x = x % (2 * PI);
  if (x > PI) x -= 2 * PI;
  if (x < -PI) x += 2 * PI;

  let sum = 0;
  for (let n = 0; n < PRECISION_TERMS; n++) {
    const sign = n % 2 === 0 ? 1 : -1;
    const term = pow(x, 2 * n + 1) / factorial(2 * n + 1);
    sum += sign * term;
  }
  return sum;
}

/**
 * Вычисляет косинус угла в радианах через ряд Тейлора.
 * @param {number} x - Угол в радианах.
 * @returns {number} cos(x).
 */
export function cos(x) {
  x = x % (2 * PI);
  if (x > PI) x -= 2 * PI;
  if (x < -PI) x += 2 * PI;

  let sum = 0;
  for (let n = 0; n < PRECISION_TERMS; n++) {
    const sign = n % 2 === 0 ? 1 : -1;
    const term = pow(x, 2 * n) / factorial(2 * n);
    sum += sign * term;
  }
  return sum;
}

/**
 * Вычисляет тангенс угла.
 * @param {number} x - Угол в радианах.
 * @returns {number} tan(x).
 */
export function tan(x) {
  const c = cos(x);
  if (abs(c) < 1e-15) return NaN;
  return sin(x) / c;
}

// =============================================================================
// Гиперболические функции
// =============================================================================

/**
 * Вычисляет гиперболический синус.
 * @param {number} x - Число.
 * @returns {number} sinh(x).
 */
export function sinh(x) {
  return (exp(x) - exp(-x)) / 2;
}

/**
 * Вычисляет гиперболический косинус.
 * @param {number} x - Число.
 * @returns {number} cosh(x).
 */
export function cosh(x) {
  return (exp(x) + exp(-x)) / 2;
}

/**
 * Вычисляет гиперболический тангенс.
 * @param {number} x - Число.
 * @returns {number} tanh(x).
 */
export function tanh(x) {
  const c = cosh(x);
  if (c === 0) return NaN; // Хотя cosh(x) никогда не равен 0
  return sinh(x) / c;
}

/**
 * Вычисляет корень y-ой степени из x.
 * @param {number} x - Подкоренное выражение.
 * @param {number} y - Показатель корня.
 * @returns {number}
 */
export function yrtx(x, y) {
  if (y === 0) return NaN;
  // Используем формулу x^(1/y) = exp((1/y) * ln(x))
  return exp(ln(x) / y);
}

// =============================================================================
// --- НОВЫЙ БЛОК: Заглушки для обратных функций ---
// =============================================================================

function notImplemented(functionName) {
  console.warn(`CustomMath.${functionName} is not implemented.`);
  return NaN;
}

export function asin(x) { return notImplemented('asin'); }
export function acos(x) { return notImplemented('acos'); }
export function atan(x) { return notImplemented('atan'); }
export function asinh(x) { return notImplemented('asinh'); }
export function acosh(x) { return notImplemented('acosh'); }
export function atanh(x) { return notImplemented('atanh'); }