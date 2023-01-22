/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      bold_700: ["roboto", "sans-serif"],
      bold_600: ["Open Sans", "sans-serif"],
    },
    // backgroundColor: {
    //   secondary: "#f2f2f2",
    // },
    colors: {
      f_secondary: "#757575",
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
