const supabase = require("../supabase/queries");
const prisma = require("../prisma/queries");
const {
  formatDate,
  readableFileSize,
  getIcon,
  getFileType,
} = require("../utils/util");
const {
  fileFilter,
  convertUniqueSanitize,
} = require("../config/multerProductionChecker");

const { NODE_ENV } = process.env;

const showFolder = async (req, res, next) => {
  const isAuth = req.isAuthenticated();
  const successMessage = req.flash("success");
  const warningMessage = req.flash("warning");
  const dangerMessage = req.flash("danger");

  const { folderId, folderName } = req.params;
  if (isAuth) {
    try {
      let [folders, files] = await Promise.all([
        prisma.getFolders(req.user.id),
        prisma.getFiles(req.user.id, folderId),
      ]);

      files = files.map((file) => ({
        ...file,
        size: readableFileSize(file.size),
        uploadedAt: formatDate(file.uploadedAt),
        iconFasClass: getIcon(file.mimetype),
        fileType: getFileType(file.mimetype),
      }));

      return res.render("userFolderView", {
        isAuth,
        data: { folders, files, folderName },
        user: {
          fullName: `${req.user.firstName} ${req.user.lastName}`,
          email: req.user.email,
        },
        newFileFormAction: `/folder/${folderId}/${folderName}`,
        isIndex: false,
        successMessage,
        dangerMessage,
        warningMessage,
      });
    } catch (err) {
      next(err);
    }
  }

  return res.redirect("/");
};

const createFolder = async (req, res) => {
  const isAuth = req.isAuthenticated();

  const { folderName } = req.body;
  if (isAuth) {
    try {
      await prisma.createFolder(folderName, req.user.id);
      req.flash("success", `Folder '${folderName}' created successfully`);
    } catch (err) {
      req.flash("danger", `Folder '${folderName}' failed to create `);
    }
  }

  return res.redirect("/");
};

const createFileInFolder = async (req, res) => {
  const isAuth = req.isAuthenticated();
  let { originalname, mimetype, path, size, buffer } = req.file;
  const { folderId, folderName } = req.params;
  const filename = convertUniqueSanitize(originalname); //PRODUCTION
  const { isValidType, msg } = await fileFilter({ mimetype, buffer }); //PRODUCTION

  if (size >= 50 * 1024 * 1024) {
    req.flash("danger", `File too large, MAX 50MB `);
    return res.redirect(`/folder/${folderId}/${folderName}`);
  }

  //PRODUCTION
  if (!isValidType && NODE_ENV === "production") {
    req.flash("danger", `File upload failed: ${msg}`);
    return res.redirect(`/folder/${folderId}/${folderName}`);
  }

  if (isAuth) {
    //PRODUCTION
    const { data, error } =
      NODE_ENV === "production" &&
      (await supabase.uploadFile(filename, buffer, mimetype));

    //PRODUCTION
    if (error) {
      req.flash("danger", "File upload failed");
    }

    if ((data && !error) || NODE_ENV === "development") {
      try {
        await prisma.uplodaFile(
          originalname,
          req.user.id,
          data.path,
          path,
          mimetype,
          size,
          folderId
        );

        req.flash("success", `File successfully uploaded in '${folderName}'`);
      } catch (err) {
        req.flash("danger", `File upload failed in '${folderName}' `);
      }
    }
    return res.redirect(`/folder/${folderId}/${folderName}`);
  }
  return res.redirect("/");
};

const deleteFolder = async (req, res) => {
  const { folderId, folderName } = req.params;
  const isAuth = req.isAuthenticated();

  if (isAuth) {
    const path = new URL(req.headers.referer).pathname;
    try {
      const folder = await prisma.deleteFolder(folderName, folderId);
      req.flash(
        "success",
        `Folder '${folder.folderName}' has been successfully deleted.`
      );
    } catch (err) {
      req.flash("danger", `Folder failed to delete.`);
    }

    return res.redirect(path);
  }

  return res.redirect("/");
};

module.exports = { showFolder, createFolder, createFileInFolder, deleteFolder };
