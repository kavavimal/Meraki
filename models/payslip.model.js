'use strict';

const mongoose = require("mongoose");

// Creating a Schema
const paySlipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Uploaded payslip must have a name"],
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
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{ timestamps: true });

// Creating a Model from that Schema
const PaySlip = mongoose.model("PaySlip", paySlipSchema);

// Exporting the Model to use it
module.exports = PaySlip;