import React from 'react'
import UseBlockchain from '../../../UseBlockchain.js';
import { useState, useEffect } from 'react';
import voting from '../../chair/voting.json';
export default function VoterPage(props) {
    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
    const [CandidateArray,setCandidateArray] = useState([]);
    const [CandidateDescArray,setCandidateDescArray] = useState([]);
    const[isLoaded,setIsLoaded] = useState(0);
    const addr = props.scaddr;
    const Vote = async(event,index)=>{
        const Contract = new web3.eth.Contract(voting.abi, addr);
        await Contract.methods.voting(index).send({from:account});
    }
    const loadCandidateDetails = async () => {
        try {
            const Contract = new web3.eth.Contract(voting.abi, addr);
            const NoOfCandidates = await Contract.methods.candidatescount().call();
            const arr = [];
            const arrDesc = [];
    
            for (let i = 0; i < NoOfCandidates; i++) {
                const candidateName = await Contract.methods.getCandidateNames(i).call();
                const candidateDesc = await Contract.methods.getCandidateDescription(i).call();
                arr.push(candidateName);
                arrDesc.push(candidateDesc);
                
            }
    
            setCandidateArray(arr);
            setCandidateDescArray(arrDesc);
            console.log(arr);
            setIsLoaded(1);
          
        } catch (error) {
            console.error('Error loading candidate details:', error);
        }
       
    };
    
  
  return (
    <div>
       
        <h4>Voter rendering page</h4>
        <button type="button" onClick={loadCandidateDetails} class="btn btn-primary">Load Candidates</button>
        {isLoaded === 1 && (
  <>
    {CandidateArray.map((item, index) => (
      <div class="card" style={{ width: '18rem' }} key={index}>
        <div class="card-body">
          <h5 class="card-title">{item}</h5>
          <p class="card-text">{CandidateDescArray[index]}</p>
          <button type='button' class="btn btn-primary" onClick={(event) => Vote(event, index)}>
            Vote
          </button>
        </div>
      </div>
    ))}
  </>
)}

    
    </div>
  )
}
