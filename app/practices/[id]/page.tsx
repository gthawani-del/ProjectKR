import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { matters, practices } from '@/data/contentData';
import { practiceImages } from '@/data/imageAssets';

export function generateStaticParams(){return practices.map((practice)=>({id:practice.id}));}
export default async function PracticePage({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const practice=practices.find((item)=>item.id===id); if(!practice) notFound();
 const connected=matters.filter((m)=>m.practiceIds.includes(practice.id));
 return <InternalShell><main>
  <section className="internal-hero"><div><div className="internal-kicker">Practice</div><h1>{practice.name}</h1><p>{practice.summary}</p></div><aside className="internal-side"><div className="internalHeroMedia"><Image src={practiceImages[practice.id]} alt={`${practice.name} practice`} fill sizes="(max-width: 768px) 100vw, 38vw" priority /></div><small>Krida Legal capability</small><p>Structured from the firm’s established practice content and presented as an informational overview.</p></aside></section>
  <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Capabilities</div><h2>What the practice covers.</h2></div><div className="matter-list">{practice.capabilities.map((item,index)=><div className="matter-row" key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong><span>—</span></div>)}</div></div></section>
  <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">02 / Connected matters</div><h2>Move from capability to issue.</h2></div><div className="related-links">{connected.length?connected.map((m)=><Link href={`/matters/${m.id}`} key={m.id}><strong>{m.name}</strong><br/><span>{m.intro}</span></Link>):<p>Additional matter connections will be added as the content model expands.</p>}</div></div></section>
 </main></InternalShell>;
}
