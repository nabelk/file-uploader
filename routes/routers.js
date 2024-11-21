const signUpRouter = require("./signUpRouter");
const loginRouter = require("./loginRouter");
const logoutRouter = require("./logOutRouter");
const indexRouter = require("./indexRouter");
const fileUploadRouter = require("./fileUploadRouter");
const folderRouter = require("./folderRouter");
const downloadRouter = require("./downloadRouter");
const deleteFileRouter = require("./deleteFileRouter");

module.exports = {
  signUpRouter,
  loginRouter,
  logoutRouter,
  indexRouter,
  fileUploadRouter,
  folderRouter,
  downloadRouter,
  deleteFileRouter,
};
