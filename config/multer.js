const multer = require("multer");
const sanitize = require("sanitize-filename");

const { NODE_ENV } = process.env;

const storage =
  NODE_ENV === "development"
    ? multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads/");
        },
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}_${sanitize(file.originalname)}`);
        },
      })
    : multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
