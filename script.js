class Calculator {
    constructor(pOperendTextElement, cOperendTextElement) {
        this.pOperendTextElement = pOperendTextElement;
        this.cOperendTextElement = cOperendTextElement;
        this.clear();
    }

    clear() {
        this.previousOperend = '';
        this.currentOperend = '';
        this.operation = undefined;
    }

    delete() {

        this.currentOperend = this.currentOperend.toString().slice(0, -1);

    }

    appendNumber(number) {

        if (number == '.' && this.currentOperend.includes('.')) return;

        this.currentOperend = this.currentOperend.toString() + number.toString();

    }

    chooseOperaion(operation) {

        if (this.currentOperend === '') return

        if (this.previousOperend !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperend = this.currentOperend;
        this.currentOperend = '';

    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperend);
        const current = parseFloat(this.currentOperend);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '':
                computation = prev * current;
                break;
            default:
                return;
        }

        this.currentOperend = computation;
        this.operation = undefined;
        this.previousOperend = '';


    }

    getDisplayNumber(number) {
        const stringNumebr = number.toString();
        const integerNumber = parseFloat(stringNumebr.split('.')[0]);
        const decimelNumber = stringNumebr.split('.')[1];
        let integerDisplay;
        if(isNaN(integerNumber)){
            integerDisplay = '';
        }else{
            integerDisplay = integerNumber.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimelNumber!=null){
            return `${integerDisplay}.${decimelNumber}`
        }
        return integerDisplay;

    }
    updateDisplay() {

        this.cOperendTextElement.innerText = this.getDisplayNumber(this.currentOperend);
        if (this.operation != null) {
            this.pOperendTextElement.innerText = `${this.getDisplayNumber(this.previousOperend)}${this.operation}`;
        } else {
            this.pOperendTextElement.innerText = this.getDisplayNumber(this.previousOperend);
        }


    }
}



const numButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const pOperendTextElement = document.querySelector('[data-poperend]')
const cOperendTextElement = document.querySelector('[data-coperend]')

const calculator = new Calculator(pOperendTextElement, cOperendTextElement);

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperaion(button.innerText);
        calculator.updateDisplay();

    })
})


equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})