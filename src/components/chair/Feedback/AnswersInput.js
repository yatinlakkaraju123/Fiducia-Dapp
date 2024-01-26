import React, { useState } from 'react'
import OtherInput from './OtherInput';
export default function AnswersInput(props) {
    const Ename = props.data.eName
    const No = props.data.no;
    const qArray = props.data.QuestionsArray;
    const tArray = props.data.typeArray;
    const [mode,setMode] = useState(0)
    const [optionArray,setOptions] = useState(Array.from({ length: No}, () =>
    Array.from({ length: 4 }, () => '')))
    const submit = async(event)=>{
        event.preventDefault();
   
        setMode(1)
    }
  return (
    <div>
        {mode===0 && <>
            <form onSubmit={submit}>

{optionArray.map((innerArray,index)=>(
    <div key={index} className='container mb-3 flex'>
         <h6>Question {index}:{qArray[index]}</h6>
        {tArray[index]==='2' && <>
       
        {innerArray.map((value, innerIndex) => (
  <div key={innerIndex} className="container mb-3 flex">
    <p>Option {innerIndex + 1}</p>
    <input
      type="text"
      className="form-control"
     
      onChange={(e) => {
        const arr = optionArray;
        arr[index][innerIndex] = e.target.value;
        setOptions(arr);
      }}
    />
  </div>
))}
        </>}

    </div>
))}


    <div class="input-group mb-3">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
    </form>
        </>}

      {mode===1 && <OtherInput data={{
        eName:Ename,
        no:No,
        QuestionArray:qArray,
        typeArray:tArray,
        optArray:optionArray
      }}
      />}

    </div>
  )
}
