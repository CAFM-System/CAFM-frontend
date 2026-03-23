import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export const VisitorReviewForm = ({ formData, onBack, onSubmit }) => {
  const { isDarkMode, text, subText, border } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Review Item Helper
  const ReviewItem = ({ label, value }) => (
    <div>
      <p className={`text-xs uppercase tracking-wider mb-1 ${subText}`}>{label}</p>
      <p className={`font-bold ${text}`}>{value || '-'}</p>
    </div>
  );

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await Promise.resolve(onSubmit?.());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl border-2 border-accent ${isDarkMode ? "bg-zinc-900" : "bg-yellow-50"}`}>
        <h4 className={`font-bold mb-6 flex items-center gap-2 ${text}`}>
          <CheckCircleIcon className="w-5 h-5 text-accent" /> Visitor Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 text-sm">

          <div className={`md:col-span-2 border-b ${isDarkMode ? "border-zinc-700" : "border-gray-200"} pb-4 mb-2`}>
            <p className="font-bold text-accent text-xs uppercase tracking-wider mb-3">Host Details</p>
            <div className="flex justify-between md:justify-start gap-12">
              <ReviewItem label="Apartment" value={formData.apartmentNo} />
              <ReviewItem label="Resident" value={formData.hostName} />
            </div>
          </div>

          <ReviewItem label="Full Name" value={formData.fullName} />
          <ReviewItem label="Phone" value={formData.phone} />
          <ReviewItem label="Email" value={formData.email} />
          <ReviewItem label="ID Number" value={formData.idNumber} />
          <ReviewItem label="Vehicle No" value={formData.vehicleNumber} />
          <ReviewItem label="Others Count" value={formData.numberOfOthers || '0'} />
          <ReviewItem label="Type" value={formData.visitorType} />
          <ReviewItem label="Visit Date" value={formData.visitDate || todayStr} />
          {/* {formData.visitorType === 'normal' ? (
              <ReviewItem label="Visit Date" value={formData.visitDate} />
          ) : (
              <>
                <ReviewItem label="Access From" value={formData.dateFrom} />
                <ReviewItem label="Access To" value={formData.dateTo} />
              </>
          )} */}
        </div>
      </div>

      <div className={`flex justify-end gap-4 pt-8 mt-2 border-t ${border}`}>
        <button onClick={onBack} className={`px-6 py-2.5 rounded-xl border-2 text-sm font-semibold transition-colors ${border} ${text} hover:opacity-70`}>Back to Edit</button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm shadow-sm transition-colors bg-accent hover:opacity-90 text-secondary disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </span>
          ) : (
            'Confirm & Submit'
          )}
        </button>
      </div>
    </div>
  );
};