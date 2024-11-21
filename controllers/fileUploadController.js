const supabase = require("../supabase/queries");
const prisma = require("../prisma/queries");
const {
  fileFilter,
  convertUniqueSanitize,
} = require("../config/multerProductionChecker");

const { NODE_ENV } = process.env;

const fileUpload = async (req, res) => {
  const isAuth = req.isAuthenticated();
  let { originalname, mimetype, path, size, buffer } = req.file;
  const filename = convertUniqueSanitize(originalname); //PRODUCTION
  const { isValidType, msg } = await fileFilter({ mimetype, buffer }); //PRODUCTION

  if (size >= 50 * 1024 * 1024) {
    req.flash("danger", `File too large, MAX 50MB `);
    return res.redirect("/");
  }

  //PRODUCTION
  if (!isValidType && NODE_ENV === "production") {
    req.flash("danger", `File upload failed: ${msg}`);
    return res.redirect("/");
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
          data?.path,
          path,
          mimetype,
          size
        );
        req.flash("success", "File successfully uploaded");
      } catch (err) {
        req.flash("danger", "File upload failed");
      }
    }
  }

  return res.redirect("/");
};

module.exports = fileUpload;
