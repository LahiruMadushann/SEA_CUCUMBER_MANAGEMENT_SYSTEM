const mongoose = require("mongoose");
const { Schema } = mongoose;
const userModel = require("../model/user_model");

const faqSchema = new Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  link: {
    type: String,
  },
  //fisheries,aquafarming,general
  category: {
    type: String,
  },
  visibleToAll: {
    type: Boolean,
  },
  questionAskedByID: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
  createdAt: {
    type: Date,
  },
});

const faqModel = mongoose.model("Faq", faqSchema);

module.exports = faqModel;
