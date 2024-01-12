import VoterHomeNavbar from '../navbars/VoterHomeNavbar.js';
import UseBlockchain  from '../../UseBlockchain.js';
function voterHome()
{const [web3,account,loadWeb3,contractAddress] = UseBlockchain();
    return(
        <>
        <VoterHomeNavbar/>
        </>
    );
}

export default voterHome;