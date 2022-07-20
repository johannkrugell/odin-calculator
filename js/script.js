// string variable to store the value clicked on the calulator key pad
let buttonValueClick = ""

// eventlisteners added to all the buttons excludes equals and backspace
const buttonValue = document.querySelectorAll(".value");
for ( var i = 0; i < buttonValue.length; i++) { 
    buttonValue[ i ].addEventListener( 'click', function() {
      buttonValueClick = this.innerText;
      console.log( this.innerText );
      updateDisplay(buttonValueClick);
   })
}

// display the values clicked on calculator display
// declare an array to store the text values in
let calculationArray = [];

// push each value clicked onto the array and convert to string to be displayed
// on the calculator
function updateDisplay(buttonValueClick) {
  calculationArray.push(buttonValueClick);
  let calculatorDisplay = calculationArray.toString().replace(/,/g,"");
  document.getElementsByClassName("calculator-display")[0].innerText = calculatorDisplay
  console.log(calculationArray);
  console.log(calculatorDisplay);
}


// declare variables to be 
// term is used as the first number a user keys in
let term = ""
// addends is the number to be added to the the term
let addends = ""
// subtrahend is the number to be subtracted from the term
let subtrahend = ""
// multiplican is the number to be multiplied with the term
let multiplican = ""
// denominator is the number that divides the term
let denominator = ""
// operation variables
let operator = "";
let number1 = "";
let number2 = "";


// addition function
function addition (term, addends) {
  sum =  term + addends;
  return sum;
}

// subtracion function
function subtraction (term, subtrahend) {
  difference = term - subtrahend;
  return difference;
}

// multiplication function
function product (term, multiplicand) {
  product = term * multiplicand;
  return product;
}

// division function 
function division (term, denominator) {
  ratio = term / denominator;
  return ratio;
}

// operator function, takes an operator and 2 numbers and calls the relevant 
// function on the numbers
function operation (operator, number1, number2) {
 switch (operator){
  case "+": return addition(number1,number2);
  break;
  case "-": return subtraction(number1,number2);
  break;
  case "*": return product(number1,number2);
  break;
  case "/": return division(number1,number2);
  break;
 }
}

