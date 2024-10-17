# Utiliser une image Node.js officielle comme base
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers et dossiers du projet dans le répertoire de travail
COPY public ./public
COPY src ./src
COPY .env ./.env
COPY config.js ./config.js
COPY index.html ./index.html
COPY README.md ./README.md
COPY vite.config.js ./vite.config.js

EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]