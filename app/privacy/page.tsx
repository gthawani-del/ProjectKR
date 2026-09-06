import InternalShell from '@/components/InternalShell';

export default function PrivacyPage(){
  return <InternalShell><main>
    <section className="internal-hero"><div><div className="internal-kicker">Privacy</div><h1>Privacy information.</h1><p>This page explains, at a general level, how information submitted through the website may be handled.</p></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">01 / Information</div><h2>What may be provided.</h2></div><div className="legal-copy"><p>If you contact Krida Legal, you may provide information such as your name, email address, telephone number and details of your enquiry.</p><p>Please do not send confidential or sensitive information through the website unless the firm has specifically asked you to do so through an appropriate channel.</p></div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">02 / Purpose</div><h2>Why it may be used.</h2></div><div className="legal-copy"><p>Information submitted through the website may be used to respond to the enquiry, assess who within the firm may be appropriate to respond, maintain necessary business records and comply with applicable legal or professional obligations.</p><p>Website privacy practices should be reviewed periodically as the site’s analytics, hosting and enquiry infrastructure evolves.</p></div></div></section>
    <section className="internal-section"><div className="section-grid"><div><div className="section-label">03 / Contact</div><h2>Privacy enquiries.</h2></div><div className="legal-copy"><p>Questions concerning information submitted through this website may be sent to <a href="mailto:contactus@kridalegal.com">contactus@kridalegal.com</a>.</p></div></div></section>
  </main></InternalShell>;
}
