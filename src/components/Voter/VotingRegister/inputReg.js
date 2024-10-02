
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UseBlockchain from '../../../UseBlockchain.js';
import voting from '../../chair/voting.json';
import Button from 'react-bootstrap/Button';

export default function InputReg(props) {
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {setShowModal(false);
    window.location.reload();
  }
  const submit = async(event)=>{
    event.preventDefault();
    const addr = props.scaddr;
    const newContract = new web3.eth.Contract(voting.abi, addr);
    await newContract.methods.register().send({from:account});
    alert("Congratulations you have registered yourselves for voting")
    window.location.reload();
    
  }
  return (
    
          <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <button type='submit' onClick={submit} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Register</button>
            </div>
            
              </div>
              </div>
              
            
       

   
  )
}
