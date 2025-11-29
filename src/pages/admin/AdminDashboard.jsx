import { useState } from "react";
import AdminDashboardHeader from "../../components/admin/AdminDashboardHeader";
import DashboardCard from "../../components/common/DashboardCard";
import { TicketMinus, Clock4, CheckCircle, AlertTriangle } from "lucide-react";
import TicketCard from "../../components/common/ticketCard";


// Sample tickets data
const tickets = [
    { ticketId: "T001", title: "Leaking Pipe", status: "open", priority: "high", description: "Water leaking", location: "12B", resident: "John", category: "Plumbing", createdDate: "2025-11-28" },
    { ticketId: "T002", title: "AC Not Cooling", status: "resolved", priority: "urgent", description: "AC not working", location: "7A", resident: "Jane", category: "Electrical", createdDate: "2025-11-27" },
    { ticketId: "T003", title: "Internet Issue", status: "in_progress", priority: "urgent", description: "No internet", location: "15C", resident: "Mike", category: "Network", createdDate: "2025-11-26" },
    { ticketId: "T004", title: "Light Bulb Replacement", status: "closed", priority: "low", description: "Bulb broken", location: "3D", resident: "Anna", category: "Electrical", createdDate: "2025-11-25" },
    { ticketId: "T004", title: "Light Bulb Replacement", status: "closed", priority: "low", description: "Bulb broken", location: "3D", resident: "", category: "Electrical", createdDate: "2025-11-25" },

];

export default function AdminDashboard() {
    const urgentTickets = tickets.filter(t => t.priority === "urgent");
    const activeTickets = tickets.filter(t => t.status === "open" || t.status === "in_progress");
    const resolvedTickets = tickets.filter(t => t.status === "resolved");
    const unassignedTickets = tickets.filter(t => !t.resident || t.resident === "");
    const totalTickets = tickets.length;

    const [activeTab, setActiveTab] = useState("overview");
    return (

        <>
            <AdminDashboardHeader
                title="Admin Dashboard"
                name="Admin User"
                department="administration"
            />

            {/* Tabs */}

            <div className="flex gap-6 border-b border-gray-200 px-4 sm:px-6 mt-10 overflow-x-auto whitespace-nowrap sm:justify-start">
                {["overview", "all", "reports"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 font-medium ${activeTab === tab
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600"
                            }`}
                    >
                        {tab === "overview" && "Overview"}
                        {tab === "all" && "All Tickets"}
                        {tab === "reports" && "Reports & Analytics"}
                    </button>
                ))}
            </div>

            {activeTab === "overview" && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4 sm:px-6">
                        <DashboardCard
                            title="Total Tickets"
                            value={totalTickets}
                            icon={<TicketMinus />}
                            onClick={() => console.log("Clicked Completed Tasks")}
                        />
                        <DashboardCard
                            title="Active Tickets"
                            value={activeTickets.length}
                            icon={<Clock4 className="text-red-500" />}
                            onClick={() => console.log("Clicked Pending Issues")}
                            className="bg-blue-50"
                        />
                        <DashboardCard
                            title="Resolved"
                            value={resolvedTickets.length}
                            icon={<CheckCircle className="text-green-500" />}
                            onClick={() => console.log("Clicked Pending Issues")}
                            className="bg-blue-50"
                        />
                        <DashboardCard
                            title="Urgent"
                            value={urgentTickets.length}
                            icon={<AlertTriangle className="text-red-500" />}
                            onClick={() => console.log("Clicked Pending Issues")}
                            className="bg-blue-50"
                        />
                    </div>

                    {/* Urgent Tickets Section */}
                    {urgentTickets.length > 0 && (
                        <div className="mt-8 px-4 sm:px-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                Urgent Tickets
                            </h2>

                            {/* Vertical list: one ticket per row */}
                            <div className="flex flex-col gap-6">
                                {urgentTickets.map(ticket => (
                                    <TicketCard key={ticket.ticketId} ticket={ticket} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 px-4 sm:px-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            Unassigned Tickets
                        </h2>

                        <div className="flex flex-col gap-6 mb-4">
                            {unassignedTickets.length > 0
                                ? unassignedTickets.map(ticket => (
                                    <TicketCard key={ticket.ticketId} ticket={ticket} />
                                ))
                                : (
                                    // Placeholder empty ticket
                                    <div className="w-full h-[250px] border border-gray-300 rounded-2xl p-4 mb-4 flex flex-col items-center justify-center text-gray-400">

                                        <CheckCircle className="text-green-300 mb-4" size={60} />

                                        <p className="text-lg text-gray-500">All tickets are assigned!</p>
                                    </div>

                                )
                            }
                        </div>
                    </div>


                </>
            )}
        </>
    );
}
