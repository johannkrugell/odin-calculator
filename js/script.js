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
let buttonValueClick = "";
// set default display value of the calculator is zero
document.getElementsByClassName("calculator-display")[0].innerText = 0;

// eventlisteners added to the value buttons
// If there is an interim result and not value1/2 then the user has clicked = 
// in previous step and the value clicked now should be assigned to value1/2. 
// In all other cases the user is just keying in the number and only the display
// is updated
const buttonValue = document.querySelectorAll(".value");
for (var i = 0; i < buttonValue.length; i++) { 
  buttonValue[i].addEventListener( 'click', function() {
    if (value1 === "" && value2 === "" && interimResult !== "") {
      buttonValueClick = this.innerText;
      updateDisplay(buttonValueClick);
      checkOperator(buttonValueClick);
    }
    else {
      buttonValueClick = this.innerText;
      updateDisplay(buttonValueClick); // update the value display on calculator  
    }
  })
}

// eventlistener for the operator button
// entering the operator determines to which variable the button values are 
// assigned. If the operator array length is 1 then the buttonvalues should be
// assigned to value1 and the running display updated. If the operator length
// is more than one then the values should be stored in value2 and a calculation 
// performed
const operatorValue = document.querySelectorAll(".operator");
const operatorValueClick = [];

for (var i = 0; i < operatorValue.length; i++) { 
  operatorValue[i].addEventListener( 'click', function() {
      operatorValueClick.push(this.innerText); // add operator value to array
    if (operatorValueClick.length > 1) {
      checkOperator(operatorValueClick); // store the values in value2
      calculation(value1,value2); // performs calculation
      return operatorValueClick;
    } else {
      checkOperator(operatorValueClick); // store the values in value1
      updateDisplayCalculation(operatorValueClick); // update calculator display
      return operatorValueClick;
    }       
  })
}

// eventlistener for the equals operator
const equal = document.querySelectorAll(".equals");

for ( var i = 0; i < equal.length; i++) { 
  equal[ i ].addEventListener( 'click', function() {
    if (buttonValueClick !== value2.toString()) {
      checkOperator(buttonValueClick);
    }
    calculation(value1,value2); // perform calculation
    buttonValueClick = "";
  })
}

// eventlistener for the clear all button
const allClear = document.querySelectorAll(".clear");
// clears all the variable values and set the calculator display to 0
for ( i = 0; i < allClear.length; i++) { 
  allClear[ i ].addEventListener( 'click', function() {
    value1 = "";
    value2 = "";
    interimResult = "";
    buttonValueClick = "";
    calculationArray.splice(0,calculationArray.length);
    operatorValueClick.splice(0,operatorValueClick.length);
    document.getElementsByClassName("calculator-display")[0].innerText = "0"
  })
}

// eventlister for the backspace button
const clearLast = document.querySelectorAll(".backspace");

for ( i = 0; i < clearLast.length; i++ ) {
  clearLast[i].addEventListener( 'click', function() {
    if ( operatorValueClick.length === 1 && value2 === "") {
      operatorValueClick.pop(); // if an operator has been clicked the backspace
                                // removes the operator
      document.getElementsByClassName("calculator-display")[0].innerText = 
      value1.toString().replace(/,/g,"");
    } else {
      calculationArray.pop(); // if no operator has been click, remove the last
                              // button value from the array
      document.getElementsByClassName("calculator-display")[0].innerText =
      calculationArray.toString().replace(/,/g,"");
    }  
  })
}

// declare an array to store number values the user have clicked
const calculationArray = [];

// push value clicked onto array that is displaye on the calculator
function updateDisplay(buttonValueClick) {
  calculationArray.push(buttonValueClick); // push button value clicked on array
  let calculatorDisplay = calculationArray.toString().replace(/,/g,"");
  document.getElementsByClassName("calculator-display")[0].innerText 
  = calculatorDisplay;
  if (value1 !== "" && value2 == "") {
    checkOperator(buttonValueClick);
  }
} 

// function to store number value click in either value1 or value2
// after storing the value the array with numbers is cleared to store new values
function checkOperator(){
  if (operatorValueClick.length === 1 && value1 === "" && interimResult === "") {
    value1 = parseInt(calculationArray.toString().replace(/,/g,""));
    calculationArray.splice(0,calculationArray.length);
  } else if (operatorValueClick.length === 1 && value1 === "" && value2 === "" &&
    interimResult !== "" && buttonValueClick === "" ) {
    // do nothing there is an interim result but only a new operator is clicked
  } else if (operatorValueClick.length > 1 && value1 !== "" && value2 !== "" &&
    interimResult === "" && buttonValueClick !== "" ) {
    // do nothing there are values assigned and should go to calculation
  } else {
    value2 = parseInt(calculationArray.toString().replace(/,/g,""));
    calculationArray.splice(0,calculationArray.length);
  }  
}

// update display during calculations
function updateDisplayCalculation() {
  if ( operatorValueClick.length > 1 ) { 
    // if operator has been clicked twice display the interimResult
    document.getElementsByClassName("calculator-display")[0].innerText 
    = interimResult;
    operatorValueClick.shift();
  } else if (operatorValueClick.length === 1 && interimResult === "") {
    // operator clicked once, display the number and the operator
    let valueOperator = value1.toString().concat(operatorValueClick.toString());
    document.getElementsByClassName("calculator-display")[0].innerText 
    = valueOperator;
  } else if (operatorValueClick.length === 1 && interimResult !== "" 
             && value1 === "" && value2 === "") {
    let valueOperator = interimResult.toString().concat(operatorValueClick.toString());
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
    operatorValueClick.shift();
    }
  }

// checks the operator in the array, based on operator value performs appropriate
// calculation
  function calculation() {
  switch(operatorValueClick[0]) {
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
