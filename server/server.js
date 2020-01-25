/**
 * Module dependencies.
 */
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
var User = require('./models/User')

const mongoose = require('./utilities/mongooseConfig')();

const Route = require('./routes');
const config = require("./utilities/config").config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, "client/build")))

app.use(cors());

app.use((err, req, res, next) => {
  return res.send({
    "statusCode": 401,
    "statusMessage": "Something went wrong"
  });
});

// app.put()
// app.delete()
// app.get('/users/:id', authService.login)
// app.post()

app.use('/api', Route);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next();
});

/**
 * Start Express server.
 */
server.listen(config.NODE_SERVER_PORT.port, () => {
  console.log('app listening on port:' + config.NODE_SERVER_PORT.port);
});
