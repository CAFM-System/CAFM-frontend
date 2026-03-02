import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { InputField } from '../ui/InputField'; 
import { ErrorPopup } from '../ui/ErrorPopup'; 

// Helper to prevent selecting past dates
const getTodayString = () => new Date().toISOString().split('T')[0];

export const VisitorFillForm = ({ formData, onChange, onNext, onCancel }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const { isDarkMode, text, border, accent } = useTheme();

  const validateAndNext = () => {
    setErrorMsg(null);

    // 1. Required Fields
    if (!formData.fullName || !formData.phone || !formData.idNumber || !formData.email) {
      setErrorMsg("Required fields missing:\n• Full Name\n• Phone Number\n• ID Number\n• Email Address");
      return;
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Invalid Email Address.\nPlease enter a valid email (e.g., name@example.com)");
      return;
    }

    // 3. ID Number (SL NIC Validation)
    const nicRegex = /^([0-9]{9}[VvXx]|[0-9]{12})$/;
    if (!nicRegex.test(formData.idNumber)) {
      setErrorMsg("Invalid ID Number.\nFormat: 123456789V or 199012345678");
      return;
    }

    // 4. Phone (SL Format Validation)
    const simpleSlPhoneRegex = /^(\+94|0)[0-9]{9}$/;
    if (!simpleSlPhoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setErrorMsg("Invalid Phone Number.\nFormat: 0771234567");
      return;
    }

    // 5. Vehicle Number Validation (Optional but formatted if present)
    if (formData.vehicleNumber && formData.vehicleNumber.trim() !== "") {
        const basicVehicleRegex = /^([A-Z0-9\s]{1,8})[-]([0-9]{4})$/;
        if (!basicVehicleRegex.test(formData.vehicleNumber.toUpperCase())) {
          setErrorMsg("Invalid Vehicle Number.\nExpected Format: CAA-1234 or WP CAA-1234");
          return;
        }
    }

    // 6. Date Logic
    const today = new Date(getTodayString());
    if (formData.visitorType === 'normal') {
      if (!formData.visitDate) { 
        setErrorMsg("Please select a Visit Date."); 
        return; 
      }
      if (new Date(formData.visitDate) < today) { 
        setErrorMsg("Date cannot be in the past."); 
        return; 
      }
    } else {
      if (!formData.dateFrom || !formData.dateTo) { 
        setErrorMsg("Select both 'From' and 'To' dates for frequent access."); 
        return; 
      }
      if (new Date(formData.dateTo) < new Date(formData.dateFrom)) { 
        setErrorMsg("'To' date cannot be before 'From' date."); 
        return; 
      }
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      {errorMsg && <ErrorPopup message={errorMsg} onClose={() => setErrorMsg(null)} />}
      
      {/* Section 1: Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          label="Visitor Full Name *" 
          value={formData.fullName} 
          onChange={(e) => onChange('fullName', e.target.value)} 
          placeholder="e.g. John Doe" 
        />
        <InputField 
          label="Phone Number *" 
          value={formData.phone} 
          onChange={(e) => onChange('phone', e.target.value)} 
          placeholder="0771234567" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          label="NIC / Passport Number *" 
          value={formData.idNumber} 
          onChange={(e) => onChange('idNumber', e.target.value)} 
          placeholder="851234567V" 
        />
        <InputField 
          label="Email Address *" 
          type="email" 
          value={formData.email} 
          onChange={(e) => onChange('email', e.target.value)} 
          placeholder="visitor@mail.com" 
        />
      </div>

      {/* Section 2: Logistics */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${border}`}>
        <InputField 
          label="Vehicle Number (Optional)" 
          value={formData.vehicleNumber} 
          onChange={(e) => onChange('vehicleNumber', e.target.value.toUpperCase())} 
          placeholder="WP CAA-1234" 
        />
        <InputField 
          label="Number of Accompanying Persons" 
          type="number" 
          min="0"
          value={formData.numberOfOthers} 
          onChange={(e) => onChange('numberOfOthers', e.target.value)} 
          placeholder="0" 
        />
      </div>

      {/* Section 3: Visitor Type & Dates */}
      <div className={`p-5 rounded-2xl border ${border} ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
        <label className={`text-sm font-bold mb-4 block ${text}`}>Entry Permission Type</label>
        <div className="flex gap-8 mb-6">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input 
              type="radio" 
              checked={formData.visitorType === 'normal'} 
              onChange={() => onChange('visitorType', 'normal')}
              className="w-4 h-4 accent-accent"
            />
            <span className={`text-sm font-medium ${text}`}>Single Visit</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input 
              type="radio" 
              checked={formData.visitorType === 'regular'} 
              onChange={() => onChange('visitorType', 'regular')}
              className="w-4 h-4 accent-accent"
            />
            <span className={`text-sm font-medium ${text}`}>Frequent Guest</span>
          </label>
        </div>

        {/* Dynamic Date Fields */}
        <div className="animate-in fade-in duration-300">
          {formData.visitorType === 'normal' ? (
            <InputField 
              label="Scheduled Visit Date *" 
              type="date" 
              value={formData.visitDate} 
              min={getTodayString()} 
              onChange={(e) => onChange('visitDate', e.target.value)} 
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Access Start Date *" 
                type="date" 
                value={formData.dateFrom} 
                min={getTodayString()} 
                onChange={(e) => onChange('dateFrom', e.target.value)} 
              />
              <InputField 
                label="Access End Date *" 
                type="date" 
                value={formData.dateTo} 
                min={formData.dateFrom || getTodayString()} 
                onChange={(e) => onChange('dateTo', e.target.value)} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Actions */}
      <div className={`flex justify-end gap-4 pt-6 border-t ${border}`}>
        <button 
          type="button"
          onClick={onCancel} 
          className={`px-6 py-2.5 rounded-xl border-2 font-semibold transition-all ${border} ${text} hover:bg-black/5`}
        >
          Cancel
        </button>
        <button 
          type="button"
          onClick={validateAndNext} 
          className="px-8 py-2.5 rounded-xl bg-accent text-white font-bold shadow-lg shadow-accent/20 hover:opacity-90 active:scale-95 transition-all"
        >
          Next: Review Invitation
        </button>
      </div>
    </div>
  );
};