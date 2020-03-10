class Calculator {
    constructor(previousOuput, currentOuput) {
        this.previousOutput = previousOuput;
        this.currentOutput = currentOuput;
        this.reset(); // to include other members
    }
    reset() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }
    pop_back() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    push_back(num_string) {
        if (num_string === "." && this.currentOperand.includes(".")) // string can only contain one decimal point
            return;
        this.currentOperand = this.currentOperand + num_string;
    }
    switch_sign() {
        if (this.currentOperand[0] === "-")
            this.currentOperand = this.currentOperand.slice(1, this.currentOperand.length);
        else
            this.currentOperand = "-" + this.currentOperand;
    }
    set_operation(operation_string) {
        if (this.currentOperand === "") // no "previous" operand
            return;
        else if (this.previousOperand !== "") // there is a previous operand
            this.get_computation();
        this.operation = operation_string;
        this.previousOperand = this.currentOperand; // push current to previous
        this.currentOperand = ""; // reset current
    }
    get_computation() {
        let result = undefined;
        // convert string to floating point number
        const lhs = parseFloat(this.previousOperand);
        const rhs = parseFloat(this.currentOperand);

        if (isNaN(lhs) || isNaN(rhs)) // is both valid
            return;
        switch (this.operation) {
            case "+":
                result = lhs + rhs;
                break;
            case "-":
                result = lhs - rhs;
                break;
            case "×":
                result = lhs * rhs;
                break;
            case "÷":
                result = lhs / rhs;
                break;
            default: // should never occur, but for safety
                break;
        }
        this.currentOperand = result; // result
        this.previousOperand = ""; // do not need anymore
        this.operation = undefined; // reset (not necessary)
    }
    display() {
        this.currentOutput.innerText = this.currentOperand;
        if (this.operation != null) // used set_operation
            this.previousOutput.innerText = `${this.previousOperand} ${this.operation}`;
        else // computed or operation not set
            this.previousOutput.innerText = "";
    }
}

// DOMs
const previousOuput = document.querySelector(".prev");
const currentOuput = document.querySelector(".curr");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const acButton = document.querySelector(".ac");
const delButton = document.querySelector(".del");
const signButton = document.querySelector(".sign");
const equalButton = document.querySelector(".equal");

const calculator = new Calculator(previousOuput, currentOuput);

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.push_back(button.innerText);
        calculator.display();
    })
});
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.set_operation(button.innerText);
        calculator.display();
    })
});
acButton.addEventListener("click", () => {
    calculator.reset();
    calculator.display();
});
delButton.addEventListener("click", () => {
    calculator.pop_back();
    calculator.display();
});
signButton.addEventListener("click", () => {
    calculator.switch_sign();
    calculator.display();
});
equalButton.addEventListener("click", () => {
    calculator.get_computation();
    calculator.display();
});