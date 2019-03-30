'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _httpProxyMiddleware = require('http-proxy-middleware');

var _httpProxyMiddleware2 = _interopRequireDefault(_httpProxyMiddleware);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _default = require('./config/default');

var _default2 = _interopRequireDefault(_default);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _getParse = require('./getParse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
const winston = require('winston');
const expressWinston = require('express-winston');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const exphbs = require('express-handlebars');

const app = (0, _express2.default)();
// parse application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse application/json
app.use(_bodyParser2.default.json());

mongoose.connect(process.env.database, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open ');
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

require('./authentication').init(app);

(0, _getParse.seed)();

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    autoRemove: 'interval',
    autoRemoveInterval: 120
  }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 6000000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: _path2.default.join(__dirname, 'views'),
  partialsDir: _path2.default.join(__dirname)
}));

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const { buildConfig: { assetsDir, targetDir }, server: { port }, proxyAssets } = _default2.default;

app.use('/api2', (0, _httpProxyMiddleware2.default)({ target: 'https://api.priceva.com/api/v1/product/list', changeOrigin: true }));

if (_default2.default.appModeDev) {
  app.use(`/${assetsDir}`, (0, _httpProxyMiddleware2.default)({ target: `http://${proxyAssets.host}:${proxyAssets.port}`, changeOrigin: true }));
} else {
  app.use(`/${assetsDir}`, _express2.default.static(_path2.default.join(process.cwd(), targetDir, 'client')));
}

app.use(expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.json()),
  meta: true,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false
}));

app.use('/api', _router2.default);
app.use('/user', _user2.default);

app.use('*', (req, res) => {
  const template = _handlebars2.default.compile(_fs2.default.readFileSync(_path2.default.join(__dirname, 'index.hbs'), 'utf8'));
  const context = {
    title: 'GoodPrice'
  };
  res.send(template(context));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));