import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react'
import VoterHomeNavbar from '../../navbars/VoterHomeNavbar'
import InputAuth from "../VotingRegister/inputauth"
export default function InputToken() {
  const [inp,setInp] = useState(0);
  const [inputToken, setInputToken] = useState(0);
  const [inputSCadd,setInputSCadd] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    axios.get("http://localhost:3001").then(result=>{
			const data = result.data;
			const tokenarr = data.map((d)=>{
				return (d.token)
			})
      const addArr = data.map((d)=>{
        return d.smartcontractaddress;
      })
      const indx = tokenarr.indexOf(inputToken)
      if(indx==-1)
      {
        alert("invalid token enter correct one:");
      }
      else
      {
        setInputSCadd(addArr[indx]);
        setInp(1);
      }
    
   
      
		}).catch(err=>console.log(err));
  }
  return (
    <div className='container'>
      {inp===0 && <>
        <form onSubmit={submit}>
        <div class="input-group mb-3">
          <input type="text" name="tokenNo" class="form-control" onChange={(e) => {
            setInputToken(e.target.value)

          }}

            placeholder="token no" aria-label="Event Name" aria-describedby="basic-addon2" /><br></br>



        </div>
        <div class="input-group mb-3">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
      </form>
      </>}
      {inp===1 && <InputAuth  scaddr ={inputSCadd}/>}
    
    </div>
  )
}
