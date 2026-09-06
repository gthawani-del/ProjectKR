import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors, signals } from '@/data/siteData';
import { matters, practices } from '@/data/contentData';

export function generateStaticParams(){return matters.map((matter)=>({id:matter.id}));}
export default async function MatterPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const matter=matters.find((item)=>item.id===id); if(!matter) notFound();
 const sector=sectors.find((item)=>item.id===matter.sectorId);
 const relatedPractices=practices.filter((p)=>matter.practiceIds.includes(p.id));
 const relatedLawyers=lawyers.filter((l)=>matter.lawyerIds.includes(l.id));
 const relatedSignals=signals.filter((signal)=>signal.matterIds.includes(matter.id));
 return <InternalShell><main>
  <section className="internal-hero"><div><div className="internal-kicker">Matter / {sector?.name}</div><h1>{matter.name}</h1><p>{matter.intro}</p></div><aside className="internal-side">{sector&&<><small>Sector</small><div className="tag-list"><Link className="tag" href={`/sector/${sector.id}`}>{sector.name}</Link></div></>}<small>Connected practices</small><div className="tag-list">{relatedPractices.map((p)=><Link className="tag" href={`/practices/${p.id}`} key={p.id}>{p.name}</Link>)}</div></aside></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Scope</div><h2>What this matter can involve.</h2></div><div className="matter-list">{matter.scope.map((item,index)=><div className="matter-row" key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong><span>—</span></div>)}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Practice context</div><h2>The legal capabilities behind the matter.</h2></div><div className="related-links">{relatedPractices.map((p)=><Link href={`/practices/${p.id}`} key={p.id}><strong>{p.name}</strong><br/><span>{p.summary}</span></Link>)}</div></div></section>
  <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">03 / People</div><h2>Experience connected to the subject.</h2></div><div className="people-context">{relatedLawyers.map((l)=><article className="person-node" key={l.id}><div className="initials">{l.initials}</div><h3>{l.name}</h3><p>{l.role}</p><Link href={`/people/${l.id}`}>View profile →</Link></article>)}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">04 / Current context</div><h2>Relevant regulatory signals.</h2></div><div className="signal-stack">{relatedSignals.length?relatedSignals.map((signal)=><div className="signal-row" key={signal.id}><small>{signal.date}</small><small>{signal.jurisdiction} / {signal.category}</small><strong>{signal.title}</strong><Link href={`/insights/${signal.id}`}>→</Link></div>):<div className="signal-row"><strong>No editorial signal is currently published for this matter.</strong></div>}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">05 / Enquiry</div><h2>Start with the matter.</h2></div><div><p>This page provides general information about the types of work connected to this matter. It does not constitute legal advice.</p><Link className="primaryButton" href="/#contact">General enquiry →</Link></div></div></section>
 </main></InternalShell>;
}
