import axios from 'axios';
import { User, Task, CreateUserRequest, UpdateUserRequest, CreateTaskRequest, UpdateTaskRequest, ApiResponse, PaginatedResponse } from '@api-demo/shared';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 用户 API
export const userApi = {
  getAll: () => api.get<ApiResponse<User[]>>('/users'),
  getById: (id: string) => api.get<ApiResponse<User>>(`/users/${id}`),
  create: (data: CreateUserRequest) => api.post<ApiResponse<User>>('/users', data),
  update: (id: string, data: UpdateUserRequest) => api.put<ApiResponse<User>>(`/users/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/users/${id}`),
};

// 任务 API
export const taskApi = {
  getAll: (params?: { page?: number; limit?: number; userId?: string }) => 
    api.get<ApiResponse<PaginatedResponse<Task>>>('/tasks', { params }),
  getById: (id: string) => api.get<ApiResponse<Task>>(`/tasks/${id}`),
  create: (data: CreateTaskRequest) => api.post<ApiResponse<Task>>('/tasks', data),
  update: (id: string, data: UpdateTaskRequest) => api.put<ApiResponse<Task>>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/tasks/${id}`),
};
