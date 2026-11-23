import Image from "next/image";
import { experience, profile, projects } from "@/content/portfolio";
import { CvDialog } from "./cv-dialog";
import { ExperienceTabs } from "./experience-tabs";
import { LagosClock } from "./lagos-clock";
import { ProjectPreview } from "./project-preview";
import { ProjectLinks } from "./project-links";
import { ScrollHeader } from "./scroll-header";
import { TransferDemo } from "./transfer-demo";
import { EmailIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon, XIcon } from "./social-icons";

const socials = [
  { label: "GitHub", href: profile.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: profile.instagram, Icon: InstagramIcon },
  { label: "X", href: profile.x, Icon: XIcon },
  { label: "Facebook", href: profile.facebook, Icon: FacebookIcon },
  { label: "WhatsApp", href: profile.whatsapp, Icon: WhatsAppIcon },
];

const contactChannels = [
  { label: "Email", href: `mailto:${profile.email}`, Icon: EmailIcon },
  ...socials,
];

export default function Home() {
  const email = `mailto:${profile.email}`;

  return (
    <main className="portfolio">
      <ScrollHeader>
        <span>@thatmanfrancis</span>
        <nav className="section-nav" aria-label="On this page">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="masthead-location"><span>{profile.location}</span><LagosClock /></div>
      </ScrollHeader>

      <section className="intro shell" aria-labelledby="hero-title">
        <h1 id="hero-title">{profile.name}</h1>
        <p className="intro-role">{profile.role}</p>
        <div className="intro-details">
          <p>{profile.intro}</p>
          <div className="intro-actions">
            {profile.resume && <CvDialog src={profile.resume} />}
            <a className="work-link" href="#work">Selected work</a>
          </div>
        </div>
        <div className="contact-links">
          <nav className="social-rail" aria-label="Social profiles">
            {socials.map(({ label, href, Icon }) => (
              <a aria-label={label} title={label} href={href} key={label}><Icon /></a>
            ))}
          </nav>
          <div className="email-rail"><a href={email}>{profile.email}</a></div>
        </div>
      </section>

      <section id="about" className="content-section shell" aria-labelledby="about-title">
        <h2 id="about-title">About me</h2>
        <div className="about-content">
          <div className="about-copy">
            {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h3>What I work with</h3>
            <ul className="stack-list">
              {profile.skills.map(({ name, icon }) => (
                <li key={name}>
                  <Image src={`/images/tech/${icon}.svg`} alt="" width={18} height={18} unoptimized />
                  {name}
                </li>
              ))}
            </ul>
            <h4 className="stack-heading">DevOps and infrastructure</h4>
            <ul className="stack-list">
              {profile.infrastructure.map(({ name, icon }) => (
                <li key={name}>
                  <Image src={`/images/tech/${icon}.svg`} alt="" width={18} height={18} unoptimized />
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <Image className="about-portrait" src={profile.portrait} alt={`Portrait of ${profile.name}`} width={460} height={460} unoptimized />
        </div>
      </section>

      <section id="experience" className="content-section experience-section shell" aria-labelledby="experience-title">
        <h2 id="experience-title">Where I’ve worked</h2>
        <ExperienceTabs entries={experience} />
        <div className="career-list">
          {experience.map((entry, index) => (
            <div className="career-row" key={entry.name}>
            <details name="career" open={index === 0}>
              <summary>
                <span>
                  <strong>{entry.name}</strong>
                  <span className="career-role">{entry.role}</span>
                </span>
                <span className="career-period">{entry.period}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <ul className="career-points">
                {entry.contributions.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </details>
            <ProjectLinks {...entry} />
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="work shell" aria-labelledby="work-title">
        <h2 id="work-title">Things I’ve built</h2>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-story" key={project.slug}>
              <div className="story-copy">
                <p>{project.category}</p>
                <div className="story-heading linked-name">
                  <h3>{project.name}</h3>
                  <ProjectLinks {...project} />
                </div>
                <div className="story-note">
                  <p>{project.summary}</p>
                  <p className="story-result"><strong>{project.metric}</strong> <span>{project.metricLabel}</span></p>
                  <ProjectPreview project={project} />
                </div>
                <ul className="story-tools" aria-label={`${project.name} tools and techniques`}>
                  {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </div>
              {project.screenshot && (
                <figure className="story-visual story-screenshot">
                  <Image {...project.screenshot} alt={`${project.name} public homepage`} unoptimized />
                  <figcaption>Public homepage</figcaption>
                </figure>
              )}
              {project.slug === "ouropay" && <div className="story-visual"><TransferDemo /></div>}
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section shell" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Let’s talk</h2>
          <p>{profile.contactIntro}</p>
        </div>
        <nav className="contact-actions" aria-label="Contact and social links">
          {contactChannels.map(({ label, href, Icon }) => (
            <a aria-label={label} title={label} href={href} key={label}><Icon /></a>
          ))}
        </nav>
      </section>
    </main>
  );
}
