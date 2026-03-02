import apiClient from "./apiclient"

const visitorService = {
    async getVisitorInfo() {
        const respone = await apiClient.get("/visitors");
        return respone;
    }
        
}

export default visitorService;
