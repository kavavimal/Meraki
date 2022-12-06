'use strict';

const mongoose = require("mongoose");

// Creating a Schema
const policySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Uploaded policy must have a name"],
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
},{ timestamps: true });

// Creating a Model from that Schema
const Policies = mongoose.model("Policies", policySchema);

// Exporting the Model to use it
module.exports = Policies;