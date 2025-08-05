const Admin = require("../models/Admin.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register a new admin (For first-time setup)
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin Login
exports.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find admin by email
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: "Invalid credentials" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate JWT Token
      const token = jwt.sign(
        { adminId: admin._id, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ token, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
