import Link from 'next/link';
import SiteLogo from '@/components/SiteLogo';

export default function InternalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="internal-page">
      <header className="internal-nav">
        <SiteLogo className="internal-logo" />
        <nav aria-label="Internal navigation">
          <Link href="/">Home</Link>
          <Link href="/sectors">Sectors</Link>
          <Link href="/people">People</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="internal-search" href="/#navigator">Search issues</Link>
      </header>
      <div id="main-content" tabIndex={-1}>{children}</div>
      <footer className="internal-footer">
        <div><SiteLogo className="footerLogo" /><span>© 2026 Krida Legal · General information only.</span></div>
        <nav aria-label="Legal links"><Link href="/">Home</Link><Link href="/#contact">Contact</Link><span>Privacy</span><span>Terms</span><span>Disclaimer</span></nav>
      </footer>
    </div>
  );
}
