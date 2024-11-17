const bcrypt = require("bcryptjs");
const { check, body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const validateUser = [
  check("firstName")
    .isAlpha()
    .withMessage("First name can only contain letters")
    .notEmpty()
    .withMessage("First name is required"),
  check("lastName")
    .isAlpha()
    .withMessage("Last name can only contain letters")
    .notEmpty()
    .withMessage("Last name is required"),
  body("email").isEmail().notEmpty().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least one letter"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);

  const errorMessages = {};

  if (!errors.isEmpty()) {
    errors.array().forEach((err) => {
      if (!errorMessages[err.path]) errorMessages[err.path] = [];
      errorMessages[err.path].push(err.msg);
    });

    return res.render("signup", {
      errorMessages,
      formData: { firstName, lastName, email },
      isAuth: false,
    });
  }

  if (password === confirmPassword) {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
      }

      try {
        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
          },
        });

        req.login(user, (err) => {
          if (err) return next(err);

          res.redirect("/");
        });
      } catch (err) {
        return next(err);
      }
    });
  }
};

const showSignUpForm = (req, res) => {
  const isAuth = req.isAuthenticated();
  if (!isAuth)
    return res.render("signup", { errorMessages: {}, formData: {}, isAuth });

  return res.redirect("/");
};

module.exports = { showSignUpForm, createUser, validateUser };
