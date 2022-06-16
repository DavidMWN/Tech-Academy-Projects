// object that keeps track of values
const calculator = {
    displayValue: '0', //displays 0 on the screen
    firstOperand: null, // holds first operand
    waitSecondOperand: false, // checks whether second operand has been input
    operator: null, // holds operator
};

// modifies values when a button is clicked
function inputDigit(digit) {
    const { displayValue, waitSecondOperand } = calculator;

    if (waitSecondOperand === true) { //checks for second operand
        calculator.displayValue = digit; //sets display to second operand
        calculator.waitSecondOperand = false; //resets value
    }
    else {
        calculator.displayValue = displayValue === '0' ? digit: displayValue + digit;
        //overwrites displayValue if it is 0, otherwise adds to it
    }
}

// handles decimal points
function inputDecimal(dot) {
    // prevents bugs from accidental clicking of decimal point
    if (calculator.waitSecondOperand === true) return;
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot; // adds a decimal point if not already within display
    }
}

// handles operators
function handleOperator(nextOperator) {
    const {firstOperand, displayValue, operator} = calculator;
    //when an operator key is pressed, converts display to a number and stores in firstOperand
    const valueOfInput = parseFloat(displayValue);

    console.log("operator(1) = " + calculator.operator);
    console.log("nextOperator = " + nextOperator);
    console.log("firstOperand(1) = " + calculator.firstOperand);

    //checks if an operator exists and if waitSecondOperand is true, updates operator and exits function
    if (operator && calculator.waitSecondOperand) {
        calculator.operator = nextOperator;
        console.log("operator(2) = " + calculator.operator);
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = valueOfInput;
        console.log("firstOperand(2) = " + calculator.firstOperand);
    }
    else if (operator) { //checks if an operator already exists
        const valueNow = firstOperand || 0;
        console.log("valueOfInput = " + valueOfInput);
        console.log("valueNow = " + valueNow);
        console.log("operator(3) = " + operator);
        
        //looks up the operator in the performCalculation function and executes the matching function
        let result = performCalculation(operator, valueNow, valueOfInput);
        console.log("result: " + result);

        //add fixed amount of numbers after decimal
        result = Number(result).toFixed(9);

        //removes any trailing 0's
        result = (result * 1).toString();

        calculator.displayValue = parseFloat(result);
        calculator.firstOperand = parseFloat(result);
    }
    calculator.waitSecondOperand = true;
    calculator.operator = nextOperator;
    console.log("operator(4) = " + calculator.operator);
}

//interprets operand and performs the associated calculation
function performCalculation(operator, firstValue, secondValue) {
    switch (operator) {
    case '/':
        return firstValue / secondValue;
    case '*':
        return firstValue * secondValue;
    case '+':
        return firstValue + secondValue;
    case '-':
        return firstValue - secondValue;
    case '=':
        return secondValue;
    }
}

//resets calculator
function calculatorReset() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitSecondOperand = false;
    calculator.operator = null;
}

//updates the screen with the contents of displayValue
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

//monitors button clicks
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
    const {target} = event;

    //exits function if clicked element is not a button
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        calculatorReset();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
})