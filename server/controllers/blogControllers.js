const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const { use } = require("../routes/userRoutes");

//Get All Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(400).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "All Blogs List",
      blogsCount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getAllBlogs Controller",
      error,
    });
  }
};

//GET Single Blog By Id
exports.getSingleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).populate("user");
    if (!blog) {
      return res.status(400).send({
        success: false,
        message: "Can't find any blog with this id",
      });
    }
    return res.status(201).send({
      success: true,
      message: "Fetched blog succesfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getSingleBlog controller",
      error,
    });
  }
};

//POST || Create New Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const newBlog = new blogModel({ title, description, image, user });
    const existingUser = await userModel.findById(user);
    //validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user with this Id",
      });
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();

    return res.status(201).send({
      success: true,
      message: "New Blog created successfully!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Creating Blog",
      error,
    });
  }
};

//PUT || Update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog updated successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Updating Blog",
      error,
    });
  }
};

// Delete a Blog by Id
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findOneAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(202).send({
      success: true,
      message: "Blog deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Deleting Blog",
      error,
    });
  }
};

//Get User Blogs
exports.getUserBlogsController = async (req, res) => {
  try {
    const userBlogs = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlogs) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found for this userId",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blogs",
      userBlogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Getting User blogs",
      error,
    });
  }
};
