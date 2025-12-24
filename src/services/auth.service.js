import apiClient from "./apiclient.js"

const AuthService = {
    async login(data){
        const response = await apiClient.post("/auth/login",data);
        console.log("Login response:", response);

        if(response.data?.accessToken){
            localStorage.setItem("access_token",response.data.accessToken);
        }
        return response;
    }
}

export default AuthService;