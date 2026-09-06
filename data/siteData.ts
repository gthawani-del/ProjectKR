export type Sector = {
  id: string;
  name: string;
  strapline: string;
  summary: string;
  matters: string[];
  lawyerIds: string[];
  signalIds: string[];
};

export type Lawyer = {
  id: string;
  name: string;
  role: string;
  initials: string;
  worksAcross: string[];
};

export type Signal = {
  id: string;
  date: string;
  jurisdiction: string;
  category: string;
  title: string;
};

export const sectors: Sector[] = [
  {
    id: 'sport',
    name: 'Sport',
    strapline: 'Governance. Rights. Disputes. Growth.',
    summary: 'Legal advice for leagues, federations, athletes, rights-holders and commercial partners operating across a fast-moving sports ecosystem.',
    matters: ['Sports governance', 'Athlete contracts', 'Sponsorship', 'Media rights', 'Disputes'],
    lawyerIds: ['vidushpat', 'aashita'],
    signalIds: ['sports-agents'],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    strapline: 'Regulation. Platforms. Data. Commercialisation.',
    summary: 'Sector-specific guidance for gaming businesses navigating regulation, product structures, commercial agreements and market change.',
    matters: ['Gaming regulation', 'Platform structuring', 'Commercial agreements', 'Payments', 'Disputes'],
    lawyerIds: ['vidushpat', 'jacob'],
    signalIds: ['gaming-rules'],
  },
  {
    id: 'ip',
    name: 'Intellectual Property',
    strapline: 'Brands. Content. Technology. Enforcement.',
    summary: 'Protection, licensing, commercialisation and enforcement of intellectual property across content, technology and brands.',
    matters: ['Trademark strategy', 'Copyright', 'Licensing', 'Content rights', 'Enforcement'],
    lawyerIds: ['aashita'],
    signalIds: ['ip-ruling'],
  },
  {
    id: 'business',
    name: 'Business',
    strapline: 'Transactions. Investments. Advisory. Governance.',
    summary: 'Commercial and corporate advice for specialist businesses, investors and operators across Krida’s core sectors.',
    matters: ['Commercial contracts', 'Investments', 'Structuring', 'Governance', 'Strategic advisory'],
    lawyerIds: ['jacob'],
    signalIds: [],
  },
];

export const lawyers: Lawyer[] = [
  { id: 'vidushpat', name: 'Vidushpat Singhania', role: 'Managing Partner', initials: 'VS', worksAcross: ['Sports governance', 'Gaming regulation', 'Commercial agreements'] },
  { id: 'aashita', name: 'Aashita Khanna', role: 'Managing Associate', initials: 'AK', worksAcross: ['Intellectual property', 'Sports & gaming', 'Commercial matters'] },
  { id: 'jacob', name: 'P. Jacob Ninan', role: 'Senior Associate', initials: 'JN', worksAcross: ['Gaming regulation', 'FEMA / RBI', 'GST', 'Sponsorship'] },
];

export const signals: Signal[] = [
  { id: 'gaming-rules', date: '05 SEP 2026', jurisdiction: 'INDIA', category: 'GAMING', title: 'Draft framework on online gaming released for public comment' },
  { id: 'sports-agents', date: '03 SEP 2026', jurisdiction: 'GLOBAL', category: 'SPORT', title: 'Regulatory developments affecting player-agent frameworks' },
  { id: 'ip-ruling', date: '01 SEP 2026', jurisdiction: 'INDIA', category: 'IP', title: 'Recent court developments affecting interim relief in trademark disputes' },
];

export const issuePrompts = [
  'Gaming regulation',
  'Sports governance',
  'Sponsorship & media rights',
  'Trademark / IP',
  'Commercial agreement',
  'Dispute',
];
