// declare variables  
let value1 = ""; // stores numberValues based on storeValue() assignment
let value2 = "";
let numberValue = ""; // number value clicked on the calulator key pad
const interimResult = []; // stores the interim calculation result
const operatorList = ["+","-","*","/","%"]; // to remove operators when backspace
const calculationDisplay = [];

// set default display value of the calculator is zero
document.getElementsByClassName("calculator-display")[0].innerText = "";

// Event Listeners 
// Keyboard support 
document.addEventListener( 'keydown', function(event) {
  if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9) {
    numbersClicked(event.key);
  } else if (operatorList.indexOf(event.key) !== -1) {
    event.preventDefault();
    operatorClicked(event.key);
  } else if (event.key === "Enter"){
    operatorClicked(event.key);
  } else if (event.key === "Backspace" && numberValue === ""){
    // do nothing
  } else if (event.code === "Space"){
    // do nothing 
  } else if (event.key === "Backspace"){
    backspace();
  } else if (event.key === "c" || event.key === "C") {
    clearAll();
  } else if (event.key === ".") {
    decimalClicked(event.key);
  }
})

// Numbers UI event
const numbers = document.querySelectorAll(".number");
for (var i = 0; i < numbers.length; i++) { 
  numbers[i].addEventListener( 'click', function()
  { numbersClicked(this.innerText) })
}

function numbersClicked(value) {
  numberValue = value
  pushArray(calculationArray, numberValue);
  pushArray(calculationDisplay, numberValue);
  refreshCalculationDisplay();
  if (interimResult.length <= 1) {
    calculation(value1,parseFloat(toString(calculationArray)));
  } else if (interimResult.length > 1) {
    calculation(interimResult[interimResult.length-1],
    parseFloat(toString(calculationArray)));
  } else if (interimResult.length === 1) {
    calculation(interimResult,parseFloat(toString(calculationArray)));
  }
}

// Decimal UI
const decimal = document.querySelector(".decimal");
decimal.addEventListener('click', function()
  { decimalClicked(this.innerText) })

function decimalClicked(value) {
  if (decimal.disabled === false) {
    pushArray(calculationArray,value);
    pushArray(calculationDisplay,value)
    refreshCalculationDisplay(); 
    decimal.setAttribute("disabled", '');
  } 
}

// Operator UI
const operators = document.querySelectorAll(".operator");
const operatorValue = [];

for (var i = 0; i < operators.length; i++) { 
  operators[i].addEventListener( 'click', function() 
  { operatorClicked(this.innerText) })
}

function operatorClicked(value) {
  pushArray(operatorValue,value);
  document.querySelector(".decimal").removeAttribute("disabled"); // enable decimal
  if (operatorValue[operatorValue.length-1] === "Enter" || 
      operatorValue[operatorValue.length-1] === "=") {
    styleCalculationDisplay();
    clearArray(calculationDisplay, 0, calculationDisplay.length);
    clearArray(operatorValue, 0, operatorValue.length);
    clearArray(calculationArray, 0, calculationArray.length);
    pushArray(interimResult, interimResult[interimResult.length-1]);
  } else if (operatorValue.length >= 1 && value1 !== "") {
    styleDisplay();
    clearArray(operatorValue, 0, operatorValue.length-1);
    clearArray(calculationArray, 0, calculationArray.length);
    pushArray(calculationDisplay, value);
    refreshCalculationDisplay();
  } else {
    storeValue(operatorValue); 
    pushArray(calculationDisplay, value);
    refreshCalculationDisplay();
  }
}

// Equals UI
const equal = document.querySelectorAll(".equals");

for ( var i = 0; i < equal.length; i++) { 
  equal[ i ].addEventListener( 'click', function() {equalsClicked(this.innerText)})
}

function equalsClicked(value) {
  operatorClicked(value);
}

// Clear all UI
const allClear = document.querySelectorAll(".clear");
// clears all the variable values and set the calculator display to 0
for ( i = 0; i < allClear.length; i++) { 
  allClear[ i ].addEventListener( 'click', function() { clearAll()})
}

function clearAll() {
  value1 = "";
  value2 = "";
  numberValue = "";
  clearArray(calculationArray, 0, calculationArray.length);
  clearArray(calculationDisplay, 0, calculationDisplay.length);
  clearArray(interimResult, 0, interimResult.length);
  clearArray(operatorValue, 0, operatorValue.length);
  blankCalculationDisplay();
}

// Backspace UI
const clearLast = document.querySelectorAll(".backspace");

