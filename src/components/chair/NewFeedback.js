import React, { useState } from 'react'
import QuestionsInput from "./Feedback/QuestionsInput"
import ChairFeedbackNavbar from '../navbars/ChairFeedbackNavbar';
export default function NewFeedback() {
  const [No, setNo] = useState(0);
  const [mode, setMode] = useState(0);
  const [eventName,setEventName] = useState("")
  const submit = async (event) => {
    event.preventDefault();
    
    setMode(1)

  }
  return (
    <div>
      <ChairFeedbackNavbar/>
      {mode === 0 && <>  
        <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <div className="self-start mt-3">Enter Event Name</div>
            <input type="text" name="eventName" className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full" onChange={(e)=>{setEventName(e.target.value)
                        }}

                             />
                               <div className="self-start mt-3">Enter Number of Questions</div>
                            <input type="number" name="eventName" className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full" onChange={(e) => {
            setNo(e.target.value)
          }}

             />
             <button type="submit" onClick={submit} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Submit</button>
              </div>
              </div>
              </div>
     </>}
      {mode===1 && <QuestionsInput data={{
        no:No,
        eName:eventName
      }}/>}

    </div>
  )
}
/*
 <form onSubmit={submit}>
      <div class="input-group mb-3">
                        <input type="text" name="eventName" class="form-control" onChange={(e)=>{setEventName(e.target.value)
                        }}

                            placeholder="Event Name" aria-label="Event Name" aria-describedby="basic-addon2" /><br></br>



                    </div>
        <div class="input-group mb-3">
          <input type="number" name="eventName" class="form-control" onChange={(e) => {
            setNo(e.target.value)
          }}

            placeholder="Number of questions" aria-label="Event Name" aria-describedby="basic-addon2" /><br></br>



        </div>
        <div class="input-group mb-3">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>


*/


