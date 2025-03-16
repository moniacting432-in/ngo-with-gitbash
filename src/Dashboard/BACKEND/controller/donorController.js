const Donor = require('../models/Donar');

// Get all donors
const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new donor
const createDonor = async (req, res) => {
  console.log("Create Donor API hit!")
  try {
    const { name, email, foodType, quantity, moneyDonation } = req.body;

    if (!name || !email || (!foodType && !moneyDonation) || (foodType && quantity <= 0) || (moneyDonation&& moneyDonation< 0)) {
      return res.status(400).json({ message: 'Invalid donation details' });
    }

    const newDonor = new Donor({ name, email, foodType, quantity, moneyDonation });
    await newDonor.save();

    res.status(201).json({ message: 'Donor added successfully', donor: newDonor });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// Update donor details
const updateDonor = async (req, res) => {
  try {
    const { foodType, quantity, moneyDonation } = req.body;  // ✅ Fix here
    
    if ((foodType && quantity <= 0) || (moneyDonation && moneyDonation < 0)) {
      return res.status(400).json({ message: 'Invalid update values' });
    }

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { foodType, quantity, moneyDonation },  // ✅ Now it updates correctly
      { new: true, runValidators: true }
    );

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json(donor);
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).json({ message: 'Failed to update donor details' });
  }
};


module.exports = { getAllDonors, createDonor,updateDonor };