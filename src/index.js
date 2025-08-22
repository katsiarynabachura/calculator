import './style.css';

import { Calculator } from './core/Calculator.js';
import { DOMController } from './ui/DOMController.js';

class App {
  constructor() {
    this.calculator = new Calculator();
    this.domController = new DOMController(this);
    this.history = [];

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'z') {
        this.undo();
      }
    });

    this.updateUI();
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
    this.updateUI();
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.updateUI();
    }
  }

  updateUI() {
    const state = this.calculator.getState();
    // this.domController.updateDisplay(state.currentValue);
    this.domController.update(state);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});