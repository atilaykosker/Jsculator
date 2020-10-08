class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }
  clear() {
    this.currentText = "";
    this.previousText = "";
    this.operation = undefined;
  }
  deleteOperation() {
    this.currentText = this.currentText.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentText === ".") return;
    this.currentText = this.currentText.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentText === "") return;
    if (this.previousText !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousText = this.currentText + this.operation;
    this.currentText = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousText);
    const current = parseFloat(this.currentText);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentText = computation;
    this.operation = undefined;
    this.previousText = "";
  }

  getDisplay(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.getDisplay(this.currentText);
    this.previousTextElement.innerText = this.getDisplay(this.previousText);
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.getElementById("dl");
const equalsButton = document.getElementById("eq");
const allClearButton = document.getElementById("ac");
const previousTextElement = document.getElementById("po");
const currentTextElement = document.getElementById("co");
const calculator = new Calculator(previousTextElement, currentTextElement);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.deleteOperation();
  calculator.updateDisplay();
});
