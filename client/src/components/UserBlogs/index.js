import React, { useEffect, useState } from "react";
import Header from "../Header";
import Loader from "../Loader";
import BlogCard from "../BlogCard";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

const UserBlogs = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  // Initialize state variables
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const blogsPerPage = 3;
  const totalPages = Math.ceil(userBlogs.length / blogsPerPage);

  // Handle page change for pagination
  const handlePageChange = (e, v) => {
    setPage(v);
  };

  // Fetch user blogs data from API
  const getBlogs = async () => {
    try {
      const url = `http://localhost:8001/api/v1/blog/user-blogs/${id}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success === true) {
        setUserBlogs(data?.userBlogs.blogs);
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

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    getBlogs();
  }, []);

  return (
    <>
      <title>MyBlogs-BlogApp</title>
      <Header />
      <img
        src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg"
        className="main-img"
        alt="img"
      />
      <h1>My Blogs</h1>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="blogs-cont">
            {userBlogs.length === 0 ? (
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
              userBlogs
                .slice((page - 1) * blogsPerPage, page * blogsPerPage)
                .map((each) => <BlogCard blogDetails={each} key={each._id} />)
            )}
          </div>
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
            display: userBlogs.length === 0 ? "none" : "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            boxShadow: "none",
            marginTop: "40px",
          }}
        />
      </Stack>
    </>
  );
};

export default UserBlogs;
