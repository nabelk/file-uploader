const { dirname } = require("path");
const supabase = require("../supabase/queries");
const prisma = require("../prisma/queries");
const request = require("superagent");

const { NODE_ENV } = process.env;

const downloadFileLocal = (res, file) => {
  const appDir = dirname(require.main.filename);
  const filePath = `${appDir}/${file.url}`;
  res.download(filePath, file.filename, (err) => {
    if (err)
      res.send({
        msg: "Problem downloading the file",
      });
  });
};

const downloadFile = async (req, res, next) => {
  const isAuth = req.isAuthenticated();
  let { id, userId } = req.params;
  userId = Number(userId);

  if (isAuth && userId === req.user.id) {
    const file = await prisma.downloadFile(id, userId);

    if (NODE_ENV === "development") {
      return downloadFileLocal(res, file);
    }

    const { data } = supabase.getPublicUrl(file.url);

    res.set("Content-Disposition", `attachment; filename=${file.filename}`);

    return request(data.publicUrl).pipe(res);
  }

  return next();
};

module.exports = downloadFile;
