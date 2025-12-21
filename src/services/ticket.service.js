import apiClient from "./apiclient.js";

const TicketService = {
    async getTicket(){
        const response = await apiClient.get("/tickets");
        return response;
    }
}

export default TicketService;