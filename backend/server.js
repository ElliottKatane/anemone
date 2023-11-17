const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// routes import
const userRoutes = require("./routes/userRoute");
const verbRoutes = require("./routes/verbRoute");
//express app
const app = express();

// middleware
app.use(express.json());
require("dotenv").config({ path: "./config.env" });
app.use(
  cors({
    origin: ["https://anemone-alpha.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the 'public' folder

//routes
app.use("/api/user", userRoutes);
app.use("/api/verbs", verbRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });

// on essaye de dire bonjour
app.get("/", (req, res) => {
  res.json("Hello");
});

app.on("error", (err) => {
  console.error("Express server error:", err);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
