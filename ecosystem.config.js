module.exports = {
  apps: [
    {
       name: 'entertainme - Client',
       script: './client && npm install && npm start',
    },
    {
      name: 'entertainme - Orchestrator',
      script: './server/orchestrator && npm install && nodemon app.js',
      env: {
        PORT: 4000
      },
    },
    {
      name: 'entertainme - Service Movies',
      script: './server/services/movies && npm install && nodemon app.js',
      env: {
        DATABASE_NAME: "entertainme",
        COLLECTION_NAME: "movies",
        PORT: 4001
      },
    },
    {
      name: 'entertainme - Service TV Series',
      script: './server/services/tvseries && npm install && nodemon app.js',
      env: {
        DATABASE_NAME: "entertainme",
        COLLECTION_NAME: "tvseries",
        PORT: 4002
      },
    },
  ],
};