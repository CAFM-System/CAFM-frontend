import { Route, Routes } from "react-router-dom";
import { ResidentDashboad } from "./ResidentDashboad";
import ResidentLandingPage from "./resident/LandingPage";
import UserProfileCard from "./resident/ProfilePage";
import NotificationsPage from "./resident/NotificationsPage";
import { Header } from "../components/resident/Header";

export function HomePage({ user }) {
    const handleViewTicket = (ticket) => {
        console.log('Viewing ticket:', ticket);
        // Add your navigation logic here
    };

    return (
        <div className="w-full h-full">
            <Routes>
                <Route index element={<ResidentLandingPage user={user} />} />
                <Route path="resident/dashboard" element={<><Header/><ResidentDashboad /></>} />                
                <Route 
                    path="/notifications" 
                    element={
                        <><Header/>
                        <NotificationsPage 
                            user={user}
                            onViewTicket={handleViewTicket}
                        /></>
                    } 
                />
                <Route path="profile" element={<><Header/><UserProfileCard user={user} /></>} />
            </Routes>
        </div>
    )
}