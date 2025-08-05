const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes.js");
const donorRoutes = require("./routes/donorRoutes.js");
const requestRoutes = require("./routes/requestRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js"); // Import Admin Routes

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes); // Register Admin Routes


// Port Setup
const PORT = process.env.PORT || 8000;
console.log("Checking registered routes:");
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(Object.keys(middleware.route.methods).join(", ").toUpperCase(), middleware.route.path);
    } else if (middleware.name === "router") {
        middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log(Object.keys(handler.route.methods).join(", ").toUpperCase(), handler.route.path);
            }
        });
    }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
