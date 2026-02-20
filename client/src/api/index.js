import axios from "axios";

const API = axios.create({
  baseURL: "https://pizzahouse-a5kn.onrender.com/api",
});

// This interceptor mimics your Postman 'Authorization' tab automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;