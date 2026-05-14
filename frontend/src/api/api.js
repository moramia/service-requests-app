import axios from "axios";
import { TOKEN_KEY } from "../utils/authStorage";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = ({ email, password }) =>
  API.post("/auth/login", { email, password });

export const getRequests = () => API.get("/requests");

export const getRequest = (id) => API.get(`/requests/${id}`);

export const createRequest = ({ title, description, location, imageFile }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("location", location);
  if (imageFile) {
    formData.append("image", imageFile);
  }
  return API.post("/requests", formData);
};

export const deleteRequest = (id) => API.delete(`/requests/${id}`);

export const updateRequestStatus = (id, status) =>
  API.put(`/requests/${id}`, { status });
