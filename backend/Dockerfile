#utiliser une image Node.js officielle comme base
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers et dossiers du projet dans le répertoire de travail
COPY config ./config
COPY controllers ./controllers
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes
COPY test ./test
COPY utils ./utils
COPY server.js ./server.js

EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]