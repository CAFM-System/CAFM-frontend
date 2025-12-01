import { useState } from "react";
import AdminDashboardHeader from "../../components/admin/AdminDashboardHeader";
import DashboardCard from "../../components/common/DashboardCard";
import { Ticket, Clock4, CheckCircle, AlertTriangle, Search, Funnel } from "lucide-react";
import TicketCard from "../../components/common/ticketCard";
import ReportsAnalytics from "../../components/admin/ReportsAnalytics";



// Sample tickets data
const sampleTickets = [
    { ticketId: "T001", title: "Leaking Pipe", status: "open", priority: "high", description: "Water leaking", location: "12B", resident: "John", category: "Plumbing", createdDate: "2025-11-28" },
    { ticketId: "T002", title: "AC Not Cooling", status: "resolved", priority: "urgent", description: "AC not working", location: "7A", resident: "Jane", category: "Electrical", createdDate: "2025-11-27" },
    { ticketId: "T003", title: "Internet Issue", status: "in_progress", priority: "urgent", description: "No internet", location: "15C", resident: "Mike", category: "Network", createdDate: "2025-11-26" },
    { ticketId: "T004", title: "Light Bulb Replacement", status: "closed", priority: "low", description: "Bulb broken", location: "3D", resident: "Anna", category: "Electrical", createdDate: "2025-11-25" },


];

export default function AdminDashboard() {
    // Tickets state
    const [tickets] = useState(sampleTickets);
    // UI state
    const [activeTab, setActiveTab] = useState("overview");
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    // Derived lists (computed from `tickets` state)
    const urgentTickets = tickets.filter(t => (t.priority || "").toLowerCase() === "urgent");
    const activeTickets = tickets.filter(t => {
        const s = (t.status || "").toLowerCase();
        return s === "open" || s === "in_progress" || s === "in progress";
    });
    const resolvedTickets = tickets.filter(t => (t.status || "").toLowerCase() === "resolved");
    const unassignedTickets = tickets.filter(t => !t.resident || t.resident === "");
    const totalTickets = tickets.length;

    const filteredTickets = tickets.filter(ticket => {
        const q = searchText.toLowerCase();
        const searchMatch =
            (ticket.ticketId || "").toLowerCase().includes(q) ||
            (ticket.title || "").toLowerCase().includes(q) ||
            (ticket.resident || "").toLowerCase().includes(q) ||
            (ticket.location || "").toLowerCase().includes(q);

        const statusMatch = statusFilter === "" || (ticket.status || "").toLowerCase() === statusFilter.toLowerCase();
        const priorityMatch = priorityFilter === "" || (ticket.priority || "").toLowerCase() === priorityFilter.toLowerCase();
        const categoryMatch = categoryFilter === "" || (ticket.category || "").toLowerCase() === categoryFilter.toLowerCase();

        return searchMatch && statusMatch && priorityMatch && categoryMatch;
    });

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
                            icon={<Ticket />}
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

            {activeTab === "all" && (
                <>
                    <div className="w-full space-y-4  mt-8">

                        {/* Search */}
                        <div className="flex items-center  rounded-xl px-4 py-2 bg-white shadow-sm transition-all focus-within:border-3 focus-within:border-gray-500 ml-4 ">
                            <Search className="text-gray-400 mr-3" size={20} />
                            <input
                                type="text"
                                placeholder="Search by ticket ID, title, resident, apartment..."
                                className="w-full outline-none"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ml-4">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="rounded-xl px-4 py-3 bg-white shadow-sm cursor-pointer"
                            >
                                <option value="">All Statuses</option>
                                <option value="Open">Open</option>
                                <option value="Assigned">Assigned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                                <option value="Reopened">Reopened</option>
                            </select>

                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="rounded-xl px-4 py-3 bg-white shadow-sm cursor-pointer"
                            >
                                <option value="">All Priorities</option>
                                <option value="Urgent">Urgent</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>

                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="rounded-xl px-4 py-3 bg-white shadow-sm cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                <option value="HVAC">HVAC</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Security">Security</option>
                                <option value="Pest Control">Pest Control</option>
                                <option value="General Maintenance">General Maintenance</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Show filtered info & Clear filters */}
                        {(searchText || statusFilter || priorityFilter || categoryFilter) && (
                            <div className="flex items-center mt-4 ml-4 gap-2">
                                <span className="text-gray-600">
                                    <Funnel className="inline-block mr-2" size={18} />
                                    Showing {filteredTickets.length} of {tickets.length} tickets
                                </span>
                                <button
                                    className="font-semibold hover:underline"
                                    onClick={() => {
                                        setSearchText("");
                                        setStatusFilter("");
                                        setPriorityFilter("");
                                        setCategoryFilter("");
                                    }}
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}


                        {/* Tickets */}
                        <div className="flex flex-col gap-6 mt-6 ml-4">
                            {filteredTickets.length > 0 ? (
                                filteredTickets.map(ticket => <TicketCard key={ticket.ticketId} ticket={ticket} />)
                            ) : (
                                <div className="text-gray-300 p-6 border border-gray-200 rounded-xl flex flex-col items-center justify-center">
                                    <Ticket className="mb-4" size={60} />
                                    <p className="text-lg text-gray-500 text-center">
                                        No tickets found matching your criteria
                                    </p>
                                </div>

                            )}
                        </div>

                    </div>
                </>
            )}

            {activeTab === "reports" && (
                <ReportsAnalytics />
            )}
        </>
    );
}
