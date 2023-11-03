const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  createdAt: {
    type: Date,
  },
});

const faqModel = mongoose.model("Faq", faqSchema);

module.exports = faqModel;
