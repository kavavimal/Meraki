'use strict';
const UserService = require("../services/user.service");
const {removeFile} = require("../utils");

const {db} = require("../models")
const PaySlip = db.payslip;


exports.fetchAll = async (page, limit) => PaySlip.find().skip((page - 1)).limit(limit);

exports.fetchOne = async (id) => PaySlip.findById(id);

exports.createOrUpdate = async (id, paySlipObj) => {
    let paySlip = new PaySlip();
    if(id){
        paySlip = await PaySlip.findById(id);
        if(!paySlip) return;
        removeFile(paySlip?.path);
    }
    paySlip.name = paySlipObj.filename;
    paySlip.originalName = paySlipObj.originalname;
    paySlip.path = `${paySlipObj.destination}/${paySlipObj.filename}`;
    paySlip.size = paySlipObj.size;
    paySlip.mimeType = paySlipObj.mimetype;
    paySlip.directory = paySlipObj.destination;
    paySlip.month = paySlipObj.month;
    paySlip.year = paySlipObj.year;
    paySlip.employee = await UserService.getUserById(paySlipObj.employeeId);
    return paySlip.save();
}

exports.delete = async (id) => {
    const paySlip = await PaySlip.findById(id);
    if(!paySlip) return;
    removeFile(paySlip?.path);
    return paySlip.delete();
}

exports.getPaySlipByUserId = async (employee, page, limit) => await PaySlip.find({employee}).skip((page - 1)).limit(limit);