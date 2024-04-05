import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Loader from "../Loader";
import { Box, Button, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./index.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailedPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [blogDetails, setBlogDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const closeModel = () => {
    setOpen(false);
  };

  const getBlogDetails = async () => {
    const url = `http://localhost:8001/api/v1/blog/get-blog/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data?.success === true) {
      setBlogDetails(data.blog);
      setLoading(false);
    } else {
      setLoading(false);
      return <Typography>Error Loading Blogs!</Typography>;
    }
  };

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    getBlogDetails();
  }, []);

  const currentDate = new Date(blogDetails.createdAt);
  const updatedDate = new Date(blogDetails.updatedAt);
  const year = currentDate.getFullYear();
  const updatedYear = updatedDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const updatedMonth = String(updatedDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const updatedDay = String(updatedDate.getDate()).padStart(2, "0");

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const updatedHours = String(updatedDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const updatedMinutes = String(updatedDate.getMinutes()).padStart(2, "0");

  const createdDate = `${year}/${month}/${day}`;
  const createdTime = `${hours}:${minutes}`;

  const updateDate = `${updatedYear}/${updatedMonth}/${updatedDay}`;
  const updatedTime = `${updatedHours}:${updatedMinutes}`;

  const deleteBlog = async () => {
    const url = `http://localhost:8001/api/v1/blog/delete-blog/${id}`;
    const options = { method: "DELETE" };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!data.success) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate("/");
    } catch (error) {
      console.error("There was a problem with the DELETE request:", error);
      alert(
        "There was a problem deleting the blog post. Please try again later."
      );
    }
  };

  const editBlog = () => {
    navigate(`/update-blog/${id}`);
  };

  const renderBlogDetails = () => (
    <>
    <title>DetailedPage-BlogApp</title>
      <img src={blogDetails.image} alt="Blog" className="bd-img" />
      <div className="bd-cont">
        <div className="bd-title-cont">
          <p className="bd-title">{blogDetails.title}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <>
              <Button
                onClick={handleOpen}
                sx={{
                  margin: 1,
                  color: "white",

                  "&:hover": {
                    backgroundColor: "#f44336",
                  },
                }}
              >
                <DeleteIcon /> Delete Blog
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Are you sure you want to delete this Blog?
                  </Typography>
                  <Button onClick={deleteBlog}>Yes</Button>
                  <Button onClick={closeModel}>No</Button>
                </Box>
              </Modal>
            </>
            <Button
              onClick={editBlog}
              sx={{
                margin: 1,
                color: "white",
              }}
            >
              <EditIcon /> Edit Blog
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>by</span>
          <p className="bd-user">{blogDetails.user.username}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Created :</span>
          <p className="bd-time">{`${createdTime}, ${createdDate}`}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Updated :</span>
          <p className="bd-time">{`${updatedTime}, ${updateDate}`}</p>
        </div>
        <hr />
        <p className="bd-description">{blogDetails.description}</p>
        <hr />
      </div>
    </>
  );

  return (
    <>
      <Header />

      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="bd-main-cont">{renderBlogDetails()}</div>
        )}
      </div>
    </>
  );
};

export default DetailedPage;
