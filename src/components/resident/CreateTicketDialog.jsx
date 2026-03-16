import { Loader2 } from "lucide-react";
import { useState } from "react";
import TicketService from "../../services/ticket.service";
import toast from "react-hot-toast";
import { useTheme } from "../../hooks/useTheme";

export function CreateTicketDialog(props) {
    const { modalBg, text, subText, inputBg, buttonPrimary, buttonSecondary } = useTheme();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [specialNote, setSpecialNote] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    async function handleSubmit(){
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const payload = {
          title,
          job_type: category,
          location,
          complaint: description,
          special_note: specialNote
        }

        await TicketService.createTicket(payload);
        props.refresh();
        props.close();
        toast.success("Ticket created successfully!");
      } catch (error) {
        toast.error("Failed to create ticket.");
        console.log("Error creating ticket:", error);
      } finally {
        setIsSubmitting(false);
      }
    }

    const close = props.close;
    return(
        <div className="fixed inset-0 bg-black/50 z-[100] flex justify-center items-center p-4">
      
      <div className={`w-full max-w-[520px] max-h-[90vh] rounded-2xl shadow-xl p-6 overflow-y-auto border ${modalBg}`}>
        
        <h2 className={`text-xl font-semibold mb-4 ${text}`}>
          Create New Ticket
        </h2>

        <div className="space-y-5">

          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="title" className={`font-medium ${subText}`}>
              Title *
            </label>
            <input
              id="title"
              placeholder="Brief description of the issue"
              required
              value={title}
              className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent ${inputBg}`}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={`font-medium ${subText}`}>Category *</label>
              <select className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent ${inputBg}`}
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
                placeholder="Select category"
              >
                <option value="" disabled>Select category</option>
                <option>Cleaning</option>
                <option>Security</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>HVAC</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label htmlFor="location" className={`font-medium ${subText}`}>
              Location *
            </label>
            <input
              id="location"
              placeholder="e.g., Kitchen, Bedroom, Common Area"
              required
              value={location}
              onChange={(e)=>{setLocation(e.target.value)}}
              className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent ${inputBg}`}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className={`font-medium ${subText}`}>
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Provide detailed information about the issue..."
              rows={4}
              required
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              className={`w-full border rounded-lg px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-accent ${inputBg}`}
            />
          </div>
          {/* Special Note */}
          <div className="space-y-1">
            <label htmlFor="specialNote" className={`font-medium ${subText}`}>
              Special Note *
            </label>
            <textarea
              id="specialNote"
              placeholder="Provide special notes"
              rows={4}
              value={specialNote}
              onChange={(e)=>{setSpecialNote(e.target.value)}}
              className={`w-full border rounded-lg px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-accent ${inputBg}`}
            />
          </div>


        
          

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg border transition ${buttonSecondary}`}
              onClick={()=>{close()}}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg transition ${buttonPrimary}`}
              onClick={()=>{handleSubmit()}}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Ticket"
              )}
            </button>
          </div>

        </div>
        
      </div>

    </div>
    )
}