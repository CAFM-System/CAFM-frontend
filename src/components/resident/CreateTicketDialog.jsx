import { Upload } from "lucide-react";
import { useState } from "react";

export function CreateTicketDialog() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Cleaning");
    const [priority, setpriority] = useState("low");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [attachments, setAttachments] = useState(null);
    return(
        <div className="fixed inset-0 bg-black/50 z-[100] flex justify-center items-center p-4">
      
      <div className="w-full max-w-[520px] max-h-[90vh] bg-white rounded-2xl shadow-xl p-6 overflow-y-auto">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create New Ticket
        </h2>

        <div className="space-y-5">

          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="title" className="font-medium text-gray-700">
              Title *
            </label>
            <input
              id="title"
              placeholder="Brief description of the issue"
              required
              value={title}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{setTitle(e.target.value)}}
            />
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-gray-700">Category *</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
                placeholder="Select category"
              >
                <option>Cleaning</option>
                <option>Security</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>HVAC</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-gray-700">Priority *</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                value={priority}
                onChange={(e)=>{setpriority(e.target.value)}}
                placeholder="Select priority"
              >
                <option>low</option>
                <option>medium</option>
                <option>high</option>
                <option>urgent</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label htmlFor="location" className="font-medium text-gray-700">
              Location *
            </label>
            <input
              id="location"
              placeholder="e.g., Kitchen, Bedroom, Common Area"
              required
              value={location}
              onChange={(e)=>{setLocation(e.target.value)}}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className="font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Provide detailed information about the issue..."
              rows={4}
              required
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Attachments */}
          <div className="space-y-1">
            <label className="font-medium text-gray-700">
              Attachments (Optional)
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <input id="attachments" type="file" className="hidden" multiple onChange={(e)=>{setAttachments(e.target.files)}} />

              <label htmlFor="attachments" className="cursor-pointer block">
                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-600">
                  Click to upload images or videos
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, MP4 up to 10MB
                </p>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              onClick={()=>{close()}}
            >
              Cancel
            </button>

            <button
              
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
              onClick={()=>{}}
            >
              Create Ticket
            </button>
          </div>

        </div>
        
      </div>

    </div>
    )
}