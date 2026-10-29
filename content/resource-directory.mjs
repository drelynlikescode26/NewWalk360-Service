export const categories = {
  housing: 'Housing & Homelessness',
  wellbeing: 'Mental Health & Counseling',
  disability: 'Disability Services',
  food: 'Food & Clothing',
  expenses: 'Rent & Utilities',
  healthcare: 'Medication & Healthcare',
  employment: 'Employment & Benefits',
  shelter: 'Emergency Shelter & Hotels',
  legal: 'Legal Help'
};

// Independent starting points, not claims of partnership or available funding.
// Source URLs are the providers' own information, not third-party search results.
export const directory = [
  {name:'United Way 211',category:'housing',area:'Nationwide · local referrals',icon:'phone',text:'Find local housing, food, utility, and community assistance through your local 211 service.',eligibility:'Ask the local provider about county coverage, current openings, and application requirements.',href:'https://211.org/',action:'Find Local Support',phone:'211'},
  {name:'HUD Find Shelter',category:'shelter',area:'Nationwide · search by location',icon:'home',text:'Look for emergency shelters, food pantries, health clinics, and clothing resources. This tool does not book hotel rooms or guarantee a bed.',eligibility:'Contact the listed provider directly to confirm availability and intake steps.',href:'https://www.hud.gov/findshelter',action:'Search For Shelter'},
  {name:'Feeding America',category:'food',area:'Nationwide · local food banks',icon:'leaf',text:'Use the food bank locator to find a starting point for food distributions and pantry referrals near you.',eligibility:'Local food banks and pantries set their own schedules and participation requirements.',href:'https://www.feedingamerica.org/find-your-local-foodbank',action:'Find A Food Bank'},
  {name:'Georgia SNAP',category:'food',area:'Georgia',icon:'leaf',text:'Read about food benefits and application steps through Georgia’s Division of Family & Children Services.',eligibility:'DFCS determines eligibility. Review its requirements and application instructions.',href:'https://dfcs.georgia.gov/services/snap',action:'Explore Food Benefits'},
  {name:'Georgia Gateway',category:'employment',area:'Georgia',icon:'people',text:'Apply for or manage supported benefit programs, including SNAP, Medicaid, and TANF, through Georgia’s benefits portal.',eligibility:'Requirements differ by benefit. The administering agency makes eligibility decisions.',href:'https://gateway.ga.gov/',action:'Visit Georgia Gateway'},
  {name:'Georgia Legal Services Program',category:'legal',area:'Georgia · county coverage varies',icon:'book',text:'Explore civil legal help, including housing concerns, through the provider’s service and intake information.',eligibility:'Check county coverage, financial requirements, and whether your issue can be accepted.',href:'https://www.glsp.org/',action:'Explore Legal Help'},
  {name:'988 Suicide & Crisis Lifeline',category:'wellbeing',area:'United States',icon:'heart',text:'Call or text 988, or visit the Lifeline website for chat and emotional crisis support.',eligibility:'The Lifeline is free and available around the clock. Call 911 for immediate danger.',href:'https://988lifeline.org/',action:'Visit The Lifeline',phone:'988'},
  {name:'CareerOneStop',category:'employment',area:'Nationwide',icon:'compass',text:'Explore job searches, training, and local American Job Centers through a resource sponsored by the U.S. Department of Labor.',eligibility:'Individual training and assistance programs set their own requirements.',href:'https://www.careeronestop.org/',action:'Explore Career Resources'},
  {name:'Georgia DBHDD',category:'wellbeing',area:'Georgia',icon:'heart',text:'Find official information about behavioral health services and connections to help in your area.',eligibility:'Check the service and provider requirements. New Walk 360 does not provide clinical care through this directory.',href:'https://dbhdd.georgia.gov/',action:'Find Behavioral Health Resources'},
  {name:'Georgia Aging & Disability Resources',category:'disability',area:'Georgia',icon:'people',text:'Start with Georgia’s Division of Aging Services for information about aging and disability resource connections.',eligibility:'Ask about your county, age or disability requirements, and the program’s intake process.',href:'https://aging.georgia.gov/',action:'Explore Disability Resources'},
  {name:'Georgia LIHEAP',category:'expenses',area:'Georgia',icon:'home',text:'Read about the Low Income Home Energy Assistance Program and how to connect with a local administering agency.',eligibility:'Subject to program eligibility, application periods, and available funding. Confirm current details with the agency.',href:'https://dfcs.georgia.gov/services/low-income-home-energy-assistance-program-liheap',action:'Explore Energy Assistance'},
  {name:'Georgia Department of Community Health',category:'healthcare',area:'Georgia',icon:'heart',text:'Explore official health coverage programs, Medicaid information, and healthcare resources. Ask your provider or insurer about eligible prescription-cost assistance.',eligibility:'Coverage and prescription benefits depend on the specific program. No medication is dispensed by this website.',href:'https://dch.georgia.gov/',action:'Explore Healthcare Programs'},
  {name:'Georgia.gov',category:'employment',area:'Georgia',icon:'compass',text:'Find official state services and how-to guides for benefits, healthcare, employment, and everyday needs.',eligibility:'Use the relevant agency’s instructions to check eligibility and apply.',href:'https://georgia.gov/',action:'Find State Services'}
];
