import Http from "./Http";

export const loginUser = (data) => Http.post("/u/login", data);
export const registerUser = (data) => Http.post("/u/register", data);
export const getUserTasks = (id, config) => Http.get(`/task/u/${id}`, config);
export const deleteTask = (id, data) => Http.post(`/task/delTasks/${id}`, data);
export const updateTask = (id, data) => Http.put(`/task/updateTasks/${id}`, data);
export const addTask = (data) => Http.post(`/task/addTask`, data);
export const resultTask = (id,config) => Http.get(`/result/${id}`, config);
export const searchTask = (data) => Http.get(`/task/search`, data);
export const addResultTask = (id, data) => Http.post(`/result/${id}`, data);
export const saveEditResult = (id, data) => Http.put(`result/update/${id}`, data);
export const deleteResult = (id) => Http.delete(`result/${id}`);