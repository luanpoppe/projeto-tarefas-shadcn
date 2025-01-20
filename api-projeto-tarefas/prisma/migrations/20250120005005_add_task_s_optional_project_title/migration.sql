-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "projetoTitle" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP DEFAULT,
ALTER COLUMN "tasks" DROP DEFAULT;
