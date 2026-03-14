import apiClient from "./apiclient";

const AdminService = {
  getUsers: (params = {}) => {
    return apiClient.get("/admin/users", { params });
  },

  createUser: (data) => {
    return apiClient.post("/admin/users", data);
  },

  updateUser: (id, data) => {
    return apiClient.put(`/admin/users/${id}`, data);
  },

  updateUserStatus: (id, isActive) => {
    return apiClient.patch(`/admin/users/${id}/status`, { is_active: isActive });
  },

  deleteUser: (id) => {
    return apiClient.delete(`/admin/users/${id}`);
  },
};

export default AdminService;
