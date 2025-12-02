import { useState } from 'react'

import Test from './components/admin/Test'
import LoginPage from './pages/loginPage'
import { TestResidentDialog } from './components/resident/testResidentDialog';
import { CreateTicketDialog } from './components/resident/CreateTicketDialog';
import { ResidentDashboad } from './pages/ResidentDashboad';
import AdminDashboard from './pages/admin/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TechnicianDashboard } from './components/technician/TechnicianDashboard';


function App() {

  return (
    <>
      <BrowserRouter>
        <div className='w-full h-[100vh] '>
          <Routes path="/">
            <Route path='/' element={<h1>Home page</h1>} />
            <Route path='/login' element = {<LoginPage/>}/>
            <Route path='/technician' element ={<TechnicianDashboard/>}/>
            <Route path='/admin' element ={<AdminDashboard/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
