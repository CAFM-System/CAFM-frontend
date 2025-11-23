import { useState } from 'react'
import Test from './components/admin/Test'
import { Header } from './components/resident/header'

function App() {
  
  return (
    <>
      
      <Header/>
      <div className='bg-white'>
        <h1>Welcome to CAFM Frontend</h1>
        <Test />
      </div>
    </>
  )
}

export default App
