import { prisma } from "./prisma";

const setupSQL = `
-- Create enums
DO $$ BEGIN
  CREATE TYPE "DocumentType" AS ENUM ('CV', 'COVER_LETTER', 'INTERVIEW_COACHING');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentProvider" AS ENUM ('PAYPAL');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "ProductType" AS ENUM ('CV_SINGLE', 'COVER_LETTER_SINGLE', 'INTERVIEW_SINGLE', 'STARTER_BUNDLE', 'PRO_BUNDLE', 'PREMIUM');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT NOT NULL,
  "emailVerified" TIMESTAMP(3),
  "image" TEXT,
  "passwordHash" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- Create Account table
CREATE TABLE IF NOT EXISTS "Account" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
ALTER TABLE "Account" DROP CONSTRAINT IF EXISTS "Account_userId_fkey";
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Session table
CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");
ALTER TABLE "Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create VerificationToken table
CREATE TABLE IF NOT EXISTS "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- Create UserProfile table
CREATE TABLE IF NOT EXISTS "UserProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "jobTitle" TEXT,
  "experience" TEXT,
  "skills" TEXT,
  "education" TEXT,
  "languages" TEXT,
  "targetJob" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "UserProfile" DROP CONSTRAINT IF EXISTS "UserProfile_userId_fkey";
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Document table
CREATE TABLE IF NOT EXISTS "Document" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" "DocumentType" NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "preview" TEXT,
  "isLocked" BOOLEAN NOT NULL DEFAULT true,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Document_userId_type_idx" ON "Document"("userId", "type");
ALTER TABLE "Document" DROP CONSTRAINT IF EXISTS "Document_userId_fkey";
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Payment table
CREATE TABLE IF NOT EXISTS "Payment" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "paymentId" TEXT,
  "paymentProvider" "PaymentProvider" NOT NULL DEFAULT 'PAYPAL',
  "amount" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'eur',
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "productType" "ProductType" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Payment_paymentId_key" ON "Payment"("paymentId");
CREATE INDEX IF NOT EXISTS "Payment_userId_idx" ON "Payment"("userId");
ALTER TABLE "Payment" DROP CONSTRAINT IF EXISTS "Payment_userId_fkey";
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
`;

let dbInitialized = false;

export async function ensureDatabase(): Promise<void> {
  if (dbInitialized) return;

  try {
    // Quick check: try to query the User table
    await prisma.$queryRawUnsafe(`SELECT 1 FROM "User" LIMIT 1`);
    dbInitialized = true;
  } catch {
    // Table doesn't exist, run setup
    console.log("Database tables not found. Running automatic setup...");
    try {
      await prisma.$executeRawUnsafe(setupSQL);
      dbInitialized = true;
      console.log("Database setup completed successfully.");
    } catch (setupError) {
      console.error("Database setup failed:", setupError);
      throw setupError;
    }
  }
}
