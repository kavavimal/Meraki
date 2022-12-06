'use strict';
const paySlipService = require('../services/payslip.service');
const role = require("../constants/role");

exports.fetchAll = async (req, res) => {
    const {page = 1, limit = 10,} = req.query;
    try {
        const paySlips = await paySlipService.fetchAll(page, limit);
        if (!paySlips) return res.status(200).json({
            status: res.statusCode,
            data: [],
            message: 'PaySlips not found'
        });
        return res.status(200).json({
            status: res.statusCode,
            data: paySlips,
            message: 'PaySlips retrieve successfully'
        });
    } catch (error) {
        return res.status(500).json({status: res.statusCode, data: [], message: error.message});
    }
}

exports.fetchOne = async (req, res) => {
    try {
        const paySlip = await paySlipService.fetchOne(req.params.id);
        if (!paySlip) return res.status(200).json({
            status: res.statusCode,
            data: null,
            message: 'PaySlip not found',
        });
        return res.status(200).json({status: res.statusCode, data: paySlip, message: 'PaySlip retrieve successfully'});
    } catch (error) {
        return res.status(500).json({status: res.statusCode, data: null, message: error.message});
    }
}

exports.create = async (req, res) => {
    try {
        if (!req.role.some(e => [role.admin.id, role.humanresource.id].includes(e))) {
            return res.status(401).json({
                status: res.statusCode,
                data: [],
                message: 'You have no permission to access this feature!'
            });
            ;
        }

        const paySlip = await paySlipService.createOrUpdate(null, {...req.file, ...req.body});
        if (!paySlip) return res.status(400).json({status: res.statusCode, data: null, message: 'Fail to created'});
        return res.status(201).json({status: res.statusCode, data: paySlip, message: 'PaySlip created successfully'});
    } catch (error) {
        return res.status(500).json({status: res.statusCode, data: null, message: error.message});
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.role.some(e => [role.admin.id, role.humanresource.id].includes(e))) {
            return res.status(401).json({
                status: res.statusCode,
                data: [],
                message: 'You have no permission to access this feature!'
            });
        }
        const paySlip = await paySlipService.createOrUpdate(req.params.id, {...req.file, ...req.body});
        if (!paySlip) return res.status(400).json({status: res.statusCode, data: null, message: 'Fail to update paySlip'});
        return res.status(200).json({status: res.statusCode, data: paySlip, message: 'PaySlip updated successfully'});
    } catch (error) {
        return res.status(500).json({status: res.statusCode, data: null, message: error.message});
    }
}

exports.delete = async (req, res) => {
    try {
        if (!req.role.some(e => [role.admin.id, role.humanresource.id].includes(e))) {
            return res.status(401).json({
                status: res.statusCode,
                data: false,
                message: 'You have no permission to access this feature!'
            });
        }
        const paySlips = await paySlipService.delete(req.params.id);
        if (!paySlips) return res.status(200).json({status: res.statusCode, data: false, message: 'PaySlip not found'});
        return res.status(200).json({status: res.statusCode, data: true, message: 'PaySlip deleted successfully'});
    } catch (error) {
        return res.status(500).json({status: res.statusCode, data: false, message: error.message});
    }
}