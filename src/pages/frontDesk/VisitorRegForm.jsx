import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { VisitorInputForm } from '../../components/frontDesk/VisitorInputForm';
import { VisitorReviewForm } from '../../components/frontDesk/VisitorReviewForm';
import UserService from '../../services/user.service';




// MOCK DB
// const MOCK_RESIDENTS = {
//   '101': { name: 'Dr. Kasun Perera', phone: '0771112233' },
//   '102': { name: 'Mr. Amal Silva', phone: '0712223344' },
//   '103': { name: 'Mrs. Nimali Fernando', phone: '0763334455' },
//   'A1':  { name: 'Eng. Dilan Jayasooriya', phone: '0778889900' },
//   'B2':  { name: 'Ms. Hashini Bandara', phone: '0705556677' }
// };



export default function VisitorRegForm({ onAddVisitor, onCancel }) {
  const [step, setStep] = useState(1);
  // Using theme hook for the main container
  const { cardBg, text, border } = useTheme();
  const [residents, setResidents] = useState({});

  const [formData, setFormData] = useState({
    apartmentNo: '', hostName: '', 
    fullName: '', phone: '', idNumber: '', email: '',
    vehicleNumber: '', numberOfOthers: '', 
    visitorType: 'normal', visitDate: '', dateFrom: '', dateTo: '',
    residentId: null,     
  });

  useEffect(() => {

  const fetchResidents = async () => {
    try {

      const response = await UserService.getResidents();

      const map = {};

      response.data.forEach(r => {
        const name = `${r.profiles.first_name} ${r.profiles.last_name}`;

        map[r.apartment_no.toUpperCase()] = {
          id: r.user_id, 
          name,
          phone: r.profiles.phone
        };
      });

      setResidents(map);

    } catch (err) {
      console.error("Failed to fetch residents", err);
    }
  };

  fetchResidents();

}, []);

  const handleInputChange = (field, value) => {
    // 1. Apartment Lookup
    if (field === 'apartmentNo') {
      const aptKey = value.trim().toUpperCase();
      const resident = residents[aptKey];
      setFormData(prev => ({ 
        ...prev, 
        apartmentNo: value, 
        hostName: resident ? resident.name : '' ,
        residentId: resident ? resident.id : null
      }));
    } 
    // 2. Auto Uppercase (Vehicle & ID)
    else if (field === 'vehicleNumber' || field === 'idNumber') {
      setFormData(prev => ({ ...prev, [field]: value.toUpperCase() }));
    } 
    // 3. Standard Input
    else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    if (onAddVisitor) onAddVisitor(formData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-sans relative">
      <div className={`rounded-2xl border-2 shadow-sm p-8 ${cardBg} ${border}`}>
        
        <h3 className={`text-lg font-medium mb-6 border-b pb-2 ${text} ${border}`}>
          {step === 1 ? 'Step 1: Visitor Details' : 'Step 2: Review & Submit'}
        </h3>

        {step === 1 && (
          <VisitorInputForm 
            formData={formData} 
            onChange={handleInputChange} 
            onNext={() => setStep(2)} 
            onCancel={onCancel} 
          />
        )}

        {step === 2 && (
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