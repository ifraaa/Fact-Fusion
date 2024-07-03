const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const router = require("./Routes/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/facts")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });
app.use("/", router);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
