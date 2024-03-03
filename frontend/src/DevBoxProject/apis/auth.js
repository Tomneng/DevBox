import api from './api';
import Cookies from "js-cookie";

export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`)

export const info = () => api.get(`/user/info`);

export const register = (data) => api.post(`/user/register`, data);

export const update = (data) => api.put(`/user/update`, data);

export const remove = (userId) => api.delete(`/user/delete/${userId}`);

export const getDocs = (page) => api.get(`/myDoc/list/${page}`);

export const getKeyWords = () => api.get(`/myDoc/allKeyWords`)


// code Share
export const codeShareList = (sid) => api.get(`/codeshare/list`, sid);
export const codeShareWrite = (data) => api.post(`/codeshare/write`, data);
export const codeShareDetail = (sid) => api.get(`/codeshare/detail/${sid}`);
export const codeShareUpdate = (data) => api.put(`/codeshare/update`, data);
export const codeShareDelete = (sid) => api.delete(`/codeshare/delete/${sid}`);
// axios를 사용하여 profileWrite 함수를 수정합니다.
export const profileWrite = (data) => api.post(`/profile/write`, data);

export const profileUpdate = (data) => api.put(`/profile/update`, data);

export const profileDetail = (userId) => api.get(`/profile/detail/${userId}`);

export const profileList = () => api.get(`/profile/list`);

//  댓글
export const codeShareCommentList = (sid) => api.get(`/comment/list/${sid}`);
export const codeShareCommentWrite = (data) => api.post(`/comment/write`, data);
export const codeShareCommentDelete = (cid) => api.delete(`/comment/delete/${cid}`);

// 찜
export const plusSteam = (data) => api.post(`/steam/plus`, data);
export const deleteSteam = (shareId, userId) => api.delete(`/steam/delete/${shareId}/${userId}`);

export const getmyDoc = (docId) => api.get(`/myDoc/detail/${docId}`);

export const writeMyDoc = (myDoc) => api.post(`/myDoc/write`, myDoc)

export const updateMyDoc = (myDoc) => api.put('/myDoc/update', myDoc)

export const deleteMyDoc = (docId) => api.delete(`/myDoc/delete/${docId}`)
export const profileDelete = (userId) => api.delete(`/profile/delete/${userId}`);

export const skillAvg = () => api.get("/profile/writeAvg");

export const isToken = () =>{
    let accessToken = Cookies.get("Authorization")
    if (accessToken === null) {
        let refreshToken = Cookies.get("Authorization-refresh");
        api.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
    } else {
        console.log('Access token is still valid.');
    }
}