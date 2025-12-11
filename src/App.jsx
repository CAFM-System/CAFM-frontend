import AdminDashboard from './pages/admin/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TechnicianDashboard } from './pages/technician/TechnicianDashboard';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPg from './pages/auth/RegisterPg';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='w-full h-screen'>
          <Routes>
            <Route path='/*' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/technician' element={<TechnicianDashboard />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/register' element={<RegisterPg />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App