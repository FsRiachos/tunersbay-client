import { apiRequest } from "../configs/apiMiddleware";

export default {
    register: (body) => apiRequest("POST", "/user/register", body),
    login: (body) => apiRequest("POST", "/user/login", body),
    getBuilds: () => apiRequest("GET", "/user/build"),
    addBuild: (buildId) => apiRequest("POST", `/user/build/${buildId}`),
    removeBuild: (buildId) => apiRequest("DELETE", `/user/build/${buildId}`),
};
