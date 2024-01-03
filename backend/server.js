const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
// routes import
// Importez vos routes
const userRoutes = require(path.join(__dirname, "routes", "userRoute"));
const verbRoutes = require(path.join(__dirname, "routes", "verbRoute"));
//express app
const app = express();

// middleware
app.use(express.json());

require("dotenv").config({ path: "./config.env" });
// require("dotenv").config();
app.use(cors());

// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.static("public")); // Serve static files from the 'public' folder

//routes
app.use("/api/user", userRoutes);
app.use("/api/verbs", verbRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });

app.on("error", (err) => {
  console.error("Express server error:", err);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
