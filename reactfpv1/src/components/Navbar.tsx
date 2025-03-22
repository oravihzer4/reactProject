import { FunctionComponent, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext, ThemeContextType } from "../context/ThemeContext";
import { errorMassage } from "../Services/FeedbackService";

const Navbar: FunctionComponent = () => {
  const { user, logout } = useAuth();
  const themeContext = useContext(ThemeContext) as ThemeContextType;
  const { toggleTheme } = themeContext;

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    const elements = document.body.querySelectorAll("*");
    elements.forEach((el) => {
      if (el.textContent?.toLowerCase().includes(searchQuery.toLowerCase())) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mynavbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          BCard
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {user && (
              <span className="mt-2 text-success">
                <i className="fa-solid fa-globe text-success m-1"></i>
                Online
              </span>
            )}

            {user?.isBusiness && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/mycards">
                  My Business
                </NavLink>
              </li>
            )}

            {user?.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link text-danger" to="/admin">
                  Admin Panel
                </NavLink>
              </li>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  errorMassage("Logged out successfully");
                }}
                className="btn btn-link text-danger"
              >
                Log out <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            ) : (
              <>
                <NavLink className="btn btn-link text-success mt-1" to="/login">
                  LogIn
                </NavLink>
                <NavLink className="btn btn-link mt-1" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </ul>

          <div className="form-check form-switch p-3">
            <input
              onChange={toggleTheme}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              <i className="fa-solid fa-sun "></i>
            </label>
          </div>

          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
