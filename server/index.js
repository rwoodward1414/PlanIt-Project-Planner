const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./dataModel');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hi");
});

const PORT = process.env.PORT || 3001;


mongoose.connect(process.env.DB_CONN)
.then(() => {
  console.log('Connected!');
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});