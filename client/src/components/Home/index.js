import React, { useEffect, useState } from "react";
import Header from "../Header";
import Loader from "../Loader";
import BlogCard from "../BlogCard";
import { Button, Pagination, Stack } from "@mui/material";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Initialize state variables
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const blogsPerPage = 4;

  // Calculate total pages based on the number of blogs
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Handle page change for pagination
  const handlePageChange = (e, v) => {
    setPage(v);
  };

  // Fetch blogs data from API
  const getBlogs = async () => {
    try {
      const url = "http://localhost:8001/api/v1/blog/all-blogs";
      const response = await fetch(url);
      const data = await response.json();

      if (data.success === true) {
        setBlogs(data.blogs);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Error Loading Blogs:", data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setLoading(false);
    }
  };

  // Check token and fetch blogs data on component mount
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    getBlogs();
  }, []);

  return (
    <>
      <title>Home-BlogApp</title>
      <Header />
      <img
        src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
        alt="img"
        className="main-img"
      />
      <h1>All Blogs</h1>
      <div className="blogs-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            {blogs.length === 0 ? (
              <div className="no-blogs-container">
                <h1 className="no-blogs-heading">No Blogs Yet</h1>
                <Button
                  sx={{
                    margin: "auto",
                    color: "white",
                    backgroundColor: "transparent",
                    border: "solid 1px white",
                    "&:hover": {
                      color: "#2986cc",
                      backgroundColor: "white",
                    },
                  }}
                  component={Link}
                  to="/create-blog"
                >
                  Create New Blog
                </Button>
              </div>
            ) : (
              <div className="blogs-cont">
                {blogs
                  .slice((page - 1) * blogsPerPage, page * blogsPerPage)
                  .map((each) => (
                    <BlogCard blogDetails={each} key={each._id} id={each._id} />
                  ))}
              </div>
            )}
          </>
        )}
      </div>
      <Stack>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{
            backgroundColor: "orange",
            height: "30px",
            display: blogs.length === 0 ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            boxShadow: "none",
            marginTop: "40px",
          }}
        ></Pagination>
      </Stack>
    </>
  );
};

export default Home;
