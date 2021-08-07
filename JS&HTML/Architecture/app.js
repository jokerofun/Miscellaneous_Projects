const express = require('express');
const path = require('path');

const envConfig = require('./config/env-config');
const initDb = require('./config/db-config');
const initMiddleware = require('./config/middleware-config');
const initViews = require('./config/views-config');
const initRoutes = require('./config/routes-config.js');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const environment = process.env.NODE_ENV || 'development';
const envOpts = envConfig[environment];
const app = express();


initMiddleware(app, envOpts.rootPath);
initViews(app, envOpts.rootPath);
initRoutes(app);


initDb(envOpts.dbConnectionStr)
  .then(() => {
    console.log('Successfully connected to database');
    app.listen(envOpts.port, () => {
      console.log(`Server running on pot ${envOpts.port}`);
    });
  })
  .catch(err => {
    console.error(err);
  });