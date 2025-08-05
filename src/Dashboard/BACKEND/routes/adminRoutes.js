const express = require("express");
const {  registerAdmin, adminLogin } = require("../controller/adminController.js");
const router = express.Router();

router.post("/register",registerAdmin) // Register admin (Only for first time)
router.post("/login", adminLogin); // Admin login

module.exports = router;
