// src/commands/AddDigitCommand.js
export class AddDigitCommand {
  /**
   * @param {object} calculator - Экземпляр класса Calculator.
   * @param {string} digit - Вводимая цифра или константа ('pi', 'e').
   */
  constructor(calculator, digit) {
    this.calculator = calculator;
    this.digit = digit;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.addDigit(this.digit);
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}