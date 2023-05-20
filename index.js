require("dotenv").config();
const express = require("express");
const connectTodb = require("./connection")
const adminRouters = require('./Routers/AdminRoutes');
const cors = require('cors')
connectTodb()

// Port 
const port = process.env.PORT || 3000;

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"]
}))

// Middlewares 
app.use(express.json({ limit: "10mb" }));

// Routers 
app.use("/admin", adminRouters);

app.get("/", (req, res) => {
    res.send("This is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});