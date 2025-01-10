
// window._env_ = (function () {
//     const env = '${VITE_NODE_ENV}'; // Placeholder remplacé en production via entrypoint.sh
  
//     if (env === 'development') {
//       // Environnement de développement : valeurs directement injectées
//       return {
//         VITE_NODE_ENV: 'development',
//         VITE_BACKEND_API_URL: '${VITE_BACKEND_API_URL}',
//         VITE_FRONTEND_URL: '${VITE_FRONTEND_URL}',
//       };
//     } else if (env === 'production') {
//       // Environnement de production : placeholders pour substitution
//       return {
//         VITE_NODE_ENV: 'production',
//         VITE_BACKEND_API_URL: '${VITE_BACKEND_API_URL}', // Substitué à l'exécution
//         VITE_FRONTEND_URL: '${VITE_FRONTEND_URL}',       
//       };
//     } else {
//       throw new Error(`Environnement inconnu : ${env}`);
//     }
//   })();