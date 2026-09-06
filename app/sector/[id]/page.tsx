import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors, signals } from '@/data/siteData';
import { matters } from '@/data/contentData';

export function generateStaticParams(){return sectors.map((sector)=>({id:sector.id}));}
export default async function SectorPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const sector=sectors.find((item)=>item.id===id); if(!sector) notFound();
 const relatedLawyers=lawyers.filter((lawyer)=>sector.lawyerIds.includes(lawyer.id));
 const relatedSignals=signals.filter((signal)=>sector.signalIds.includes(signal.id));
 const sectorMatters=matters.filter((matter)=>matter.sectorId===sector.id);
 return <InternalShell><main>
  <section className="internal-hero"><div><div className="internal-kicker">Sector intelligence / {sector.name}</div><h1>{sector.name}</h1><p>{sector.summary}</p></div><aside className="internal-side"><small>Key matters</small><div className="tag-list">{sector.matters.map((matter)=><span className="tag" key={matter}>{matter}</span>)}</div></aside></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Matters</div><h2>{sector.strapline}</h2></div><div className="matter-list">{sector.matters.map((name,index)=>{const matter=sectorMatters.find((m)=>m.name===name);return <div className="matter-row" key={name}><span>{String(index+1).padStart(2,'0')}</span><strong>{name}</strong>{matter?<Link href={`/matters/${matter.id}`} aria-label={`Open ${name}`}>↗</Link>:<span aria-hidden="true">—</span>}</div>})}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / People in context</div><h2>Relevant people, not a separate directory.</h2></div><div className="people-context">{relatedLawyers.map((lawyer)=><article className="person-node" key={lawyer.id}><div className="initials">{lawyer.initials}</div><h3>{lawyer.name}</h3><p>{lawyer.role}</p><div className="tag-list">{lawyer.worksAcross.slice(0,3).map((item)=><span className="tag" key={item}>{item}</span>)}</div><Link href={`/people/${lawyer.id}`}>View profile →</Link></article>)}</div></div></section>
  <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">03 / Regulatory signals</div><h2>Current context around the sector.</h2></div><div className="signal-stack">{relatedSignals.length?relatedSignals.map((signal)=><div className="signal-row" key={signal.id}><small>{signal.date}</small><small>{signal.jurisdiction} / {signal.category}</small><strong>{signal.title}</strong><Link href={`/insights/${signal.id}`}>→</Link></div>):<div className="signal-row"><strong>No editorial signal is currently published for this sector.</strong></div>}</div></div></section>
 </main></InternalShell>;
}
