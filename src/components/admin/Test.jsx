import { useState } from 'react';

import TicketDetails from './TicketDetails';
import { tickets } from '../../services/newTicketData.js';
import { ticketsUpdates } from '../../services/ticketUpdatesData';

const Test = () => {
    const [isOpen, setIsOpen] = useState(false);

    const ticketData = {
        ...tickets[0],
        ticket_updates: ticketsUpdates
    }

    if (!isOpen) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Open Ticket Card
                </button>
            </div>
        );
    }

    return (
        <TicketDetails
            data={ticketData}
            onClose={() => setIsOpen(false)}
        />
    );

};

export default Test;