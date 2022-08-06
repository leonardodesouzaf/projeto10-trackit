import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialDisplay from "../InitialDisplay/InitialDisplay";

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<InitialDisplay />} />
                </Routes>
		    </BrowserRouter>
        </>
    )
}