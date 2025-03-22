import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer: FunctionComponent = () => {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState(user);
  const navigate = useNavigate();
  useEffect(() => {
    setAuthUser(user);
  }, [user]);

  return (
    <footer className="bg-body-tertiary text-center text-lg-start fixed-bottom d-flex justify-content-around p-3">
      <div>
        <NavLink
          onClick={() => {
            navigate("/cards");
          }}
          className="text-body m-3 p-3"
          to="/"
        >
          <i className="fa-solid fa-house text-success"></i> Home
        </NavLink>
      </div>
      <div>
        <NavLink className="text-body m-3 p-3" to="/about">
          <i className="fa-solid fa-circle-info text-info"></i> About
        </NavLink>
      </div>

      {authUser?.isBusiness && (
        <div>
          <NavLink className="text-body m-3 p-3" to="/MyCards">
            <i className="fa-solid fa-address-card text-warning"></i> My Cards
          </NavLink>
        </div>
      )}

      {authUser && (
        <div>
          <NavLink className="text-body m-3 p-3" to="/favorites">
            <i className="fa-solid fa-heart text-danger"></i> Favorites
          </NavLink>
        </div>
      )}
    </footer>
  );
};

export default Footer;
