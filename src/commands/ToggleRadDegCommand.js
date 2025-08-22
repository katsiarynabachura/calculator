export class ToggleRadDegCommand {
  constructor(calculator) {
    this.calculator = calculator;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.toggleRadDeg();
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}