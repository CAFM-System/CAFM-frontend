import { useState } from 'react'

import Test from './components/admin/Test'
import LoginPage from './pages/loginPage'
import { TestResidentDialog } from './components/resident/testResidentDialog';
import { CreateTicketDialog } from './components/resident/CreateTicketDialog';
import { ResidentDashboad } from './pages/ResidentDashboad';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {

  return (
    <>
      <ResidentDashboad />
    </>
  );
}

export default App
