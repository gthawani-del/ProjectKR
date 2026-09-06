import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalShell from '@/components/InternalShell';
import { lawyers, sectors, signals } from '@/data/siteData';

export function generateStaticParams() {
  return lawyers.map((lawyer) => ({ id: lawyer.id }));
}

export default async function LawyerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lawyer = lawyers.find((item) => item.id === id);
  if (!lawyer) notFound();

  const relatedSectors = sectors.filter((sector) => sector.lawyerIds.includes(lawyer.id));
  const relatedSignals = signals.filter((signal) => relatedSectors.some((sector) => sector.signalIds.includes(signal.id)));

  return (
    <InternalShell>
      <main>
        <section className="profile-hero">
          <div className="profile-monogram" aria-hidden="true">{lawyer.initials}</div>
          <div className="profile-copy">
            <div className="internal-kicker">People / Profile</div>
            <h1>{lawyer.name}</h1>
            <div className="profile-role">{lawyer.role}</div>
            <p>{lawyer.name} works across matters where sector knowledge, regulation and commercial context intersect. This profile is structured around the work and issues connected to the lawyer, rather than biography alone.</p>
            <div className="profile-links"><Link href="/#contact">General enquiry</Link><Link href="/#navigator">Find a relevant issue</Link></div>
          </div>
        </section>

        <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Works across</div><h2>Experience connected to matters.</h2></div><div className="tag-list">{lawyer.worksAcross.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div></section>
        <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Connected sectors</div><h2>Where this experience is relevant.</h2></div><div className="matter-list">{relatedSectors.map((sector, index) => <div className="matter-row" key={sector.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{sector.name}</strong><Link href={`/sector/${sector.id}`}>↗</Link></div>)}</div></div></section>
        <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">03 / Relevant signals</div><h2>Regulatory context around the work.</h2></div><div className="signal-stack">{relatedSignals.length ? relatedSignals.map((signal) => <div className="signal-row" key={signal.id}><small>{signal.date}</small><small>{signal.jurisdiction} / {signal.category}</small><strong>{signal.title}</strong><Link href={`/insights/${signal.id}`}>→</Link></div>) : <div className="signal-row"><strong>No editorial signal is currently published for this profile.</strong></div>}</div></div></section>
      </main>
    </InternalShell>
  );
}
