// Setup empty JS object to act as endpoint for all routes
const port = 3030;
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

app.listen(port, () => {
  console.log("server started");
});

app.post("/postData", (req, res) => {
  projectData = req.body;
  console.log(req.body);
});

app.get("/getData", (req, res) => {
  res.send(projectData);
});
