import Link from 'next/link';
import SiteLogo from '@/components/SiteLogo';

export default function InternalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="internal-page">
      <header className="internal-nav">
        <SiteLogo className="internal-logo" />
        <nav aria-label="Internal navigation">
          <Link href="/#top">Home</Link>
          <Link href="/sectors">Sectors</Link>
          <Link href="/practices">Practice Areas</Link>
          <Link href="/people">People</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="internal-search" href="/#navigator">Search issues</Link>
        <details className="mobileNav">
          <summary aria-label="Open navigation"><span>Menu</span><b aria-hidden="true">+</b></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/#top">Home</Link>
            <Link href="/sectors">Sectors</Link>
            <Link href="/practices">Practice Areas</Link>
            <Link href="/people">People</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/about">About</Link>
            <Link href="/#navigator">Search issues</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </header>
      <div id="main-content" tabIndex={-1}>{children}</div>
      <footer className="internal-footer">
        <div><SiteLogo className="footerLogo" /><span>© 2026 Krida Legal · General information only.</span></div>
        <nav aria-label="Legal links"><Link href="/#top">Home</Link><Link href="/sectors">Sectors</Link><Link href="/practices">Practice Areas</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/sitemap">Sitemap</Link></nav>
      </footer>
    </div>
  );
}
