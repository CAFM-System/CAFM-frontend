import { useState } from "react";
import { CreateTicketDialog } from "../components/resident/CreateTicketDialog";
import TopBanner from "../components/resident/TopBanner";
import { Header } from "../components/resident/Header";
import { tickets} from "../services/ticketData";
import Ticketcard from "../components/common/ticketCard";

export function ResidentDashboad() {
    const [openCreateTicketDialog, setOpenCreateTicketDialog] = useState(false);
    const ticket = tickets
    return(
        <div className=" w-full h-full flex flex-col gap-4 px-[100px]">
            {
                openCreateTicketDialog && <CreateTicketDialog close={() => setOpenCreateTicketDialog(false)} />
            }
            <Header/>
            <TopBanner openTicket={setOpenCreateTicketDialog}  />
            <div  className="w-full rounded-2xl border border-gray-500/50 shadow-lg bg-white/50 backdrop-blur-lg p-4 flex flex-col gap-4">
                <div className="w-full h-[80px] border-b border-gray-300 flex items-center px-4">

                </div>
                <div className="w-full p-4  space-y-4">
                    {
                        ticket.map((data)=>{
                            return(
                               
                                <Ticketcard key={data.ticketId} ticket={data} className=""/>
                                
                            )
                        })
                    }
                </div>
            </div>
            
            

        </div>
    )
}