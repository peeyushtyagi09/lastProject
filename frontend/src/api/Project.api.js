import api from "./api";

export const createProject = async (data) => {
    const res = await api.post("/project/create", data);
    return res.data;
}

export const listOfProject = async (data) => {
    const res = await api.get("/project/list", data);
    return res.data;
}

export default api;