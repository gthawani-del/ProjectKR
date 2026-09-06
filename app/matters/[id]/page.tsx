import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors } from '@/data/siteData';
import { matters, practices } from '@/data/contentData';

export function generateStaticParams(){return matters.map((matter)=>({id:matter.id}));}
export default async function MatterPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const matter=matters.find((item)=>item.id===id); if(!matter) notFound();
 const sector=sectors.find((item)=>item.id===matter.sectorId);
 const relatedPractices=practices.filter((p)=>matter.practiceIds.includes(p.id));
 const relatedLawyers=lawyers.filter((l)=>matter.lawyerIds.includes(l.id));
 return <InternalShell><main>
  <section className="internal-hero"><div><div className="internal-kicker">Matter / {sector?.name}</div><h1>{matter.name}</h1><p>{matter.intro}</p></div><aside className="internal-side"><small>Connected practices</small><div className="tag-list">{relatedPractices.map((p)=><Link className="tag" href={`/practices/${p.id}`} key={p.id}>{p.name}</Link>)}</div></aside></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Scope</div><h2>What this matter can involve.</h2></div><div className="matter-list">{matter.scope.map((item,index)=><div className="matter-row" key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong><span>↗</span></div>)}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Practice context</div><h2>The legal capabilities behind the matter.</h2></div><div className="related-links">{relatedPractices.map((p)=><Link href={`/practices/${p.id}`} key={p.id}><strong>{p.name}</strong><br/><span>{p.summary}</span></Link>)}</div></div></section>
  <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">03 / People</div><h2>Experience connected to the subject.</h2></div><div className="people-context">{relatedLawyers.map((l)=><article className="person-node" key={l.id}><div className="initials">{l.initials}</div><h3>{l.name}</h3><p>{l.role}</p><Link href={`/people/${l.id}`}>View profile →</Link></article>)}</div></div></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">04 / Enquiry</div><h2>Start with the matter.</h2></div><div><p>This page provides general information about the types of work connected to this matter. It does not constitute legal advice.</p><Link className="primaryButton" href="/#contact">General enquiry →</Link></div></div></section>
 </main></InternalShell>;
}
