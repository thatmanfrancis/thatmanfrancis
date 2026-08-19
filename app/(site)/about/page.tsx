import type { Metadata } from "next";
import { AboutSection } from "@/components/home/about-section";
import { DisciplinesSection } from "@/components/home/disciplines-section";
import { SkillsSection } from "@/components/home/skills-section";
import { ExperienceTimeline } from "@/components/work/experience-timeline";
import {
  asCopyBlocks,
  asExperienceEntries,
  defaultDisciplines,
  defaultExperience,
  defaultProcessSteps,
} from "@/lib/copy-blocks";
import { publicPageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return publicPageMetadata({
    title: "About",
    description:
      settings.aboutBody ??
      "About Francis Kossyrisochukwu Uzoigwe, a full-stack engineer in Lagos building end-to-end web products with Next.js, TypeScript, and modern backend systems.",
    path: "/about",
    image: settings.aboutImageUrl,
  });
}

export default async function AboutPage() {
  const settings = await getSettings();
  const disciplines = asCopyBlocks(settings.disciplines, defaultDisciplines);
  const processSteps = asCopyBlocks(settings.processSteps, defaultProcessSteps);
  const experience = asExperienceEntries(settings.experience, defaultExperience);

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <AboutSection
            title={settings.aboutTitle ?? "The story"}
            body={
              settings.aboutBody ??
              "I design and ship web products end to end — from clear interfaces to solid backends."
            }
            imageUrl={settings.aboutImageUrl}
            availability={settings.availability}
            resumeUrl={settings.resumeUrl}
          />

          <div className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12">
            <ExperienceTimeline
              title={settings.experienceTitle}
              lede={settings.experienceLede}
              entries={experience}
            />
          </div>
        </div>
      </section>
      <DisciplinesSection
        title={settings.disciplinesTitle}
        lede={settings.disciplinesLede}
        items={disciplines}
      />
      <SkillsSection
        skills={settings.skills ?? []}
        stackTitle={settings.stackTitle}
        processTitle={settings.processTitle}
        processCta={settings.processCta}
        processSteps={processSteps}
      />
    </>
  );
}
