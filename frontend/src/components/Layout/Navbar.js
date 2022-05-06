import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { useAlert } from "react-alert";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from "../../actions/userAction";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";

function Navbar() {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [sidebar, setSidebar] = useState(false);
  const [keyword, setKeyword] = useState("");

  const showSidebar = () => setSidebar(!sidebar);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/movies/${keyword}`);
    } else {
      navigate("/movies");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, dispatch, alert]);

  return (
    <header>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="home-left">
            <Link to="#" className="menu-bars">
              <MenuIcon id="menubar-icon" onClick={showSidebar} />
            </Link>
            <Link to="/" className="navbar-logo">
              <h2 className="navbar-logo-title">IMDb</h2>
            </Link>
          </div>

          <div className="home-middle">
            <input
              type="text"
              className="searchInput"
              placeholder="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="searchButton" onClick={handleSearch}>
              <SearchIcon />
            </button>
          </div>
          <div className="home-right">
            {isAuthenticated ? (
              <div className="login-logout-box" onClick={handleLogout}>
                <ExitToAppIcon className="login-logout-logo" />
                <h1>Sign out</h1>
              </div>
            ) : (
              <div className="login-logout-box" onClick={handleLogin}>
                <ExitToAppIcon className="login-logout-logo" />
                <h1>Sign in</h1>
              </div>
            )}
          </div>
        </nav>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="close-icon-link">
                <CloseIcon id="close-icon" />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              {isAuthenticated ? (
                <Link to="/" onClick={handleLogout}>
                  <ExitToAppIcon />
                  <span>Sign out</span>
                </Link>
              ) : (
                <Link to="/login" onClick={handleLogin}>
                  <ExitToAppIcon />
                  <span>Sign in</span>
                </Link>
              )}
            </li>
            <li className="nav-text">
              <Link to="/about">
                <InfoIcon />
                <span>About</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </header>
  );
}

export default Navbar;
