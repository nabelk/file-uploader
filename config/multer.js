const multer = require("multer");
const sanitize = require("sanitize-filename");

// Unique and sanitize filename will be implement after multer middleware for PRODUCTION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${sanitize(file.originalname)}`);
  },
});

const supportedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",
  "image/webp",
  "video/mp4",
  "video/quicktime", // .mov
  "video/x-matroska", // .mkv
  "video/x-msvideo", // .avi
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "application/zip",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
  "text/plain",
  "text/csv",
  "application/json",
  "text/html",
  "text/css",
  "application/javascript",
];

//CHECK BACK WHEN IN PRODUCTION
// Filetype check buffer need to be after multer middleware

/* (async () => {
  console.log(file);
  const { fileTypeFromBuffer } = await import("file-type");

  fileTypeFromBuffer(file.buffer)
    .then((type) => {
      if (!type || !supportedFileTypes.includes(type.mime)) {
        return cb(new Error("Invalid file type"), false);
      }
      cb(null, true);
    })
    .catch(() => {
      cb(new Error("Unable to determine file type"), false);
    });
})();
 */

const fileFilter = (req, file, cb) => {
  const type = file.mimetype;
  if (supportedFileTypes.includes(type)) {
    return cb(null, true);
  }
  cb(new Error(`File type ${type} is not supported `), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
