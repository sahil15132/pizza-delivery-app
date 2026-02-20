import axios from "axios";

const API = axios.create({
  baseURL: "https://pizzahouse-a5kn.onrender.com"
});

export default API;