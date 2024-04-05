// Importing necessary modules and components
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import UserBlogs from "./components/UserBlogs";
import DetailedPage from "./components/DetailedPage";
import NewBlog from "./components/NewBlog";
import EditBlog from "./components/EditBlog";
import NotFound from "./components/NotFound";

// Main App component
function App() {
  return (
    <div className="App">
      {/* Define routes for different components/pages */}
      <Routes>
        {/* Home Page Routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/all-blogs" element={<Home />} />

        {/* Authentication Routes */}
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />

        {/* User Blogs Routes */}
        <Route exact path="/user-blogs" element={<UserBlogs />} />
        <Route exact path="/create-blog" element={<NewBlog />} />
        <Route exact path="/update-blog/:id" element={<EditBlog />} />
        <Route exact path="/get-blog/:id" element={<DetailedPage />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
