import React from 'react'
import UseBlockchain from '../../UseBlockchain.js';
import { Link } from "react-router-dom";
export default function VoterFeedbackNavbar() {
    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
    return (

        <div className="">

<div className="flex gap-5 justify-between py-8 pr-12 pl-5 text-2xl text-black whitespace-nowrap bg-white max-md:flex-wrap max-md:pr-5">
             <Link to="/"><div>Home</div></Link>
      <div className="flex gap-5 justify-between">
      <Link to="/Feedback/Register"><div>Register</div></Link>
      <Link to="/Feedback/GiveFeedback"> <div>Give Feedback</div></Link>
     
      </div>
    </div>
            

        </div>
    )
}
