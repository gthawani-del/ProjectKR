import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors, signals } from '@/data/siteData';

export function generateStaticParams() {
  return signals.map((signal) => ({ id: signal.id }));
}

export default async function InsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const signal = signals.find((item) => item.id === id);
  if (!signal) notFound();

  const relatedSectors = sectors.filter((sector) => sector.signalIds.includes(signal.id));
  const relatedLawyers = lawyers.filter((lawyer) => relatedSectors.some((sector) => sector.lawyerIds.includes(lawyer.id)));

  return (
    <InternalShell>
      <main>
        <section className="insight-hero">
          <div className="internal-kicker">Regulatory Radar / {signal.category}</div>
          <div className="insight-meta"><span>{signal.date}</span><span>{signal.jurisdiction}</span><span>{signal.category}</span></div>
          <h1>{signal.title}</h1>
        </section>

        <article className="article-body">
          <p>This page is the editorial detail template for Krida Legal’s Regulatory Radar. The final published version should contain a concise, lawyer-reviewed explanation of what changed, why it matters and the primary official source.</p>
          <div className="article-note">This material is intended for general information only and is not legal advice. Editorial and legal review is required before publication.</div>
          <p>The page deliberately connects the update to relevant sectors and people so users can move from a legal development to the broader context without returning to a generic navigation menu.</p>
        </article>

        <section className="internal-section">
          <div className="section-grid">
            <div><div className="section-label">01 / Connected context</div><h2>From signal to sector.</h2></div>
            <div className="related-links">{relatedSectors.map((sector) => <Link href={`/sector/${sector.id}`} key={sector.id}><strong>{sector.name}</strong><br/><span>{sector.strapline}</span></Link>)}</div>
          </div>
        </section>

        <section className="internal-section">
          <div className="section-grid">
            <div><div className="section-label">02 / Relevant people</div><h2>People connected to the subject.</h2></div>
            <div className="people-context">{relatedLawyers.map((lawyer) => <article className="person-node" key={lawyer.id}><div className="initials">{lawyer.initials}</div><h3>{lawyer.name}</h3><p>{lawyer.role}</p><Link href={`/people/${lawyer.id}`}>View profile →</Link></article>)}</div>
          </div>
        </section>
      </main>
    </InternalShell>
  );
}
