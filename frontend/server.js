const express = require("express");

const app = express();

const PORT = 3000;
const BACKEND_URL = "http://backend:5050";

// Serve files from the public folder
app.use(express.static("public"));


// Test Express itself
app.get("/api/frontend", (req, res) => {
    res.json({
        message: "Express Frontend is running!",
        status: "success"
    });
});


// Connect Express to Flask backend
app.get("/api/backend", async (req, res) => {

    try {

        const response = await fetch(
            `${BACKEND_URL}/api/hello`
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.error("Backend connection error:", error);

        res.status(500).json({
            message: "Unable to connect to Flask backend",
            status: "error"
        });
    }
});


// Start Express server
app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Express frontend running on http://localhost:${PORT}`
    );

});





