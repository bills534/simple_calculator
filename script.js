/*jshint esversion: 6 */


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        // clearing everything on startup to set starting values
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) {
            // skipping . if one already is in number
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        this.operation = operation;
        
        // ignore empty/invalid operations
        if(this.currentOperand === '' || this.currentOperand === '.') {
            return;
        }

        // if there is math to do, do it
        if(this.previousOperand !== '') {
            this.compute();
        }

        // setting previous line to current line when operation entered
        this.previousOperand = `${this.currentOperand}`;
        this.currentOperand = '';

    }

    compute() {
        let compuation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) {
            return;
        }

        switch (this.operation) {
            case '+': compuation = prev + current; break;
            case '-': compuation = prev - current; break;
            case '*': compuation = prev * current; break;
            case '÷': compuation = prev / current; break;
            default: return;
        }
        this.currentOperand = compuation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        // setting current operation div = current operand
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
});