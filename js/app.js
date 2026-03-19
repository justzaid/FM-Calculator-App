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
let previousCalc = false;
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
    if (!num1 || num1 === 'Error' || previousCalc) {
        if (event.target.id === '.') {
            num1 = `0.`
        } else {
        num1 = event.target.id
        console.log('num1:', num1)
        }
        previousCalc = false;
    } else {
        if (num1.includes('.') && event.target.id === '.') {
            return
        } else {
            if (num1 === '0') {
                num1 = event.target.id
            } else {
                num1 += event.target.id
                console.log('num1:', num1)
            }
        }
    }
    updateScreen()
}

const operatorSelector = (event) => {
    if (!num1) return
    if (previousCalc) {
        previousCalc = false;
        lastNum2 = '';
        lastOperator = ''
    }
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
    updateScreen()
}

const evaluateResult = () => {
    let numToUse = num2 || lastNum2 || num1;
    let operatorToUse = operator || lastOperator;
    if (!num1) return
    if (!operatorToUse || !numToUse) {
        return
    } else {
        if (operatorToUse === '+') {
            display = Number(num1) + Number(numToUse)
        } else if (operatorToUse === '-') {
            display = Number(num1) - Number(numToUse)
        } else if (operatorToUse === '*') {
            display = Number(num1) * Number(numToUse)
        } else {
            if (numToUse === '0') {
                display = 'Error'
            } else {
                display = Number(num1) / Number(numToUse)
            }
        }        
    }
        

    num1 = display.toString()
    lastOperator = operatorToUse
    lastNum2 = numToUse
    previousCalc = true;
    calcScreen.textContent = num1
    num2 = ''
    operator = ''
    console.log('num1 after result', num1)
    console.log('previos op', lastOperator)
    console.log('previos num2', lastNum2)
    console.log(numToUse)
    console.log(operatorToUse)

}

const updateScreen = () => {
    if (num1 && !operator && !num2) {
        display = num1
    } else if (num1 && operator && !num2) {
        display = num1 + operator
    } else if (num1 && operator && num2) {
        display = num1 + operator + num2
    }

    
    if (display.length >= 15) {
        // limitedDisplay = display.slice(0, 10)
        // calcScreen.textContent = limitedDisplay
        calcScreen.style.fontSize = '29px'
    } else {
        console.log('display:', display)
        calcScreen.textContent = display
    }

}

const resetBtn = () => {
    num1 = '';
    num2 = '';
    lastNum2 = '';
    operator = '';
    lastOperator = '';
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

calcScreen.addEventListener('keydown', (event) => {
    calcScreen.textContent = event.key
})