// used react hooks 
import React, { useState } from "react";
import { styled } from "styled-components";
// styles
const Button = styled.button`
                color: rgb(44, 39, 39); 
                background-color: rgb(253, 5, 141);
                font-size: large;
                border: 1px solid white;
                width: 7rem;
                height: 4.5rem; `
  const Filler = styled(Button)` 
                background-color: rgb(252, 158, 227);
                width: 21rem;`
  const Display = styled.div`
                height: 5rem;
                padding-left: 1rem;
                color: white;
                font-size: large;
                background-color: rgb(32, 10, 22); `
  const Main = styled.div`
                display: flex; 
                justify-content: center;
                align-items: center;
                margin-top: 10rem;`
  const Div = styled.div`
                display: flex;
                flex-direction: column;`
const operandCol = { backgroundColor: "#fa7a2a" }

// functional component
const Calculator = () => {
// useState hook for setting display, operand and result
    const [display, setDisplay] = useState("0");
    const [operand, setOperand] = useState(null);
    const [result, setResult] = useState(null);
// used a single function for clicking different buttons with values passing as argument. 
    const handleButtonClick = (value) => {
        if (value === "C") {  /**When the "C" button is clicked, the function resets the calculator's display to "0" and clears both the operand and result, effectively resetting the calculator to its initial state. */
            setDisplay("0");
            setOperand(null);
            setResult(null);
            return;
        }

        if (value === "=") {     
            // Check if an operand exists and the display is not empty         
            if (operand && display !== "") {
                const num1 = parseFloat(result);    // Convert the result to a number, here result contain previous value
                const num2 = parseFloat(display);   // Convert the current display to a number
                let newResult;          //declared a variable in which new result value will be stored further 

                switch (operand) {     //num1 and num2 are added subtracted multiplied and divided with switch case if operand value matches accordingly
                    case "+":
                        newResult = num1 + num2;
                        break;
                    case "-":
                        newResult = num1 - num2;
                        break;
                    case "*":
                        newResult = num1 * num2;
                        break;
                    case "/":
                        newResult = num1 / num2;
                        break;
                    default:
                        break;
                }
     // Update the result, display, and clear the operand
                setResult(newResult);
                setDisplay(newResult.toString());
                setOperand(null);
            }
            return; 
        }

        if (operand) {
            /**If an operand exists, it appends the clicked value to the display */
            setDisplay(display + value); 
        } else {
            if (value === "+" || value === "-" || value === "*" || value === "/") {  
                /**If no operand exists and an operator is clicked, the function sets the operand,
                  stores the current display as the previous result, and clears the display for the next number input.  */
                setOperand(value);
                setResult(display);       
                setDisplay("");             
                return;
            }

            if (display === "0" && value !== ".") {
                /**If the display is "0" and the clicked value is not a decimal point,
                 the display is replaced with the clicked value. Otherwise, the clicked value is appended to the existing display. */
                setDisplay(value);    
            } else {
                setDisplay(display + value);  
            }
        }
    };

    return (
        // UI
        <Main className="main">
            <Div className="calculator">
                <Display className="display"><h2> {display} </h2></Display>
                <div className="keypad">
                    <Button style={{ backgroundColor: "blueviolet" }} onClick={() => handleButtonClick("C")}>C</Button>
                    <Filler className="filler">Simple React Calculator</Filler><br />
                    <Button onClick={() => handleButtonClick("7")}>7</Button>
                    <Button onClick={() => handleButtonClick("8")}>8</Button>
                    <Button onClick={() => handleButtonClick("9")}>9</Button>
                    <Button style={operandCol} onClick={() => handleButtonClick("*")}>×</Button><br />
                    <Button onClick={() => handleButtonClick("4")}>4</Button>
                    <Button onClick={() => handleButtonClick("5")}>5</Button>
                    <Button onClick={() => handleButtonClick("6")}>6</Button>
                    <Button style={operandCol} onClick={() => handleButtonClick("-")}>-</Button><br />
                    <Button onClick={() => handleButtonClick("1")}>1</Button>
                    <Button onClick={() => handleButtonClick("2")}>2</Button>
                    <Button onClick={() => handleButtonClick("3")}>3</Button>
                    <Button style={operandCol} onClick={() => handleButtonClick("+")}>+</Button><br />
                    <Button onClick={() => handleButtonClick(".")}>.</Button>
                    <Button onClick={() => handleButtonClick("0")}>0</Button>
                    <Button style={operandCol} onClick={() => handleButtonClick("/")}>÷</Button>
                    <Button style={operandCol} onClick={() => handleButtonClick("=")}>=</Button>
                </div>
            </Div>
        </Main>

    );
};

export default Calculator;
