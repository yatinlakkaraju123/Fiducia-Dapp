import VoterHomeNavbar from '../navbars/VoterHomeNavbar.js';
import UseBlockchain  from '../../UseBlockchain.js';
import { Link } from 'react-router-dom';
function voterHome()
{const [web3,account,loadWeb3,contractAddress] = UseBlockchain();
    return(
        <>
        <VoterHomeNavbar/>
       
        <div className='container'  >
            <h2>Welcome User</h2>
        <div style={{marginTop:"240px"}}>
        <Link to="/Voting"><button type="button" class="btn btn-dark">Voting Application</button></Link><br></br><br></br>
  <Link to="/Feedback"><button type="button" class="btn btn-dark">Feedback Application</button></Link>
        </div>
       
        </div>
        </>
    );
}

export default voterHome;