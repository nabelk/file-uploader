const supabase = require("../supabase/queries");
const prisma = require("../prisma/queries");

const { NODE_ENV } = process.env;

const deleteFile = async (req, res) => {
  let { id } = req.params;
  const isAuth = req.isAuthenticated();

  if (isAuth) {
    const path = new URL(req.headers.referer).pathname;

    try {
      const file = await prisma.deleteFile(id);

      if (NODE_ENV === "production") {
        const { data, error } = await supabase.deleteFile(file.url);
      }

      req.flash(
        "success",
        `File '${file.filename}' has been successfully deleted.`
      );
    } catch (err) {
      req.flash("danger", `File failed to delete.`);
    }

    return res.redirect(path);
  }

  return res.redirect("/");
};

module.exports = deleteFile;
