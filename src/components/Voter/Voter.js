import { Routes, Route } from "react-router-dom"
import VoterHome from "./voterHome.js"
import VoterVotingRegister from "./voterVotingRegister.js"
import VoterVotingvote from "./voterVotingVote.js"
import VoterVotingResults from "./voterVotingResults.js"
import VoterVotingHome from "./VoterVotingHome.js"
import VoterFeedbackHome from "./VoterFeedbackHome.js"
import Register from "./Feedback/Register.js"
import GiveFeedback from "./Feedback/GiveFeedback.js"
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
            <Route path="/Feedback/Register" element={<Register/>}/>
            <Route path="/Feedback/GiveFeedback" element={<GiveFeedback/>}/>
        </Routes>
        </>
    );
}

export default Voter;