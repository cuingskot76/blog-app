import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 sm:px-10 md:px-16 lg:px-28 xl:px-36">
      <div className="navbar-start md:navbar-center">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
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
              <a>Home</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end hidden md:flex ">
        <ul className="menu menu-horizontal px-5">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a></a>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden md:block">
        <Link to="/login">
          <button className="btn btn-info">Login</button>
        </Link>
      </div>
      <div className="navbar-end hidden md:block">
        <Link to="/signup">
          <button className="btn btn-outline btn-info">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
