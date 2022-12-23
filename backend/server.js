const express = require("express");
const app = express();
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/database");
const colors = require("colors");
const userRoutes = require("./routes/user-routes");
const { notFound, errorHandler } = require("./middleware/error-middleware");

//this is use to enable env file
dotenv.config();
// express.json() is use for allowing app to accept JSON data
app.use(express.json());
// this is use to enable mongoDb in our app i.e connection
connectDB();
app.get("/", (req, res) => {
  res.send("hi there!");
});
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);
//req.params.id is used to get id for that we need to have
//our api as http://localhost:5000/:id

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`http://localhost:${PORT}`.yellow.bold));
