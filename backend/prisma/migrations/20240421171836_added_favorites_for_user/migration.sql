/*
  Warnings:

  - Added the required column `user_favorites_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "user_favorites_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_favorites_id_fkey" FOREIGN KEY ("user_favorites_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
