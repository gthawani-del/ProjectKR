'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import SiteLogo from '@/components/SiteLogo';
import { issuePrompts, lawyers, sectors, signals } from '@/data/siteData';
import { insightImages, peopleImages, sectorImages } from '@/data/imageAssets';

const featuredPeopleIds = ['vidushpat', 'nachiket', 'kartikeya', 'aashita', 'jacob', 'aanya'];

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
  const featuredLawyers = featuredPeopleIds.map((id) => lawyers.find((lawyer) => lawyer.id === id)).filter((lawyer): lawyer is (typeof lawyers)[number] => Boolean(lawyer));

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

  const selectSector = (sector: typeof sectors[number]) => {
    setActiveSector(sector);
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('krida:scroll-to', { detail: { selector: '#sectors' } }));
    });
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const nature = String(data.get('nature') || 'General enquiry');
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Website enquiry: ${nature}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nNature of enquiry: ${nature}\n\n${message}`);
    window.location.href = `mailto:contactus@kridalegal.com?subject=${subject}&body=${body}`;
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="siteHeader">
        <SiteLogo className="logoLockup" />
        <nav aria-label="Primary navigation">
          <a href="#sectors">Sectors</a><a href="#navigator">Navigator</a><a href="#radar">Insights</a><a href="#people">People</a>
        </nav>
        <a className="headerAction" href="#contact">Contact</a>
        <details className="mobileNav homeMobileNav">
          <summary aria-label="Open navigation"><span>Menu</span><b aria-hidden="true">+</b></summary>
          <nav aria-label="Mobile navigation">
            <a href="#top">Home</a>
            <a href="#sectors">Sectors</a>
            <a href="#navigator">Issue Navigator</a>
            <Link href="/practices">Practice Areas</Link>
            <a href="#radar">Insights</a>
            <a href="#people">People</a>
            <Link href="/about">About</Link>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <div className="kicker">Specialist legal advice for a changing playing field</div>
          <h1>Law for what moves <span>the world.</span></h1>
          <p>Sport. Gaming. Intellectual Property. Business.</p>
          <a className="circleLink" href="#sectors"><span>Explore</span><b>↓</b></a>
        </div>
        <div className="heroMedia" aria-label="Krida Legal sectors across sport, gaming, intellectual property and business">
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/hero/krida-hero-mobile.webp" />
            <img src="/images/hero/krida-hero-desktop.webp" alt="Contemporary architectural scene representing Krida Legal's specialist sectors" width="1600" height="900" fetchPriority="high" />
          </picture>
        </div>
        <div className="heroRail" aria-hidden="true"><span>People</span><span>Business</span><span>Sport</span><span>Ideas</span><span>A fairer tomorrow</span></div>
      </section>

      <section className="section sectionLight" id="sectors">
        <div className="sectionLabel"><span>01</span><i />Our sectors</div>
        <div className="sectorLayout">
          <div className="sectorIndex" role="tablist" aria-label="Krida sectors">
            {sectors.map((sector, index) => (
              <button key={sector.id} id={`sector-tab-${sector.id}`} className={activeSector.id === sector.id ? 'active' : ''} onClick={() => selectSector(sector)} role="tab" aria-controls="sector-panel" aria-selected={activeSector.id === sector.id}>
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
            <div className={`sectorVisual sectorVisual--${activeSector.id}`}>
              <Image src={sectorImages[activeSector.id]} alt={`${activeSector.name} sector`} fill sizes="(max-width: 768px) 100vw, 46vw" className="sectorVisualImage" />
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
        {filtered.length > 0 && <div className="searchResults" aria-live="polite">{filtered.map((result) => result.type === 'sector' ? (
          <button key={`sector-${result.id}`} onClick={() => { const sector = sectors.find((item) => item.id === result.id); if (sector) { selectSector(sector); setSelectedIssue(sector.matters[0]); } }}>{result.title}<span>{result.meta}</span></button>
        ) : <Link key={`lawyer-${result.id}`} href={`/people/${result.id}`}>{result.title}<span>{result.meta}</span></Link>)}</div>}
        <div className="issueChips" aria-label="Common legal issues">{issuePrompts.map((issue) => <button key={issue} className={selectedIssue === issue ? 'active' : ''} onClick={() => setSelectedIssue(issue)}>{issue}</button>)}</div>
        <div className="navigatorSelection" aria-live="polite"><span>Selected issue</span><strong>{selectedIssue}</strong></div>
        <div className="intelligencePath">
          <div className="pathNode pathNode--selected"><span>Issue</span><strong>{selectedIssue}</strong></div><i>→</i>
          <Link className="pathNode" href={`/sector/${issueSector.id}`}><span>Sector</span><strong>{issueSector.name}</strong></Link><i>→</i>
          <div className="pathNode"><span>People</span><strong>{issueLawyers.map((l) => l.name.split(' ')[0]).join(' · ') || 'Krida team'}</strong></div><i>→</i>
          {issueSignals[0] ? <Link className="pathNode" href={`/insights/${issueSignals[0].id}`}><span>Signal</span><strong>{issueSignals[0].category}</strong></Link> : <div className="pathNode"><span>Signal</span><strong>Current intelligence</strong></div>}
        </div>
      </section>

      <section className="section radar" id="radar">
        <div className="sectionLabel light"><span>03</span><i />Regulatory Radar</div>
        <div className="radarGrid">
          <div className="radarIntro"><h2>Signals that matter.</h2><p>Curated legal and regulatory developments across sport, gaming, IP and commercial sectors.</p><span>Editorially reviewed intelligence</span></div>
          <div className="signalList">{signals.map((signal) => <Link key={signal.id} href={`/insights/${signal.id}`}><article><time>{signal.date}</time><div><span>{signal.category} / {signal.jurisdiction}</span><h3>{signal.title}</h3></div><b>→</b></article></Link>)}</div>
          <div className="radarGlobe responsiveMedia"><Image src={insightImages.radar} alt="Regulatory intelligence across India and global markets" fill sizes="(max-width: 768px) 100vw, 32vw" /></div>
        </div>
      </section>

      <section className="section sectionLight" id="people">
        <div className="sectionLabel"><span>04</span><i />People in context</div>
        <div className="peopleLead"><h2>The right expertise for what’s next.</h2><div><p>People are connected to the matters they work across, not presented as isolated biographies.</p><Link className="peopleDirectoryLink" href="/people">View all people <span>→</span></Link></div></div>
        <div className="peopleGrid peopleGrid--featured">{featuredLawyers.map((lawyer) => <article className="lawyerCard" key={lawyer.id}>{peopleImages[lawyer.id] ? <div className="lawyerPortrait"><Image src={peopleImages[lawyer.id]} alt={lawyer.name} fill sizes="(max-width: 768px) 100vw, 28vw" /></div> : <div className="portraitPlaceholder portraitPlaceholder--editorial" aria-hidden="true"><span>{lawyer.initials}</span><small>KRIDA / PROFILE</small></div>}<div className="lawyerMeta"><h3>{lawyer.name}</h3><p>{lawyer.role}</p><div className="worksAcross"><span>Works across</span>{lawyer.worksAcross.slice(0, 3).map((work) => <b key={work}>{work}</b>)}</div><Link href={`/people/${lawyer.id}`}>View profile →</Link></div></article>)}</div>
        <div className="peopleFooterCta"><Link className="primaryButton" href="/people">View all people <span>→</span></Link></div>
      </section>

      <section className="section contactSection" id="contact">
        <div className="contactIntro"><div className="sectionLabel"><span>05</span><i />Contact</div><h2>Start with the matter.</h2><p>A short intake helps route your enquiry to the relevant team. Submitting an enquiry does not create an advocate–client relationship.</p><p className="contactDirect"><a href="mailto:contactus@kridalegal.com">contactus@kridalegal.com</a><span>+91-11-40122110</span></p></div>
        <form className="intakeForm" onSubmit={submitEnquiry}>
          <fieldset className="intakeStep"><legend><span>01</span> Matter type</legend><label>Nature of enquiry<select name="nature" defaultValue="General enquiry"><option>General enquiry</option><option>Sport</option><option>Gaming</option><option>Intellectual Property</option><option>Business</option></select></label></fieldset>
          <fieldset className="intakeStep"><legend><span>02</span> Short context</legend><label>What are you dealing with?<textarea name="message" rows={5} placeholder="Briefly describe the issue or question." required /></label></fieldset>
          <fieldset className="intakeStep"><legend><span>03</span> Contact details</legend><div className="intakeIdentity"><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label></div></fieldset>
          <button className="primaryButton intakeSubmit" type="submit">Email enquiry <span>→</span></button>
        </form>
      </section>

      <footer>
        <SiteLogo className="footerLogo" />
        <p>Legal intelligence for a moving world.</p><div><Link href="/disclaimer">Disclaimer</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/sitemap">Sitemap</Link></div>
      </footer>
    </main>
  );
}
