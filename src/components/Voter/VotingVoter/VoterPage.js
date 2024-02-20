import React from 'react'
import UseBlockchain from '../../../UseBlockchain.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import voting from '../../chair/voting.json';
import { storage } from "../../../firebase.js";
import { ref, listAll, getDownloadURL } from "firebase/storage"
export default function VoterPage(props) {
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  const [CandidateArray, setCandidateArray] = useState([]);
  const [CandidateDescArray, setCandidateDescArray] = useState([]);
  const [DPurls, setdpurls] = useState([])
  const [isLoaded, setIsLoaded] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  }
  const addr = props.scaddr;
  const tkn = props.Token;
  const imagesRef = ref(storage, `images/${tkn}`);
  const Vote = async (event, index) => {
    const Contract = new web3.eth.Contract(voting.abi, addr);
    await Contract.methods.voting(index).send({ from: account });
    setShowModal(true);
  }
  const loadCandidateDetails = async () => {
    try {
      const Contract = new web3.eth.Contract(voting.abi, addr);
      const NoOfCandidates = await Contract.methods.candidatescount().call();
      const arr = [];
      const arrDesc = [];
      const arrImg = []
      for (let i = 0; i < NoOfCandidates; i++) {
        const candidateName = await Contract.methods.getCandidateNames(i).call();
        const candidateDesc = await Contract.methods.getCandidateDescription(i).call();
        arr.push(candidateName);
        arrDesc.push(candidateDesc);

      }
      listAll(imagesRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setdpurls((prev) => [...prev, url]);
          });
        });
      });


      setCandidateArray(arr);
      setCandidateDescArray(arrDesc);
      console.log(arr);
      setIsLoaded(1);

    } catch (error) {
      console.error('Error loading candidate details:', error);
    }

  };


  return (
    <div className='ml-60 '>
       <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <button type="button" onClick={loadCandidateDetails} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Load Candidates</button>
            </div>
            </div>
            </div>
   
     
      
     
      {isLoaded === 1 && (
        <>
          {CandidateArray.map((item, index) => (
            
            <div className="flex flex-col justify-center py-4">
            <div className="flex gap-5 justify-between py-5 pr-20 pl-6 w-full shadow-sm bg-zinc-300 rounded-[40px] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
                    <div className="flex justify-center items-center px-8 mx-auto  h-[153px] rounded-[29px] w-[153px] max-md:px-5 max-md:mt-8">
                      <img
                        loading="lazy"
                        src={DPurls[index]}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow mt-4 max-md:mt-10 max-md:max-w-full">
                      <div className="text-6xl font-semibold uppercase text-stone-950 max-md:max-w-full max-md:text-4xl">
                        {item}
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/818afe22332771487e0b2678a6afa7554c43a3b473d447ef8c1c39bd31000d4b?apiKey=bfd7a410c6f4425d967d86f7a9a5e67d&"
                        className="mt-2 max-w-full aspect-[25] stroke-[3px] stroke-black w-[455px]"
                      />
                      <div className="mt-3 text-base capitalize text-zinc-700 max-md:max-w-full">
                      {CandidateDescArray[index]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="my-auto rounded-xl shadow-sm bg-zinc-800 p-4" >
                 <button type='button' className="text-3xl text-white uppercase w-[76px]" onClick={(event) => Vote(event, index)}>Vote</button>
                </div>
             
    
            </div>
          </div>
          ))}
         
        </>
      )}


    </div>
  )
}

/*
<div class="card" style={{ width: '18rem' }} key={index}>
              <img src={DPurls[index]} class="card-img-top" alt="DP"></img>
              <div class="card-body">
                <h5 class="card-title">{item}</h5>
                <p class="card-text">{CandidateDescArray[index]}</p>
                <button type='button' class="btn btn-primary" onClick={(event) => Vote(event, index)}>
                  Vote
                </button>
              </div>
            </div>



*/
