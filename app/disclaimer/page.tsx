import InternalShell from '@/components/InternalShell';

export default function DisclaimerPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Disclaimer</div><h1>General information only.</h1><p>This website is intended to provide information about Krida Legal and its areas of work. It is not intended as advertising, solicitation or legal advice.</p></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Use of this site</div><h2>Information, not advice.</h2></div><div className="legal-copy"><p>Accessing, reading or contacting the firm through this website does not by itself create an advocate–client relationship. Users should obtain independent legal advice appropriate to their circumstances before acting on information found here.</p><p>Krida Legal aims to keep website information accurate and current, but legal and regulatory positions can change. The firm does not warrant that every item on the website remains complete or current at all times.</p><p>Any regulatory or editorial material is provided for general informational purposes and should be read together with the relevant primary source.</p></div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Jurisdiction</div><h2>New Delhi.</h2></div><div className="legal-copy"><p>Any dispute concerning use of this website is subject to applicable Indian law and the jurisdiction stated by Krida Legal in its published website terms.</p></div></div></section>
  </main></InternalShell>;
}
