import { useEffect, useState } from "react";
import { CreateTicketDialog } from "../components/resident/CreateTicketDialog";
import TopBanner from "../components/resident/TopBanner";
//import { tickets} from "../services/newTicketData";
import Ticketcard from "../components/common/ticketCard";
import { ResidentTicketDialog } from "../components/resident/residentTicketDialog";
import apiClient from "../services/apiclient";
import { Header } from "../components/resident/Header";
import Footer  from "../components/resident/Footer";
import ResidentCard from "../components/resident/ResidentCard";
import { Ticket, Clock, CheckCircle, TrendingUp, Award  } from "lucide-react";

export function ResidentDashboad() {
    const [openCreateTicketDialog, setOpenCreateTicketDialog] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filter, setFilter] = useState("All");
    const [tickets,setTickets] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        try {
            if(isLoading){
                apiClient.get("/tickets").then(
                    (response)=>{
                        console.log(response.data)
                        setTickets(response.data.tickets);
                        setIsLoading(false);
                    }
                )
            }
        } catch (error) {
            (error)=>{
                console.log("Error fetching tickets:", error);
                setIsLoading(false);
                window.alert("Failed to load tickets.");
            }
        }
    },[isLoading]);

    const totalRequests = tickets.length;
    const activeRequests = tickets.filter(ticket => 
        ticket.status === "in_progress" || 
        ticket.status === "open" || 
        ticket.status === "assigned"
    ).length;
    const resolvedRequests = tickets.filter(ticket => 
        ticket.status === "resolved"
    ).length;


    const filteredTickets = tickets.filter(ticket => {
        if (filter === "All") return true;
        if (filter === "active") return ticket.status === "in_progress" || ticket.status === "open" || ticket.status === "assigned";
        if (filter === "resolved") return ticket.status === "resolved";
        return true;
    });

    return (
        <div className="w-full min-h-full flex flex-col gap-4 px-[100px] overflow-y-auto">
            <Header/>

            {openCreateTicketDialog && (
                <CreateTicketDialog close={() => setOpenCreateTicketDialog(false)} refresh={()=>setIsLoading(true)} />
            )}

            {isOpen && selectedTicket && (
                <ResidentTicketDialog
                    onClose={() => setIsOpen(false)}
                    data={selectedTicket}
                    refresh={()=>setIsLoading(true)}
                />
            )}

            
            <TopBanner openTicket={setOpenCreateTicketDialog} />

            <div className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
                    <ResidentCard
                        title="Total Requests"
                        value={totalRequests}
                        icon ={<TrendingUp className="w-6 h-6" />}
                        description="All time submissions"
                        headericon={<Ticket className="w-6 h-6" />}
                        onClick={() => console.log("Clicked Total Requests")}
                    />

                    <ResidentCard
                        title="Active Requests"
                        value={activeRequests}
                        icon ={<Clock className="w-6 h-6" />}
                        description="In progress now"
                        headericon={<Clock className="w-6 h-6" />}
                        onClick={() => console.log("Clicked Active Requests")}
                    />

                    <ResidentCard
                        title="Resolved"
                        value={resolvedRequests}
                        icon ={<Award className="w-6 h-6" />}
                        description="Successfully completed"
                        headericon={<CheckCircle className="w-6 h-6" />}
                        onClick={() => console.log("Clicked Resolved")}
                    />
                </div>
            </div>


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
                    {isLoading && <p>Loading tickets...</p>}

                    {!isLoading && filteredTickets.map(ticket => (
                        <Ticketcard
                            key={ticket.id}
                            ticket={ticket}
                            onClick={() => {
                                setSelectedTicket(ticket);
                                setIsOpen(true);
                            }}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
