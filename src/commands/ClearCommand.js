// src/commands/ClearCommand.js
export class ClearCommand {
  /**
   * @param {object} calculator - Экземпляр класса Calculator.
   */
  constructor(calculator) {
    this.calculator = calculator;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.clear();
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}