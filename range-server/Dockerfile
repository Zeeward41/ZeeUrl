# Utiliser une image Node.js officielle comme base
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers et dossiers du projet dans le répertoire de travail
COPY controllers ./controllers
COPY routes ./routes
COPY server.js ./
COPY test ./test
COPY utils ./utils
COPY config ./config

# Exposer le port sur lequel le serveur s'exécute
EXPOSE 8000

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]