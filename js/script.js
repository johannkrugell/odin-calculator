// declare variables  
// value1 and value2 are used to store the button values before the user 
// press equals
let value1 = "";
let value2 = "";
// interimresult is used to store the result of the calculation performed on 
// value1 and value2 before the user press equals. For example 1 + 1 - 1 the
// addition of 1+1 is stored in the interimResult before 1 is deducted
let interimResult = "";
// string variable to store the value clicked on the calulator key pad
let numberValue = "";
// set default display value of the calculator is zero
document.getElementsByClassName("calculator-display")[0].innerText = 0;

// eventlisteners added to the value buttons
// If there is an interim result and not value1/2 then the user has clicked = 
// in previous step and the value clicked now should be assigned to value1/2. 
// In all other cases the user is just keying in the number and only the display
// is updated
const numbers = document.querySelectorAll(".number");
for (var i = 0; i < numbers.length; i++) { 
  numbers[i].addEventListener( 'click', function()
  {numbersClicked(this.innerText)})
}

function numbersClicked (value) {
  if (value1 === "" && value2 === "" && interimResult !== "") {
    numberValue = value;
    updateDisplay(numberValue);
    checkOperator(numberValue);
  }
  else {
    numberValue = value
    updateDisplay(numberValue); // update the value display on calculator  
  }
}

// keyboard support for numberic value
document.addEventListener( 'keydown', function(event) {
  if (event.key >= 0 && event.key <= 9) {
    numbersClicked(event.key);
  }
  else if (event.key === "/" || event.key === "*" || event.key === "-"
           || event.key === "+" || event.key === "%") {
    operatorClicked(event.key);
  }
  else if (event.key === "Enter"){
    equalsClicked(event.key);
  }   
  else if (event.key === "Backspace"){
    backspace();
  }
  else if (event.key === "c" || event.key === "C") {
    clearAll();
  }

})

// eventlistener for the operator button
// entering the operator determines to which variable the button values are 
// assigned. If the operator array length is 1 then the numbers should be
// assigned to value1 and the running display updated. If the operator length
// is more than one then the values should be stored in value2 and a calculation 
// performed
const operators = document.querySelectorAll(".operator");
const operatorValue = [];

for (var i = 0; i < operators.length; i++) { 
  operators[i].addEventListener( 'click', function() 
  {operatorClicked(this.innerText)})
}

function operatorClicked(value) {
  operatorValue.push(value); // add operator value to array
    if (operatorValue.length > 1) {
      checkOperator(operatorValue); // store the values in value2
      calculation(value1,value2); // performs calculation
      return operatorValue;
    } else {
      checkOperator(operatorValue); // store the values in value1
      updateDisplayCalculation(operatorValue); // update calculator display
      return operatorValue;
    }
}

// eventlistener for the equals operator
const equal = document.querySelectorAll(".equals");

for ( var i = 0; i < equal.length; i++) { 
  equal[ i ].addEventListener( 'click', function() {equalsClicked()})
}

function equalsClicked() {
  if (numberValue !== value2.toString()) {
    checkOperator(numberValue);
  }
  calculation(value1,value2); // perform calculation
  numberValue = "";
}

// eventlistener for the clear all button
const allClear = document.querySelectorAll(".clear");
// clears all the variable values and set the calculator display to 0
for ( i = 0; i < allClear.length; i++) { 
  allClear[ i ].addEventListener( 'click', function() { clearAll()})
}

function clearAll() {
  value1 = "";
  value2 = "";
  interimResult = "";
  numberValue = "";
  calculationArray.splice(0,calculationArray.length);
  operatorValue.splice(0,operatorValue.length);
  document.getElementsByClassName("calculator-display")[0].innerText = "0"
}


// eventlister for the backspace button
const clearLast = document.querySelectorAll(".backspace");

for ( i = 0; i < clearLast.length; i++ ) {
  clearLast[i].addEventListener( 'click', function() {backspace()})
}

function backspace() {
  if ( operatorValue.length === 1 && value2 === "") {
    operatorValue.pop(); // if an operator has been clicked the backspace
                              // removes the operator
    document.getElementsByClassName("calculator-display")[0].innerText = 
    value1.toString().replace(/,/g,"");
  } else {
    calculationArray.pop(); // if no operator has been click, remove the last
                            // button value from the array
    document.getElementsByClassName("calculator-display")[0].innerText =
    calculationArray.toString().replace(/,/g,"");
  }
}

