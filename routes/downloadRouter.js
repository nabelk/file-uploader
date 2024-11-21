const router = require("express").Router();
const downloadController = require("../controllers/downloadController");

router.get("/:userId/:id", downloadController);

module.exports = router;
