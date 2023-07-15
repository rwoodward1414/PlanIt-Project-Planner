const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./dataModel');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// <password> should be changed to actual password
mongoose.connect('mongodb+srv://rwoodward1414:<password>@projectplanner.5vbgcco.mongodb.net/API?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected!');
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});