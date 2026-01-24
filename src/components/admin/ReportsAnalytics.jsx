import { useState, useEffect } from "react";
import DashboardCard from "../admin/AdminDashboardCard.jsx";
import { Clock, TrendingUp, CircleAlert, Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import downloadBlob from "../../../util/downloadFile.js";
import ReportService from "../../services/report.service.js";
import toast from "react-hot-toast";
import { useTheme } from "../../hooks/useTheme"; 

const ReportsAnalytics = (data) => {
    //  Use theme hook
    const { isDarkMode } = useTheme();

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

    // Theme-aware classes
    const cardBg = isDarkMode
        ? "bg-secondary/50 border-primary/10"
        : "bg-white border-gray-200";

    const headingColor = isDarkMode ? "text-primary" : "text-gray-900";
    const subTextColor = isDarkMode ? "text-primary/70" : "text-gray-600";
    const labelColor = isDarkMode ? "text-primary/80" : "text-gray-700";
    
    const inputBg = isDarkMode
        ? "bg-secondary/30 border-primary/20 text-primary"
        : "bg-white border-gray-300 text-gray-900";

    const buttonBg = isDarkMode
        ? "bg-secondary/30 border-primary/20 text-primary hover:bg-primary/10"
        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-200";

    // Chart colors for dark mode
    const chartGridColor = isDarkMode ? "#FCF9EA20" : "#E5E7EB";
    const chartTextColor = isDarkMode ? "#FCF9EA" : "#6B7280";
    const barColor = isDarkMode ? "#F0A500" : "#3B82F6";

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
                <div className={`rounded-lg shadow-lg p-3 border ${cardBg}`}>
                    <p className={`font-semibold ${headingColor}`}>{payload[0].payload.status}</p>
                    <p className={subTextColor}>Count: {payload[0].value}</p>
                </div>
            );
        }
    };

    const PieChartToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`rounded-lg shadow-lg p-3 border ${cardBg}`}>
                    <p className={`font-semibold ${headingColor}`}>{payload[0].payload.jobType}</p>
                    <p className={subTextColor}>{payload[0].value}%</p>
                </div>
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

            {/* Filter UI */}
            <div className={`rounded-lg shadow-sm border p-6 m-6 ${cardBg}`}>
                <h2 className={`text-lg font-semibold mb-4 ${headingColor}`}>
                    Report Filters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className={`text-sm font-medium ${labelColor}`}>Group By</label>
                        <select
                            value={filters.by}
                            onChange={(e) => setFilters({ ...filters, by: e.target.value })}
                            className={`w-full border rounded px-3 py-2 ${inputBg}`}
                        >
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                    </div>

                    <div>
                        <label className={`text-sm font-medium ${labelColor}`}>Year</label>
                        <input
                            type="number"
                            value={filters.year}
                            onChange={(e) => setFilters({ ...filters, year: Number(e.target.value) })}
                            className={`w-full border rounded px-3 py-2 ${inputBg}`}
                        />
                    </div>

                    {filters.by === "month" && (
                        <div>
                            <label className={`text-sm font-medium ${labelColor}`}>Month</label>
                            <select
                                value={filters.month}
                                onChange={(e) => setFilters({ ...filters, month: Number(e.target.value) })}
                                className={`w-full border rounded px-3 py-2 ${inputBg}`}
                            >
                                <option value={0}>Select Month</option>
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className={`text-sm font-medium ${labelColor}`}>Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className={`w-full border rounded px-3 py-2 ${inputBg}`}
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

            {/* Export functions */}
            <div className={`rounded-lg shadow-sm border p-6 m-6 ${cardBg}`}>
                <h2 className={`text-xl font-semibold mb-2 ${headingColor}`}>Export Reports</h2>
                <p className={`text-sm mb-6 ${subTextColor}`}>Download data for external analysis</p>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => handleExcelDownload()}
                        className={`shadow-sm inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${buttonBg}`}
                    >
                        <Download size={16} />
                        Export as Excel
                    </button>
                    <button
                        onClick={() => handlePDFDownload()}
                        className={`shadow-sm inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${buttonBg}`}
                    >
                        <Download size={16} />
                        Export as PDF
                    </button>
                </div>
            </div>

            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 pl-6 pr-6 gap-6 m-6">
                {/* Bar Chart */}
                <div className={`rounded-lg shadow-md p-6 border ${cardBg}`}>
                    <h2 className={`text-xl font-semibold mb-6 ${headingColor}`}>Tickets by Status</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barGraphByStatusData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                            <XAxis
                                dataKey="status"
                                tick={{ fill: chartTextColor, fontSize: 12 }}
                                axisLine={{ stroke: chartGridColor }}
                            />
                            <YAxis
                                tick={{ fill: chartTextColor, fontSize: 12 }}
                                axisLine={{ stroke: chartGridColor }}
                                tickCount={6}
                            />
                            <Tooltip content={<BarChartToolTip />} cursor={{ fill: 'rgba(240, 165, 0, 0.1)' }} />
                            <Bar dataKey="count" fill={barColor} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className={`rounded-lg shadow-md p-6 border ${cardBg}`}>
                    <h2 className={`text-xl font-semibold mb-6 ${headingColor}`}>Tickets by Job Type</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartByJobTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ jobType, percentage }) => `${jobType}: ${percentage}%`}
                                outerRadius={100}
                                fill={barColor}
                                dataKey="percentage"
                                nameKey="jobType"
                            >
                                {pieChartByJobTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`hsl(${(index / pieChartByJobTypeData.length) * 360}, 70%, 50%)`} />
                                ))}
                            </Pie>
                            <Tooltip content={<PieChartToolTip />} cursor={{ fill: 'rgba(240, 165, 0, 0.1)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default ReportsAnalytics;