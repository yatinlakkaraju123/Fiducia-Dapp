import React from 'react'
import VoterFeedbackNavbar from '../../navbars/VoterFeedbackNavbar'
import InputToken from './Register/InputToken'
export default function Register() {
  return (
    <div><VoterFeedbackNavbar/>
    <div className="flex flex-col py-3 bg-white">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full"></div>
        <div className="self-center text-4xl font-normal text-black underline">
                Registration Page
              </div>
             </div>
    <InputToken/>
   
    
    </div>
  )
}
