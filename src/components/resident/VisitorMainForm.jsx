import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { VisitorFillForm } from './VisitorFillForm';
import { VisitorReviewForm } from '../frontDesk/VisitorReviewForm';
import AuthService from "../../services/auth.service"; // Import your AuthService
import visitorService from '../../services/visitor.service';
import toast from 'react-hot-toast';


export default function VisitorMainForm({ onCancel , onSuccess }) {
  const { cardBg, text, border, subText } = useTheme();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // Initialize formData with empty strings for host info
  const [formData, setFormData] = useState({
    apartmentNo: '', 
    hostName: '', 
    fullName: '', 
    phone: '', 
    idNumber: '', 
    email: '',
    vehicleNumber: '', 
    numberOfOthers: '0', 
    visitorType: 'normal', 
    visitDate: '', 
    dateFrom: '', 
    dateTo: ''
  });

  // Fetch real user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AuthService.getuser();
        const user = response.data.user;
        
        // Update form state with the real logged-in resident's info
        setFormData(prev => ({
          ...prev,
          hostName: `${user.profile.firstName} ${user.profile.lastName}`,
          apartmentNo: user.profile.apartmentNo
        }));
      } catch (error) {
        console.error("Error fetching user for visitor form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    if (field === 'vehicleNumber' || field === 'idNumber') {
      setFormData(prev => ({ ...prev, [field]: value.toUpperCase() }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const payload = {
    full_name: formData.fullName,
    phone: formData.phone,
    id_number: formData.idNumber,
    email: formData.email,
    vehicle_number: formData.vehicleNumber,
    visitor_type: formData.visitorType.toUpperCase(),
    valid_from: formData.dateFrom || formData.visitDate,
    valid_until: formData.dateTo,
    others_count: formData.numberOfOthers
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting Invitation:", formData);
      await visitorService.preRegisterVisitor(payload);
      toast.success("Visitor pre-registered successfully!");
      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    } catch (err) {
      toast.error("Failed to register visitor.");
    }
  };

  // Show a loading state while fetching user details to prevent blank fields
  if (loading) {
    return <div className={`p-8 text-center ${text}`}>Loading resident profile...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-sans">
      <div className={`rounded-2xl border-2 shadow-sm p-8 ${cardBg} ${border}`}>
        
        {/* Resident Context Header - Now using Dynamic Data */}
        <div className="mb-8 flex justify-between items-end border-b pb-4 {border}">
          <div>
            <h2 className={`text-2xl font-bold ${text}`}>Invite Guest</h2>
            <p className={`text-sm ${subText}`}>Create a digital pass for your visitor</p>
          </div>
          <div className="text-right">
            <p className={`text-xs uppercase font-bold text-accent tracking-widest`}>Hosting As</p>
            <p className={`font-semibold ${text}`}>
              {formData.hostName || "Loading..."} | Unit {formData.apartmentNo || "N/A"}
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-4">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`h-1 flex-1 rounded ${step === 2 ? 'bg-accent' : 'bg-gray-200'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        </div>

        {step === 1 ? (
          <VisitorFillForm 
            formData={formData} 
            onChange={handleInputChange} 
            onNext={() => setStep(2)} 
            onCancel={onCancel} 
          />
        ) : (
          <VisitorReviewForm 
            formData={formData} 
            onBack={() => setStep(1)} 
            onSubmit={handleSubmit} 
          />
        )}
      </div>
    </div>
  );
}