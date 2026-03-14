import React from 'react';
import { 
  Phone, Mail, CreditCard, Car, Users, 
  Clock, AlertCircle, CalendarDays, Edit3, Trash2 
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function VisitorRecordForResident({ visitor, isSelected, onSelect, onEdit, onDelete }) {
  const { isDarkMode } = useTheme();
  
  const isRegular = visitor.visitorType === 'regular';
  const isCheckedIn = !!visitor.entryTime; 

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer group
        ${isDarkMode 
          ? "bg-[#18181B] border-white/10 hover:border-[#EAB308]/50" 
          : "bg-white border-gray-200 hover:border-[#EAB308]/50 hover:shadow-md"
        }
        ${isSelected ? 'ring-2 ring-[#EAB308]' : ''}
      `}
    >
      <div className="p-5">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-sm shrink-0
              ${isDarkMode ? "bg-[#EAB308] text-black" : "bg-[#EAB308] text-white"}`}>
              {visitor.fullName ? visitor.fullName.charAt(0).toUpperCase() : '?'}
            </div>
            
            <div>
              <h3 className={`text-lg font-bold leading-none mb-2 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                {visitor.fullName}
              </h3>
              {/* This was causing the error - definition added below */}
              <Badge isDarkMode={isDarkMode} variant={isRegular ? "purple" : "blue"} icon={isRegular ? CalendarDays : null}>
                 {isRegular ? "Regular Guest" : "One-time Visit"}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
             {isRegular ? (
               <>
                 <DatePill label="From" date={visitor.dateFrom} isDarkMode={isDarkMode} />
                 <DatePill label="To" date={visitor.dateTo} isDarkMode={isDarkMode} />
               </>
             ) : (
               <DatePill label="Visit" date={visitor.visitDate || visitor.date} isDarkMode={isDarkMode} />
             )}
          </div>
        </div>

        {/* --- BODY --- */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-t border-dashed ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
          <div className="space-y-3">
             <SectionLabel label="Contact Details" isDarkMode={isDarkMode} />
             <div className="grid grid-cols-1 gap-2">
                <InfoRow icon={Phone} text={visitor.phone || "No Contact"} isDarkMode={isDarkMode} />
                <InfoRow icon={Mail} text={visitor.email || "No Email"} isDarkMode={isDarkMode} />
                <InfoRow icon={CreditCard} text={visitor.idNumber || visitor.nic || "--"} isDarkMode={isDarkMode} />
             </div>
          </div>

          <div className="space-y-3 md:pl-6 md:border-l md:border-dashed md:border-white/10 relative">
             <SectionLabel label="Visit Logistics" isDarkMode={isDarkMode} />
             <div className="grid grid-cols-1 gap-2">
                <InfoRow icon={Car} text={visitor.vehicleNumber || "No Vehicle"} isDarkMode={isDarkMode} />
                
                <div className="absolute bottom-0 right-0">
                   {visitor.numberOfOthers > 0 && (
                     <div className={`flex items-center gap-2 px-3 py-1 rounded-lg font-bold text-sm
                       ${isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                       <Users size={16} />
                       <span>+{visitor.numberOfOthers}</span>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className={`flex items-center justify-between pt-3 border-t ${isDarkMode ? "border-white/10" : "border-gray-100"}`}>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium 
              ${isCheckedIn ? "bg-blue-500/10 text-blue-400" : "bg-orange-500/10 text-orange-500"}`}>
              {isCheckedIn ? <Clock size={12} /> : <AlertCircle size={12} />}
              <span>{isCheckedIn ? `Arrived at: ${visitor.entryTime}` : `Pending Arrival`}</span>
            </div>

            {!isCheckedIn && (
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(visitor); }}
                  className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation();  onDelete(visitor.visitorId);; }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

/** * SUB-COMPONENTS 
 * Defined here so they are accessible to the main component
 */

function Badge({ children, isDarkMode, variant = "blue", icon: Icon }) {
  const styles = {
    blue: isDarkMode ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-600 border-blue-100",
    purple: isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-purple-50 text-purple-600 border-purple-100"
  };
    
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${styles[variant]}`}>
      {Icon && <Icon size={10} />}
      {children}
    </span>
  );
}

function DatePill({ label, date, isDarkMode }) {
  if (!date) return null;
  const d = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm
      ${isDarkMode ? "bg-white/5 border-white/10 text-gray-300" : "bg-white border-gray-200 text-gray-600"}`}>
      <span className="text-xs opacity-60">{label}:</span>
      <span className={`font-bold ${isDarkMode ? "text-[#EAB308]" : "text-[#1e293b]"}`}>{d}</span>
    </div>
  );
}

function SectionLabel({ label, isDarkMode }) {
  return <div className={`text-[10px] uppercase font-black tracking-widest mb-2 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>{label}</div>;
}

function InfoRow({ icon: Icon, text, isDarkMode }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon size={14} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
      <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-zinc-700"}`}>{text}</span>
    </div>
  );
}