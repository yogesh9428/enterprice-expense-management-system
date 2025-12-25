import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api", // your Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // your AuthGuard stores it
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
