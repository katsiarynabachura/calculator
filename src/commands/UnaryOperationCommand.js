export class UnaryOperationCommand {
  /**
   * @param {object} calculator - Экземпляр класса Calculator.
   * @param {string} operation - Идентификатор унарной операции ('sin', 'sqrt', etc.).
   */
  constructor(calculator, operation) {
    this.calculator = calculator;
    this.operation = operation;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.applyUnaryOperation(this.operation);
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}