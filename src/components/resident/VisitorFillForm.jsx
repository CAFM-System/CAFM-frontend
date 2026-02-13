import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { InputField } from '../ui/InputField'; 
import { ErrorPopup } from '../ui/ErrorPopup'; 

export const VisitorFillForm = ({ formData, onChange, onNext, onCancel }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const { isDarkMode, text, border } = useTheme();

  const validateAndNext = () => {
    if (!formData.fullName || !formData.phone || !formData.idNumber || !formData.email) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      {errorMsg && <ErrorPopup message={errorMsg} onClose={() => setErrorMsg(null)} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Visitor Full Name *" value={formData.fullName} onChange={(e) => onChange('fullName', e.target.value)} />
        <InputField label="Phone Number *" value={formData.phone} onChange={(e) => onChange('phone', e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="NIC / Passport *" value={formData.idNumber} onChange={(e) => onChange('idNumber', e.target.value)} />
        <InputField label="Email Address *" type="email" value={formData.email} onChange={(e) => onChange('email', e.target.value)} />
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${border}`}>
        <InputField label="Vehicle Number" value={formData.vehicleNumber} onChange={(e) => onChange('vehicleNumber', e.target.value)} />
        <InputField label="Others Joining" type="number" value={formData.numberOfOthers} onChange={(e) => onChange('numberOfOthers', e.target.value)} />
      </div>

      <div className={`p-4 rounded-xl border ${border} ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
        <label className={`text-sm font-bold mb-4 block ${text}`}>Visit Type</label>
        <div className="flex gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" checked={formData.visitorType === 'normal'} onChange={() => onChange('visitorType', 'normal')} className="accent-accent" />
            <span className={`text-sm ${text}`}>Single Visit</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" checked={formData.visitorType === 'regular'} onChange={() => onChange('visitorType', 'regular')} className="accent-accent" />
            <span className={`text-sm ${text}`}>Regular Guest</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
        <button onClick={onCancel} className={`px-6 py-2 rounded-lg border ${border} ${text}`}>Cancel</button>
        <button onClick={validateAndNext} className="px-6 py-2 rounded-lg bg-accent text-white font-bold">Next: Review</button>
      </div>
    </div>
  );
};