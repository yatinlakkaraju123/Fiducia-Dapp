import { Routes, Route } from "react-router-dom"
import VoterHome from "./voterHome.js"
import VoterVotingRegister from "./voterVotingRegister.js"
import VoterVotingvote from "./voterVotingVote.js"
import VoterVotingResults from "./voterVotingResults.js"
import VoterVotingHome from "./VoterVotingHome.js"
import VoterFeedbackHome from "./VoterFeedbackHome.js"
function Voter() 
{
    return (

        <>
        <Routes>
            <Route path="/" element={<VoterHome/>}/>
            <Route path="/Voting" element={<VoterVotingHome/>}/>
            <Route path="/Feedback" element={<VoterFeedbackHome/>}/>
            <Route path="/Voting/register" element={<VoterVotingRegister/>}/>
            <Route path="/Voting/vote" element={<VoterVotingvote/>}/>
            <Route path="/Voting/results" element={<VoterVotingResults/>}/>
        </Routes>
        </>
    );
}

export default Voter;