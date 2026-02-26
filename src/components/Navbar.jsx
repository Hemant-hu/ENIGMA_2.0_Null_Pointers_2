import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Lunar Hack</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/results">Results</Link>
      </div>
    </nav>
  );
}

export default Navbar;
