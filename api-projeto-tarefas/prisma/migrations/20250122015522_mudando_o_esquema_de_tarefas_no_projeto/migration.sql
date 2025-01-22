/*
  Warnings:

  - You are about to drop the column `tasks` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tasks";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
