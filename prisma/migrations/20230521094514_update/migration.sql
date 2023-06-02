/*
  Warnings:

  - You are about to drop the column `userId` on the `Auth` table. All the data in the column will be lost.
  - The `type` column on the `Auth` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `typeId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_userId_fkey";

-- DropIndex
DROP INDEX "Auth_userId_key";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "userId",
DROP COLUMN "type",
ADD COLUMN     "type" "Role";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeId",
ADD COLUMN     "authId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_id_key" ON "Auth"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
