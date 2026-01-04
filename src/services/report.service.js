import apiClient from "./apiclient"

 const ReportService = {

    async downloadTicketExcel(filters){
        const response = await apiClient.post("/reports/excel",
            filters,
            { responseType: 'blob' }
        );
        return response.data;
    }


 }

    export default ReportService;