// declare an array to store number values the user have clicked
const calculationArray = [];

// push value clicked onto array that is displaye on the calculator
function updateDisplay(numberValue) {
  calculationArray.push(numberValue); // push button value clicked on array
  let calculatorDisplay = calculationArray.toString().replace(/,/g,"");
  document.getElementsByClassName("calculator-display")[0].innerText 
  = calculatorDisplay;
  if (value1 !== "" && value2 == "") {
    checkOperator(numberValue);
  }
} 

// function to store number value click in either value1 or value2
// after storing the value the array with numbers is cleared to store new values
function checkOperator(){
  if (operatorValue.length === 1 && value1 === "" && interimResult === "") {
    value1 = parseInt(calculationArray.toString().replace(/,/g,""));
    calculationArray.splice(0,calculationArray.length);
  } else if (operatorValue.length === 1 && value1 === "" && value2 === "" &&
    interimResult !== "" && numberValue === "" ) {
    // do nothing there is an interim result but only a new operator is clicked
  } else if (operatorValue.length > 1 && value1 !== "" && value2 !== "" &&
    interimResult === "" && numberValue !== "" ) {
    // do nothing there are values assigned and should go to calculation
  } else {
    value2 = parseInt(calculationArray.toString().replace(/,/g,""));
    calculationArray.splice(0,calculationArray.length);
  }  
}

// update display during calculations
function updateDisplayCalculation() {
  if ( operatorValue.length > 1 ) { 
    // if operator has been clicked twice display the interimResult
    document.getElementsByClassName("calculator-display")[0].innerText 
    = interimResult;
    operatorValue.shift();
  } else if (operatorValue.length === 1 && interimResult === "") {
    // operator clicked once, display the number and the operator
    let valueOperator = value1.toString().concat(operatorValue.toString());
    document.getElementsByClassName("calculator-display")[0].innerText 
    = valueOperator;
  } else if (operatorValue.length === 1 && interimResult !== "" 
             && value1 === "" && value2 === "") {
    let valueOperator = interimResult.toString().concat(operatorValue.toString());
    document.getElementsByClassName("calculator-display")[0].innerText 
    = valueOperator;        
  } 
  else {
    // in all other case calculaton has been performed, display result and 
    // clear variables
    document.getElementsByClassName("calculator-display")[0].innerText 
    = interimResult;
    value1 = "";
    value2 = "";
    operatorValue.shift();
    }
  }

// checks the operator in the array, based on operator value performs appropriate
// calculation
  function calculation() {
  switch(operatorValue[0]) {
    case "+" :
      if (interimResult === "") {
        addition(value1,value2);  
      } else {
        addition(interimResult,value2);
      }
    break;
    case "-":
      if (interimResult === "") {
        subtraction(value1,value2);  
      } else {
        subtraction(interimResult,value2);
      } 
    break;
    case "*":
      if (interimResult === "") {
        product(value1,value2);  
      } else {
        product(interimResult,value2);
      } 
    break;
    case "/":
      if (value2 === 0 ) {
        document.getElementsByClassName("calculator-display")[0].innerText = 
        "Dont be silly";
      } else if (interimResult === "") {
        division(value1,value2);  
      } else {
        division(interimResult,value2);
      } 
    break;
    case "%":
      if (interimResult === "") {
        modulo(value1,value2);  
      } else {
        modulo(interimResult,value2);
      } 
    break;
    }
}

// addition function
let sum = []
function addition (term, addends) {
  interimResult =  term + addends;
  updateDisplayCalculation();
  return interimResult;
}

// subtration function
function subtraction (term, subtrahend) {
  interimResult = term - subtrahend;
  updateDisplayCalculation();
  return interimResult;
}

// multiplication function
function product (term, multiplicand) {
  interimResult = term * multiplicand;
  updateDisplayCalculation();
  return interimResult;
}

// division function 
function division (term, denominator) {
  interimResult = term / denominator;
  updateDisplayCalculation();
  return interimResult;
}

// modulo function 
function modulo (term, denominator) {
  interimResult = term % denominator;
  updateDisplayCalculation();
  return interimResult;
}
