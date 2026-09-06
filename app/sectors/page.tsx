import Image from 'next/image';
import Link from 'next/link';
import InternalShell from '@/components/InternalShell';
import { sectors } from '@/data/siteData';
import { sectorImages } from '@/data/imageAssets';

export default function SectorsPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Sectors</div><h1>Start with the market.</h1><p>Explore Krida Legal through sectors where regulation, rights, commercial structures and disputes intersect.</p></div><aside className="internal-side"><small>Discovery layer</small><p>Each sector connects onward to specific matters, practice areas, people and relevant regulatory signals.</p></aside></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Sector map</div><h2>Four routes into the work.</h2></div><div className="people-context">{sectors.map((sector)=><article className="person-node" key={sector.id}><div className="internalHeroMedia"><Image src={sectorImages[sector.id]} alt={`${sector.name} sector`} fill sizes="(max-width: 768px) 100vw, 28vw" /></div><h3>{sector.name}</h3><p>{sector.strapline}</p><div className="tag-list">{sector.matters.slice(0,4).map((matter)=><span className="tag" key={matter}>{matter}</span>)}</div><Link href={`/sector/${sector.id}`}>Explore sector →</Link></article>)}</div></div></section>
    <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">02 / Connected thinking</div><h2>Sector is the starting point, not the endpoint.</h2></div><div><p className="internal-copy">Move from a sector into the specific matter, then into the practice capability, relevant people and current legal context.</p><Link className="primaryButton" href="/#navigator">Use the issue navigator →</Link></div></div></section>
  </main></InternalShell>;
}
