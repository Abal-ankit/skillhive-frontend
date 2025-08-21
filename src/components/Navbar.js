import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { GlobalContext } from "../GlobalContextProvider";

function Navbar() {
  const { userName } = useContext(GlobalContext);
  return (
    <nav className="navbar">
      <h1 className="logo">CodePlay</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>{userName ? userName : <Link to="/login">Login</Link>}</li>
        {/* <Link to="/login">Login</Link> */}
        <li>
          <Link to={"/challenges"}>Challenges</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
