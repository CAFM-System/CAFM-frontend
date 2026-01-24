import { useEffect, useState } from "react";
import AdminDashboardHeader from "../../components/admin/AdminDashboardHeader";
import AdminDashboardCard from "../../components/admin/AdminDashboardCard";
import { Ticket, Clock4, CheckCircle, AlertTriangle, Search, Funnel } from "lucide-react";
import TicketCard from "../../components/common/ticketCard";
import ReportsAnalytics from "../../components/admin/ReportsAnalytics";
import TicketDetails from "../../components/admin/TicketDetails";
import TicketService from "../../services/ticket.service";
import { useTheme } from "../../hooks/useTheme"; // 👈 ADDED

export default function AdminDashboard() {
    // 👇 ADDED: Use theme hook
    const theme = useTheme();
    const { isDarkMode } = theme;

    // Tickets state
    const [ticketList, setTicketList] = useState([]);
    // UI state
    const [activeTab, setActiveTab] = useState("overview");
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // For opening TicketDetails
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isTicketOpen, setIsTicketOpen] = useState(false);

    useEffect(
        () => {
            try {
                if (isLoading) {
                    TicketService.getTicket().then(
                        (response) => {
                            console.log(response.data.tickets);
                            setTicketList(response.data.tickets);
                            setIsLoading(false);
                        }
                    )
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        }, [isLoading]);

    const openTicketDetails = (ticket) => {
        setSelectedTicket(ticket);
        setIsTicketOpen(true);
    };

    // Derived lists
    const urgentTickets = ticketList.filter(t => (t.priority || "").toLowerCase() === "urgent");
    const activeTickets = ticketList.filter(t => {
        const s = (t.status || "").toLowerCase();
        return s === "open" || s === "in_progress" || s === "in progress";
    });
    const resolvedTickets = ticketList.filter(t => (t.status || "").toLowerCase() === "resolved");
    const unassignedTickets = ticketList.filter(t => !t.name || t.name === "");
    const totalTickets = ticketList.length;

    const filteredTickets = ticketList.filter(ticket => {
        const q = searchText.toLowerCase();
        const searchMatch =
            (ticket.ticketId || "").toLowerCase().includes(q) ||
            (ticket.title || "").toLowerCase().includes(q) ||
            (ticket.name || "").toLowerCase().includes(q) ||
            (ticket.location || "").toLowerCase().includes(q);

        const statusMatch = statusFilter === "" || (ticket.status || "").toLowerCase() === statusFilter.toLowerCase();
        const priorityMatch = priorityFilter === "" || (ticket.priority || "").toLowerCase() === priorityFilter.toLowerCase();
        const categoryMatch = categoryFilter === "" || (ticket.job_type || "").toLowerCase() === categoryFilter.toLowerCase();

        return searchMatch && statusMatch && priorityMatch && categoryMatch;
    });

    return (
        // 👇 ADDED: Theme-aware background
        <div className={`min-h-screen transition-colors duration-300 ${theme.bg}`}>
            <AdminDashboardHeader
                title="Admin Dashboard"
                name="Admin User"
                department="administration"
            />

            {/* Tabs */}
            <div className={`flex gap-6 border-b px-4 sm:px-6 mt-10 overflow-x-auto whitespace-nowrap sm:justify-start ${theme.border}`}>
                {["overview", "all", "reports"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 font-medium transition-colors ${activeTab === tab
                            ? "text-accent border-b-2 border-accent"
                            : isDarkMode ? "text-primary/60 hover:text-primary" : "text-gray-600 hover:text-gray-800"
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
                        <AdminDashboardCard
                            title="Total Tickets"
                            value={totalTickets}
                            icon={<Ticket size={25} />}
                            description="All tickets"
                            accentColor="bg-yellow-500"
                            iconBgColor= "bg-yellow-50"
                            iconColor="text-yellow-500"
                            onClick={() => console.log("Clicked Completed Tasks")}
                        />
                        <AdminDashboardCard
                            title="Active Tickets"
                            value={activeTickets.length}
                            icon={<Clock4 size={25} />}
                            description="In progress"
                            accentColor="bg-green-500"
                            iconBgColor="bg-green-50"
                            iconColor="text-green-500"
                            onClick={() => console.log("Clicked Pending Issues")}
                            
                        />
                        <AdminDashboardCard
                            title="Resolved"
                            value={resolvedTickets.length}
                            icon={<CheckCircle size={25} />}
                            description="Awaiting closure"
                            accentColor="bg-blue-500"
                            iconBgColor="bg-blue-50"
                            iconColor="text-blue-500"
                            onClick={() => console.log("Clicked Pending Issues")}
                           
                        />
                        <AdminDashboardCard
                            title="Urgent"
                            value={urgentTickets.length}
                            icon={<AlertTriangle size={25} />}
                            description="Needs attention"
                            accentColor="bg-red-500"
                            iconBgColor="bg-red-50"
                            iconColor="text-red-500"
                            onClick={() => console.log("Clicked Pending Issues")}
                        
                        />
                    </div>

                    {/* Urgent Tickets Section */}
                    {urgentTickets.length > 0 && (
                        <div className="mt-8 px-4 sm:px-6">
                            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                                Urgent Tickets
                            </h2>

                            <div className="flex flex-col gap-6">
                                {urgentTickets.map(ticket => (
                                    <TicketCard
                                        key={ticket.ticket_id}
                                        ticket={ticket}
                                        onClick={() => openTicketDetails(ticket)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 px-4 sm:px-6">
                        <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
                            Unassigned Tickets
                        </h2>

                        <div className="flex flex-col gap-6 mb-4">
                            {unassignedTickets.length > 0
                                ? unassignedTickets.map(ticket => (
                                    <TicketCard
                                        key={ticket.ticket_Id}
                                        ticket={ticket}
                                        onClick={() => openTicketDetails(ticket)}
                                    />
                                ))
                                : (
                                    <div className={`w-full h-[250px] border rounded-2xl p-4 mb-4 flex flex-col items-center justify-center ${theme.cardBg}`}>
                                        <CheckCircle className="text-green-300 mb-4" size={60} />
                                        <p className={`text-lg ${theme.subText}`}>All tickets are assigned!</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </>
            )}

            {activeTab === "all" && (
                <>
                    <div className="w-full space-y-4 mt-8">
                        {/* Search */}
                        <div className={`flex items-center rounded-xl px-4 py-2 shadow-sm transition-all focus-within:border-3 focus-within:ring-2 focus-within:ring-accent ml-4 ${theme.cardBg}`}>
                            <Search className={`mr-3 ${theme.subText}`} size={20} />
                            <input
                                type="text"
                                placeholder="Search by ticket ID, title, resident, apartment..."
                                className={`w-full outline-none bg-transparent ${theme.text} placeholder:${theme.subText}`}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ml-4">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className={`rounded-xl px-4 py-3 shadow-sm cursor-pointer ${theme.cardBg} ${theme.text}`}
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
                                className={`rounded-xl px-4 py-3 shadow-sm cursor-pointer ${theme.cardBg} ${theme.text}`}
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
                                className={`rounded-xl px-4 py-3 shadow-sm cursor-pointer ${theme.cardBg} ${theme.text}`}
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
                                <span className={theme.subText}>
                                    <Funnel className="inline-block mr-2" size={18} />
                                    Showing {filteredTickets.length} of {ticketList.length} tickets
                                </span>
                                <button
                                    className="text-accent font-semibold hover:underline"
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
                                filteredTickets.map(ticket => (
                                    <TicketCard
                                        key={ticket.ticketId}
                                        ticket={ticket}
                                        onClick={() => openTicketDetails(ticket)}
                                    />
                                ))
                            ) : (
                                <div className={`p-6 border rounded-xl flex flex-col items-center justify-center ${theme.cardBg}`}>
                                    <Ticket className={`mb-4 ${theme.subText}`} size={60} />
                                    <p className={`text-lg text-center ${theme.subText}`}>
                                        No tickets found matching your criteria
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {activeTab === "reports" && (
                <ReportsAnalytics data={ticketList} />
            )}

            {/* Ticket Details Popup*/}
            {isTicketOpen && (
                <TicketDetails
                    data={selectedTicket}
                    onClose={() => setIsTicketOpen(false)}
                    refreshTickets={() => setIsLoading(true)}
                />
            )}
        </div>
    );
}