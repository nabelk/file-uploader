const router = require("express").Router();
const fileUploadController = require("../controllers/fileUploadController");
const multerUpload = require("../config/multer");

router.post("/", multerUpload.single("file"), fileUploadController);

module.exports = router;
