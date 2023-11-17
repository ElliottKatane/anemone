const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
// routes import
// Importez vos routes
const userRoutes = require(path.join(__dirname, "routes", "userRoutes"));
const verbRoutes = require(path.join(__dirname, "routes", "verbRoutes"));
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

//allow CORS https://vercel.com/guides/how-to-enable-cors?query=cors#understanding-cors
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

module.exports = allowCors(handler);

// ejs
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the 'public' folder

//routes
app.use("/api/user", userRoutes);
app.use("/api/verbs", verbRoutes);

// on essaye de dire bonjour
app.get("/blob", (req, res) => {
  res.json("Hello");
});
// test route
app.get("/test", (req, res) => {
  res.send("Test route works!");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
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
