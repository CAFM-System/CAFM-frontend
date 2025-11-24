// import { useState } from 'react'
import Test from './components/admin/Test'
import Header from './components/resident/Header';
import TopBanner from './components/resident/TopBanner';
import Stats from './components/resident/Stats';
import RequestList from './components/resident/RequestList';
import Footer from './components/resident/Footer';

function App() {
  
  return (
    <>
      <div className='bg-white'>
        {/* <h1>Welcome to CAFM Frontend</h1> */}
       <Header />
       <TopBanner />
       <Stats />
       <RequestList />
       <Footer />
      </div>
    </>
  );
}

export default App;
