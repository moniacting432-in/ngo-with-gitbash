
const express = require("express");
const User = require("../models/user");
const router = express.Router();

// create user

router.post("/",async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const user = new User({name,email,password});
        await user.save();
        res.status(201).json(user); 
    } catch(error){
        res.status(400).json({error:error.message});
    }
});

//read users
router.get("/",async(req,res)=>{
    const users = await User.find();
    res.json(users);
});

// update
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// delete
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;