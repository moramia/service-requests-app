import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getRequests = () => API.get("/requests");

export const getRequest = (id) => API.get(`/requests/${id}`);

export const createRequest = ({ title, description, location, userId, imageFile }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("location", location);
  formData.append("userId", userId);
  if (imageFile) {
    formData.append("image", imageFile);
  }
  return API.post("/requests", formData);
};

export const deleteRequest = (id) => API.delete(`/requests/${id}`);

export const updateRequestStatus = (id, status) =>
  API.put(`/requests/${id}`, { status });