export class RandomCommand {
  constructor(calculator) {
    this.calculator = calculator;
    this.prevState = null;
  }

  execute() {
    this.prevState = this.calculator.getState();
    this.calculator.generateRandom();
  }

  undo() {
    if (this.prevState) {
      this.calculator.setState(this.prevState);
    }
  }
}