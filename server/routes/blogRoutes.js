const express = require("express");
const jwtToken = require("jsonwebtoken");

const {
  getAllBlogsController,
  createBlogController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
  getUserBlogsController,
  getBlogDetailsController,
} = require("../controllers/blogControllers");
const authenticateUser = require("../middleware");

const route = express.Router();

//Routes

//GET || All Blogs
route.get("/all-blogs",  getAllBlogsController);

//GET || Single Blog
route.get("/get-blog/:id", getSingleBlogController);

//POST || Create Blog
route.post("/create-blog", createBlogController);

//PUT || Update Blog
route.put("/update-blog/:id", updateBlogController);

//DELETE || Delete Blog
route.delete("/delete-blog/:id", deleteBlogController);

//GET || User Blogs
route.get("/user-blogs/:id", getUserBlogsController);

module.exports = route;
