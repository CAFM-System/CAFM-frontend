import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// 1. Import your Layout
import TechnicianLayout from './layouts/TechnicianLayout';

// Pages
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

function App() {
  const user = {
    name: 'John Smith',
    role: 'resident', 
    apartment: 'A-101'
  };

  return (
    <BrowserRouter>
      <div className='w-full min-h-screen'>
        <Toaster position='bottom-right'/>
        
        <Routes>
          {/* Auth routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPg />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          
          {/* TECHNICIAN ROUTES (Nested in Layout)              */}
          <Route path='/technician' element={<TechnicianLayout />}>
            {/* 1. Redirect /technician -> /technician/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* 2. Child Routes (No leading slash needed) */}
            <Route path='dashboard' element={<TechnicianDashboard user={user} />} />
            <Route path='accept-ticket' element={<AcceptTicket />} />
            <Route path='reports' element={<TechnicianReports />} />
            <Route path='notifications' element={<TechnicianNotification />} />
            
          </Route>

          
          {/* Admin Dashboard */}
          <Route path='/admin' element={<AdminDashboard user={user} />} />
          
          {/* All resident routes handled by HomePage */}
          <Route path='/*' element={<HomePage user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;