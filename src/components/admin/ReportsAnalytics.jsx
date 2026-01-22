import { useState, useEffect } from "react";
import DashboardCard from "../admin/AdminDashboardCard.jsx";
import { Clock, TrendingUp, CircleAlert, Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//import { tickets } from "../../services/newTicketData.js";
//import exportTicketsToCSV from "../../services/ExportCSV.js";
import downloadBlob from "../../../util/downloadFile.js";
import ReportService from "../../services/report.service.js";
import toast from "react-hot-toast";

const ReportsAnalytics = (data) => {
    const [totalTickets, setTotalTickets] = useState(0);
    const [resolutionRate, setResolutionRate] = useState("0 %");
    const [avgResolutionTime, setAvgResolutionTime] = useState(0);
    const [avgCSATRating, setAvgCSATRating] = useState("0.0/5.0");
    const [resolvedTickets, setResolvedTickets] = useState(0);

    const [barGraphByStatusData, setBarGraphByStatusData] = useState([
        { status: 'Open', count: 0 },
        { status: 'Assigned', count: 0 },
        { status: 'In Progress', count: 0 },
        { status: 'Resolved', count: 0 },
        { status: 'Closed', count: 0 },
    ]);

    const [pieChartByJobTypeData, setPieChartByJobTypeData] = useState([]);
    const [filters, setFilters] = useState({
        by: "month",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        status: "all",
    });
    const tickets = data.data || [];

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
        setResolvedTickets(resolvedTickets);
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

    useEffect(() => {
        const jobTypeCounts = {};
        tickets.forEach(ticket => {
            const jobType = ticket.job_type || 'Other';
            if (jobTypeCounts[jobType]) {
                jobTypeCounts[jobType]++;
            } else {
                jobTypeCounts[jobType] = 1;
            }
        });

        const totalTickets = tickets.length;
        const pieData = Object.keys(jobTypeCounts).map(jobType => ({
            jobType: jobType,
            percentage: parseFloat(((jobTypeCounts[jobType] / totalTickets) * 100).toFixed(2)),
        }));

        setPieChartByJobTypeData(pieData);
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

    const PieChartToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                        <p className="font-semibold text-gray-800">{payload[0].payload.jobType}</p>
                        <p className="text-gray-600">{payload[0].value}%</p>
                    </div>
                </>
            );
        }
    };

    const handlePDFDownload = async () => {
        try {
            const blob = await ReportService.downloadTicketPDF(filters);
            downloadBlob(blob, "tickets-report.pdf");
            toast.success("PDF downloaded successfully");
        } catch (error) {
            console.error(error);
            console.warn("PDF handled by browser download manager");
            toast.error("Failed to download PDF");
        }
    };

    const handleExcelDownload = async () => {
        try {
            const blob = await ReportService.downloadTicketExcel(filters);
            downloadBlob(blob, "tickets-report.xlsx");
            toast.success("Excel downloaded successfully");
        } catch (error) {
            console.error(error);
            console.warn("Excel handled by browser download manager");
            toast.error("Failed to download Excel");
        }
    };


    return (
        <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4 sm:px-6">
                <DashboardCard
                    title="Total Tickets"
                    value={totalTickets}
                    icon={<TrendingUp size={30} />}
                    description="All time"
                    accentColor="bg-yellow-500"
                    iconBgColor="bg-yellow-50"
                    iconColor="text-yellow-500"
                />
                <DashboardCard
                    title="Resolution Rate"
                    value={resolutionRate}
                    icon={<CircleAlert size={30} />}
                    description={resolvedTickets + " resolved"}
                    accentColor="bg-green-500"
                    iconBgColor="bg-green-50"
                    iconColor="text-green-500"
                />
                <DashboardCard
                    title="Avg Resolution Time"
                    value={avgResolutionTime}
                    icon={<Clock size={30} />}
                    accentColor="bg-blue-500"
                    iconBgColor="bg-blue-50"
                    iconColor="text-blue-500"
                    description="hours"
                />
                <DashboardCard
                    title="Avg CSAT Rating"
                    value={avgCSATRating}
                    icon={<TrendingUp size={30} />}
                    description="Customer Satisfaction"
                    accentColor="bg-red-500"
                    iconBgColor="bg-red-50"
                    iconColor="text-red-500"
                />
            </div>
            {/* 🔽 ADD FILTER UI HERE 🔽 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 m-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Report Filters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* By */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Group By</label>
                        <select
                            value={filters.by}
                            onChange={(e) =>
                                setFilters({ ...filters, by: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                    </div>

                    {/* Year */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Year</label>
                        <input
                            type="number"
                            value={filters.year}
                            onChange={(e) =>
                                setFilters({ ...filters, year: Number(e.target.value) })
                            }
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Month */}
                    {filters.by === "month" && (
                        <div>
                            <label className="text-sm font-medium text-gray-700">Month</label>
                            <select
                                value={filters.month}
                                onChange={(e) =>
                                    setFilters({ ...filters, month: Number(e.target.value) })
                                }
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value={0}>Select Month</option>
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString("default", {
                                            month: "long"
                                        })}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Status */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) =>
                                setFilters({ ...filters, status: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="assigned">Assigned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                </div>
            </div>
            {/* 🔼 FILTER UI ENDS HERE 🔼 */}

            {/* Export functions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 m-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Export Reports</h2>
                <p className="text-gray-600 text-sm mb-6">Download data for external analysis</p>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => handleExcelDownload()}
                        className="shadow-sm inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Download size={16} />
                        Export as Excel
                    </button>
                    <button
                        onClick={() => handlePDFDownload()}
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

                {/* Pie Charts */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Tickets by Job Type</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartByJobTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ jobType, percentage }) => `${jobType}: ${percentage}%`}
                                outerRadius={100}
                                fill="#3B82F6"
                                dataKey="percentage"
                                nameKey="jobType"
                            >
                                {pieChartByJobTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`hsl(${(index / pieChartByJobTypeData.length) * 360}, 70%, 50%)`} />
                                ))}
                            </Pie>
                            <Tooltip content={<PieChartToolTip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default ReportsAnalytics;