const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { NODE_ENV } = process.env;

const prismaQueries = {
  deleteFile: async (id) => {
    return await prisma.file.delete({
      where: {
        id,
      },
    });
  },
  downloadFile: async (id, userId) => {
    return await prisma.file.findFirst({
      where: { id, userId },
      select: {
        url: true,
        filename: true,
      },
    });
  },
  uplodaFile: async (
    originalname,
    userId,
    productionPath,
    path,
    mimetype,
    size,
    folderId
  ) => {
    return await prisma.file.create({
      data: {
        filename: originalname,
        userId,
        url: NODE_ENV === "production" ? productionPath : path,
        mimetype,
        size,
        folderId: folderId || null,
      },
    });
  },
  createUser: async (firstName, lastName, email, hashedPassword) => {
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
  },
  getFolders: async (userId) => {
    return await prisma.folder.findMany({
      where: {
        userId,
      },
      include: {
        files: { select: { size: true } },
      },
    });
  },
  getFiles: async (userId, folderId) => {
    return await prisma.file.findMany({
      where: { userId, folderId },
    });
  },
  createFolder: async (folderName, userId) => {
    return await prisma.folder.create({
      data: {
        folderName,
        userId,
      },
    });
  },
  deleteFolder: async (folderName, folderId) => {
    return await prisma.folder.delete({
      where: {
        folderName,
        id: folderId,
      },
    });
  },
};

module.exports = prismaQueries;
