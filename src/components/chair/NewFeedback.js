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
      {mode === 0 && <>  <form onSubmit={submit}>
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
      </form></>}
      {mode===1 && <QuestionsInput data={{
        no:No,
        eName:eventName
      }}/>}

    </div>
  )
}


