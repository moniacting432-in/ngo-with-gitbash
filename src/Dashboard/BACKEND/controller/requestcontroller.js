const Request = require("../models/Requests.js");
const Admin = require("../models/Admin.js");
const mongoose = require("mongoose"); // ✅ Import mongoose

exports.assignAdminToRequest = async (req, res) => {
    try {
        let requestId = req.params.id.trim();  // ✅ Trim extra spaces
        const adminId = req.admin.adminId;  

        console.log("Request ID Received:", `"${requestId}"`); // Debugging

        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ message: "Invalid request ID format" });
        }

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (request.admin_assigned) {
            return res.status(400).json({ message: "Request already assigned" });
        }

        request.admin_assigned = adminId;
        request.status = "Assigned";
        await request.save();

        res.json({ message: "Admin assigned successfully", request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// ✅ Create a new food request
exports.createRequest = async (req, res) => {
    try {
        const request = new Request(req.body);
        await request.save();
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get all requests (with donor details)
exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find()
            .populate("donor_id") // Populate donor details
            .populate("admin_assigned", "name email"); // Populate assigned admin details
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Assign an Admin to a Request
exports.assignAdminToRequest = async (req, res) => {
    try {
        let requestId = req.params.id.trim();  // ✅ Trim whitespace/newline
        const adminId = req.admin.adminId;  

        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ message: "Invalid request ID format" });
        }

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (request.admin_assigned) {
            return res.status(400).json({ message: "Request already assigned" });
        }

        request.admin_assigned = adminId;
        request.status = "Assigned";
        await request.save();

        res.json({ message: "Admin assigned successfully", request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Approve a request (Only assigned admin can approve)
exports.approveRequest = async (req, res) => {
    try {
        let requestId = req.params.id.trim();  // ✅ Trim to prevent newline issues
        const adminId = req.admin.adminId;  // ✅ Extract from JWT

        const request = await Request.findById(requestId);
        if (!request) return res.status(404).json({ message: "Request not found" });

        if (!request.admin_assigned || request.admin_assigned.toString() !== adminId) {
            return res.status(403).json({ message: "Forbidden: Only assigned admin can approve" });
        }

        if (request.status === "Approved") {
            return res.status(400).json({ message: "Request is already approved" });  // ✅ Prevent duplicate approvals
        }

        request.status = "Approved";
        await request.save();
        
        res.json({ message: "Request approved successfully", request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ✅ Get requests assigned to the logged-in admin
exports.getAssignedRequests = async (req, res) => {
    try {
        console.log("Inside getAssignedRequests API");  // ✅ Check if this logs
        console.log("Admin ID:", req.admin.adminId);

        const adminId = req.admin.adminId;

        const requests = await Request.find({ admin_assigned: adminId })
            .populate("donor_id"); 

        res.json({ requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

