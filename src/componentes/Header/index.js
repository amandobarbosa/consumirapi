import React from "react";
import { Nav } from "./styled";
import { FaHome, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
import history from "../../services/history";


export default function Header() {

  return (
    <Router history={history}>
      <Nav>
        <Link to="/">
          <FaHome size={24} />
        </Link>
        <Link to="/register">
          <FaUserAlt size={24} />
        </Link>
        <Link to="/login">
          <FaSignOutAlt size={24} />
        </Link>
      </Nav>
    </Router>
  );
}
