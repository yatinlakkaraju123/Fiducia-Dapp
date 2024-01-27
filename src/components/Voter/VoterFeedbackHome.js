import React from 'react'
import VoterFeedbackNavbar from '../navbars/VoterFeedbackNavbar'
import UseBlockchain from '../../UseBlockchain'
export default function VoterFeedbackHome() {
    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  return (
    <div>
        <VoterFeedbackNavbar/>
        <h3>Home</h3>
    </div>
  )
}
