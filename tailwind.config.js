/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  safelist: [
    "text-red-500",
    "text-blue-600",
    "text-green-600",
    "text-orange-600",
    "text-blue-500",
    "text-purple-500",
    "text-gray-600",
    "text-gray-500",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
