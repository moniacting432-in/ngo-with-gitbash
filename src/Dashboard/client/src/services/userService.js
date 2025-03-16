const mongoose = require('mongoose');

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://manisha:bacqTi7rMRcnmxes@ebanking.lz8ch.mongodb.net/?retryWrites=true&w=majority&appName=Ebanking';



// MongoDB Atlas connection string

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
};

// Define the Donor schema
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
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  moneyDonation: {  
    type: Number, 
    required: false,  // ✅ Optional field
    default: 0        // ✅ Default value
  }
});

// Create the Donor model
const Donor = mongoose.model('Donor', donorSchema);

// Save donor details to the database
const saveDonorDetails = async (donorData) => {
  try {
    const donor = new Donor(donorData);
    await donor.save();
    console.log('Donor details saved:', donor);
    return donor;
  } catch (error) {
    console.error('Error saving donor details:', error);
    throw error;
  }
};

// Get all donors from the database
const getDonorList = async () => {
  try {
    const donors = await Donor.find();
    return donors;
  } catch (error) {
    console.error('Error retrieving donor list:', error);
    throw error;
  }
};

module.exports = {
  connectDB,
  saveDonorDetails,
  getDonorList,
};