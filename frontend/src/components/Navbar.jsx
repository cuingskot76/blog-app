import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/useContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  // const firstNameUpper =
  //   currentUser?.firstName.charAt(0).toUpperCase() +
  //   currentUser?.firstName.slice(1);
  return (
    <div className="navbar sm:px-10 md:px-16 lg:px-28 xl:px-36">
      <div className="navbar-start md:navbar-center">
        <Link to="/">
          <button className="btn btn-ghost normal-case text-xl">cNg</button>
        </Link>
      </div>
      <div className="navbar-end md:hidden">
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/?cat=programming">
                <span>Programming</span>
              </Link>
            </li>
            <li>
              <Link to="/?cat=technology">
                <span>Technology</span>
              </Link>
            </li>
            <li>
              <Link to="/?cat=writing">
                <span>Writing</span>
              </Link>
            </li>
            <li>
              <Link to="/?cat=productivity">
                <span>Productivity</span>
              </Link>
            </li>
            <li>
              <Link to="/?cat=politics">
                <span>Politics</span>
              </Link>
            </li>
            <li>
              {currentUser?.firstName ? (
                <span>Welcome back, {currentUser?.firstName}</span>
              ) : null}
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end hidden md:flex ">
        <ul className="menu menu-horizontal px-5">
          <li>
            <Link to="/?cat=programming">
              <span>Programming</span>
            </Link>
          </li>
          <li>
            <Link to="/?cat=technology">
              <span>Technology</span>
            </Link>
          </li>
          <li>
            <Link to="/?cat=writing">
              <span>Writing</span>
            </Link>
          </li>
          <li>
            <Link to="/?cat=productivity">
              <span>Productivity</span>
            </Link>
          </li>
          <li>
            <Link to="/?cat=politics">
              <span>Politics</span>
            </Link>
          </li>
          <li>
            {currentUser?.firstName ? (
              <span>Welcome back,</span>
            ) : // <span>Welcome back, {firstNameUpper}</span>
            null}
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden md:block">
        {currentUser?.firstName ? null : (
          <Link to="/login">
            <button className="btn btn-info">Login</button>
          </Link>
        )}
      </div>
      <div className="navbar-end hidden md:block">
        {currentUser ? (
          <Link to="/login">
            <button className="btn btn-outline btn-info" onClick={logout}>
              Logout
            </button>
          </Link>
        ) : (
          <Link to="/signup">
            <button className="btn btn-outline btn-info">Sign Up</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
