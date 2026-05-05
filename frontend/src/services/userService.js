import API from "../api/axiosConfig";

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);