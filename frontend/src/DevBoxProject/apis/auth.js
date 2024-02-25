import api from './api';


export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`)

export const info = () => api.get(`/user/info`);

export const register = (data) => api.post(`/user/register`, data);

export const update = (data) => api.put(`/user/update`, data);

export const remove = (userId) => api.delete(`/user/delete/${userId}`);

// axios를 사용하여 profileWrite 함수를 수정합니다.
export const profileWrite = (data) => api.post(`/profile/write`, data);

export const profileUpdate = (data) => api.put(`/profile/update`, data);

export const profileDetail = (userId) => api.get(`/profile/detail/${userId}`);

export const profileList = (data) => api.get(`/profile/list`, data);

export const profileDelete = (userId) => api.delete(`/profile/delete/${userId}`);

export const skillAvg = () => api.get("/profile/writeAvg");