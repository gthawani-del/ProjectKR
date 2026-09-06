export type Sector = { id:string; name:string; strapline:string; summary:string; matters:string[]; lawyerIds:string[]; signalIds:string[] };
export type Lawyer = { id:string; name:string; role:string; initials:string; worksAcross:string[] };
export type Signal = { id:string; date:string; jurisdiction:string; category:string; title:string; matterIds:string[] };

export const sectors: Sector[] = [
{id:'sport',name:'Sport',strapline:'Governance. Rights. Disputes. Growth.',summary:'Legal advice for leagues, federations, athletes, rights-holders and commercial partners operating across a fast-moving sports ecosystem.',matters:['Sports governance','Athlete contracts','Sponsorship','Media rights','Disputes'],lawyerIds:['vidushpat','kartikeya','aanya','neil','aashita','nachiket'],signalIds:['sports-agents']},
{id:'gaming',name:'Gaming',strapline:'Regulation. Platforms. Data. Commercialisation.',summary:'Sector-specific guidance for gaming businesses navigating regulation, product structures, commercial agreements and market change.',matters:['Gaming regulation','Platform structuring','Commercial agreements','Payments','Disputes'],lawyerIds:['vidushpat','nachiket','kartikeya','aashita','jacob'],signalIds:['gaming-rules']},
{id:'ip',name:'Intellectual Property',strapline:'Brands. Content. Technology. Enforcement.',summary:'Protection, licensing, commercialisation and enforcement of intellectual property across content, technology and brands.',matters:['Trademark strategy','Copyright','Licensing','Content rights','Enforcement'],lawyerIds:['kartikeya','aanya','pooja','aashita','karunakar','vidushpat'],signalIds:['ip-ruling']},
{id:'business',name:'Business',strapline:'Transactions. Investments. Advisory. Governance.',summary:'Commercial and corporate advice for specialist businesses, investors and operators across Krida’s core sectors.',matters:['Commercial contracts','Investments','Structuring','Governance','Strategic advisory'],lawyerIds:['nachiket','jacob','vidushpat','kartikeya'],signalIds:[]}
];

export const lawyers: Lawyer[] = [
{id:'vidushpat',name:'Vidushpat Singhania',role:'Managing Partner',initials:'VS',worksAcross:['Sports governance','Gaming regulation','Broadcasting rights','Sponsorship','Anti-doping']},
{id:'nachiket',name:'Nachiket Yagnik',role:'Managing Associate',initials:'NY',worksAcross:['Gaming','Sports','Commercial disputes','Arbitration']},
{id:'kartikeya',name:'Kartikeya Prasad',role:'Managing Associate',initials:'KP',worksAcross:['Sports','Intellectual property','Media','Gaming','Digital law']},
{id:'aashita',name:'Aashita Khanna',role:'Managing Associate',initials:'AK',worksAcross:['Disputes & litigation','Sports','Gaming']},
{id:'ria',name:'Ria Khanna',role:'Managing Associate',initials:'RK',worksAcross:['Krida Legal']},
{id:'jacob',name:'P. Jacob Ninan',role:'Senior Associate',initials:'JN',worksAcross:['Sports & gaming','Commercial matters']},
{id:'arnav',name:'Arnav Singhal',role:'Senior Associate',initials:'AS',worksAcross:['Krida Legal']},
{id:'neil',name:'Neil Goswami',role:'Senior Associate',initials:'NG',worksAcross:['Sports law','Anti-doping','Player contracts','Governance disputes']},
{id:'aanya',name:'Aanya Agarwal',role:'Senior Associate',initials:'AA',worksAcross:['Sports','Entertainment','Intellectual property','Endorsements','Media licensing']},
{id:'ritwik',name:'Ritwik Prakash',role:'Senior Associate',initials:'RP',worksAcross:['Krida Legal']},
{id:'karunakar',name:'Karunakar',role:'Associate',initials:'K',worksAcross:['Sports law','Intellectual property','Contracts','Trademarks']},
{id:'swara',name:'Swara Popat',role:'Associate',initials:'SP',worksAcross:['Krida Legal']},
{id:'roopali',name:'Roopali Singhal',role:'Of Counsel',initials:'RS',worksAcross:['Krida Legal']},
{id:'pooja',name:'Pooja Lal',role:'Of Counsel',initials:'PL',worksAcross:['Media & entertainment','Film production','Distribution','Talent management','Licensing']}
];

export const signals: Signal[] = [
{id:'gaming-rules',date:'05 SEP 2026',jurisdiction:'INDIA',category:'GAMING',title:'Draft framework on online gaming released for public comment',matterIds:['gaming-regulation','platform-structuring','payments']},
{id:'sports-agents',date:'03 SEP 2026',jurisdiction:'GLOBAL',category:'SPORT',title:'Regulatory developments affecting player-agent frameworks',matterIds:['sports-governance','athlete-contracts','sponsorship']},
{id:'ip-ruling',date:'01 SEP 2026',jurisdiction:'INDIA',category:'IP',title:'Recent court developments affecting interim relief in trademark disputes',matterIds:['trademark-strategy','ip-enforcement']}
];

export const issuePrompts=['Gaming regulation','Sports governance','Sponsorship & media rights','Trademark / IP','Commercial agreement','Dispute'];
