require('dotenv').config();
import ItemRoutes from './routes/ItemRoutes';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/RocketShippDB')
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

const authenticationRoutes = require('./routes/AuthenticationRoutes');

app.use(bodyParser.json());
app.use(authenticationRoutes);

const authStrategy = passport.authenticate('authStrategy', { session: false });

app.use(ItemRoutes);

app.get('/rocketfaves', authStrategy, function (req, res) {
  res.send(`${req.user.username}`);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
