const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'strata', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Hero Section
content = content.replace(
  'Our End-to-End Process',
  'STRATA'
);
content = content.replace(
  /Behind the scenes/g,
  'Strata Fire Safety'
);
content = content.replace(
  'Our process, refined in our dedicated UK factory, ensures each roof is built to exacting standards. From initial design to final quality checks, we control every step.',
  'Strata managers, owners corporations, and building managers rely on All Fire Services to ensure shared residential properties remain compliant and safe.'
);
content = content.replace(
  'The team behind allfireservices',
  'Strata compliance support'
);

// Process Section
content = content.replace(
  '<h1 className="heading-style-h1">Our process</h1>',
  '<h1 className="heading-style-h1">Strata Fire Safety Services</h1>'
);
content = content.replace(
  'Our process, refined in our dedicated UK factory, ensures each roof is built to exacting standards. From initial design to final quality checks, we control every step.',
  'Strata managers, owners corporations, and building managers rely on All Fire Services to ensure shared residential properties remain compliant and safe.'
);

// Items mapping
const itemsMap = [
  {
    oldTitle: 'Design',
    oldDesc: 'Our in-house design team develops each roof model from the ground up. We meticulously consider the structural and aesthetic integration with each base vehicle model, ensuring a seamless fit and a cohesive look. This bespoke approach allows us to optimise functionality and visual appeal for every campervan.',
    newTitle: 'Routine Fire-Safety Inspection',
    newDesc: 'Routine fire-safety inspection and maintenance to ensure all strata common areas are fully compliant and safe for residents.'
  },
  {
    oldTitle: 'Metal fabrication',
    oldDesc: 'Our skilled metalworkers construct robust steel frames and fixings, the foundation of every All Fire Services roof. Using advanced welding techniques and precision tools, they create durable, precisely engineered frameworks tailored to each roof design.',
    newTitle: 'Scheduled Inspections',
    newDesc: 'Comprehensive monthly, six-monthly, and yearly inspections tailored for shared residential properties.'
  },
  {
    oldTitle: 'Woodworking',
    oldDesc: 'The woodwork department crafts the interior components, including pelmets and bed boards, using a variety of high-quality woods. Precise templating and skilled carpentry ensure a perfect fit and finish for every roof.',
    newTitle: 'Annual Fire Safety Statement',
    newDesc: 'Annual Fire Safety Statement coordination and management for strata managers and owners corporations.'
  },
  {
    oldTitle: 'Canvas production',
    oldDesc: 'Our experienced sewing team creates the canvas elements of our roofs. Each canvas is carefully cut, prepped, and sewn to precise specifications, ensuring weather resistance and durability.',
    newTitle: 'Building Defect Reports',
    newDesc: 'Thorough building defect reports covering all fire safety aspects within the strata complex.'
  },
  {
    oldTitle: 'Roof assembly',
    oldDesc: 'Raw roof shells are transformed into finished products in our dedicated assembly bays. Carpeted trestles protect the roofs during the assembly process, where fixings, canvases, and other components are meticulously added.',
    newTitle: 'Repairs and Rectification',
    newDesc: 'Prompt repairs and rectification of any identified issues to maintain continuous safety compliance.'
  },
  {
    oldTitle: 'Quality control',
    oldDesc: 'Every roof is inspected to ensure it meets our high standards before proceeding to the next stage. Our finished roofs are carefully packaged with all necessary fixings to keep everything organised and readily accessible for fitters.',
    newTitle: 'Emergency Support',
    newDesc: '24/7 emergency support ensuring that building managers always have access to immediate assistance when needed.'
  },
  {
    oldTitle: 'Fitting',
    oldDesc: 'While many mass-market roofs are shipped as kits, we also offer professional fitting services in our dedicated fitting bays. Alternatively, we have a network of approved fitters located throughout the UK for customers located further afield.',
    newTitle: 'Compliance Documentation',
    newDesc: 'Managing all compliance documentation to keep owners corporations informed and protected.'
  }
];

itemsMap.forEach(item => {
  content = content.replace(item.oldTitle, item.newTitle);
  content = content.replace(item.oldDesc, item.newDesc);
});

// Contact CTA
content = content.replace(
  '<h2 className="heading-style-h3">Get in touch</h2>',
  '<h2 className="heading-style-h3">Does your strata building need fire protection or compliance support?</h2>'
);
content = content.replace(
  'We’re always happy to hear from fellow camper van enthusiasts, whether it’s to enquire about a new roof conversion, or just to chat about all things motorhome-related.',
  'Call All Fire Services Australia at 1300 765 594 or for 24/7 After Hours, Phone 0484 648 400'
);

// Images (Placeholder Replacements)
// Strata Hero: /hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/6797bf5e61a37767857ccf2c_mqdefault.jpg',
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp'
);
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/6757081571ea73c309b7cecc_Smartgrade%20Webclip.png',
  '/Logo/Logo-1-All-fire-services.png'
);

// I'll leave the other process images as is or I can map them to the 8 services images if needed.
// E.g. Roof assembly -> annualfiresafety.webp
content = content.replace(
  /https:\/\/cdn.prod.website-files.com\/[^\/]+\/[^.]+\.webp/g,
  '/Fireprotectionservicesimage/monthlyfireprotection.webp'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Strata replacements done.');
