import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/admin/AdminDashboard';
import { TechnicianDashboard } from './pages/technician/TechnicianDashboard';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPg from './pages/auth/RegisterPg';
import ForgotPasswordPage from './pages/auth/Forget-Password'; 
import ResetPasswordPage from './pages/auth/Reset-Password';
import AcceptTicket from './pages/technician/AcceptTicket';

function App() {
  // Example user - in a real app, this would come from authentication context
  const user = {
    name: 'John Smith',
    role: 'resident', // Options: 'resident', 'technician', 'admin'
    apartment: 'A-101'
  };

  return (
    <BrowserRouter>
      <div className='w-full h-screen'>
        <Toaster position='bottom-right'/>
        <Routes>
          {/* Auth routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPg />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          
          {/* Technician Dashboard */}
          <Route path='/technician' element={<TechnicianDashboard user={user} />} />
          
          {/* Admin Dashboard */}
          <Route path='/admin' element={<AdminDashboard user={user} />} />
          
          {/* All resident routes handled by HomePage */}
          <Route path='/*' element={<HomePage user={user} />} />
          <Route path='/accept-ticket' element={<AcceptTicket/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;