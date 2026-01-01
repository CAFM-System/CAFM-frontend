import AdminDashboard from './pages/admin/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TechnicianDashboard } from './pages/technician/TechnicianDashboard';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPg from './pages/auth/RegisterPg';
import { Toaster } from 'react-hot-toast';
import ForgotPasswordPage from './pages/auth/Forget-Password'; 
import ResetPasswordPage from './pages/auth/Reset-Password';
 // Note: matches your filename

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='w-full h-screen'>
          <Toaster position='bottom-right'/>
          <Routes>
            <Route path='/*' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/technician' element={<TechnicianDashboard />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/register' element={<RegisterPg />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;