export const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api/v1';
export const ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/v1/auth/register`,
  LOGIN: `${API_BASE_URL}/v1/auth/login`,
  CHECK_AUTH: `${API_BASE_URL}/v1/auth/check`
};

