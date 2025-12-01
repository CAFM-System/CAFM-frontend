import { useState, useEffect } from "react";
import DashboardCard from "../common/DashboardCard";
import { Clock, TrendingUp, CircleAlert, Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { tickets } from "../../services/newTicketData.js";

const ReportsAnalytics = () => {
    const [totalTickets, setTotalTickets] = useState(0);
    const [resolutionRate, setResolutionRate] = useState("0 %");
    const [avgResolutionTime, setAvgResolutionTime] = useState(0);
    const [avgCSATRating, setAvgCSATRating] = useState("0.0/5.0");

    const [barGraphByStatusData, setBarGraphByStatusData] = useState([
        { status: 'Open', count: 0 },
        { status: 'Assigned', count: 0 },
        { status: 'In Progress', count: 0 },
        { status: 'Resolved', count: 0 },
        { status: 'Closed', count: 0 },
    ]);

    // Calculate the summary data
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
                const diffHours = diffMs / (1000 * 60 * 60);
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

    const getProgressString = (string) => {
        string = string.split('_');
        let newString = "";
        string.map((word, index) => {
            newString += word.substring(0, 1).toUpperCase() + word.substring(1) + ' ';
        })

        return newString;
    }

    useEffect(() => {
        const statusCounts = {
            open: 0,
            assigned: 0,
            in_progress: 0,
            resolved: 0,
            closed: 0,
        };

        tickets.forEach(ticket => {
            if (statusCounts.hasOwnProperty(ticket.status)) {
                statusCounts[ticket.status]++;
            }
        });

        const barData = Object.keys(statusCounts).map(status => ({
            status: getProgressString(status).trim(),
            count: statusCounts[status],
        }));

        setBarGraphByStatusData(barData);
    }, []);

    const BarChartToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                        <p className="font-semibold text-gray-800">{payload[0].payload.status}</p>
                        <p className="text-gray-600">Count: {payload[0].value}</p>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            {/* Summary Cards */}
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
                        className="shadow-sm inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Download size={16} />
                        Export as CSV
                    </button>
                    <button
                        className="shadow-sm inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Download size={16} />
                        Export as PDF
                    </button>
                </div>
            </div>

            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 pl-6 pr-6 gap-6 m-6">

                {/* Bar Graphs */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Tickets by Status</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barGraphByStatusData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis
                                dataKey="status"
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                axisLine={{ stroke: '#E5E7EB' }}
                            />
                            <YAxis
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                axisLine={{ stroke: '#E5E7EB' }}
                                tickCount={6}
                            />
                            <Tooltip content={<BarChartToolTip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default ReportsAnalytics;