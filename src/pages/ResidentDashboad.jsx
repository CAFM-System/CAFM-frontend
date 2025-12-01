import { useState } from "react";
import { CreateTicketDialog } from "../components/resident/CreateTicketDialog";
import TopBanner from "../components/resident/TopBanner";
import { Header } from "../components/resident/Header";
import { tickets} from "../services/ticketData";
import Ticketcard from "../components/common/ticketCard";
import { ResidentTicketDialog } from "../components/resident/residentTicketDialog";

export function ResidentDashboad() {
    const [openCreateTicketDialog, setOpenCreateTicketDialog] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filter, setFilter] = useState("All");

    const filteredTickets = tickets.filter(ticket => {
        if (filter === "All") return true;
        if (filter === "active") return ticket.status === "in_progress" || ticket.status === "open" || ticket.status === "assigned";
        if (filter === "resolved") return ticket.status === "resolved";
        return true;
    });

    return (
        <div className="w-full h-full flex flex-col gap-4 px-[100px]">
            
            {openCreateTicketDialog && (
                <CreateTicketDialog close={() => setOpenCreateTicketDialog(false)} />
            )}

            {isOpen && selectedTicket && (
                <ResidentTicketDialog
                    onClose={() => setIsOpen(false)}
                    data={selectedTicket}
                />
            )}

            <Header />
            <TopBanner openTicket={setOpenCreateTicketDialog} />

            <div className="w-full rounded-2xl border border-gray-500/50 shadow-lg bg-white/50 backdrop-blur-lg flex flex-col gap-4">
                
                
                <div className="w-full h-[80px] border-b border-gray-300 flex items-center px-4 gap-4">
                    {["All", "active", "resolved"].map(type => (
                        <button key={type}>
                            <span
                                className={`px-4 py-4 rounded-2xl cursor-pointer ${
                                    filter === type
                                        ? "bg-[#1687A7] text-white"
                                        : "text-gray-700 hover:bg-[#D3E0EA]"
                                }`}
                                onClick={() => setFilter(type)}
                            >
                                {type === "All" && "All Tickets"}
                                {type === "active" && "Active Tickets"}
                                {type === "resolved" && "Resolved Tickets"}
                            </span>
                        </button>
                    ))}
                </div>

                
                <div className="w-full p-4 space-y-4">
                    {filteredTickets.map(ticket => (
                        <Ticketcard
                            key={ticket.ticketId}
                            ticket={ticket}
                            onClick={() => {
                                setSelectedTicket(ticket);
                                setIsOpen(true);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
