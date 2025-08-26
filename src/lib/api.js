import axios from 'axios';

const RAW = import.meta.env.VITE_API_URL || '';
const BASE = RAW
  .replace(/\/+$/,'')   // quita / finales
  .replace(/\/api$/i,''); // quita /api si lo dejaste en la env

export const api = axios.create({
  baseURL: BASE,
  withCredentials: true
});

api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export const endpoints = {
  register: '/api/auth/register',
  login: '/api/auth/login',
};
