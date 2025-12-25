import apiClient from "./apiclient";

const UserSevervice = {
    async getAllTechnicians(){
        const response = await apiClient.get("/users/technicians");
        return response;
    }
}
export default UserSevervice;