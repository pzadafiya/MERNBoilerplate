"use strict";

/**
 * Module dependencies.
 */

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const Route = require('./routes');
const config = require("./utilities/config").config;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./utilities/mongooseConfig')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use('/api', Route);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
});


/**
 * Start Express server.
 */
server.listen(config.NODE_SERVER_PORT.port, () => {
  console.log('app listening on port:' + config.NODE_SERVER_PORT.port);
});
