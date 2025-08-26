import axios from 'axios';

const RAW = import.meta.env.VITE_API_URL || '';
const BASE = RAW.replace(/\/+$/,'');

export const api = axios.create({
  baseURL: BASE,
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
