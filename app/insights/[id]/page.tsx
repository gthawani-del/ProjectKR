import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors, signals } from '@/data/siteData';
import { matters, practices } from '@/data/contentData';
import { insightImages, peopleImages } from '@/data/imageAssets';

export function generateStaticParams() {
  return signals.map((signal) => ({ id: signal.id }));
}

export default async function InsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const signal = signals.find((item) => item.id === id);
  if (!signal) notFound();

  const relatedMatters = matters.filter((matter) => signal.matterIds.includes(matter.id));
  const relatedSectorIds = [...new Set(relatedMatters.map((matter) => matter.sectorId))];
  const practiceIds = [...new Set(relatedMatters.flatMap((matter) => matter.practiceIds))];
  const lawyerIds = [...new Set(relatedMatters.flatMap((matter) => matter.lawyerIds))];
  const relatedSectors = sectors.filter((sector) => relatedSectorIds.includes(sector.id));
  const relatedPractices = practices.filter((practice) => practiceIds.includes(practice.id));
  const relatedLawyers = lawyers.filter((lawyer) => lawyerIds.includes(lawyer.id));

  return (
    <InternalShell>
      <main>
        <section className="insight-hero">
          <div className="internal-kicker">Regulatory Radar / {signal.category}</div>
          <div className="insight-meta"><span>{signal.date}</span><span>{signal.jurisdiction}</span><span>{signal.category}</span></div>
          <h1>{signal.title}</h1>
          <div className="insightHeroMedia"><Image src={insightImages.radar} alt="Krida Legal regulatory radar" fill sizes="100vw" priority /></div>
        </section>

        <article className="article-body">
          <p>This page is the editorial detail template for Krida Legal’s Regulatory Radar. The final published version should contain a concise, lawyer-reviewed explanation of what changed, why it matters and the primary official source.</p>
          <div className="article-note">This material is intended for general information only and is not legal advice. Editorial and legal review is required before publication.</div>
          <p>The page connects the update to relevant matters, practice areas, sectors and people so users can move directly from a legal development to the work it affects.</p>
        </article>

        <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Connected matters</div><h2>What this signal can affect.</h2></div><div className="related-links">{relatedMatters.map((matter)=><Link href={`/matters/${matter.id}`} key={matter.id}><strong>{matter.name}</strong><br/><span>{matter.intro}</span></Link>)}</div></div></section>
        <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Practice Areas</div><h2>Capabilities connected to the development.</h2></div><div className="related-links">{relatedPractices.map((practice)=><Link href={`/practices/${practice.id}`} key={practice.id}><strong>{practice.name}</strong><br/><span>{practice.summary}</span></Link>)}</div></div></section>
        <section className="internal-section"><div className="section-grid"><div><div className="section-label">03 / Connected sectors</div><h2>From signal to market context.</h2></div><div className="related-links">{relatedSectors.map((sector) => <Link href={`/sector/${sector.id}`} key={sector.id}><strong>{sector.name}</strong><br/><span>{sector.strapline}</span></Link>)}</div></div></section>
        <section className="internal-section"><div className="section-grid"><div><div className="section-label">04 / Relevant people</div><h2>People connected to the subject.</h2></div><div className="people-context">{relatedLawyers.map((lawyer) => <article className="person-node" key={lawyer.id}>{peopleImages[lawyer.id]?<div className="lawyerPortrait"><Image src={peopleImages[lawyer.id]} alt={lawyer.name} fill sizes="(max-width: 768px) 88vw, 28vw" /></div>:<div className="initials">{lawyer.initials}</div>}<h3>{lawyer.name}</h3><p>{lawyer.role}</p><div className="tag-list">{relatedMatters.filter((matter)=>matter.lawyerIds.includes(lawyer.id)).slice(0,3).map((matter)=><Link className="tag" href={`/matters/${matter.id}`} key={matter.id}>{matter.name}</Link>)}</div><Link href={`/people/${lawyer.id}`}>View profile →</Link></article>)}</div></div></section>
      </main>
    </InternalShell>
  );
}
