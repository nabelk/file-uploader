const prisma = require("../prisma/queries");
const {
  formatDate,
  readableFileSize,
  getIcon,
  getFolderSize,
  getFileType,
} = require("../utils/util");

const showIndex = async (req, res, next) => {
  const isAuth = req.isAuthenticated();
  const successMessage = req.flash("success");
  const warningMessage = req.flash("warning");
  const dangerMessage = req.flash("danger");

  if (isAuth) {
    try {
      let [folders, files] = await Promise.all([
        prisma.getFolders(req.user.id),
        prisma.getFiles(req.user.id, null),
      ]);

      files = files.map((file) => ({
        ...file,
        size: readableFileSize(file.size),
        uploadedAt: formatDate(file.uploadedAt),
        iconFasClass: getIcon(file.mimetype),
        fileType: getFileType(file.mimetype),
      }));
      folders = folders.map((folder) => ({
        ...folder,
        createdAt: formatDate(folder.createdAt),
        totalFolderSize: getFolderSize(folder),
      }));

      res.render("index", {
        isAuth,
        data: { folders, files },
        user: {
          fullName: `${req.user.firstName} ${req.user.lastName}`,
          email: req.user.email,
        },
        newFileFormAction: `/upload`,
        isIndex: true,
        successMessage,
        warningMessage,
        dangerMessage,
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.render("index", { message: "", isAuth });
  }
};

module.exports = { showIndex };
