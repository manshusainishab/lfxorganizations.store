-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "name" SET DATA TYPE CITEXT;

-- RenameIndex
ALTER INDEX "Skill_name_key" RENAME TO "unique_skill_name_insensitive";
