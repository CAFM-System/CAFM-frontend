import { useState } from "react";
import { CreateTicketDialog } from "./CreateTicketDialog";
import TopBanner from "./TopBanner";

export function ResidentDashboad() {
    const [openCreateTicketDialog, setOpenCreateTicketDialog] = useState(false);
    
    return(
        <div className="w-full h-full flex flex-col">
            {
                openCreateTicketDialog && <CreateTicketDialog close={() => setOpenCreateTicketDialog(false)} />
            }
            <TopBanner openTicket={setOpenCreateTicketDialog}  />
        </div>
    )
}