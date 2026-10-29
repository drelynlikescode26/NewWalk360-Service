# New Walk 360 website

This branch contains the expanded-program review draft. It is not deployed to the main website. All four programs are retained with availability awaiting organization confirmation. See [the review notes](docs/program-expansion-draft.md) for the remaining business details and connection work.

Public website for New Walk 360 Inc. Static HTML, CSS, and browser JavaScript, published by GitHub Pages from the root of `main` at `newwalk360.org`.

## Update the site

1. Edit `site.config.json` for confirmed contact details, service area, external donation URL, or an external housing intake URL. Empty values produce an honest unavailable state, not a simulated submission or checkout.
2. Edit `build.mjs` for page copy, navigation, resource listings, and templates. Edit `styles.css` and `script.js` for styling and interactions.
3. Run `node build.mjs`. Commit the generated HTML together with source changes; GitHub Pages serves these files directly.
4. For checks, run `npm ci --ignore-scripts` and `npm test`. The build itself has no npm dependencies.

The program expansion is maintained in `content/program-update.mjs`; the thirteen resource listings and categories are in `content/resource-directory.mjs`. `site.config.json` holds program status, draft mode, and approved connection URLs. A production build rejects unconfirmed program states.

Pages: home, About Us, Programs & Services, Get Help, Resource Center, Get Involved, Donate, Contact, the preserved housing assistance page, privacy/accessibility, and a custom 404. Ten automated tests cover structure/routes, resource search and filters, housing selections, giving controls, navigation, intro behavior, program availability, visible help/donate actions, and honest unconnected features. A rendered desktop/mobile review remains pending because browser use is disabled.

The homepage has a short purple-and-gold circle reveal on the first visit in a browser session. It skips reduced-motion users, never captures pointer input, and dismisses immediately on a click or keypress. CSS hides it after the animation even if JavaScript fails. The footer uses a larger presentation of the supplied logo with softly blended edges; the original image file is unchanged.

## Content and connection status

- No housing application or contact form collects personal information.
- Suggested donation amounts do not submit a pledge or charge a payment. Connect the organization's confirmed HTTPS donation link in `site.config.json` to activate the external giving button. Amount and frequency controls are a planning aid; the payment provider controls actual checkout and recurring options.
- A public email, phone number, service area, and any direct housing intake link need organization confirmation. The legacy `info@newwalk360.org` address had no MX records at review time and is not displayed as a working inbox.
- Resources link to independent providers. No partnership, eligibility, funding, placement, or service availability is asserted.
- Old unverified program counts, impact statistics, event dates, fixed dollar-to-impact claims, and tax-deductibility claims were removed.

## Assets and provenance

The supplied logo is used intact in `images/logo.jpg`. The current website uses four licensed camera photographs from Pexels, inspected before selection and optimized into WebP files. The original generated photographs were replaced at the user’s request. Photo credits are provided on the privacy page.

See [photo credits](docs/photo-credits.md) for the current assets and licenses, [archived image prompts](docs/image-prompts.md) for the original unused generation briefs, and [research notes](docs/research.md) for design references and resource sources. Manrope is self-hosted under the SIL Open Font License in `fonts/OFL.txt`.
