import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          Student Support & Ticket Management
        </Link>
      </div>

      {user && (
        <div className="navbar-right">
          <span>
            {user.name} ({user.role})
          </span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;