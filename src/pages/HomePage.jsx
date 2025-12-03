import { Route, Routes } from "react-router-dom";
import { ResidentDashboad } from "./ResidentDashboad";

export function HomePage() {
    return(
        <div className="w-full h-full">
            <Routes>
                <Route index element={<h1>Landing Page</h1>}/>
                <Route path="resident" element={<ResidentDashboad />}/>
                <Route path="notifications" element={<h1>Notifications Page</h1>}/>
                <Route path="profile" element={<h1>Profile Page</h1>}/>
            </Routes>
        </div>
    )
}