require("rootpath")();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// call auth
const basicAuth = require('_helpers/basic-auth');
const errorHandler = require('_helpers/error-handler');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use('/users', require('./users/users.controller'));

// error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
    console.log(`server listening on port: ${port}`);
});