const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Mongo Database ${mongoose.connection.host}`)
  } catch (error) {
    console.log(`MONGO Connect Error: ${error}`);
  }
};

module.exports = connectDB