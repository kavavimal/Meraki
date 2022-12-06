'use strict';
const policyService = require('../services/policy.service');
const role = require("../constants/role");

exports.fetchAll = async (req, res) => {
    const {page = 1, limit = 10,} = req.query;
    try {
        const policies = await policyService.fetchAll(page, limit);
        if (!policies.length) return res.status(200).json({
            status: res.statusCode,
            data: [],
            message: 'Policies not found.'
        });
        return res.status(200).json({
            status: res.statusCode,
            data: policies,
            message: 'Policies retrieve successfully'
        });
    } catch (e) {
        return res.status(500).json({status: res.statusCode, data: [], message: e.message});
    }
}

exports.fetchOne = async (req, res) => {
    try {
        const policy = await policyService.fetchOne(req.params.id);
        if (!policy) return res.status(200).json({
            status: res.statusCode,
            data: null,
            message: 'Policy not found.',
        });
        return res.status(200).json({status: res.statusCode, data: policy, message: 'Policy retrieve successfully'});
    } catch (e) {
        return res.status(500).json({status: res.statusCode, data: null, message: e.message});
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
        const policy = await policyService.create(req.files);
        if (!policy) return res.status(400).json({status: res.statusCode, data: null, message: 'Fail to create policy!'});
        return res.status(201).json({status: res.statusCode, data: policy, message: 'Policy create successfully'});
    } catch (e) {
        return res.status(500).json({status: res.statusCode, data: null, message: e.message});
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
        const policy = await policyService.delete(req.params.id);
        if (!policy) return res.status(200).json({status: res.statusCode, data: false, message: 'Policy not found'});
        return res.status(200).json({status: res.statusCode, data: true, message: 'Policy deleted successfully'});
    } catch (e) {
        return res.status(500).json({status: res.statusCode, data: false, message: e.message});
    }
}