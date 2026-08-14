-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stackTitle" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "disciplinesTitle" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "disciplinesLede" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "disciplines" JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "processTitle" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "processCta" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "processSteps" JSONB NOT NULL DEFAULT '[]'::jsonb;
