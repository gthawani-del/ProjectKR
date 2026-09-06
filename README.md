# ProjectKR

New Krida Legal website: a legal-intelligence interface rather than a conventional law-firm brochure.

## Locked direction

- Bright mineral-white / pale-blue / deep-navy palette
- Electric blue used for active states and intelligence signals
- Manrope for primary UI/display typography
- Newsreader used sparingly for editorial/legal-intelligence moments
- Sentence-case display headlines; wide tracking limited to labels and metadata
- Video hero planned as separate desktop 16:9 and mobile 9:16 assets; placeholder currently implemented
- Mobile is independently composed, not a compressed desktop layout

## Product model

The site connects:

Matter → Sector → Lawyer → Regulatory signal → Insight → Contact

Current content entities live in `data/siteData.ts` and include sectors, matters, lawyers and regulatory signals.

## Implemented homepage modules

1. Cinematic hero with video placeholder
2. Interactive sector selector
3. Issue Navigator and contextual search
4. Matter-to-sector-to-lawyer intelligence path
5. Regulatory Radar
6. People in context with Works Across relationships
7. General enquiry module
8. Responsive desktop/mobile visual system

## Stack

- Next.js
- TypeScript
- GSAP and Lenis installed for the upcoming motion layer
- CSS token/design system
- `next/font` for managed font loading

## Next build stages

- Add approved hero video assets
- Add GSAP/Lenis motion orchestration after static UX QA
- Build sector and practice templates
- Build lawyer profile template
- Build insights and regulatory detail templates
- Add production search index
- Add BCI disclaimer experience and final legal copy
- Add Organization, Person, Article and Breadcrumb structured data where appropriate
- Run W3C HTML validation, WCAG 2.2 AA/axe tests, keyboard QA, responsive QA and Lighthouse/Core Web Vitals checks before launch
