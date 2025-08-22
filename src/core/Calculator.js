/**
 * Calculator.js
 *
 * Этот класс представляет собой ядро калькулятора. Он управляет состоянием
 * (текущее значение, предыдущее значение, операция), выполняет все вычисления
 * и предоставляет интерфейс для взаимодействия с командами (Command pattern).
 */

// Импортируем все пользовательские математические функции и константы
import * as CMath from './CustomMath';

const operationsMap = {
  // Бинарные операторы
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b === 0 ? 'Error' : a / b),
  powy: (a, b) => CMath.pow(a, b), // x^y
   yrtx: (a, b) => CMath.yrtx(a, b),

  // Унарные операторы
  square: (a) => a * a, // x²
  cube: (a) => a * a * a, // x³
  reciprocal: (a) => (a === 0 ? 'Error' : 1 / a), // 1/x
  sqrt: (a) => CMath.sqrt(a), // ²√x
  cbrt: (a) => CMath.cbrt(a), // ³√x
  factorial: (a) => CMath.factorial(a), // x!
  epowx: (a) => CMath.exp(a), // e^x
  '10powx': (a) => CMath.pow(10, a), // 10^x

  // Логарифмы
  ln: (a) => CMath.ln(a),
  log10: (a) => CMath.log10(a),
  log2: (a) => CMath.log2(a),
  pow2x: (a) => CMath.pow2x(a),

  // Тригонометрия (предполагаем, что CMath обработает Rad/Deg)
  sin: (a, isRadians) => (isRadians ? CMath.sin(a) : CMath.sin(a * (CMath.PI / 180))),
  cos: (a, isRadians) => (isRadians ? CMath.cos(a) : CMath.cos(a * (CMath.PI / 180))),
  tan: (a, isRadians) => (isRadians ? CMath.tan(a) : CMath.tan(a * (CMath.PI / 180))),

  // Гиперболические функции
  sinh: (a) => CMath.sinh(a),
  cosh: (a) => CMath.cosh(a),
  tanh: (a) => CMath.tanh(a),

  // Обратные тригонометрические и гиперболические функции ---
  asin: (a) => CMath.asin(a),
  acos: (a) => CMath.acos(a),
  atan: (a) => CMath.atan(a),
  asinh: (a) => CMath.asinh(a),
  acosh: (a) => CMath.acosh(a),
  atanh: (a) => CMath.atanh(a),
};

export class Calculator {
  constructor() {
    this.currentValue = '0';
    this.previousValue = '';
    this.operation = null;
    this.isNewNumber = true; // Флаг для начала ввода нового числа
    this.memory = 0;
    this.isRadians = true; // Режим углов: true для радиан, false для градусов
    this.is2ndActive = false;
  }

  /**
   * --- ИСПРАВЛЕНИЕ: Улучшенный метод округления ---
   * Устраняет неточности с плавающей запятой, округляя до 10 знаков.
   * @param {number} value - Число для округления.
   * @returns {number}
   */
  roundResult(value) {
    const epsilon = 1e-12;
    const rounded = Math.round(value);

    if (Math.abs(rounded - value) < epsilon) {
      return rounded;
    }

    return parseFloat(value.toPrecision(12));
  }

  /**
   * Добавляет цифру или специальный символ к текущему значению.
   * @param {string} input - Цифра, точка или константа ('pi', 'e').
   */
  addDigit(input) {
    if (input === 'pi') {
      this.currentValue = String(CMath.PI);
      return;
    }
    if (input === 'e') {
      this.currentValue = String(CMath.E);
      return;
    }

    if (this.isNewNumber) {
      this.currentValue = input === '.' ? '0.' : input;
      this.isNewNumber = false;
    } else {
      if (input === '.' && this.currentValue.includes('.')) return;
      this.currentValue += input;
    }
  }

