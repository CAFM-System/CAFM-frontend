import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Calendar, UserCheck, Search, 
  Loader2, FileDown, CheckCircle2, X 
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme'; 
import { AdminVisitorTable } from './AdminVisitorTable';
import visitorService from '../../services/visitor.service';
import ReportService from '../../services/report.service';
import toast from 'react-hot-toast';
import downloadBlob from '../../../util/downloadFile.js';

export default function TotalVisitorRecords() {
  const theme = useTheme();
  const { isDarkMode } = theme;

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [testNotification, setTestNotification] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  
  useEffect(() => {

  const fetchVisitors = async () => {
    try {

      setLoading(true);

      const response = await visitorService.getVisitorInfo();

      // axios usually returns data inside response.data
      const data = response.data;

      setVisitors(data);

    } catch (error) {

      console.error("Failed to fetch visitors:", error);

    } finally {

      setLoading(false);

    }
  };

  fetchVisitors();

  }, []);

  const downloadExcel = async () => {
    try {
      const blob = await ReportService.downloadVisitorExcel();
      downloadBlob(blob, 'visitors-report.xlsx');
      toast.success("Excel report downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download Excel report.");
    }
  }

  const downloadPDF = async () => {
    try {
      const blob = await ReportService.downloadVisitorPDF();
      downloadBlob(blob, 'visitors-report.pdf');
      toast.success("PDF report downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download PDF report.");
    }
  }

  const filteredVisitors = useMemo(() => {
    return visitors.filter(v => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
  (v.name?.toLowerCase().includes(query) || false) ||
  (v.hostName?.toLowerCase().includes(query) || false) ||
  (String(v.id).toLowerCase().includes(query));

      const isCheckedIn = !!v.entryTime;
      const matchesStatus = statusFilter === 'All Status' || 
                           (statusFilter === 'Checked In' && isCheckedIn) || 
                           (statusFilter === 'Pending Entry' && !isCheckedIn);

      const vDate = new Date(v.visitDate || v.dateFrom);
      const start = dateFrom ? new Date(dateFrom) : null;
      const end = dateTo ? new Date(dateTo) : null;
      
      let matchesDate = true;
      if (start && vDate < start) matchesDate = false;
      if (end && vDate > end) matchesDate = false;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [visitors, searchQuery, statusFilter, dateFrom, dateTo]);

  const stats = {
    total: filteredVisitors.length,
    preReg: filteredVisitors.filter(v => v.isPreRegistered == true).length,
    onSite: filteredVisitors.filter(v => v.isPreRegistered == false).length
  };

  // --- MOCK NOTIFICATION HANDLER ---
  const triggerNotification = (format) => {
    setTestNotification(`Successfully generated ${format} for ${filteredVisitors.length} records.`);
    setTimeout(() => setTestNotification(null), 4000); // Auto-hide after 4 seconds
  };

  if (loading) return (
    <div className={`flex h-[60vh] flex-col items-center justify-center ${theme.bg}`}>
      <Loader2 className="animate-spin text-yellow-500 mb-4" size={40} />
      <p className={theme.subText}>Synchronizing Ledger...</p>
    </div>
  );

  return (
    <div className={`p-6 space-y-8 transition-colors duration-300 relative ${theme.bg}`}>
      
      {/* --- TEST NOTIFICATION POPUP --- */}
      {testNotification && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl ${isDarkMode ? "bg-zinc-900 border-yellow-500/50 text-white" : "bg-white border-yellow-500 text-slate-800"}`}>
            <CheckCircle2 className="text-emerald-500" size={20} />
            <span className="text-sm font-medium">{testNotification}</span>
            <button onClick={() => setTestNotification(null)} className="ml-2 opacity-50 hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* --- DASHBOARD STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
        <DashboardCard title="Total Results" value={stats.total} description="Filtered entries" icon={<Users size={20}/>} isDarkMode={isDarkMode} accentColor="text-yellow-500" bgColor="bg-yellow-500/10" />
        <DashboardCard title="Pre-registered" value={stats.preReg} description="In range" icon={<Calendar size={20}/>} isDarkMode={isDarkMode} accentColor="text-blue-500" bgColor="bg-blue-500/10" />
        <DashboardCard title="On-Site Registered" value={stats.onSite} description="Manual entries" icon={<UserCheck size={20}/>} isDarkMode={isDarkMode} accentColor="text-emerald-500" bgColor="bg-emerald-500/10" />
      </div>

      {/* --- FILTERS & EXPORTS --- */}
      <div className={`p-6 rounded-xl border space-y-6 transition-all ${theme.cardBg} ${theme.border}`}>
        <div className="flex justify-between items-center">
            <h3 className={`text-sm font-bold uppercase tracking-widest ${theme.text}`}>Ledger Filter</h3>
            <button onClick={() => {setSearchQuery(''); setDateFrom(''); setDateTo(''); setStatusFilter('All Status');}} className="text-[10px] font-bold text-yellow-500 uppercase hover:underline">Reset</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-2">
            <span className={`text-[10px] uppercase font-bold block ${theme.subText}`}>Search</span>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.subText}`} size={16} />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-yellow-500 transition-all ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} placeholder="Name, Unit, or ID..." />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <span className={`text-[10px] uppercase font-bold block ${theme.subText}`}>From</span>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200"}`} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <span className={`text-[10px] uppercase font-bold block ${theme.subText}`}>To</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200"}`} />
          </div>
          <div className="md:col-span-4 space-y-2">
             <span className={`text-[10px] uppercase font-bold block ${theme.subText}`}>Status</span>
             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-yellow-500 ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200"}`}>
                <option>All Status</option>
                <option>Checked In</option>
                <option>Pending Entry</option>
             </select>
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-gray-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className={`text-xs font-medium ${theme.subText}`}>Matches: {filteredVisitors.length}</p>
            <div className="flex gap-3">
              <button onClick={downloadExcel} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-50"}`}><FileDown size={16} className="text-emerald-500" /> Excel</button>
              <button onClick={downloadPDF} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-50"}`}><FileDown size={16} className="text-red-500" /> PDF</button>
            </div>
        </div>
      </div>

      {/* --- LIST --- */}
      <AdminVisitorTable visitors={filteredVisitors} isDarkMode={isDarkMode} />
    </div>
  );
}

function DashboardCard({ title, value, description, icon, accentColor, bgColor, isDarkMode }) {
  return (
    <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-[#111111] border-white/5" : "bg-white border-gray-100 shadow-sm"}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bgColor} ${accentColor}`}>{icon}</div>
        <span className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{value}</span>
      </div>
      <p className={`text-[10px] uppercase font-semibold tracking-widest mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{title}</p>
      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{description}</p>
    </div>
  );
}