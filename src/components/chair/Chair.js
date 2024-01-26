import { Routes, Route } from "react-router-dom"
import ChairHome from "./chairHome.js";
import ChairVotingHome from "./ChairVotingHome.js";
import ChairFeedbackHome from "./ChairFeedbackHome.js";
import DeployData from "./deploydata.js"
import NewFeedback from "./NewFeedback.js";
import Results from "./Results.js"
function Chair()
{
    return(

        <>
        <Routes>
            <Route path="/" element={<ChairHome/>}/>
            <Route path="/Voting" element={<ChairVotingHome/>}/>
            <Route path="/Feedback" element={<ChairFeedbackHome/>}/>
            <Route path="/deploy" element={<DeployData/>}/>
            <Route path="/Feedback/New" element={<NewFeedback/>}/>
            <Route path="/Feedback/Results" element={<Results/>}/>

            
        </Routes>
        </>
    );
}


export default Chair;