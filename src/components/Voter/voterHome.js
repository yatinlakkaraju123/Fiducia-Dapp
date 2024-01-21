import VoterHomeNavbar from '../navbars/VoterHomeNavbar.js';
import UseBlockchain  from '../../UseBlockchain.js';
import { Link } from 'react-router-dom';
function voterHome()
{const [web3,account,loadWeb3,contractAddress] = UseBlockchain();
    return(
        <>
        <VoterHomeNavbar/>
        <div className='container'  style={{marginTop:"240px"}}>
       
        <Link to="/Voting"><button type="button" class="btn btn-dark">Voting Application</button></Link><br></br><br></br>
  <Link to="/Feedback"><button type="button" class="btn btn-dark">Feedback Application</button></Link>
        </div>
        </>
    );
}

export default voterHome;