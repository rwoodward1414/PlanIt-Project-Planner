const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
// const User = require('./dataModel');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authenticate = require('./authen');
const { createUser, logIn, verifyToken } = require('./auth');
const { createCategory, removeCategory, listCategory } = require('./category.js');
const { createProject, removeProject, addTask, listProject, completeTask, listTasks, organiseByDate } = require('./project');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get("/", function (req, res) {
  res.send("Hi");
});

// Creates a new account and stores a token in a cookie
app.post('/user/createAccount', async(req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await createUser(username, email, password);
    console.log(token);
    res.cookie("token", token, { httpOnly: true }).status(200).send({text: "Token sent!"});
  } catch (error) {
    res.status(400).send({error: error.message});
  }
});

// Logs user in and gives new token cookie
app.post('/user/login', async(req, res) => {
  try {
    const { username, password } = req.body;
    token = await logIn(username, password);
    res.cookie("token", token, { httpOnly: true }).status(200).send({text: "Token sent!"});
  } catch (error) {
    res.status(401).send({error: error.message});
  }
});

app.get('/user/logout', function (req, res) {
  res.clearCookie("token");
  res.redirect('/');
});

app.get('/test', authenticate, (req, res) => {
  console.log(req.user);
  res.send("Hello");
});

app.post('/category/create', authenticate, async(req, res) => {
  try {
    const { category } = req.body;
    await createCategory(req.user.userId, category);
    res.status(200).send({});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.delete('/category/delete', authenticate, async(req, res) => {
  try {
    const { category } = req.body;
    await removeCategory(req.user.userId, category);
    res.status(200).send("Category deleted");
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.get('/category', authenticate, async(req, res) => {
  try {
    const list = await listCategory(req.user.userId);
    res.send(list);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.post('/project/create', authenticate, async(req, res) => {
  try {
    const { name, category, date } = req.body;
    await createProject(req.user.userId, name, category, date);
    res.status(200).send({});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.delete('/project/delete', authenticate, async(req, res) => {
  try {
    const { id } = req.body;
    await removeProject(req.user.userId, id);
    res.status(200).send("Project removed");
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.post('/project/add', authenticate, async(req, res) => {
  try {
    const { id, name, date } = req.body;
    await addTask(id, name, date);
    res.status(200).send({});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

app.get('/project', authenticate, async(req, res) => {
  try {
    const list = await listProject(req.user.userId);
    res.send(list);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.get('/project/list', authenticate, async(req, res) => {
  try {
    const { id } = req.body;
    const list = await listTasks(id, req.user.userId);
    res.send(list);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.get('/tasks', authenticate, async(req, res) => {
  try {
    const list = await organiseByDate(req.user.userId);
    res.send(list);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});


app.put('/project/add', authenticate, async(req, res) => {
  try {
    const { id, name } = req.body;
    await completeTask(id, name);
    res.status(200).send("Task updated");
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

app.get('/user/me', authenticate, async(req, res) => {
  try {
    res.status(200).json(req.user.userId);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
})

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