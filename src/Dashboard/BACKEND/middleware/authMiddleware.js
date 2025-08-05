const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Optional chaining to avoid errors

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Only admins can perform this action" });
    }

    req.admin = { adminId: decoded.adminId }; // Ensure adminId is attached

    console.log("Admin Verified:", req.admin); // ✅ Debugging line

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
