import React from 'react'
import UseBlockchain from '../../../UseBlockchain.js';
import DynamicPieChart from './DynamicPieChart.js';
import { useState, useEffect } from 'react';
import voting from '../../chair/voting.json';
export default function Results(props) {
    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
    const [PieChartdata,setpie] = useState(null);
    const [inp,setinp] = useState(0);
    const addr = props.scaddr;

    const LoadResults = async(event)=>{
        const Contract = new web3.eth.Contract(voting.abi, addr);
        const NoOfCandidates = await Contract.methods.candidatescount().call();
        const no = [];
        const names = [];
        for(let i=0;i<NoOfCandidates;i++)
        {
            const noVotes = await Contract.methods.getNoOfVotes(i).call();
            const name = await Contract.methods.getCandidateNames(i).call();
            no.push(noVotes);
            names.push(name);
        }
        
        
        const pieChartData = names.map((name, index) => ({
            name,
            votes: no[index],
          }));
          setpie(pieChartData);
          setinp(1);

    }

  return (
    <>

{inp===0 && <><button type="button" class="btn btn-primary" onClick={LoadResults}>Load Results</button>
</>}

{inp===1 && <><DynamicPieChart data={PieChartdata} /></>}

    </>
   
  )
}
