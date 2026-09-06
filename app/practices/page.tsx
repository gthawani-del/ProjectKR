import Image from 'next/image';
import Link from 'next/link';
import InternalShell from '@/components/InternalShell';
import { practices } from '@/data/contentData';
import { practiceImages } from '@/data/imageAssets';

export default function PracticesPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Practice Areas</div><h1>Established legal capability.</h1><p>Practice Areas show the legal disciplines behind Krida Legal’s sector and matter-led work.</p></div><aside className="internal-side"><small>Capability layer</small><p>Use Sectors to start with the market, Matters to start with the issue, and Practice Areas to understand the legal capability involved.</p></aside></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Practice Areas</div><h2>Six established capabilities.</h2></div><div className="people-context">{practices.map((practice)=><article className="person-node" key={practice.id}><div className="internalHeroMedia"><Image src={practiceImages[practice.id]} alt={`${practice.name} practice area`} fill sizes="(max-width: 768px) 100vw, 28vw" /></div><h3>{practice.name}</h3><p>{practice.summary}</p><div className="tag-list">{practice.capabilities.slice(0,3).map((capability)=><span className="tag" key={capability}>{capability}</span>)}</div><Link href={`/practices/${practice.id}`}>Explore practice area →</Link></article>)}</div></div></section>
  </main></InternalShell>;
}
