import React, { useEffect, useState } from "react";
import './Calculator.css'
const Calculator = () => {
  const [result,setResult] = useState(0)
  const [inputArea,setInputArea] = useState([])
  const [operandStr,setOperandStr] = useState("")
  const [operandArray,setOperandArray] = useState([])
  const [operatorArray,setOperatorArray] = useState([])


  
  const handleInput = (e)=>{
    const value = e.target.value;
    setInputArea(prev => [...prev,value])
   
    
    if(!isNaN(value)){
        setOperandStr(prevDigit => prevDigit + value)
    }
    else{
        if(operandStr !== ''){
          setOperandArray(prev => [...prev,operandStr])
        }
        setOperatorArray(prev => [...prev,value]) 
        setOperandStr('')
    }

  }

  const clearInputArea = ()=>{
    setInputArea([]);
    setOperandArray([]);
    setOperatorArray([]);
    setOperandStr("");
    setResult();
  }


  const handleResult = ()=>{
    // Ensure the last operand is added to the operand array
    if(operandArray.length === 0){
      setResult('Error')
      return 'Error'
    }
    if(operandStr !== ""){
      setOperandArray(prev => [...prev,operandStr])
    }

    // Combine operands and operators
    const combinedExpression = [...operandArray,operandStr]
    operatorArray.forEach((operator,index) => {
      combinedExpression.splice(2 * index + 1,0,operator)
    })

    // Helper function to evaluate a basic operation
    const evaluate = (a,operator,b) =>{
      if(a === 0 && b === 0 && operator === "/"){
        return NaN
      }
      else if(b === 0 && operator === '/'){
        return 'Infinity'
      }
      switch(operator){
        case '*':
          return a*b;
        case "/":
          return a/b;
        case '+':
          return a+b;
        case '-':
          return a-b;
        default:
          return 0;
      }
        
    }
    // Evaluate the expression following BODMAS
    const calculate = (expression)=>{
      const ops = ["*","/","+","-"];
      ops.forEach((op) =>{
        while(expression.includes(op)){
          let index = expression.findIndex((item)=> item===op);
          let result = evaluate(
            parseFloat(expression[index-1]),
            expression[index],
            parseFloat(expression[index+1])
          )
          // Replace the evaluated part with the result
          expression.splice(index-1,3,result.toString())
        }
      })
      return expression[0]
    }
        
    // Calculate the result
    const finalResult = calculate([...combinedExpression]);
    setResult(finalResult)
    // Reset arrays for the next calculation
    // setOperandArray([])
    // setOperatorArray([])
    setOperandStr("")

    
  }

  useEffect(()=>{
    // console.log(`${operandStr}`)
  },[operandStr])

  useEffect(()=>{
    console.log(`${operandArray}`)
  },[operandArray])
  
  useEffect(()=>{
    console.log(`${operatorArray}`)
  },[operatorArray])

  return (
    <div className="calculator-container">
      <h1>React Calculator</h1>
      <input type="text" value={inputArea.join('')} readOnly/>
      <div className="resultAreaContainer">
        {result}
      </div>
      <div className="button-container">
        <button onClick={(e) => handleInput(e)} value="7">7</button>
        <button onClick={(e) => handleInput(e)} value="8">8</button>
        <button onClick={(e) => handleInput(e)} value="9">9</button>
        <button onClick={(e) => handleInput(e)} value="+">+</button>
        <button onClick={(e) => handleInput(e)} value="4">4</button>
        <button onClick={(e) => handleInput(e)} value="5">5</button>
        <button onClick={(e) => handleInput(e)} value="6">6</button>
        <button onClick={(e) => handleInput(e)} value="-">-</button>
        <button onClick={(e) => handleInput(e)} value="1">1</button>
        <button onClick={(e) => handleInput(e)} value="2">2</button>
        <button onClick={(e) => handleInput(e)} value="3">3</button>
        <button onClick={(e) => handleInput(e)} value="*">*</button>
        <button onClick={clearInputArea}>C</button>
        <button onClick={(e) => handleInput(e)} value="0">0</button>
        <button onClick={handleResult}>=</button>
        <button onClick={(e) => handleInput(e)} value="/">/</button>
      </div>
        
      
    </div>
  );
};

export default Calculator;
