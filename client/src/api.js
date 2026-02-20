import axios from "axios";

const API = axios.create({
  baseURL: "https://pizzahouse-a5kn.onrender.com/api"
});

export default API;