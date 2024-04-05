import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { blogDetails } = props;
  const { image, title, description, createdAt, _id } = blogDetails;

  const currentDate = new Date(createdAt);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const createdDate = `${year}-${month}-${day}`;
  const createdTime = `${hours}:${minutes}`;

  return (
    <div className="blog-card">
      <Link to={`/get-blog/${_id}`}>
        <div>
          <img src={image} alt="blog img" className="blog-image" />
        </div>
        <div className="blog-content">
          <h2 className="blog-title">{title}</h2>

          <div className="heading-cont">
            <p className="author-name">{blogDetails.user.username}</p>
            <p className="created-date">{`${createdDate}  ${createdTime}`}</p>
          </div>

          <p className="blog-desc">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
