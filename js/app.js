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
let operator;
let result = '';


// Functions

const numberSelectors = (event) => {
    num1Selector(event)
    num2Selector(event)
}

const num1Selector = (event) => {
    if (num1 && operator) return

    if (!num1) {
        if (event.target.id === '.') {
            num1 = `0.`
        } else {
        num1 = event.target.id
        console.log('num1:', num1)
        }
    } else {
        num1 += event.target.id
        console.log('num1:', num1)
    }
    result = num1
    calcScreen.textContent = num1
}

const operatorSelector = (event) => {
    operator = ''
    result = num1

    operator = event.target.id
    result += operator

    console.log('operator:', operator)
    calcScreen.textContent = result
}

const num2Selector = (event) => {
    if (!num1 || !operator) return
    if (!num2) {
        num2 = event.target.id
        result += num2
    } else {
        result += event.target.id
    }
    console.log('num2', num2)
    calcScreen.textContent = result
}

const evaluateResult = () => {
    result = eval(result)
    num1 = result
    calcScreen.textContent = result
    console.log('num1', num1)
    num2 = 0
    operator = ''
}

const resetBtn = () => {
    num1 = '';
    num2 = '';
    operator = '';
    result = '';
    calcScreen.textContent = 0;
}

// const deleteBtn = () => {
//     if (num2) {
//         result -= num2.slice(0, -1)
//     } else if (operator) {
//         operator = ''
//         result = num1
//     } else {
//         num1 = num1.substring(0, num1.length - 1)
//         result -= num1
//     }
//     calcScreen.textContent = result
// }

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

// Delete
// deleteButton.addEventListener('click', deleteBtn)