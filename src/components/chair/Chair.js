import { Routes, Route } from "react-router-dom"
import ChairHome from "./chairHome.js";

function Chair()
{
    return(

        <>
        <Routes>
            <Route path="/" element={<ChairHome/>}/>
            
        </Routes>
        </>
    );
}


export default Chair;