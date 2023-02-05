import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/useContext";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
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
        <h3 className="text-xl text-center mb-10 ">Sign in to our platform</h3>
        <p className="text-red-500 text-center mb-5 font-bold_700 ">{error}</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium  ">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="afrzl@gmail.com"
              required
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium  "
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 "
              required
              onChange={handleChange}
              value={user.password}
            />
          </div>
          <button
            type="submit"
            className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              to="/signup"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
