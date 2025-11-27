import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = `Bearer ${token}`;
    }
    return config;
  },
  (e) => {
    Promise.reject(e);
  }
);
export default api;
