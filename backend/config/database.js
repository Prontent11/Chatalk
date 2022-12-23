const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected:${conn.connection.host}`.blue.bold.italic);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
