import axiosInstance from "./axiosInstance"

// AUTH
export const authAPI = {
  login: (credentials) => axiosInstance.post("/auth/login", credentials),
  register: (userData) => axiosInstance.post("/auth/register", userData),
  logout: () => axiosInstance.post("/auth/logout"),
  getProfile: () => axiosInstance.get("/auth/profile"),
}

// USERS
export const usersAPI = {
  getAll: (params) => axiosInstance.get("/users", { params }),
  getById: (id) => axiosInstance.get(`/users/${id}`),
  update: (id, data) => axiosInstance.put(`/users/${id}`, data),
  delete: (id) => axiosInstance.delete(`/users/${id}`),
}

// Add more API groups as needed
// export const productsAPI = { ... }
// export const ordersAPI = { ... }