#!/bin/sh
sed -i "s|\${VITE_BACKEND_API_URL}|$VITE_BACKEND_API_URL|g" /app/dist/env.js
sed -i "s|\${VITE_FRONTEND_URL}|$VITE_FRONTEND_URL|g" /app/dist/env.js
serve -s dist