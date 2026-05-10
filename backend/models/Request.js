const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    userId: {
    type: String,
    required: true
  },
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "submitted"
  },
  image: String,
  masterComment: String
}, {
  timestamps: true
});

module.exports = mongoose.model("Request", requestSchema);