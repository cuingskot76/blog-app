import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        user
      );
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
      setUser({
        ...user,
        email: "",
      });
    }
  };

  return (
    // <div className="mt-20">
    <div className="mt-24 max-w-md m-auto bg-[#f2f2f2] py-2 px-10 rounded-md">
      <div className="px-6 py-20 lg:px-8">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          className="mx-auto mb-5"
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
        <h3 className="text-xl text-center mb-10 ">Register to our platform</h3>
        {/* <p className="text-red-500 text-center mb-5 font-bold_700 ">{error}</p> */}
        <p className="mb-5 text-center text-red-700">{error}</p>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="block py-2.5 px-0  w-full text-sm text-gray bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={user.firstName}
                onChange={handleChange}
                autoComplete="off"
              />
              <label
                htmlFor="firstName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="block py-2.5 px-0 w-full text-sm text-gray bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={user.lastName}
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
              <label
                htmlFor="lastName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={user.email}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={user.password}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
          <div className="text-sm font-medium text-gray-500 mt-6 dark:text-gray-300">
            Alredy have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
