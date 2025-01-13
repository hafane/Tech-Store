/*
  Warnings:

  - You are about to drop the column `activation` on the `Activation` table. All the data in the column will be lost.
  - Added the required column `activation` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activation" DROP COLUMN "activation";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activation" BOOLEAN NOT NULL;
