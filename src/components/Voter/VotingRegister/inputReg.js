import React from 'react'
import UseBlockchain from '../../../UseBlockchain.js';
import voting from '../../chair/voting.json';
export default function InputReg(props) {
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  const submit = async(event)=>{
    event.preventDefault();
    const addr = props.scaddr;
    const newContract = new web3.eth.Contract(voting.abi, addr);
    await newContract.methods.register().send({from:account});
  }
  return (
    <div>
        <form onSubmit={submit}>
        <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}
