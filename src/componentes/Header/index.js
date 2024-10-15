import React from "react";
import { Nav } from "./styled";
import {
  FaHome,
  FaPowerOff,
  FaSignOutAlt,
  FaCircle,
  FaUserAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/modules/auth/actions";
import history from "../../services/history";

export default function Header() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push("/");
  };
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/login">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <FaSignOutAlt size={24} />
      )}
      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
    </Nav>
  );
}
