import axios from 'axios';
import { ApiResponse, User, Task, CreateUserRequest, UpdateUserRequest, CreateTaskRequest, UpdateTaskRequest, PaginatedResponse } from '@api-demo/shared';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// API 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Users API
export const usersApi = {
  getAll: () => api.get<ApiResponse<User[]>>('/users'),
  getById: (id: string) => api.get<ApiResponse<User>>(`/users/${id}`),
  create: (data: CreateUserRequest) => api.post<ApiResponse<User>>('/users', data),
  update: (id: string, data: UpdateUserRequest) => api.put<ApiResponse<User>>(`/users/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/users/${id}`),
};

// Tasks API
export const tasksApi = {
  getAll: (params?: { page?: number; limit?: number; userId?: string }) => 
    api.get<ApiResponse<PaginatedResponse<Task>>>('/tasks', { params }),
  getById: (id: string) => api.get<ApiResponse<Task>>(`/tasks/${id}`),
  create: (data: CreateTaskRequest) => api.post<ApiResponse<Task>>('/tasks', data),
  update: (id: string, data: UpdateTaskRequest) => api.put<ApiResponse<Task>>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/tasks/${id}`),
};
