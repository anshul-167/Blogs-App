import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

const EditBlog = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const params = useParams();
  const { id } = params;

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

  // Fetch existing blog data
  const getBlogDetails = async () => {
    const url = `http://localhost:8001/api/v1/blog/get-blog/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success === true) {
      setInputDetails({
        title: data.blog.title,
        image: data.blog.image,
        description: data.blog.description,
      });
    }
  };

  // Handle form submission
  const onClickUpdate = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8001/api/v1/blog/update-blog/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputDetails),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Blog Updated Successfully");
      navigate("/user-blogs");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };

  // Check for token and fetch blog details on mount
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    getBlogDetails();
  }, [id, navigate, token]);

  return (
    <>
      <title>UpdateBlog-BlogApp</title>
      <Header />
      <img
        src="https://www.zebrapen.com/cdn/shop/articles/Sarasa_Blog_header_1200x1200.jpg?v=1657036493"
        className="main-img"
        alt="img"
      />
      <h1>Update Blog</h1>
      <div className="form-container">
        <form className="form" onSubmit={onClickUpdate}>
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

export default EditBlog;
