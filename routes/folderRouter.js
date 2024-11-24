const router = require("express").Router();
const folderController = require("../controllers/folderController");
const multerUpload = require("../config/multer");

router.post("/new", folderController.createFolder);
router.post(
  "/:userId/:folderId/:folderName",
  multerUpload.single("file"),
  folderController.createFileInFolder
);
router.get("/:userId/:folderId/:folderName", folderController.showFolder);
router.delete("/:userId/:folderId/:folderName", folderController.deleteFolder);

module.exports = router;
