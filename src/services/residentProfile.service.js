import apiClient from "./apiclient";

const ResidentProfileService = {
  getProfile: () => {
    return apiClient.get("/resident/profile");
  },

  updateProfile: (data) => {
    return apiClient.put("/resident/profile", data);
  },
};

export default ResidentProfileService;
