import Http from "./Http";

export const loginUser = (data) => Http.post("/u/login", data)
export const getUserTasks = (userId) => Http.get(`/task/u/${userId}`);
export const deleteTask = (taskId) => Http.delete(`/task/delTasks/${taskId}`);
export const updateTask = (taskId,data) => Http.put(`/task/updateTasks/${taskId}`,data);
export const addTask = (data) => Http.post(`/task/addTask`,data)
