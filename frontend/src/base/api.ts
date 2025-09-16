import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // supaya cookie refreshToken ikut terkirim
});

export default api;
