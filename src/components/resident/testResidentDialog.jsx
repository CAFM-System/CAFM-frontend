import { useState } from 'react';
import { ResidentTicketDialog } from './residentTicketDialog';

export function TestResidentDialog(){
    const [isOpen, setIsOpen] = useState(false);

    const ticketData = {
        ticketId: "TKT-003",
        title: "Electrical outlet not working",
        description: "The power outlet in the bedroom is not functioning. Need urgent repair.",
        category: "Electrical",
        location: "B-205 - Master Bedroom",
        createdDate: "Nov 21, 2025, 11:19 PM",
        status: "assigned",
        priority: "high",
        assignTo: "Lisa Brown",
        ticket_updates: [
            {
                status: "open",
                timestamp: "Nov 22, 2025, 01:50 AM",
                message: "Ticket created",
                author: "Sarah Johnson"
            },
            {
                status: "assigned",
                timestamp: "Nov 22, 2025, 06:38 AM",
                message: "Assigned to Mike Wilson",
                author: "Admin Manager"
            },
            {
                status: "in progress",
                timestamp: "Nov 22, 2025, 01:58 PM",
                message: "Ticket accepted and work started",
                author: "Mike Wilson"
            },
            {
                status: "resolved",
                timestamp: "Nov 22, 2025, 01:59 PM",
                message: "htrhrt",
                author: "Mike Wilson"
            }
        ],
    }

    if (!isOpen) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Open Resident Ticket Card
                </button>
            </div>
        );
    }

    return (
        <ResidentTicketDialog
            data={ticketData}
            onClose={() => setIsOpen(false)}
        />
    );

};
