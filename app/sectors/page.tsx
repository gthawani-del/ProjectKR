import Link from 'next/link';
import InternalShell from '@/components/InternalShell';
import { sectors } from '@/data/siteData';

export default function SectorsPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Sectors</div><h1>Where law meets moving industries.</h1><p>Krida Legal organises its work around sectors where regulation, rights, technology, content and commercial strategy regularly intersect.</p></div><aside className="internal-side"><small>Explore</small><div className="tag-list">{sectors.map(s=><span className="tag" key={s.id}>{s.name}</span>)}</div></aside></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Sector map</div><h2>Start with the industry context.</h2></div><div className="matter-list">{sectors.map((s,i)=><div className="matter-row" key={s.id}><span>{String(i+1).padStart(2,'0')}</span><strong>{s.name}</strong><Link href={`/sector/${s.id}`}>↗</Link></div>)}</div></div></section>
    <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">02 / Connected thinking</div><h2>Sectors do not operate in isolation.</h2></div><div><p className="internal-copy">A sponsorship issue can involve sport, intellectual property and commercial contracts. A gaming matter can engage regulation, payments, data and disputes. The site is designed to let users move between these connected areas instead of forcing every question into a single practice label.</p><Link className="primaryButton" href="/#navigator">Use the issue navigator →</Link></div></div></section>
  </main></InternalShell>
}
