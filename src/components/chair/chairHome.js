import React from 'react';
import ChairHomeNavbar from '../navbars/ChairHomeNavbar.js';
import UseBlockchain  from '../../UseBlockchain.js';
import { Link } from 'react-router-dom';
function ChairHome()
{
   
    const [web3,account,loadWeb3,contractAddress] = UseBlockchain();
    

    return(
  <>
  <ChairHomeNavbar/>
  <div className="flex flex-col pt-3 pb-12 bg-white">
      <div className="flex gap-5 justify-between items-start mr-11 ml-11 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-16 pt-4 pb-8 mr-10 ml-52 max-w-full border-solid bg-neutral-200 border-[3px] border-stone-300 rounded-[30px] w-[1249px] max-md:flex-wrap max-md:px-5 max-md:mr-2.5">
        <div className="flex flex-col my-auto max-md:max-w-full">
          <div className="text-6xl italic font-semibold uppercase text-stone-950 max-md:max-w-full max-md:text-4xl">
            Welcome Chairperson
          </div>
          <div className="mt-3.5 text-2xl italic capitalize text-zinc-700 max-md:max-w-full">
            Get ready on this great journey
          </div>
        </div>
        <div className="rounded-3xl bg-zinc-500 h-[150px] w-[118px]" />
      </div>
      <div className="self-center mt-20 w-full max-w-[1320px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[66%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col ml-28 max-w-full capitalize w-[610px]">
                <div className="ml-9 text-5xl font-bold text-neutral-900 max-md:max-w-full max-md:text-4xl">
                  Description{" "}
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e4683e0d86a6fd3be411533ee09a6338133418a702f6d6fa0291e670c3d5823?apiKey=bfd7a410c6f4425d967d86f7a9a5e67d&"
                  className="mt-2.5 max-w-full aspect-[100] stroke-[4px] stroke-neutral-500 w-[364px]"
                />
                <div className="mt-4 ml-9 text-lg text-zinc-700 max-md:max-w-full">
                 You can create a new voting event, new feedback form and view the feedback given
                </div>
              </div>{" "}
              <div className="mt-20 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <Link to="/Voting"> <button className="grow justify-center items-start px-16 py-9 ml-24 w-full text-4xl text-white capitalize border-solid bg-neutral-700 border-[5px] border-zinc-400 rounded-[50px] max-md:px-5 max-md:mt-10">
                     Voting Application
                    </button></Link>
                  </div>{" "}
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <Link to="/Feedback"> <button className="grow justify-center items-start px-16 py-9 ml-16 w-full text-4xl text-black capitalize border-2 border-solid border-zinc-800 rounded-[50px] max-md:pr-5 max-md:pl-7 max-md:mt-10">
                      Feedback Application
                    </button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="flex flex-col ml-5 w-[34%] max-md:ml-0 max-md:w-full" />
        </div>
      </div>
    </div>
  
  

  

  </>
    );
}

export default ChairHome;