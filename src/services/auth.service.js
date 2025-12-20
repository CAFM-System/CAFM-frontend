import apiClient from "./apiclient.js"

const AuthService = {
    async login(data){
        const response = await apiClient.post("/auth/login",data);

        if(response.data?.access_token){
            localStorage.setItem("access_token",response.data.access_token);
        }
        return response;
    }
}

export default AuthService;