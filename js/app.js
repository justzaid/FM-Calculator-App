// Cached Elements
const calculatorContainer = document.getElementById('calculator-container')
const themeSwitch = document.querySelectorAll('input[name="theme"]')
const calculatorBtn = document.querySelectorAll('.btn')
const calcScreen = document.getElementById('screen')

// Variables
let num1;
let num2;
let operator;

// Functions

// Theme Switcher
themeSwitch.forEach((theme) => {
    theme.addEventListener('change', () => {
        calculatorContainer.className = theme.value
    })
})


// Button Display
calculatorBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        if (btn.classList.contains('dontPrint')) return
        
        if (!num1) {
            num1 = event.target.id
            calcScreen.textContent = num1
        }

        if (!num2) {
            num2 = event.target.id
            
        }
    })
})