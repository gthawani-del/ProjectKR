import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors, signals } from '@/data/siteData';
import { matters, practices } from '@/data/contentData';
import { peopleImages, practiceImages } from '@/data/imageAssets';

export function generateStaticParams(){return practices.map((practice)=>({id:practice.id}));}
export default async function PracticePage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const practice=practices.find((item)=>item.id===id); if(!practice) notFound();
 const connected=matters.filter((m)=>m.practiceIds.includes(practice.id));
 const sectorIds=[...new Set(connected.map((m)=>m.sectorId))];
 const lawyerIds=[...new Set(connected.flatMap((m)=>m.lawyerIds))];
 const relatedSectors=sectors.filter((sector)=>sectorIds.includes(sector.id));
 const relatedLawyers=lawyers.filter((lawyer)=>lawyerIds.includes(lawyer.id));
 const relatedSignals=signals.filter((signal)=>relatedSectors.some((sector)=>sector.signalIds.includes(signal.id)));
 return <InternalShell><main>
  <section className="internal-hero"><div><div className="internal-kicker">Practice Area</div><h1>{practice.name}</h1><p>{practice.summary}</p></div><aside className="internal-side"><div className="internalHeroMedia"><Image src={practiceImages[practice.id]} alt={`${practice.name} practice area`} fill sizes="(max-width: 768px) 100vw, 38vw" priority /></div><small>Connected sectors</small><div className="tag-list">{relatedSectors.map((sector)=><Link className="tag" href={`/sector/${sector.id}`} key={sector.id}>{sector.name}</Link>)}</div></aside></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Capabilities</div><h2>What the practice covers.</h2></div><div className="matter-list">{practice.capabilities.map((item,index)=><div className="matter-row" key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong><span>—</span></div>)}</div></div></section>
  <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">02 / Connected matters</div><h2>Move from capability to issue.</h2></div><div className="related-links">{connected.length?connected.map((m)=><Link href={`/matters/${m.id}`} key={m.id}><strong>{m.name}</strong><br/><span>{m.intro}</span></Link>):<p>Additional matter connections will be added as the content model expands.</p>}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">03 / People</div><h2>People connected to this capability.</h2></div><div className="people-context">{relatedLawyers.map((lawyer)=><article className="person-node" key={lawyer.id}>{peopleImages[lawyer.id]?<div className="lawyerPortrait"><Image src={peopleImages[lawyer.id]} alt={lawyer.name} fill sizes="(max-width: 768px) 88vw, 28vw" /></div>:<div className="initials">{lawyer.initials}</div>}<h3>{lawyer.name}</h3><p>{lawyer.role}</p><div className="tag-list">{connected.filter((m)=>m.lawyerIds.includes(lawyer.id)).slice(0,3).map((m)=><Link className="tag" href={`/matters/${m.id}`} key={m.id}>{m.name}</Link>)}</div><Link href={`/people/${lawyer.id}`}>View profile →</Link></article>)}</div></div></section>
  <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">04 / Relevant signals</div><h2>Current context around the capability.</h2></div><div className="signal-stack">{relatedSignals.length?relatedSignals.map((signal)=><div className="signal-row" key={signal.id}><small>{signal.date}</small><small>{signal.jurisdiction} / {signal.category}</small><strong>{signal.title}</strong><Link href={`/insights/${signal.id}`}>→</Link></div>):<div className="signal-row"><strong>No editorial signal is currently published for this practice area.</strong></div>}</div></div></section>
 </main></InternalShell>;
}
