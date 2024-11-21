const router = require("express").Router();
const folderController = require("../controllers/folderController");
const multerUpload = require("../config/multer");

router.post("/new", folderController.createFolder);
router.post(
  "/:folderId/:folderName",
  multerUpload.single("file"),
  folderController.createFileInFolder
);
router.get("/:folderId/:folderName", folderController.showFolder);
router.delete("/:folderId/:folderName", folderController.deleteFolder);

module.exports = router;
