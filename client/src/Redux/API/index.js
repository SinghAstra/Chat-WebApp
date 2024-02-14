import axios from "axios";
const API_URL = "http://localhost:5000/api/";

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const logInApi = (name, password) =>
  API.post(`/user/logIn`, {
    name,
    password,
  });

export const registerApi = (name, email, password) =>
  API.post(`/user/register`, { name, email, password });

export const fetchUsersApi = (searchQuery) =>
  API.get(`/user/fetchAllUser?search=${searchQuery}`);

export const createChatApi = (userId) => API.post("/chat", { userId });
