/*
  Warnings:

  - You are about to drop the column `openeStatement` on the `Bot` table. All the data in the column will be lost.
  - You are about to drop the column `topN` on the `Bot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "openeStatement",
DROP COLUMN "topN",
ADD COLUMN     "openStatement" TEXT,
ADD COLUMN     "topK" INTEGER NOT NULL DEFAULT 5;
