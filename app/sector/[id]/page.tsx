import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors, signals } from '@/data/siteData';
import { matters, practices } from '@/data/contentData';
import { peopleImages, sectorImages } from '@/data/imageAssets';

export function generateStaticParams(){return sectors.map((sector)=>({id:sector.id}));}
export default async function SectorPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const sector=sectors.find((item)=>item.id===id); if(!sector) notFound();
 const relatedLawyers=lawyers.filter((lawyer)=>sector.lawyerIds.includes(lawyer.id));
 const relatedSignals=signals.filter((signal)=>sector.signalIds.includes(signal.id));
 const sectorMatters=matters.filter((matter)=>matter.sectorId===sector.id);
 const practiceIds=[...new Set(sectorMatters.flatMap((matter)=>matter.practiceIds))];
 const relatedPractices=practices.filter((practice)=>practiceIds.includes(practice.id));
 return <InternalShell><main>
  <section className="internal-hero"><div><div className="internal-kicker">Sector intelligence / {sector.name}</div><h1>{sector.name}</h1><p>{sector.summary}</p></div><aside className="internal-side"><div className="internalHeroMedia"><Image src={sectorImages[sector.id]} alt={`${sector.name} sector`} fill sizes="(max-width: 768px) 100vw, 38vw" priority /></div><small>Key matters</small><div className="tag-list">{sectorMatters.map((matter)=><Link className="tag" href={`/matters/${matter.id}`} key={matter.id}>{matter.name}</Link>)}</div></aside></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Matters</div><h2>{sector.strapline}</h2></div><div className="matter-list">{sectorMatters.map((matter,index)=><div className="matter-row" key={matter.id}><span>{String(index+1).padStart(2,'0')}</span><strong>{matter.name}</strong><Link href={`/matters/${matter.id}`} aria-label={`Open ${matter.name}`}>↗</Link></div>)}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Practice Areas</div><h2>Legal capabilities behind the sector.</h2></div><div className="related-links">{relatedPractices.map((practice)=><Link href={`/practices/${practice.id}`} key={practice.id}><strong>{practice.name}</strong><br/><span>{practice.summary}</span></Link>)}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">03 / People in context</div><h2>Relevant people, connected to the work.</h2></div><div className="people-context">{relatedLawyers.map((lawyer)=><article className="person-node" key={lawyer.id}>{peopleImages[lawyer.id]?<div className="lawyerPortrait"><Image src={peopleImages[lawyer.id]} alt={lawyer.name} fill sizes="(max-width: 768px) 88vw, 28vw" /></div>:<div className="initials">{lawyer.initials}</div>}<h3>{lawyer.name}</h3><p>{lawyer.role}</p><div className="tag-list">{sectorMatters.filter((matter)=>matter.lawyerIds.includes(lawyer.id)).slice(0,3).map((matter)=><Link className="tag" href={`/matters/${matter.id}`} key={matter.id}>{matter.name}</Link>)}</div><Link href={`/people/${lawyer.id}`}>View profile →</Link></article>)}</div></div></section>
  <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">04 / Regulatory signals</div><h2>Current context around the sector.</h2></div><div className="signal-stack">{relatedSignals.length?relatedSignals.map((signal)=><div className="signal-row" key={signal.id}><small>{signal.date}</small><small>{signal.jurisdiction} / {signal.category}</small><strong>{signal.title}</strong><Link href={`/insights/${signal.id}`}>→</Link></div>):<div className="signal-row"><strong>No editorial signal is currently published for this sector.</strong></div>}</div></div></section>
 </main></InternalShell>;
}
