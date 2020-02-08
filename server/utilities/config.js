"use strict";
const dotenv = require('dotenv');
dotenv.config();

let environment = process.env.NODE_ENV;

let serverURLs = {
    "development": {
        "NODE_SERVER": process.env.NODE_SERVER_DEVELOPMENT_URL,
        "NODE_SERVER_PORT": process.env.NODE_SERVER_PORT,
        "MONGO_DB": process.env.MONGO_DB_URL,
        "TOKEN_SECERET_KEY":process.env.TOKEN_SECRET_KEY
    },
    "production": {
        "NODE_SERVER": process.env.NODE_SERVER_PRODUCTION_URL,
        "NODE_SERVER_PORT": process.env.NODE_SERVER_PORT,
        "MONGO_DB": process.env.MONGO_DB_URL,
        "TOKEN_SECERET_KEY":process.env.TOKEN_SECRET_KEY
    },
};

let config = {
    "DB_URL": {
        "url": `${serverURLs[environment].MONGO_DB}`
    },
    "NODE_SERVER_PORT": {
        "port": `${serverURLs[environment].NODE_SERVER_PORT}`
    },
    "NODE_SERVER_URL": {
        "url": `${serverURLs[environment].NODE_SERVER}`
    },
    "TOKEN_SECRET": {
        "key": `${serverURLs[environment].TOKEN_SECERET_KEY}`
    }
};

module.exports = {
    config: config
};
