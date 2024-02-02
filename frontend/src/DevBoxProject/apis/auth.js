import api from './api';

export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`)

export const info = () => api.get(`/user/info`);

export const register = (data) => api.post(`/user/register`, data);

export const update = (data) => api.put(`/user/update`, data);

export const remove = (userId) => api.delete(`/user/delete/${userId}`);