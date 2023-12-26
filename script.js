// create a calculator class
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // check input for decimals
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        // return if the values are not numbers
        if (isNaN(prev) || isNaN(curr)) return;

        // teach the calculator to compute functions
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        // split into before and after decimal place
        const stringNumber = number.toString();
        const beforeDecimal = parseFloat(stringNumber.split('.')[0]);
        const afterDecimal = stringNumber.split('.')[1];

        // set the display for before the decimal
        let beforeDisplay;
        if (isNaN(beforeDecimal)) {
            beforeDisplay = '';
        } else {
            beforeDisplay = beforeDecimal.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        // set the display for after the decimal
        if (afterDecimal != null) {
            return `${beforeDisplay}.${afterDecimal}`;
        } else {
            return beforeDisplay;
        }

    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }
}

// define buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-prev-operand]');
const currentOperandText = document.querySelector('[data-curr-operand]');


// create a calculator object
const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener(('click'), button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener(('click'), button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener(('click'), button => {
    calculator.delete();
    calculator.updateDisplay();
});