for ( i = 0; i < clearLast.length; i++ ) {
  clearLast[i].addEventListener( 'click', function() {backspace()})
}

function backspace() {
  if (operatorList.indexOf(calculationDisplay[calculationDisplay.length-1]) !== -1) {
    popArray(operatorValue);
    popArray(calculationArray);
    popArray(calculationDisplay);                
    refreshCalculationDisplay(); 
    if (interimResult.length === 0){
      updateDisplay("");
    } else {
      updateDisplay(interimResult[interimResult.length-1]);
    } 
  } else if (interimResult.length === 0 || calculationArray[calculationArray.length-1] === ".") {
    popArray(calculationArray);
    popArray(calculationDisplay);
    refreshCalculationDisplay();
    document.querySelector(".decimal").removeAttribute("disabled");
  } else {
    popArray(calculationArray); 
    popArray(calculationDisplay);
    popArray(interimResult);
    refreshCalculationDisplay();
    if (interimResult.length === 0){
      updateDisplay("");
    } else {
      updateDisplay(interimResult[interimResult.length-1]);
    }  
  }
}

// declare an array to store number values the user have clicked
const calculationArray = [];

// push value clicked onto array that is displayed on the calculator
function updateDisplay(value) {
  document.getElementsByClassName("calculator-display")[0].innerText = value;
  styleDisplay();
} 

// Store number value click in either value1 or value2
function storeValue() {
  if (operatorValue.length === 1 ) {
    value1 = parseFloat(calculationArray.toString().replace(/,/g,""));
    clearArray(calculationArray, 0, calculationArray.length);
  } else {
    value2 = parseInt(calculationArray.toString().replace(/,/g,""));
    clearArray(calculationArray, 0, calculationArray.length);
  }
}

// update display during calculations
function refreshCalculationDisplay(value) {
  let calculationDisplayString = calculationDisplay.toString().replace(/,/g,"");
  document.getElementsByClassName("calculation-display")[0].innerText 
    = calculationDisplayString
  }

// check operator, perform calculation
function calculation(anyValue1, anyValue2) {
  switch(operatorValue[0]) {
    case "+" :
      addition(anyValue1, anyValue2);  
      updateDisplay(interimResult[interimResult.length-1]);
    break;
    case "-":
      subtraction(anyValue1, anyValue2);  
      updateDisplay(interimResult[interimResult.length-1]);
    break;
    case "*":
      product(anyValue1, anyValue2);
      updateDisplay(interimResult[interimResult.length-1]);  
    break;
    case "/":
      if (anyValue2 === 0 ) {
        document.getElementsByClassName("calculator-display")[0].innerText = 
        "Dont be silly";
      } else {
        division(anyValue1, anyValue2);
        updateDisplay(interimResult[interimResult.length-1]);  
      } 
    break;
    case "%":
      modulo(anyValue1, anyValue2);  
      updateDisplay(interimResult[interimResult.length-1]);
    break;
  }
}

// addition function
let sum = []
function addition (term, addends) {
  interimResult.push(term + addends).toFixed(2);
}

// subtration function
function subtraction (term, subtrahend) {
  interimResult.push(term - subtrahend);
}

// multiplication function
function product (term, multiplicand) {
  interimResult.push(term * multiplicand);
}

// division function 
function division (term, denominator) {
  interimResult.push(term / denominator);
}

// modulo function 
function modulo (term, denominator) {
  interimResult.push(term % denominator);
}

// Helper Functions
// Parse calculation array to string
function toString(value) {
  return value.toString().replace(/,/g,"");
}

// Update calculator display style
function styleDisplay() {
  document.getElementsByClassName("calculator-display")[0].style.fontSize = "30px";
  document.getElementsByClassName("calculator-display")[0].style.color = "gray";
}

// Update calculation display
function styleCalculationDisplay() {
  document.getElementsByClassName("calculation-display")[0].innerText = "";
  document.getElementsByClassName("calculator-display")[0].style.color = "black";
  document.getElementsByClassName("calculator-display")[0].style.fontSize = "40px";
}

// add value/operator/interim result to array
function pushArray(array, value) {
  return array.push(value);
}

// remove value/operator/interim result from array
function popArray(array) {
  return array.pop();
}

// clear all items in array
function clearArray(array, position, items) {
  return array.splice(position, items);
}

// set calculation display to blank
function blankCalculationDisplay() {
  document.getElementsByClassName("calculator-display")[0].innerText = "";
  document.getElementsByClassName("calculation-display")[0].innerText = "";
}