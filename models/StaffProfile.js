const mongoose = require("mongoose");

const staffProfileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    enum: ["Doctor", "Physician", "Councellor"],
  },
  specialty: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  employer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("staffprofile", staffProfileSchema);
