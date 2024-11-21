require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const path = require("node:path");
const sessionConfig = require("./config/session");
const methodOverride = require("method-override");
const routers = require("./routes/routers");
const flash = require("connect-flash");

app.use(flash());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(sessionConfig);
app.use(passport.session());

require("./config/passport");

app.use("/", routers.indexRouter);
app.use("/signup", routers.signUpRouter);
app.use("/login", routers.loginRouter);
app.use("/logout", routers.logoutRouter);
app.use("/upload", routers.fileUploadRouter);
app.use("/folder", routers.folderRouter);
app.use("/download", routers.downloadRouter);
app.use("/deleteFile", routers.deleteFileRouter);

app.use((req, res, next) => {
  res.status(404).render("400", { isAuth: false });
});

app.use((err, req, res, next) => {
  res.status(500).render("500", { isAuth: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
