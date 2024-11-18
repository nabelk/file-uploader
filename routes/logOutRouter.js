const router = require("express").Router();
const logoutController = require("../controllers/logOutController");

router.get("/", logoutController);

module.exports = router;
