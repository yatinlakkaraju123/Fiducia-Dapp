import { useState, useEffect } from 'react';
import {ABI} from "./config.js"
import Web3 from 'web3';
const contractAddress = "0x369aDE85544d35ee72D49CFfdfc0a53E029fb69a"
export default function UseBlockchain()
{
    const [web3, setWeb3] = useState(null);
//const [typeofUser,setTypeOfUser] = useState("none");
const [account, setAccount] = useState(null);
const loadWeb3 = async () => {

  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await

window.ethereum.request({ method: 'eth_requestAccounts' });
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    // Handle no Ethereum provider
  }
 
};

useEffect(() => {
  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await
 
window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      // Handle no Ethereum provider
    }
  };

  loadWeb3(); // Call the function inside the useEffect callback
}, []);

return [web3,account,loadWeb3,contractAddress];

}



