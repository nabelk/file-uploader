const router = require("express").Router();
const deleteFileController = require("../controllers/deleteFileController");

router.delete("/:id", deleteFileController);

module.exports = router;
