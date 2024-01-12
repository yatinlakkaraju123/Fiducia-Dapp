import { Routes, Route } from "react-router-dom"
import VoterHome from "./voterHome.js"
function Voter() 
{
    return (

        <>
        <Routes>
            <Route path="/" element={<VoterHome/>}/>
        </Routes>
        </>
    );
}

export default Voter;