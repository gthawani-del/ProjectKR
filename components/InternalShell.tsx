import Link from 'next/link';

export default function InternalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="internal-page">
      <header className="internal-nav">
        <Link className="internal-logo" href="/" aria-label="Krida Legal home">
          <img src="/brand/krida-legal-logo.svg" alt="Krida Legal" />
        </Link>
        <nav aria-label="Internal navigation">
          <Link href="/">Home</Link>
          <Link href="/sector/sport">Sectors</Link>
          <Link href="/people/vidushpat">People</Link>
          <Link href="/insights/gaming-rules">Insights</Link>
        </nav>
        <Link className="internal-search" href="/#navigator">Search issues</Link>
      </header>
      <div id="main-content" tabIndex={-1}>{children}</div>
      <footer className="internal-footer">
        <Link className="internal-footer-logo" href="/" aria-label="Krida Legal home"><img src="/brand/krida-legal-logo.svg" alt="Krida Legal" /></Link>
        <div>© 2026 Krida Legal · General information only.</div>
        <nav aria-label="Legal links">
          <Link href="/">Home</Link>
          <Link href="/#contact">Contact</Link>
          <span>Privacy</span><span>Terms</span><span>Disclaimer</span>
        </nav>
      </footer>
    </div>
  );
}
