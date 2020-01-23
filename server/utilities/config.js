const dotenv = require('dotenv');
dotenv.config();

let environment = process.env.NODE_ENV;

let serverURLs = {
    "devlopment": {
        "NODE_SERVER": process.env.NODE_SERVER,
        "NODE_SERVER_PORT": process.env.NODE_SERVER_PORT,
        "MONGO_DB": process.env.MONGO_DB_URL
    },
}

let config = {
    "DB_URL": {
        "url": `${serverURLs[environment].MONGO_DB}`
    },
    "NODE_SERVER_PORT": {
        "port": `${serverURLs[environment].NODE_SERVER_PORT}`
    },
    "NODE_SERVER_URL": {
        "url": `${serverURLs[environment].NODE_SERVER}`
    }
};

module.exports = {
    config: config
};
