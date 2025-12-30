import apiClient from "./apiclient"

const ResidentService = {
    async addRatingWithFeedback (ticketId, payload) {
        const response = await apiClient.post("/ticket-reviews/"+ticketId, payload);
        return response;
    },

    async getRatingWithFeedback (ticketId) {
        const response = await apiClient.get("/ticket-reviews/"+ticketId);
        return response;
    }
}

export default ResidentService;