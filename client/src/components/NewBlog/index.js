import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./index.css";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userId");

  const [inputDetails, setInputDetails] = useState({
    title: "",
    image: "",
    description: "",
  });

  // Handle input changes
  const onChangeInput = (e) => {
    setInputDetails({
      ...inputDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const createNewBlog = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8001/api/v1/blog/create-blog";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...inputDetails, user }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success === true) {
      alert("Blog created Successfully!");
      navigate("/user-blogs");
    } else {
      alert(data.message);
    }
  };

  // Check for token on mount
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      <title>CreateBlog-BlogApp</title>
      <Header />
      <img
        src="https://www.zebrapen.com/cdn/shop/articles/Sarasa_Blog_header_1200x1200.jpg?v=1657036493"
        className="main-img"
        alt="img"
      />
      <h1>Create a new blog</h1>
      <div className="form-container">
        <form className="form" onSubmit={createNewBlog}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={inputDetails.title}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              required
              value={inputDetails.image}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="10"
              cols="50"
              required
              value={inputDetails.description}
              onChange={onChangeInput}
            ></textarea>
          </div>
          <button className="form-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBlog;
