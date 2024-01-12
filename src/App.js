import React, { useState, useEffect } from 'react';
import {ABI} from "./config.js"
import UseBlockchain  from './UseBlockchain.js';
import './App.css';
import Chair from "./components/chair/Chair.js";
import Voter from "./components/Voter/Voter.js";


function App() {
 // const [isLoading, setIsLoading] = useState(false);
const [typeofUser,setTypeOfUser] = useState("none");
const [web3,account,loadWeb3,contractAddress] = UseBlockchain();



useEffect(() => {
  const fetchChairperson = async () => {
    if (web3 && contractAddress) {
      const contract = new web3.eth.Contract(ABI, contractAddress);
      const ChairAddress = await contract.methods.chairperson().call();
      if (ChairAddress === account) {
        setTypeOfUser("chair");
      } else {
        setTypeOfUser("voter");
      }
    }
  };

  fetchChairperson(); // Call the function inside the useEffect callback
}, [web3, contractAddress, account]);
  return (
    <>
       
       {typeofUser==="chair"&& <Chair/>}
      {typeofUser==="voter"&& <Voter/>}
    </>
    

  );
}

export default App;
