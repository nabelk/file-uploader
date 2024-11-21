const sanitize = require("sanitize-filename");

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

const fileFilter = async (file) => {
  try {
    const { fileTypeFromBuffer } = await import("file-type");

    const type = await fileTypeFromBuffer(file.buffer);

    if (
      type.mime !== file.mimetype ||
      !supportedFileTypes.includes(type.mime)
    ) {
      return { isValidType: false, msg: "Invalid file type" };
    }
    return { isValidType: true, msg: "" };
  } catch (error) {
    return { isValidType: false, msg: "Unable to determine file type" };
  }
};

const convertUniqueSanitize = (originalname) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `${uniqueSuffix}_${sanitize(originalname)}`;
};

module.exports = { fileFilter, convertUniqueSanitize };
