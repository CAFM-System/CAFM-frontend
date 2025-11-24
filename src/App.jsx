
import { Header } from './components/resident/header'
import { TestResidentDialog } from './components/resident/testResidentDialog'


function App() {
  
  return (
    <>
      
      <Header/>
      <div className='bg-white mt-[150px]'>
        <h1>Welcome to CAFM Frontend</h1>
        <TestResidentDialog/>
      </div>
    </>
  )
}

export default App