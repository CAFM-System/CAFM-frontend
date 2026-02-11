import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// 1. Import your Layouts
import TechnicianLayout from './layouts/TechnicianLayout';

// Pages - Admin & Technician
import AdminDashboard from './pages/admin/AdminDashboard';
import { TechnicianDashboard } from './pages/technician/TechnicianDashboard';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPg from './pages/auth/RegisterPg';
import ForgotPasswordPage from './pages/auth/Forget-Password'; 
import ResetPasswordPage from './pages/auth/Reset-Password';
import AcceptTicket from './pages/technician/AcceptTicket';
import TechnicianReports from './pages/technician/TechnicianReports';
import TechnicianNotification from './pages/technician/TechnicianNotification';

// Pages - Front Desk
import VisitorRegForm from './pages/frontDesk/VisitorRegForm';
import FDeskDashBoard from './pages/frontDesk/FDeskDashBoard';

function App() {
  const user = {
    name: 'John Smith',
    role: 'resident', 
    apartment: 'A-101'
  };

  // Handler for when a visitor is successfully added
  const handleAddVisitor = (visitorData) => {
    console.log("New Visitor Registered:", visitorData);
    // Add API call logic here
  };

  return (
    <BrowserRouter>
      <div className='w-full min-h-screen'>
        <Toaster position='bottom-right' containerStyle={{ zIndex: 99999 }} />
        
        <Routes>
          {/* Auth routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPg />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          
          {/* TECHNICIAN ROUTES (Protected by Layout) */}
          <Route path='/technician' element={<TechnicianLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path='dashboard' element={<TechnicianDashboard user={user} />} />
            <Route path='accept-ticket' element={<AcceptTicket />} />
            <Route path='reports' element={<TechnicianReports />} />
            <Route path='notifications' element={<TechnicianNotification />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path='/admin' element={<AdminDashboard user={user} />} />

          {/* FRONT DESK ROUTES */}
          {/* We group them under /frontdesk */}
          <Route path='/frontdesk'>
             {/* 1. Main Dashboard view */}
             <Route index element={<FDeskDashBoard />} />
             
             {/* 2. The Register Form view */}
             <Route 
               path='register' 
               element={
                 <VisitorRegForm 
                   onAddVisitor={handleAddVisitor} 
                   onCancel={() => window.history.back()} 
                 />
               } 
             />
          </Route>
          
          {/* All resident routes handled by HomePage */}
          <Route path='/*' element={<HomePage user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;