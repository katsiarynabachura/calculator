// src/commands/CalculateCommand.js
export class CalculateCommand {
  /**
   * @param {object} calculator - Экземпляр класса Calculator.
   */
  constructor(calculator) {
    this.calculator = calculator;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.calculate();
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}