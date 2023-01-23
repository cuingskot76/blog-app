import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowScroll } from "react-use";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { AuthContext } from "../context/useContext";

const NavbarMain = () => {
  const [navBgChange, setNavBgChange] = useState("");
  const { y } = useWindowScroll();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (y > 70) {
      setNavBgChange("navbar");
    } else {
      setNavBgChange("");
    }
  }, [y]);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav
      className={`font-[poppins]  px-2 sm:px-4 .5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 ${navBgChange}`}
    >
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
          >
            <title>Maria Mitchell</title>
            <mask
              id="mask__bauhaus"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="80"
              height="80"
            >
              <rect width="80" height="80" rx="160" fill="#FFFFFF"></rect>
            </mask>
            <g mask="url(#mask__bauhaus)">
              <rect width="80" height="80" fill="#0c8f8f"></rect>
              <rect
                x="10"
                y="30"
                width="80"
                height="80"
                fill="#405059"
                transform="translate(14 -14) rotate(36 40 40)"
              ></rect>
              <circle
                cx="40"
                cy="40"
                fill="#ffad08"
                r="16"
                transform="translate(3 3)"
              ></circle>
              <line
                x1="0"
                y1="40"
                x2="80"
                y2="40"
                strokeWidth="2"
                stroke="#edd75a"
                transform="translate(12 12) rotate(72 40 40)"
              ></line>
            </g>
          </svg>
          <span className="ml-2 font-bold_700 self-center text-2xl whitespace-nowrap dark:text-white">
            Akaynz
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full  md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col  items-center  p-4 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block  pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Our story
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block  pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Membership
              </Link>
            </li>
            <li>
              <Link
                to="/write"
                className="block  pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Write
              </Link>
            </li>
            <li>
              {currentUser?.email ? (
                <span>Welcome back, {currentUser?.firstName}</span>
              ) : (
                <Link
                  to="/login"
                  className="block  pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Sign in
                </Link>
              )}
            </li>
            {currentUser?.email ? (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={logout}
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/signup"
                className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
