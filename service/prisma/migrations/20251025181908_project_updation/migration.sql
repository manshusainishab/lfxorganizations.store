/*
  Warnings:

  - You are about to drop the column `anchor` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `sourceFile` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "anchor",
DROP COLUMN "description",
DROP COLUMN "sourceFile";
