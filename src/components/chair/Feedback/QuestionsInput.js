import React, { useState } from 'react'
import AnswersInput from './AnswersInput';
export default function QuestionsInput(props) {

  const No = props.data.no;
  const Ename = props.data.eName;
  const [Questions, setQuestions] = useState([])
  const [typeOfOptions, setTypeOfOptions] = useState([])
  const [mode, setMode] = useState(0)
  const submit = async (event) => {
    event.preventDefault();

    setMode(1);
  }
  return (
    <div>
      {mode === 0 && <>
        <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
              {Array.from({ length: No }, (_, index) => (
                <>
                  <div className="self-start mt-3">Enter the Question</div>
                  <input type="text" name="eventName" onChange={(e) => {
                    const arr = Questions;
                    arr[index] = e.target.value;
                    setQuestions(arr)
                  }} className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"

                  />




                  <select
                    className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
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
               <button type="submit" onClick={submit} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Submit</button>
            </div>
          </div>
        </div>


      </>}
      {mode === 1 && <AnswersInput data={
        {
          eName: Ename,
          no: No,
          QuestionsArray: Questions,
          typeArray: typeOfOptions
        }
      } />}
    </div>
  )
}
/*
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

*/
