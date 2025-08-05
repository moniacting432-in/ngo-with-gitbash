const express = require('express');
const { createRequest, getRequests, approveRequest, assignAdminToRequest, getAssignedRequests  } = require('../controller/requestcontroller.js'); 
const { verifyAdmin } = require("../middleware/authMiddleware.js"); 

const router = express.Router();

router.post('/create', createRequest);  
router.get('/', getRequests);  
router.put("/assign/:id", verifyAdmin, assignAdminToRequest);         
router.put("/:id/approve", verifyAdmin, approveRequest); 
router.get("/assigned", verifyAdmin, getAssignedRequests);

module.exports = router;




