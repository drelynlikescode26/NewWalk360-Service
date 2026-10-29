# Design and content research — October 29, 2026

## Supplied design references

- https://share.google/YI2aHeHLqsAyeEXtE resolves to https://habitatlmc.org/ — clear task paths for programs, applications, volunteering, and donations; housing photography and mission-led structure.
- https://share.google/OGSaCnfEBRvR83H5X resolves to https://frontlinehousing.org/ — direct housing assistance action and accessible explanation of next steps. Its program criteria are specific to Frontline and were not imported into New Walk 360's copy.
- https://share.google/C5IGzOC9e399XD9ks resolves to https://mtlawoffice.com/family-law/paternity/single-moms-in-georgia — useful resource-directory organization. No legal advice or third-party copy was reproduced.
- https://share.google/lIvpB5mzGNkknkrfT was later resolved to https://landingi.com/landing-page/non-profit-examples/ and its article was read through the web tool. Direct requests returned HTTP 403.

### Circle intro reference

All four supplied destinations were revisited when the user requested the circle intro. Lake-McHenry Habitat's homepage markup includes an `e-loader`; its theme stylesheet defines a rotating gradient ring with a blurred halo around its logo and a circular exit that shrinks the page overlay. This is the closest match to the user's description. The New Walk intro adapts that behavior with purple and gold, a short fixed duration, once-per-session display, immediate dismissal on input, and reduced-motion support. The Frontline source had no comparable dedicated intro; the Georgia guide's circle animations concern mobile navigation. The first link is a nonprofit landing-page examples article.

The redesign is an original implementation inspired by the references' organization and clear routes to assistance; it does not copy their branding, photographs, text, or code.

## Realistic image prompting

Update: the first set of generated photographs was replaced at the user's request with four real Pexels photographs. The current sources and license are in `docs/photo-credits.md`. The prompting notes below document the previous design, not current website photography. Decorative upward-right arrows were also removed from page templates and interactive housing links.

Official guidance: https://developers.openai.com/api/docs/guides/image-prompting

Prompt the visible scene, camera framing, natural light, real skin and material texture, and explicit exclusions. Use believable unposed action, fabric creases, flyaway hairs, modest wear, and restrained photographic grain. Avoid generic "8K" language, gloss, airbrushing, staged smiles, and exaggerated cinematic grading. Camera terms are appearance cues, not guaranteed physical camera settings.

Photos were generated separately, inspected individually, and compressed to WebP without changing scene content. A footer and privacy-page disclosure identify the imagery as AI-created illustration. No invented testimonials or beneficiary stories accompany the photos.

## Resource verification

- United Way 211: https://211.org/ — local community referrals including housing, utilities, food, and health resources.
- HUD Find Shelter: https://www.hud.gov/findshelter — location-based shelter, food, clinic, and clothing searches.
- Feeding America: https://www.feedingamerica.org/find-your-local-foodbank — food bank locator.
- Georgia SNAP: https://dfcs.georgia.gov/services/snap — official food assistance information and application steps.
- Georgia Gateway: https://dfcs.georgia.gov/services/about-georgia-gateway — official explanation of the benefits portal; direct portal https://gateway.ga.gov/ may block automated fetches.
- Georgia Legal Services: https://www.glsp.org/ — provider-specific coverage and eligibility must be checked directly.
- 988 Lifeline: https://988lifeline.org/ — call, text, and chat emotional support.
- CareerOneStop: https://www.careeronestop.org/ — U.S. Department of Labor-sponsored career resources. The homepage blocked automated retrieval; the provider remains an established public resource, and no availability or eligibility claims are made.

Resource descriptions are short factual summaries. Georgia listings are labeled; the organization’s own service area is not inferred from them. No affiliation is implied.

## Existing hosting findings

GitHub Pages publishes `main` at the root. The domain is registered through Cloudflare. The apex resolved to valid GitHub Pages addresses; `www` had no DNS record. HTTPS initially failed with a certificate-name error and GitHub reported no issued certificate. The domain's Pages binding was refreshed using GitHub's recovery procedure, preserving the exact domain.

Recovery documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

## Delivery verification

GitHub issued an approved certificate for `newwalk360.org`; HTTPS enforcement is enabled and HTTP redirects to HTTPS. The redesigned site deployed successfully. All seven public content pages, the supplied logo, three generated WebP photos, self-hosted font, CSS, JavaScript, and sitemap returned HTTP 200 over validated HTTPS. Five automated checks passed: page structure and internal links/assets, resource search/filter intersections and resets, housing pathways, giving controls and invalid amounts, and navigation state/Escape behavior.

Browser screenshot and responsive visual review could not be completed while the unrelated Windows Firewall security prompt remained open. Responsive CSS is implemented, but rendered layouts should receive a visual pass once the prompt is dismissed. No certificate warning was bypassed and no Windows security setting was changed.
