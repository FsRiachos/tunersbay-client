import { apiRequest } from "../configs/apiMiddleware";

export default {
    getAll: () => apiRequest("GET", `/build`),
    getOne: (id) => apiRequest("GET", `/build/${id}`),
    create: (body) => apiRequest("POST", `/build`, body),
    update: (id, body) => apiRequest("PUT", `/build/${id}`, body),
    remove: (id) => apiRequest("DELETE", `/build/${id}`),
    reset: () => apiRequest("PATCH", `/build`),
};