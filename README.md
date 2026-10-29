# New Walk 360 website

Public website for New Walk 360 Inc. Static HTML, CSS, and browser JavaScript, published by GitHub Pages from the root of `main` at `newwalk360.org`.

## Update the site

1. Edit `site.config.json` for confirmed contact details, service area, external donation URL, or an external housing intake URL. Empty values produce an honest unavailable state, not a simulated submission or checkout.
2. Edit `build.mjs` for page copy, navigation, resource listings, and templates. Edit `styles.css` and `script.js` for styling and interactions.
3. Run `node build.mjs`. Commit the generated HTML together with source changes; GitHub Pages serves these files directly.
4. For checks, run `npm ci --ignore-scripts` and `npm test`. The build itself has no npm dependencies.

Pages: home, our mission, housing assistance, community resources, donations, contact, privacy/accessibility, and a custom 404.

## Content and connection status

- No housing application or contact form collects personal information.
- Suggested donation amounts do not submit a pledge or charge a payment. Connect the organization's confirmed HTTPS donation link in `site.config.json` to activate the external giving button. Amount and frequency controls are a planning aid; the payment provider controls actual checkout and recurring options.
- A public email, phone number, service area, and any direct housing intake link need organization confirmation. The legacy `info@newwalk360.org` address had no MX records at review time and is not displayed as a working inbox.
- Resources link to independent providers. No partnership, eligibility, funding, placement, or service availability is asserted.
- Old unverified program counts, impact statistics, event dates, fixed dollar-to-impact claims, and tax-deductibility claims were removed.

## Assets and provenance

The supplied logo is used intact in `images/logo.jpg`. The three website photos were generated with the built-in ChatGPT Image Generation tool, reviewed, and optimized into WebP files. The site discloses that these are illustrative images, not photographs of actual clients or staff.

See [image prompts](docs/image-prompts.md) for the exact generation briefs and [research notes](docs/research.md) for design references and resource sources. Manrope is self-hosted under the SIL Open Font License in `fonts/OFL.txt`.
