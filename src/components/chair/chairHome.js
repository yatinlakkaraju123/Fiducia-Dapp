import React, { useState, useEffect } from 'react';
import ChairHomeNavbar from '../navbars/ChairHomeNavbar.js';
import UseBlockchain  from '../../UseBlockchain.js';
function ChairHome()
{
   
    const [web3,account,loadWeb3,contractAddress] = UseBlockchain();
    

    return(
  <>
  <ChairHomeNavbar/>
  </>
    );
}

export default ChairHome;