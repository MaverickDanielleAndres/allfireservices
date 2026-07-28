const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace Hero Section
content = content.replace(
  'All Fire Services - Raising the roof on standards.',
  'WE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT'
);
content = content.replace(
  'High Top &amp; Elevating Roof Conversions',
  '“Who Knows Better Than A Fireman”'
);
content = content.replace(
  /We design, manufacture and install high-top and elevating roofs for camper van conversions — custom-built in the UK to fit the most popular van makes and models./g,
  'All Fire Services Australia has grown – now proudly serving across Greater Sydney Area. Peter would like to give a big shoutout to our amazing Sydney team: Paul, Sam, George, Ken, Kyriakos & Orlando. Our clients truly appreciate your dedication and quick response in keeping every builidng safe. Fantastic work, team – keep it up!'
);

// Buttons
content = content.replace(
  'href="/contact"',
  'href="tel:1300765594"'
);
content = content.replace(
  'Get in touch',
  'Call 1300 765 594'
);
content = content.replace(
  'href="/products"',
  'href="/contact"'
);
content = content.replace(
  'Search by model',
  'Get a Quote'
);

// Video CTA
content = content.replace(
  'The Story of All Fire Services',
  'ALL FIRE Services - Diesel Pump Inspection'
);
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/677bc0530d77e0e618f27231_Process%20Hero-p-500.webp',
  '/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp'
);
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/677bc0530d77e0e618f27231_Process%20Hero.webp',
  '/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp'
);

// Fitter CTA (Section 6) -> Why Allfire Services
content = content.replace(
  'https://cdn.prod.website-files.com/675171b75e69f27843937162/6756c556008e435ead447544_Fitters.webp',
  '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp'
);
content = content.replace(
  'Find your nearest fitter',
  'WHY ALLFIRE SERVICES?'
);
content = content.replace(
  'We don’t trust just anyone to fit our custom-designed roofs. If you’re unable to deliver your vehicle to us for a factory installation, choose from our network of approved UK fitters.',
  'To ensure our Clients receive extensive and real-life knowledge of the fire safety industry, All Fire Services was founded with the unique concept to provide Professional Firefighters both serving and retired to be our Customer Service Technicians. These people are Professional, Experienced and Highly Motivated to provide a level of Service and Safety to the Community unequalled by our competition.'
);
content = content.replace(
  'Find a fitter',
  'Talk to Us'
);
content = content.replace(
  'href="/find-a-fitter"',
  'href="/contact"'
);

// Top Selling -> Fire Protection Services
content = content.replace(
  'Our top-selling roof conversions',
  'FIRE PROTECTION SERVICES'
);
content = content.replace(
  'View all products',
  'View all services'
);

// We need to replace the swiper slider contents.
// This is trickier with simple replace.

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Replacements done.');
