import Link from 'next/link';
import InternalShell from '@/components/InternalShell';
import { lawyers } from '@/data/siteData';

export default function PeoplePage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">People</div><h1>Expertise in context.</h1><p>Find people through the matters and sectors they work across, rather than through a detached directory.</p></div><aside className="internal-side"><small>People</small><div className="tag-list">{lawyers.map(l=><span className="tag" key={l.id}>{l.role}</span>)}</div></aside></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / People</div><h2>Connected to the work.</h2></div><div className="people-context">{lawyers.map(l=><article className="person-node" key={l.id}><div className="initials">{l.initials}</div><h3>{l.name}</h3><p>{l.role}</p><div className="tag-list">{l.worksAcross.map(x=><span className="tag" key={x}>{x}</span>)}</div><Link href={`/people/${l.id}`}>View profile →</Link></article>)}</div></div></section>
  </main></InternalShell>
}
