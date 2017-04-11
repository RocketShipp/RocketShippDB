'use strict';

var _ItemRoutes = require('./routes/ItemRoutes');

var _ItemRoutes2 = _interopRequireDefault(_ItemRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.Promise = global.Promise;
var MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(function () {
  return console.log('[mongoose] Connected to MongoDB');
}).catch(function () {
  return console.log('[mongoose] Error connecting to MongoDB');
});

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.sendFile('public/index.html');
});

var authenticationRoutes = require('./routes/AuthenticationRoutes');

app.use(bodyParser.json());
app.use(authenticationRoutes);

var authStrategy = passport.authenticate('authStrategy', { session: false });

app.use(authStrategy, _ItemRoutes2.default);

app.get('/rocketfaves', authStrategy, function (req, res) {
  res.send('' + req.user.username);
});

var port = process.env.PORT || 5007;
app.listen(port, function () {
  console.log('Listening on port:' + port);
});