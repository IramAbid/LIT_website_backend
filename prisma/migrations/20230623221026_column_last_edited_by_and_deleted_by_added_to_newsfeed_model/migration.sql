/*
  Warnings:

  - Added the required column `lastEditedBy` to the `Newsfeed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Newsfeed" ADD COLUMN     "deletedBy" INTEGER,
ADD COLUMN     "lastEditedBy" INTEGER NOT NULL;
