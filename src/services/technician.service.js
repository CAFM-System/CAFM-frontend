import apiClient from "./apiclient";

const TechnicianService = {
    async startWork (ticketId){
        const response = await apiClient.put("/technicians/update-time/"+ticketId);
        return response;
    }
}
export default TechnicianService;