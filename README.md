# Extended Calculator

This is an advanced calculator application built with modern JavaScript. It uses the Command design pattern to manage operations and features a custom math library for calculations, avoiding the use of the built-in `Math` object. The project is bundled using Webpack and includes a full suite of unit tests with Jest.

---
## 1. Task
The full task description can be found at the following link: 
[Calculator app](https://github.com/katsiarynabachura/calculator)

---
## 2. How to Run the App
To run this project, you need to have Node.js and npm installed.

1.  **Clone the repository and install dependencies:**
    ```bash
    git clone https://github.com/katsiarynabachura/calculator.git
    cd calculator
    npm install
    ```

2.  **Run the development server:**
    This command will build the app, start a local server, and automatically open it in your browser. The page will auto-reload if you make changes to the source code.
    ```bash
    npm start
    ```

3.  **Run tests:**
    To run the Jest unit tests for the custom math library, use:
    ```bash
    npm test
    ```

4.  **Create a production build:**
    This command will bundle and minify all source files into the `/dist` directory, ready for deployment.
    ```bash
    npm run build
    ```

---
## 3. Project Structure
The project files are organized into the following directories:

* **/src/**: Contains all the application's source code.
    * **/src/core/**: Holds the core logic of the calculator (`Calculator.js`) and the custom math library (`CustomMath.js`).
    * **/src/ui/**: Contains the `DOMController.js` file, which is responsible for handling user interactions and updating the user interface.
    * **/src/commands/**: Stores all the command classes based on the Command pattern. Each file represents a specific user action (e.g., adding a digit, performing an operation).
    * `index.html`: The main HTML template.
    * `index.js`: The main entry point for the application, where everything is initialized.
    * `style.css`: The main stylesheet for the application.

* **/tests/**: Contains all unit tests for the project. Currently, it tests the `CustomMath.js` library to ensure calculation accuracy.

---
## 4. Deploy
[Calculator app deploy](https://calculator-extended-app.netlify.app/)
