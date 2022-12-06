'use strict';

const express = require('express');
const router = express.Router();
const {uploadHandler} = require('../utils/multer-config');
const PolicyController = require('../controllers/policy.controller');

module.exports = (app) => {
    router.get("/", PolicyController.fetchAll);
    router.post("/", uploadHandler.array('files'), PolicyController.create);
    router.get("/:id", PolicyController.fetchOne);
    router.delete("/:id", PolicyController.delete);
    app.use("/api/policy", router);
};