  /**
   * Устанавливает бинарную операцию (+, -, *, /).
   * @param {string} op - Строковый идентификатор операции.
   */
  setOperation(op) {
    if (!this.isNewNumber) {
      this.calculate();
    }
    this.previousValue = this.currentValue;
    this.operation = op;
    this.isNewNumber = true;
  }

  /**
   * Применяет унарную операцию (sqrt, sin, и т.д.).
   * @param {string} op - Строковый идентификатор операции.
   */
  applyUnaryOperation(op) {
    const value = parseFloat(this.currentValue);
    let result = operationsMap[op](value, this.isRadians);

    if (isNaN(result) || result === 'Error') {
      this.currentValue = 'Error';
    } else {
      result = this.roundResult(result);
      this.currentValue = String(result);
    }
    this.isNewNumber = true;
  }

  /**
   * Выполняет бинарную операцию.
   */
  calculate() {
    if (!this.operation || !this.previousValue || this.isNewNumber) return;

    const prev = parseFloat(this.previousValue);
    const curr = parseFloat(this.currentValue);
    let result = operationsMap[this.operation](prev, curr);

    if (isNaN(result) || result === 'Error') {
      this.currentValue = 'Error';
    } else {
      result = this.roundResult(result);
      this.currentValue = String(result);
    }

    this.operation = null;
    this.previousValue = '';
    this.isNewNumber = true;
  }

  /**
   * Полностью сбрасывает состояние калькулятора.
   */
  clear() {
    this.currentValue = '0';
    this.previousValue = '';
    this.operation = null;
    this.isNewNumber = true;
  }

  /**
   * Генерирует псевдослучайное число от 0 до 1.
   * Так как Math.random() запрещен, используется простой LCG-генератор.
   */
  generateRandom() {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    // Используем текущее время как "seed"
    let seed = new Date().getTime();
    seed = (a * seed + c) % m;
    this.currentValue = String(seed / m);
    this.isNewNumber = true;
  }

  inputEE() {
    if (this.currentValue.toLowerCase().includes('e')) return;
    this.currentValue += 'e+';
    this.isNewNumber = false;
  }

  // --- Функции управления состоянием ---

  toggleSign() {
    if (this.currentValue === '0' || this.currentValue === 'Error') return;
    this.currentValue = this.currentValue.startsWith('-')
      ? this.currentValue.slice(1)
      : `-${this.currentValue}`;
  }

  inputPercent() {
    const value = parseFloat(this.currentValue);
    this.currentValue = String(value / 100);
    this.isNewNumber = true;
  }

  toggleRadDeg() {
    this.isRadians = !this.isRadians;
  }

  // --- Функции памяти ---

  memoryClear() {
    this.memory = 0;
  }
  memoryAdd() {
    const value = parseFloat(this.currentValue);
    if (!isNaN(value)) {
      this.memory += value;
    }
  }
  memorySubtract() {
    const value = parseFloat(this.currentValue);
    if (!isNaN(value)) {
      this.memory -= value;
    }
  }
  memoryRecall() {
    this.currentValue = String(this.memory);
    this.isNewNumber = true;
  }

  toggle2nd() {
    this.is2ndActive = !this.is2ndActive;
  }

  // --- Функции для паттерна Command ---

  /**
   * @returns {object} Полное текущее состояние калькулятора.
   */
  getState() {
    return {
      currentValue: this.currentValue,
      previousValue: this.previousValue,
      operation: this.operation,
      isNewNumber: this.isNewNumber,
      memory: this.memory,
      isRadians: this.isRadians,
      is2ndActive: this.is2ndActive,
    };
  }

  /**
   * Восстанавливает калькулятор до переданного состояния.
   * @param {object} state - Объект состояния для восстановления.
   */
  setState(state) {
    this.currentValue = state.currentValue;
    this.previousValue = state.previousValue;
    this.operation = state.operation;
    this.isNewNumber = state.isNewNumber;
    this.memory = state.memory;
    this.isRadians = state.isRadians;
    this.is2ndActive = state.is2ndActive;
  }
}