/*
  Warnings:

  - You are about to drop the column `type` on the `Auth` table. All the data in the column will be lost.
  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `File` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `authId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_active` on table `Auth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_logged_in` on table `Auth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `auth_token` on table `Auth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `auth_timeout` on table `Auth` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_authId_fkey";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "type",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "is_active" SET NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT false,
ALTER COLUMN "is_logged_in" SET NOT NULL,
ALTER COLUMN "is_logged_in" SET DEFAULT false,
ALTER COLUMN "auth_token" SET NOT NULL,
ALTER COLUMN "auth_timeout" SET NOT NULL;

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authId",
DROP COLUMN "branch",
DROP COLUMN "year",
ALTER COLUMN "contact" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
