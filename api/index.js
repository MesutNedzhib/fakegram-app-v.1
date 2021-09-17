const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase.js");
const routers = require("./routers");
const cors = require("cors");
const path = require("path");
const customErrorHandler = require("./middlewares/error/customErrorHandler.js");
const connectSocket = require("./helpers/socket/connectSocket.js");

const app = express();

// Express - Body Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});
const PORT = process.env.PORT;

// Connect MongoDB
connectDatabase();

// Routers Middleware
app.use("/api", routers);

// Error Handler
app.use(customErrorHandler);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

connectSocket();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  console.log(`App Started on PORT ${PORT} : 'http://localhost:${PORT}'`);
});
