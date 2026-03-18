// Cached Elements
const calculatorContainer = document.getElementById('calculator-container')
const themeSwitch = document.querySelectorAll('input[name="theme"]')
const numberButtons = document.querySelectorAll('.number')
const calcScreen = document.getElementById('screen')
const operators = document.querySelectorAll('.operator')
const equalToBtn = document.getElementById('=')
const resetButton = document.getElementById('reset')
const deleteButton = document.getElementById('del')

// Variables
let num1;
let num2;
let lastOperator;
let lastNum2;
let operator;
let display = '';


// Functions

const numberSelectors = (event) => {
    if (num1 && operator) {
        num2Selector(event)
    } else {
        num1Selector(event)
    }
}

const num1Selector = (event) => {
    if (!num1) {
        if (event.target.id === '.') {
            num1 = `0.`
        } else {
        num1 = event.target.id
        console.log('num1:', num1)
        }
    } else {
        if (num1.includes('.') && event.target.id === '.') {
            return
        } else {
            num1 += event.target.id
            console.log('num1:', num1)
        }
    }
    display = num1
    updateScreen()
}

const operatorSelector = (event) => {
    if (!num1) return
    num2 = ''
    operator = event.target.id
    console.log('operator:', operator)
    updateScreen()
}

const num2Selector = (event) => {
    if (!num2) {
        if (event.target.id === '.') {
            num2 = `0.`
        } else {
            num2 = event.target.id
        }
    } else {
        if (num2.includes('.') && event.target.id === '.') {
            return
        } else {
            num2 += event.target.id
        }
    }
    console.log('num2:', num2)
    display = num1 + operator + num2
    console.log('display:', display)
    updateScreen()
}

const evaluateResult = () => {
    if  (num1 && operator && !num2 ||
        !num1 && !operator && !num2) return

    if (lastOperator && lastNum2) {

        if (lastOperator === '+') {
            display = Number(num1) + Number(lastNum2)
        } else if (lastOperator === '-') {
            display = Number(num1) - Number(lastNum2)
        } else if (lastOperator === '*') {
            if (num1 === '0' || lastNum2 === '0') {
                display = 'Error'
            } else {
                display = Number(num1) * Number(lastNum2)
            }
        } else {
            if (num1 === '0' || lastNum2 === '0') {
                display = 'Error'
            } else {
                display = Number(num1) / Number(lastNum2)
            }
        }
    } else {

        if (operator === '+') {
            display = Number(num1) + Number(num2)
        } else if (operator === '-') {
            display = Number(num1) - Number(num2)
        } else if (operator === '*') {
            if (num1 === '0' || num2 === '0') {
                display = 'Error'
            } else {
                display = Number(num1) * Number(num2)
            }
        } else {
            if (num1 === '0' || num2 === '0') {
                display = 'Error'
            } else {
                display = Number(num1) / Number(num2)
            }
        }
    }
        
    num1 = display.toString()
    lastOperator = operator || lastOperator
    lastNum2 = num2 || lastNum2
    calcScreen.textContent = num1
    num2 = ''
    operator = ''
    console.log('num1 after result', num1)
    console.log('previos op', lastOperator)
    console.log('previos num2', lastNum2)

}

const updateScreen = () => {
    if (num1 && !operator && !num2) {
        display = num1
    } else if (num1 && operator && !num2) {
        display = num1 + operator
    } else if (num1 && operator && num2) {
        display = num1 + operator + num2
    }
    calcScreen.textContent = display
}

const resetBtn = () => {
    num1 = '';
    num2 = '';
    operator = '';
    display = '';
    calcScreen.textContent = 0;
}


// Event Listeners

// Theme Switcher
themeSwitch.forEach((theme) => {
    theme.addEventListener('change', () => {
        calculatorContainer.className = theme.value
    })
})

// Button display
numberButtons.forEach((btn) => {
    btn.addEventListener('click', numberSelectors)
})

// Operators
operators.forEach((op) => {
    op.addEventListener('click', operatorSelector)
})

// Equal
equalToBtn.addEventListener('click', evaluateResult)

// Reset
resetButton.addEventListener('click', resetBtn)
