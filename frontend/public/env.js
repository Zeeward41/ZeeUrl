// public/env.js
window._env_ = {
  VITE_BACKEND_API_URL: '${VITE_BACKEND_API_URL}' || import.meta.env.VITE_BACKEND_API_URL
}