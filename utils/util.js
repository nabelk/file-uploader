const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `${formattedDate}`;
};

function readableFileSize(attachmentSize) {
  const DEFAULT_SIZE = 0;
  const fileSize = attachmentSize ?? DEFAULT_SIZE;

  if (!fileSize) {
    return `${DEFAULT_SIZE} kb`;
  }

  const sizeInKb = fileSize / 1024;

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`;
  } else {
    return `${sizeInKb.toFixed(2)} kb`;
  }
}

function getIcon(fileType) {
  const icons = {
    "application/pdf": "fas fa-file-pdf text-red-500",
    "application/msword": "fas fa-file-word text-blue-600",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "fas fa-file-word text-blue-600",
    "application/vnd.ms-excel": "fas fa-file-excel text-green-600",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "fas fa-file-excel text-green-600",
    "application/vnd.ms-powerpoint": "fas fa-file-powerpoint text-orange-600",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "fas fa-file-powerpoint text-orange-600",
    "image/jpeg": "fas fa-file-image text-blue-500",
    "image/png": "fas fa-file-image text-blue-500",
    "image/gif": "fas fa-file-image text-blue-500",
    "image/bmp": "fas fa-file-image text-blue-500",
    "image/tiff": "fas fa-file-image text-blue-500",
    "image/svg+xml": "fas fa-file-image text-blue-500",
    "image/webp": "fas fa-file-image text-blue-500",
    "video/mp4": "fas fa-file-video text-green-500",
    "video/quicktime": "fas fa-file-video text-green-500",
    "video/x-matroska": "fas fa-file-video text-green-500",
    "video/x-msvideo": "fas fa-file-video text-green-500",
    "audio/mpeg": "fas fa-file-audio text-purple-500",
    "audio/wav": "fas fa-file-audio text-purple-500",
    "audio/ogg": "fas fa-file-audio text-purple-500",
    "application/zip": "fas fa-file-archive text-gray-600",
    "application/x-rar-compressed": "fas fa-file-archive text-gray-600",
    "application/x-7z-compressed": "fas fa-file-archive text-gray-600",
    "text/plain": "fas fa-file-alt text-gray-500",
    "text/csv": "fas fa-file-csv text-gray-500",
    "application/json": "fas fa-file-code text-gray-500",
    "text/html": "fas fa-file-code text-gray-500",
    "text/css": "fas fa-file-code text-gray-500",
    "application/javascript": "fas fa-file-code text-gray-500",
  };

  // Default to a generic file icon
  return icons[fileType] || "fas fa-file text-gray-500";
}

function getFolderSize(folder) {
  return readableFileSize(
    folder.files.reduce((sum, file) => sum + file.size, 0)
  );
}

function getFileType(mimetype) {
  const typeCategories = {
    video: "Video",
    image: "Image",
    audio: "Audio",
    pdf: "Document",
    msword: "Document",
    document: "Document",
    text: "Document",
    csv: "Document",
    zip: "Archive",
    rar: "Archive",
    "7z": "Archive",
    json: "Code",
    html: "Code",
    css: "Code",
    javascript: "Code",
  };

  for (const key in typeCategories) {
    if (mimetype.includes(key)) return typeCategories[key];
  }

  return "Unknown";
}

module.exports = {
  formatDate,
  readableFileSize,
  getIcon,
  getFolderSize,
  getFileType,
};
