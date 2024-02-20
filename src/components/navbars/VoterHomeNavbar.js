import UseBlockchain from '../../UseBlockchain.js';
import React from 'react';
import { Link } from "react-router-dom";
function VoterHomeNavbar()
{
   

    return (

    
             <div className="flex gap-5 justify-between py-8 pr-12 pl-5 text-2xl text-black whitespace-nowrap bg-white max-md:flex-wrap max-md:pr-5">
             <Link to="/"><div>Home</div></Link>
      <div className="flex gap-5 justify-between">
      <Link to="/Voting/register"><div>Register</div></Link>
      <Link to="/Voting/vote"> <div>Vote</div></Link>
      <Link to="/Voting/results"> <div>Results</div></Link>
      </div>
    </div>
 
                      
                       
                  




  







    );
}

export default VoterHomeNavbar;