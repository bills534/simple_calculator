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
        this.previousOperand = `${this.currentOperand} ${operation}`;
        this.currentOperand = '';

    }

    compute() {

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