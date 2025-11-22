import { useState } from 'react'
import Ticketcard from './components/common/ticketCard'
import { tickets } from "./services/ticketData";


function App() {
  
  return (
    <>
      <h1>Welcome to CAFM Frontend</h1>
      <div className="w-full flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 gap-4">
          {
            tickets.map(
              (item)=>{
                  return(
                    <Ticketcard key={item.ticket_number} ticket={item}/>
                  )
              }
            )
          }
      </div>
      
      
      
      
    </>
  )
}

export default App
