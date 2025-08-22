import {
  AddDigitCommand,
  CalculateCommand,
  ClearCommand,
  InputPercentCommand,
  MemoryCommand,
  SetOperationCommand,
  ToggleRadDegCommand,
  ToggleSignCommand,
  UnaryOperationCommand,
  RandomCommand,
  EECommand,
  Toggle2ndCommand,
} from '../commands/index.js';
// import { yrtx } from '../core/CustomMath.js';

const functionMappings = {
    sin: { base: 'sin', second: 'asin', display: { base: 'sin', second: 'sin⁻¹' } },
    cos: { base: 'cos', second: 'acos', display: { base: 'cos', second: 'cos⁻¹' } },
    tan: { base: 'tan', second: 'atan', display: { base: 'tan', second: 'tan⁻¹' } },
    sinh: { base: 'sinh', second: 'asinh', display: { base: 'sinh', second: 'sinh⁻¹' } },
    cosh: { base: 'cosh', second: 'acosh', display: { base: 'cosh', second: 'cosh⁻¹' } },
    tanh: { base: 'tanh', second: 'atanh', display: { base: 'tanh', second: 'tanh⁻¹' } },
    square: { base: 'square', second: 'sqrt', display: { base: 'x²', second: '²√x' } },
    cube: { base: 'cube', second: 'cbrt', display: { base: 'x³', second: '³√x' } },
    powy: { base: 'powy', second: 'yrtx', display: { base: 'xʸ', second: 'ʸ√x' } },
    epowx: { base: 'epowx', second: 'pow2x', display: { base: 'eˣ', second: '2ˣ' } },
    ln: { base: 'ln', second: 'log2', display: { base: 'ln', second: 'log₂' } },
    log10: { base: 'log10', second: '10powx', display: { base: '10ˣ', second: 'log₁₀' } },
};

export class DOMController {
    constructor(invoker) {
        this.invoker = invoker; // The main App instance that executes commands
        this.display = document.getElementById('result');
        this.buttonsContainer = document.querySelector('.buttons');
        this.themeSwitcher = document.getElementById('theme');
        this.radButton = document.querySelector('button[data-action="rad"]');

        this.bindEvents();
  }

  /**
   * Binds all necessary event listeners.
   */
  bindEvents() {
    this.buttonsContainer.addEventListener(
      'click',
      this.handleButtonClick.bind(this)
    );
    this.themeSwitcher.addEventListener('change', this.toggleTheme.bind(this));
  }

  /**
   * Handles all clicks on the calculator buttons.
   * Determines which command to create and tells the invoker to execute it.
   */
  handleButtonClick(event) {
    const button = event.target.closest('button');
    if (!button) return;

    const { action, number } = button.dataset;
    let command = null;

    if (number) {
      command = new AddDigitCommand(this.invoker.calculator, number);
    } else if (action) {
      // These lists help categorize the actions from data-action attributes
      const unaryActions = [
        'square',
        'cube',
        'reciprocal',
        'sqrt',
        'cbrt',
        'ln',
        'log10',
        'factorial',
        'sin',
        'cos',
        'tan',
        'sinh',
        'cosh',
        'tanh',
        'epowx',
        '10powx',
        'log2',
        'pow2x',
        'asin',
        'acos',
        'atan',
        'asinh',
        'acosh',
        'atanh',
      ];
      const binaryActions = ['add', 'subtract', 'multiply', 'divide', 'powy', 'yrtx'];
      const memoryActions = ['mc', 'm-plus', 'm-minus', 'mr'];

      if (unaryActions.includes(action)) {
        command = new UnaryOperationCommand(this.invoker.calculator, action);
      } else if (binaryActions.includes(action)) {
        command = new SetOperationCommand(this.invoker.calculator, action);
      } else if (memoryActions.includes(action)) {
        command = new MemoryCommand(this.invoker.calculator, action);
      } else {
        // Handle remaining specific actions
        switch (action) {
            case 'clear':
                command = new ClearCommand(this.invoker.calculator);
                break;
            case 'calculate':
                command = new CalculateCommand(this.invoker.calculator);
                break;
            case 'sign':
                command = new ToggleSignCommand(this.invoker.calculator);
                break;
            case 'percent':
                command = new InputPercentCommand(this.invoker.calculator);
                break;
            case 'rad':
                command = new ToggleRadDegCommand(this.invoker.calculator);
                break;
            case 'rad':
                command = new ToggleRadDegCommand(this.invoker.calculator);
                break;
             case 'rand':
                command = new RandomCommand(this.invoker.calculator);
                break;
            case 'ee':
                command = new EECommand(this.invoker.calculator);
                break;
             case '2nd':
                command = new Toggle2ndCommand(this.invoker.calculator);
                break;
        }
      }
    }

    // If a valid command was created, execute it.
    if (command) {
      this.invoker.executeCommand(command);
    }
  }

  /**
   * Updates all UI elements based on state of calculator
   * @param {object} state - Current state from calculator.getState()
   */
  update(state) {
    this.updateDisplay(state.currentValue);
    this.updateRadButton(state.isRadians);
    this.update2ndButtons(state.is2ndActive);
  }

  /**
   * Updates the text content of the display.
   * @param {string} value The value to show in the display.
   */
  updateDisplay(value) {
    if (value === 'Error' || isNaN(parseFloat(value))) {
      this.display.textContent = 'Error';
      return;
    }
    let formattedValue = value.toString();

    // Checking and removing unneccesary exponent with the 0
    if (
      formattedValue.toLowerCase().endsWith('e+0') ||
      formattedValue.toLowerCase().endsWith('e-0')
    ) {
      formattedValue = formattedValue.slice(0, -3);
    }

    // Formatting for too long numbers
    if (formattedValue.length > 15) {
      this.display.textContent = parseFloat(formattedValue).toExponential(9);
    } else {
      this.display.textContent = formattedValue;
    }
    // if (value.length > 15) {
    //   this.display.textContent = parseFloat(value).toExponential(9);
    // } else {
    //   this.display.textContent = value;
    // }
  }

  /**
   * Updates the text on a button Rad/Deg
   * @param {boolean} isRadians
   */
  updateRadButton(isRadians) {
    this.radButton.textContent = isRadians ? 'Rad' : 'Deg';
  }

  /**
   * Switches lookks and data-action buttons for 2nd
   * @param {boolean} is2ndActive
   */
  update2ndButtons(is2ndActive) {
    for (const key in functionMappings) {
      const mapping = functionMappings[key];
      const button = document.querySelector(
        `button[data-action="${mapping.base}"], button[data-action="${mapping.second}"]`
      );
      if (button) {
        if (is2ndActive) {
          button.innerHTML = mapping.display.second;
          button.dataset.action = mapping.second;
        } else {
          button.innerHTML = mapping.display.base;
          button.dataset.action = mapping.base;
        }
      }
    }
  }

  /**
   * Toggles the light/dark theme class on the body.
   */
  toggleTheme() {
    document.body.classList.toggle('light-theme');
  }
}