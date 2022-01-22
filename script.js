/*jshint esversion: 6 */


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, debugElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.debugElement = debugElement;

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
            this.compute('operation');
        }

        // setting previous line to current line when operation entered
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute(computeSource) {
        let compuation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) {
            return;
        }

        switch (this.operation) {
            case '+': compuation = prev + current; break;
            case '-': compuation = prev - current; break;
            case '×': compuation = prev * current; break;
            case '÷': compuation = prev / current; break;
            default: return;
        }
        this.currentOperand = compuation;
        
        // allow for chainging together more than 2 operand only calculations
        // by only clearing operation and previousOperand when the source is the = button
        if(computeSource === 'equal') {
            this.operation = undefined;
            this.previousOperand = '';
        }
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0});
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        // setting current operation div = current operand
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }

        this.debugElement.innerText = `prev:${this.previousOperand}
        current:${this.currentOperand}
        operation:${this.operation}`;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const debugElement = document.querySelector('[debug-box]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, debugElement);

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
    calculator.compute('equal');
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