/*
  Warnings:

  - You are about to drop the column `pollId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `poll_id` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_id` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_optionId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "pollId",
ADD COLUMN     "poll_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "optionId",
DROP COLUMN "userId",
ADD COLUMN     "option_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
