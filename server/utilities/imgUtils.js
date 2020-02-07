"use strict";

const multer = require('multer');
const path = require('path');

//The disk storage engine gives you full control on storing files to disk.
const Storage = multer.diskStorage({
    // destination is used to determine within which folder the uploaded files should be stored.
    destination: (req, file, cb) => {
        cb(null, "../client/public/users");
    },
    filename: (req, file, cb) => {
        // req.files is an object (String -> Array) where fieldname is the key, and name specified in the form
        // file.originalname is Name of the file on the user's computer
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const uploadMiddleware = multer({
    storage: Storage
}).single('userImage');

module.exports = uploadMiddleware;
