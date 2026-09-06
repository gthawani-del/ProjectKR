import Image from 'next/image';
import Link from 'next/link';
import InternalShell from '@/components/InternalShell';
import { signals } from '@/data/siteData';
import { insightImages } from '@/data/imageAssets';

export default function InsightsPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Regulatory Radar</div><h1>Signals, analysis and perspective.</h1><p>A structured view of legal and regulatory developments connected to Krida Legal’s core sectors. Published updates should be lawyer-reviewed and linked to primary sources.</p></div><aside className="internal-side"><div className="insightHeroMedia"><Image src={insightImages.overview} alt="Krida Legal insights and analysis" fill sizes="(max-width: 768px) 100vw, 38vw" priority /></div><small>Filter concepts</small><div className="tag-list"><span className="tag">Sport</span><span className="tag">Gaming</span><span className="tag">IP</span><span className="tag">India</span><span className="tag">Global</span></div></aside></section>
    <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">01 / Current signals</div><h2>What changed and why it matters.</h2></div><div className="signal-stack">{signals.map(s=><div className="signal-row" key={s.id}><small>{s.date}</small><small>{s.jurisdiction} / {s.category}</small><strong>{s.title}</strong><Link href={`/insights/${s.id}`}>→</Link></div>)}</div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Publishing standard</div><h2>Useful before prolific.</h2></div><p className="internal-copy">The Radar should prioritise material developments, explain the practical implication, identify the relevant sector and people, and link to the official source. It should not become a high-volume news feed.</p></div></section>
  </main></InternalShell>
}
