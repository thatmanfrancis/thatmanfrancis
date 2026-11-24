import Link from "next/link";
import { profile } from "@/content/portfolio";

export default function NotFound() {
  return (
    <main className="not-found-page case-study-page shell">
      <title>{`Page not found | ${profile.name}`}</title>
      <Link className="masthead-brand" href="/" aria-label={`${profile.name}, homepage`}>
        {profile.signature}
      </Link>
      <div className="case-study-header">
        <p>404</p>
        <h1>Page not found</h1>
        <p>The link may have changed. Head home or browse my selected work.</p>
        <div className="intro-actions not-found-actions">
          <Link className="cv-link" href="/">Back to home</Link>
          <Link className="work-link" href="/#work">Selected work</Link>
        </div>
      </div>
    </main>
  );
}
