const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    donor_id: { type: mongoose.Schema.Types.ObjectId, ref: "donorDetails" }, // Reference to Donor
    request_date: { type: Date, default: Date.now },
    status: { type: String, enum: ["Pending", "Assigned", "Approved", "Completed"], default: "Pending" }, // ✅ Added "Approved"
    admin_assigned: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null } // Reference to Admin
});


module.exports = mongoose.model("Request", RequestSchema);


