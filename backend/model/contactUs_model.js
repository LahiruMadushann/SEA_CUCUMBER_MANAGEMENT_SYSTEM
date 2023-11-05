const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactUsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  contactNo: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
  },

  replyed: {
    type: Boolean,
  },

  reply: {
    type: String,
  },

  commentDate: {
    type: Date,
    required: true,
  },
});

const contactUsModel = mongoose.model("ContactUs", contactUsSchema);

module.exports = contactUsModel;
