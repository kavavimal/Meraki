'use strict';

const mongoose = require("mongoose");

// Creating a Schema
const userDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Uploaded document must have a name"],
  },
  originalName: {
    type: String,
    required: [true],
  },
  path: {
    type: String,
    required: [true],
  },
  size: {
    type: String,
  },
  mimeType: {
    type: String,
  },
  directory: {
    type: String,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{ timestamps: true });

// Creating a Model from that Schema
const UserDocument = mongoose.model("UserDocument", userDocumentSchema);

// Exporting the Model to use it
module.exports = UserDocument;