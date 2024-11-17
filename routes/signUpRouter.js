const router = require("express").Router();
const signupController = require("../controllers/signUpController");

router.post("/", signupController.validateUser, signupController.createUser);
router.get("/", signupController.showSignUpForm);
module.exports = router;
