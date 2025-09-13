-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('PATIENT', 'DOCTOR');

-- CreateTable
CREATE TABLE "public"."userPacient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "curp" TEXT NOT NULL,
    "imgURL" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'PATIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPacient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."userDoctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "imgURL" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'DOCTOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userDoctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userPacient_email_key" ON "public"."userPacient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userPacient_curp_key" ON "public"."userPacient"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "userDoctor_email_key" ON "public"."userDoctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userDoctor_rfc_key" ON "public"."userDoctor"("rfc");
