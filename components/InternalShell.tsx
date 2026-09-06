import Link from 'next/link';

export default function InternalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="internal-page">
      <header className="internal-nav">
        <Link className="internal-brand" href="/">KRIDA LEGAL</Link>
        <nav aria-label="Internal navigation">
          <Link href="/">Home</Link>
          <Link href="/sector/sport">Sectors</Link>
          <Link href="/people/vidushpat">People</Link>
          <Link href="/insights/gaming-rules">Insights</Link>
        </nav>
        <Link className="internal-search" href="/#issue-navigator">Search issues</Link>
      </header>
      {children}
      <footer className="internal-footer">
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
