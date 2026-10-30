# Housing content scope

Updated October 29, 2026 following the owner's clarification from Mom.

## Confirmed audience and focus

The owner named veterans, adults with disabilities, families, and seniors, with no age or gender limits. The website welcomes housing inquiries from people of all ages and genders and names these four groups explicitly. This does not state that every residential setting is suitable for every household or support need.

The owner requested temporary housing and transitional housing. Earlier supplied program notes also named group homes, shared housing, independent living, nonmedical disability-inclusive housing, and housing transition support. The Safe Stay campaign instructions additionally included temporary hotel/shelter costs and transition assistance such as eligible deposits, initial rent, utility connections, moving needs, and essential household items.

## Implemented structure

- The housing page names all four audiences and explains each group's housing focus.
- Six detailed sections explain temporary housing/hotel assistance, transitional housing, group/shared homes, independent living, nonmedical disability-inclusive housing, and housing navigation/follow-up.
- Each section separates its intended audience, proposed housing or support, and practical details still needing confirmation.
- Transitional housing is described as an interim residential model with a next-step plan; it is distinguished from a one-time move-in payment.
- The homepage, About page, Programs housing section, and Get Help page use consistent audience wording and links to the detailed housing page.
- The existing independent-resource chooser remains functional. All four program availability states remain unconfirmed.

## Operating details still unconfirmed

No property, live vacancy, specific provider agreement, rate, rent/deposit entitlement, stay length, staffing level, meal service, transport service, furnishing package, clinical service, nursing service, 24-hour supervision, secure application, or direct placement process has been established by this clarification. The site does not assert these as provided. It does not claim VA affiliation, HUD certification, or guaranteed access to public benefits. Mom still needs to confirm what New Walk operates directly and what it arranges through other providers.

The request for services similar to other housing organizations is implemented as a clearer description of the authorized housing models and proposed support, not as a claim to provide every service on another organization's website.

## Research references

Reviewed October 29, 2026. [Frontline Housing](https://frontlinehousing.org/) illustrates a concrete distinction between move-in fee help and rental assistance. [University Legal Services housing program](https://www.uls-dc.org/programs/housing-assistance) illustrates explaining the audience, service types, and steps for access. Their service areas, eligibility requirements, certifications, prices, outcomes, and programs have not been imported as New Walk facts.

## Development

The housing audience, option descriptions, and detailed page extension live in `content/housing-details.mjs`. The shared overview copy remains in `content/program-update.mjs`. `build.mjs` applies the housing detail extension after the program and grant consulting updates. Run `node build.mjs` and `npm test` before publishing. Confirm new operational facts with the organization before replacing the availability notices or promising a particular service.
