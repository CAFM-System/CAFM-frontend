import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4000/api",
    headers:{
        "Content-Type": "application/json"
    },
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    
);

export default apiClient;