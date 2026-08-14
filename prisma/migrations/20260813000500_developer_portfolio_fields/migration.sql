-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroRole" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "aboutImageUrl" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "availability" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "resumeUrl" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "skills" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "role" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "year" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "problem" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "outcome" TEXT;

UPDATE "SiteSettings"
SET "heroCtaLabel" = 'About me'
WHERE "id" = 'default'
  AND ("heroCtaLabel" IS NULL OR "heroCtaLabel" = 'See selected work');

UPDATE "SiteSettings"
SET "heroRole" = 'Full-stack engineer'
WHERE "id" = 'default' AND "heroRole" IS NULL;

UPDATE "SiteSettings"
SET "availability" = 'Open to collaborations'
WHERE "id" = 'default' AND "availability" IS NULL;

UPDATE "SiteSettings"
SET "skills" = ARRAY[
  'TypeScript',
  'Next.js',
  'React',
  'Prisma',
  'PostgreSQL',
  'Laravel',
  'Tailwind CSS'
]::TEXT[]
WHERE "id" = 'default' AND (COALESCE(cardinality("skills"), 0) = 0);
