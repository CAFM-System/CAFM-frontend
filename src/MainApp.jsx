import { useState } from 'react';
import "./styles/ResidentDashboard.css";

function MainApp() {
    // State to determine which view is active: 'dashboard' or 'requests'
    const [activeView, setActiveView] = useState('requests'); 

    return (
        <div className="page-layout">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            {activeView === 'dashboard' ? <DashboardContent /> : <RequestListContent />}
        </div>
    );
}

export default MainApp;