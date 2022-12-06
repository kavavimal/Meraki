'use strict';
const userDocumentService = require('../services/user-document.service');
const role = require("../constants/role");

exports.fetchAll = async (req, res) => {
    const { page = 1, limit = 10, } = req.query;
    try {
        const userDocuments = await userDocumentService.fetchAll(page, limit);
        if (!userDocuments.length) return res.status(200).json({
            status: res.statusCode,
            data: [],
            message: 'Fail to fetch list of user documents.'
        });
        return res.status(200).json({
            status: res.statusCode,
            data: userDocuments,
            message: 'User documents retrieve successfully'
        });
    } catch (error) {
        return res.status(500).json({status: res.statusCode, data: [], message: error.message});
    }
}

exports.fetchOne = async (req, res) => {
    try {
        const paySlip = await userDocumentService.fetchOne(req.params.id);
        if (!paySlip) return res.status(200).json({
            status: res.statusCode,
            data: null,
            message: 'paySlip not found',
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
        }
        const userDocument = await userDocumentService.create(req.files, req.body.employeeId);
        if (!userDocument) return res.status(400).json({status: res.statusCode, data: null, message: 'Fail to create user document!'});
        return res.status(201).json({status: res.statusCode, data: userDocument, message: 'User document create successfully'});
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
        const userDocument = await userDocumentService.delete(req.params.id);
        if (!userDocument) return res.status(200).json({status: res.statusCode, data: false, message: 'User document not found'});
        return res.status(200).json({status: res.statusCode, data: true, message: 'User document deleted successfully'});
    } catch (error) {
        return res.status(500).json({status: res.statusCode, data: false, message: error.message});
    }
}