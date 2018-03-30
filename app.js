"use strict";

require('./models/schema');
require("log-timestamp");

const config = require('config');
const redis = require('./helpers/redis');
const websockets = require('./helpers/websockets');

const http = require('http');
const path = require('path');

const _ = require('underscore');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const swig = require('swig');
const i18n = require('i18n-2');
const helmet = require('helmet');

const express = require('express');
const app = express();
const serveStatic = require('serve-static');

const isProduction = app.get('env') === 'production';

console.log("Booting Spacedeck Open… (environment: " + app.get('env') + ")");

app.use(logger(isProduction ? 'combined' : 'dev'));

i18n.expressBind(app, {
  locales: ["en", "de", "fr"],
  defaultLocale: "en",
  cookieName: "spacedeck_locale",
  devMode: (app.get('env') == 'development')
});

swig.setDefaults({
  varControls: ["[[", "]]"] // otherwise it's not compatible with vue.js
});

swig.setFilter('cdn', function(input, idx) {
  return input;
});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

if (isProduction) {
  app.set('views', path.join(__dirname, 'build', 'views'));
  app.use(favicon(path.join(__dirname, 'build', 'assets', 'images', 'favicon.png')));
  app.use(express.static(path.join(__dirname, 'build', 'assets')));
} else {
  app.set('views', path.join(__dirname, 'views'));
  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
  app.use(express.static(path.join(__dirname, 'public')));
}

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));

app.use(cookieParser());
app.use(helmet.frameguard())
app.use(helmet.xssFilter())
app.use(helmet.hsts({
  maxAge: 7776000000,
  includeSubdomains: true
}))
app.disable('x-powered-by');
app.use(helmet.noSniff())

// CUSTOM MIDDLEWARES

app.use(require("./middlewares/templates"));
app.use(require("./middlewares/error_helpers"));
app.use(require("./middlewares/setuser"));
app.use(require("./middlewares/cors"));
app.use(require("./middlewares/i18n"));
app.use("/api", require("./middlewares/api_helpers"));
app.use('/api/spaces/:id', require("./middlewares/space_helpers"));
app.use('/api/spaces/:id/artifacts/:artifact_id', require("./middlewares/artifact_helpers"));
app.use('/api/teams', require("./middlewares/team_helpers"));

// REAL ROUTES

app.use('/api/users', require('./routes/api/users'));
app.use('/api/memberships', require('./routes/api/memberships'));

const spaceRouter = require('./routes/api/spaces');
app.use('/api/spaces', spaceRouter);

spaceRouter.use('/:id/artifacts', require('./routes/api/space_artifacts'));
spaceRouter.use('/:id/memberships', require('./routes/api/space_memberships'));
spaceRouter.use('/:id/messages', require('./routes/api/space_messages'));
spaceRouter.use('/:id/digest', require('./routes/api/space_digest'));
spaceRouter.use('/:id', require('./routes/api/space_exports'));

app.use('/api/sessions', require('./routes/api/sessions'));
app.use('/api/teams', require('./routes/api/teams'));
app.use('/api/webgrabber', require('./routes/api/webgrabber'));
app.use('/', require('./routes/root'));

if (config.get('storage_local_path')) {
  app.use('/storage', serveStatic(config.get('storage_local_path')+"/"+config.get('storage_bucket'), {
    maxAge: 24*3600
  }));
}

// catch 404 and forward to error handler
app.use(require('./middlewares/404'));
if (app.get('env') == 'development') {
  app.set('view cache', false);
  swig.setDefaults({cache: false});
} else {
  app.use(require('./middlewares/500'));
}

module.exports = app;

// CONNECT TO DATABASE
const mongoHost = process.env.MONGO_PORT_27017_TCP_ADDR || config.get('mongodb_host');
mongoose.connect('mongodb://' + mongoHost + '/spacedeck');

// START WEBSERVER
const port = 9666;

const server = http.Server(app).listen(port, () => {
  
  if ("send" in process) {
    process.send('online');
  }

}).on('listening', () => {
  
  const host = server.address().address;
  const port = server.address().port;
  console.log('Spacedeck Open listening at http://%s:%s', host, port);

}).on('error', (error) => {

  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

//WEBSOCKETS & WORKER
websockets.startWebsockets(server);
redis.connectRedis();

process.on('message', (message) => {
  console.log("Process message:", message);
  if (message === 'shutdown') {
    console.log("Exiting spacedeck.");
    process.exit(0);
  }
});
