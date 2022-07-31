# ODIN PROJECT CALCULATOR
This files desribes the basic working of the calculator

## VARIABLES
Variables store the values of numbers and operators clicked.  
**numberValue** stores the numbers clicked or pressed. 
**value1** and **value2** are assigned from **numberValue**. 
**interimResult** stores the result of operators before the equals operator is 
clicked.
**operatorValue** stores an array of operators clicked.
**calculationArray** stores an array of **value1** and **value2**.

## FUNCTIONS
**updateDisplay()**
Pushes the *numberValue* onto the *calculationArray* when value1 /value2 is not 
blank. When value1 and value2 is blank, calls *checkOperator* for assignment.

**checkOperator()**
 If the operator has been clicked once, assign *numberValue* to *value1*, 
 else assign to *value2*. Catch instance where the calculation should be 
 performed or wait for more input.

**updateDisplayCalculation()** 
Updates the calculator display during the calculation before the equals operator
is clicked or pressed.

**calculation()**
Performs the calculation using variable *value1*,  *value2*, *interResult* and 
appropriote calculaion based on the operator value. 

## HELPER FUNCTIONS
**numbersClicked()**
Called when a number is pressed or clicked. Assigns the value clicked to 
*numberValue* calls *updateDisplay()* and *checkOperator()*

**operatorClicked()**
Stores the operator value in *operatorValue* array.

**equalsClicked()**
Checks that *value2* is matching the last *numberValue* clicked. If not calls
*operatorCheck()* else calls *calculation*

**clearAll()**
Clears all variables and updates the display. Called when AC is clicked.

**backspace**
Pops last items from *operatorValue* or *calculationArray*

## EXAMPLE
1. User clicks or press numbers
  *  Store value in *numberValue*
  *  Update the display
  *  Assign value to *value1*
2. User click / press operator
  * Add operator to *operatorValue* array
3. User clicks another number value
  * Assigns value to *value2* 
  * Calls calcution() 
  * Store result in *interimResult*
  * clear *value1* and *value2*
  * shift the values in *operatorValue* array
8. User click / press more numbers
  * Stores values in *value2*
9. User click / press an operator
  * Go to step 3
10. User click / press equals
  * calls calculation()
