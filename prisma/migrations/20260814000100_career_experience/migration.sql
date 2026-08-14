-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "experienceTitle" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "experienceLede" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "experience" JSONB NOT NULL DEFAULT '[]';
