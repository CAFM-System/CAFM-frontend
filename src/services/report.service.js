import apiClient from "./apiclient"

const ReportService = {

    async downloadTicketExcel(filters) {
        const response = await apiClient.post("/utility/excel",
            filters,
            { responseType: 'blob' }
        );
        return response.data;
    },

    async downloadTicketPDF(filters) {
        const response = await apiClient.post("/utility/pdf",
            filters,
            { responseType: 'blob' }
        );
        return response.data;
    },

    async downloadVisitorExcel(filters = {}) {
        const response = await apiClient.post("/utility/visitors/excel",
            filters,
            { responseType: 'blob' }
        );
        return response.data;
    },
        async downloadVisitorPDF(filters = {}) {
        const response = await apiClient.post("/utility/visitors/pdf",
            filters,
            { responseType: 'blob' }
        );
        return response.data;
        }
    


}

export default ReportService;