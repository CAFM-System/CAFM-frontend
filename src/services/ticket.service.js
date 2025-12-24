import apiClient from "./apiclient.js";

const TicketService = {
    async getTicket(){
        const response = await apiClient.get("/tickets");
        return response;
    },

    async createTicket(payload){
        const response = await apiClient.post("/tickets", payload);
        return response;
    }
}

export default TicketService;