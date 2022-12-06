'use strict';
const UserService = require("../services/user.service");
const {removeFile} = require("../utils");
const {db} = require("../models")
const UserDocument = db.userDocument;


exports.fetchAll = async (page, limit) => UserDocument.find().skip((page - 1)).limit(limit);

exports.fetchOne = async (id) => UserDocument.findById(id);

exports.create = async (files, employeeId) => {
    const employee = await UserService.getUserById(employeeId);
    const userDocuments = [];

    for (const file of files) {
        const userDocument = new UserDocument();
        userDocument.name = file.filename;
        userDocument.originalName = file.originalname;
        userDocument.path = `${file.destination}/${file.filename}`;
        userDocument.size = file.size;
        userDocument.mimeType = file.mimetype;
        userDocument.directory = file.destination;
        userDocument.employee = employee;
        userDocuments.push(userDocument);
    }

    return UserDocument.create(userDocuments);
}

exports.delete = async (id) => {
    const userDocument = await UserDocument.findById(id);
    if(!userDocument) return;
    removeFile(userDocument?.path);
    return userDocument.delete();
}

exports.getUserDocumentByUserId = async (employee, page, limit) => UserDocument.find({employee}).skip((page - 1)).limit(limit);