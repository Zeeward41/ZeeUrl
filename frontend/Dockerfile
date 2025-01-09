# Étape de build
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de prod
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
RUN npm install -g serve
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
