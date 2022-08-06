import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialDisplay from "../InitialDisplay/InitialDisplay";
import RegisterDisplay from "../RegisterDisplay/RegisterDisplay";
import HabitsDisplay from "../HabitsDisplay/HabitsDisplay";
import TodayDisplay from "../TodayDisplay/TodayDisplay";
import HistoryDisplay from "../HistoryDisplay/HistoryDisplay";

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<InitialDisplay />} />
                    <Route path="/cadastro" element={<RegisterDisplay />} />
                    <Route path="/habitos" element={<HabitsDisplay />} />
                    <Route path="/hoje" element={<TodayDisplay />} />
                    <Route path="/historico" element={<HistoryDisplay />} />
                </Routes>
		    </BrowserRouter>
        </>
    )
}