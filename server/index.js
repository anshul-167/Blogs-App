const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const userRoutes = require("./routes/userRoutes.js");
const BlogRoutes = require('./routes/blogRoutes.js')


const app = express();

//dotenv
dotenv.config();

//connect MongoDb
connectDB();

const Port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/user", userRoutes);
app.use('/api/v1/blog', BlogRoutes)

app.listen(Port, () => {
  console.log(`Server running on ${process.env.DEV_MODE} at port ${Port}`);
});

