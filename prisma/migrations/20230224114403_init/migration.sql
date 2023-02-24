/*
  Warnings:

  - Added the required column `type` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "type" TEXT NOT NULL;
