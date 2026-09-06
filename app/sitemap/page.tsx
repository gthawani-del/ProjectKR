import Link from 'next/link';
import InternalShell from '@/components/InternalShell';
import { sectors } from '@/data/siteData';
import { matters, practices } from '@/data/contentData';

export default function SitemapPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Sitemap</div><h1>Find your way through Krida.</h1><p>The site is organised around sectors, matters, practice areas, people and regulatory intelligence.</p></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Core</div><h2>Main destinations.</h2></div><div className="sitemap-grid"><Link href="/#top">Home</Link><Link href="/sectors">Sectors</Link><Link href="/practices">Practice Areas</Link><Link href="/people">People</Link><Link href="/insights">Insights</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Sectors</div><h2>Industry context.</h2></div><div className="sitemap-grid">{sectors.map((sector)=><Link href={`/sector/${sector.id}`} key={sector.id}>{sector.name}</Link>)}</div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">03 / Matters</div><h2>Issue-led routes.</h2></div><div className="sitemap-grid">{matters.map((matter)=><Link href={`/matters/${matter.id}`} key={matter.id}>{matter.name}</Link>)}</div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">04 / Practice Areas</div><h2>Legal capability.</h2></div><div className="sitemap-grid">{practices.map((practice)=><Link href={`/practices/${practice.id}`} key={practice.id}>{practice.name}</Link>)}</div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">05 / Legal</div><h2>Site information.</h2></div><div className="sitemap-grid"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/disclaimer">Disclaimer</Link></div></div></section>
  </main></InternalShell>;
}
