"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/generated/prisma";
import { updateSettingsAction } from "@/app/admin/actions";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import {
  asCopyBlocks,
  asExperienceEntries,
  defaultDisciplines,
  defaultExperience,
  defaultFaqs,
  defaultProcessSteps,
  type CopyBlock,
  type ExperienceEntry,
} from "@/lib/copy-blocks";

type SettingsFormProps = {
  settings: SiteSettings;
};

const emptyBlock: CopyBlock = { title: "", body: "" };

const emptyExperience: ExperienceEntry = {
  years: "",
  title: "",
  org: "",
  location: "",
  nature: "",
  body: "",
  bullets: [],
};

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-accent hover:text-accent"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="8" y1="3" x2="8" y2="13" />
        <line x1="3" y1="8" x2="13" y2="8" />
      </svg>
      {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-ink-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="4" y1="4" x2="12" y2="12" />
        <line x1="12" y1="4" x2="4" y2="12" />
      </svg>
      Remove
    </button>
  );
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [disciplines, setDisciplines] = useState<CopyBlock[]>(() => {
    const current = asCopyBlocks(settings.disciplines, defaultDisciplines);
    return current.length > 0 ? current : [{ ...emptyBlock }];
  });

  const [processSteps, setProcessSteps] = useState<CopyBlock[]>(() => {
    const current = asCopyBlocks(settings.processSteps, defaultProcessSteps);
    return current.length > 0 ? current : [{ ...emptyBlock }];
  });

  const [experience, setExperience] = useState<ExperienceEntry[]>(() => {
    const current = asExperienceEntries(settings.experience, defaultExperience);
    return current.length > 0 ? current : [{ ...emptyExperience }];
  });

  const [faqs, setFaqs] = useState<CopyBlock[]>(() => {
    const current = asCopyBlocks(settings.faq, defaultFaqs);
    return current.length > 0 ? current : [{ ...emptyBlock }];
  });

  return (
    <form action={updateSettingsAction} className="space-y-8">
      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">Brand</p>
          <h2 className="text-2xl font-bold">Site identity</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="siteName" className="field-label">
              Site name
            </label>
            <input
              id="siteName"
              name="siteName"
              required
              defaultValue={settings.siteName}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="tagline" className="field-label">
              Tagline
            </label>
            <input
              id="tagline"
              name="tagline"
              defaultValue={settings.tagline ?? ""}
              className="field-input"
            />
          </div>
        </div>
        <div>
          <label htmlFor="metaDescription" className="field-label">
            Meta description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            rows={2}
            defaultValue={settings.metaDescription ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="footerText" className="field-label">
            Footer text
          </label>
          <input
            id="footerText"
            name="footerText"
            defaultValue={settings.footerText ?? ""}
            className="field-input"
          />
        </div>
      </section>

      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">Home</p>
          <h2 className="text-2xl font-bold">Hero copy</h2>
        </div>
        <div>
          <label htmlFor="heroEyebrow" className="field-label">
            Eyebrow
          </label>
          <input
            id="heroEyebrow"
            name="heroEyebrow"
            defaultValue={settings.heroEyebrow ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="heroTitle" className="field-label">
            Title
          </label>
          <input
            id="heroTitle"
            name="heroTitle"
            defaultValue={settings.heroTitle ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="heroLede" className="field-label">
            Lede
          </label>
          <textarea
            id="heroLede"
            name="heroLede"
            rows={3}
            defaultValue={settings.heroLede ?? ""}
            className="field-input"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="heroCtaLabel" className="field-label">
              CTA label
            </label>
            <input
              id="heroCtaLabel"
              name="heroCtaLabel"
              defaultValue={settings.heroCtaLabel ?? ""}
              className="field-input"
            />
            <p className="mt-2 text-sm text-ink-muted">
              The hero button scrolls to the About section on the home page.
            </p>
          </div>
          <div>
            <label htmlFor="heroRole" className="field-label">
              Role
            </label>
            <input
              id="heroRole"
              name="heroRole"
              defaultValue={settings.heroRole ?? ""}
              placeholder="Full-stack engineer"
              className="field-input"
            />
          </div>
        </div>
      </section>

      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">About</p>
          <h2 className="text-2xl font-bold">About page</h2>
        </div>
        <div>
          <label htmlFor="aboutTitle" className="field-label">
            Title
          </label>
          <input
            id="aboutTitle"
            name="aboutTitle"
            defaultValue={settings.aboutTitle ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="aboutBody" className="field-label">
            Story
          </label>
          <textarea
            id="aboutBody"
            name="aboutBody"
            rows={8}
            defaultValue={settings.aboutBody ?? ""}
            className="field-input"
          />
        </div>
        <ImageUploadField
          id="aboutImageUrl"
          name="aboutImageUrl"
          label="Photo"
          defaultValue={settings.aboutImageUrl}
          hint="Used on Home and About. Stored in /public/uploads on this server."
          previewClassName="h-64 w-full object-cover"
          previewFrameClassName="w-80 sm:w-96"
          slot="admin-portrait"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="availability" className="field-label">
              Availability
            </label>
            <input
              id="availability"
              name="availability"
              defaultValue={settings.availability ?? ""}
              placeholder="Open to collaborations"
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="resumeUrl" className="field-label">
              Resume URL
            </label>
            <input
              id="resumeUrl"
              name="resumeUrl"
              type="url"
              defaultValue={settings.resumeUrl ?? ""}
              className="field-input"
            />
          </div>
        </div>
        <div>
          <label htmlFor="skills" className="field-label">
            Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            rows={3}
            defaultValue={(settings.skills ?? []).join(", ")}
            placeholder="TypeScript, Next.js, Prisma"
            className="field-input"
          />
          <p className="mt-2 text-sm text-ink-muted">
            Comma or line separated. Matching names get logos (Docker, Redis,
            AWS, GitHub, NestJS, etc.). Unknown names show a letter badge.
            section.
          </p>
        </div>
        <div>
          <label htmlFor="stackTitle" className="field-label">
            Stack heading
          </label>
          <input
            id="stackTitle"
            name="stackTitle"
            defaultValue={settings.stackTitle ?? ""}
            placeholder="Tools I ship with"
            className="field-input"
          />
        </div>
      </section>

      {/* ── Disciplines (dynamic) ── */}
      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">Practice</p>
          <h2 className="text-2xl font-bold">Disciplines</h2>
          <p className="body-text mt-2">
            Shown on About, and as chips under the story on Home. Leave a title
            blank to hide that row.
          </p>
        </div>
        <div>
          <label htmlFor="disciplinesTitle" className="field-label">
            Section title
          </label>
          <input
            id="disciplinesTitle"
            name="disciplinesTitle"
            defaultValue={settings.disciplinesTitle ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="disciplinesLede" className="field-label">
            Section lede
          </label>
          <textarea
            id="disciplinesLede"
            name="disciplinesLede"
            rows={2}
            defaultValue={settings.disciplinesLede ?? ""}
            className="field-input"
          />
        </div>
        <input type="hidden" name="disciplineCount" value={disciplines.length} />
        {disciplines.map((item, index) => (
          <div key={`discipline-${index}`} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Discipline {index + 1}
              </span>
              {disciplines.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    setDisciplines((prev) => prev.filter((_, i) => i !== index))
                  }
                />
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`disciplineTitle${index + 1}`}
                  className="field-label"
                >
                  Title
                </label>
                <input
                  id={`disciplineTitle${index + 1}`}
                  name={`disciplineTitle${index + 1}`}
                  defaultValue={item.title}
                  className="field-input"
                />
              </div>
              <div>
                <label
                  htmlFor={`disciplineBody${index + 1}`}
                  className="field-label"
                >
                  Description
                </label>
                <input
                  id={`disciplineBody${index + 1}`}
                  name={`disciplineBody${index + 1}`}
                  defaultValue={item.body}
                  className="field-input"
                />
              </div>
            </div>
          </div>
        ))}
        <AddButton
          label="Add discipline"
          onClick={() => setDisciplines((prev) => [...prev, { ...emptyBlock }])}
        />
      </section>

      {/* ── Experience / Career timeline (dynamic) ── */}
      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">Resume</p>
          <h2 className="text-2xl font-bold">Career timeline</h2>
          <p className="body-text mt-2">
            Timeline on Work (dark band) and About. Years, role, company, place
            worked, nature of job (full-time, contract…), optional note, and
            bullets. Leave a role blank to hide that row.
          </p>
        </div>
        <div>
          <label htmlFor="experienceTitle" className="field-label">
            Section title
          </label>
          <input
            id="experienceTitle"
            name="experienceTitle"
            defaultValue={settings.experienceTitle ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="experienceLede" className="field-label">
            Section lede
          </label>
          <textarea
            id="experienceLede"
            name="experienceLede"
            rows={2}
            defaultValue={settings.experienceLede ?? ""}
            className="field-input"
          />
        </div>
        <input type="hidden" name="experienceCount" value={experience.length} />
        {experience.map((item, index) => (
          <div
            key={`experience-${index}`}
            className="space-y-3 border-t border-border pt-5 first:border-t-0 first:pt-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Role {index + 1}
              </span>
              {experience.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    setExperience((prev) => prev.filter((_, i) => i !== index))
                  }
                />
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor={`experienceYears${index + 1}`}
                  className="field-label"
                >
                  Years
                </label>
                <input
                  id={`experienceYears${index + 1}`}
                  name={`experienceYears${index + 1}`}
                  placeholder="2022 — 2024"
                  defaultValue={item.years}
                  className="field-input"
                />
              </div>
              <div>
                <label
                  htmlFor={`experienceTitle${index + 1}`}
                  className="field-label"
                >
                  Role
                </label>
                <input
                  id={`experienceTitle${index + 1}`}
                  name={`experienceTitle${index + 1}`}
                  defaultValue={item.title}
                  className="field-input"
                />
              </div>
              <div>
                <label
                  htmlFor={`experienceOrg${index + 1}`}
                  className="field-label"
                >
                  Company / org
                </label>
                <input
                  id={`experienceOrg${index + 1}`}
                  name={`experienceOrg${index + 1}`}
                  defaultValue={item.org}
                  className="field-input"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`experienceLocation${index + 1}`}
                  className="field-label"
                >
                  Place worked
                </label>
                <input
                  id={`experienceLocation${index + 1}`}
                  name={`experienceLocation${index + 1}`}
                  placeholder="Lagos · Remote"
                  defaultValue={item.location}
                  className="field-input"
                />
              </div>
              <div>
                <label
                  htmlFor={`experienceNature${index + 1}`}
                  className="field-label"
                >
                  Nature of job
                </label>
                <input
                  id={`experienceNature${index + 1}`}
                  name={`experienceNature${index + 1}`}
                  list={`experienceNatureOptions${index + 1}`}
                  placeholder="Full-time, Contract, Freelance…"
                  defaultValue={item.nature}
                  className="field-input"
                />
                <datalist id={`experienceNatureOptions${index + 1}`}>
                  <option value="Full-time" />
                  <option value="Part-time" />
                  <option value="Contract" />
                  <option value="Freelance" />
                  <option value="Internship" />
                  <option value="Remote" />
                </datalist>
              </div>
            </div>
            <div>
              <label
                htmlFor={`experienceBody${index + 1}`}
                className="field-label"
              >
                Short note
              </label>
              <textarea
                id={`experienceBody${index + 1}`}
                name={`experienceBody${index + 1}`}
                rows={2}
                defaultValue={item.body}
                className="field-input"
              />
            </div>
            <div>
              <label
                htmlFor={`experienceBullets${index + 1}`}
                className="field-label"
              >
                What you did (one bullet per line)
              </label>
              <textarea
                id={`experienceBullets${index + 1}`}
                name={`experienceBullets${index + 1}`}
                rows={4}
                placeholder={"Shipped X\nOwned Y\nImproved Z"}
                defaultValue={(item.bullets ?? []).join("\n")}
                className="field-input"
              />
            </div>
          </div>
        ))}
        <AddButton
          label="Add role"
          onClick={() =>
            setExperience((prev) => [...prev, { ...emptyExperience, bullets: [] }])
          }
        />
      </section>

      {/* ── Process steps (dynamic) ── */}
      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">Process</p>
          <h2 className="text-2xl font-bold">How I work</h2>
          <p className="body-text mt-2">
            The dark panel next to the stack on Home and About.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="processTitle" className="field-label">
              Heading
            </label>
            <input
              id="processTitle"
              name="processTitle"
              defaultValue={settings.processTitle ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="processCta" className="field-label">
              Link label
            </label>
            <input
              id="processCta"
              name="processCta"
              defaultValue={settings.processCta ?? ""}
              className="field-input"
            />
          </div>
        </div>
        <input type="hidden" name="processCount" value={processSteps.length} />
        {processSteps.map((item, index) => (
          <div key={`process-${index}`} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Step {index + 1}
              </span>
              {processSteps.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    setProcessSteps((prev) => prev.filter((_, i) => i !== index))
                  }
                />
              )}
            </div>
            <label htmlFor={`processTitle${index + 1}`} className="field-label">
              Title
            </label>
            <input
              id={`processTitle${index + 1}`}
              name={`processTitle${index + 1}`}
              defaultValue={item.title}
              className="field-input"
            />
            <label htmlFor={`processBody${index + 1}`} className="field-label">
              Description
            </label>
            <textarea
              id={`processBody${index + 1}`}
              name={`processBody${index + 1}`}
              rows={2}
              defaultValue={item.body}
              className="field-input"
            />
          </div>
        ))}
        <AddButton
          label="Add step"
          onClick={() => setProcessSteps((prev) => [...prev, { ...emptyBlock }])}
        />
      </section>

      {/* ── FAQs (dynamic) ── */}
      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">FAQ</p>
          <h2 className="text-2xl font-bold">Questions</h2>
          <p className="body-text mt-2">
            Shown on Home and Contact. Leave a question blank to hide that row.
          </p>
        </div>
        <div>
          <label htmlFor="faqTitle" className="field-label">
            Section title
          </label>
          <input
            id="faqTitle"
            name="faqTitle"
            defaultValue={settings.faqTitle ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="faqLede" className="field-label">
            Section lede
          </label>
          <textarea
            id="faqLede"
            name="faqLede"
            rows={2}
            defaultValue={settings.faqLede ?? ""}
            className="field-input"
          />
        </div>
        <input type="hidden" name="faqCount" value={faqs.length} />
        {faqs.map((item, index) => (
          <div key={`faq-${index}`} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Question {index + 1}
              </span>
              {faqs.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    setFaqs((prev) => prev.filter((_, i) => i !== index))
                  }
                />
              )}
            </div>
            <label htmlFor={`faqTitle${index + 1}`} className="field-label">
              Question
            </label>
            <input
              id={`faqTitle${index + 1}`}
              name={`faqTitle${index + 1}`}
              defaultValue={item.title}
              className="field-input"
            />
            <label htmlFor={`faqBody${index + 1}`} className="field-label">
              Answer
            </label>
            <textarea
              id={`faqBody${index + 1}`}
              name={`faqBody${index + 1}`}
              rows={3}
              defaultValue={item.body}
              className="field-input"
            />
          </div>
        ))}
        <AddButton
          label="Add question"
          onClick={() => setFaqs((prev) => [...prev, { ...emptyBlock }])}
        />
      </section>

      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">Contact</p>
          <h2 className="text-2xl font-bold">Contact details</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contactTitle" className="field-label">
              Title
            </label>
            <input
              id="contactTitle"
              name="contactTitle"
              defaultValue={settings.contactTitle ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="field-label">
              Email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={settings.contactEmail ?? ""}
              className="field-input"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contactLede" className="field-label">
            Lede
          </label>
          <textarea
            id="contactLede"
            name="contactLede"
            rows={2}
            defaultValue={settings.contactLede ?? ""}
            className="field-input"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contactPhone" className="field-label">
              Phone
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              defaultValue={settings.contactPhone ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="contactLocation" className="field-label">
              Location
            </label>
            <input
              id="contactLocation"
              name="contactLocation"
              defaultValue={settings.contactLocation ?? ""}
              className="field-input"
            />
          </div>
        </div>
      </section>

      <section className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="section-label mb-2 text-sm">Social</p>
          <h2 className="text-2xl font-bold">Social media handles / URLs</h2>
          <p className="body-text mt-2">
            Paste full profile URLs (example: https://x.com/yourhandle). These
            show on Contact and in the footer.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="socialX" className="field-label">
              X (Twitter)
            </label>
            <input
              id="socialX"
              name="socialX"
              type="url"
              placeholder="https://x.com/you"
              defaultValue={settings.socialX ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialGithub" className="field-label">
              GitHub
            </label>
            <input
              id="socialGithub"
              name="socialGithub"
              type="url"
              placeholder="https://github.com/you"
              defaultValue={settings.socialGithub ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialLinkedin" className="field-label">
              LinkedIn
            </label>
            <input
              id="socialLinkedin"
              name="socialLinkedin"
              type="url"
              placeholder="https://linkedin.com/in/you"
              defaultValue={settings.socialLinkedin ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialFacebook" className="field-label">
              Facebook
            </label>
            <input
              id="socialFacebook"
              name="socialFacebook"
              type="url"
              placeholder="https://facebook.com/you"
              defaultValue={settings.socialFacebook ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialWhatsapp" className="field-label">
              WhatsApp
            </label>
            <input
              id="socialWhatsapp"
              name="socialWhatsapp"
              type="url"
              placeholder="https://wa.me/234xxxxxxxxxx"
              defaultValue={settings.socialWhatsapp ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialInstagram" className="field-label">
              Instagram
            </label>
            <input
              id="socialInstagram"
              name="socialInstagram"
              type="url"
              placeholder="https://instagram.com/you"
              defaultValue={settings.socialInstagram ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialYoutube" className="field-label">
              YouTube
            </label>
            <input
              id="socialYoutube"
              name="socialYoutube"
              type="url"
              placeholder="https://youtube.com/@you"
              defaultValue={settings.socialYoutube ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialDiscord" className="field-label">
              Discord
            </label>
            <input
              id="socialDiscord"
              name="socialDiscord"
              type="url"
              placeholder="https://discord.gg/invite or profile URL"
              defaultValue={settings.socialDiscord ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialBluesky" className="field-label">
              Bluesky
            </label>
            <input
              id="socialBluesky"
              name="socialBluesky"
              type="url"
              placeholder="https://bsky.app/profile/you.bsky.social"
              defaultValue={settings.socialBluesky ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialMastodon" className="field-label">
              Mastodon
            </label>
            <input
              id="socialMastodon"
              name="socialMastodon"
              type="url"
              placeholder="https://mastodon.social/@you"
              defaultValue={settings.socialMastodon ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialDevto" className="field-label">
              DEV
            </label>
            <input
              id="socialDevto"
              name="socialDevto"
              type="url"
              placeholder="https://dev.to/you"
              defaultValue={settings.socialDevto ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialHashnode" className="field-label">
              Hashnode
            </label>
            <input
              id="socialHashnode"
              name="socialHashnode"
              type="url"
              placeholder="https://hashnode.com/@you"
              defaultValue={settings.socialHashnode ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialCodepen" className="field-label">
              CodePen
            </label>
            <input
              id="socialCodepen"
              name="socialCodepen"
              type="url"
              placeholder="https://codepen.io/you"
              defaultValue={settings.socialCodepen ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialStackoverflow" className="field-label">
              Stack Overflow
            </label>
            <input
              id="socialStackoverflow"
              name="socialStackoverflow"
              type="url"
              placeholder="https://stackoverflow.com/users/…"
              defaultValue={settings.socialStackoverflow ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialDribbble" className="field-label">
              Dribbble
            </label>
            <input
              id="socialDribbble"
              name="socialDribbble"
              type="url"
              placeholder="https://dribbble.com/you"
              defaultValue={settings.socialDribbble ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="socialWebsite" className="field-label">
              Canonical site URL
            </label>
            <input
              id="socialWebsite"
              name="socialWebsite"
              type="url"
              placeholder="https://francisuzoigwe.me"
              defaultValue={settings.socialWebsite ?? ""}
              className="field-input"
            />
          </div>
        </div>
        <p className="rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-ink-muted">
          Leave any field empty to hide that platform. Only filled URLs show on
          Contact and in the footer.
        </p>
      </section>

      <button type="submit" className="btn btn-primary">
        Save settings
      </button>
    </form>
  );
}
