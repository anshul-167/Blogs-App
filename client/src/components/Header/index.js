import "./index.css";
import { AppBar, Button, Toolbar, Box, Modal } from "@mui/material";
import { Link, useLocation,useNavigate } from "react-router-dom";

import Logo from "../Logo";

import * as React from "react";

import Typography from "@mui/material/Typography";

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

const Header = () => {
  const navigate = useNavigate();
  
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchInput, setSearchInput] = React.useState("");

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const location = useLocation();

  const closeModel = () => {
    setOpen(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
    }
  };

  const onClickLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundImage: "linear-gradient(to right, #0F2027,#203A43,#2C5364)",
        padding: "0 5vw 0 5vw",
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions for hover effect
        "&:hover": {
          transform: "scale(1.01)", // Scale up on hover
          boxShadow: "0px 0px 20px 10px #444343", // Glow effect on hover
        },
      }}
    >
      <Toolbar>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <div className="searchbox-cont">
              <input
                type="search"
                placeholder="Search Blogs"
                value={searchInput}
                onChange={onChangeSearch}
                className="searchbox"
                onKeyPress={handleKeyPress}
              />
            </div>
          )}

        {location.pathname !== "/create-blog" &&
          location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <Button
              sx={{
                margin: 1,
                color: "white",
                backgroundColor: "#2986cc", // Translucent background color
                "&:hover": {
                  backgroundColor: "#746e6e", // Translucent background color on hover
                },
              }}
              LinkComponent={Link}
              to="/create-blog"
            >
              Create Blog
            </Button>
          )}
        <Link to="/" className="logo-link-cont">
          <Logo />
        </Link>

        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              marginLeft="auto"
            >
              {location.pathname !== "/" &&
                location.pathname !== "/all-blogs" && (
                  <Button
                    sx={{
                      margin: 1,
                      color: "white",
                      backgroundColor: "orange", // Translucent background color
                      "&:hover": {
                        backgroundColor: "#746e6e", // Translucent background color on hover
                      },
                    }}
                    LinkComponent={Link}
                    to="/all-blogs"
                  >
                    Home
                  </Button>
                )}
              {location.pathname !== "/user-blogs/" && (
                <Button
                  sx={{
                    margin: 1,
                    color: "white",
                    backgroundColor: "orange", // Translucent background color
                    "&:hover": {
                      backgroundColor: "#746e6e", // Translucent background color on hover
                    },
                  }}
                  LinkComponent={Link}
                  to={`/user-blogs/`}
                >
                  My Blogs
                </Button>
              )}

              {location.pathname !== "/login" &&
                location.pathname !== "/register" && (
                  <>
                    <Button
                      onClick={handleOpen}
                      sx={{
                        margin: 1,
                        color: "white",
                        backgroundColor: "orange", // Translucent background color
                        "&:hover": {
                          backgroundColor: "#f44336", // Translucent background color on hover
                        },
                      }}
                    >
                      Logout
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
                          Are you sure you want to logout?
                        </Typography>
                        <Button onClick={onClickLogout}>Yes</Button>
                        <Button onClick={closeModel}>No</Button>
                      </Box>
                    </Modal>
                  </>
                )}
            </Box>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
