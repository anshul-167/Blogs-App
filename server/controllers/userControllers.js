const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')


//Signup User
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !password || !email) {
      return await res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return await res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //new user
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return await res
      .status(201)
      .send({ success: true, message: "New User registered", user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in Register Callback",
      success: false,
      error,
    });
  }
};

//Get All Users
exports.getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      usersCount: users.length,
      message: "All Users Data",
      users,
    });
  } catch (error) {
    console.log(error);
    return await res.status(500).send({
      success: false,
      message: "Error in Get All",
      error,
    });
  }
};

//Login User
exports.loginController = async (req,res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email not registered",
      });
    }
    //Password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).send({
        success: false,
        message: "Email or Password is invalid",
      });
    }
    const payload = {email:email}
    const jwtToken = jwt.sign(payload,"my_secret_key")
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      user,
      jwtToken
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login Controller",
      error
    });
  }
};
