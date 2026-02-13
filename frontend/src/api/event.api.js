import api from "./api";
import { getToken } from "../utils/token";

api.interceptors.request.use((req) =>{
    const token = getToken();
    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const ingestEvent = async (projectId, data) => {
    const res = await api.post(`/events/ingest/${projectId}`, data);
    return res.data;
}

export default api;