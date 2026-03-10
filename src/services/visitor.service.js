import apiClient from "./apiclient"

const visitorService = {
    async getVisitorInfo() {
        const respone = await apiClient.get("/visitors");
        return respone;
    },
    async getVisitorInfoByResidentId() {
        const response = await apiClient.get("/visitors/my-visitors");
        return response;
    }
        
}

export default visitorService;
