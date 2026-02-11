import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { InputField } from '../ui/InputField'; 
import { ErrorPopup } from '../ui/ErrorPopup'; 

const getTodayString = () => new Date().toISOString().split('T')[0];

export const VisitorInputForm = ({ formData, onChange, onNext, onCancel }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const { isDarkMode, cardBg, text, subText, border } = useTheme();

  const validateAndNext = () => {
    setErrorMsg(null);

    // 1. Host Validation
    if (!formData.apartmentNo || !formData.hostName) {
      setErrorMsg("Please enter a valid Apartment Number.\nThe Resident Name must be auto-filled.");
      return;
    }

    // 2. Required Fields
    if (!formData.fullName || !formData.phone || !formData.idNumber) {
      setErrorMsg("Please fill in all required fields:\n• Full Name\n• Phone Number\n• ID Number");
      return;
    }

    // 3. ID Number (SL NIC)
    const nicRegex = /^([0-9]{9}[VvXx]|[0-9]{12})$/;
    if (!nicRegex.test(formData.idNumber)) {
        setErrorMsg("Invalid ID Number.\nFormat: 123456789V (Old) or 199012345678 (New)");
        return;
    }

    // 4. Phone (SL)
    const simpleSlPhoneRegex = /^(\+94|0)[0-9]{9}$/;
    if (!simpleSlPhoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setErrorMsg("Invalid Sri Lankan Phone Number.\nFormat: 0771234567 or +94771234567");
      return;
    }

    // 5. Email
    if (formData.email && formData.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMsg("Invalid Email Format.");
        return;
      }
    }

    // 6. Vehicle
    if (formData.vehicleNumber && formData.vehicleNumber.trim() !== "") {
      const basicVehicleRegex = /^([A-Z0-9\s]{2,8})[-]([0-9]{4})$/;
      if (!basicVehicleRegex.test(formData.vehicleNumber)) {
        setErrorMsg("Invalid Vehicle Number.\nExpected Format: CAA-1234");
        return;
      }
    }

    // 7. Dates
    const today = new Date(getTodayString());
    if (formData.visitorType === 'normal') {
      if (!formData.visitDate) { setErrorMsg("Visit Date is mandatory."); return; }
      if (new Date(formData.visitDate) < today) { setErrorMsg("Visit Date cannot be in the past."); return; }
    }
    if (formData.visitorType === 'regular') {
      if (!formData.dateFrom || !formData.dateTo) { setErrorMsg("Select both 'From' and 'To' dates."); return; }
      const startDate = new Date(formData.dateFrom);
      const endDate = new Date(formData.dateTo);
      if (startDate < today) { setErrorMsg("'Access From' date cannot be in the past."); return; }
      if (endDate < startDate) { setErrorMsg("'Access To' cannot be earlier than 'Access From'."); return; }
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      {errorMsg && <ErrorPopup message={errorMsg} onClose={() => setErrorMsg(null)} />}
      
      {/* Host Info */}
      <div className={`p-4 rounded-xl border ${border} ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
        <h4 className="text-sm font-bold text-accent mb-3 uppercase tracking-wider">Host Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField id="apartmentNo" label="Apartment No *" value={formData.apartmentNo} onChange={(e) => onChange('apartmentNo', e.target.value)} placeholder="e.g. 101, A1" />
          <InputField id="hostName" label="Resident Name (Auto-filled)" value={formData.hostName} readOnly={true} placeholder="Searching..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="fullName" label="Visitor Full Name *" value={formData.fullName} onChange={(e) => onChange('fullName', e.target.value)} placeholder="Enter full name" />
        <InputField id="phone" label="Phone Number (SL) *" value={formData.phone} onChange={(e) => onChange('phone', e.target.value)} placeholder="0771234567" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="idNumber" label="ID Number (NIC/Passport) *" value={formData.idNumber} onChange={(e) => onChange('idNumber', e.target.value)} placeholder="e.g. 851234567V" />
        <InputField id="email" label="Email (Optional)" type="email" value={formData.email} onChange={(e) => onChange('email', e.target.value)} placeholder="user@example.com" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="vehicleNumber" label="Vehicle Number (Optional)" value={formData.vehicleNumber} onChange={(e) => onChange('vehicleNumber', e.target.value)} placeholder="CAA-1234" />
        <InputField id="numberOfOthers" label="Number of Others Coming" type="number" min="0" value={formData.numberOfOthers} onChange={(e) => { const val = e.target.value; if (val === '' || (parseInt(val) >= 0 && !val.includes('-'))) onChange('numberOfOthers', val); }} placeholder="0" />
      </div>

      {/* Type Selection */}
      <div className={`pt-2 border-t ${border} mt-4`}>
        <label className={`text-sm font-bold mb-3 block ${text}`}>Visitor Type *</label>
        <div className="flex flex-wrap gap-8">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input type="radio" name="visitorType" value="normal" checked={formData.visitorType === 'normal'} onChange={(e) => onChange('visitorType', e.target.value)} className="w-5 h-5 text-accent focus:ring-accent" />
            <span className={`font-medium text-sm ${text}`}>Normal Visitor (One-time)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input type="radio" name="visitorType" value="regular" checked={formData.visitorType === 'regular'} onChange={(e) => onChange('visitorType', e.target.value)} className="w-5 h-5 text-accent focus:ring-accent" />
            <span className={`font-medium text-sm ${text}`}>Regular Visitor (Multiple)</span>
          </label>
        </div>
      </div>

      <div className="mt-6">
        {formData.visitorType === 'normal' ? (
          <div className="w-full">
            <InputField id="visitDate" label="Visit Date *" type="date" value={formData.visitDate} min={getTodayString()} onChange={(e) => onChange('visitDate', e.target.value)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="dateFrom" label="Access From *" type="date" value={formData.dateFrom} min={getTodayString()} onChange={(e) => onChange('dateFrom', e.target.value)} />
            <InputField id="dateTo" label="Access To *" type="date" value={formData.dateTo} min={formData.dateFrom || getTodayString()} onChange={(e) => onChange('dateTo', e.target.value)} />
          </div>
        )}
      </div>

      <div className={`flex justify-end gap-4 pt-8 mt-2 border-t ${border}`}>
        <button onClick={onCancel} className={`px-6 py-2.5 rounded-xl border-2 text-sm font-semibold transition-colors ${border} ${text} hover:opacity-70`}>Cancel</button>
        <button onClick={validateAndNext} className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm shadow-sm transition-colors bg-accent hover:opacity-90 text-secondary">Next: Review & Submit</button>
      </div>
    </div>
  );
};