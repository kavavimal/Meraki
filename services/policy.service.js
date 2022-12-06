'use strict';
const {removeFile} = require("../utils");
const {db} = require("../models")
const Policy = db.policy;


exports.fetchAll = async (page, limit) => Policy.find().skip((page - 1)).limit(limit);

exports.fetchOne = async (id) => Policy.findById(id);

exports.create = async (files) => {
    const policies = [];

    for (const file of files) {
        const policy = new Policy();
        policy.name = file.filename;
        policy.originalName = file.originalname;
        policy.path = `${file.destination}/${file.filename}`;
        policy.size = file.size;
        policy.mimeType = file.mimetype;
        policy.directory = file.destination;
        policies.push(policy);
    }
    return Policy.create(policies);
}

exports.delete = async (id) => {
    const policy = await Policy.findById(id);
    if(!policy) return;
    removeFile(policy?.path);
    return policy.delete();
}