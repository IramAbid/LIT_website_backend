/*
  Warnings:

  - You are about to drop the column `authorId` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_authorId_fkey";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "authorId",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio";

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
