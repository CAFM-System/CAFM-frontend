import React, { useState } from 'react';
import { 
  Phone, Mail, CreditCard, Car, Users, 
  Clock, AlertCircle, CalendarDays, Home, ShieldCheck,
  ChevronDown, ChevronUp
} from 'lucide-react';

export function AdminVisitorCard({ visitor, isSelected, onSelect, isDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isRegular = visitor.visitorType === 'regular';
  const isPreRegistered = visitor.registrationType === 'pre_registered';
  const isCheckedIn = !!visitor.entryTime;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={handleToggle}
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer group
        ${isDarkMode 
          ? "bg-[#111111] border-white/5 hover:border-yellow-500/20" 
          : "bg-white border-gray-100 hover:border-yellow-500/20 hover:shadow-md"
        }
        ${isSelected ? 'ring-2 ring-yellow-500' : ''}
      `}
    >
      <div className="p-6">
        
        {/* --- COMPACT HEADER --- */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            {/* Avatar - Slightly larger, medium weight */}
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-medium text-2xl shadow-inner shrink-0
              ${isDarkMode ? "bg-yellow-500/10 text-yellow-500" : "bg-yellow-500 text-white"}`}>
              {visitor.fullName ? visitor.fullName.charAt(0).toUpperCase() : '?'}
            </div>
            
            <div className="space-y-1.5">
              <h3 className={`text-xl font-semibold leading-none ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                {visitor.fullName}
              </h3>
              <div className="flex gap-2">
                <Badge isDarkMode={isDarkMode} variant={isRegular ? "purple" : "yellow"} icon={isRegular ? CalendarDays : null}>
                   {isRegular ? "Regular Guest" : "One-time Visit"}
                </Badge>
                <Badge isDarkMode={isDarkMode} variant={isPreRegistered ? "blue" : "green"} icon={ShieldCheck}>
                   {isPreRegistered ? "Pre-Reg" : "On-Site"}
                </Badge>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Date + Status --- */}
          <div className="flex flex-col gap-3 items-end">
             <div className="space-y-1">
               {isRegular ? (
                 <div className="flex flex-col gap-1.5 items-end">
                   <DatePill label="From" date={visitor.dateFrom} isDarkMode={isDarkMode} />
                   <DatePill label="To" date={visitor.dateTo} isDarkMode={isDarkMode} />
                 </div>
               ) : (
                 <DatePill label="Visit Date" date={visitor.visitDate || visitor.date} isDarkMode={isDarkMode} />
               )}
             </div>

             <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wide border
                ${isCheckedIn 
                  ? (isDarkMode ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10" : "bg-emerald-50 text-emerald-600 border-emerald-100") 
                  : (isDarkMode ? "bg-orange-500/5 text-orange-400 border-orange-500/10" : "bg-orange-50 text-orange-600 border-orange-100")}`}>
                {isCheckedIn ? <Clock size={11} /> : <AlertCircle size={11} />}
                <span className="whitespace-nowrap">
                    {isCheckedIn ? `CheckedIn • ${visitor.entryTime}` : `Pending Entry`}
                </span>
             </div>
          </div>
        </div>

        {/* --- UNIT INFO --- */}
        <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
                    <Home className="text-yellow-500" size={18} />
                </div>
                <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Visiting Unit</p>
                    <p className={`text-base font-medium ${isDarkMode ? "text-gray-200" : "text-slate-700"}`}>
                        Apt {visitor.hostApartment} — {visitor.hostName}
                    </p>
                </div>
            </div>
            
            <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${isDarkMode ? "text-gray-600" : "text-gray-300"}`}>
                <ChevronDown size={22} />
            </div>
        </div>

        {/* --- EXPANDED DETAILS --- */}
        <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t" : "grid-rows-[0fr] opacity-0"}`}
             style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2">
              <div className="space-y-4">
                  <SectionLabel label="Credentials" isDarkMode={isDarkMode} />
                  <InfoRow icon={Phone} text={visitor.phone || "No Contact"} isDarkMode={isDarkMode} />
                  <InfoRow icon={Mail} text={visitor.email || "No Email"} isDarkMode={isDarkMode} />
                  <InfoRow icon={CreditCard} text={`ID: ${visitor.idNumber || visitor.nic || "N/A"}`} isDarkMode={isDarkMode} />
              </div>

              <div className="space-y-4 md:pl-8 md:border-l border-dashed" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <SectionLabel label="Logistics" isDarkMode={isDarkMode} />
                  <InfoRow icon={Car} text={visitor.vehicleNumber ? `Vehicle: ${visitor.vehicleNumber}` : "No Vehicle"} isDarkMode={isDarkMode} />
                  <InfoRow icon={Users} text={`${visitor.numberOfOthers || 0} Group Members`} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper Components */

function Badge({ children, isDarkMode, variant = "blue", icon: Icon }) {
  const styles = {
    blue: isDarkMode ? "bg-blue-500/10 text-blue-400 border-blue-500/10" : "bg-blue-50 text-blue-600 border-blue-100",
    purple: isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/10" : "bg-purple-50 text-purple-600 border-purple-100",
    yellow: isDarkMode ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/10" : "bg-yellow-50 text-yellow-700 border-yellow-100",
    green: isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" : "bg-emerald-50 text-emerald-600 border-emerald-100"
  };
    
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-medium uppercase tracking-wide border ${styles[variant]}`}>
      {Icon && <Icon size={10} />}
      {children}
    </span>
  );
}

function DatePill({ label, date, isDarkMode }) {
  if (!date) return null;
  const d = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return (
    <div className={`flex items-center gap-2.5 px-2.5 py-1 rounded-lg border text-[11px]
      ${isDarkMode ? "bg-white/5 border-white/5 text-gray-400" : "bg-white border-gray-100 text-gray-500"}`}>
      <span className="text-[9px] uppercase font-semibold opacity-50">{label}</span>
      <span className="font-semibold text-yellow-500">{d}</span>
    </div>
  );
}

function SectionLabel({ label, isDarkMode }) {
  return <div className={`text-[10px] uppercase font-semibold tracking-[0.2em] mb-3 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>{label}</div>;
}

function InfoRow({ icon: Icon, text, isDarkMode }) {
  return (
    <div className="flex items-center gap-3.5">
      <Icon size={14} className="text-yellow-500 opacity-70" />
      <span className={`text-[13px] font-normal ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>{text}</span>
    </div>
  );
}