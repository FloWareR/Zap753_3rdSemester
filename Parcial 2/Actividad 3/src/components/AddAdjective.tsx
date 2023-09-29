import { useState } from 'react';


interface Props{
  name:string
  initialAdj:string
  initialAdjOp?:string
}

const AddAdjectives = (props:Props) => {

  const {name, initialAdj,initialAdjOp} = props
  
  const [inputText, setInputText] = useState('');
  const [resultString, setResultString] = useState(initialAdj);

  const adjInput = (e:any) => {
    setInputText(e.target.value);
  };

  const addAdj = () => {
    setResultString((prevAdj) => prevAdj + ', ' + inputText);
    setInputText('');
  };

  return (
    <div>
      <h1>{name} is...</h1>
      <div>
      <p>{name} is {initialAdjOp} {resultString}</p>
        <input
          type="text"
          value={inputText}
          onChange={adjInput}
        />
        <button onClick={addAdj}>Add Adjective</button>
      </div>
      
    </div>
  );
}

export default AddAdjectives
