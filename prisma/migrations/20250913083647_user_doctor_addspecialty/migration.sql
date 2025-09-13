/*
  Warnings:

  - Added the required column `specialty` to the `userDoctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."userDoctor" ADD COLUMN     "specialty" TEXT NOT NULL;
