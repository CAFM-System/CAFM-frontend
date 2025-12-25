import apiClient from "./apiclient.js";

const TicketService = {
    async getTicket(){
        const response = await apiClient.get("/tickets");
        return response;
    },

    async createTicket(payload){
        const response = await apiClient.post("/tickets", payload);
        return response;
    },

    async updateStatusHistory(payload){
        const response = await apiClient.get("/progress-history"+payload);
        return response;
    },

    async assignTechnician(ticketId, technicianId,priority){
        const response = await apiClient.put("/tickets/assign-technician/"+ticketId, { 
            technician_id :technicianId,
            priority 
        });
        return response;
    }
}

export default TicketService;