'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { issuePrompts, lawyers, sectors, signals } from '@/data/siteData';

export default function HomeExperience() {
  const [activeSector, setActiveSector] = useState(sectors[0]);
  const [query, setQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(issuePrompts[0]);

  const issueSector = useMemo(() => {
    const q = selectedIssue.toLowerCase();
    return sectors.find((sector) => sector.matters.some((matter) => q.includes(matter.toLowerCase().split(' ')[0]) || matter.toLowerCase().includes(q.split(' ')[0]))) || activeSector;
  }, [selectedIssue, activeSector]);

  const issueLawyers = lawyers.filter((lawyer) => issueSector.lawyerIds.includes(lawyer.id));
  const issueSignals = signals.filter((signal) => issueSector.signalIds.includes(signal.id));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const sectorResults = sectors
      .filter((sector) => [sector.name, sector.summary, sector.strapline, ...sector.matters].join(' ').toLowerCase().includes(q))
      .map((sector) => ({ type: 'sector' as const, id: sector.id, title: sector.name, meta: sector.matters.slice(0, 3).join(' · ') }));

    const lawyerResults = lawyers
      .filter((lawyer) => [lawyer.name, lawyer.role, ...lawyer.worksAcross].join(' ').toLowerCase().includes(q))
      .map((lawyer) => ({ type: 'lawyer' as const, id: lawyer.id, title: lawyer.name, meta: `${lawyer.role} · ${lawyer.worksAcross.slice(0, 2).join(' · ')}` }));

    return [...sectorResults, ...lawyerResults].slice(0, 8);
  }, [query]);

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Krida Legal home"><span>KRIDA</span><small>LEGAL</small></a>
        <nav aria-label="Primary navigation">
          <a href="#sectors">Sectors</a><a href="#navigator">Navigator</a><a href="#radar">Insights</a><a href="#people">People</a>
        </nav>
        <a className="headerAction" href="#contact">Contact</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <div className="kicker">Specialist legal advice for a changing playing field</div>
          <h1>Law for what moves <span>the world.</span></h1>
          <p>Sport. Gaming. Intellectual Property. Business.</p>
          <a className="circleLink" href="#sectors"><span>Explore</span><b>↓</b></a>
        </div>
        <div className="videoPlaceholder" role="img" aria-label="Placeholder for Krida Legal cinematic hero video">
          <div className="videoBadge"><span>Hero film placeholder</span><strong>16:9 desktop · 9:16 mobile</strong></div>
          <div className="videoGrid" aria-hidden="true" />
        </div>
        <div className="heroRail" aria-hidden="true"><span>People</span><span>Business</span><span>Sport</span><span>Ideas</span><span>A fairer tomorrow</span></div>
      </section>

      <section className="section sectionLight" id="sectors">
        <div className="sectionLabel"><span>01</span><i />Our sectors</div>
        <div className="sectorLayout">
          <div className="sectorIndex" role="tablist" aria-label="Krida sectors">
            {sectors.map((sector, index) => (
              <button
                key={sector.id}
                id={`sector-tab-${sector.id}`}
                className={activeSector.id === sector.id ? 'active' : ''}
                onClick={() => setActiveSector(sector)}
                role="tab"
                aria-controls="sector-panel"
                aria-selected={activeSector.id === sector.id}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{sector.name}
              </button>
            ))}
          </div>
          <div className="sectorDetail" id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${activeSector.id}`}>
            <div>
              <div className="accentRule" />
              <h2>{activeSector.name}</h2>
              <h3>{activeSector.strapline}</h3>
              <p>{activeSector.summary}</p>
              <Link className="primaryButton" href={`/sector/${activeSector.id}`}>Explore {activeSector.name} <span>→</span></Link>
            </div>
            <div className={`sectorVisual sectorVisual--${activeSector.id}`} aria-hidden="true">
              <div className="sectorVisualLabel">{activeSector.matters.map((m) => <span key={m}>{m}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section navigator" id="navigator">
        <div className="sectionLabel light"><span>02</span><i />Issue navigator</div>
        <div className="navigatorIntro">
          <div><h2>I’m dealing with…</h2><p>Start with the issue. We’ll connect it to the relevant sector, people and current intelligence.</p></div>
          <label className="searchBox"><span>Search issues, sectors or lawyers</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. fantasy gaming, sponsorship, trademark" /></label>
        </div>
        {filtered.length > 0 && (
          <div className="searchResults" aria-live="polite">
            {filtered.map((result) => result.type === 'sector' ? (
              <button key={`sector-${result.id}`} onClick={() => {
                const sector = sectors.find((item) => item.id === result.id);
                if (sector) { setActiveSector(sector); setSelectedIssue(sector.matters[0]); }
              }}>
                {result.title}<span>{result.meta}</span>
              </button>
            ) : (
              <Link key={`lawyer-${result.id}`} href={`/people/${result.id}`}>{result.title}<span>{result.meta}</span></Link>
            ))}
          </div>
        )}
        <div className="issueChips">{issuePrompts.map((issue) => <button key={issue} className={selectedIssue === issue ? 'active' : ''} onClick={() => setSelectedIssue(issue)}>{issue}</button>)}</div>
        <div className="intelligencePath">
          <div className="pathNode"><span>Issue</span><strong>{selectedIssue}</strong></div>
          <i>→</i>
          <Link className="pathNode" href={`/sector/${issueSector.id}`}><span>Sector</span><strong>{issueSector.name}</strong></Link>
          <i>→</i>
          <div className="pathNode"><span>People</span><strong>{issueLawyers.map((l) => l.name.split(' ')[0]).join(' · ') || 'Krida team'}</strong></div>
          <i>→</i>
          {issueSignals[0] ? <Link className="pathNode" href={`/insights/${issueSignals[0].id}`}><span>Signal</span><strong>{issueSignals[0].category}</strong></Link> : <div className="pathNode"><span>Signal</span><strong>Current intelligence</strong></div>}
        </div>
      </section>

      <section className="section radar" id="radar">
        <div className="sectionLabel light"><span>03</span><i />Regulatory Radar</div>
        <div className="radarGrid">
          <div className="radarIntro"><h2>Signals that matter.</h2><p>Curated legal and regulatory developments across sport, gaming, IP and commercial sectors.</p><span>Editorially reviewed intelligence</span></div>
          <div className="signalList">{signals.map((signal) => <Link key={signal.id} href={`/insights/${signal.id}`}><article><time>{signal.date}</time><div><span>{signal.category} / {signal.jurisdiction}</span><h3>{signal.title}</h3></div><b>→</b></article></Link>)}</div>
          <div className="radarGlobe" aria-hidden="true"><div className="globe"><i /><i /><i /></div><span>INDIA</span><span>GLOBAL</span><span>MIDDLE EAST</span><span>EUROPE</span><span>ASIA PACIFIC</span></div>
        </div>
      </section>

      <section className="section sectionLight" id="people">
        <div className="sectionLabel"><span>04</span><i />People in context</div>
        <div className="peopleLead"><h2>The right expertise for what’s next.</h2><p>People are connected to the matters they work across, not presented as isolated biographies.</p></div>
        <div className="peopleGrid">{lawyers.map((lawyer) => <article className="lawyerCard" key={lawyer.id}><div className="portraitPlaceholder" aria-hidden="true"><span>{lawyer.initials}</span></div><div className="lawyerMeta"><h3>{lawyer.name}</h3><p>{lawyer.role}</p><div className="worksAcross"><span>Works across</span>{lawyer.worksAcross.map((work) => <b key={work}>{work}</b>)}</div><Link href={`/people/${lawyer.id}`}>View profile →</Link></div></article>)}</div>
      </section>

      <section className="section contactSection" id="contact">
        <div><div className="sectionLabel"><span>05</span><i />Contact</div><h2>Start with the matter.</h2><p>General enquiries only. Submitting an enquiry does not create an advocate–client relationship.</p></div>
        <form onSubmit={(e) => e.preventDefault()}><label>Name<input required /></label><label>Email<input type="email" required /></label><label>Nature of enquiry<select defaultValue="General enquiry"><option>General enquiry</option><option>Sport</option><option>Gaming</option><option>Intellectual Property</option><option>Business</option></select></label><label className="wide">Message<textarea rows={4} /></label><button className="primaryButton wide" type="submit">Send enquiry <span>→</span></button></form>
      </section>

      <footer><div className="brand footerBrand"><span>KRIDA</span><small>LEGAL</small></div><p>Legal intelligence for a moving world.</p><div><span>Disclaimer</span><span>Privacy</span><span>Sitemap</span></div></footer>
    </main>
  );
}
