import mongoose from "mongoose";

const Connection = async (username, password) => {
  const Url = `mongodb+srv://${username}:${password}@blogs-app.ouwpgob.mongodb.net/?retryWrites=true&w=majority&appName=blogs-app`;
  try {
    await mongoose.connect(Url);
    console.log("Database connected successfully");
  } catch (e) {
    console.log(`Error while running database:${e}`);
  }
};

export default Connection;
