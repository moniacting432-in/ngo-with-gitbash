const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true } // Ensuring this user is an admin
});

module.exports = mongoose.model("Admin", adminSchema);
