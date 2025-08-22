export class MemoryCommand {
  /**
   * @param {object} calculator - Экземпляр класса Calculator.
   * @param {string} action - Тип операции с памятью ('mc', 'm-plus', 'm-minus', 'mr').
   */
  constructor(calculator, action) {
    this.calculator = calculator;
    this.action = action;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    switch (this.action) {
      case 'mc':
        this.calculator.memoryClear();
        break;
      case 'm-plus':
        this.calculator.memoryAdd();
        break;
      case 'm-minus':
        this.calculator.memorySubtract();
        break;
      case 'mr':
        this.calculator.memoryRecall();
        break;
    }
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}