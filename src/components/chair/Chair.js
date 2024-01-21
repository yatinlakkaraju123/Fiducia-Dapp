import { Routes, Route } from "react-router-dom"
import ChairHome from "./chairHome.js";
import ChairVotingHome from "./ChairVotingHome.js";
import ChairFeedbackHome from "./ChairFeedbackHome.js";
import DeployData from "./deploydata.js"
function Chair()
{
    return(

        <>
        <Routes>
            <Route path="/" element={<ChairHome/>}/>
            <Route path="/Voting" element={<ChairVotingHome/>}/>
            <Route path="/Feedback" element={<ChairFeedbackHome/>}/>
            <Route path="/deploy" element={<DeployData/>}/>

            
        </Routes>
        </>
    );
}


export default Chair;