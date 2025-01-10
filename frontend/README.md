# Environment Configuration

## Local Development Setup

1. Rename the `config.env` file to `.env`
2. The file should contain these environment variables:
```
VITE_BACKEND_API_URL=http://localhost:5002/api
VITE_FRONTEND_URL=http://localhost:3100
```

## Container Deployment

When running the application in a container, you need to provide two environment variables:
- `VITE_BACKEND_API_URL`: URL of your backend API
- `VITE_FRONTEND_URL`: URL of your frontend application

### Using Docker
```bash
docker run -e VITE_BACKEND_API_URL=http://your-api-url -e VITE_FRONTEND_URL=http://your-frontend-url your-image-name
```

### Using Kubernetes
Example ConfigMap:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  VITE_BACKEND_API_URL: "http://your-api-url"
  VITE_FRONTEND_URL: "http://your-frontend-url"
```

Then reference it in your deployment:
```yaml
spec:
  containers:
  - name: your-container
    envFrom:
    - configMapRef:
        name: app-config
```