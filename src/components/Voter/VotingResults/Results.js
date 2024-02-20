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

{inp===0 && <>
  <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <button type="button" onClick={LoadResults} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Load Results</button>
            </div>
            </div>
            </div>
</>}

{inp===1 && <><DynamicPieChart data={PieChartdata} /></>}

    </>
   
  )
}
