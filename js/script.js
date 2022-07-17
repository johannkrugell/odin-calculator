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
