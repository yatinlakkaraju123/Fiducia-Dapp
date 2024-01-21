import React, { useEffect, useState } from 'react';
import voting from '../../chair/voting.json';
import UseBlockchain from '../../../UseBlockchain.js';
import InputReg from "./inputReg"
export default function Inputauth(props) {
  const [regNo, setRegNo] = useState('');
  const [inp,setInp] = useState(0);
  const addr = props.scaddr;
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();

  
  
  

  const check = async (event) => {
    event.preventDefault();
    const newContract = new web3.eth.Contract(voting.abi, addr);
    
    const arr = []
    const RegLength = await newContract.methods.getLengthRegNo().call();
    for(let i=0;i<RegLength;i++)
    {
      const regNoValues = await newContract.methods.RegNo(i).call();
      arr.push(regNoValues);
    }
    if(arr.indexOf(regNo)!=-1)
    { const isRegistered = await newContract.methods.getIsRegNoRegistered(arr.indexOf(regNo)).call();
      if(isRegistered==true)
      {
        alert("already registered");
      }
      else
      {
        alert("valid voter");
        await newContract.methods.RegisterRegNo(arr.indexOf(regNo)).send({from:account});
        setInp(1);

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
      {inp===1 && <InputReg scaddr={props.scaddr}/>}
    
    </div>
  );
}

