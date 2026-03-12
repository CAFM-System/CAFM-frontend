import React from 'react';
import { 
  User, MapPin, Phone, Mail, CreditCard, Car, Users, 
  CheckCircle2, ScanLine, Clock, LogIn
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function VisitorRecord({ visitor, isSelected, onSelect, onCheckIn }) {
  const { isDarkMode } = useTheme();
  
  // --- Logic Helpers ---
  const isRegular = visitor.visitorType === 'regular';
  const isPreReg = visitor.isPreRegistered === true; 
  const isCheckedIn = !!visitor.entryTime; // Check if they have entered

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  // Stop propagation to prevent card collapse when clicking the button
  const handleCheckInClick = (e) => {
    e.stopPropagation();
    onCheckIn();
  };

  return (
    <div
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer group
        ${isDarkMode 
          ? "bg-white/5 border-white/10 hover:border-[#EAB308]/50" 
          : "bg-white border-gray-200 hover:border-[#EAB308]/50 hover:shadow-md"
        }
        ${isSelected 
          ? (isDarkMode ? 'ring-2 ring-[#EAB308] bg-white/10' : 'ring-2 ring-[#EAB308] bg-gray-50')
          : ''
        }
      `}
    >
      <div className="p-5">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm shrink-0
              ${isDarkMode ? "bg-[#EAB308] text-black" : "bg-[#EAB308] text-white"}`}>
              {visitor.name ? visitor.name.charAt(0).toUpperCase() : '?'}
            </div>
            
            <div>
              <h3 className={`text-lg font-bold leading-none ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                {visitor.name}
              </h3>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={isRegular ? "purple" : "blue"} isDarkMode={isDarkMode}>
                   {isRegular ? "Regular" : "Normal"}
                </Badge>
                <span className={`text-[10px] ${isDarkMode ? "text-gray-600" : "text-gray-300"}`}>•</span>
                <Badge variant={isPreReg ? "green" : "orange"} isDarkMode={isDarkMode} icon={isPreReg ? CheckCircle2 : ScanLine}>
                   {isPreReg ? "Pre-Reg" : "On-Site"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Date Info */}
          <div className="text-right hidden sm:block">
             {isRegular ? (
               <div className="flex flex-col items-end gap-1">
                 <DatePill label="From" date={visitor.fromDate || visitor.date} isDarkMode={isDarkMode} />
                 <DatePill label="To" date={visitor.toDate} isDarkMode={isDarkMode} />
               </div>
             ) : (
               <div className={`flex flex-col items-center px-3 py-1.5 rounded-lg border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}`}>
                  <span className={`text-[10px] uppercase font-bold mb-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Visit Date</span>
                  <span className={`text-sm font-bold ${isDarkMode ? "text-[#EAB308]" : "text-zinc-800"}`}>
                    {formatDate(visitor.date)}
                  </span>
               </div>
             )}
          </div>
        </div>

        {/* --- BODY --- */}
        <div className={`grid grid-cols-2 gap-4 py-4 border-t border-dashed
          ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
          
          <div className="space-y-3">
             <SectionLabel label="Host Details" isDarkMode={isDarkMode} />
             <div className="space-y-2">
                <InfoRow icon={MapPin} text={`Apt ${visitor.hostApartment || visitor.department || '--'}`} isDarkMode={isDarkMode} highlight />
                <InfoRow icon={User} text={visitor.hostName || "Unknown Host"} isDarkMode={isDarkMode} />
                <InfoRow icon={Phone} text={visitor.hostPhone || "No Phone"} isDarkMode={isDarkMode} />
             </div>
          </div>

          <div className="space-y-3 pl-2 border-l border-dashed border-gray-200 dark:border-white/10">
             <SectionLabel label="Visitor Details" isDarkMode={isDarkMode} />
             <div className="space-y-2">
                {/* ID (Strictly here) */}
                <InfoRow icon={CreditCard} text={visitor.nic || visitor.id || '--'} isDarkMode={isDarkMode} />
                <InfoRow icon={Phone} text={visitor.phone || "--"} isDarkMode={isDarkMode} />
                {visitor.email && <InfoRow icon={Mail} text={visitor.email} isDarkMode={isDarkMode} />}
                
                <div className="flex justify-between items-center pr-2 pt-1">
                   <InfoRow icon={Car} text={visitor.vehicleNumber || "No Vehicle"} isDarkMode={isDarkMode} />
                   {visitor.othersCount > 0 && (
                      <span className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ml-2
                        ${isDarkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                        <Users size={10} /> +{visitor.othersCount}
                      </span>
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* --- FOOTER: Status Actions --- */}
        <div className={`flex items-center justify-between pt-3 border-t ${isDarkMode ? "border-white/10" : "border-gray-100"}`}>
            
            {/* Left: Status Indicator */}
            {isCheckedIn ? (
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium animate-in fade-in
                ${isDarkMode ? "bg-white/5 text-[#EAB308]" : "bg-gray-100 text-zinc-800"}`}>
                <Clock size={12} />
                <span>Checked In: {visitor.entryTime}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold bg-orange-500/10 text-orange-500">
                 <ScanLine size={12} />
                 <span>Pending Arrival</span>
              </div>
            )}

            {/* Right: Check-In Action (Only if NOT checked in) */}
            {!isCheckedIn && (
              <button 
                onClick={handleCheckInClick}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95
                  ${isDarkMode 
                    ? "bg-[#EAB308] text-black hover:bg-[#EAB308]/90 shadow-[0_0_10px_rgba(234,179,8,0.2)]" 
                    : "bg-black text-white hover:bg-gray-800 shadow-lg"}`}
              >
                <LogIn size={12} />
                Check In
              </button>
            )}

        </div>

      </div>
    </div>
  );
}

// --- Sub-components (Keep same) ---
// ... (Badge, SectionLabel, InfoRow, DatePill are unchanged) ...
function Badge({ variant, children, isDarkMode, icon: Icon }) {
  const styles = {
    purple: isDarkMode ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200",
    blue:   isDarkMode ? "bg-blue-500/20 text-blue-300 border-blue-500/30"     : "bg-blue-100 text-blue-700 border-blue-200",
    green:  isDarkMode ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-emerald-100 text-emerald-700 border-emerald-200",
    orange: isDarkMode ? "bg-orange-500/20 text-orange-300 border-orange-500/30" : "bg-orange-100 text-orange-700 border-orange-200",
  };
    
  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${styles[variant]}`}>
      {Icon && <Icon size={10} />}
      {children}
    </span>
  );
}

function SectionLabel({ label, isDarkMode }) {
  return (
    <div className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
      {label}
    </div>
  );
}

function InfoRow({ icon: Icon, text, isDarkMode, highlight }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Icon size={14} className={highlight ? "text-[#EAB308]" : (isDarkMode ? "text-gray-500" : "text-gray-400")} />
      <span className={`text-xs truncate font-medium ${isDarkMode ? "text-gray-300" : "text-zinc-700"}`}>
        {text}
      </span>
    </div>
  );
}

function DatePill({ label, date, isDarkMode }) {
  if (!date) return null;
  const d = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <div className={`flex items-center gap-2 text-[10px] px-2 py-0.5 rounded-full border
      ${isDarkMode ? "bg-white/5 border-white/10 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-600"}`}>
      <span className="opacity-50">{label}:</span>
      <span className="font-bold">{d}</span>
    </div>
  );
}