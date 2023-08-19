const mongoose = require("mongoose");

const { Schema } = mongoose;

const advertisementSchema = new Schema({
  //Type of advertisement - Vacancy or Promotions
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

const advertisementModel = mongoose.model(
  "advertisements",
  advertisementSchema
);

module.exports = advertisementModel;
