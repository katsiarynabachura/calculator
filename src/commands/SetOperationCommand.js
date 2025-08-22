export class SetOperationCommand {
  /**
   * @param {object} calculator - Экземпляр класса Calculator.
   * @param {string} operation - Идентификатор операции ('add', 'multiply', etc.).
   */
  constructor(calculator, operation) {
    this.calculator = calculator;
    this.operation = operation;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.setOperation(this.operation);
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}