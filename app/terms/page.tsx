import InternalShell from '@/components/InternalShell';

export default function TermsPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Terms</div><h1>Website terms.</h1><p>These terms govern general use of the Krida Legal website and should be read together with the Disclaimer and Privacy information.</p></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Information</div><h2>No professional relationship.</h2></div><div className="legal-copy"><p>Use of this website, including sending a general enquiry, does not create an advocate–client relationship. Legal services are undertaken only through the firm’s appropriate engagement process.</p><p>Website content is provided for general informational purposes and should not be treated as a substitute for advice on a specific matter.</p></div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Content</div><h2>Responsible use.</h2></div><div className="legal-copy"><p>Users may access the website for lawful informational purposes. Content, branding and materials should not be misrepresented as advice, endorsement or content issued by another person or organisation.</p><p>Links to third-party or primary sources, where provided, are offered for context. Krida Legal does not control external websites.</p></div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">03 / Changes</div><h2>Terms may evolve.</h2></div><div className="legal-copy"><p>The website, its content and these terms may be revised as legal, regulatory, technical or operational requirements change.</p></div></div></section>
  </main></InternalShell>;
}
