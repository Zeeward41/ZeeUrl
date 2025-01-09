export const API_BASE_URL = window._env_.VITE_BACKEND_API_URL;
export const WEB_SITE_URL = window._env_.VITE_FRONTEND_URL 
export const ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/v1/auth/register`,
  LOGIN: `${API_BASE_URL}/v1/auth/login`,
  CHECK_AUTH: `${API_BASE_URL}/v1/auth/check`,
  LOGOUT: `${API_BASE_URL}/v1/auth/logout`,
  GENERATE: `${API_BASE_URL}/v1/minify/generate`,
  GETURLS: `${API_BASE_URL}/v1/minify`,
  DELETEURLS: `${API_BASE_URL}/v1/minify`,
  UPDATEURLS: `${API_BASE_URL}/v1/minify`,
  REDIRECTURL: `${API_BASE_URL}/v1/minify`,
  STATSURL: `${API_BASE_URL}/v1/stats`
};

