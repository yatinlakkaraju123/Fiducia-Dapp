import React from 'react'
import VoterPage from './VoterPage';
import UseBlockchain from '../../../UseBlockchain.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import voting from '../../chair/voting.json';
export default function InputToken() {
    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
    const [inputToken, setInputToken] = useState(0);
    const [inp,setInp] = useState(0);
    const [inputSCadd,setInputSCadd] = useState('');
    const submit = async(event)=>{
        event.preventDefault();
        axios.get("http://localhost:3001").then(async result=>{
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
            const addr = addArr[indx];
            const newContract = new web3.eth.Contract(voting.abi, addr);
            const isVoted = await newContract.methods.isVoted(account).call();
            const isRegistered = await newContract.methods.isRegistered(account).call();
            if(isVoted==true)
            {
              alert("this account has  already voted");
            }
            else if(isVoted===false && isRegistered===true)
            {
             
              setInp(1);
            }
            else
            {
              alert("is not registered as a voter");
            }
            
          }
        
       
          
            }).catch(err=>console.log(err));
    }
  return (
    <div className='container'>
{inp===0 && <>
  <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <div className="self-start mt-3">Enter Token No</div>
            <input type="text" name="tokenNo" className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full" onChange={(e) => {
            setInputToken(e.target.value)

          }}
          
             />
              <button type="submit" onClick={submit} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Submit</button>
            </div>
            </div>
            </div>
    </>}
      {inp===1 && <VoterPage scaddr ={inputSCadd} Token={inputToken}/>}

    </div>
  )
}
