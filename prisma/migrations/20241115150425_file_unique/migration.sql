/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_filename_key";

-- CreateIndex
CREATE UNIQUE INDEX "File_id_key" ON "File"("id");
