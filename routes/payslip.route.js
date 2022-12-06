'use strict';

const express = require('express');
const router = express.Router();
const {uploadHandler} = require('../utils/multer-config');
const paySlipController = require('../controllers/payslip.controller');

module.exports = (app) => {
    router.get("/", paySlipController.fetchAll);
    router.post("/", uploadHandler.single('file'), paySlipController.create);
    router.get("/:id", paySlipController.fetchOne);
    router.patch("/:id", uploadHandler.single('file'), paySlipController.update);
    router.delete("/:id", paySlipController.delete);
    app.use("/api/payslip", router);
};