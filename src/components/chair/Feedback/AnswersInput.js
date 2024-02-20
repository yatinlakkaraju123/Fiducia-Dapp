import React, { useState } from 'react'
import OtherInput from './OtherInput';
export default function AnswersInput(props) {
  const Ename = props.data.eName
  const No = props.data.no;
  const qArray = props.data.QuestionsArray;
  const tArray = props.data.typeArray;
  const [mode, setMode] = useState(0)
  const [optionArray, setOptions] = useState(Array.from({ length: No }, () =>
    Array.from({ length: 4 }, () => '')))
  const submit = async (event) => {
    event.preventDefault();

    setMode(1)
  }
  return (
    <div>
      {mode === 0 && <>
        <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-black-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
              {optionArray.map((innerArray, index) => (
                <>
                  <h6 className='self-start mt-3'>Question {index}:{qArray[index]}</h6>
                  {tArray[index] === '2' && <>

                    {innerArray.map((value, innerIndex) => (
                      <>
                        <p className='self-start mt-3'>Option {innerIndex + 1}</p>
                        <input
                          type="text"
                          className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"

                          onChange={(e) => {
                            const arr = optionArray;
                            arr[index][innerIndex] = e.target.value;
                            setOptions(arr);
                          }}
                        />
                      </>
                    ))}
                  </>}

                </>
              ))}
              <button type="submit" onClick={submit} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Submit</button>
            </div>
          </div>
        </div>
        
      </>}

      {mode === 1 && <OtherInput data={{
        eName: Ename,
        no: No,
        QuestionArray: qArray,
        typeArray: tArray,
        optArray: optionArray
      }}
      />}

    </div>
  )
}
/*
<form onSubmit={submit}>




          <div class="input-group mb-3">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>

*/
