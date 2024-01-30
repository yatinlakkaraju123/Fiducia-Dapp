import React, { useEffect, useState } from 'react';
import feedback from '../../../chair/Feedback.json';
import UseBlockchain from '../../../../UseBlockchain.js';
import OTP from './OTP';

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
        <form onSubmit={check}>
        <div className="input-group mb-3">
          <input
            type="text"
            name="regNo"
            className="form-control"
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="registration no"
            aria-label="Event Name"
            aria-describedby="basic-addon2"
          /><br></br>
        </div>
        <div className="input-group mb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      </>}
     
      {inp===1 && <OTP data={
        {
          scaddr:props.scaddr,
          Phone:phone,
          regIndx:regIndx1
        }
      }/>}
    
    </div>
  );
}

