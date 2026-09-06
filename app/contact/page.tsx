import Link from 'next/link';
import InternalShell from '@/components/InternalShell';

export default function ContactPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Contact</div><h1>General enquiries.</h1><p>For general enquiries, contact Krida Legal using the published office details below. Contacting the firm does not by itself create an advocate–client relationship.</p></div><aside className="internal-side"><small>Email</small><p><a href="mailto:contactus@kridalegal.com">contactus@kridalegal.com</a></p></aside></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / New Delhi</div><h2>New Friends Colony.</h2></div><div className="related-links"><div className="legal-card"><strong>D-969, Lower Ground Floor</strong><p>New Friends Colony, New Delhi – 110025</p><p><a href="tel:+911140122110">+91-11-40122110</a><br/><a href="mailto:contactus@kridalegal.com">contactus@kridalegal.com</a></p></div></div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / New Delhi</div><h2>Maharani Bagh.</h2></div><div className="related-links"><div className="legal-card"><strong>A5, Maharani Bagh, 3rd Floor</strong><p>Ring Road, New Delhi – 110065</p><p><a href="tel:+911141611414">+91-11-41611414</a><br/><a href="mailto:contactus@kridalegal.com">contactus@kridalegal.com</a></p></div></div></div></section>
    <section className="internal-section internal-section--dark"><div className="section-grid"><div><div className="section-label">03 / Find the right context</div><h2>Start with the issue.</h2></div><div><p>If you are still identifying the relevant area, use the Issue Navigator to move from an issue to the connected sector, practice area and people.</p><Link className="primaryButton" href="/#navigator">Use the Issue Navigator →</Link></div></div></section>
  </main></InternalShell>;
}
