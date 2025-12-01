import { useState, useEffect } from "react";
import DashboardCard from "../common/DashboardCard";
import { Clock, TrendingUp, CircleAlert, Download } from "lucide-react";

import { tickets } from "../../services/newTicketData.js";

const ReportsAnalytics = () => {
    const [totalTickets, setTotalTickets] = useState(0);
    const [resolutionRate, setResolutionRate] = useState("0 %");
    const [avgResolutionTime, setAvgResolutionTime] = useState(0);
    const [avgCSATRating, setAvgCSATRating] = useState("0.0/5.0");

    useEffect(() => {
        const total = tickets.length;

        const resolvedTickets = tickets.filter(
            (ticket) => ticket.status === "resolved" || ticket.status === "closed"
        ).length;

        const resolutionRateCalc = total
            ? ((resolvedTickets / total) * 100).toFixed(2) + " %"
            : "0 %";

        const totalResolutionTime = tickets.reduce((acc, ticket) => {
            if (ticket.completedDate && ticket.createdDate) {
                const created = new Date(ticket.createdDate);
                const completed = new Date(ticket.completedDate);
                const diffMs = completed - created;
                const diffHours = diffMs / (1000 * 60 * 60); // convert ms to hours
                return acc + diffHours;
            }
            return acc;
        }, 0);
        const avgResolution = resolvedTickets
            ? Math.round(totalResolutionTime / resolvedTickets)
            : 0;

        const totalCSAT = tickets.reduce((acc, ticket) => {
            return acc + (ticket.csat || 0);
        }, 0);

        const totalRatedTickets = tickets.filter(ticket => ticket.csat !== null).length;

        const avgCSAT = totalRatedTickets
            ? (totalCSAT / totalRatedTickets).toFixed(1) + "/5.0"
            : "0.0/5.0";

        setTotalTickets(total);
        setResolutionRate(resolutionRateCalc);
        setAvgResolutionTime(avgResolution);
        setAvgCSATRating(avgCSAT);
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4 sm:px-6">
                <DashboardCard
                    title="Total Tickets"
                    value={totalTickets}
                    icon={<TrendingUp />}
                    onClick={() => console.log("Clicked Completed Tasks")}
                />
                <DashboardCard
                    title="Resolution Rate"
                    value={resolutionRate}
                    icon={<CircleAlert className="text-green-500" />}
                    onClick={() => console.log("Clicked Pending Issues")}
                    className="bg-blue-50"
                />
                <DashboardCard
                    title="Avg Resolution Time"
                    value={avgResolutionTime}
                    icon={<Clock className="text-orange-500" />}
                    onClick={() => console.log("Clicked Pending Issues")}
                    className="bg-blue-50"
                />
                <DashboardCard
                    title="Avg CSAT Rating"
                    value={avgCSATRating}
                    icon={<TrendingUp className="text-yellow-500" />}
                    onClick={() => console.log("Clicked Pending Issues")}
                    className="bg-blue-50"
                />
            </div>

            {/* Export functions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 m-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Export Reports</h2>
                <p className="text-gray-600 text-sm mb-6">Download data for external analysis</p>

                <div className="flex flex-wrap gap-3">
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Download size={16} />
                        Export as CSV
                    </button>
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Download size={16} />
                        Export as PDF
                    </button>
                </div>


            </div>
        </>
    );
};

export default ReportsAnalytics;