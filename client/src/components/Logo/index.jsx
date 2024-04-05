import "./index.css";
import applogo from "../../applogo.png";

const Logo = () => (
  <div className="logo-cont">
    {/* Logo image */}
    <img src={applogo} alt="login" className="logo-img" />
    {/* Logo text */}
    <p className="logo-text">The Blog</p>
  </div>
);

export default Logo;
