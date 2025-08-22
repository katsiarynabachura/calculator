export class EECommand {
  constructor(calculator) {
    this.calculator = calculator;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.inputEE();
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}