import { useState } from "react";

interface Props {
  num:number
}


const AddNumber = (props:Props) => {
  const {num} = props;
  const [value, setValue] = useState(num);
  
  function addOne(){
    setValue(value + 1)
  }
  function addTen(){
    setValue(value + 10)
  }
  function addHun(){
    setValue(value + 100)
  }
  function subOne(){
    setValue(value - 1)
  }
  function subTen(){
    setValue(value - 10)
  }
  function subHun(){
    setValue(value - 100)
  }
  function reset(){
    setValue(0)
  }
  return <> 
        <h1>CounterAct</h1>
        <h2>{value}</h2>
        <button onClick={subHun}>-100</button>
        <button onClick={subTen}>-10</button>
        <button onClick={subOne}>-1</button>
        <button onClick={addOne}>+1</button>
        <button onClick={addTen}>+10</button>
        <button onClick={addHun}>+100</button> <br></br>
        <button onClick={reset}>Reset</button>

    </>
   
  
}

export default AddNumber
