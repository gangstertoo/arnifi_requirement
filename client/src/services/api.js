import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => apiClient.post('/auth/signup', data),
  login: (data) => apiClient.post('/auth/login', data)
};

export const blogAPI = {
  getAllBlogs: (params) => apiClient.get('/blogs', { params }),
  getBlogById: (id) => apiClient.get(`/blogs/${id}`),
  createBlog: (data) => apiClient.post('/blogs', data),
  updateBlog: (id, data) => apiClient.put(`/blogs/${id}`, data),
  deleteBlog: (id) => apiClient.delete(`/blogs/${id}`),
  getUserBlogs: () => apiClient.get('/blogs/user/my-blogs')
};

export default apiClient;
