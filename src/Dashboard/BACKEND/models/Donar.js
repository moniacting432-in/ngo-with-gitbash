const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  foodType: {
    type: String,
    trim: true, // Food type should not be required since money donations are allowed
  },
  quantity: {
    type: Number,
    default: 0, // Default to 0 if not provided
  },
  moneyDonation: { 
    type: Number, 
    default: 0  // Add this field to store money donations
  }
}, { timestamps: true });

const Donor = mongoose.model('donorDetails', donorSchema);
module.exports = Donor;
