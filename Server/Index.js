const express = require("express");
const { DatabaseCon } = require("./Config/DB")
const cors = require("cors")
const userRoute = require("./Route/UserRoute")
const  chatRoute = require("./Route/ChatRoute")
const messageRoute = require("./Route/MessageRoute")
const adminRoute = require('./Route/Admin.js')
const app = express();
const PORT = 5000;
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // Enable CORS credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204,  // Respond with 204 No Content for preflight requests
  };
  
app.use(cors(corsOptions));


app.use("/Admin",adminRoute)
app.use("/User",userRoute)
app.use("/Chat",chatRoute)
app.use("/Message",messageRoute)
// Start the HTTP server
app.listen(PORT, () => {
    console.log("Server started at", PORT);
});
