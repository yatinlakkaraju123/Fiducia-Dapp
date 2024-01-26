import React,{useState} from 'react'
import AnswersInput from './AnswersInput';
export default function QuestionsInput(props) {

  const No  = props.data.no;
  const Ename = props.data.eName;
  const [Questions,setQuestions] = useState([])
  const [typeOfOptions,setTypeOfOptions] = useState([])
  const [mode,setMode] = useState(0)
  const submit = async(event)=>{
    event.preventDefault();
   
    setMode(1);
  }
  return (
    <div>
      {mode===0 && <>
        <form onSubmit={submit}>
      {Array.from({length:No},(_,index)=>(
        <>
         <div class="input-group mb-3">
                        <input type="text" name="eventName" class="form-control" onChange={(e) => {
                          const arr = Questions;
                          arr[index] = e.target.value;
                          setQuestions(arr)
                        }}

                            placeholder="Enter the Question" aria-label="Event Name" aria-describedby="basic-addon2" /><br></br>



                    </div>
                    <select
  className="form-select"
  aria-label="Default select example"
  onChange={(e) => {
    const arr = [...typeOfOptions];
    arr[index] = e.target.value;
    setTypeOfOptions(arr);
  }}
>
  <option selected>select the type of answer</option>
  <option value="1">Text</option>
  <option value="2">Option</option>
 
</select>
        </>
      ))}
      <div class="input-group mb-3">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      </>}
        {mode===1 && <AnswersInput data={
          { eName:Ename,
            no:No,
            QuestionsArray:Questions,
            typeArray:typeOfOptions
          }
        }/>}
    </div>
  )
}
