const express = require("express");
const app = express();
const dotenv = require("dotenv");
const chats = require("./data/data");

//this is use to enable env file
dotenv.config();

app.get("/", (req, res) => {
  res.send("hi there!");
});
app.get("/api/chat", (req, res) => {
  res.json(chats);
});
app.get("/user/chat", (req, res) => {
  // res.json(chats);
  res.send("hi there! You are User");
});

//req.params.id is used to get id for that we need to have
//our api as http://localhost:5000/:id

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
