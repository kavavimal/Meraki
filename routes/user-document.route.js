'use strict';

const express = require('express');
const router = express.Router();
const {uploadHandler} = require('../utils/multer-config');
const UserDocumentController = require('../controllers/user-documents.controller');

module.exports = (app) => {
    router.get("/", UserDocumentController.fetchAll);
    router.post("/", uploadHandler.array('files'), UserDocumentController.create);
    router.get("/:id", UserDocumentController.fetchOne);
    router.delete("/:id", UserDocumentController.delete);
    app.use("/api/user-document", router);
};