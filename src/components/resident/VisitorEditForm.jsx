import React, { useState } from "react";
import { Save, X } from "lucide-react";
import { InputField } from "../ui/InputField";
import visitorService from "../../services/visitor.service";
import { toast } from "react-hot-toast";
import { useTheme } from "../../hooks/useTheme";

export default function VisitorEditForm({ visitor, onClose, onSuccess }) {

  const { text, border, isDarkMode } = useTheme();

  const [formData, setFormData] = useState(visitor);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const payload = {
  visitor_id: formData.visitorId,
  full_name: formData.fullName,
  phone: formData.phone,
  email: formData.email,
  id_number: formData.idNumber,
  vehicle_number: formData.vehicleNumber,
  others_count: formData.numberOfOthers
};

  const handleUpdate = async () => {

    try {

      setLoading(true);

      await visitorService.updateVisitor(payload);

      toast.success("Visitor updated successfully");

      onSuccess();
      onClose();

    } catch (err) {

      console.error(err);
      toast.error("Failed to update visitor");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h2 className={`text-xl font-bold ${text}`}>
            Edit Visitor
          </h2>
          <p className="text-sm text-gray-500">
            Update visitor information
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <X size={18}/>
        </button>

      </div>


      {/* Form Fields */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${border}`}>

        <InputField
          label="Visitor Full Name"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Doe"
        />

        <InputField
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="0771234567"
        />

        <InputField
          label="NIC / Passport Number"
          value={formData.idNumber}
          onChange={(e) => handleChange("idNumber", e.target.value)}
          placeholder="851234567V"
        />

        <InputField
          label="Email Address"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="visitor@email.com"
        />

        <InputField
          label="Vehicle Number (Optional)"
          value={formData.vehicleNumber}
          onChange={(e) => handleChange("vehicleNumber", e.target.value)}
          placeholder="WP CAA-1234"
        />

        <InputField
          label="Number of Accompanying Persons"
          type="number"
          min="0"
          value={formData.numberOfOthers}
          onChange={(e) => handleChange("numberOfOthers", e.target.value)}
        />

      </div>


      {/* Actions */}
      <div className={`flex justify-end gap-4 pt-6 border-t ${border}`}>

        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl border font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white font-bold shadow-lg shadow-accent/20 hover:opacity-90 active:scale-95 transition"
        >
          <Save size={16}/>
          {loading ? "Updating..." : "Update Visitor"}
        </button>

      </div>

    </div>
  );
}