import { GithubIcon, LinkIcon } from "./social-icons";

export function ProjectLinks({ name, source, website }: { name: string; source?: string; website?: string }) {
  if (!source && !website) return null;

  return (
    <span className="project-links">
      {source && (
        <a href={source} aria-label={`${name} GitHub repository`} title="GitHub repository">
          <GithubIcon />
        </a>
      )}
      {website && (
        <a href={website} aria-label={`${name} website`} title="Website">
          <LinkIcon />
        </a>
      )}
    </span>
  );
}
