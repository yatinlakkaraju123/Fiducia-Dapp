import React, { useEffect, useState } from 'react';
import feedback from '../../../chair/Feedback.json';
import UseBlockchain from '../../../../UseBlockchain.js';
import OTP from './OTP';
import Reg from './Reg.js';
export default function Inputauth(props) {
  const [regNo, setRegNo] = useState('');
  const [inp,setInp] = useState(0);
  const [phone,setPhone] = useState("");
  const [regIndx1,setRegIndx] = useState(0)
  //const [auth,setAuth] =useState(null);
 
  const addr = props.scaddr;
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();



  

  const check = async (event) => {
    event.preventDefault();
    const newContract = new web3.eth.Contract(feedback.abi, addr);
    
    const arr = []
    const RegLength = await newContract.methods.getLengthRegNo().call();
    
    const phoneArr = []
    for(let i=0;i<RegLength;i++)
    {
      const regNoValues = await newContract.methods.RegNo(i).call();
      const phoneValues = await newContract.methods.Phone(i).call();
      arr.push(regNoValues);
      phoneArr.push(phoneValues)
    }
    if(arr.indexOf(regNo)!=-1)
    { const isRegistered = await newContract.methods.getIsRegNoRegistered(arr.indexOf(regNo)).call();
      if(isRegistered==true)
      {
        alert(" the registration number is already registered as a voter please try another one");
      }
      else
      { const indx = arr.indexOf(regNo);
        const phoneNumber = phoneArr[indx]
        console.log(indx);
        console.log(phoneNumber)
        const normalizedNumber = phoneNumber.replace(/^0+/, '');
        setPhone('+91' + normalizedNumber);
        
   
        //setInp(2)
       
       //await newContract.methods.RegisterRegNo(arr.indexOf(regNo)).send({from:account});
       setRegIndx(indx)
       console.log(regIndx1)
       setInp(1)

      }
     
      
    }
    else
    {
      alert("invalid voter");
    }
    //console.log(arr);
  }

  return (
    <div>
      {inp===0 && <>
        <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <div className="self-start mt-3">Enter Registration Number</div>
            <input
            type="text"
            name="regNo"
            
            onChange={(e) => setRegNo(e.target.value)}
            className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
          />
            </div>
            </div>
            </div>
             <button type="submit" className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5"onClick={check}>Submit</button>
       
      </>}
     
      {inp===1 && <Reg data={
          {
            scaddr:props.scaddr,
            regIndx :regIndx1,}
          }
        />}
    
    </div>
  );
}

