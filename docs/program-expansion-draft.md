# Program expansion notes

Prepared October 29, 2026. The owner approved the site's presentation, reported that it looks good on mobile, and requested removal of the review banner and animated scrolling. Program availability and business connections remain unconfirmed. Presentation approval does not mark programs as operating or activate payments or applications.

## Included

- The supplied mission and vision and the expanded organizational name.
- Four program areas on one Programs & Services page, with separate section anchors.
- Home, About Us, Programs & Services, Get Help, Resource Center, Get Involved, Donate, and Contact navigation.
- Get Help and Donate actions outside the collapsible menu on every page.
- Separate assistance and partner-referral routes; no application data is collected by this static site.
- Thirteen independent resources with search, category filters, service-area notes, eligibility/next-step guidance, and official provider links.
- Mental health resources and referrals, without claiming clinical care.
- Eligible prescription-cost assistance or referrals, without implying medication dispensing.
- Eligibility and available-funding language for financial and emergency assistance.
- One-time/monthly donation planning, in-kind items, sponsorship, volunteering, and a newsletter connection placeholder.
- Existing licensed photographs, supplied logo, and purple-and-gold intro animation preserved.
- Construction videos were removed after the owner clarified they belong to his father's 1 Good Deal site, not this nonprofit site.

## Owner confirmations

The user said to keep all four programs and will ask the organization which are operating. All four therefore remain in the draft with availability unconfirmed. They are not described as open applications.

The user will obtain the organization's public email, phone, service counties, and office hours. No contact information is invented.

The user does not believe a donation processor or secure intake system is established and expects to arrange those. No card collection, pledge submission, assistance application, referral submission, volunteer registration, or newsletter subscription is simulated.

## Before final operational launch

1. Update `site.config.json` with confirmed program states: `available`, `planned`, `referrals`, or `unavailable`. Do not choose `available` without organizational confirmation.
2. Confirm the legal/public name, public contact, hours, and service coverage.
3. Confirm what each program actually provides, its eligibility, application path, funding status, and any relevant operating requirements. The proposed service list is a content draft.
4. Connect an organization-owned donation provider and verify one-time/recurring gifts and receipt settings. Do not reuse another business's payment account. Verify donation and tax wording against organizational records.
5. Choose a secure intake/referral system, define authorized staff access, review its privacy terms, and test routing before opening applications. Ordinary email is for general contact, not sensitive case files.
6. Connect the approved volunteer and newsletter systems if wanted. These are currently unavailable, not functioning signup forms.
7. Review desktop and real mobile layouts. Browser access was disabled during implementation, so source and DOM checks do not establish rendered visual quality.
8. The owner requested removal of the site-wide draft presentation. `draft` is now false; program-specific availability notices remain visible, and the build validates their labels. Update those labels only after organizational confirmation.

## Resource sources

New official starting points checked during this update:

- https://dbhdd.georgia.gov/
- https://dch.georgia.gov/
- https://georgia.gov/
- https://aging.georgia.gov/
- https://dfcs.georgia.gov/services/low-income-home-energy-assistance-program-liheap
- https://211.org/
- https://988lifeline.org/

These are independent services. No partnership, local appointment, funding balance, benefit eligibility, or placement is asserted.
