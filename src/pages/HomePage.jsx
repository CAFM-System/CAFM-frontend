import { Route, Routes, useNavigate } from "react-router-dom";
import { ResidentDashboad } from "./ResidentDashboad";
import UserProfileCard from "./resident/ProfilePage";
import NotificationsPage from "./resident/NotificationsPage";
import VisitorRegPage from "./resident/VisitorPage";
import { Header } from "../components/resident/Header";
// import { use } from "react";
import Home from "./home/HomeLanding";
import Footer from "./home/Footer";

export function HomePage({ user }) {
    const navigate = useNavigate();
    const handleViewTicket = (ticket) => {
        console.log('Viewing ticket:', ticket);
        // Add your navigation logic here
        navigate(`/resident/dashboard`, { state: { ticketId: ticket.ticket_id } });
    };

    return (
        <div className="w-full h-full">
            <Routes>
                <Route index element={<Home user={user} />} />
                <Route path="resident">
                    <Route path="dashboard" element={<><Header/><ResidentDashboad /></>} />                
                    <Route 
                        path="notifications" 
                        element={
                            <><Header/>
                            <NotificationsPage 
                                user={user}
                                onViewTicket={handleViewTicket}
                            /></>
                        } 
                    />
                    <Route path="profile" element={<><Header/><UserProfileCard user={user} /></>} />
                    
                    <Route path="visitors" element={<><Header/>< VisitorRegPage  /></>} />
                  
                    
                </Route>
            </Routes>
        </div>
    )
}