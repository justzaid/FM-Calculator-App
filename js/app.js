// Cached Elements
const calculatorContainer = document.getElementById('calculator-container')
const themeSwitch = document.querySelectorAll('input[name="theme"]')
const numberButtons = document.querySelectorAll('.number')
const calcScreen = document.getElementById('screen')
const operators = document.querySelectorAll('.operator')
const equalToBtn = document.getElementById('=')
const resetButton = document.getElementById('reset')

// Variables
let num1;
let num2;
let operator;
let result = '';


// Functions

const num1Selector = (event) => {
    if (num1 && operator) return

    if (!num1) {
        num1 = event.target.id
    } else {
        num1 += event.target.id
    }
    result = num1
    console.log('num1', num1)
    calcScreen.textContent = num1
}

const operatorSelector = (event) => {
    operator = ''
    result = num1

    operator = event.target.id
    result += operator

    console.log(operator)
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
    calcScreen.textContent = num1
    console.log(num1)
}

const resetBtn = () => {
    num1 = '';
    num2 = '';
    operator = '';
    result = '';
    calcScreen.textContent = 0;
}


const numberSelectors = (event) => {
    num1Selector(event)
    num2Selector(event)
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

operators.forEach((op) => {
    op.addEventListener('click', operatorSelector)
})

equalToBtn.addEventListener('click', evaluateResult)

resetButton.addEventListener('click', resetBtn)