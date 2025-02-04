/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Priorities" AS ENUM ('ALTA', 'MEDIA', 'BAIXA');

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tasks" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Article";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "priority" "Priorities" NOT NULL DEFAULT 'BAIXA',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
